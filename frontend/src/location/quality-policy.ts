import type { LocationFix } from './contract';
import { isValidLocationFix } from './contract';

export interface LocationQualityPolicy {
  maxAgeMs: number;
  maxHorizontalAccuracyM: number;
}

export type LocationQualityReason =
  | 'usable'
  | 'invalid-fix'
  | 'future-fix'
  | 'stale-fix'
  | 'poor-accuracy';

export interface LocationQualityAssessment {
  usable: boolean;
  reason: LocationQualityReason;
  ageMs: number | null;
}

export const defaultLocationQualityPolicy: LocationQualityPolicy = {
  maxAgeMs: 30_000,
  maxHorizontalAccuracyM: 100,
};

export function isValidLocationQualityPolicy(policy: LocationQualityPolicy): boolean {
  return (
    Number.isFinite(policy.maxAgeMs) &&
    Number.isFinite(policy.maxHorizontalAccuracyM) &&
    policy.maxAgeMs >= 0 &&
    policy.maxHorizontalAccuracyM >= 0
  );
}

export function assessLocationFixQuality(
  fix: LocationFix,
  nowMs: number,
  policy: LocationQualityPolicy = defaultLocationQualityPolicy,
): LocationQualityAssessment {
  if (!isValidLocationFix(fix) || !Number.isFinite(nowMs) || !isValidLocationQualityPolicy(policy)) {
    return { usable: false, reason: 'invalid-fix', ageMs: null };
  }

  const ageMs = nowMs - fix.timestampMs;
  if (ageMs < 0) return { usable: false, reason: 'future-fix', ageMs };
  if (ageMs > policy.maxAgeMs) return { usable: false, reason: 'stale-fix', ageMs };
  if (fix.horizontalAccuracyM > policy.maxHorizontalAccuracyM) {
    return { usable: false, reason: 'poor-accuracy', ageMs };
  }

  return { usable: true, reason: 'usable', ageMs };
}

export function selectConservativeLocationFix(
  candidate: LocationFix,
  previousRealFix: LocationFix | null,
  nowMs: number,
  policy: LocationQualityPolicy = defaultLocationQualityPolicy,
): LocationFix | null {
  const candidateAssessment = assessLocationFixQuality(candidate, nowMs, policy);
  if (candidateAssessment.usable) return candidate;

  if (previousRealFix !== null && assessLocationFixQuality(previousRealFix, nowMs, policy).usable) {
    return previousRealFix;
  }

  return null;
}
