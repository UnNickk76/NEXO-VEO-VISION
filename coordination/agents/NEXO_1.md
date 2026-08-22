# NEXO 1 — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO 1
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- Current main: `ba39d977072231d69ef848b1cc9ae2637b556c72`.
- The only new main delta after PR #23 is the Coordinator commit that disables automatic TestFlight-on-push; TestFlight production is manual / Coordinator-controlled.
- PR #12 Saved Places: MERGED as `47b9d0a5c20490f0b73e95e52fadca151e89e136`.
- PR #22 Location Contract: MERGED as `8d8dee4a31416acb38c2e654082ca15efafd6fec`.
- PR #23 Location Permission/Degraded State Machine: MERGED as `b011808ec1a46827d27ccb258ef68ea01dee8b41` after CLEAN exact SHA `73a01727345e0c8b5d7937c654b5eef76ee0b520`, review `4999414769`.
- PR #24 Location Freshness / Quality Policy: OPEN / DRAFT. Existing functional work must be preserved; do not redo it.
- C007 remains `[ ] / parziale`; no OS/GPS provider runtime exists yet.
- Do not touch voice/surface/navigation/automotive/EAS/TestFlight areas owned elsewhere.

## QUEUE — ONE TASK AT A TIME

- [x] **N1.1 — CLOSE PR #12 VALIDATION GATE**
  - COMPLETED EVIDENCE: validator exact SHA `155ba7e8005d6848a506478d7f3139b3b69776d8`, exit 0; PR #12 final reviewed SHA `75b661afffc45887cad1e64c7845d56b6c658288`.

- [x] **N1.2 — PR #12 REVIEW REWORK / CLEAN HANDOFF**
  - COMPLETED EVIDENCE: CLEAN review ID `4998454274`; merged as main `47b9d0a5c20490f0b73e95e52fadca151e89e136`.

- [x] **N1.3 — F1 LOCATION CONTRACT**
  - COMPLETED EVIDENCE: PR #22 exact SHA `475c39539809361e7ede47f381e07f3be70454e3`; CLEAN review ID `4998866766`; run `32546418961` SUCCESS; merged as `8d8dee4a31416acb38c2e654082ca15efafd6fec`.

- [x] **N1.4 — LOCATION PERMISSION / DEGRADED STATE MACHINE IMPLEMENTATION/HANDOFF**
  - COMPLETED EVIDENCE: functional slice accepted by REVIEW; reporting correction isolated as N1.4R.

- [x] **N1.4R — PR #23 REPORTING RECTIFICATION / CLEAN RE-REVIEW GATE**
  - COMPLETED EVIDENCE: CLEAN exact SHA `73a01727345e0c8b5d7937c654b5eef76ee0b520`, review `4999414769`, P0/P1/P2=0/0/0; Location State Machine run `32554330952` SUCCESS; Location Contract run `32554330936` SUCCESS; squash-merged as `b011808ec1a46827d27ccb258ef68ea01dee8b41`.

- [ ] **N1.5R — PR #24 MINIMAL RECONCILIATION TO CURRENT MAIN + FINAL N1.5 HANDOFF**
  - START CONDITION: SATISFIED / PRIORITY 1.
  - CURRENT MAIN TO INCORPORATE: `ba39d977072231d69ef848b1cc9ae2637b556c72`.
  - PRESERVE: all existing N1.5 functional work, workflow/checker, quality/freshness semantics and prior successful evidence. Do NOT rewrite/recreate the functional slice.
  - RECONCILIATION SCOPE: incorporate current main safely, including the manual-only TestFlight workflow state; no unrelated functional change.
  - THEN COMPLETE ORIGINAL N1.5 GATES: add conservative PR #24 quality-policy evidence to C007 while keeping `[ ] / parziale`; align historical report/LATEST/FABIO_CONTROLLO to the reconciled exact HEAD; rerun every check invalidated by reconciliation/conceptual/reporting changes, including conceptual validator when applicable; record exact final SHA and explicit NEXO REVIEW handoff.
  - DEFINITION OF DONE: PR #24 based on current main, no regression to merged Location state, exact-head applicable checks recorded, C007 conservative evidence complete, PR DRAFT, explicit review handoff. Only then may N1.5 be considered completed.
  - FREEZE RULE: do not start N1.6 before Coordinator merges/closes PR #24 after CLEAN.

- [ ] **N1.6 — LOCATION ADAPTER CONTRACT + HARDENING**
  - START CONDITION: PR #24 CLEAN and serialized/merged by Coordinator.
  - Goal: future iOS/Android source adapter interface + fake adapter tests; conceptual/reporting reconciliation; handoff to NEXO REVIEW.

- [ ] **N1.7 — LOCATION FOUNDATION INTEGRATION GAP AUDIT**
  - START CONDITION: N1.6 completed/reviewable.
  - Goal: audit remaining gaps toward real OS location integration without adding provider/runtime credentials; concrete next-slice recommendations only where safely owned.

- [ ] **N1.8 — LOCATION FOUNDATION REVIEW CLOSURE**
  - START CONDITION: N1.7 completed and prior slices CLEAN/serialized as required.
  - Goal: consolidate evidence/invariants, remove stale reporting assumptions, final NEXO REVIEW handoff; no provider invention.

- [ ] **N1.9 — NEXT LOCATION RUNTIME SLICE PREPARATION**
  - START CONDITION: N1.8 CLEAN/reviewable and Coordinator confirms no ownership conflict.
  - Goal: define the smallest provider-neutral bridge toward real foreground OS location runtime, with explicit device/provider gaps and no credentials.

## UPDATE RULE
After every task: update this file on `coordination/agent-control`, mark `[x]` only if truly completed, append exact PR/SHA/check evidence, then immediately reread and start the next eligible task.

## LAST EVIDENCE
- 2026-08-22 coordinator consolidation refresh: main advanced to `ba39d977...` solely for manual-only TestFlight trigger policy after PR #23.
- PR #24 functional work is to be preserved; N1.5R is the only actionable NEXO 1 task.
- Main is under consolidation freeze: no new functional slice before PR #24 CLEAN + Coordinator serialization.
