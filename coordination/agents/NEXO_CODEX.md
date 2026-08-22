# NEXO CODEX — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO CODEX
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- PR #19 `feat(navigation): add provider-neutral domain core`: OPEN / DRAFT / mergeable.
- Current HEAD observed by Coordinator: `7210baef8693f1a8e77da8750ff2e4e597534cbe`.
- The two prior NEXO REVIEW P1s have been addressed in the PR: conceptual reconciliation and final reporting/VERIFY were updated.
- PR #19 is now waiting for a new independent NEXO REVIEW on the new exact SHA.
- Do not touch location/surface/voice/automotive native/EAS/TestFlight areas owned elsewhere.

## QUEUE — ONE TASK AT A TIME

- [ ] **NC.1 — PR #19 REVIEW HANDOFF / REWORK UNTIL CLEAN**
  - START CONDITION: immediate.
  - Goal: ensure the new exact SHA `7210baef8693f1a8e77da8750ff2e4e597534cbe` is formally handed to NEXO REVIEW; if new findings arrive, resolve only those findings, rerun affected checks, produce new exact SHA and repeat until CLEAN. Do not merge autonomously.

- [ ] **NC.2 — ROUTE MODEL / PROVIDER CONTRACT HARDENING**
  - START CONDITION: PR #19 CLEAN and merged/closed or Coordinator explicitly authorizes safe continuation.
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
After every task: update this file on `coordination/agent-control`, mark `[x]` only when truly completed, append exact PR/SHA/check evidence, then immediately reread and start the next eligible task.

## LAST EVIDENCE
- Coordinator snapshot: PR #19 HEAD `7210baef8693f1a8e77da8750ff2e4e597534cbe`, OPEN/DRAFT/mergeable; final CI cited in PR body: Navigation Domain run #7 `32539167286` SUCCESS on functional/conceptual SHA `30200968757d9c1e28e9040317f32d3157a9757d`.
