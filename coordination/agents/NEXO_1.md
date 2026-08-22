# NEXO 1 — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO 1
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- Current main: `1d0a01c91bb328baf141560a534f4b62fe406b01` after CLEAN PR #17 Voice merge.
- TestFlight production is manual / Coordinator-controlled.
- PR #24 Location Freshness / Quality Policy: OPEN / DRAFT / mergeable=false, exact HEAD `8abc5d2dc39b2b8b63a62f63ffe8bc8cbed62a17`.
- Fresh compare current main → PR #24: `diverged`, ahead 7 / behind 2, merge-base `b011808ec1a46827d27ccb258ef68ea01dee8b41`.
- Existing N1.5 functional work is already present and must be preserved; do not redo it.
- C007 remains `[ ] / parziale`; no OS/GPS provider runtime exists yet.

## QUEUE — ONE TASK AT A TIME

- [x] **N1.1 — CLOSE PR #12 VALIDATION GATE**
- [x] **N1.2 — PR #12 REVIEW REWORK / CLEAN HANDOFF**
- [x] **N1.3 — F1 LOCATION CONTRACT**
- [x] **N1.4 — LOCATION PERMISSION / DEGRADED STATE MACHINE IMPLEMENTATION/HANDOFF**
- [x] **N1.4R — PR #23 REPORTING RECTIFICATION / CLEAN RE-REVIEW GATE**

- [ ] **N1.5R — PR #24 MINIMAL RECONCILIATION TO CURRENT MAIN + FINAL N1.5 HANDOFF**
  - START CONDITION: SATISFIED / TOP PRIORITY.
  - CURRENT MAIN TO INCORPORATE: `1d0a01c91bb328baf141560a534f4b62fe406b01`.
  - PRESERVE: all existing N1.5 quality/freshness functional work, checker/workflow and prior successful evidence. Do NOT rewrite/recreate the functional slice.
  - REQUIRED RECONCILIATION: safely incorporate both post-PR23 main deltas now missing from the branch: manual-only TestFlight policy and merged Voice Core state, without touching Voice ownership.
  - THEN COMPLETE ORIGINAL N1.5 GATES: conservative PR #24 evidence in C007 while keeping `[ ] / parziale`; align historical report/LATEST/FABIO_CONTROLLO to reconciled exact HEAD; rerun checks invalidated by reconciliation or edits; record new exact SHA and explicit NEXO REVIEW handoff.
  - DEFINITION OF DONE: PR #24 mergeable against current main, no regression to merged Location/Voice/TestFlight state, exact-head applicable checks recorded, C007 evidence complete, PR DRAFT, explicit review handoff.
  - FREEZE RULE: do not start N1.6 before PR #24 CLEAN + Coordinator serialization.
  - CURRENT BLOCKER: available agent runtime previously lacked a safe update-branch/rebase/merge-main-into-branch operation. Do not force-reset or reconstruct shared files manually. If still blocked, report the exact missing capability; do not alter the branch.

- [ ] **N1.6 — LOCATION ADAPTER CONTRACT + HARDENING**
  - START CONDITION: PR #24 CLEAN and serialized/merged by Coordinator.

- [ ] **N1.7 — LOCATION FOUNDATION INTEGRATION GAP AUDIT**
  - START CONDITION: N1.6 completed/reviewable.

- [ ] **N1.8 — LOCATION FOUNDATION REVIEW CLOSURE**
  - START CONDITION: N1.7 completed and prior slices CLEAN/serialized as required.

- [ ] **N1.9 — NEXT LOCATION RUNTIME SLICE PREPARATION**
  - START CONDITION: N1.8 CLEAN/reviewable and Coordinator confirms no ownership conflict.

## UPDATE RULE
After every task: update this file on `coordination/agent-control`, mark `[x]` only if truly completed, append exact PR/SHA/check evidence, then immediately reread and start the next eligible task.

## LAST EVIDENCE
- Coordinator merged PR #17 CLEAN, advancing main to `1d0a01c91bb328baf141560a534f4b62fe406b01`.
- PR #24 remains `8abc5d2d...`, now diverged ahead 7 / behind 2 and mergeable=false.
- N1.5R remains the highest-priority unfinished consolidation task.
