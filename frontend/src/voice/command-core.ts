export type VoiceIntent =
  | { kind: 'start_navigation'; destinationId: string; confidence: number }
  | { kind: 'cancel'; confidence: number }
  | { kind: 'confirm'; confidence: number }
  | { kind: 'reject'; confidence: number }
  | { kind: 'unknown'; raw: string; confidence: number };

export type Command =
  | { type: 'navigation.start'; destinationId: string }
  | { type: 'interaction.cancel' }
  | { type: 'interaction.confirm' }
  | { type: 'interaction.reject' };

export type CommandEnvelope = Readonly<{
  id: string;
  command: Command;
  source: 'voice' | 'text';
  createdAt: string;
}>;

export type CommandResult =
  | { status: 'handled' }
  | { status: 'unhandled'; reason: 'no-handler' };

export type CommandHandler = (envelope: CommandEnvelope) => CommandResult;

const normalize = (input: string): string =>
  input.trim().toLocaleLowerCase('it-IT').replace(/\s+/g, ' ');

export function parseVoiceIntent(input: string): VoiceIntent {
  const normalized = normalize(input);

  if (/^(annulla|cancella|stop)$/.test(normalized)) {
    return { kind: 'cancel', confidence: 1 };
  }
  if (/^(conferma|sì|si|ok|va bene)$/.test(normalized)) {
    return { kind: 'confirm', confidence: 1 };
  }
  if (/^(rifiuta|no|non confermare)$/.test(normalized)) {
    return { kind: 'reject', confidence: 1 };
  }

  // A destination must already be resolved by an upstream search/context layer.
  // This core never geocodes or invents a destination from free text.
  const resolvedDestination = normalized.match(/^naviga a id:([a-z0-9._:-]+)$/);
  if (resolvedDestination) {
    return {
      kind: 'start_navigation',
      destinationId: resolvedDestination[1],
      confidence: 1,
    };
  }

  return { kind: 'unknown', raw: input, confidence: 0 };
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
  metadata: { id: string; source: 'voice' | 'text'; createdAt: string },
): CommandEnvelope {
  if (!metadata.id.trim()) throw new Error('Command envelope id is required');
  if (Number.isNaN(Date.parse(metadata.createdAt))) {
    throw new Error('Command envelope createdAt must be an ISO-compatible timestamp');
  }
  return Object.freeze({ command, ...metadata });
}

export class CommandBus {
  private readonly handlers = new Map<Command['type'], CommandHandler>();

  register<T extends Command['type']>(type: T, handler: CommandHandler): () => void {
    if (this.handlers.has(type)) throw new Error(`Handler already registered for ${type}`);
    this.handlers.set(type, handler);
    return () => this.handlers.delete(type);
  }

  dispatch(envelope: CommandEnvelope): CommandResult {
    const handler = this.handlers.get(envelope.command.type);
    if (!handler) return { status: 'unhandled', reason: 'no-handler' };
    return handler(envelope);
  }
}
