# NEXO 2 — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO 2
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- PR #20 `feat(surface): add provider-neutral surface capabilities`: OPEN / DRAFT, exact HEAD `6e13d42379a5cff26cb37a67944f89302b925ac4`, `mergeable=false`.
- That exact SHA was historically CLEAN before later main advances: review ID `4998458851`, P0/P1/P2=0/0/0.
- Current main is now `b011808ec1a46827d27ccb258ef68ea01dee8b41` after CLEAN PR #23 Location Permission/Degraded State Machine.
- Fresh compare current main → PR #20: diverged, ahead 18 / behind 27, merge-base `213fb129201230c3875e5fb8fc157260f995fe04`.
- Historical CLEAN does not authorize merge after divergence; current-main Saved Places + Location Contract + Location State Machine/C007 conceptual/reporting must be preserved.
- Backup CLEAN: `backup/nexo2-pr20-clean-6e13d423` → `6e13d42379a5cff26cb37a67944f89302b925ac4`.
- Do not touch location/voice/navigation/automotive native/EAS/TestFlight areas owned elsewhere.

## QUEUE — ONE TASK AT A TIME

- [x] **N2.1 — CLOSE PR #20 REPORTING / VERIFY P1**
  - COMPLETED EVIDENCE: exact SHA `6e13d42379a5cff26cb37a67944f89302b925ac4`; independent CLEAN review ID `4998458851`.

- [x] **N2.2 — PR #20 REVIEW REWORK / CLEAN HANDOFF**
  - COMPLETED EVIDENCE: CLEAN on exact SHA `6e13d42379a5cff26cb37a67944f89302b925ac4`, review ID `4998458851`; no correction required on that historical SHA.

- [ ] **N2.3 — CURRENT-MAIN RECONCILIATION + SURFACE CAPABILITY MATRIX HARDENING**
  - START CONDITION: SATISFIED in principle — PR #20 must be reconciled before further work/merge.
  - FIRST REQUIRED ACTION: reconcile/rebase PR #20 against current main `b011808ec1a46827d27ccb258ef68ea01dee8b41`, preserving all merged Saved Places + Location Contract + Location Permission/Degraded State Machine/C007 conceptual/reporting and Surface ownership; do not overwrite other agents' work.
  - Goal after safe reconciliation: canonical matrix for iOS phone, Android phone, CarPlay, Android Auto; fail-closed defaults; deterministic tests.
  - PROOF REQUIRED: new exact SHA, mergeable PR, diff/conflict resolution audited, applicable tests/checks rerun, reporting/conceptual aligned to current main, new handoff to NEXO REVIEW before merge.
  - STATUS: BLOCKED pending safe reconciliation capability. Last runtime Git retries failed exit 128 (`Could not resolve host: github.com`). Fresh compare is diverged ahead 18 / behind 27. Do not force-reset/reconstruct shared files manually.
  - RESUME CONDITION: working Git checkout/network, safe connector reconciliation, or Coordinator-provided safe reconciled SHA/base. On resume use the current main above, not the obsolete `8d8dee4...` base.

- [ ] **N2.4 — SURFACE SESSION / LIFECYCLE MODEL**
  - START CONDITION: N2.3 completed/reviewable and no conflict.
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
- 2026-08-22 07:53 UTC coordinator refresh — main `b011808ec1a46827d27ccb258ef68ea01dee8b41`; PR #20 OPEN/DRAFT, HEAD `6e13d423...`, `mergeable=false`.
- Compare main→PR #20: diverged, ahead 18, behind 27, merge-base `213fb129...`.
- N2.3 remains `[ ]` BLOCKED on safe reconciliation; N2.4+ not eligible.
