# NEXO 2 — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO 2
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- PR #20 `feat(surface): add provider-neutral surface capabilities`: OPEN / DRAFT / mergeable al handoff N2.1.
- Exact HEAD consegnato da N2.1: `6e13d42379a5cff26cb37a67944f89302b925ac4`.
- Functional policy/availability fix, checker ortogonale e conceptual evidence sono presenti.
- P1 reporting della review su `dbb78f17...` corretto con rapporto storico completo e `LATEST.md` copia integrale.
- Do not touch location/voice/navigation/automotive native/EAS/TestFlight areas owned elsewhere.

## QUEUE — ONE TASK AT A TIME

- [x] **N2.1 — CLOSE PR #20 REPORTING / VERIFY P1**
  - START CONDITION: immediate.
  - Goal: make report historical, LATEST and FABIO_CONTROLLO fully consistent with exact final SHA and final checks; preserve functional fix; produce new SHA and handoff to NEXO REVIEW.
  - EVIDENCE: PR #20 exact SHA `6e13d42379a5cff26cb37a67944f89302b925ac4`; historical report complete; `LATEST.md` full mirror; `FABIO_CONTROLLO.md` aligned; personal report entry commit `0e1df74d0cde1bb4d0276682c667b1e405dd8da7`; PR OPEN/DRAFT/mergeable at final handoff.

- [ ] **N2.2 — PR #20 REVIEW REWORK / CLEAN HANDOFF**
  - START CONDITION: N2.1 submitted and NEXO REVIEW has reviewed the new SHA.
  - Goal: resolve only any remaining findings, rerun affected checks, reconsegnare exact SHA until CLEAN. No autonomous merge.
  - STATUS: WAITING — NEXO REVIEW has not yet reviewed SHA `6e13d42379a5cff26cb37a67944f89302b925ac4`.

- [ ] **N2.3 — SURFACE CAPABILITY MATRIX HARDENING**
  - START CONDITION: PR #20 CLEAN and merged/closed or Coordinator confirms safe continuation.
  - Goal: canonical matrix for iOS phone, Android phone, CarPlay, Android Auto; fail-closed defaults; deterministic tests.

- [ ] **N2.4 — SURFACE SESSION / LIFECYCLE MODEL**
  - START CONDITION: N2.3 completed.
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
- N2.1 handoff: PR #20 HEAD `6e13d42379a5cff26cb37a67944f89302b925ac4`, OPEN/DRAFT/mergeable at handoff; 18 commits, 9 files; no autonomous merge.
- N2.2 blocked by its explicit START CONDITION pending NEXO REVIEW of that SHA.
