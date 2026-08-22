import assert from 'node:assert/strict';
import {
  assessLocationFixQuality,
  defaultLocationQualityPolicy,
  selectConservativeLocationFix,
} from '../src/location/quality-policy.js';

const nowMs = 1_000_000;
const good = { latitude: 41.9, longitude: 12.5, horizontalAccuracyM: 20, timestampMs: nowMs - 1_000 };
const boundary = { ...good, horizontalAccuracyM: 100, timestampMs: nowMs - 30_000 };
const stale = { ...good, timestampMs: nowMs - 30_001 };
const poor = { ...good, horizontalAccuracyM: 100.001 };
const future = { ...good, timestampMs: nowMs + 1 };
const invalidCoordinates = { ...good, latitude: 91 };

assert.deepEqual(assessLocationFixQuality(good, nowMs), { usable: true, reason: 'usable', ageMs: 1_000 });
assert.equal(assessLocationFixQuality(boundary, nowMs).usable, true);
assert.equal(assessLocationFixQuality(stale, nowMs).reason, 'stale-fix');
assert.equal(assessLocationFixQuality(poor, nowMs).reason, 'poor-accuracy');
assert.equal(assessLocationFixQuality(future, nowMs).reason, 'future-fix');
assert.equal(assessLocationFixQuality(invalidCoordinates, nowMs).reason, 'invalid-fix');
assert.equal(assessLocationFixQuality(good, Number.NaN).usable, false);
assert.equal(assessLocationFixQuality(good, nowMs, { ...defaultLocationQualityPolicy, maxAgeMs: -1 }).usable, false);
assert.deepEqual(selectConservativeLocationFix(stale, good, nowMs), good);
assert.equal(selectConservativeLocationFix(stale, null, nowMs), null);
assert.equal(selectConservativeLocationFix(stale, stale, nowMs), null);

console.log('location-quality-policy checks: PASS');
