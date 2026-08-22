import { SURFACE_CAPABILITY_MATRIX } from "./matrix";
import {
  SURFACE_CONTRACT_VERSION,
  type SurfaceContract,
  type SurfaceKind,
} from "./types";

const phoneContract = (kind: "ios-phone" | "android-phone"): SurfaceContract => ({
  contractVersion: SURFACE_CONTRACT_VERSION,
  kind,
  policy: SURFACE_CAPABILITY_MATRIX[kind],
  constraints: {
    whileMoving: {
      maxTouchSteps: 2,
      freeTextEntryAllowed: false,
      richDetailsAllowed: false,
      voicePreferred: true,
    },
    whileStopped: {
      maxTouchSteps: 8,
      freeTextEntryAllowed: true,
      richDetailsAllowed: true,
      voicePreferred: false,
    },
    passengerCanExpandWithinSurfaceLimits: true,
    surfaceRulesPrecedeRole: true,
  },
});

const automotiveContract = (
  kind: "carplay" | "android-auto",
): SurfaceContract => ({
  contractVersion: SURFACE_CONTRACT_VERSION,
  kind,
  policy: SURFACE_CAPABILITY_MATRIX[kind],
  constraints: {
    whileMoving: {
      maxTouchSteps: 1,
      freeTextEntryAllowed: false,
      richDetailsAllowed: false,
      voicePreferred: true,
    },
    whileStopped: {
      maxTouchSteps: 2,
      freeTextEntryAllowed: false,
      richDetailsAllowed: true,
      voicePreferred: true,
    },
    passengerCanExpandWithinSurfaceLimits: false,
    surfaceRulesPrecedeRole: true,
  },
});

/**
 * Conservative NEXO interaction profiles only. They do not prove entitlement,
 * runtime support, template availability, or platform permission.
 */
export const SURFACE_CONTRACTS: Readonly<Record<SurfaceKind, SurfaceContract>> = {
  "ios-phone": phoneContract("ios-phone"),
  "android-phone": phoneContract("android-phone"),
  carplay: automotiveContract("carplay"),
  "android-auto": automotiveContract("android-auto"),
};

export function getSurfaceContract(kind: SurfaceKind): SurfaceContract {
  return SURFACE_CONTRACTS[kind];
}
