# NEXO REVIEW — Dedicated Review File

CONTROL BRANCH: `coordination/agent-control`.
OWNER: NEXO REVIEW
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- Review is independent: no implementation code changes, no merges, no Ready transitions, no build reruns, no credential changes.
- Current main: `ba39d977072231d69ef848b1cc9ae2637b556c72`.
- Production TestFlight is manual / Coordinator-controlled.
- Consolidation freeze is active: review only exact SHAs explicitly handed off with required evidence; do not review stale/incomplete heads.
- PR #24 remains DRAFT at `8abc5d2dc39b2b8b63a62f63ffe8bc8cbed62a17`; it is mergeable but compare is diverged (ahead 7 / behind 1), and NEXO 1 reports C007/final handoff still blocked. Not reviewable.
- PR #17 is DRAFT/mergeable on exact HEAD `05f8211ec55fa41d869e1000e64ccd4ba2b8694b`; compare is ahead/behind=0, so reconciliation is complete. However exact-head Voice Validation run `32566568206` is `action_required` with zero jobs, so no valid final handoff yet.
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
  - PRIORITY: 1.

- [ ] **R4R — PR #17 VOICE CORE**
  - START CONDITION: NEXO 3 resolves/diagnoses the jobless `action_required` exact-head validation gate and explicitly hands off a final SHA with real Voice checker/strict compile + complete conceptual validator evidence. Current `05f8211...` is not eligible yet.
  - PRIORITY: 2.

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
Use consolidation order R13R → R4R → R8R → R6R → R7R whenever eligible. After every Coordinator merge, reread current main before reviewing the next PR. Never duplicate an exact SHA and never treat `action_required`/jobless workflows as PASS.

## REVIEW LOOP
For every eligible item: READ AGENTS.md + Issue #11 + this file → verify exact PR/SHA/diff/checks/reporting/governance/current main → publish CLEAN or CHANGES REQUIRED → append review report + REVIEW NOTE → update queue → immediately reread.

## LAST EVIDENCE
- 2026-08-22 coordinator watch: main remains `ba39d977...`.
- #24 `8abc5d2d...`: mergeable but diverged behind current main by 1; author reports C007/final handoff incomplete.
- #17 `05f8211...`: mergeable and fully based on current main, but exact-head Voice Validation `32566568206` = action_required/jobs=0; not reviewable yet.
- #18/#19/#20 remain non-mergeable historical heads.
