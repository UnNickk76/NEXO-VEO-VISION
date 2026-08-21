import assert from 'node:assert/strict';
import fs from 'node:fs';

const sourceUrl = new URL('../src/voice/command-core.ts', import.meta.url);
const source = fs.readFileSync(sourceUrl, 'utf8');

const requiredFragments = [
  "kind: 'start_navigation'",
  "kind: 'cancel'",
  "kind: 'confirm'",
  "kind: 'reject'",
  "kind: 'unknown'",
  "type: 'navigation.start'",
  'export class CommandBus',
  "status: 'unhandled'",
  "reason: 'no-handler'",
];

for (const fragment of requiredFragments) {
  assert.ok(source.includes(fragment), `missing contract fragment: ${fragment}`);
}

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

assert.match(source, /naviga a id:/, 'resolved destination grammar missing');
assert.match(source, /return \{ kind: 'unknown'/, 'unknown input must degrade safely');

console.log('voice-command-core checks: PASS');
