# NEXO 3 — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO 3
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- Current main verified: `8d8dee4a31416acb38c2e654082ca15efafd6fec` (PR #22 Location Contract merged).
- PR #17 `feat(voice): provider-neutral intent command core`: OPEN / DRAFT.
- Current exact HEAD after N3.2 reporting progress: `c80964fab1895a44a999e687ab50934d364c94cd`.
- Compare against current main: `behind_by=0`, merge-base=current main; 6 changed files (2 Voice functional + conceptual + historical report + LATEST + Fabio dashboard).
- Fresh PR metadata immediately after reporting returned `mergeable=false`; do not claim final mergeability until refreshed coherently.
- No final voice-checker/conceptual-validator PASS is claimed in this cycle: runtime checkout failed before checker execution because DNS could not resolve github.com.
- Do not touch location/surface/navigation/automotive native/EAS/TestFlight areas owned elsewhere.

## QUEUE — ONE TASK AT A TIME

- [x] **N3.1 — PR #17 CURRENT-HEAD AUDIT / SAFE FREEZE**
  - COMPLETED EVIDENCE: audited prior voice-core state and preserved provider-neutral/fail-closed scope without inventing CI evidence.

- [ ] **N3.2 — PR #17 FINAL COMPLETION / EVIDENCE / REVIEW HANDOFF**
  - START CONDITION: SATISFIED — PR #12 and PR #22 merged; ownership blocker obsolete.
  - CURRENT HEAD: `c80964fab1895a44a999e687ab50934d364c94cd`.
  - PROGRESS EVIDENCE 2026-08-22 06:48 UTC: V02/V03/V34 updated conservatively to `[ ] / parziale`; historical report `docs/codex-reports/2026-08-22_064800_nexo3-n3-2-finalization-progress.md`, LATEST and Fabio dashboard added on PR #17. Current main remains merge-base and `behind_by=0`.
  - TRANSIENT BLOCKER: final reproducible checks are still missing. Actual command `git clone -q --branch nexo3/f0-voice-command-core --single-branch https://github.com/UnNickk76/NEXO-VEO-VISION.git /tmp/nexo && cd /tmp/nexo && git rev-parse HEAD && node frontend/scripts/check-voice-command-core.mjs` exited 128 before checker invocation: `Could not resolve host: github.com`. `node -v` = v22.16.0 and `tsc -v` = 5.8.3 were verified, but do not constitute final compile/check PASS.
  - REQUIRED TO COMPLETE: rerun actual voice checker and applicable conceptual validator on final content; refresh PR mergeability; record final exact SHA; keep PR DRAFT; hand off to NEXO REVIEW; append final chat + GitHub report.

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
- 2026-08-22 06:48 UTC: N3.2 progressed on PR #17 to exact HEAD `c80964fab1895a44a999e687ab50934d364c94cd`.
- Conceptual V02/V03/V34 are now `[ ] / parziale`; current main C007/PR #22 state preserved.
- Reporting required by AGENTS.md added on the same PR: historical report + LATEST + Fabio dashboard.
- Compare: current main `8d8dee4...` is merge-base, `behind_by=0`; fresh metadata mergeable=false is not promoted to a positive claim.
- Final checker/validator gate remains unsatisfied due actual DNS checkout failure (exit 128 before checker). N3.2 remains `[ ]`; N3.3 not eligible.
