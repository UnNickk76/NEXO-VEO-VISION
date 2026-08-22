# NEXO REVIEW — Dedicated Review File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO REVIEW
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- Review operates independently and never modifies implementation code or merges.
- `main` exact SHA: `47b9d0a5c20490f0b73e95e52fadca151e89e136` (PR #12 merged).
- PR #22 Location Contract has a valid new review handoff: OPEN / DRAFT / `mergeable=true`, exact HEAD `475c39539809361e7ede47f381e07f3be70454e3`, no submitted reviews yet.
- Location Contract workflow on exact HEAD: run #6 `32546418961` = `completed/success`. Author also records run #3 on last functional/conceptual SHA; REVIEW must independently verify applicability/reporting.
- PR #17 reconciliation has advanced to exact HEAD `63accc216634a11c6235b1b7d88875d558d70cfc` and fresh GitHub metadata now reports `mergeable=true`, correcting the stale `mergeable=false` observation in the previous control state. N3.2 is NOT yet reviewable because conceptual/reporting/final checks/handoff remain pending.
- PR #18/#19/#20 remain non-mergeable against current main and require reconciliation/new exact SHA before re-review/merge. Old CLEAN verdicts remain historical exact-SHA evidence only.

## REVIEW QUEUE — ONE AT A TIME

- [x] **R1 — PR #19 Navigation Domain Core**
  - Reviewed exact SHA `7210baef8693f1a8e77da8750ff2e4e597534cbe`: CHANGES REQUIRED, P1 V28; review ID `4998361255`.
  - Await new exact SHA after NC.1 reconciliation + correction.

- [x] **R3 — PR #12 Saved Places Core**
  - Reviewed exact SHA `75b661afffc45887cad1e64c7845d56b6c658288`: CLEAN, review ID `4998454274`; merged by Coordinator as main `47b9d0a5...`.

- [x] **R2 — PR #20 Surface Capabilities — PRE-MAIN-ADVANCE SHA**
  - Reviewed exact SHA `6e13d42379a5cff26cb37a67944f89302b925ac4`: CLEAN, review ID `4998458851`.
  - Current branch is non-mergeable after PR #12 merge; await new exact SHA from N2.3 reconciliation.

- [ ] **R9 — PR #22 Location Contract**
  - START CONDITION: SATISFIED NOW.
  - PRIORITY: first eligible review.
  - Exact SHA: `475c39539809361e7ede47f381e07f3be70454e3`.
  - Required scope: contract/checker/workflow, C007 + canonical validator change, historical report/LATEST/FABIO, exact-HEAD workflow run #6 `32546418961`, and applicability of prior functional/conceptual run evidence.
  - Required verdict: CLEAN or CHANGES REQUIRED with P0/P1/P2 and REVIEW NOTE appended to `NEXO_1_REPORT.md`. Do not duplicate this SHA.

- [ ] **R4 — PR #17 Voice / Command Core**
  - START CONDITION: NEXO 3 completes N3.2 conceptual/reporting/final checks and explicitly hands off a new exact SHA. Mergeability is now true on reconciliation SHA `63accc216...`, but that alone does not satisfy final handoff.

- [ ] **R6 — PR #19 RE-REVIEW AFTER NC.1**
  - START CONDITION: NEXO CODEX hands off new exact SHA after current-main reconciliation, V28 correction, reporting alignment and applicable final VERIFY.

- [ ] **R7 — PR #20 RE-REVIEW AFTER N2.3 RECONCILIATION**
  - START CONDITION: NEXO 2 hands off new exact SHA after current-main reconciliation and applicable Surface checks/reporting.

- [ ] **R8 — PR #18 RE-REVIEW AFTER SERIALIZATION RECONCILIATION**
  - START CONDITION: Coordinator/author produces a new mergeable exact SHA preserving Android-readiness functional diff and current-main reporting.

## REVIEW ORDER — COORDINATOR DIRECTIVE
Process R9 immediately. Then reread this file and take the first newly eligible exact SHA among R4/R6/R7/R8. Never hold a ready handoff merely because another agent is unfinished; never review the same exact SHA twice.

## REVIEW LOOP
For every eligible item: READ AGENTS.md + Issue #11 + this file → verify exact PR/SHA/diff/checks/reporting/governance → publish CLEAN or CHANGES REQUIRED → append review report + REVIEW NOTE → update queue → immediately reread. Never duplicate review of the same SHA.

## LAST EVIDENCE
- Fresh audit: PR #22 exact HEAD `475c395...` is OPEN/DRAFT/mergeable with Location Contract run #6 SUCCESS and zero reviews; R9 is actionable now.
- Fresh audit: PR #17 exact HEAD `63accc216...` is now mergeable=true, but N3.2 remains incomplete; no review handoff yet.
- PR #18/#19/#20 remain reconciliation-gated.
