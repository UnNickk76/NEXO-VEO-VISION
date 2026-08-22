# NEXO REVIEW — Dedicated Review File

CONTROL BRANCH: `coordination/agent-control`.
OWNER: NEXO REVIEW
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- Review is independent: no implementation code changes, no merges, no Ready transitions, no build reruns, no credential changes.
- Current main: `ba39d977072231d69ef848b1cc9ae2637b556c72`.
- Production TestFlight is manual / Coordinator-controlled.
- Consolidation freeze is active: review only exact SHAs explicitly handed off with required evidence; do not review stale/incomplete heads.
- PR #24 remains DRAFT at `8abc5d2dc39b2b8b63a62f63ffe8bc8cbed62a17`; it is diverged behind current main by 1 and NEXO 1 reports reconciliation/C007 finalization blocked. Not reviewable.
- PR #17 is now DRAFT/mergeable on exact HEAD `21665a6b0aeb986c37bbc70a23f55871d0723807`, base SHA exactly current main `ba39d977072231d69ef848b1cc9ae2637b556c72`. Author handoff is explicit in PR body and NEXO 3 task/report.
- Exact-head `NEXO 3 Voice Validation` run `32566648776` is completed/SUCCESS; associated exact-head Location Contract `32566648845` and Location State Machine `32566648797` are also SUCCESS. The prior jobless `action_required` blocker belonged to obsolete SHA `05f8211...` and is closed by newer evidence.
- PR #18/#19/#20 remain stale/non-mergeable and require reconciliation/new handoff.

## REVIEW QUEUE — ONE AT A TIME

- [x] **R1 — PR #19 Navigation Domain Core historical SHA**
  - Reviewed exact SHA `7210baef8693f1a8e77da8750ff2e4e597534cbe`: CHANGES REQUIRED, P1 V28; review ID `4998361255`.
- [x] **R3 — PR #12 Saved Places Core** — CLEAN and merged.
- [x] **R2 — PR #20 Surface Capabilities historical SHA** — CLEAN historical SHA `6e13d42379a5cff26cb37a67944f89302b925ac4`; new reconciled SHA required.
- [x] **R9 — PR #22 Location Contract** — CLEAN and merged.
- [x] **R11 — PR #23 Location Permission / Degraded State Machine** — CLEAN and merged.

- [ ] **R13R — PR #24 LOCATION QUALITY POLICY**
  - START CONDITION: NEXO 1 hands off a current-main-based exact SHA after conservative C007 evidence, final reporting and applicable exact-head VERIFY. Current `8abc5d2d...` is not eligible.
  - PRIORITY: 1 when eligible; do not idle REVIEW while it is blocked if the next item is genuinely eligible.

- [ ] **R4R — PR #17 VOICE CORE — REVIEW NOW**
  - START CONDITION: SATISFIED.
  - EXACT SHA: `21665a6b0aeb986c37bbc70a23f55871d0723807`.
  - REQUIRED EVIDENCE PRESENT: PR OPEN/DRAFT/mergeable; base=current main `ba39d977...`; explicit handoff; Voice Validation run `32566648776` SUCCESS on exact SHA, including Voice checker/TypeScript strict and complete conceptual validator per workflow/handoff.
  - REVIEW SCOPE: exact SHA/diff, provider-neutral/fail-closed Voice semantics, V02/V03/V34 conservative status/evidence, workflow evidence, mandatory reporting/governance. Publish CLEAN or CHANGES REQUIRED; append REVIEW report + REVIEW NOTE. Do not merge/Ready/build.
  - PRIORITY: ACTIVE NOW because R13R is blocked.

- [ ] **R8R — PR #18 ANDROID READINESS**
  - START CONDITION: NEXO CODEX hands off a new mergeable exact SHA preserving Android Readiness/current main, with exact-head Android Readiness SUCCESS and reporting aligned.
  - PRIORITY: 3.

- [ ] **R6R — PR #19 NAVIGATION DOMAIN**
  - START CONDITION: NEXO CODEX hands off a new exact SHA after safe reconciliation, V28 correction, applicable exact-head VERIFY and reporting alignment.
  - PRIORITY: 4.

- [ ] **R7R — PR #20 SURFACE**
  - START CONDITION: NEXO 2 hands off a new exact SHA after safe current-main reconciliation, Surface checks and reporting. If unresolved shared-file conflicts are reported, do not review until Coordinator resolves/serializes them.
  - PRIORITY: 5.

## REVIEW ORDER — COORDINATOR DIRECTIVE
Prefer consolidation order R13R → R4R → R8R → R6R → R7R, but a blocked earlier item does not prevent review of the next genuinely eligible exact SHA. After every Coordinator merge, reread current main before reviewing the next PR. Never duplicate an exact SHA and never treat `action_required`/jobless workflows as PASS.

## REVIEW LOOP
For every eligible item: READ AGENTS.md + Issue #11 + this file → verify exact PR/SHA/diff/checks/reporting/governance/current main → publish CLEAN or CHANGES REQUIRED → append review report + REVIEW NOTE → update queue → immediately reread.

## LAST EVIDENCE
- 2026-08-22 10:55 UTC coordinator watch: main `ba39d977...`.
- #24 `8abc5d2d...`: blocked/diverged behind main by 1; no final handoff.
- #17 `21665a6b...`: OPEN/DRAFT/mergeable, base exact current main, explicit handoff; exact-head Voice Validation `32566648776` SUCCESS. R4R is eligible now.
- #18/#19/#20 remain reconciliation-gated historical heads.
