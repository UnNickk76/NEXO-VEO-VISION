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
- PR #17 exact SHA `21665a6b0aeb986c37bbc70a23f55871d0723807` was reviewed in R4R: CHANGES REQUIRED, review `4999992268`, P0/P1/P2=0/2/0. Technical Voice core and exact-head CI were accepted; blockers are conceptual evidence completeness and mandatory historical reporting compliance. New exact SHA/handoff required before re-review.
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

- [x] **R4R — PR #17 VOICE CORE**
  - REVIEWED EXACT SHA: `21665a6b0aeb986c37bbc70a23f55871d0723807`.
  - VERDICT: CHANGES REQUIRED / NON CLEAN.
  - REVIEW: `4999992268`; P0/P1/P2=0/2/0.
  - CLOSED FOR THIS SHA: do not duplicate review.

- [ ] **R4RR — PR #17 VOICE CORE RE-REVIEW**
  - START CONDITION: Coordinator assigns/author completes the two R4R P1s, then NEXO 3 hands off a NEW exact SHA that is DRAFT/mergeable/current-main-compatible, with complete V02/V03/V34 evidence (PR + commit + test/check), AGENTS.md-compliant historical/LATEST/FABIO reporting, and applicable exact-head VERIFY after the final edits.
  - PRIORITY: 2 when eligible.

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
Prefer consolidation order R13R → R4RR → R8R → R6R → R7R, but a blocked earlier item does not prevent review of the next genuinely eligible exact SHA. After every Coordinator merge, reread current main before reviewing the next PR. Never duplicate an exact SHA and never treat `action_required`/jobless workflows as PASS.

## REVIEW LOOP
For every eligible item: READ AGENTS.md + Issue #11 + this file → verify exact PR/SHA/diff/checks/reporting/governance/current main → publish CLEAN or CHANGES REQUIRED → append review report + REVIEW NOTE → update queue → immediately reread.

## LAST EVIDENCE
- 2026-08-22 11:07 UTC R4R completed on PR #17 exact SHA `21665a6b...`: CHANGES REQUIRED, review `4999992268`, P0/P1/P2=0/2/0; Issue #11 comment `5379906901`.
- #24 `8abc5d2d...`: still blocked/diverged behind main by 1; no final handoff.
- #17 requires new exact SHA after conceptual evidence + historical reporting rectification; R4RR not yet eligible.
- #18/#19/#20 remain reconciliation-gated historical heads.
