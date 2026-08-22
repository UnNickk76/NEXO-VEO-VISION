import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';

const sourcePath = new URL('../src/navigation/domain.ts', import.meta.url);
const source = fs.readFileSync(sourcePath, 'utf8');
const transpiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  reportDiagnostics: true,
});
assert.equal(transpiled.diagnostics?.length ?? 0, 0, 'navigation domain must transpile without diagnostics');

const dataUrl = `data:text/javascript;base64,${Buffer.from(transpiled.outputText).toString('base64')}`;
const { createNavigationSession, reduceNavigationSession, selectPreferredCandidate } = await import(dataUrl);

const origin = Object.freeze({ latitude: 41.9028, longitude: 12.4964, capturedAt: '2026-08-21T21:45:00Z' });
const destination = Object.freeze({ id: 'dest-1', label: 'Resolved destination', latitude: 41.8902, longitude: 12.4922 });
const request = Object.freeze({ requestId: 'req-1', origin, destination, preference: 'fastest', alternativesLimit: 2 });
const candidates = Object.freeze([
  Object.freeze({ id: 'route-b', requestId: 'req-1', distanceMeters: 4200, durationSeconds: 800, preference: 'balanced' }),
  Object.freeze({ id: 'route-a', requestId: 'req-1', distanceMeters: 4500, durationSeconds: 700, preference: 'fastest' }),
]);

let session = createNavigationSession('session-1');
assert.equal(session.state, 'idle');
assert.throws(() => reduceNavigationSession(session, { type: 'NAVIGATION_STARTED' }), /Illegal navigation transition/);

session = reduceNavigationSession(session, { type: 'PLAN_REQUESTED', request });
assert.equal(session.state, 'planning');
assert.throws(() => reduceNavigationSession(session, { type: 'ROUTES_READY', candidates: [{ ...candidates[0], requestId: 'wrong' }] }), /active request/);

session = reduceNavigationSession(session, { type: 'ROUTES_READY', candidates });
assert.equal(session.state, 'ready');
assert.equal(Object.isFrozen(session.candidates), true);
assert.equal(Object.isFrozen(session.candidates[0]), true);
assert.throws(() => reduceNavigationSession(session, { type: 'NAVIGATION_STARTED' }), /selected/);
assert.throws(() => reduceNavigationSession(session, { type: 'ROUTE_SELECTED', routeId: 'missing' }), /current candidates/);

const preferred = selectPreferredCandidate(session.candidates, 'fastest');
assert.equal(preferred?.id, 'route-a');
session = reduceNavigationSession(session, { type: 'ROUTE_SELECTED', routeId: preferred.id });
const selectedAgain = reduceNavigationSession(session, { type: 'ROUTE_SELECTED', routeId: preferred.id });
assert.equal(selectedAgain.selectedRouteId, preferred.id, 'reselecting the same route is idempotent');

session = reduceNavigationSession(session, { type: 'NAVIGATION_STARTED' });
assert.equal(session.state, 'navigating');
const recalc = Object.freeze({ sessionId: 'session-1', reason: 'off-route', origin, destination, previousRouteId: 'route-a' });
assert.throws(() => reduceNavigationSession(session, { type: 'RECALCULATION_REQUESTED', request: { ...recalc, previousRouteId: 'wrong' } }), /active navigation session/);
session = reduceNavigationSession(session, { type: 'RECALCULATION_REQUESTED', request: recalc });
assert.equal(session.state, 'recalculating');
session = reduceNavigationSession(session, { type: 'RECALCULATION_READY', candidates });
assert.equal(session.state, 'ready');
assert.equal(session.selectedRouteId, undefined);

session = reduceNavigationSession(session, { type: 'ROUTE_SELECTED', routeId: 'route-a' });
session = reduceNavigationSession(session, { type: 'NAVIGATION_STARTED' });
session = reduceNavigationSession(session, { type: 'ARRIVED' });
assert.equal(session.state, 'completed');
assert.throws(() => reduceNavigationSession(session, { type: 'CANCELLED' }), /Illegal navigation transition/);

let cancelled = createNavigationSession('cancel');
cancelled = reduceNavigationSession(cancelled, { type: 'PLAN_REQUESTED', request });
cancelled = reduceNavigationSession(cancelled, { type: 'CANCELLED' });
assert.equal(cancelled.state, 'cancelled');

let failed = createNavigationSession('failure');
failed = reduceNavigationSession(failed, { type: 'PLAN_REQUESTED', request });
failed = reduceNavigationSession(failed, { type: 'FAILED', code: 'provider-unavailable' });
assert.equal(failed.state, 'failed');
assert.equal(failed.failureCode, 'provider-unavailable');

assert.equal(/mapbox|tomtom|here maps|google maps|apple maps/i.test(source), false, 'domain must not depend on map providers');
console.log('navigation-domain checks: PASS');
