import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';

const [compiledPath] = process.argv.slice(2);
if (!compiledPath) throw new Error('compiled state-machine path required');
const mod = await import(pathToFileURL(compiledPath));

const validFix = { latitude: 41.9, longitude: 12.5, horizontalAccuracyM: 8, timestampMs: 1000 };

let state = mod.initialLocationRuntimeState;
assert.equal(state.status, 'idle');
assert.equal(mod.isUsableLocationRuntimeState(state), false);

state = mod.reduceLocationRuntimeState(state, { type: 'fix', fix: validFix });
assert.equal(state.status, 'idle', 'fix before grant must be ignored');
assert.equal(state.fix, null);

state = mod.reduceLocationRuntimeState(state, { type: 'permission', permission: 'denied' });
assert.equal(state.status, 'denied');
assert.equal(state.fix, null);
assert.equal(mod.isUsableLocationRuntimeState(state), false);

state = mod.reduceLocationRuntimeState(state, { type: 'permission', permission: 'restricted' });
assert.equal(state.status, 'restricted');
assert.equal(state.fix, null);

state = mod.reduceLocationRuntimeState(state, { type: 'permission', permission: 'granted' });
state = mod.reduceLocationRuntimeState(state, { type: 'fix', fix: validFix });
assert.equal(state.status, 'ready');
assert.equal(mod.isUsableLocationRuntimeState(state), true);

state = mod.reduceLocationRuntimeState(state, { type: 'degraded', reason: 'reduced-quality' });
assert.equal(state.status, 'degraded');
assert.deepEqual(state.fix, validFix, 'degraded may retain last real fix');
assert.equal(mod.isUsableLocationRuntimeState(state), false);

state = mod.reduceLocationRuntimeState(state, { type: 'stale', reason: 'freshness-not-confirmed' });
assert.equal(state.status, 'stale');
assert.deepEqual(state.fix, validFix, 'stale marks a real fix but it is not usable');
assert.equal(mod.isUsableLocationRuntimeState(state), false);

state = mod.reduceLocationRuntimeState(state, { type: 'unavailable', reason: 'provider-unavailable' });
assert.equal(state.status, 'unavailable');
assert.equal(state.fix, null);

state = mod.reduceLocationRuntimeState(state, { type: 'provider-error', reason: 'provider-error' });
assert.equal(state.status, 'error');
assert.equal(state.fix, null);

state = mod.reduceLocationRuntimeState({ ...mod.initialLocationRuntimeState, permission: 'granted' }, { type: 'fix', fix: { ...validFix, latitude: 999 } });
assert.equal(state.status, 'error');
assert.equal(state.fix, null);
assert.equal(mod.isUsableLocationRuntimeState(state), false);

console.log('location-state-machine checks: PASS');
