# NEXO 3 — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO 3
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- PR #17 `feat(voice): provider-neutral intent command core`: OPEN / DRAFT, exact HEAD `63accc216634a11c6235b1b7d88875d558d70cfc`.
- N3.2 previously reconciled PR #17 to main `47b9d0a5...`; at that point PR became mergeable and diff was four voice-owned files.
- PR #22 Location Contract has now merged. Current main is `8d8dee4a31416acb38c2e654082ca15efafd6fec`.
- Fresh PR metadata after the main advance reports PR #17 `mergeable=false`. Therefore the previous mergeability evidence is historical and N3.2 must reconcile again before conceptual/reporting finalization.
- No workflow runs were associated with exact reconciliation HEAD `63accc216...`; do not invent final PASS.
- Do not touch location/surface/navigation/automotive native/EAS/TestFlight areas owned elsewhere.

## QUEUE — ONE TASK AT A TIME

- [x] **N3.1 — PR #17 CURRENT-HEAD AUDIT / SAFE FREEZE**
  - COMPLETED EVIDENCE: audited exact PR #17 HEAD `4d02a7fd5e579cbd48aa5e7c2588f5580d86c317`; functional changes confined to voice core/checker; no CI PASS invented.

- [ ] **N3.2 — CURRENT-MAIN RECONCILIATION + PR #17 COMPLETION**
  - START CONDITION: SATISFIED — current main is known and location PR #22 is merged; voice ownership remains isolated.
  - FIRST REQUIRED ACTION: reconcile PR #17 against current main `8d8dee4a31416acb38c2e654082ca15efafd6fec`, preserving Saved Places + Location Contract/C007 and reintroducing only legitimate voice-owned delta. Do not overwrite current-main conceptual/reporting.
  - Goal remaining: finish PR #17 conceptual/reporting/test gates, rerun applicable checks on final content, exact-SHA handoff to NEXO REVIEW.
  - PROOF REQUIRED: new exact SHA; PR mergeable; compare shows current main preserved; voice diff + necessary current-main-aware conceptual/reporting only; reproducible checker/test + conceptual validator evidence; explicit review handoff.
  - CURRENT EVIDENCE: old HEAD `63accc216...` is now non-mergeable after PR #22 merge; N3.2 remains `[ ]` and must not be handed off until new reconciliation/final verify.

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
- 2026-08-22 04:05 UTC — main advanced via CLEAN PR #22 to `8d8dee4a31416acb38c2e654082ca15efafd6fec`.
- Fresh PR #17 metadata after that advance: OPEN/DRAFT, HEAD `63accc216...`, `mergeable=false`.
- N3.2 remains ACTIONABLE but reconciliation is again the first gate; old mergeability=true must not be reused.
