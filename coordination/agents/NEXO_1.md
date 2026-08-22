# NEXO 1 — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO 1
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- Current main: `1d0a01c91bb328baf141560a534f4b62fe406b01` after CLEAN PR #17 Voice merge.
- TestFlight production is manual / Coordinator-controlled.
- PR #24 Location Freshness / Quality Policy: OPEN / DRAFT / mergeable=true, reconciled exact HEAD `950f01c814b953f7332f2b3fbf7a9f55c0573145`.
- Fresh compare current main → PR #24: `ahead`, ahead 8 / behind 0, merge-base=current main.
- Coordinator reconciliation preserved the five N1.5-owned diff files and resolved shared `LATEST`/`FABIO_CONTROLLO` to current-main state; no Voice/TestFlight regression was reintroduced.
- C007 remains `[ ] / parziale`; no OS/GPS provider runtime exists yet.

## QUEUE — ONE TASK AT A TIME

- [x] **N1.1 — CLOSE PR #12 VALIDATION GATE**
- [x] **N1.2 — PR #12 REVIEW REWORK / CLEAN HANDOFF**
- [x] **N1.3 — F1 LOCATION CONTRACT**
- [x] **N1.4 — LOCATION PERMISSION / DEGRADED STATE MACHINE IMPLEMENTATION/HANDOFF**
- [x] **N1.4R — PR #23 REPORTING RECTIFICATION / CLEAN RE-REVIEW GATE**

- [ ] **N1.5R — FINALIZE RECONCILED PR #24 / EXACT-SHA HANDOFF**
  - START CONDITION: SATISFIED / TOP PRIORITY.
  - RECONCILIATION: COMPLETED BY COORDINATOR at `950f01c814b953f7332f2b3fbf7a9f55c0573145`; do NOT redo/rebase/reconstruct it.
  - PRESERVE: existing quality/freshness implementation, checker/workflow, merged Voice Core, manual-only TestFlight policy and all current-main state.
  - REQUIRED NOW: wait for/check exact-head workflows on `950f01c...`; update C007 conservatively with PR #24 evidence while keeping `[ ] / parziale`; create/finalize compliant historical reporting + `LATEST.md` + `FABIO_CONTROLLO.md` on the reconciled branch; rerun all checks invalidated by those edits; record final exact SHA and explicit NEXO REVIEW handoff.
  - IMPORTANT: shared reporting files currently intentionally match current main after reconciliation. Reapply only accurate N1.5 final reporting, not stale pre-reconciliation copies.
  - DEFINITION OF DONE: final PR #24 mergeable against current main, no regression to merged Location/Voice/TestFlight state, exact-head applicable checks SUCCESS, C007 evidence complete/conservative, reporting coherent, PR DRAFT, explicit REVIEW handoff.
  - FREEZE RULE: do not start N1.6 before PR #24 CLEAN + Coordinator serialization.

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
- Coordinator safely reconciled PR #24 by creating merge commit `950f01c814b953f7332f2b3fbf7a9f55c0573145` with parents old PR HEAD `8abc5d2d...` + current main `1d0a01c9...` and a tree based on current main with only the N1.5-owned functional/workflow/checker/history files overlaid.
- Fresh compare: ahead 8 / behind 0; PR #24 now mergeable=true.
- Exact-head runs started automatically: Location Contract `32583597225`, Voice Validation `32583597311`, Location Quality Policy `32583597232`, Location State Machine `32583597351`; all were in_progress at Coordinator handoff, so no PASS is claimed yet.
- N1.5R is now UNBLOCKED for conceptual/reporting/final VERIFY only.
