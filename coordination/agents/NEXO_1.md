# NEXO 1 — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO 1
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- Current main: `1d0a01c91bb328baf141560a534f4b62fe406b01` after CLEAN PR #17 Voice merge.
- TestFlight production is manual / Coordinator-controlled.
- PR #24 Location Freshness / Quality Policy: OPEN / DRAFT / mergeable=true, final exact HEAD `372cb3746506cff162a364f83a9796e5141daf8a`.
- Fresh compare current main → PR #24: `ahead`, ahead 13 / behind 0, merge-base=current main.
- C007 remains `[ ] / parziale` and now includes PR #24 + pertinent N1.5 commit + quality-policy checker/workflow evidence; no OS/GPS provider runtime exists.
- Exact-head final CI on `372cb374...` is SUCCESS: Location Quality Policy `32590273193` (job `97072902172`, including npm ci / Expo Doctor / lint / TypeScript strict / checker / conceptual validator), Location Contract `32590273221`, Location State Machine `32590273202`, Voice Validation `32590273251`.
- N1.5R author-side finalization and exact-SHA handoff are complete. PR #24 is frozen awaiting independent NEXO REVIEW and Coordinator serialization.

## QUEUE — ONE TASK AT A TIME

- [x] **N1.1 — CLOSE PR #12 VALIDATION GATE**
- [x] **N1.2 — PR #12 REVIEW REWORK / CLEAN HANDOFF**
- [x] **N1.3 — F1 LOCATION CONTRACT**
- [x] **N1.4 — LOCATION PERMISSION / DEGRADED STATE MACHINE IMPLEMENTATION/HANDOFF**
- [x] **N1.4R — PR #23 REPORTING RECTIFICATION / CLEAN RE-REVIEW GATE**

- [x] **N1.5R — FINALIZE RECONCILED PR #24 / EXACT-SHA HANDOFF**
  - COMPLETED: safe reconciliation by Coordinator preserved; C007 updated conservatively; final historical report/LATEST/FABIO aligned; exact-head applicable checks SUCCESS; PR remains DRAFT/current-main-compatible/mergeable; explicit NEXO REVIEW handoff published for SHA `372cb3746506cff162a364f83a9796e5141daf8a`.
  - HANDOFF: PR #24 comment `5381894338`; Board #11 comment `5381894921`.
  - FREEZE RULE: do not modify PR #24 or start N1.6 before CLEAN + Coordinator serialization.

- [ ] **N1.6 — LOCATION ADAPTER CONTRACT + HARDENING**
  - START CONDITION: PR #24 CLEAN and serialized/merged by Coordinator.
  - CURRENT STATUS: BLOCKED / NOT ELIGIBLE. Await independent NEXO REVIEW on `372cb374...` and Coordinator merge.

- [ ] **N1.7 — LOCATION FOUNDATION INTEGRATION GAP AUDIT**
  - START CONDITION: N1.6 completed/reviewable.

- [ ] **N1.8 — LOCATION FOUNDATION REVIEW CLOSURE**
  - START CONDITION: N1.7 completed and prior slices CLEAN/serialized as required.

- [ ] **N1.9 — NEXT LOCATION RUNTIME SLICE PREPARATION**
  - START CONDITION: N1.8 CLEAN/reviewable and Coordinator confirms no ownership conflict.

## UPDATE RULE
After every task: update this file on `coordination/agent-control`, mark `[x]` only if the task is truly completed, append exact PR/SHA/check evidence, then immediately reread and start the next eligible task.

## LAST EVIDENCE
- N1.5R final PR HEAD: `372cb3746506cff162a364f83a9796e5141daf8a`; main remains `1d0a01c91bb328baf141560a534f4b62fe406b01`; compare ahead 13 / behind 0 / merge-base=current main; PR OPEN/DRAFT/mergeable=true.
- Repository report: `docs/codex-reports/2026-08-22_181500_n1-5r-pr24-finalization.md`; `LATEST.md` and `Fabio/FABIO_CONTROLLO.md` aligned on the same branch.
- Exact-head final runs: Location Quality Policy `32590273193` SUCCESS (job `97072902172` all steps SUCCESS); Location Contract `32590273221` SUCCESS; Location State Machine `32590273202` SUCCESS; Voice Validation `32590273251` SUCCESS.
- Explicit NEXO REVIEW handoff: PR #24 `5381894338`; Board #11 `5381894921`.
- N1.6 remains `[ ]` because its start condition is not satisfied until PR #24 receives CLEAN and is serialized/merged by Coordinator.
