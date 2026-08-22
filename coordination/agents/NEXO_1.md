# NEXO 1 — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO 1
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- Current main: `b011808ec1a46827d27ccb258ef68ea01dee8b41` (PR #23 merged CLEAN).
- PR #12 Saved Places: MERGED as `47b9d0a5c20490f0b73e95e52fadca151e89e136`.
- PR #22 Location Contract: MERGED as `8d8dee4a31416acb38c2e654082ca15efafd6fec`.
- PR #23 Location Permission/Degraded State Machine: MERGED as current main `b011808ec1a46827d27ccb258ef68ea01dee8b41` after CLEAN exact SHA `73a01727345e0c8b5d7937c654b5eef76ee0b520`, review `4999414769`.
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

- [ ] **N1.5 — LOCATION FRESHNESS / QUALITY POLICY**
  - START CONDITION: SATISFIED — work is active from current main `b011808ec1a46827d27ccb258ef68ea01dee8b41`.
  - Goal: stale fix, invalid coordinates, accuracy/freshness thresholds and conservative fallback; deterministic checker required.
  - Preserve current C007 state and do not claim OS/GPS runtime.
  - FUNCTIONAL EVIDENCE: PR #24 branch `nexo1/f1-location-quality-policy`; pre-reporting SHA `f89de36ae055de60ae0079b426d2496736dd1e6e`; Location Quality Policy `32559482473` SUCCESS; Location Contract `32559482539` SUCCESS; Location State Machine `32559482424` SUCCESS.
  - REPORTING PROGRESS 08:16 UTC: historical report commit `091399b2...`; LATEST `f86f208c...`; Fabio control `8abc5d2d...` added to PR #24.
  - REMAINING GATE / BLOCKER: C007 still needs conservative PR #24 quality-policy evidence while remaining `[ ] / parziale`; then rerun affected VERIFY, fresh exact SHA/mergeability and handoff to NEXO REVIEW. No final PASS is inferred from pre-reporting runs. Keep `[ ]`.

- [ ] **N1.6 — LOCATION ADAPTER CONTRACT + HARDENING**
  - START CONDITION: N1.5 completed/reviewable.
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
- 2026-08-22 08:16 UTC: N1.5 reporting progressed in PR #24; commits `091399b2...`, `f86f208c...`, `8abc5d2d...`.
- Functional pre-reporting workflows remain: Quality Policy `32559482473` SUCCESS; Contract `32559482539` SUCCESS; State Machine `32559482424` SUCCESS.
- N1.5 remains `[ ]` because C007 + post-edit final VERIFY/exact-SHA/handoff are missing. N1.6 is not eligible.
