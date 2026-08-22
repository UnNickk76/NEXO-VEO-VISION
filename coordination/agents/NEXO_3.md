# NEXO 3 — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO 3
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- PR #17 `feat(voice): provider-neutral intent command core`: OPEN / DRAFT.
- Exact HEAD after N3.2 reconciliation: `63accc216634a11c6235b1b7d88875d558d70cfc`.
- Current main: `47b9d0a5c20490f0b73e95e52fadca151e89e136` (PR #12 merged).
- Compare after reconciliation: PR branch is `ahead`, `behind_by=0`, merge-base=current main; diff is exactly the four pre-existing voice-owned files.
- GitHub PR metadata immediately after reconciliation still reports `mergeable=false`; do not claim mergeable until this metadata is coherent on a fresh check.
- Do not touch location/surface/navigation/automotive native/EAS/TestFlight areas owned elsewhere.

## QUEUE — ONE TASK AT A TIME

- [x] **N3.1 — PR #17 CURRENT-HEAD AUDIT / SAFE FREEZE**
  - START CONDITION: immediate, READ-ONLY with respect to shared reporting/conceptual files.
  - COMPLETED EVIDENCE: audited exact PR #17 HEAD `4d02a7fd5e579cbd48aa5e7c2588f5580d86c317`; functional changes confined to voice core/checker; no CI PASS invented.

- [ ] **N3.2 — POST-PR12 RECONCILIATION + PR #17 COMPLETION**
  - START CONDITION: SATISFIED — PR #12 merged and Coordinator released shared files.
  - FIRST REQUIRED ACTION: COMPLETED — reconciled safely with current main via merge commit `63accc216634a11c6235b1b7d88875d558d70cfc`, preserving main and reintroducing only the four pre-existing PR #17 files.
  - Goal: reconcile branch safely, finish PR #17 reporting/conceptual/test gates, rerun applicable checks on final content, exact-SHA handoff to NEXO REVIEW.
  - PROOF REQUIRED: new exact SHA; PR mergeable; diff remains voice-owned plus necessary conflict reconciliation/reporting; reproducible checker/test evidence; conceptual/reporting aligned; no accidental regression of merged Saved Places state.
  - CURRENT EVIDENCE: compare against main = `ahead`, `behind_by=0`, merge-base `47b9d0a5...`, four-file voice-only diff. PR metadata still says `mergeable=false`; conceptual/reporting finalization and final checks remain pending. N3.2 therefore stays `[ ]`.

- [ ] **N3.3 — VOICE INTENT NORMALIZATION**
  - START CONDITION: N3.2 completed/reviewable and no conflict.
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

## UPDATE RULE
After every task: update this file on `coordination/agent-control`, mark `[x]` only when truly completed, append exact PR/SHA/check evidence, write chat + GitHub report, then immediately reread and start the next eligible task. A blocked task remains `[ ]` with blocker recorded.

## LAST EVIDENCE
- 2026-08-22 02:47 UTC — N3.2 reconciliation write completed: new PR #17 HEAD `63accc216634a11c6235b1b7d88875d558d70cfc`.
- Current main `47b9d0a5c20490f0b73e95e52fadca151e89e136` is now merge-base; branch `behind_by=0`.
- Diff against main remains exactly: two historical voice reports, `frontend/scripts/check-voice-command-core.mjs`, `frontend/src/voice/command-core.ts`.
- PR remains OPEN/DRAFT. Metadata mergeable=false is not treated as resolved despite clean ancestry evidence.
- N3.2 remains active; no transition to N3.3 until conceptual/reporting/check gates and reviewable exact-SHA handoff are complete.
