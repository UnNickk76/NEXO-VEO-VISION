# NEXO REVIEW — Dedicated Review File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO REVIEW
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- Review operates independently and never modifies implementation code or merges.
- Current `main`: `8d8dee4a31416acb38c2e654082ca15efafd6fec`, merge of CLEAN PR #22 Location Contract.
- PR #22 was reviewed CLEAN on exact SHA `475c39539809361e7ede47f381e07f3be70454e3`, review ID `4998866766`; exact-head run #6 `32546418961` SUCCESS; Coordinator transitioned Ready and merged it.
- Main advance invalidates prior mergeability assumptions for open #17/#18/#19/#20. Fresh metadata: all four currently report `mergeable=false` on their old heads.
- Therefore no current review item is eligible until a new current-main reconciliation + exact-SHA handoff is produced. Old verdicts remain historical exact-SHA evidence only.

## REVIEW QUEUE — ONE AT A TIME

- [x] **R1 — PR #19 Navigation Domain Core**
  - Reviewed exact SHA `7210baef8693f1a8e77da8750ff2e4e597534cbe`: CHANGES REQUIRED, P1 V28; review ID `4998361255`.

- [x] **R3 — PR #12 Saved Places Core**
  - CLEAN exact SHA `75b661afffc45887cad1e64c7845d56b6c658288`, review ID `4998454274`; merged as `47b9d0a5...`.

- [x] **R2 — PR #20 Surface Capabilities — HISTORICAL SHA**
  - CLEAN exact SHA `6e13d42379a5cff26cb37a67944f89302b925ac4`, review ID `4998458851`; current branch requires new reconciliation/re-review.

- [x] **R9 — PR #22 Location Contract**
  - CLEAN exact SHA `475c39539809361e7ede47f381e07f3be70454e3`, P0/P1/P2=0/0/0; review ID `4998866766`; exact-head run #6 SUCCESS; merged by Coordinator as main `8d8dee4a...`.

- [ ] **R4 — PR #17 Voice / Command Core**
  - START CONDITION: NEXO 3 reconciles with current main `8d8dee4a...`, completes N3.2 conceptual/reporting/final checks and explicitly hands off a NEW exact SHA. Old `63accc216...` is no longer mergeable after PR #22 merge.

- [ ] **R6 — PR #19 RE-REVIEW AFTER NC.1**
  - START CONDITION: NEXO CODEX hands off new exact SHA after reconciliation with current main `8d8dee4a...`, V28 correction, reporting alignment and applicable final VERIFY.

- [ ] **R7 — PR #20 RE-REVIEW AFTER N2.3 RECONCILIATION**
  - START CONDITION: NEXO 2 hands off new exact SHA after reconciliation with current main `8d8dee4a...` and applicable Surface checks/reporting.

- [ ] **R8 — PR #18 RE-REVIEW AFTER SERIALIZATION RECONCILIATION**
  - START CONDITION: Coordinator/author produces a new mergeable exact SHA preserving Android-readiness functional diff and current-main Saved Places + Location reporting.

- [ ] **R10 — NEXT NEW FOUNDATION PR**
  - START CONDITION: any agent hands off a new dedicated PR/SHA with its own task complete/reviewable and no overlap conflict; Coordinator may replace this placeholder with the concrete PR before review.

## REVIEW ORDER — COORDINATOR DIRECTIVE
Take the first newly eligible exact SHA among R4/R6/R7/R8/R10. Never review an obsolete/non-mergeable old head merely because it was previously queued. Never duplicate review of the same exact SHA.

## REVIEW LOOP
For every eligible item: READ AGENTS.md + Issue #11 + this file → verify exact PR/SHA/diff/checks/reporting/governance → publish CLEAN or CHANGES REQUIRED → append review report + REVIEW NOTE → update queue → immediately reread. Never duplicate review of the same SHA.

## LAST EVIDENCE
- 2026-08-22 04:05 UTC — CLEAN PR #22 merged; current main `8d8dee4a31416acb38c2e654082ca15efafd6fec`.
- Fresh open PR metadata after main advance: #17/#18/#19/#20 all `mergeable=false` on current old heads.
- REVIEW currently STANDBY legitimately until first new exact-SHA handoff; do not create busywork.
