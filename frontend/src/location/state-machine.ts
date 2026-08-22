import type { LocationFix, LocationPermissionStatus } from './contract';
import { isValidLocationFix } from './contract';

export type LocationRuntimeStatus =
  | 'idle'
  | 'ready'
  | 'degraded'
  | 'stale'
  | 'unavailable'
  | 'denied'
  | 'restricted'
  | 'error';

export interface LocationRuntimeState {
  permission: LocationPermissionStatus;
  status: LocationRuntimeStatus;
  fix: LocationFix | null;
  reason: string | null;
}

export type LocationRuntimeEvent =
  | { type: 'permission'; permission: LocationPermissionStatus }
  | { type: 'fix'; fix: LocationFix }
  | { type: 'degraded'; reason: string }
  | { type: 'stale'; reason: string }
  | { type: 'unavailable'; reason: string }
  | { type: 'provider-error'; reason: string }
  | { type: 'reset' };

export const initialLocationRuntimeState: LocationRuntimeState = {
  permission: 'undetermined',
  status: 'idle',
  fix: null,
  reason: null,
};

export function reduceLocationRuntimeState(
  state: LocationRuntimeState,
  event: LocationRuntimeEvent,
): LocationRuntimeState {
  if (event.type === 'reset') return initialLocationRuntimeState;

  if (event.type === 'permission') {
    if (event.permission === 'denied') {
      return { permission: 'denied', status: 'denied', fix: null, reason: 'permission-denied' };
    }
    if (event.permission === 'restricted') {
      return { permission: 'restricted', status: 'restricted', fix: null, reason: 'permission-restricted' };
    }
    if (event.permission === 'undetermined') {
      return { permission: 'undetermined', status: 'idle', fix: null, reason: null };
    }
    return { permission: 'granted', status: 'idle', fix: null, reason: null };
  }

  if (state.permission !== 'granted') {
    return state;
  }

  if (event.type === 'fix') {
    if (!isValidLocationFix(event.fix)) {
      return { ...state, status: 'error', fix: null, reason: 'invalid-fix' };
    }
    return { ...state, status: 'ready', fix: event.fix, reason: null };
  }

  if (event.type === 'degraded') {
    return { ...state, status: 'degraded', fix: state.fix, reason: event.reason };
  }

  if (event.type === 'stale') {
    return { ...state, status: 'stale', fix: state.fix, reason: event.reason };
  }

  if (event.type === 'unavailable') {
    return { ...state, status: 'unavailable', fix: null, reason: event.reason };
  }

  return { ...state, status: 'error', fix: null, reason: event.reason };
}

export function isUsableLocationRuntimeState(state: LocationRuntimeState): boolean {
  return state.permission === 'granted' && state.status === 'ready' && state.fix !== null && isValidLocationFix(state.fix);
}
