# NEXO 3 — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO 3
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- Current main: `b011808ec1a46827d27ccb258ef68ea01dee8b41` after merge of CLEAN PR #23.
- PR #17 `feat(voice): provider-neutral intent command core`: OPEN / DRAFT, exact HEAD `c80964fab1895a44a999e687ab50934d364c94cd`, currently non-mergeable.
- Fresh compare current main → PR #17: diverged, ahead 12 / behind 1, merge-base `8d8dee4a31416acb38c2e654082ca15efafd6fec`.
- The one behind commit is the merged Location Permission/Degraded State Machine state and its C007/reporting changes; these must be preserved before final Voice evidence/handoff.
- No final voice-checker/conceptual-validator PASS is claimed for current content; previous runtime checkout failed before checker execution because DNS could not resolve github.com.
- Do not touch location/surface/navigation/automotive native/EAS/TestFlight areas owned elsewhere.

## QUEUE — ONE TASK AT A TIME

- [x] **N3.1 — PR #17 CURRENT-HEAD AUDIT / SAFE FREEZE**
  - COMPLETED EVIDENCE: audited prior voice-core state and preserved provider-neutral/fail-closed scope without inventing CI evidence.

- [ ] **N3.2 — PR #17 CURRENT-MAIN RECONCILIATION + FINAL EVIDENCE / REVIEW HANDOFF**
  - START CONDITION: ACTIONABLE; this remains the only active NEXO 3 task.
  - CURRENT HEAD: `c80964fab1895a44a999e687ab50934d364c94cd`; current main `b011808ec1a46827d27ccb258ef68ea01dee8b41`.
  - FIRST REQUIRED ACTION: safely reconcile/rebase PR #17 onto current main, preserving PR #23 Location Permission/Degraded State Machine/C007/reporting and the Voice functional delta. Do not manually overwrite shared conceptual/reporting with stale branch versions.
  - PRIOR PROGRESS: V02/V03/V34 were updated conservatively to `[ ] / parziale`; Voice historical report/LATEST/Fabio dashboard were added on PR #17.
  - REQUIRED TO COMPLETE: after reconciliation rerun actual voice checker and applicable conceptual validator on final content; refresh mergeability; record new exact SHA; keep PR DRAFT; hand off to NEXO REVIEW; append final report. Old pre-main-advance evidence is not final proof.
  - BLOCKER IF RUNTIME STILL FAILS: remain `[ ]` and record the exact checkout/network failure; do not start N3.3.

- [ ] **N3.3 — VOICE INTENT NORMALIZATION**
  - START CONDITION: N3.2 completed/reviewable and no exact-SHA review conflict.
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
  - Goal: identify remaining safe slices toward STT/runtime integration without adding provider credentials or automotive runtime; prepare next concrete work only where ownership is clear.

## UPDATE RULE
After every task: update this file on `coordination/agent-control`, mark `[x]` only when truly completed, append exact PR/SHA/check evidence, write chat + GitHub report, then immediately reread and start the next eligible task. A blocked task remains `[ ]` with blocker recorded.

## LAST EVIDENCE
- 2026-08-22 07:53 UTC coordinator refresh: main advanced to `b011808...`; PR #17 remains `c80964f...` and is now diverged ahead 12 / behind 1 from merge-base `8d8dee4...`.
- N3.2 requires current-main reconciliation before final checker/validator/handoff. N3.3 is not eligible.
