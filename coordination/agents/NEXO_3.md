# NEXO 3 — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO 3
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- PR #17 `feat(voice): provider-neutral intent command core`: OPEN / DRAFT.
- Exact HEAD after N3.2 reconciliation: `63accc216634a11c6235b1b7d88875d558d70cfc`.
- Current main: `47b9d0a5c20490f0b73e95e52fadca151e89e136` (PR #12 merged).
- Fresh GitHub PR metadata now reports `mergeable=true`; previous `mergeable=false` observation was stale/transient after reconciliation.
- Reconciliation evidence remains: current main is base/merge-base and diff is exactly the four pre-existing voice-owned files.
- No workflow runs are currently associated with exact reconciliation HEAD `63accc216...`; do not invent a final PASS.
- Do not touch location/surface/navigation/automotive native/EAS/TestFlight areas owned elsewhere.

## QUEUE — ONE TASK AT A TIME

- [x] **N3.1 — PR #17 CURRENT-HEAD AUDIT / SAFE FREEZE**
  - START CONDITION: immediate, READ-ONLY with respect to shared reporting/conceptual files.
  - COMPLETED EVIDENCE: audited exact PR #17 HEAD `4d02a7fd5e579cbd48aa5e7c2588f5580d86c317`; functional changes confined to voice core/checker; no CI PASS invented.

- [ ] **N3.2 — POST-PR12 RECONCILIATION + PR #17 COMPLETION**
  - START CONDITION: SATISFIED — PR #12 merged and Coordinator released shared files.
  - FIRST REQUIRED ACTION: COMPLETED — reconciled safely with current main via merge commit `63accc216634a11c6235b1b7d88875d558d70cfc`, preserving main and reintroducing only the four pre-existing PR #17 files.
  - MERGEABILITY GATE: SATISFIED on fresh check — PR metadata now `mergeable=true`.
  - Goal remaining: finish PR #17 conceptual/reporting/test gates, rerun applicable checks on final content, exact-SHA handoff to NEXO REVIEW.
  - PROOF REQUIRED: final exact SHA; diff remains voice-owned plus necessary conceptual/reporting; reproducible checker/test evidence; conceptual/reporting aligned; no regression of merged Saved Places state; explicit review handoff.
  - CURRENT EVIDENCE: PR OPEN/DRAFT/mergeable=true at `63accc216...`; no workflow on that exact SHA; conceptual/reporting finalization and final checks remain pending. N3.2 therefore stays `[ ]`.

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
- Fresh Coordinator check: PR #17 exact HEAD `63accc216634a11c6235b1b7d88875d558d70cfc`, base SHA `47b9d0a5...`, OPEN/DRAFT, `mergeable=true`, 4 changed files.
- Workflow query on exact HEAD: none. This does not block continuing N3.2; it means final checker/validator proof is still required after final content.
- Continue N3.2 now; do not wait on the obsolete mergeability concern. N3.3 remains gated until final handoff.
