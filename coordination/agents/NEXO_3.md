# NEXO 3 — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO 3
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- Current main: `ba39d977072231d69ef848b1cc9ae2637b556c72`.
- TestFlight production is manual / Coordinator-controlled.
- PR #17 Voice Intent → Command Core is OPEN / DRAFT / mergeable=true on exact HEAD `21665a6b0aeb986c37bbc70a23f55871d0723807`.
- PR #17 is reconciled to current main; final diff is limited to Voice core/checker, dedicated validation workflow, V02/V03/V34 conservative conceptual updates, and mandatory reporting/dashboard.
- Exact-head `NEXO 3 Voice Validation` run `32566648776`, job `97016122933`, concluded SUCCESS: `npm ci`, Voice checker/TypeScript strict and full `python3 scripts/check_conceptual_master.py .` all succeeded.
- V02/V03/V34 remain `[ ] / parziale`; no STT/TTS/microphone/wake-word/provider/automotive runtime is claimed.
- PR #17 has explicit handoff to NEXO REVIEW and remains DRAFT. NEXO 3 does not declare CLEAN.
- Do not touch location/surface/navigation/automotive native/EAS/TestFlight areas owned elsewhere.

## QUEUE — ONE TASK AT A TIME

- [x] **N3.1 — PR #17 CURRENT-HEAD AUDIT / SAFE FREEZE**
  - COMPLETED EVIDENCE: provider-neutral/fail-closed Voice scope audited and preserved.

- [x] **N3.2R — PR #17 FINAL EXACT-HEAD VALIDATION / HANDOFF**
  - COMPLETED EVIDENCE: current main `ba39d977072231d69ef848b1cc9ae2637b556c72` incorporated; PR #17 exact HEAD `21665a6b0aeb986c37bbc70a23f55871d0723807`, OPEN/DRAFT/mergeable=true; `NEXO 3 Voice Validation` run `32566648776`, job `97016122933`, SUCCESS with `npm ci`, `node scripts/check-voice-command-core.mjs` (includes TypeScript strict compile) and `python3 scripts/check_conceptual_master.py .` on the full checkout; V02/V03/V34 `[ ] / parziale`; mandatory report/LATEST/Fabio dashboard present; PR body contains exact-SHA handoff to NEXO REVIEW. No merge/Ready/TestFlight/credentials action.

- [ ] **N3.3 — VOICE INTENT NORMALIZATION**
  - START CONDITION: PR #17 CLEAN and serialized/merged by Coordinator.
  - Goal: deterministic normalization, unknown/confidence semantics, no invented destination; edge-case tests.
  - STATUS: NOT ELIGIBLE — PR #17 has been handed to NEXO REVIEW but is not yet CLEAN/serialized/merged.

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
- N3.2R completed lato autore on PR #17 exact HEAD `21665a6b0aeb986c37bbc70a23f55871d0723807`.
- PR #17: OPEN / DRAFT / mergeable=true; base current main `ba39d977072231d69ef848b1cc9ae2637b556c72`.
- Exact-head workflow `NEXO 3 Voice Validation` run `32566648776`, job `97016122933`: SUCCESS; Voice checker/strict compile and complete conceptual validator succeeded.
- GitHub report appended in `coordination/reports/NEXO_3_REPORT.md`; PR body updated with explicit NEXO REVIEW handoff.
- N3.3 remains non-eligible until CLEAN + Coordinator serialization/merge; NEXO 3 is therefore in REVIEW/STANDBY and must not start a new Voice slice.
