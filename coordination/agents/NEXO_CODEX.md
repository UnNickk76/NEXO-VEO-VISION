# NEXO CODEX — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO CODEX
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- PR #19 `feat(navigation): add provider-neutral domain core`: OPEN / DRAFT.
- Exact SHA reviewed by NEXO REVIEW: `7210baef8693f1a8e77da8750ff2e4e597534cbe`.
- Latest verdict: CHANGES REQUIRED / NON CLEAN — P0=0, P1=1, P2=0; review ID `4998361255`.
- Residual P1: V28 `Route Explanation` marked `parziale` without implemented/tested slice.
- PR #12 has since merged to main as `47b9d0a5c20490f0b73e95e52fadca151e89e136`; fresh GitHub metadata reports PR #19 `mergeable=false` against updated main.
- Therefore NC.1 must reconcile current main first, then apply/verify the V28 correction without overwriting Saved Places conceptual/reporting state.
- Do not touch location/surface/voice/automotive native/EAS/TestFlight areas owned elsewhere.

## QUEUE — ONE TASK AT A TIME

- [ ] **NC.1 — POST-PR12 RECONCILIATION + PR #19 V28 REVIEW CORRECTION / RE-HANDOFF**
  - START CONDITION: immediate — latest exact-SHA review is CHANGES REQUIRED and PR is now non-mergeable after main advanced.
  - REVIEW SOURCE: PR #19 exact SHA `7210baef8693f1a8e77da8750ff2e4e597534cbe`, review ID `4998361255`; P0=0, P1=1, P2=0.
  - FIRST REQUIRED ACTION: reconcile/rebase against current main `47b9d0a5c20490f0b73e95e52fadca151e89e136`, preserving merged Saved Places conceptual/reporting state and Navigation ownership.
  - REQUIRED MINIMAL FIX: return V28 `Route Explanation` to `concettuale` with evidence consistent with no implemented Route Explanation slice. Do not opportunistically implement Route Explanation.
  - REQUIRED REPORT ALIGNMENT: historical report, `docs/codex-reports/LATEST.md` and `Fabio/FABIO_CONTROLLO.md` must stop presenting V28 as `parziale`, while preserving correct V06/V21/V26/V27 evidence and current-main reporting state.
  - REQUIRED VERIFY: obtain/record applicable final workflow/check result on the new exact SHA/content; do not reuse obsolete result as final proof after reconciliation/conceptual change.
  - DEFINITION OF DONE: new exact SHA; PR mergeable; diff shows safe main reconciliation + V28 correction without regression; reporting coherent; applicable VERIFY recorded; PR DRAFT; handoff to NEXO REVIEW; append personal report.
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
- CHANGES REQUIRED remains valid for old exact SHA `7210baef...`, review ID `4998361255`.
- 2026-08-22 02:05 UTC — PR #12 merged; main advanced to `47b9d0a5...`.
- Fresh PR #19 metadata: OPEN/DRAFT, `mergeable=false`.
- NC.1 remains ACTIONABLE NOW, expanded to include safe reconciliation before V28 re-handoff.
