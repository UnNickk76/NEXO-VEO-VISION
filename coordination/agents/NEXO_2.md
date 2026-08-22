# NEXO 2 — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO 2
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- PR #20 `feat(surface): add provider-neutral surface capabilities`: OPEN / DRAFT.
- Exact SHA independently reviewed CLEAN: `6e13d42379a5cff26cb37a67944f89302b925ac4`; review ID `4998458851`, P0/P1/P2=0/0/0.
- PR #12 was subsequently merged to main as `47b9d0a5c20490f0b73e95e52fadca151e89e136`.
- Fresh GitHub metadata now reports PR #20 `mergeable=false` against updated main, so the prior CLEAN remains evidence for the old exact SHA but does not authorize merge without reconciliation and a new exact-SHA review.
- Do not touch location/voice/navigation/automotive native/EAS/TestFlight areas owned elsewhere.

## QUEUE — ONE TASK AT A TIME

- [x] **N2.1 — CLOSE PR #20 REPORTING / VERIFY P1**
  - COMPLETED EVIDENCE: exact SHA `6e13d42379a5cff26cb37a67944f89302b925ac4`; reporting corrected; independent CLEAN review ID `4998458851` subsequently received.

- [x] **N2.2 — PR #20 REVIEW REWORK / CLEAN HANDOFF**
  - START CONDITION: N2.1 submitted and NEXO REVIEW reviewed the new SHA.
  - COMPLETED EVIDENCE: NEXO REVIEW CLEAN on exact SHA `6e13d42379a5cff26cb37a67944f89302b925ac4`, P0/P1/P2=0/0/0, review ID `4998458851`; no review correction required on that SHA.

- [ ] **N2.3 — POST-PR12 RECONCILIATION + SURFACE CAPABILITY MATRIX HARDENING**
  - START CONDITION: SATISFIED — PR #20 was CLEAN, but current main advanced via PR #12 and PR #20 is now `mergeable=false`.
  - FIRST REQUIRED ACTION: reconcile/rebase PR #20 against current main `47b9d0a5c20490f0b73e95e52fadca151e89e136`, preserving merged Saved Places conceptual/reporting state and Surface ownership; do not overwrite other agents' work.
  - Goal after safe reconciliation: canonical matrix for iOS phone, Android phone, CarPlay, Android Auto; fail-closed defaults; deterministic tests.
  - PROOF REQUIRED: new exact SHA, mergeable PR, diff/conflict resolution audited, applicable tests/checks rerun, reporting/conceptual aligned, new handoff to NEXO REVIEW before merge.

- [ ] **N2.4 — SURFACE SESSION / LIFECYCLE MODEL**
  - START CONDITION: N2.3 completed/reviewable and no conflict.
  - Goal: attach/detach/foreground/background/disconnected state model provider-neutral; no native automotive framework.

- [ ] **N2.5 — SAFETY / INTERACTION POLICY CONTRACT**
  - START CONDITION: N2.4 completed.
  - Goal: capability/state-based allowed/prohibited operations with conservative behavior; no invented legal claims.

- [ ] **N2.6 — SURFACE ADAPTER CONTRACT + HARDENING**
  - START CONDITION: N2.5 completed.
  - Goal: phone/car surface adapter interface + fake adapters, provider-neutral test matrix, conceptual/reporting reconciliation and NEXO REVIEW handoff.

## UPDATE RULE
After every task: update this file on `coordination/agent-control`, mark `[x]` only when truly completed, append exact PR/SHA/check evidence, then immediately reread and start the next eligible task.

## LAST EVIDENCE
- PR #20 exact SHA `6e13d423...` received CLEAN review ID `4998458851`.
- 2026-08-22 02:05 UTC — PR #12 merged; current main advanced to `47b9d0a5...`.
- Fresh PR #20 state after that merge: OPEN/DRAFT, `mergeable=false`.
- N2.3 is ACTIONABLE NOW as reconciliation + next Surface slice; a new exact-SHA review is mandatory before any merge.
