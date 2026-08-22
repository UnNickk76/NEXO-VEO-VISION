export type NavigationState =
  | 'idle'
  | 'planning'
  | 'ready'
  | 'navigating'
  | 'recalculating'
  | 'completed'
  | 'cancelled'
  | 'failed';

export type RoutePreference = 'fastest' | 'shortest' | 'balanced' | 'scenic';

export interface DestinationRef {
  readonly id: string;
  readonly label: string;
  readonly latitude: number;
  readonly longitude: number;
}

export interface LocationSample {
  readonly latitude: number;
  readonly longitude: number;
  readonly capturedAt: string;
  readonly accuracyMeters?: number;
}

export interface RouteRequest {
  readonly requestId: string;
  readonly origin: LocationSample;
  readonly destination: DestinationRef;
  readonly preference: RoutePreference;
  readonly alternativesLimit: number;
}

export interface RouteCandidate {
  readonly id: string;
  readonly requestId: string;
  readonly distanceMeters: number;
  readonly durationSeconds: number;
  readonly preference: RoutePreference;
  readonly providerOpaqueRef?: string;
}

export interface RecalculationRequest {
  readonly sessionId: string;
  readonly reason: 'off-route' | 'traffic-change' | 'user-request';
  readonly origin: LocationSample;
  readonly destination: DestinationRef;
  readonly previousRouteId: string;
}

export interface RoutingAdapter {
  plan(request: RouteRequest): Promise<readonly RouteCandidate[]>;
  recalculate(request: RecalculationRequest): Promise<readonly RouteCandidate[]>;
}

export type NavigationEvent =
  | { readonly type: 'PLAN_REQUESTED'; readonly request: RouteRequest }
  | { readonly type: 'ROUTES_READY'; readonly candidates: readonly RouteCandidate[] }
  | { readonly type: 'ROUTE_SELECTED'; readonly routeId: string }
  | { readonly type: 'NAVIGATION_STARTED' }
  | { readonly type: 'RECALCULATION_REQUESTED'; readonly request: RecalculationRequest }
  | { readonly type: 'RECALCULATION_READY'; readonly candidates: readonly RouteCandidate[] }
  | { readonly type: 'ARRIVED' }
  | { readonly type: 'CANCELLED' }
  | { readonly type: 'FAILED'; readonly code: string };

export interface NavigationSession {
  readonly id: string;
  readonly state: NavigationState;
  readonly request?: RouteRequest;
  readonly candidates: readonly RouteCandidate[];
  readonly selectedRouteId?: string;
  readonly failureCode?: string;
}

const terminalStates: ReadonlySet<NavigationState> = new Set(['completed', 'cancelled', 'failed']);

function freezeCandidates(candidates: readonly RouteCandidate[]): readonly RouteCandidate[] {
  return Object.freeze(candidates.map((candidate) => Object.freeze({ ...candidate })));
}

function assertCandidatesForRequest(
  requestId: string,
  candidates: readonly RouteCandidate[],
): readonly RouteCandidate[] {
  if (candidates.length === 0) {
    throw new Error('At least one route candidate is required');
  }
  if (candidates.some((candidate) => candidate.requestId !== requestId)) {
    throw new Error('Route candidate does not belong to the active request');
  }
  return freezeCandidates(candidates);
}

export function createNavigationSession(id: string): NavigationSession {
  if (!id.trim()) throw new Error('Navigation session id is required');
  return Object.freeze({ id, state: 'idle' as const, candidates: Object.freeze([]) });
}

export function reduceNavigationSession(
  session: NavigationSession,
  event: NavigationEvent,
): NavigationSession {
  if (terminalStates.has(session.state)) {
    throw new Error(`Illegal navigation transition: ${session.state} -> ${event.type}`);
  }

  switch (session.state) {
    case 'idle':
      if (event.type !== 'PLAN_REQUESTED') break;
      if (event.request.alternativesLimit < 1) throw new Error('alternativesLimit must be at least 1');
      return Object.freeze({ ...session, state: 'planning', request: event.request, candidates: Object.freeze([]) });

    case 'planning':
      if (event.type === 'CANCELLED') return Object.freeze({ ...session, state: 'cancelled' });
      if (event.type === 'FAILED') return Object.freeze({ ...session, state: 'failed', failureCode: event.code });
      if (event.type === 'ROUTES_READY' && session.request) {
        return Object.freeze({
          ...session,
          state: 'ready',
          candidates: assertCandidatesForRequest(session.request.requestId, event.candidates),
        });
      }
      break;

    case 'ready':
      if (event.type === 'CANCELLED') return Object.freeze({ ...session, state: 'cancelled' });
      if (event.type === 'FAILED') return Object.freeze({ ...session, state: 'failed', failureCode: event.code });
      if (event.type === 'ROUTE_SELECTED') {
        if (!session.candidates.some((candidate) => candidate.id === event.routeId)) {
          throw new Error('Selected route is not one of the current candidates');
        }
        return Object.freeze({ ...session, selectedRouteId: event.routeId });
      }
      if (event.type === 'NAVIGATION_STARTED') {
        if (!session.selectedRouteId) throw new Error('A route must be selected before navigation starts');
        return Object.freeze({ ...session, state: 'navigating' });
      }
      break;

    case 'navigating':
      if (event.type === 'CANCELLED') return Object.freeze({ ...session, state: 'cancelled' });
      if (event.type === 'FAILED') return Object.freeze({ ...session, state: 'failed', failureCode: event.code });
      if (event.type === 'ARRIVED') return Object.freeze({ ...session, state: 'completed' });
      if (event.type === 'RECALCULATION_REQUESTED') {
        if (event.request.sessionId !== session.id || event.request.previousRouteId !== session.selectedRouteId) {
          throw new Error('Recalculation request does not match the active navigation session');
        }
        return Object.freeze({ ...session, state: 'recalculating' });
      }
      break;

    case 'recalculating':
      if (event.type === 'CANCELLED') return Object.freeze({ ...session, state: 'cancelled' });
      if (event.type === 'FAILED') return Object.freeze({ ...session, state: 'failed', failureCode: event.code });
      if (event.type === 'RECALCULATION_READY' && session.request) {
        const candidates = assertCandidatesForRequest(session.request.requestId, event.candidates);
        return Object.freeze({ ...session, state: 'ready', candidates, selectedRouteId: undefined });
      }
      break;
  }

  throw new Error(`Illegal navigation transition: ${session.state} -> ${event.type}`);
}

export function selectPreferredCandidate(
  candidates: readonly RouteCandidate[],
  preference: RoutePreference,
): RouteCandidate | undefined {
  const matching = candidates.filter((candidate) => candidate.preference === preference);
  const pool = matching.length > 0 ? matching : candidates;
  return [...pool].sort((a, b) => a.durationSeconds - b.durationSeconds || a.distanceMeters - b.distanceMeters || a.id.localeCompare(b.id))[0];
}
