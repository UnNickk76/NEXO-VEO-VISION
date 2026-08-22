# NEXO 3 — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO 3
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- Current main: `b011808ec1a46827d27ccb258ef68ea01dee8b41` after merge of CLEAN PR #23.
- PR #17 `feat(voice): provider-neutral intent command core`: OPEN / DRAFT / mergeable, exact HEAD `468e4118adfa71d7500842304715fd5c55e27312`.
- Fresh PR metadata after the latest verification: base `b011808...`, exact HEAD `468e4118...`, changed_files=2, mergeable=true.
- PR #23 Location Permission/Degraded State Machine/C007/reporting is preserved from current main and no location/shared reporting file is in the PR #17 diff after reconciliation.
- Exact-head Voice checker is now REAL PASS: exact GitHub blobs `command-core.ts` (`6aaef7a6...`) and checker (`eb92d902...`) were materialized unchanged and `node frontend/scripts/check-voice-command-core.mjs` returned exit 0 / `voice-command-core checks: PASS`.
- Final conceptual validator remains NOT EXECUTED on a complete exact-head repository; no conceptual PASS is claimed.
- Do not touch location/surface/navigation/automotive native/EAS/TestFlight areas owned elsewhere.

## QUEUE — ONE TASK AT A TIME

- [x] **N3.1 — PR #17 CURRENT-HEAD AUDIT / SAFE FREEZE**
  - COMPLETED EVIDENCE: audited prior voice-core state and preserved provider-neutral/fail-closed scope without inventing CI evidence.

- [ ] **N3.2 — PR #17 CURRENT-MAIN RECONCILIATION + FINAL EVIDENCE / REVIEW HANDOFF**
  - START CONDITION: ACTIONABLE; this remains the only active NEXO 3 task.
  - CURRENT HEAD: `468e4118adfa71d7500842304715fd5c55e27312`; current main `b011808ec1a46827d27ccb258ef68ea01dee8b41`.
  - RECONCILIATION COMPLETED: merge commit `468e4118adfa71d7500842304715fd5c55e27312` has parents prior Voice HEAD `c80964fab1895a44a999e687ab50934d364c94cd` and current main `b011808ec1a46827d27ccb258ef68ea01dee8b41`, with tree built from current main plus only `frontend/src/voice/command-core.ts` and `frontend/scripts/check-voice-command-core.mjs`. Fresh compare is ahead/behind 0 and exact diff is those two Voice files; Location PR #23 state is preserved.
  - VOICE CHECKER EVIDENCE: `cd /tmp/nexo3 && node frontend/scripts/check-voice-command-core.mjs` executed on exact-head GitHub blob contents, exit `0`, output `voice-command-core checks: PASS`; checker itself compiles the exact core with TypeScript strict before behavioral assertions.
  - BLOCKED FINAL EVIDENCE: `python3 scripts/check_conceptual_master.py .` has not been executed against a complete exact-head materialization. Direct raw GitHub retrieval in the runtime still fails DNS (`curl` exit 6, `Could not resolve host: raw.githubusercontent.com`). Per AGENTS.md no conceptual PASS may be inferred. Required condition to complete: execute the versioned conceptual validator on complete exact-head content, then final conceptual/reporting/dashboard reconciliation and exact-SHA review handoff.

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
- 2026-08-22 08:44 UTC: PR #17 still OPEN/DRAFT/mergeable at exact HEAD `468e4118...`, base/current main `b011808...`, 2-file Voice diff.
- Exact-head Voice checker now PASS: `node frontend/scripts/check-voice-command-core.mjs` → exit 0 / `voice-command-core checks: PASS` on materialized exact GitHub blob contents.
- N3.2 remains `[ ]` only because the versioned conceptual validator has not yet run against a complete exact-head repository; no conceptual PASS/CLEAN/handoff is claimed.
- N3.3 is not eligible.
