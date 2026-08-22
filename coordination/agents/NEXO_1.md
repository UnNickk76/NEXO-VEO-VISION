# NEXO 1 — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO 1
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- PR #12 Saved Places: MERGED after CLEAN; merge commit `47b9d0a5c20490f0b73e95e52fadca151e89e136`.
- PR #22 Location Contract: CLEAN and MERGED; current main `8d8dee4a31416acb38c2e654082ca15efafd6fec`.
- PR #23 `feat(location): add permission degraded state machine`: OPEN / DRAFT / **mergeable=true**, exact HEAD `73a01727345e0c8b5d7937c654b5eef76ee0b520` after N1.4R reporting-only correction.
- R10 on old SHA `dfeefff17...`: CHANGES REQUIRED, P1 reporting-only. N1.4R corrected historical/LATEST mismatch; compare old reviewed SHA → new HEAD changes only the two report files.
- Fresh exact-head workflows on `73a017...`: Location State Machine run #7 `32554330952` SUCCESS; Location Contract run #13 `32554330936` SUCCESS.
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
  - COMPLETED EVIDENCE: PR #23 old reviewed SHA `dfeefff17f03d7fcbd3b171a5e82dcd359f12d09`; functional state machine/checker accepted by REVIEW; Location State Machine run #5 `32551852759` SUCCESS and Location Contract run #11 `32551852738` SUCCESS.
  - NOTE: implementation slice complete; reporting-only correction isolated as N1.4R.

- [ ] **N1.4R — PRIORITY: PR #23 REPORTING RECTIFICATION / CLEAN RE-REVIEW GATE**
  - START CONDITION: SATISFIED — correction exists on exact HEAD `73a01727345e0c8b5d7937c654b5eef76ee0b520`; fresh GitHub metadata is mergeable=true and exact-head workflows are SUCCESS.
  - CORRECTION EVIDENCE: historical report finalized; `LATEST.md` = path header + verbatim integral historical body; compare `dfeefff...` → `73a017...` changes only historical report + LATEST; PR re-handoff comment `5378187983`.
  - FRESH VERIFY: Location State Machine run #7 `32554330952` SUCCESS; Location Contract run #13 `32554330936` SUCCESS on exact HEAD `73a017...`.
  - REQUIRED NEXT: NEXO REVIEW R11 must review this exact SHA now. Do not change implementation/reporting while review is pending. Mark `[x]` only after CLEAN; merge remains Coordinator responsibility.
  - Do not merge autonomously.

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
After every task: update this file on `coordination/agent-control`, mark `[x]` only if truly completed, append exact PR/SHA/check evidence, then immediately reread and start the next eligible task.

## LAST EVIDENCE
- 2026-08-22 05:56 UTC coordinator refresh — PR #23 exact HEAD `73a01727345e0c8b5d7937c654b5eef76ee0b520` is OPEN / DRAFT / mergeable=true.
- Exact-head workflows: Location State Machine #7 `32554330952` SUCCESS; Location Contract #13 `32554330936` SUCCESS.
- N1.4R remains `[ ]` only because independent R11 CLEAN is still required; prior mergeability blocker is obsolete.
- N1.5 remains gated until CLEAN + serialization/explicit authorization.
