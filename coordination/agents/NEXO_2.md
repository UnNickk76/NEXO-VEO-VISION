# NEXO 2 — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO 2
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- Current main: `ba39d977072231d69ef848b1cc9ae2637b556c72`.
- Latest main delta disables automatic TestFlight-on-push; production TestFlight is manual/Coordinator-controlled.
- PR #20 `feat(surface): add provider-neutral surface capabilities`: OPEN / DRAFT, historical exact HEAD `6e13d42379a5cff26cb37a67944f89302b925ac4`, `mergeable=false` against newer main.
- That historical SHA was CLEAN (review `4998458851`, P0/P1/P2=0/0/0), but historical CLEAN cannot authorize merge after divergence.
- Existing Surface implementation must be preserved: capability model, availability/policy orthogonality, deterministic checker, V05/V44/V45/V46 conservative conceptual evidence.
- Backup CLEAN: `backup/nexo2-pr20-clean-6e13d423` → `6e13d42379a5cff26cb37a67944f89302b925ac4`.
- Do not touch location/voice/navigation/automotive native/EAS/TestFlight areas owned elsewhere.

## QUEUE — ONE TASK AT A TIME

- [x] **N2.1 — CLOSE PR #20 REPORTING / VERIFY P1**
  - COMPLETED EVIDENCE: exact SHA `6e13d42379a5cff26cb37a67944f89302b925ac4`; independent CLEAN review ID `4998458851`.

- [x] **N2.2 — PR #20 REVIEW REWORK / CLEAN HANDOFF**
  - COMPLETED EVIDENCE: CLEAN on historical exact SHA `6e13d42379a5cff26cb37a67944f89302b925ac4`.

- [ ] **N2.3R — SAFE RECONCILIATION PR #20 TO CURRENT MAIN + RE-HANDOFF**
  - START CONDITION: SATISFIED IN PRINCIPLE / PRIORITY 5, after #24/#17/#18/#19 serialization advances. Do not start a new functional Surface slice.
  - CURRENT MAIN: use the latest Coordinator-confirmed main at execution time; snapshot now `ba39d977072231d69ef848b1cc9ae2637b556c72`.
  - FIRST SAFETY STEP: preserve exact current PR #20 HEAD and backup reference before any reconciliation attempt.
  - PRESERVE: all Surface Capabilities work, availability/policy distinction, checker, V05/V44/V45/V46 evidence, plus every newer main change (Saved Places, Location slices, TestFlight manual-only policy, and subsequently merged backlog PRs).
  - RECONCILIATION RULE: use safe git merge/rebase/connector capability only. If shared files produce a conflict that cannot be resolved unambiguously, STOP and report exact file/path/hunk to Coordinator; do not manually reconstruct or overwrite global documents speculatively.
  - AFTER RECONCILIATION: rerun applicable Surface TypeScript/checker/conceptual checks on the exact reconciled content; align reporting to current main; explicit new exact-SHA NEXO REVIEW handoff.
  - DEFINITION OF DONE: new mergeable exact SHA, no regression/overwrite of current main, exact-head Surface checks recorded, DRAFT, explicit review handoff.
  - FREEZE RULE: N2.4+ are not eligible until PR #20 is CLEAN and serialized/merged by Coordinator.

- [ ] **N2.4 — SURFACE SESSION / LIFECYCLE MODEL**
  - START CONDITION: PR #20 CLEAN and serialized/merged by Coordinator.
  - Goal: attach/detach/foreground/background/disconnected state model provider-neutral; no native automotive framework.

- [ ] **N2.5 — SAFETY / INTERACTION POLICY CONTRACT**
  - START CONDITION: N2.4 completed.
  - Goal: capability/state-based allowed/prohibited operations with conservative behavior; no invented legal claims.

- [ ] **N2.6 — SURFACE ADAPTER CONTRACT + HARDENING**
  - START CONDITION: N2.5 completed.
  - Goal: phone/car surface adapter interface + fake adapters, provider-neutral test matrix, conceptual/reporting reconciliation and NEXO REVIEW handoff.

- [ ] **N2.7 — SURFACE FOUNDATION GAP AUDIT**
  - START CONDITION: N2.6 completed/reviewable.
  - Goal: identify remaining gaps toward real CarPlay/Android Auto integration without touching entitlements/credentials/native implementation unless separately authorized.

## UPDATE RULE
After every task: update this file on `coordination/agent-control`, mark `[x]` only when truly completed, append exact PR/SHA/check evidence, then immediately reread and start the next eligible task.

## LAST EVIDENCE
- Main snapshot for current consolidation: `ba39d977...`.
- PR #20 remains the deepest-diverged backlog item and must not be rewritten from scratch.
- N2.3R is reconciliation-only; all new Surface work is frozen until Coordinator serialization.
