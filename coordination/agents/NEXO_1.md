# NEXO 1 — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO 1
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- PR #12 Saved Places: MERGED after CLEAN; merge commit `47b9d0a5c20490f0b73e95e52fadca151e89e136`.
- PR #22 Location Contract: CLEAN and MERGED; current main `8d8dee4a31416acb38c2e654082ca15efafd6fec`.
- PR #23 `feat(location): add permission degraded state machine`: OPEN / DRAFT / mergeable=true, exact HEAD `dfeefff17f03d7fcbd3b171a5e82dcd359f12d09`.
- NEXO REVIEW R10 on that exact SHA: CHANGES REQUIRED, review ID `4999049657`, P0/P1/P2=0/1/0. Functional core/checker accepted; P1 is reporting-only: `LATEST.md` is not a verbatim integral copy of historical report `docs/codex-reports/2026-08-22_042800_f1-location-permission-state-machine.md`.
- Exact-head CI already observed SUCCESS on reviewed SHA: Location State Machine run #5 `32551852759` / job `96979790732`; Location Contract run #11 `32551852738`.
- C007 remains `[ ] / parziale`; no OS/GPS provider runtime exists yet.
- Do not touch voice/surface/navigation/automotive/EAS/TestFlight areas owned elsewhere.

## QUEUE — ONE TASK AT A TIME

- [x] **N1.1 — CLOSE PR #12 VALIDATION GATE**
  - COMPLETED EVIDENCE: validator exact SHA `155ba7e8005d6848a506478d7f3139b3b69776d8`, exit 0; PR #12 final reviewed SHA `75b661afffc45887cad1e64c7845d56b6c658288`.

- [x] **N1.2 — PR #12 REVIEW REWORK / CLEAN HANDOFF**
  - COMPLETED EVIDENCE: CLEAN review ID `4998454274`; merged as main `47b9d0a5c20490f0b73e95e52fadca151e89e136`.

- [x] **N1.3 — F1 LOCATION CONTRACT**
  - COMPLETED EVIDENCE: PR #22 exact SHA `475c39539809361e7ede47f381e07f3be70454e3`; CLEAN review ID `4998866766`; exact-head run #6 `32546418961` SUCCESS; merged as main `8d8dee4a31416acb38c2e654082ca15efafd6fec`.

- [x] **N1.4 — LOCATION PERMISSION / DEGRADED STATE MACHINE IMPLEMENTATION/HANDOFF**
  - COMPLETED EVIDENCE: PR #23 exact reviewed SHA `dfeefff17f03d7fcbd3b171a5e82dcd359f12d09`; functional state machine/checker accepted by REVIEW; exact-head Location State Machine run #5 `32551852759` SUCCESS and Location Contract run #11 `32551852738` SUCCESS.
  - NOTE: implementation slice is complete, but PR is not CLEAN due to reporting-only P1; correction is isolated as N1.4R below.

- [ ] **N1.4R — PRIORITY: PR #23 REPORTING RECTIFICATION / RE-HANDOFF**
  - START CONDITION: SATISFIED NOW — REVIEW NOTE / GitHub review `4999049657` is CHANGES REQUIRED on exact SHA `dfeefff17f03d7fcbd3b171a5e82dcd359f12d09`.
  - PROBLEM: historical report and `docs/codex-reports/LATEST.md` are not verbatim identical after the required leading report-path line; historical report still says `LATEST.md` / `Fabio/FABIO_CONTROLLO.md` `da aggiornare`, while the copied body in LATEST says `aggiornato`.
  - REQUIRED FIX: choose/finalize the historical report so it truthfully reflects the reached state, then make `LATEST.md` = report path + exact integral verbatim copy of that historical report. Align only true final references; do not change functional/conceptual code.
  - PROOF REQUIRED: NEW exact PR #23 SHA; direct historical-vs-LATEST-body identity proof; PR remains DRAFT and mergeable; compare proves no functional/conceptual regression; record any final workflow/check actually associated with new SHA without inventing results; append personal report and explicit NEXO REVIEW handoff.
  - DEFINITION OF DONE: new exact SHA handed to R11; task stays `[ ]` until correction + proof + handoff are real. Do not merge autonomously.

- [ ] **N1.5 — LOCATION FRESHNESS / QUALITY POLICY**
  - START CONDITION: N1.4R receives CLEAN and PR #23 is merged/closed, or Coordinator explicitly authorizes a separate safe slice after CLEAN.
  - Goal: stale fix, invalid coordinates, accuracy/freshness thresholds and conservative fallback; checker required.

- [ ] **N1.6 — LOCATION ADAPTER CONTRACT + HARDENING**
  - START CONDITION: N1.5 completed.
  - Goal: future iOS/Android source adapter interface + fake adapter tests; conceptual/reporting reconciliation; handoff to NEXO REVIEW.

- [ ] **N1.7 — LOCATION FOUNDATION INTEGRATION GAP AUDIT**
  - START CONDITION: N1.6 completed/reviewable.
  - Goal: audit remaining gaps toward real OS location integration without adding provider/runtime credentials; produce concrete next-slice recommendations and only implement if safely owned.

- [ ] **N1.8 — LOCATION FOUNDATION REVIEW CLOSURE**
  - START CONDITION: N1.7 completed and prior slices CLEAN/serialized as required.
  - Goal: consolidate evidence/invariants, remove stale reporting assumptions, final NEXO REVIEW handoff for the location foundation; no provider invention.

## UPDATE RULE
After every task: update this file on `coordination/agent-control`, mark `[x]` only when truly completed, append exact PR/SHA/check evidence, then immediately reread and start the next eligible task.

## LAST EVIDENCE
- 2026-08-22 04:55 UTC — REVIEW R10 on PR #23 SHA `dfeefff17f03d7fcbd3b171a5e82dcd359f12d09`: CHANGES REQUIRED, P1 reporting-only, review `4999049657`.
- PR #23 metadata freshly verified: OPEN / DRAFT / mergeable=true against main `8d8dee4a...`.
- N1.4R is ACTIONABLE NOW and takes priority over N1.5. N1.5 remains gated until CLEAN/serialization strategy.
