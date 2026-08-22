# NEXO 3 — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO 3
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- Current main: `ba39d977072231d69ef848b1cc9ae2637b556c72`.
- TestFlight production is manual / Coordinator-controlled.
- PR #17 Voice Intent → Command Core is OPEN / DRAFT / mergeable=true on exact HEAD `8f82b692d2cc6759c4ce773c791f3725f85e4062`.
- N3.2RR post-reporting exact-head `NEXO 3 Voice Validation` run `32574678400`, job `97035151898`, concluded SUCCESS: Voice checker SUCCESS (includes TypeScript strict), conceptual validator SUCCESS.
- REVIEW R4R source on prior SHA `21665a6b...`: CHANGES REQUIRED, review `4999992268`, P0/P1/P2=0/2/0; both P1s have now been rectified and re-handed off on new SHA.
- V02/V03/V34 remain `[ ] / parziale`; no STT/TTS/microphone/wake-word/provider/automotive runtime is claimed.
- Do not touch location/surface/navigation/automotive native/EAS/TestFlight areas owned elsewhere.

## QUEUE — ONE TASK AT A TIME

- [x] **N3.1 — PR #17 CURRENT-HEAD AUDIT / SAFE FREEZE**
  - COMPLETED EVIDENCE: provider-neutral/fail-closed Voice scope audited and preserved.

- [x] **N3.2R — PR #17 FINAL EXACT-HEAD VALIDATION / HANDOFF**
  - COMPLETED EVIDENCE: exact HEAD `21665a6b0aeb986c37bbc70a23f55871d0723807`; Voice Validation run `32566648776` SUCCESS; handoff performed. Subsequent REVIEW found reporting/evidence P1s, isolated below as N3.2RR.

- [x] **N3.2RR — PR #17 R4R REVIEW RECTIFICATION / NEW EXACT-SHA HANDOFF**
  - START CONDITION: SATISFIED / PRIORITY 1 FOR NEXO 3.
  - REVIEW SOURCE: exact SHA `21665a6b0aeb986c37bbc70a23f55871d0723807`, review `4999992268`, CHANGES REQUIRED, P0/P1/P2=0/2/0.
  - PRESERVE: Voice core, checker/workflow and all accepted technical behavior; do NOT redesign or expand Voice functionality.
  - P1-1 REQUIRED FIX: update only V02/V03/V34 evidence so each row contains PR #17 + a pertinent commit SHA + pertinent test/check evidence; keep every checkbox `[ ]` and state `parziale`; explicitly retain absence of STT/TTS/microphone/wake-word/provider/native runtime.
  - P1-2 REQUIRED FIX: make reporting fully AGENTS.md-compliant; `LATEST.md` path + full report; align `Fabio/FABIO_CONTROLLO.md` conservatively.
  - REQUIRED PROOF: NEW exact SHA, post-edit Voice checker/TypeScript strict + full conceptual validator, PR DRAFT/mergeable/current-main-compatible.
  - HANDOFF: explicit NEXO REVIEW re-handoff; do not claim CLEAN.
  - DEFINITION OF DONE: both R4R P1s demonstrably closed on a new exact SHA with post-edit VERIFY and explicit handoff.
  - COMPLETED EVIDENCE: P1-1 fixed in conceptual commit `b6681d826c18da5269c87145b5d0d5f5649daa9e`; intermediate validation run `32574584194`, job `97034924381`, SUCCESS. New historical report `docs/codex-reports/2026-08-22_130500_nexo3-n3-2rr-review-rectification.md`; `LATEST.md` and `Fabio/FABIO_CONTROLLO.md` aligned. Final post-reporting exact HEAD `8f82b692d2cc6759c4ce773c791f3725f85e4062`, PR OPEN/DRAFT/mergeable=true; `NEXO 3 Voice Validation` run `32574678400`, job `97035151898`, SUCCESS with Voice checker/TypeScript strict and conceptual validator. Explicit re-handoff recorded in PR body and Issue #11 comment `5380562539`. NEXO 3 does not claim CLEAN.
  - FREEZE: N3.3 remains non-eligible until CLEAN + Coordinator serialization/merge.

- [ ] **N3.3 — VOICE INTENT NORMALIZATION**
  - START CONDITION: PR #17 CLEAN and serialized/merged by Coordinator.
  - Goal: deterministic normalization, unknown/confidence semantics, no invented destination; edge-case tests.
  - CURRENT GATE: NOT SATISFIED — PR #17 is re-handed off for NEXO REVIEW but no new CLEAN verdict or Coordinator merge/serialization has been observed.

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
- 2026-08-22 13:05 UTC: N3.2RR completed lato autore on PR #17 exact HEAD `8f82b692d2cc6759c4ce773c791f3725f85e4062`, OPEN/DRAFT/mergeable=true.
- P1-1: V02/V03/V34 evidence now includes PR #17 + commit `471934b4fa2cbcc963cceb195eda548f5546c59e` + pertinent check/run, remaining `[ ] / parziale`.
- P1-2: full N3.2RR historical report + aligned `LATEST.md` + Fabio dashboard.
- Final post-reporting Voice Validation run `32574678400`, job `97035151898`: SUCCESS; Voice checker/TypeScript strict SUCCESS; conceptual validator SUCCESS.
- Explicit NEXO REVIEW re-handoff recorded in PR body and Issue #11 comment `5380562539`.
- N3.3 remains frozen until CLEAN + Coordinator serialization/merge.
