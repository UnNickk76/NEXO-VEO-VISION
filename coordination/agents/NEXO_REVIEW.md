# NEXO REVIEW — Dedicated Review File

CONTROL BRANCH: `coordination/agent-control`.
OWNER: NEXO REVIEW
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- Review is independent: no implementation code changes, merges, Ready transitions, build reruns or credential changes.
- Current main: `1d0a01c91bb328baf141560a534f4b62fe406b01` after CLEAN PR #17 merge.
- Production TestFlight is manual / Coordinator-controlled.
- Consolidation freeze is active and STRICTLY SERIAL.
- PR #17 final exact SHA `8f82b692d2cc6759c4ce773c791f3725f85e4062` was CLEAN and is MERGED as current main.
- PR #24 is the ONLY current merge-queue candidate; its stale HEAD `8abc5d2d...` is not reviewable until NEXO 1 reconciles/finalizes and hands off a new exact SHA.
- PR #18/#19/#20 must not be reviewed or reconciled in parallel; each waits for preceding Coordinator merge and new-main retargeting.

## REVIEW QUEUE — ONE AT A TIME

- [x] Historical reviews/merges through PR #17 preserved.

- [ ] **R13R — PR #24 LOCATION QUALITY POLICY**
  - START CONDITION: NEXO 1 hands off a mergeable exact SHA based on current main with C007 evidence, reporting and applicable exact-head VERIFY complete.
  - PRIORITY: ACTIVE / ONLY ALLOWED NEXT REVIEW.

- [ ] **R8R — PR #18 ANDROID READINESS**
  - START CONDITION: BLOCKED until PR #24 is CLEAN + MERGED, then CODEX reconciles #18 to the resulting new main and hands off a new exact SHA.

- [ ] **R6R — PR #19 NAVIGATION DOMAIN**
  - START CONDITION: BLOCKED until PR #18 is CLEAN + MERGED, then CODEX reconciles #19 to the resulting new main, fixes V28 and hands off a new exact SHA.

- [ ] **R7R — PR #20 SURFACE**
  - START CONDITION: BLOCKED until PR #19 is CLEAN + MERGED, then NEXO 2 reconciles #20 to the resulting new main and hands off a new exact SHA.

## STRICT SERIAL REVIEW RULE
Do NOT skip a blocked earlier merge-queue item merely because a later stale SHA appears reviewable. Queue is #24 → #18 → #19 → #20. After every Coordinator merge, reread main and this file before accepting the next handoff.

## REVIEW LOOP
For the one eligible item: READ AGENTS.md + Issue #11 + this file → verify exact PR/SHA/diff/checks/reporting/governance/current main → publish CLEAN or CHANGES REQUIRED → append review report + REVIEW NOTE → update queue. Never duplicate an exact SHA.

## LAST EVIDENCE
- #17 CLEAN/merged as `1d0a01c9...`.
- #24 is the sole active candidate but currently non-eligible until fresh handoff.
- #18/#19/#20 intentionally blocked from parallel review/reconciliation.
