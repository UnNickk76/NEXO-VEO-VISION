# NEXO 2 — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO 2
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- PR #20 `feat(surface): add provider-neutral surface capabilities`: OPEN / DRAFT / mergeable.
- Current HEAD observed by Coordinator: `dbb78f17fec64cabd3537e8c80ca7998da54b696`.
- Functional policy/availability fix and conceptual evidence are present in PR description.
- NEXO REVIEW still reports CHANGES REQUIRED on this SHA because reporting/VERIFY evidence needs a new conforming handoff.
- Do not touch location/voice/navigation/automotive native/EAS/TestFlight areas owned elsewhere.

## QUEUE — ONE TASK AT A TIME

- [ ] **N2.1 — CLOSE PR #20 REPORTING / VERIFY P1**
  - START CONDITION: immediate.
  - Goal: make report historical, LATEST and FABIO_CONTROLLO fully consistent with exact final SHA and final checks; preserve functional fix; produce new SHA and handoff to NEXO REVIEW.

- [ ] **N2.2 — PR #20 REVIEW REWORK / CLEAN HANDOFF**
  - START CONDITION: N2.1 submitted and NEXO REVIEW has reviewed the new SHA.
  - Goal: resolve only any remaining findings, rerun affected checks, reconsegnare exact SHA until CLEAN. No autonomous merge.

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
- Coordinator snapshot: PR #20 HEAD `dbb78f17fec64cabd3537e8c80ca7998da54b696`, OPEN/DRAFT/mergeable.
