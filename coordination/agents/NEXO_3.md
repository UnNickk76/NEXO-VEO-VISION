# NEXO 3 — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO 3
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- Current main verified: `8d8dee4a31416acb38c2e654082ca15efafd6fec` (PR #22 Location Contract merged).
- PR #17 `feat(voice): provider-neutral intent command core`: OPEN / DRAFT / **mergeable=true** on fresh metadata.
- Current exact HEAD: `fc5932b685406dd566848afc0ab40f098cd00f2a`.
- Current PR diff is reduced to 2 voice-owned files / 8 commits; no review threads are open.
- No GitHub Actions workflow is associated with exact HEAD `fc5932b...`; therefore no exact-head CI PASS is claimed.
- The old shared-file blocker from PR #12 is obsolete: PR #12 is merged and PR #22 is also merged. The remaining gate is now final N3.2 completion/evidence, not ownership blocking.
- Do not touch location/surface/navigation/automotive native/EAS/TestFlight areas owned elsewhere.

## QUEUE — ONE TASK AT A TIME

- [x] **N3.1 — PR #17 CURRENT-HEAD AUDIT / SAFE FREEZE**
  - COMPLETED EVIDENCE: audited prior voice-core state and preserved provider-neutral/fail-closed scope without inventing CI evidence.

- [ ] **N3.2 — PR #17 FINAL COMPLETION / EVIDENCE / REVIEW HANDOFF**
  - START CONDITION: SATISFIED NOW — PR #12 and PR #22 are merged; fresh PR #17 metadata is mergeable=true on current main.
  - CURRENT HEAD: `fc5932b685406dd566848afc0ab40f098cd00f2a`.
  - FIRST REQUIRED ACTION: verify the exact current diff against main and confirm only legitimate voice-owned changes remain; do not reintroduce stale shared reporting state.
  - Goal remaining: finish the minimum conceptual/reporting/test gates required by AGENTS.md, rerun reproducible voice checker/TypeScript/conceptual validator where applicable, produce a final exact SHA, keep PR DRAFT, and hand off to NEXO REVIEW.
  - PROOF REQUIRED: final exact SHA; PR mergeable; current main preserved; voice checker/test evidence actually executed; conceptual/reporting evidence current-main-aware; no stale PR #12/#22 reporting overwrite; explicit REVIEW handoff + chat/GitHub report.
  - IMPORTANT: current `mergeable=true` is necessary but NOT sufficient for merge. N3.2 remains `[ ]` until final evidence and REVIEW handoff exist.

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
- 2026-08-22 coordinator refresh: current main `8d8dee4a31416acb38c2e654082ca15efafd6fec`.
- PR #17 fresh metadata: OPEN / DRAFT / mergeable=true, exact HEAD `fc5932b685406dd566848afc0ab40f098cd00f2a`, 2 changed files.
- Review threads: none.
- Exact-head workflow runs: none.
- N3.2 is ACTIONABLE NOW; do not wait for the obsolete PR #12 blocker.
