# NEXO 3 — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO 3
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- PR #17 `feat(voice): provider-neutral intent command core`: OPEN / DRAFT / mergeable.
- Current HEAD observed by Coordinator: `4d02a7fd5e579cbd48aa5e7c2588f5580d86c317`.
- Shared conceptual/reporting files remain sensitive because PR #12 is still open.
- NEXO 3 must not overwrite shared reporting/conceptual state while PR #12 owns/conflicts with it.
- Do not touch location/surface/navigation/automotive native/EAS/TestFlight areas owned elsewhere.

## QUEUE — ONE TASK AT A TIME

- [ ] **N3.1 — PR #17 CURRENT-HEAD AUDIT / SAFE FREEZE**
  - START CONDITION: immediate, READ-ONLY with respect to shared reporting/conceptual files.
  - Goal: verify exact current PR #17 HEAD/diff/commits versus the last authorized voice-core intent, identify what changed since prior blocked SHA, and record whether the functional voice files are internally coherent. Do not modify shared files. Update this queue file with evidence.

- [ ] **N3.2 — RELEASE BLOCK CHECK + PR #17 COMPLETION**
  - START CONDITION: PR #12 merged/closed or Coordinator explicitly records shared files free.
  - Goal: finish PR #17 reporting/conceptual/test gates, rerun applicable checks, exact-SHA handoff to NEXO REVIEW.

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
After every task: update this file on `coordination/agent-control`, mark `[x]` only when truly completed, append exact PR/SHA/check evidence, then immediately reread and start the next eligible task. A blocked task remains `[ ]` with blocker recorded.

## LAST EVIDENCE
- Coordinator snapshot: PR #17 HEAD `4d02a7fd5e579cbd48aa5e7c2588f5580d86c317`, OPEN/DRAFT/mergeable.
