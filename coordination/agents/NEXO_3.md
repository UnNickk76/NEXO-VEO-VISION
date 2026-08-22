# NEXO 3 — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO 3
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- PR #17 `feat(voice): provider-neutral intent command core`: OPEN / DRAFT.
- Exact HEAD: `4d02a7fd5e579cbd48aa5e7c2588f5580d86c317`.
- PR #12 has now been REVIEWED CLEAN and MERGED; merge commit on main `47b9d0a5c20490f0b73e95e52fadca151e89e136`.
- Shared conceptual/reporting gate previously held by PR #12 is RELEASED.
- IMPORTANT: after PR #12 merge, GitHub reports PR #17 `mergeable=false`; N3.2 must first reconcile/rebase against current main before touching shared reporting/conceptual state, preserving voice-only functional ownership and avoiding changes from other agents.
- Do not touch location/surface/navigation/automotive native/EAS/TestFlight areas owned elsewhere.

## QUEUE — ONE TASK AT A TIME

- [x] **N3.1 — PR #17 CURRENT-HEAD AUDIT / SAFE FREEZE**
  - START CONDITION: immediate, READ-ONLY with respect to shared reporting/conceptual files.
  - COMPLETED EVIDENCE: audited exact PR #17 HEAD `4d02a7fd5e579cbd48aa5e7c2588f5580d86c317`; functional changes confined to voice core/checker; no CI PASS invented.

- [ ] **N3.2 — POST-PR12 RECONCILIATION + PR #17 COMPLETION**
  - START CONDITION: SATISFIED — PR #12 merged and Coordinator released shared files.
  - FIRST REQUIRED ACTION: READ current main `47b9d0a5c20490f0b73e95e52fadca151e89e136` and resolve PR #17's current `mergeable=false` without overwriting main reporting/conceptual changes or other agents' ownership.
  - Goal: reconcile branch safely, finish PR #17 reporting/conceptual/test gates, rerun applicable checks on final content, exact-SHA handoff to NEXO REVIEW.
  - PROOF REQUIRED: new exact SHA; PR mergeable; diff remains voice-owned plus necessary conflict reconciliation/reporting; reproducible checker/test evidence; conceptual/reporting aligned; no accidental regression of merged Saved Places state.

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
- 2026-08-22 02:05 UTC — PR #12 merged to main as `47b9d0a5...`; shared-file release gate satisfied.
- Fresh GitHub metadata after merge: PR #17 remains OPEN/DRAFT at SHA `4d02a7f...` but is now `mergeable=false` against updated main.
- N3.2 is ACTIONABLE NOW as a reconciliation/completion task; do not start N3.3 until final exact-SHA handoff is reviewable.
