import type {
  CapabilityAvailability,
  CapabilityAvailabilitySnapshot,
  SurfaceCapability,
  SurfaceCapabilityPolicy,
  SurfaceKind,
} from "./types";

/**
 * Canonical NEXO product-policy matrix. This is provider-neutral and does not
 * prove runtime support, entitlement, native template availability, or OS permission.
 */
export const SURFACE_CAPABILITY_MATRIX: Readonly<
  Record<SurfaceKind, SurfaceCapabilityPolicy>
> = {
  "ios-phone": {
    "primary-navigation-presentation": "permitted",
    "voice-command-input": "permitted",
    "touch-command-input": "permitted",
    "free-text-input": "permitted",
    "rich-detail-presentation": "permitted",
    "secondary-actions": "permitted",
  },
  "android-phone": {
    "primary-navigation-presentation": "permitted",
    "voice-command-input": "permitted",
    "touch-command-input": "permitted",
    "free-text-input": "permitted",
    "rich-detail-presentation": "permitted",
    "secondary-actions": "permitted",
  },
  carplay: {
    "primary-navigation-presentation": "permitted",
    "voice-command-input": "permitted",
    "touch-command-input": "constrained",
    "free-text-input": "prohibited",
    "rich-detail-presentation": "constrained",
    "secondary-actions": "constrained",
  },
  "android-auto": {
    "primary-navigation-presentation": "permitted",
    "voice-command-input": "permitted",
    "touch-command-input": "constrained",
    "free-text-input": "prohibited",
    "rich-detail-presentation": "constrained",
    "secondary-actions": "constrained",
  },
};

export const FAIL_CLOSED_AVAILABILITY: CapabilityAvailabilitySnapshot = {
  "primary-navigation-presentation": "unsupported",
  "voice-command-input": "unsupported",
  "touch-command-input": "unsupported",
  "free-text-input": "unsupported",
  "rich-detail-presentation": "unsupported",
  "secondary-actions": "unsupported",
};

/**
 * Normalizes a partial runtime report into a complete snapshot. Missing values
 * fail closed to `unsupported`; provided runtime values are never upgraded.
 */
export function createCapabilityAvailabilitySnapshot(
  reported: Partial<Record<SurfaceCapability, CapabilityAvailability>> = {},
): CapabilityAvailabilitySnapshot {
  return {
    ...FAIL_CLOSED_AVAILABILITY,
    ...reported,
  };
}
