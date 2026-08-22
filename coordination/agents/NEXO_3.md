# NEXO 3 — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO 3
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- Current main: `ba39d977072231d69ef848b1cc9ae2637b556c72`.
- TestFlight production is manual / Coordinator-controlled.
- PR #17 Voice Intent → Command Core is OPEN / DRAFT / mergeable=true on exact HEAD `05f8211ec55fa41d869e1000e64ccd4ba2b8694b`.
- Fresh compare current main → PR #17: `ahead`, ahead_by=18, behind_by=0, merge-base=current main. Reconciliation to current main is therefore COMPLETE and must NOT be repeated.
- Exact-head workflows on `05f8211...` are `action_required`, including `NEXO 3 Voice Validation` run `32566568206`; no jobs were created. This is not a PASS and blocks review handoff.
- Preserve Voice core exactly; do not reopen scope or add STT/runtime/provider functionality.
- Do not touch location/surface/navigation/automotive native/EAS/TestFlight areas owned elsewhere.

## QUEUE — ONE TASK AT A TIME

- [x] **N3.1 — PR #17 CURRENT-HEAD AUDIT / SAFE FREEZE**
  - COMPLETED EVIDENCE: provider-neutral/fail-closed Voice scope audited and preserved.

- [ ] **N3.2R — PR #17 FINAL EXACT-HEAD VALIDATION / HANDOFF**
  - START CONDITION: SATISFIED / PRIORITY 2.
  - RECONCILIATION: ALREADY COMPLETE. Do not merge/rebase/reconcile again while main remains `ba39d977...`.
  - EXACT HEAD: `05f8211ec55fa41d869e1000e64ccd4ba2b8694b`.
  - CURRENT BLOCKER: `NEXO 3 Voice Validation` run `32566568206` concluded `action_required` with zero jobs; Location Contract/State workflows on the same SHA also show `action_required`. Do not interpret as functional failure or PASS until cause is verified.
  - REQUIRED ACTION: diagnose why the exact-head workflow is `action_required`/jobless (workflow permission/policy/configuration or other GitHub gate). Apply only the minimal safe correction if it belongs to PR #17; otherwise report exact external blocker to Coordinator.
  - REQUIRED VERIFY: obtain a real exact-head Voice checker/strict compile + `python3 scripts/check_conceptual_master.py .` result on the final content; ensure V02/V03/V34 remain `[ ] / parziale`; align reporting to the actual final SHA/results; explicit handoff to NEXO REVIEW.
  - DEFINITION OF DONE: PR #17 remains DRAFT, mergeable/current-main based, exact-head applicable checks have real outcomes (no invented PASS), reporting coherent, explicit review handoff.
  - FREEZE RULE: N3.3 must not start before PR #17 is CLEAN and serialized/merged by Coordinator.

- [ ] **N3.3 — VOICE INTENT NORMALIZATION**
  - START CONDITION: PR #17 CLEAN and serialized/merged by Coordinator.
  - Goal: deterministic normalization, unknown/confidence semantics, no invented destination; edge-case tests.

- [ ] **N3.4 — COMMAND VALIDATION POLICY**
  - START CONDITION: N3.3 completed.
  - Goal: schema/version/required fields/rejection reasons/stale-duplicate semantics provider-neutral.

- [ ] **N3.5 — CONFIRMATION LIFECYCLE STATE MACHINE**
  - START CONDITION: N3.4 completed.
  - Goal: confirmation timeout/stale/idempotency for ambiguous/destructive/start-navigation commands; deterministic tests.

- [ ] **N3.6 — COMMAND BUS HARDENING + VOICE FOUNDATION REVIEW**
  - START CONDITION: N3.5 completed.
  - Goal: handler registration, unhandled/failure semantics, fake handlers, test matrix, V02/V03/V34 conservative reconciliation and NEXO REVIEW handoff.

- [ ] **N3.7 — VOICE FOUNDATION GAP AUDIT**
  - START CONDITION: N3.6 completed/reviewable.
  - Goal: identify remaining safe slices toward STT/runtime integration without adding provider credentials or automotive runtime.

## UPDATE RULE
After every task: update this file on `coordination/agent-control`, mark `[x]` only when truly completed, append exact PR/SHA/check evidence, write chat + GitHub report, then immediately reread and start the next eligible task. A blocked task remains `[ ]` with blocker recorded.

## LAST EVIDENCE
- 2026-08-22 coordinator watch: PR #17 exact HEAD `05f8211...`, mergeable=true; compare against `ba39d977...` is ahead/behind=0.
- Exact-head Voice Validation run `32566568206` = `action_required`, jobs=0; validation gate remains open.
- Main consolidation freeze remains active: no new Voice slices before PR #17 CLEAN + Coordinator serialization.
