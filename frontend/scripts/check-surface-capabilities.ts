import {
  FAIL_CLOSED_AVAILABILITY,
  SURFACE_CAPABILITIES,
  SURFACE_CAPABILITY_MATRIX,
  SURFACE_CONTRACTS,
  SURFACE_KINDS,
  canPresentRichDetails,
  canUseFreeText,
  createCapabilityAvailabilitySnapshot,
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

const expectedKinds = [
  "ios-phone",
  "android-phone",
  "carplay",
  "android-auto",
];
const expectedCapabilities = [
  "primary-navigation-presentation",
  "voice-command-input",
  "touch-command-input",
  "free-text-input",
  "rich-detail-presentation",
  "secondary-actions",
];

check(
  JSON.stringify(SURFACE_KINDS) === JSON.stringify(expectedKinds),
  "Surface kind order/content must remain deterministic",
);
check(
  JSON.stringify(SURFACE_CAPABILITIES) === JSON.stringify(expectedCapabilities),
  "Surface capability order/content must remain deterministic",
);

for (const kind of SURFACE_KINDS) {
  const policyKeys = Object.keys(SURFACE_CAPABILITY_MATRIX[kind]);
  check(
    JSON.stringify(policyKeys) === JSON.stringify(SURFACE_CAPABILITIES),
    `${kind} policy must define every canonical capability exactly once`,
  );
  check(
    SURFACE_CONTRACTS[kind].policy === SURFACE_CAPABILITY_MATRIX[kind],
    `${kind} contract must consume the canonical matrix entry`,
  );
}

check(
  SURFACE_CAPABILITY_MATRIX["ios-phone"]["free-text-input"] === "permitted" &&
    SURFACE_CAPABILITY_MATRIX["android-phone"]["free-text-input"] === "permitted",
  "phone free-text baseline must be permitted before contextual constraints",
);
check(
  SURFACE_CAPABILITY_MATRIX.carplay["free-text-input"] === "prohibited" &&
    SURFACE_CAPABILITY_MATRIX["android-auto"]["free-text-input"] === "prohibited",
  "automotive free-text baseline must be prohibited",
);
check(
  SURFACE_CAPABILITY_MATRIX.carplay["touch-command-input"] === "constrained" &&
    SURFACE_CAPABILITY_MATRIX["android-auto"]["touch-command-input"] === "constrained",
  "automotive touch baseline must be constrained",
);

for (const capability of SURFACE_CAPABILITIES) {
  check(
    FAIL_CLOSED_AVAILABILITY[capability] === "unsupported",
    `fail-closed baseline must mark ${capability} unsupported`,
  );
}

const partialRuntime = createCapabilityAvailabilitySnapshot({
  "voice-command-input": "available",
  "touch-command-input": "degraded",
});
check(
  partialRuntime["voice-command-input"] === "available" &&
    partialRuntime["touch-command-input"] === "degraded",
  "reported runtime availability must be preserved",
);
check(
  partialRuntime["primary-navigation-presentation"] === "unsupported" &&
    partialRuntime["free-text-input"] === "unsupported" &&
    partialRuntime["rich-detail-presentation"] === "unsupported" &&
    partialRuntime["secondary-actions"] === "unsupported",
  "missing runtime availability must fail closed to unsupported",
);

const available: CapabilityAvailabilitySnapshot = {
  "primary-navigation-presentation": "available",
  "voice-command-input": "available",
  "touch-command-input": "available",
  "free-text-input": "available",
  "rich-detail-presentation": "available",
  "secondary-actions": "available",
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
  "prohibited policy must stay orthogonal to runtime availability",
);

const degradedAvailability = createCapabilityAvailabilitySnapshot({
  ...available,
  "free-text-input": "degraded",
});
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

check(!canUseFreeText(context("carplay")), "CarPlay must not permit free text");
check(
  !canUseFreeText(context("android-auto")),
  "Android Auto must not permit free text",
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
    context("android-phone", {
      availability: createCapabilityAvailabilitySnapshot(),
    }),
  ) === 0,
  "missing runtime touch capability must fail closed",
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
