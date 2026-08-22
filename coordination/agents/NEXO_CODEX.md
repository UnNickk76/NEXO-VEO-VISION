# NEXO CODEX — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO CODEX
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- Current main: `b1fa88453a81b15f1dc433fa6503c81292a4a48e` after CLEAN PR #18 Android Readiness squash merge.
- TestFlight production remains manual / Coordinator-controlled.
- PR #18 Android Readiness: MERGED. Final reviewed HEAD `afd11ae91131871392261b99753d65129722f89d`; NEXO REVIEW CLEAN review `5000939193`; merge commit `b1fa88453a81b15f1dc433fa6503c81292a4a48e`.
- Technical reconciliation evidence preserved: Android Readiness run `32592321823` SUCCESS; Voice Validation `32592321853` SUCCESS; no EAS Build/APK/AAB/Play/iOS changes.
- PR #19 Navigation Domain Core is now the ONLY active CODEX consolidation item. Historical HEAD `7210baef8693f1a8e77da8750ff2e4e597534cbe` is stale/non-mergeable against current main and must be safely reconciled before review.
- PR #20 remains blocked until #19 is CLEAN + merged.

## QUEUE — ONE TASK AT A TIME

- [x] **NC.1A — FINALIZE RECONCILED PR #18 ANDROID READINESS / RE-HANDOFF**
  - COMPLETED: final report + LATEST + FABIO_CONTROLLO aligned; CLEAN review `5000939193`; Ready + squash merge completed as `b1fa88453a81b15f1dc433fa6503c81292a4a48e`.

- [ ] **NC.1 — PR #19 CURRENT-MAIN RECONCILIATION + REAL FINDING CORRECTION / RE-HANDOFF**
  - START CONDITION: SATISFIED / ACTIVE QUEUE ITEM.
  - CURRENT MAIN TO INCORPORATE: `b1fa88453a81b15f1dc433fa6503c81292a4a48e`.
  - FIRST SAFETY STEP: preserve exact historical PR #19 HEAD `7210baef8693f1a8e77da8750ff2e4e597534cbe` on a backup ref before reconciliation.
  - PRESERVE FUNCTIONAL CORE: `DestinationRef`, `LocationSample`, `RouteRequest`, `RouteCandidate`, `RecalculationRequest`, `NavigationSession`, lifecycle/state machine, provider-neutral `RoutingAdapter`, deterministic alternative selection, recalculation logic and `frontend/scripts/check-navigation-domain.mjs`.
  - PRESERVE NEW MAIN: Saved Places, Location Contract, Location Permission/Degraded State Machine, Location Quality Policy, Voice Core, Android Readiness, TestFlight manual-only policy and all canonical shared docs.
  - SHARED FILE RULE: main current content is canonical. Do not restore stale `LATEST.md`/`FABIO_CONTROLLO.md`. Reconstruct only accurate final #19 reporting after reconciliation.
  - CONCEPTUAL: inspect V06/V21/V26/V27/V28 against current main. Apply only findings still real. Historical known finding: V28 Route Explanation must not remain `parziale` unless there is an actually implemented/tested Route Explanation slice; if none exists, restore conservative `concettuale` with evidence consistent with reality.
  - VERIFY REQUIRED: Navigation Domain workflow/checker + Expo Doctor + lint + conceptual validator on reconciled exact content; record exact SHA and all individual outcomes.
  - REPORTING: new AGENTS-compliant historical report + `LATEST.md` + `FABIO_CONTROLLO.md`, then exact-SHA handoff to NEXO REVIEW.
  - STOP CONDITION: if reconciliation exposes an ambiguous shared-file conflict that cannot be resolved deterministically from current main + isolated Navigation delta, stop and report exact file/hunk; do not guess.
  - DEFINITION OF DONE: current-main-based mergeable DRAFT, preserved Navigation Core, only real finding corrections, exact-head applicable checks SUCCESS, coherent reporting, explicit REVIEW handoff.

- [ ] **NC.2 — ROUTE MODEL / PROVIDER CONTRACT HARDENING**
  - START CONDITION: blocked by consolidation freeze until #19/#20 backlog is closed.

## SERIAL MERGE QUEUE RULE
Strict order is now #19 → #20. Never reconcile #20 before #19 is CLEAN and merged.

## UPDATE RULE
After every task: update this file, mark `[x]` only with real evidence, write GitHub report/handoff, reread current main and obey the active START CONDITION.

## LAST EVIDENCE
- #18 merged CLEAN as main `b1fa88453a81b15f1dc433fa6503c81292a4a48e`.
- #19 is now the sole active reconciliation target; historical work must be preserved, not rewritten.
- #20 remains frozen until #19 serialization completes.
