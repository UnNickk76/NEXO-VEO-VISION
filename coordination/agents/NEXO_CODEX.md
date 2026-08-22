# NEXO CODEX — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO CODEX
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- Current main: `ba39d977072231d69ef848b1cc9ae2637b556c72`.
- Latest main delta disables automatic TestFlight-on-push; production TestFlight is manual/Coordinator-controlled.
- PR #18 Android Readiness: OPEN / DRAFT, historical exact HEAD `1e50e747a60c9ebba0dc98fa6efb136ff456bbf1`, previously CLEAN with Android Readiness run #2 `32526155508` SUCCESS, but now stale/diverged against current main. Functional work must be preserved, not rewritten.
- PR #19 Navigation Domain Core: OPEN / DRAFT, historical exact HEAD `7210baef8693f1a8e77da8750ff2e4e597534cbe`, CHANGES REQUIRED with one residual P1 on V28. It is also stale/diverged against current main. Functional domain core must be preserved, not rewritten.
- Do not touch location/surface/voice/automotive native/EAS/TestFlight credentials.

## QUEUE — ONE TASK AT A TIME

- [ ] **NC.1A — RECONCILE PR #18 ANDROID READINESS TO CURRENT MAIN / RE-HANDOFF**
  - START CONDITION: SATISFIED / PRIORITY 3 after PR #24 and PR #17 consolidation sequence has been initiated by their owners.
  - CURRENT MAIN TO INCORPORATE: `ba39d977072231d69ef848b1cc9ae2637b556c72`.
  - PRESERVE: Android Readiness workflow and all newer main state; do NOT rewrite the already verified Android readiness slice.
  - REQUIRED ACTION: safe reconciliation only, preserving current main including manual-only TestFlight policy. Resolve shared reporting files in favor of current main plus this PR's own accurate report delta.
  - REQUIRED VERIFY: rerun Android Readiness on the new exact HEAD; record Expo Doctor, lint, Android config/package, SDK assertion, and Android prebuild results; align report/LATEST/FABIO_CONTROLLO without overwriting newer main history; explicit exact-SHA handoff to NEXO REVIEW.
  - DEFINITION OF DONE: new exact SHA, mergeable PR, current-main preservation verified, Android Readiness exact-head SUCCESS, reporting coherent, DRAFT, explicit REVIEW handoff.
  - Do not merge autonomously.

- [ ] **NC.1 — PR #19 CURRENT-MAIN RECONCILIATION + V28 REVIEW CORRECTION / RE-HANDOFF**
  - START CONDITION: NC.1A completed/reviewable and Coordinator has not changed serialization order.
  - REVIEW SOURCE: historical exact SHA `7210baef8693f1a8e77da8750ff2e4e597534cbe`, review ID `4998361255`; P0=0, P1=1, P2=0.
  - CURRENT MAIN TO INCORPORATE: use the then-current main after preceding consolidation, never the obsolete historical base.
  - PRESERVE: Navigation Domain core, Saved Places, all Location slices, Android Readiness if already merged, and manual-only TestFlight policy.
  - REQUIRED MINIMAL FIX: return V28 `Route Explanation` to `concettuale` with evidence consistent with no implemented/tested Route Explanation slice. Do not opportunistically implement Route Explanation.
  - REQUIRED VERIFY: rerun Navigation Domain checker plus applicable Expo Doctor/lint/conceptual validator on the reconciled exact content; reporting must reflect the actual new SHA and current main.
  - DEFINITION OF DONE: new exact SHA; PR mergeable; safe reconciliation + V28 correction; applicable VERIFY recorded; PR DRAFT; handoff to NEXO REVIEW; append personal report.
  - Do not merge autonomously.

- [ ] **NC.2 — ROUTE MODEL / PROVIDER CONTRACT HARDENING**
  - START CONDITION: PR #18 and PR #19 CLEAN and serialized/merged by Coordinator.
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
- 2026-08-22 coordinator consolidation refresh: main is `ba39d977...` and no new functional slice is authorized.
- PR #18 is now the first CODEX reconciliation target; PR #19 follows after #18 serialization unless Coordinator changes order based on fresh conflicts.
- Both historical implementations are to be preserved; only reconciliation, exact-head VERIFY, reporting and review gates are authorized.
