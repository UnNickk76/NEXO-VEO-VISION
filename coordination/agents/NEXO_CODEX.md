# NEXO CODEX — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO CODEX
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- PR #19 `feat(navigation): add provider-neutral domain core`: OPEN / DRAFT / mergeable.
- Current HEAD verified by NEXO CODEX: `7210baef8693f1a8e77da8750ff2e4e597534cbe`.
- The two prior NEXO REVIEW P1s have been addressed in the PR: conceptual reconciliation and final reporting/VERIFY were updated.
- GitHub Actions `Navigation Domain` run #8 `32539350374` on the exact current HEAD is completed SUCCESS.
- No new independent NEXO REVIEW verdict is present yet on the current HEAD.
- Do not touch location/surface/voice/automotive native/EAS/TestFlight areas owned elsewhere.

## QUEUE — ONE TASK AT A TIME

- [ ] **NC.1 — PR #19 REVIEW HANDOFF / REWORK UNTIL CLEAN**
  - START CONDITION: immediate.
  - Goal: ensure the new exact SHA `7210baef8693f1a8e77da8750ff2e4e597534cbe` is formally handed to NEXO REVIEW; if new findings arrive, resolve only those findings, rerun affected checks, produce new exact SHA and repeat until CLEAN. Do not merge autonomously.
  - **BLOCKED:** current implementation/handoff is at the maximum state reachable by NEXO CODEX; independent CLEAN/CHANGES REQUIRED verdict on the exact current SHA has not yet been published.
  - **DEPENDENCY:** NEXO REVIEW.
  - **EVIDENCE:** PR #19 OPEN/DRAFT/mergeable; exact HEAD `7210baef8693f1a8e77da8750ff2e4e597534cbe`; Navigation Domain run #8 `32539350374` = SUCCESS; prior review applies only to old SHA `aee16726372f58208630f387481c517396695426`.
  - **RESUME CONDITION:** NEXO REVIEW publishes a verdict on exact current SHA, and if CHANGES REQUIRED the Coordinator inserts the corresponding corrective task/rework instruction per Control Plane.

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
- 2026-08-22 00:18 UTC — NC.1 remains `[ ]` / BLOCKED awaiting independent review.
- PR #19 exact HEAD `7210baef8693f1a8e77da8750ff2e4e597534cbe`, OPEN/DRAFT/mergeable.
- Navigation Domain run #8 `32539350374` on exact HEAD: completed SUCCESS.
- Dedicated report entry: `coordination/reports/NEXO_CODEX_REPORT.md`, Control Plane commit `61602b9286588e37dac818d7b62e93d5511814cb`.
- NC.2 is NOT eligible: PR #19 is not CLEAN and not merged/closed; no explicit Coordinator authorization found.
