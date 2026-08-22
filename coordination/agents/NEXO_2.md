# NEXO 2 — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO 2
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- Current main: `1d0a01c91bb328baf141560a534f4b62fe406b01` after CLEAN PR #17 Voice merge.
- TestFlight production is manual / Coordinator-controlled.
- PR #20 Surface Capabilities: OPEN / DRAFT / mergeable=false, historical HEAD `6e13d42379a5cff26cb37a67944f89302b925ac4`.
- Historical CLEAN review `4998458851` remains evidence only for the old SHA and does not authorize merge after divergence.
- Existing Surface implementation must be preserved: capability model, availability/policy orthogonality, deterministic checker, V05/V44/V45/V46 conservative evidence.
- Consolidation freeze remains active; no new Surface slice before PR #20 is reconciled, re-reviewed and merged.

## QUEUE — ONE TASK AT A TIME

- [x] **N2.1 — CLOSE PR #20 REPORTING / VERIFY P1**
- [x] **N2.2 — PR #20 REVIEW REWORK / CLEAN HANDOFF**

- [ ] **N2.3R — SAFE RECONCILIATION PR #20 TO CURRENT MAIN + RE-HANDOFF**
  - START CONDITION: SATISFIED IN PRINCIPLE / GLOBAL PRIORITY AFTER #24/#18/#19 serialization progress.
  - CURRENT MAIN SNAPSHOT: `1d0a01c91bb328baf141560a534f4b62fe406b01`; at execution always reread latest main first.
  - FIRST SAFETY STEP: preserve exact current PR #20 HEAD/backup before any reconciliation attempt.
  - PRESERVE: Surface Capabilities, availability/policy distinction, checker, V05/V44/V45/V46 evidence, plus every newer main change including Saved Places, Location foundation, manual-only TestFlight policy and merged Voice Core.
  - RECONCILIATION RULE: safe merge/rebase/update-branch capability only. If shared files conflict ambiguously, STOP and report exact file/path/hunk to Coordinator; do not reconstruct global docs speculatively.
  - AFTER RECONCILIATION: rerun applicable Surface TypeScript/checker/conceptual checks; align reporting to current main; explicit new exact-SHA NEXO REVIEW handoff.
  - DEFINITION OF DONE: mergeable exact SHA, no current-main regression, exact-head Surface checks recorded, DRAFT, explicit review handoff.

- [ ] **N2.4 — SURFACE SESSION / LIFECYCLE MODEL**
  - START CONDITION: PR #20 CLEAN and serialized/merged by Coordinator.

- [ ] **N2.5 — SAFETY / INTERACTION POLICY CONTRACT**
  - START CONDITION: N2.4 completed.

- [ ] **N2.6 — SURFACE ADAPTER CONTRACT + HARDENING**
  - START CONDITION: N2.5 completed.

- [ ] **N2.7 — SURFACE FOUNDATION GAP AUDIT**
  - START CONDITION: N2.6 completed/reviewable.

## UPDATE RULE
After every task: update this file on `coordination/agent-control`, mark `[x]` only if truly completed, append exact PR/SHA/check evidence, then immediately reread and start the next eligible task.

## LAST EVIDENCE
- Current main advanced to `1d0a01c91bb328baf141560a534f4b62fe406b01` after PR #17 CLEAN merge.
- PR #20 remains stale/non-mergeable and must be preserved, not rewritten.
- N2.3R remains reconciliation-only; N2.4+ are frozen.
