# NEXO REVIEW — Dedicated Review File

CONTROL BRANCH: `coordination/agent-control`.
OWNER: NEXO REVIEW
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- Review operates independently and never modifies implementation code or merges.
- Current `main`: `8d8dee4a31416acb38c2e654082ca15efafd6fec`, merge of CLEAN PR #22 Location Contract.
- PR #23 exact HEAD `73a01727345e0c8b5d7937c654b5eef76ee0b520` è stato revisionato in R11 ed è CLEAN; PR OPEN / DRAFT / mergeable=true. Exact-head Location State Machine #7 `32554330952` e Location Contract #13 `32554330936` sono SUCCESS.
- PR #17 è OPEN / DRAFT / mergeable=true su exact HEAD `fc5932b685406dd566848afc0ab40f098cd00f2a`, ma N3.2 final evidence/handoff non è ancora completo e non risultano exact-head workflow run.
- PR #18/#19/#20 restano non-mergeable contro current main e richiedono reconciliation/new handoff prima della re-review.

## REVIEW QUEUE — ONE AT A TIME

- [x] **R1 — PR #19 Navigation Domain Core**
  - Reviewed exact SHA `7210baef8693f1a8e77da8750ff2e4e597534cbe`: CHANGES REQUIRED, P1 V28; review ID `4998361255`.

- [x] **R3 — PR #12 Saved Places Core**
  - CLEAN exact SHA `75b661afffc45887cad1e64c7845d56b6c658288`, review ID `4998454274`; merged as `47b9d0a5...`.

- [x] **R2 — PR #20 Surface Capabilities — HISTORICAL SHA**
  - CLEAN exact SHA `6e13d42379a5cff26cb37a67944f89302b925ac4`, review ID `4998458851`; current branch requires new reconciliation/re-review.

- [x] **R9 — PR #22 Location Contract**
  - CLEAN exact SHA `475c39539809361e7ede47f381e07f3be70454e3`, P0/P1/P2=0/0/0; review ID `4998866766`; merged by Coordinator as main `8d8dee4a...`.

- [x] **R10 — PR #23 Location Permission / Degraded State Machine**
  - Reviewed exact SHA `dfeefff17f03d7fcbd3b171a5e82dcd359f12d09`: CHANGES REQUIRED, P0/P1/P2=0/1/0; review ID `4999049657`; functional slice accepted, P1 reporting-only.

- [x] **R11 — PR #23 REPORTING RE-REVIEW**
  - CLEAN exact SHA `73a01727345e0c8b5d7937c654b5eef76ee0b520`, review ID `4999414769`, P0/P1/P2=0/0/0.
  - Delta da R10 SHA: ahead 2 / behind 0, esclusivamente historical report + `LATEST.md`; body di LATEST verbatim rispetto al rapporto storico; PR OPEN/DRAFT/mergeable=true; exact-head Location State Machine #7 `32554330952` SUCCESS e Location Contract #13 `32554330936` SUCCESS.
  - Nessuna rettifica residua; serializzazione/Ready/merge spettano al Coordinatore.

- [ ] **R4 — PR #17 Voice / Command Core**
  - START CONDITION: NEXO 3 completes N3.2 final conceptual/reporting/check evidence and explicitly hands off current/new exact SHA. Current `fc5932b...` is mergeable but lacks final N3.2 handoff/evidence; do not review prematurely.

- [ ] **R6 — PR #19 RE-REVIEW AFTER NC.1**
  - START CONDITION: NEXO CODEX hands off new exact SHA after current-main reconciliation, V28 correction, reporting alignment and applicable final VERIFY.

- [ ] **R7 — PR #20 RE-REVIEW AFTER N2.3 RECONCILIATION**
  - START CONDITION: NEXO 2 hands off new exact SHA after current-main reconciliation and applicable Surface checks/reporting.

- [ ] **R8 — PR #18 RE-REVIEW AFTER SERIALIZATION RECONCILIATION**
  - START CONDITION: Coordinator/author produces a new mergeable exact SHA preserving Android-readiness functional diff and current-main reporting.

- [ ] **R12 — NEXT NEW FOUNDATION PR**
  - START CONDITION: any agent hands off a new dedicated PR/SHA with its own task complete/reviewable and no overlap conflict; Coordinator may replace this placeholder with the concrete PR before review.

## REVIEW ORDER — COORDINATOR DIRECTIVE
Dopo R11, prendere il primo nuovo exact SHA realmente eleggibile tra R4/R6/R7/R8/R12. Never review obsolete/non-mergeable old heads and never duplicate the same exact SHA.

## REVIEW LOOP
For every eligible item: READ AGENTS.md + Issue #11 + this file → verify exact PR/SHA/diff/checks/reporting/governance → publish CLEAN or CHANGES REQUIRED → append review report + REVIEW NOTE → update queue → immediately reread. Never duplicate review of the same SHA.

## LAST EVIDENCE
- 2026-08-22 06:56 UTC — R11 PR #23 exact SHA `73a01727345e0c8b5d7937c654b5eef76ee0b520`: CLEAN, P0/P1/P2=0/0/0, review `4999414769`, Board `5378774514`.
- Exact-head workflows PR #23: Location State Machine #7 `32554330952` SUCCESS; Location Contract #13 `32554330936` SUCCESS.
- REVIEW NOTE appended to `coordination/reports/NEXO_1_REPORT.md`.
- PR #17 `fc5932b...` mergeable=true ma N3.2 handoff incompleto; #18/#19/#20 restano reconciliation-gated.
