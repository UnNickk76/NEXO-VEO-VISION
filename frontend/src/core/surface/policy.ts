import { getSurfaceContract } from "./profiles";
import type {
  CapabilityAvailability,
  EffectiveSurfaceCapability,
  SurfaceCapability,
  SurfaceContext,
} from "./types";

const runtimeUsable = (availability: CapabilityAvailability): boolean =>
  availability === "available" || availability === "degraded";

export function resolveSurfaceCapability(
  context: SurfaceContext,
  capability: SurfaceCapability,
): EffectiveSurfaceCapability {
  const contract = getSurfaceContract(context.kind);
  const policy = contract.policy[capability];
  const reportedAvailability = context.availability[capability];

  return {
    capability,
    policy,
    availability: reportedAvailability,
    usable: policy !== "prohibited" && runtimeUsable(reportedAvailability),
  };
}

export function canUseFreeText(context: SurfaceContext): boolean {
  const contract = getSurfaceContract(context.kind);
  const mode = context.isMoving
    ? contract.constraints.whileMoving
    : contract.constraints.whileStopped;
  const capability = resolveSurfaceCapability(context, "free-text-input");

  return mode.freeTextEntryAllowed && capability.usable;
}

export function canPresentRichDetails(context: SurfaceContext): boolean {
  const contract = getSurfaceContract(context.kind);
  const mode = context.isMoving
    ? contract.constraints.whileMoving
    : contract.constraints.whileStopped;
  const capability = resolveSurfaceCapability(context, "rich-detail-presentation");

  if (!mode.richDetailsAllowed || !capability.usable) return false;
  if (context.role === "passenger") {
    return contract.constraints.passengerCanExpandWithinSurfaceLimits;
  }
  return !context.isMoving;
}

export function maxTouchSteps(context: SurfaceContext): number {
  const contract = getSurfaceContract(context.kind);
  const touch = resolveSurfaceCapability(context, "touch-command-input");
  if (!touch.usable) return 0;
  return context.isMoving
    ? contract.constraints.whileMoving.maxTouchSteps
    : contract.constraints.whileStopped.maxTouchSteps;
}
