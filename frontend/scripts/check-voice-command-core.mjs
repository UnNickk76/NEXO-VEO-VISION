import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const frontendDir = path.resolve(scriptDir, '..');
const sourcePath = path.join(frontendDir, 'src', 'voice', 'command-core.ts');
const source = fs.readFileSync(sourcePath, 'utf8');

for (const forbidden of [
  'react-native',
  'expo-',
  'Siri',
  'GoogleAssistant',
  'Mapbox',
  'TomTom',
  'HERE',
  'fetch(',
  'axios',
]) {
  assert.ok(!source.includes(forbidden), `provider/platform dependency found: ${forbidden}`);
}

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'nexo-voice-core-'));
const localTsc = path.join(frontendDir, 'node_modules', '.bin', process.platform === 'win32' ? 'tsc.cmd' : 'tsc');
const tscCommand = fs.existsSync(localTsc) ? localTsc : 'tsc';

try {
  fs.writeFileSync(path.join(tempDir, 'package.json'), '{"type":"module"}\n', 'utf8');
  const compile = spawnSync(tscCommand, [
    '--strict',
    '--target', 'ES2022',
    '--module', 'ES2022',
    '--moduleResolution', 'node',
    '--skipLibCheck',
    sourcePath,
    '--outDir', tempDir,
  ], { cwd: frontendDir, encoding: 'utf8' });

  assert.equal(
    compile.status,
    0,
    `TypeScript compile failed\nstdout:\n${compile.stdout}\nstderr:\n${compile.stderr}`,
  );

  const core = await import(`${pathToFileURL(path.join(tempDir, 'command-core.js')).href}?v=${Date.now()}`);

  const positiveCases = [
    ['annulla', 'cancel'],
    ['STOP', 'cancel'],
    ['conferma', 'confirm'],
    ['SÌ', 'confirm'],
    ['no', 'reject'],
    ['non confermare', 'reject'],
    ['naviga a id:home-01', 'start_navigation'],
  ];
  for (const [input, expected] of positiveCases) {
    assert.equal(core.parseVoiceIntent(input).kind, expected, `unexpected intent for: ${input}`);
  }

  const unsafeOrAmbiguous = [
    '',
    '   ',
    'sì no',
    'conferma ma no',
    'naviga a id:',
    'naviga a Roma',
    'naviga a id:home-01 adesso',
    `naviga a id:${'x'.repeat(129)}`,
    'ok\u0000',
  ];
  for (const input of unsafeOrAmbiguous) {
    const intent = core.parseVoiceIntent(input);
    assert.equal(intent.kind, 'unknown', `unsafe/ambiguous input produced action: ${JSON.stringify(input)}`);
    assert.equal(core.intentToCommand(intent), null, `unknown intent produced command: ${JSON.stringify(input)}`);
  }

  const navigationIntent = core.parseVoiceIntent('naviga a id:home-01');
  assert.deepEqual(core.intentToCommand(navigationIntent), {
    type: 'navigation.start',
    destinationId: 'home-01',
  });

  const metadata = {
    id: 'cmd-1',
    correlationId: 'corr-1',
    idempotencyKey: 'idem-1',
    source: 'voice',
    surface: 'smartphone',
    createdAt: '2026-08-22T00:00:00Z',
  };

  assert.throws(() => core.createCommandEnvelope({ type: 'interaction.cancel' }, { ...metadata, id: '' }), /id is required/);
  assert.throws(() => core.createCommandEnvelope({ type: 'interaction.cancel' }, { ...metadata, correlationId: '' }), /correlationId is required/);
  assert.throws(() => core.createCommandEnvelope({ type: 'interaction.cancel' }, { ...metadata, idempotencyKey: '' }), /idempotencyKey is required/);

  const envelope = core.createCommandEnvelope({ type: 'interaction.confirm' }, metadata);
  assert.ok(Object.isFrozen(envelope), 'command envelope must be frozen');

  const unhandledBus = new core.CommandBus();
  assert.deepEqual(unhandledBus.dispatch(envelope), { status: 'unhandled', reason: 'no-handler' });

  const handledBus = new core.CommandBus();
  let calls = 0;
  handledBus.register('interaction.confirm', () => {
    calls += 1;
    return { status: 'handled' };
  });
  assert.deepEqual(handledBus.dispatch(envelope), { status: 'handled' });
  assert.deepEqual(handledBus.dispatch(envelope), { status: 'rejected', reason: 'duplicate' });
  assert.equal(calls, 1, 'duplicate dispatch executed handler more than once');

  const rejectedBus = new core.CommandBus();
  rejectedBus.register('interaction.confirm', () => ({ status: 'rejected', detail: 'confirmation-expired' }));
  const rejectedEnvelope = core.createCommandEnvelope(
    { type: 'interaction.confirm' },
    { ...metadata, id: 'cmd-2', idempotencyKey: 'idem-2' },
  );
  assert.deepEqual(rejectedBus.dispatch(rejectedEnvelope), {
    status: 'rejected',
    reason: 'handler-rejected',
    detail: 'confirmation-expired',
  });
  assert.deepEqual(rejectedBus.dispatch(rejectedEnvelope), { status: 'rejected', reason: 'duplicate' });

  assert.throws(
    () => handledBus.register('interaction.confirm', () => ({ status: 'handled' })),
    /already registered/,
  );

  console.log('voice-command-core checks: PASS');
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
