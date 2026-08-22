export type UnknownIntentReason =
  | 'empty'
  | 'unsafe-input'
  | 'ambiguous'
  | 'incomplete'
  | 'unsupported';

export type VoiceIntent =
  | { kind: 'start_navigation'; destinationId: string; confidence: number }
  | { kind: 'cancel'; confidence: number }
  | { kind: 'confirm'; confidence: number }
  | { kind: 'reject'; confidence: number }
  | { kind: 'unknown'; raw: string; confidence: number; reason: UnknownIntentReason };

export type Command =
  | { type: 'navigation.start'; destinationId: string }
  | { type: 'interaction.cancel' }
  | { type: 'interaction.confirm' }
  | { type: 'interaction.reject' };

export type CommandSource = 'voice' | 'text';
export type CommandSurface = 'smartphone' | 'carplay' | 'android_auto' | 'unknown';

export type CommandEnvelope = Readonly<{
  id: string;
  correlationId: string;
  idempotencyKey: string;
  command: Command;
  source: CommandSource;
  surface: CommandSurface;
  createdAt: string;
}>;

export type CommandResult =
  | { status: 'handled' }
  | { status: 'unhandled'; reason: 'no-handler' }
  | { status: 'rejected'; reason: 'duplicate' | 'handler-rejected'; detail?: string };

export type CommandHandlerResult =
  | { status: 'handled' }
  | { status: 'rejected'; detail?: string };

export type CommandHandler = (envelope: CommandEnvelope) => CommandHandlerResult;

const CONTROL_CHARACTERS = /[\u0000-\u001f\u007f]/;
const MAX_INPUT_LENGTH = 256;
const MAX_DESTINATION_ID_LENGTH = 128;

const normalize = (input: string): string =>
  input.normalize('NFKC').trim().toLocaleLowerCase('it-IT').replace(/\s+/g, ' ');

const unknown = (raw: string, reason: UnknownIntentReason): VoiceIntent => ({
  kind: 'unknown',
  raw,
  confidence: 0,
  reason,
});

export function parseVoiceIntent(input: string): VoiceIntent {
  if (!input.trim()) return unknown(input, 'empty');
  if (input.length > MAX_INPUT_LENGTH || CONTROL_CHARACTERS.test(input)) {
    return unknown(input, 'unsafe-input');
  }

  const normalized = normalize(input);
  const exactMatches: Array<[RegExp, VoiceIntent]> = [
    [/^(annulla|cancella|stop)$/, { kind: 'cancel', confidence: 1 }],
    [/^(conferma|sì|si|ok|va bene)$/, { kind: 'confirm', confidence: 1 }],
    [/^(rifiuta|no|non confermare)$/, { kind: 'reject', confidence: 1 }],
  ];

  const matched = exactMatches.filter(([pattern]) => pattern.test(normalized));
  if (matched.length > 1) return unknown(input, 'ambiguous');
  if (matched.length === 1) return matched[0][1];

  if (/^naviga a id:\s*$/.test(normalized)) return unknown(input, 'incomplete');

  const resolvedDestination = normalized.match(/^naviga a id:([a-z0-9._:-]+)$/);
  if (resolvedDestination) {
    const destinationId = resolvedDestination[1];
    if (destinationId.length > MAX_DESTINATION_ID_LENGTH) {
      return unknown(input, 'unsafe-input');
    }
    return { kind: 'start_navigation', destinationId, confidence: 1 };
  }

  return unknown(input, 'unsupported');
}

export function intentToCommand(intent: VoiceIntent): Command | null {
  switch (intent.kind) {
    case 'start_navigation':
      return { type: 'navigation.start', destinationId: intent.destinationId };
    case 'cancel':
      return { type: 'interaction.cancel' };
    case 'confirm':
      return { type: 'interaction.confirm' };
    case 'reject':
      return { type: 'interaction.reject' };
    case 'unknown':
      return null;
  }
}

export function createCommandEnvelope(
  command: Command,
  metadata: {
    id: string;
    correlationId: string;
    idempotencyKey: string;
    source: CommandSource;
    surface: CommandSurface;
    createdAt: string;
  },
): CommandEnvelope {
  if (!metadata.id.trim()) throw new Error('Command envelope id is required');
  if (!metadata.correlationId.trim()) throw new Error('Command envelope correlationId is required');
  if (!metadata.idempotencyKey.trim()) throw new Error('Command envelope idempotencyKey is required');
  if (Number.isNaN(Date.parse(metadata.createdAt))) {
    throw new Error('Command envelope createdAt must be an ISO-compatible timestamp');
  }
  return Object.freeze({ command, ...metadata });
}

export class CommandBus {
  private readonly handlers = new Map<Command['type'], CommandHandler>();
  private readonly processedIdempotencyKeys = new Set<string>();

  register<T extends Command['type']>(type: T, handler: CommandHandler): () => void {
    if (this.handlers.has(type)) throw new Error(`Handler already registered for ${type}`);
    this.handlers.set(type, handler);
    return () => this.handlers.delete(type);
  }

  dispatch(envelope: CommandEnvelope): CommandResult {
    if (this.processedIdempotencyKeys.has(envelope.idempotencyKey)) {
      return { status: 'rejected', reason: 'duplicate' };
    }

    const handler = this.handlers.get(envelope.command.type);
    if (!handler) return { status: 'unhandled', reason: 'no-handler' };

    this.processedIdempotencyKeys.add(envelope.idempotencyKey);
    const result = handler(envelope);
    if (result.status === 'rejected') {
      return { status: 'rejected', reason: 'handler-rejected', detail: result.detail };
    }
    return { status: 'handled' };
  }
}
