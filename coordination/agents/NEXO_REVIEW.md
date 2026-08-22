# NEXO REVIEW — Dedicated Review File

CONTROL BRANCH: `coordination/agent-control`.
OWNER: NEXO REVIEW
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- Review is independent: no implementation code changes, merges, Ready transitions, build reruns or credential changes.
- Current main: `b1fa88453a81b15f1dc433fa6503c81292a4a48e` after CLEAN PR #18 Android Readiness squash merge.
- Production TestFlight is manual / Coordinator-controlled.
- Consolidation freeze is active and STRICTLY SERIAL.
- PR #17 Voice Core: CLEAN and MERGED.
- PR #24 Location Quality Policy: CLEAN exact SHA `372cb3746506cff162a364f83a9796e5141daf8a`, review `5000829137`, MERGED as `2155db10e40cebe71ba02e97e3afb35cf7288004`.
- PR #18 Android Readiness: CLEAN exact SHA `afd11ae91131871392261b99753d65129722f89d`, review `5000939193`, MERGED as current main `b1fa88453a81b15f1dc433fa6503c81292a4a48e`.
- PR #19 Navigation Domain Core is now the next serial queue item; NEXO CODEX NC.1 is active and must finish reconciliation/finding correction/VERIFY/reporting/handoff before REVIEW.
- PR #20 remains blocked until #19 is CLEAN + merged.

## REVIEW QUEUE — ONE AT A TIME

- [x] Historical reviews/merges through PR #17 preserved.

- [x] **R13R — PR #24 LOCATION QUALITY POLICY**
  - Exact SHA reviewed: `372cb3746506cff162a364f83a9796e5141daf8a`.
  - Verdict: CLEAN, P0/P1/P2 = 0/0/0.
  - Review: `5000829137`.
  - Merged as `2155db10e40cebe71ba02e97e3afb35cf7288004`.

- [x] **R8R — PR #18 ANDROID READINESS**
  - Exact SHA reviewed: `afd11ae91131871392261b99753d65129722f89d`.
  - Verdict: CLEAN, P0/P1/P2 = 0/0/0.
  - Review: `5000939193`.
  - Merged as `b1fa88453a81b15f1dc433fa6503c81292a4a48e`.

- [ ] **R6R — PR #19 NAVIGATION DOMAIN**
  - START CONDITION: NEXO CODEX completes NC.1 on current main `b1fa88453a81b15f1dc433fa6503c81292a4a48e`, preserves Navigation Core, resolves only real findings including V28 if still applicable, obtains exact-head applicable checks, completes AGENTS-compliant reporting, and publishes an explicit exact-SHA handoff to NEXO REVIEW.
  - Current observed PR #19 HEAD `40645cd3930e1278b21e8d5de44e59a230a626df` is OPEN/DRAFT/mergeable=true/current-main-based, but NC.1 remains `[ ]` and no exact-SHA final handoff has been observed; therefore it is NOT YET ELIGIBLE.

- [ ] **R7R — PR #20 SURFACE**
  - START CONDITION: BLOCKED until PR #19 is CLEAN + MERGED, then NEXO 2 reconciles #20 to the resulting new main and hands off a new exact SHA.

## STRICT SERIAL REVIEW RULE
Do NOT skip a blocked earlier merge-queue item merely because a later stale SHA appears reviewable. Queue is now #19 → #20. After every Coordinator merge, reread main and this file before accepting the next handoff.

## REVIEW LOOP
For the one eligible item: READ AGENTS.md + Issue #11 + this file → verify exact PR/SHA/diff/checks/reporting/governance/current main → publish CLEAN or CHANGES REQUIRED → append review report + REVIEW NOTE → update queue. Never duplicate an exact SHA.

## LAST EVIDENCE
- Current main `b1fa88453a81b15f1dc433fa6503c81292a4a48e` contains merged #24 and #18.
- #19 is the next serial candidate but is still in CODEX NC.1 completion/handoff, despite already being current-main-based and mergeable on observed HEAD `40645cd...`.
- #20 remains frozen until #19 serialization completes.
- NEXO REVIEW therefore remains STANDBY until a formal final #19 exact-SHA handoff is produced.
