# NEXO REVIEW — Dedicated Review File

CONTROL BRANCH: `coordination/agent-control`.
OWNER: NEXO REVIEW
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- Review is independent: no implementation code changes, no merges, no Ready transitions, no build reruns, no credential changes.
- Current main: `ba39d977072231d69ef848b1cc9ae2637b556c72`.
- The latest main delta disables automatic TestFlight-on-push; production TestFlight is manual / Coordinator-controlled.
- Because main advanced after several historical CLEAN/reconciliation points, old mergeability/CLEAN evidence is historical only where the PR HEAD must change again.
- Consolidation freeze is active: review only exact SHAs explicitly handed off after reconciliation; do not review stale heads.

## REVIEW QUEUE — ONE AT A TIME

- [x] **R1 — PR #19 Navigation Domain Core historical SHA**
  - Reviewed exact SHA `7210baef8693f1a8e77da8750ff2e4e597534cbe`: CHANGES REQUIRED, P1 V28; review ID `4998361255`.

- [x] **R3 — PR #12 Saved Places Core**
  - CLEAN exact SHA `75b661afffc45887cad1e64c7845d56b6c658288`, review ID `4998454274`; merged.

- [x] **R2 — PR #20 Surface Capabilities historical SHA**
  - CLEAN exact SHA `6e13d42379a5cff26cb37a67944f89302b925ac4`, review ID `4998458851`; current branch requires a new reconciled SHA before any merge.

- [x] **R9 — PR #22 Location Contract**
  - CLEAN exact SHA `475c39539809361e7ede47f381e07f3be70454e3`, review ID `4998866766`; merged.

- [x] **R11 — PR #23 Location Permission / Degraded State Machine**
  - CLEAN exact SHA `73a01727345e0c8b5d7937c654b5eef76ee0b520`, review ID `4999414769`; merged.

- [ ] **R13R — PR #24 LOCATION QUALITY POLICY AFTER LATEST-MAIN RECONCILIATION**
  - START CONDITION: NEXO 1 hands off a new exact SHA after minimal reconciliation to current main, conservative C007 evidence, final reporting and applicable exact-head VERIFY.
  - PRIORITY: 1. Review this before the later backlog items when eligible.

- [ ] **R4R — PR #17 VOICE CORE AFTER LATEST-MAIN RECONCILIATION**
  - START CONDITION: NEXO 3 hands off a new exact SHA after minimal reconciliation to current main, Voice checker/strict compile, complete conceptual validator and final reporting.
  - PRIORITY: 2.

- [ ] **R8R — PR #18 ANDROID READINESS AFTER LATEST-MAIN RECONCILIATION**
  - START CONDITION: NEXO CODEX hands off a new mergeable exact SHA preserving Android Readiness and current main, with exact-head Android Readiness SUCCESS and reporting aligned.
  - PRIORITY: 3.

- [ ] **R6R — PR #19 NAVIGATION DOMAIN AFTER LATEST-MAIN RECONCILIATION + V28 FIX**
  - START CONDITION: NEXO CODEX hands off a new exact SHA after safe reconciliation, V28 correction, applicable exact-head VERIFY and reporting alignment.
  - PRIORITY: 4.

- [ ] **R7R — PR #20 SURFACE AFTER SAFE RECONCILIATION**
  - START CONDITION: NEXO 2 hands off a new exact SHA after safe current-main reconciliation, Surface checks and reporting. If reconciliation reported unresolved shared-file conflicts, do not review until Coordinator resolves/serializes them.
  - PRIORITY: 5.

## REVIEW ORDER — COORDINATOR DIRECTIVE
Use consolidation order R13R → R4R → R8R → R6R → R7R whenever those items become eligible. After every Coordinator merge, reread current main before reviewing the next PR; never reuse a prior mergeability snapshot as current proof. Never duplicate the same exact SHA.

## REVIEW LOOP
For every eligible item: READ AGENTS.md + Issue #11 + this file → verify exact PR/SHA/diff/checks/reporting/governance/current main → publish CLEAN or CHANGES REQUIRED → append review report + REVIEW NOTE → update queue → immediately reread. Historical CLEAN may support confidence, but only the current exact reconciled SHA can authorize Coordinator serialization.

## LAST EVIDENCE
- 2026-08-22 Coordinator consolidation refresh: current main `ba39d977...`.
- PR #24/#17 must reconcile once more because main advanced after their prior bases.
- PR #18/#19/#20 remain stale/diverged and require new exact-head handoff.
- Main is frozen from new functional expansion until this backlog is consolidated.
