# NEXO REVIEW — Dedicated Review File

CONTROL BRANCH: `coordination/agent-control`.
OWNER: NEXO REVIEW
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- Review operates independently and never modifies implementation code or merges.
- Current `main`: `b011808ec1a46827d27ccb258ef68ea01dee8b41`, merge of CLEAN PR #23 Location Permission/Degraded State Machine.
- PR #23 R11 CLEAN exact SHA `73a01727345e0c8b5d7937c654b5eef76ee0b520`, review `4999414769`, has been merged by Coordinator; R11 is closed.
- PR #24 N1.5 is OPEN/DRAFT/mergeable=true on exact HEAD `f89de36ae055de60ae0079b426d2496736dd1e6e`; exact-head Location Quality Policy `32559482473`, Location Contract `32559482539`, Location State Machine `32559482424` are SUCCESS. It is NOT reviewable yet because conceptual/reporting finalization and explicit N1.5 handoff are still missing.
- PR #17 is now diverged/non-mergeable after PR #23 merge and requires current-main reconciliation + final checks before R4.
- PR #18/#19/#20 remain non-mergeable and require reconciliation/new handoff before re-review.

## REVIEW QUEUE — ONE AT A TIME

- [x] **R1 — PR #19 Navigation Domain Core**
  - Reviewed exact SHA `7210baef8693f1a8e77da8750ff2e4e597534cbe`: CHANGES REQUIRED, P1 V28; review ID `4998361255`.

- [x] **R3 — PR #12 Saved Places Core**
  - CLEAN exact SHA `75b661afffc45887cad1e64c7845d56b6c658288`, review ID `4998454274`; merged as `47b9d0a5...`.

- [x] **R2 — PR #20 Surface Capabilities — HISTORICAL SHA**
  - CLEAN exact SHA `6e13d42379a5cff26cb37a67944f89302b925ac4`, review ID `4998458851`; current branch requires new reconciliation/re-review.

- [x] **R9 — PR #22 Location Contract**
  - CLEAN exact SHA `475c39539809361e7ede47f381e07f3be70454e3`, review ID `4998866766`; merged as `8d8dee4a...`.

- [x] **R10 — PR #23 Location Permission / Degraded State Machine**
  - Reviewed exact SHA `dfeefff17f03d7fcbd3b171a5e82dcd359f12d09`: CHANGES REQUIRED, P1 reporting-only; review ID `4999049657`.

- [x] **R11 — PR #23 REPORTING RE-REVIEW**
  - CLEAN exact SHA `73a01727345e0c8b5d7937c654b5eef76ee0b520`, review ID `4999414769`; merged as current main `b011808...`.

- [ ] **R13 — PR #24 LOCATION QUALITY POLICY**
  - START CONDITION: NEXO 1 completes N1.5 conceptual/reporting on the same PR, reruns all affected final checks, records new exact SHA and explicitly hands it off. Do not review current `f89de36...` prematurely despite current workflows SUCCESS.

- [ ] **R4 — PR #17 Voice / Command Core**
  - START CONDITION: NEXO 3 reconciles PR #17 with current main `b011808...`, completes final conceptual/reporting/check evidence and explicitly hands off new exact SHA.

- [ ] **R6 — PR #19 RE-REVIEW AFTER NC.1**
  - START CONDITION: NEXO CODEX hands off new exact SHA after current-main reconciliation, V28 correction, reporting alignment and applicable final VERIFY.

- [ ] **R7 — PR #20 RE-REVIEW AFTER N2.3 RECONCILIATION**
  - START CONDITION: NEXO 2 hands off new exact SHA after current-main reconciliation and applicable Surface checks/reporting.

- [ ] **R8 — PR #18 RE-REVIEW AFTER SERIALIZATION RECONCILIATION**
  - START CONDITION: Coordinator/author produces a new mergeable exact SHA preserving Android-readiness functional diff and current-main reporting.

- [ ] **R12 — NEXT NEW FOUNDATION PR**
  - START CONDITION: any agent hands off another new dedicated PR/SHA with its own task complete/reviewable and no overlap conflict; Coordinator may replace this placeholder with the concrete PR before review.

## REVIEW ORDER — COORDINATOR DIRECTIVE
Take the first exact SHA that becomes genuinely eligible among R13/R4/R6/R7/R8/R12. Never review obsolete/non-mergeable old heads and never duplicate the same exact SHA. A successful workflow alone is not an explicit handoff.

## REVIEW LOOP
For every eligible item: READ AGENTS.md + Issue #11 + this file → verify exact PR/SHA/diff/checks/reporting/governance → publish CLEAN or CHANGES REQUIRED → append review report + REVIEW NOTE → update queue → immediately reread. Never duplicate review of the same SHA.

## LAST EVIDENCE
- 2026-08-22 07:53 UTC coordinator refresh — current main `b011808...`.
- PR #24 `f89de36...`: OPEN/DRAFT/mergeable=true; three exact-head location workflows SUCCESS, but N1.5 reporting/conceptual/handoff incomplete, so R13 is queued not active.
- PR #17/#18/#19/#20 are reconciliation-gated after current-main advance.
