import {
  SURFACE_CONTRACTS,
  canPresentRichDetails,
  canUseFreeText,
  maxTouchSteps,
  resolveSurfaceCapability,
  type CapabilityAvailabilitySnapshot,
  type SurfaceContext,
  type SurfaceKind,
} from "../src/core/surface";

function check(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(`surface-capabilities check failed: ${message}`);
  }
}

const available: CapabilityAvailabilitySnapshot = {
  "primary-navigation-presentation": "available",
  "voice-command-input": "available",
  "touch-command-input": "available",
  "free-text-input": "available",
  "rich-detail-presentation": "available",
  "secondary-actions": "available",
};

const unavailable: CapabilityAvailabilitySnapshot = {
  "primary-navigation-presentation": "unsupported",
  "voice-command-input": "unsupported",
  "touch-command-input": "unsupported",
  "free-text-input": "unsupported",
  "rich-detail-presentation": "unsupported",
  "secondary-actions": "unsupported",
};

const context = (
  kind: SurfaceKind,
  overrides: Partial<Omit<SurfaceContext, "kind">> = {},
): SurfaceContext => ({
  kind,
  role: "driver",
  isMoving: false,
  availability: available,
  ...overrides,
});

check(Object.keys(SURFACE_CONTRACTS).length === 4, "all four Surface kinds exist");
check(
  SURFACE_CONTRACTS.carplay.constraints.surfaceRulesPrecedeRole === true &&
    SURFACE_CONTRACTS["android-auto"].constraints.surfaceRulesPrecedeRole === true,
  "automotive Surface rules must precede role policy",
);

const prohibitedFreeText = resolveSurfaceCapability(
  context("carplay"),
  "free-text-input",
);
check(
  prohibitedFreeText.availability === "available",
  "runtime availability must remain reported even when product policy prohibits use",
);
check(
  prohibitedFreeText.policy === "prohibited" && !prohibitedFreeText.usable,
  "prohibited policy must remain orthogonal to runtime availability and make capability unusable",
);

const degradedAvailability: CapabilityAvailabilitySnapshot = {
  ...available,
  "free-text-input": "degraded",
};
const prohibitedDegradedFreeText = resolveSurfaceCapability(
  context("carplay", { availability: degradedAvailability }),
  "free-text-input",
);
check(
  prohibitedDegradedFreeText.availability === "degraded" &&
    prohibitedDegradedFreeText.policy === "prohibited" &&
    !prohibitedDegradedFreeText.usable,
  "policy must not rewrite degraded runtime availability",
);

check(
  !canUseFreeText(context("carplay")),
  "CarPlay baseline must not permit free text",
);
check(
  !canUseFreeText(context("android-auto")),
  "Android Auto baseline must not permit free text",
);
check(
  canUseFreeText(context("ios-phone")),
  "stopped iOS phone may use available free text",
);
check(
  !canUseFreeText(context("ios-phone", { isMoving: true })),
  "moving phone must block free text",
);
check(
  maxTouchSteps(context("android-phone", { isMoving: true })) === 2,
  "moving phone touch must be bounded",
);
check(
  maxTouchSteps(context("android-auto", { isMoving: true })) === 1,
  "moving automotive touch must be more restrictive",
);
check(
  maxTouchSteps(
    context("android-phone", { availability: unavailable }),
  ) === 0,
  "unsupported runtime touch capability must never be inferred from Surface kind",
);
check(
  !canPresentRichDetails(context("ios-phone", { isMoving: true })),
  "moving driver must not receive rich details",
);
check(
  canPresentRichDetails(
    context("ios-phone", { role: "passenger", isMoving: false }),
  ),
  "stopped phone passenger may receive rich details within Surface limits",
);
check(
  !canPresentRichDetails(
    context("carplay", { role: "passenger", isMoving: false }),
  ),
  "passenger role must not bypass automotive Surface constraints",
);

console.log("surface-capabilities checks: PASS");
