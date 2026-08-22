# NEXO 3 — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO 3
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- Current main: `ba39d977072231d69ef848b1cc9ae2637b556c72`.
- The latest main delta is the Coordinator TestFlight policy commit; automatic push→TestFlight is disabled and production TestFlight is manual/Coordinator-controlled.
- PR #17 Voice Intent → Command Core previously reconciled successfully to main `b011808...` at HEAD `468e4118adfa71d7500842304715fd5c55e27312`, with exact-head Voice checker PASS and only conceptual validator/reporting/handoff remaining.
- That evidence remains useful historical proof of the Voice slice but does NOT eliminate the need to reconcile the branch to current main `ba39d977...` before final review/merge.
- Preserve the Voice core exactly; do not reopen scope or add STT/runtime/provider functionality.
- Do not touch location/surface/navigation/automotive native/EAS/TestFlight areas owned elsewhere.

## QUEUE — ONE TASK AT A TIME

- [x] **N3.1 — PR #17 CURRENT-HEAD AUDIT / SAFE FREEZE**
  - COMPLETED EVIDENCE: provider-neutral/fail-closed Voice scope audited and preserved.

- [ ] **N3.2R — PR #17 MINIMAL RECONCILIATION TO CURRENT MAIN + FINAL EVIDENCE / REVIEW HANDOFF**
  - START CONDITION: SATISFIED / PRIORITY 2.
  - CURRENT MAIN TO INCORPORATE: `ba39d977072231d69ef848b1cc9ae2637b556c72`.
  - PRESERVE: Voice core files, existing deterministic semantics and prior successful Voice checker behavior. Do NOT redo the implementation.
  - RECONCILIATION SCOPE: incorporate current main safely, including the manual-only TestFlight workflow state; preserve all merged Location/Saved Places state; no unrelated file changes.
  - REQUIRED VERIFY AFTER RECONCILIATION: rerun Voice checker/strict compile on exact reconciled content; execute `python3 scripts/check_conceptual_master.py .` on complete exact-head materialization; align conceptual/reporting/dashboard conservatively; record new exact SHA and explicit handoff to NEXO REVIEW.
  - DEFINITION OF DONE: PR #17 DRAFT, current-main reconciled, mergeable, exact-head checks recorded, V02/V03/V34 remain conservative `[ ] / parziale`, reporting coherent, explicit review handoff.
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
- Previous safe reconciliation to `b011808...` and Voice checker PASS remain valid historical evidence of implementation quality.
- Current main is now `ba39d977...`; therefore N3.2R is the only actionable NEXO 3 task.
- Main is under consolidation freeze: no new Voice slices before PR #17 CLEAN + Coordinator serialization.
