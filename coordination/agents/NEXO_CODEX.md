# NEXO CODEX — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO CODEX
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- PR #19 `feat(navigation): add provider-neutral domain core`: OPEN / DRAFT, exact HEAD `7210baef8693f1a8e77da8750ff2e4e597534cbe`, fresh metadata `mergeable=false`.
- Latest exact-SHA review remains CHANGES REQUIRED / NON CLEAN — P0=0, P1=1, P2=0; review ID `4998361255`.
- Residual P1: V28 `Route Explanation` marked `parziale` without implemented/tested slice.
- Current main after PR #22 Location Contract merge: `8d8dee4a31416acb38c2e654082ca15efafd6fec`.
- NC.1 must reconcile this NEW main first, preserving Saved Places + Location Contract/C007 conceptual/reporting, then apply/verify the minimal V28 correction.
- Do not touch location/surface/voice/automotive native/EAS/TestFlight areas owned elsewhere.

## QUEUE — ONE TASK AT A TIME

- [ ] **NC.1 — CURRENT-MAIN RECONCILIATION + PR #19 V28 REVIEW CORRECTION / RE-HANDOFF**
  - START CONDITION: immediate — exact-SHA review is CHANGES REQUIRED and PR is non-mergeable after main advances.
  - REVIEW SOURCE: PR #19 exact SHA `7210baef8693f1a8e77da8750ff2e4e597534cbe`, review ID `4998361255`; P0=0, P1=1, P2=0.
  - FIRST REQUIRED ACTION: reconcile/rebase against current main `8d8dee4a31416acb38c2e654082ca15efafd6fec`, preserving merged Saved Places + Location Contract/C007 conceptual/reporting state and Navigation ownership.
  - REQUIRED MINIMAL FIX: return V28 `Route Explanation` to `concettuale` with evidence consistent with no implemented Route Explanation slice. Do not opportunistically implement Route Explanation.
  - REQUIRED REPORT ALIGNMENT: historical report, `docs/codex-reports/LATEST.md` and `Fabio/FABIO_CONTROLLO.md` must stop presenting V28 as `parziale`, while preserving correct V06/V21/V26/V27 evidence and NEW current-main reporting state.
  - REQUIRED VERIFY: obtain/record applicable final workflow/check result on the new exact SHA/content; do not reuse obsolete result as final proof after reconciliation/conceptual change.
  - DEFINITION OF DONE: new exact SHA; PR mergeable; diff shows safe current-main reconciliation + V28 correction without regression; reporting coherent; applicable VERIFY recorded; PR DRAFT; handoff to NEXO REVIEW; append personal report.
  - Do not merge autonomously.

- [ ] **NC.2 — ROUTE MODEL / PROVIDER CONTRACT HARDENING**
  - START CONDITION: NC.1 receives CLEAN and PR #19 is merged/closed, or Coordinator explicitly authorizes safe continuation after CLEAN.
  - Goal: route IDs, legs/steps/maneuvers, distance/duration, provenance/status and provider-neutral adapter semantics; no provider concrete and no invented route.

- [ ] **NC.3 — NAVIGATION SESSION STATE MACHINE HARDENING**
  - START CONDITION: NC.2 completed.
  - Goal: idle/planning/ready/navigating/paused/arrived/cancelled/error transitions with deterministic guards/tests.

- [ ] **NC.4 — REROUTE POLICY CONTRACT**
  - START CONDITION: NC.3 completed.
  - Goal: off-route/user-request/traffic-change event model, stale-route handling, no silent destination mutation, fake adapter tests.

- [ ] **NC.5 — TBT DOMAIN CONTRACT**
  - START CONDITION: NC.4 completed.
  - Goal: maneuver/instruction/lane/signpost provider-neutral data model with conservative fallbacks; no UI/voice implementation.

- [ ] **NC.6 — NAVIGATION FOUNDATION HARDENING / REVIEW**
  - START CONDITION: NC.5 completed.
  - Goal: invariants, test matrix, conservative conceptual reconciliation V06/V21/V26/V27/V28, gap report toward real routing/map providers and automotive, NEXO REVIEW handoff.

## UPDATE RULE
After every task: update this file on `coordination/agent-control`, mark `[x]` only when truly completed, append exact PR/SHA/check evidence, write chat + GitHub report, then immediately reread and start the next eligible task.

## LAST EVIDENCE
- CHANGES REQUIRED remains valid for exact SHA `7210baef...`, review ID `4998361255`.
- 2026-08-22 04:05 UTC — main advanced via CLEAN PR #22 to `8d8dee4a31416acb38c2e654082ca15efafd6fec`.
- Fresh PR #19 metadata: OPEN/DRAFT, HEAD `7210baef...`, `mergeable=false`.
- NC.1 remains ACTIONABLE NOW; reconciliation must target the new main and preserve C007/location work.
