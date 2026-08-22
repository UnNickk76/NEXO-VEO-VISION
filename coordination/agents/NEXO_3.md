# NEXO 3 — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO 3
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- Current main: `1d0a01c91bb328baf141560a534f4b62fe406b01` after Coordinator squash-merge of CLEAN PR #17.
- TestFlight production is manual / Coordinator-controlled.
- PR #17 Voice Intent → Command Core: MERGED. Exact reviewed SHA `8f82b692d2cc6759c4ce773c791f3725f85e4062`; CLEAN review `5000238141`; merge commit `1d0a01c91bb328baf141560a534f4b62fe406b01`.
- Exact-head Voice Validation run `32574678400` SUCCESS; Location State Machine `32574678369` SUCCESS; Location Contract `32574678491` SUCCESS.
- V02/V03/V34 remain `[ ] / parziale`; no STT/TTS/microphone/wake-word/provider/automotive runtime is claimed.
- Consolidation freeze remains active. Do not start new functional work while higher-priority stale PRs are being serialized unless Coordinator explicitly releases the freeze.
- Governance correction: PR #25 was opened from an earlier task snapshot before the fresher freeze directive was observed; it has been CLOSED / NOT MERGED. No PR #25 commit reached main.

## QUEUE — ONE TASK AT A TIME

- [x] **N3.1 — PR #17 CURRENT-HEAD AUDIT / SAFE FREEZE**
  - COMPLETED.

- [x] **N3.2R — PR #17 FINAL EXACT-HEAD VALIDATION / HANDOFF**
  - COMPLETED; subsequent reporting/evidence P1s isolated in N3.2RR.

- [x] **N3.2RR — PR #17 R4R REVIEW RECTIFICATION / NEW EXACT-SHA HANDOFF**
  - COMPLETED EVIDENCE: exact SHA `8f82b692d2cc6759c4ce773c791f3725f85e4062`; CLEAN review `5000238141`; Voice Validation `32574678400` SUCCESS; no review threads; Coordinator marked Ready and squash-merged as `1d0a01c91bb328baf141560a534f4b62fe406b01`.

- [ ] **N3.3 — VOICE INTENT NORMALIZATION**
  - START CONDITION: BLOCKED BY CONSOLIDATION FREEZE despite PR #17 being merged.
  - Resume only when Coordinator explicitly releases NEXO 3 after the active consolidation queue (#24, #18, #19, #20) is sufficiently serialized.
  - Goal when released: deterministic normalization, unknown/confidence semantics, no invented destination; edge-case tests.
  - BLOCKED EVIDENCE: fresher Task Plane directive observed after a stale snapshot had led to creation of branch `nexo3/n3-3-voice-intent-normalization` / PR #25. PR #25 final HEAD `afada5ac935a04698791219c6b89fe50f075e174` is now CLOSED, DRAFT, `merged=false`; no change reached main. Technical validation on the closed branch succeeded only after an initial real failure (`32576736422`): final run `32576970842`, job `97040611813`, SUCCESS. These runs are historical evidence only and do not satisfy the blocked START CONDITION.

- [ ] **N3.4 — COMMAND VALIDATION POLICY**
  - START CONDITION: N3.3 completed.

- [ ] **N3.5 — CONFIRMATION LIFECYCLE STATE MACHINE**
  - START CONDITION: N3.4 completed.

- [ ] **N3.6 — COMMAND BUS HARDENING + VOICE FOUNDATION REVIEW**
  - START CONDITION: N3.5 completed.

- [ ] **N3.7 — VOICE FOUNDATION GAP AUDIT**
  - START CONDITION: N3.6 completed/reviewable.

## UPDATE RULE
After every task: update this file on `coordination/agent-control`, mark `[x]` only if truly completed, append exact PR/SHA/check evidence, write chat + GitHub report, then immediately reread and start the next eligible task. A blocked task remains `[ ]` with blocker recorded.

## LAST EVIDENCE
- 2026-08-22 coordinator verification: PR #17 CLEAN on exact SHA `8f82b692...`, review `5000238141`, no review threads.
- Coordinator Ready transition + squash merge completed successfully.
- New main: `1d0a01c91bb328baf141560a534f4b62fe406b01`.
- N3.3 intentionally remains blocked by consolidation freeze; do not open another Voice PR yet.
- 2026-08-22 13:52 UTC governance correction: PR #25, opened from a stale task snapshot, was CLOSED / NOT MERGED on exact HEAD `afada5ac935a04698791219c6b89fe50f075e174`; main remains unaffected. Control Plane report commit records the full history. Resume N3.3 only after explicit Coordinator release.
