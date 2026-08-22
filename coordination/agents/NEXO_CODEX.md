# NEXO CODEX — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO CODEX
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- PR #19 `feat(navigation): add provider-neutral domain core`: OPEN / DRAFT / mergeable.
- Exact SHA reviewed by NEXO REVIEW: `7210baef8693f1a8e77da8750ff2e4e597534cbe`.
- Latest independent verdict on that exact SHA: **CHANGES REQUIRED / NON CLEAN** — P0=0, P1=1, P2=0; review ID `4998361255`.
- Residual P1 is governance/evidence only: V28 `Route Explanation` is marked `parziale` without a corresponding implemented/tested slice.
- Previous P1s for V06/V21/V26/V27 and final reporting/VERIFY were judged substantially corrected by NEXO REVIEW.
- Navigation Domain run #7 `32539167286`, job `96945567260` = SUCCESS; NEXO CODEX also recorded run #8 `32539350374` on the then-current HEAD as SUCCESS.
- Do not touch location/surface/voice/automotive native/EAS/TestFlight areas owned elsewhere.

## QUEUE — ONE TASK AT A TIME

- [ ] **NC.1 — PR #19 V28 REVIEW CORRECTION / RE-HANDOFF**
  - START CONDITION: immediate — latest exact-SHA review is CHANGES REQUIRED.
  - REVIEW SOURCE: PR #19 exact SHA `7210baef8693f1a8e77da8750ff2e4e597534cbe`, review ID `4998361255`.
  - P0=0, P1=1, P2=0.
  - REQUIRED MINIMAL FIX: return V28 `Route Explanation` to `concettuale` with evidence consistent with no implemented Route Explanation slice. Do **not** invent or opportunistically implement Route Explanation unless a later task explicitly requests it.
  - REQUIRED REPORT ALIGNMENT: historical report, `docs/codex-reports/LATEST.md` and `Fabio/FABIO_CONTROLLO.md` must stop presenting V28 as `parziale` for this domain-core slice while preserving correct V06/V21/V26/V27 evidence.
  - REQUIRED VERIFY: if `NEXO_CONCEPTUAL_MASTER.md` changes and the Navigation Domain workflow applies, obtain and record the new applicable workflow/check result on the new exact SHA; do not reuse an obsolete result as final proof.
  - DEFINITION OF DONE: new exact SHA; diff shows V28 corrected without regressions to V06/V21/V26/V27; reporting coherent; applicable VERIFY recorded; PR remains DRAFT; handoff to NEXO REVIEW; chat report + append to `coordination/reports/NEXO_CODEX_REPORT.md`.
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
- 2026-08-22 00:41 UTC — Coordinator verified the new independent review on PR #19 exact SHA `7210baef8693f1a8e77da8750ff2e4e597534cbe`.
- Verdict: CHANGES REQUIRED / NON CLEAN — P0=0, P1=1, P2=0; review ID `4998361255`.
- NC.1 is now ACTIVE and no longer blocked waiting for review.
- NC.2 remains NOT eligible until NC.1 is CLEAN and merge/closure or explicit safe-continuation authorization occurs.
