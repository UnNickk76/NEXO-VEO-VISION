# NEXO 2 — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO 2
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- Current main: `1d0a01c91bb328baf141560a534f4b62fe406b01` after CLEAN PR #17 Voice merge.
- TestFlight production is manual / Coordinator-controlled.
- PR #20 Surface Capabilities: OPEN / DRAFT / mergeable=false, historical HEAD `6e13d42379a5cff26cb37a67944f89302b925ac4`.
- Historical CLEAN review remains evidence only for that stale SHA.
- Preserve existing Surface capability model, availability/policy orthogonality, checker and conservative V05/V44/V45/V46 evidence.
- Consolidation is STRICTLY SERIAL.

## QUEUE — ONE TASK AT A TIME

- [x] **N2.1 — CLOSE PR #20 REPORTING / VERIFY P1**
- [x] **N2.2 — PR #20 REVIEW REWORK / CLEAN HANDOFF**

- [ ] **N2.3R — SAFE RECONCILIATION PR #20 TO CURRENT MAIN + RE-HANDOFF**
  - START CONDITION: BLOCKED until Coordinator records PR #24, PR #18 and PR #19 CLEAN + MERGED and updates this file with the then-current main SHA.
  - First safety step when released: preserve exact current PR #20 HEAD/backup.
  - Reconcile only against the then-current main; do not use the current snapshot if main has advanced.
  - Preserve Surface implementation and every merged main capability.
  - If conceptual/LATEST/FABIO_CONTROLLO or any global file has an ambiguous conflict: STOP and report exact file/hunk; do not guess.
  - After safe reconciliation: rerun applicable Surface TypeScript/checker/conceptual checks, align reporting, explicit new exact-SHA NEXO REVIEW handoff.

- [ ] **N2.4 — SURFACE SESSION / LIFECYCLE MODEL**
  - START CONDITION: PR #20 CLEAN + merged and freeze explicitly released.

- [ ] **N2.5 — SAFETY / INTERACTION POLICY CONTRACT**
  - START CONDITION: N2.4 completed.

- [ ] **N2.6 — SURFACE ADAPTER CONTRACT + HARDENING**
  - START CONDITION: N2.5 completed.

- [ ] **N2.7 — SURFACE FOUNDATION GAP AUDIT**
  - START CONDITION: N2.6 completed/reviewable.

## SERIAL MERGE QUEUE RULE
Do not reconcile #20 in parallel. Current queue is #24 → #18 → #19 → #20. Every preceding merge changes main and invalidates reconciliation evidence for later PRs.

## UPDATE RULE
After every task: update this file, mark `[x]` only with real evidence, write chat + GitHub report, reread immediately and obey current START CONDITION.

## LAST EVIDENCE
- Main `1d0a01c9...` after #17 merge.
- NEXO 2 is intentionally STANDBY/BLOCKED until its serial turn.
