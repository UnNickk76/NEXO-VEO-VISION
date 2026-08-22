export type LocationPermissionStatus =
  | 'undetermined'
  | 'granted'
  | 'denied'
  | 'restricted';

export type ForegroundLocationStatus = 'idle' | 'ready' | 'unavailable' | 'error';

export type LocationErrorCode =
  | 'permission-denied'
  | 'permission-restricted'
  | 'location-unavailable'
  | 'provider-error'
  | 'invalid-fix';

export interface LocationError {
  code: LocationErrorCode;
  message?: string;
}

export interface LocationFix {
  latitude: number;
  longitude: number;
  horizontalAccuracyM: number;
  timestampMs: number;
}

export interface ForegroundLocationState {
  permission: LocationPermissionStatus;
  status: ForegroundLocationStatus;
  fix: LocationFix | null;
  error: LocationError | null;
}

export function isValidLocationFix(fix: LocationFix): boolean {
  return (
    Number.isFinite(fix.latitude) &&
    Number.isFinite(fix.longitude) &&
    Number.isFinite(fix.horizontalAccuracyM) &&
    Number.isFinite(fix.timestampMs) &&
    fix.latitude >= -90 &&
    fix.latitude <= 90 &&
    fix.longitude >= -180 &&
    fix.longitude <= 180 &&
    fix.horizontalAccuracyM >= 0 &&
    fix.timestampMs >= 0
  );
}

export function isCoherentForegroundLocationState(
  state: ForegroundLocationState,
): boolean {
  if (state.status === 'ready') {
    return (
      state.permission === 'granted' &&
      state.fix !== null &&
      state.error === null &&
      isValidLocationFix(state.fix)
    );
  }

  if (state.status === 'idle') {
    return state.fix === null && state.error === null;
  }

  if (state.status === 'unavailable') {
    return (
      state.fix === null &&
      state.error?.code === 'location-unavailable'
    );
  }

  return state.fix === null && state.error !== null;
}
