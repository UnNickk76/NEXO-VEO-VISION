# NEXO CODEX — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO CODEX
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- Current main: `1d0a01c91bb328baf141560a534f4b62fe406b01` after CLEAN PR #17 Voice merge.
- TestFlight production is manual / Coordinator-controlled.
- PR #18 Android Readiness: OPEN / DRAFT / mergeable=false, historical HEAD `1e50e747a60c9ebba0dc98fa6efb136ff456bbf1`; old exact-head Android Readiness run `32526155508` SUCCESS, but old CLEAN/evidence cannot authorize merge after current-main divergence.
- PR #19 Navigation Domain Core: OPEN / DRAFT / mergeable=false, historical HEAD `7210baef8693f1a8e77da8750ff2e4e597534cbe`; CHANGES REQUIRED with residual P1 V28; functional core must be preserved.
- No new functional navigation/Android slice is authorized during consolidation freeze.

## QUEUE — ONE TASK AT A TIME

- [ ] **NC.1A — RECONCILE PR #18 ANDROID READINESS TO CURRENT MAIN / RE-HANDOFF**
  - START CONDITION: SATISFIED once safe reconciliation capability is available; PR #24 remains higher global priority but does not require CODEX to invent work.
  - CURRENT MAIN TO INCORPORATE: `1d0a01c91bb328baf141560a534f4b62fe406b01`.
  - PRESERVE: Android Readiness workflow and all newer main state including Saved Places, Location foundation, manual-only TestFlight policy and merged Voice Core. Do NOT rewrite the already verified Android readiness slice.
  - REQUIRED ACTION: safe reconciliation only. Shared reporting must preserve current main plus this PR's accurate report delta.
  - REQUIRED VERIFY: rerun Android Readiness on new exact HEAD; record Expo Doctor, lint, Android config/package, SDK assertion and Android prebuild; align reporting; explicit exact-SHA handoff to NEXO REVIEW.
  - DEFINITION OF DONE: new mergeable exact SHA, no current-main regression, Android Readiness exact-head SUCCESS, coherent reporting, DRAFT, explicit REVIEW handoff.

- [ ] **NC.1 — PR #19 CURRENT-MAIN RECONCILIATION + V28 REVIEW CORRECTION / RE-HANDOFF**
  - START CONDITION: NC.1A CLEAN/serialized, or Coordinator explicitly changes order after fresh conflict analysis.
  - HISTORICAL REVIEW: `7210baef...`, review `4998361255`, P0=0/P1=1/P2=0.
  - CURRENT MAIN: use then-current main, never historical base.
  - PRESERVE Navigation Domain Core and all merged main capabilities.
  - REQUIRED MINIMAL FIX: V28 Route Explanation back to `concettuale` with evidence consistent with no implemented/tested Route Explanation slice.
  - REQUIRED VERIFY: Navigation checker + applicable Expo Doctor/lint/conceptual validator on reconciled exact content; reporting exact-SHA aligned; NEXO REVIEW handoff.

- [ ] **NC.2 — ROUTE MODEL / PROVIDER CONTRACT HARDENING**
  - START CONDITION: PR #18 and PR #19 CLEAN and serialized/merged by Coordinator.

- [ ] **NC.3 — NAVIGATION SESSION STATE MACHINE HARDENING**
  - START CONDITION: NC.2 completed.

- [ ] **NC.4 — REROUTE POLICY CONTRACT**
  - START CONDITION: NC.3 completed.

- [ ] **NC.5 — TBT DOMAIN CONTRACT**
  - START CONDITION: NC.4 completed.

- [ ] **NC.6 — NAVIGATION FOUNDATION HARDENING / REVIEW**
  - START CONDITION: NC.5 completed.

## UPDATE RULE
After every task: update this file on `coordination/agent-control`, mark `[x]` only when truly completed, append exact PR/SHA/check evidence, write chat + GitHub report, then immediately reread and start the next eligible task.

## LAST EVIDENCE
- Current main advanced to `1d0a01c91bb328baf141560a534f4b62fe406b01` after PR #17 CLEAN merge.
- #18 remains first CODEX consolidation target; #19 follows unless Coordinator changes order.
- Historical implementations must be preserved; reconciliation + exact-head VERIFY + reporting + review only.
