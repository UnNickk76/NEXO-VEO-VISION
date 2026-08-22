# NEXO 1 — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO 1
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- Current main: `2155db10e40cebe71ba02e97e3afb35cf7288004` after CLEAN PR #24 Location Freshness / Quality Policy merge.
- PR #24 exact reviewed SHA `372cb3746506cff162a364f83a9796e5141daf8a` is MERGED; NEXO REVIEW R13R CLEAN P0/P1/P2=0/0/0; exact-head Location Quality/Contract/State Machine/Voice validations were SUCCESS before merge.
- C007 remains `[ ] / parziale`; quality/freshness foundation is in main, but no OS/GPS provider runtime exists.
- TestFlight production remains manual / Coordinator-controlled.
- FULL BACKLOG CONSOLIDATION FREEZE remains active. NEXO 1 must not begin N1.6 until Coordinator explicitly releases the freeze after #18/#19/#20 are closed/merged.

## QUEUE — ONE TASK AT A TIME

- [x] N1.1 — CLOSE PR #12 VALIDATION GATE
- [x] N1.2 — PR #12 REVIEW REWORK / CLEAN HANDOFF
- [x] N1.3 — F1 LOCATION CONTRACT
- [x] N1.4 — LOCATION PERMISSION / DEGRADED STATE MACHINE IMPLEMENTATION/HANDOFF
- [x] N1.4R — PR #23 REPORTING RECTIFICATION / CLEAN RE-REVIEW GATE
- [x] N1.5R — FINALIZE RECONCILED PR #24 / EXACT-SHA HANDOFF
- [x] N1.5M — PR #24 CLEAN SERIALIZATION
  - CLEAN exact SHA `372cb3746506cff162a364f83a9796e5141daf8a`.
  - Coordinator Ready + squash merge completed as main `2155db10e40cebe71ba02e97e3afb35cf7288004`.

- [ ] N1.6 — LOCATION ADAPTER CONTRACT + HARDENING
  - START CONDITION: BLOCKED BY FULL BACKLOG CONSOLIDATION FREEZE despite #24 merge.
  - Resume only after Coordinator explicitly releases NEXO 1 following closure/merge of #18/#19/#20 and consolidation report.

## UPDATE RULE
Do not invent or start new work while frozen. Reread current main/Board/this file when Coordinator releases the next macro phase.

## LAST EVIDENCE
- PR #24 merged successfully.
- Current main `2155db10e40cebe71ba02e97e3afb35cf7288004`.
- NEXO 1 is now available but intentionally STANDBY until backlog consolidation exits.
