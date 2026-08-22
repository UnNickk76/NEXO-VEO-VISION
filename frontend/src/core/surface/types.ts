export const SURFACE_CONTRACT_VERSION = 1 as const;

export const SURFACE_KINDS = [
  "ios-phone",
  "android-phone",
  "carplay",
  "android-auto",
] as const;

export type SurfaceKind = (typeof SURFACE_KINDS)[number];

export type InteractionRole = "driver" | "passenger";

export const SURFACE_CAPABILITIES = [
  "primary-navigation-presentation",
  "voice-command-input",
  "touch-command-input",
  "free-text-input",
  "rich-detail-presentation",
  "secondary-actions",
] as const;

export type SurfaceCapability = (typeof SURFACE_CAPABILITIES)[number];

/**
 * Runtime availability uses the canonical F0 degradation states.
 * A Surface adapter reports these states explicitly; the core never infers
 * support from the platform name.
 */
export type CapabilityAvailability =
  | "available"
  | "degraded"
  | "offline"
  | "unsupported";

/** Product-side permission, independent from runtime/platform availability. */
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
  /** A passenger role may never bypass limits imposed by the Surface. */
  readonly passengerCanExpandWithinSurfaceLimits: boolean;
  /** Platform/Surface safety rules always take precedence over role policy. */
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
  /** Must come from a Surface adapter/runtime boundary, never from domain guesswork. */
  readonly availability: CapabilityAvailabilitySnapshot;
}

export interface EffectiveSurfaceCapability {
  readonly capability: SurfaceCapability;
  readonly availability: CapabilityAvailability;
  readonly policy: CapabilityPolicy;
  readonly usable: boolean;
}
