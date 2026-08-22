export {
  FAIL_CLOSED_AVAILABILITY,
  SURFACE_CAPABILITY_MATRIX,
  createCapabilityAvailabilitySnapshot,
} from "./matrix";
export { SURFACE_CONTRACTS, getSurfaceContract } from "./profiles";
export {
  canPresentRichDetails,
  canUseFreeText,
  maxTouchSteps,
  resolveSurfaceCapability,
} from "./policy";
export {
  SURFACE_CAPABILITIES,
  SURFACE_CONTRACT_VERSION,
  SURFACE_KINDS,
  type CapabilityAvailability,
  type CapabilityAvailabilitySnapshot,
  type CapabilityPolicy,
  type EffectiveSurfaceCapability,
  type InteractionModeConstraints,
  type InteractionRole,
  type SurfaceCapability,
  type SurfaceCapabilityPolicy,
  type SurfaceContext,
  type SurfaceContract,
  type SurfaceInteractionConstraints,
  type SurfaceKind,
} from "./types";
