export const SURFACE_CONTRACT_VERSION = 1 as const;

export type SurfaceKind =
  | "ios-phone"
  | "android-phone"
  | "carplay"
  | "android-auto";

export type InteractionRole = "driver" | "passenger";

export type SurfaceCapability =
  | "primary-navigation-presentation"
  | "voice-command-input"
  | "touch-command-input"
  | "free-text-input"
  | "rich-detail-presentation"
  | "secondary-actions";

export type CapabilityAvailability =
  | "available"
  | "degraded"
  | "offline"
  | "unsupported";

export type CapabilityPolicy = "permitted" | "constrained" | "prohibited";

export type CapabilityAvailabilitySnapshot = Readonly<
  Record<SurfaceCapability, CapabilityAvailability>
>;

export type SurfaceCapabilityPolicy = Readonly<
  Record<SurfaceCapability, CapabilityPolicy>
>;

export interface InteractionModeConstraints {
  readonly maxTouchSteps: number;
  readonly freeTextEntryAllowed: boolean;
  readonly richDetailsAllowed: boolean;
  readonly voicePreferred: boolean;
}

export interface SurfaceInteractionConstraints {
  readonly whileMoving: InteractionModeConstraints;
  readonly whileStopped: InteractionModeConstraints;
  readonly passengerCanExpandWithinSurfaceLimits: boolean;
  readonly surfaceRulesPrecedeRole: true;
}

export interface SurfaceContract {
  readonly contractVersion: typeof SURFACE_CONTRACT_VERSION;
  readonly kind: SurfaceKind;
  readonly policy: SurfaceCapabilityPolicy;
  readonly constraints: SurfaceInteractionConstraints;
}

export interface SurfaceContext {
  readonly kind: SurfaceKind;
  readonly role: InteractionRole;
  readonly isMoving: boolean;
  readonly availability: CapabilityAvailabilitySnapshot;
}

export interface EffectiveSurfaceCapability {
  readonly capability: SurfaceCapability;
  readonly availability: CapabilityAvailability;
  readonly policy: CapabilityPolicy;
  readonly usable: boolean;
}
