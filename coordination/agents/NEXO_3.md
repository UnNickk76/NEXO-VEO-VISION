# NEXO 3 — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO 3
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- Current main: `ba39d977072231d69ef848b1cc9ae2637b556c72`.
- TestFlight production is manual / Coordinator-controlled.
- PR #17 Voice Intent → Command Core is OPEN / DRAFT / mergeable=true on exact HEAD `21665a6b0aeb986c37bbc70a23f55871d0723807`.
- Exact-head `NEXO 3 Voice Validation` run `32566648776`, job `97016122933`, concluded SUCCESS; technical Voice core was accepted by REVIEW.
- REVIEW R4R on exact SHA `21665a6b...`: CHANGES REQUIRED, review `4999992268`, P0/P1/P2=0/2/0.
- P1-1: V02/V03/V34 evidence is incomplete under AGENTS.md (each needs PR + pertinent commit + pertinent test/check), while remaining `[ ] / parziale`.
- P1-2: final N3.2R historical report is incomplete under AGENTS.md and must record actual exact-head SUCCESS plus all mandatory reporting fields.
- No STT/TTS/microphone/wake-word/provider/automotive runtime is claimed.
- Do not touch location/surface/navigation/automotive native/EAS/TestFlight areas owned elsewhere.

## QUEUE — ONE TASK AT A TIME

- [x] **N3.1 — PR #17 CURRENT-HEAD AUDIT / SAFE FREEZE**
  - COMPLETED EVIDENCE: provider-neutral/fail-closed Voice scope audited and preserved.

- [x] **N3.2R — PR #17 FINAL EXACT-HEAD VALIDATION / HANDOFF**
  - COMPLETED EVIDENCE: exact HEAD `21665a6b0aeb986c37bbc70a23f55871d0723807`; Voice Validation run `32566648776` SUCCESS; handoff performed. Subsequent REVIEW found reporting/evidence P1s, isolated below as N3.2RR.

- [ ] **N3.2RR — PR #17 R4R REVIEW RECTIFICATION / NEW EXACT-SHA HANDOFF**
  - START CONDITION: SATISFIED / PRIORITY 1 FOR NEXO 3.
  - REVIEW SOURCE: exact SHA `21665a6b0aeb986c37bbc70a23f55871d0723807`, review `4999992268`, CHANGES REQUIRED, P0/P1/P2=0/2/0.
  - PRESERVE: Voice core, checker/workflow and all accepted technical behavior; do NOT redesign or expand Voice functionality.
  - P1-1 REQUIRED FIX: update only V02/V03/V34 evidence so each row contains PR #17 + a pertinent commit SHA + pertinent test/check evidence; keep every checkbox `[ ]` and state `parziale`; explicitly retain absence of STT/TTS/microphone/wake-word/provider/native runtime.
  - P1-2 REQUIRED FIX: make `docs/codex-reports/2026-08-22_095800_nexo3-n3-2r-finalization.md` fully AGENTS.md-compliant (or create a new final historical report if safer), including commit chronology, complete file inventory, individual observed final check results, errors/warnings, residual problems, dependencies/credentials, technical risks, next step and Fabio decisions. `LATEST.md` must contain path + full latest report; align `Fabio/FABIO_CONTROLLO.md` conservatively.
  - REQUIRED PROOF: after final conceptual/reporting edits, obtain a NEW exact SHA; rerun every affected/applicable check on exact final content, including Voice checker/TypeScript strict and full conceptual validator; record workflow/run/job or equally reproducible real execution and individual results. PR must remain DRAFT, mergeable/current-main-compatible.
  - HANDOFF: explicit NEXO REVIEW re-handoff on the NEW exact SHA. Do not claim CLEAN yourself.
  - DEFINITION OF DONE: both R4R P1s demonstrably closed on a new exact SHA with post-edit VERIFY and explicit handoff.
  - FREEZE: N3.3 remains non-eligible until CLEAN + Coordinator serialization/merge.

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
After every task: update this file on `coordination/agent-control`, mark `[x]` only if truly completed, append exact PR/SHA/check evidence, write chat + GitHub report, then immediately reread and start the next eligible task. A blocked task remains `[ ]` with blocker recorded.

## LAST EVIDENCE
- 2026-08-22 11:09 UTC NEXO REVIEW R4R on PR #17 exact SHA `21665a6b...`: CHANGES REQUIRED, review `4999992268`, two P1 governance/evidence only; technical Voice core and exact-head CI accepted.
- PR #17 remains OPEN / DRAFT / mergeable=true against current main `ba39d977...`.
- N3.2RR is now the sole authorized NEXO 3 task. N3.3+ remain frozen until CLEAN + Coordinator merge.
