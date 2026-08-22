# NEXO CODEX — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO CODEX
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- Current main: `1d0a01c91bb328baf141560a534f4b62fe406b01` after CLEAN PR #17 Voice merge.
- TestFlight production is manual / Coordinator-controlled.
- PR #18 Android Readiness: OPEN / DRAFT / mergeable=false, historical HEAD `1e50e747a60c9ebba0dc98fa6efb136ff456bbf1`; historical Android Readiness run `32526155508` SUCCESS only on the old SHA.
- PR #19 Navigation Domain Core: OPEN / DRAFT / mergeable=false, historical HEAD `7210baef8693f1a8e77da8750ff2e4e597534cbe`; residual P1 V28 remains.
- Consolidation freeze is STRICTLY SERIAL: do not reconcile #18 or #19 while PR #24 is the active merge-queue item.

## QUEUE — ONE TASK AT A TIME

- [ ] **NC.1A — RECONCILE PR #18 ANDROID READINESS TO CURRENT MAIN / RE-HANDOFF**
  - START CONDITION: BLOCKED until Coordinator records PR #24 CLEAN + MERGED and publishes the then-current main SHA in this file.
  - When released: reread current main first; preserve Android Readiness workflow and all merged capabilities; do not rewrite the verified slice.
  - Required: safe reconciliation only → exact-head Android Readiness rerun → reporting → explicit NEXO REVIEW handoff.
  - Definition of done: mergeable new exact SHA, no main regression, exact-head SUCCESS, DRAFT, REVIEW handoff.

- [ ] **NC.1 — PR #19 CURRENT-MAIN RECONCILIATION + V28 REVIEW CORRECTION / RE-HANDOFF**
  - START CONDITION: BLOCKED until PR #18 is CLEAN + MERGED by Coordinator and this file is retargeted to the new main.
  - Preserve Navigation Domain Core; fix only residual V28 evidence/state inconsistency; run applicable exact-head Navigation/Expo Doctor/lint/conceptual checks; reporting + REVIEW handoff.

- [ ] **NC.2 — ROUTE MODEL / PROVIDER CONTRACT HARDENING**
  - START CONDITION: PR #18 and PR #19 CLEAN and serialized/merged, and consolidation freeze explicitly released.

- [ ] **NC.3 — NAVIGATION SESSION STATE MACHINE HARDENING**
  - START CONDITION: NC.2 completed.

- [ ] **NC.4 — REROUTE POLICY CONTRACT**
  - START CONDITION: NC.3 completed.

- [ ] **NC.5 — TBT DOMAIN CONTRACT**
  - START CONDITION: NC.4 completed.

- [ ] **NC.6 — NAVIGATION FOUNDATION HARDENING / REVIEW**
  - START CONDITION: NC.5 completed.

## SERIAL MERGE QUEUE RULE
Only ONE stale PR may be reconciled toward merge at a time. Current active item is PR #24 owned by NEXO 1. Do not start #18 in parallel because the next merge would invalidate its reconciliation.

## UPDATE RULE
After every task: update this file, mark `[x]` only with real evidence, write chat + GitHub report, reread immediately, and obey current START CONDITION.

## LAST EVIDENCE
- Main `1d0a01c9...` after PR #17 CLEAN merge.
- CODEX is intentionally STANDBY/BLOCKED during PR #24 reconciliation.
- Future order: #24 merge → #18 reconcile/review/merge → #19 reconcile/review/merge.
