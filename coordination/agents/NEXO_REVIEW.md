# NEXO REVIEW — Dedicated Review File

CONTROL BRANCH: `coordination/agent-control`.
OWNER: NEXO REVIEW
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- Review is independent: no implementation code changes, merges, Ready transitions, build reruns or credential changes.
- Current main: `1d0a01c91bb328baf141560a534f4b62fe406b01` after CLEAN PR #17 merge.
- Production TestFlight is manual / Coordinator-controlled.
- Consolidation freeze is active: review only exact SHAs explicitly handed off with required evidence.
- PR #17 R4RR: CLEAN exact SHA `8f82b692d2cc6759c4ce773c791f3725f85e4062`, review `5000238141`; Coordinator serialized and squash-merged as `1d0a01c91bb328baf141560a534f4b62fe406b01`. CLOSED.
- PR #24 remains OPEN/DRAFT and is now mergeable=false on stale HEAD `8abc5d2dc39b2b8b63a62f63ffe8bc8cbed62a17`; current compare is diverged ahead 7 / behind 2. Not reviewable until reconciliation/final handoff.
- PR #18/#19/#20 remain stale/non-mergeable historical heads and require reconciliation/new handoff.

## REVIEW QUEUE — ONE AT A TIME

- [x] **R1 — PR #19 Navigation Domain Core historical SHA** — CHANGES REQUIRED on `7210baef...`.
- [x] **R3 — PR #12 Saved Places Core** — CLEAN and merged.
- [x] **R2 — PR #20 Surface Capabilities historical SHA** — CLEAN historical SHA; re-review required after reconciliation.
- [x] **R9 — PR #22 Location Contract** — CLEAN and merged.
- [x] **R11 — PR #23 Location Permission / Degraded State Machine** — CLEAN and merged.
- [x] **R4R — PR #17 Voice old SHA** — CHANGES REQUIRED historical.
- [x] **R4RR — PR #17 Voice final SHA** — CLEAN `8f82b692...`, review `5000238141`, merged as current main `1d0a01c9...`.

- [ ] **R13R — PR #24 LOCATION QUALITY POLICY**
  - START CONDITION: NEXO 1 hands off a current-main-based mergeable exact SHA after conservative C007 evidence, final reporting and applicable exact-head VERIFY.
  - CURRENT `8abc5d2d...` IS NOT ELIGIBLE.
  - PRIORITY: 1 when eligible.

- [ ] **R8R — PR #18 ANDROID READINESS**
  - START CONDITION: NEXO CODEX hands off new mergeable exact SHA preserving current main with exact-head Android Readiness SUCCESS and reporting aligned.
  - PRIORITY: 2 after #24.

- [ ] **R6R — PR #19 NAVIGATION DOMAIN**
  - START CONDITION: NEXO CODEX hands off new exact SHA after safe reconciliation, V28 correction, applicable exact-head VERIFY and reporting alignment.
  - PRIORITY: 3.

- [ ] **R7R — PR #20 SURFACE**
  - START CONDITION: NEXO 2 hands off new exact SHA after safe current-main reconciliation, Surface checks and reporting.
  - PRIORITY: 4.

## REVIEW ORDER — COORDINATOR DIRECTIVE
Prefer R13R → R8R → R6R → R7R. Blocked earlier items do not prevent the next genuinely eligible exact SHA. After every Coordinator merge, reread current main before reviewing the next PR. Never duplicate an exact SHA.

## REVIEW LOOP
For every eligible item: READ AGENTS.md + Issue #11 + this file → verify exact PR/SHA/diff/checks/reporting/governance/current main → publish CLEAN or CHANGES REQUIRED → append review report + REVIEW NOTE → update queue → immediately reread.

## LAST EVIDENCE
- PR #17 exact SHA `8f82b692...` CLEAN, review `5000238141`, no review threads; Coordinator Ready + squash merge successful.
- New main: `1d0a01c91bb328baf141560a534f4b62fe406b01`.
- #24 is now diverged ahead 7 / behind 2 and mergeable=false; no review until fresh handoff.
- #18/#19/#20 remain reconciliation-gated.
