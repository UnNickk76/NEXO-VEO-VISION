import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';

const compiledPath = process.argv[2];
if (!compiledPath) {
  throw new Error('usage: node scripts/check-location-contract.mjs <compiled-contract.js>');
}

const contract = await import(pathToFileURL(compiledPath).href);
const {
  isValidLocationFix,
  isCoherentForegroundLocationState,
} = contract;

const validFix = {
  latitude: 41.9028,
  longitude: 12.4964,
  horizontalAccuracyM: 8.5,
  timestampMs: 1_787_364_300_000,
};

assert.equal(isValidLocationFix(validFix), true);
assert.equal(isValidLocationFix({ ...validFix, latitude: 91 }), false);
assert.equal(isValidLocationFix({ ...validFix, longitude: -181 }), false);
assert.equal(isValidLocationFix({ ...validFix, horizontalAccuracyM: -1 }), false);
assert.equal(isValidLocationFix({ ...validFix, timestampMs: Number.NaN }), false);

assert.equal(
  isCoherentForegroundLocationState({
    permission: 'granted',
    status: 'ready',
    fix: validFix,
    error: null,
  }),
  true,
);

assert.equal(
  isCoherentForegroundLocationState({
    permission: 'denied',
    status: 'ready',
    fix: validFix,
    error: null,
  }),
  false,
);

assert.equal(
  isCoherentForegroundLocationState({
    permission: 'granted',
    status: 'unavailable',
    fix: null,
    error: { code: 'location-unavailable' },
  }),
  true,
);

assert.equal(
  isCoherentForegroundLocationState({
    permission: 'granted',
    status: 'error',
    fix: null,
    error: { code: 'provider-error' },
  }),
  true,
);

assert.equal(
  isCoherentForegroundLocationState({
    permission: 'undetermined',
    status: 'idle',
    fix: null,
    error: null,
  }),
  true,
);

console.log('location-contract checks: PASS');
