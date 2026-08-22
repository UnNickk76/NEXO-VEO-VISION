# NEXO 1 — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO 1
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- PR #12 `feat(f1): saved places local-first core`: OPEN / DRAFT / mergeable / non-merged.
- Current HEAD verified by NEXO 1: `75b661afffc45887cad1e64c7845d56b6c658288`.
- NEXO REVIEW verdict on exact SHA: CLEAN, review ID `4998454274`, P0/P1/P2 = 0/0/0.
- N1.1 conceptual validation gate is CLOSED with real evidence: `python3 scripts/check_conceptual_master.py .` exit `0` on exact pre-reporting SHA `155ba7e8005d6848a506478d7f3139b3b69776d8`; compare to final HEAD changes only reporting files.
- Do not touch voice/surface/navigation/automotive/EAS/TestFlight areas owned elsewhere.

## QUEUE — ONE TASK AT A TIME

- [x] **N1.1 — CLOSE PR #12 VALIDATION GATE**
  - START CONDITION: immediate.
  - COMPLETED EVIDENCE: validator exact SHA `155ba7e8005d6848a506478d7f3139b3b69776d8`, exit `0`; final PR #12 HEAD `75b661afffc45887cad1e64c7845d56b6c658288`; diagnostic PR #21 closed without merge.

- [x] **N1.2 — PR #12 REVIEW REWORK / CLEAN HANDOFF**
  - START CONDITION: N1.1 completed and NEXO REVIEW has reviewed the new SHA.
  - Goal: resolve only review findings on PR #12, rerun affected checks, reconsegnare exact SHA until CLEAN.
  - COMPLETED EVIDENCE: NEXO REVIEW CLEAN on exact SHA `75b661afffc45887cad1e64c7845d56b6c658288`, review ID `4998454274`, P0/P1/P2 = 0/0/0; no corrections requested; no functional rewrite performed; PR remains OPEN/DRAFT/mergeable/non-merged.

- [ ] **N1.3 — F1 LOCATION CONTRACT**
  - START CONDITION: PR #12 CLEAN and merged/closed or Coordinator explicitly confirms shared reporting/conceptual files are free.
  - Goal: provider-neutral foreground location contract: coordinates, accuracy, timestamp, permission/status/error semantics; no map provider, no invented position.
  - CURRENT BLOCKER: CLEAN is satisfied, but PR #12 is still OPEN/non-merged and no explicit Coordinator release of shared reporting/conceptual files has been observed.

- [ ] **N1.4 — LOCATION PERMISSION / DEGRADED STATE MACHINE**
  - START CONDITION: N1.3 completed/reviewable and no conflict.
  - Goal: denied/restricted/unavailable/stale/degraded semantics with deterministic tests.

- [ ] **N1.5 — LOCATION FRESHNESS / QUALITY POLICY**
  - START CONDITION: N1.4 completed.
  - Goal: stale fix, invalid coordinates, accuracy/freshness thresholds and conservative fallback; checker required.

- [ ] **N1.6 — LOCATION ADAPTER CONTRACT + HARDENING**
  - START CONDITION: N1.5 completed.
  - Goal: future iOS/Android source adapter interface + fake adapter tests; conceptual/reporting reconciliation; handoff to NEXO REVIEW.

## UPDATE RULE
After every task: update this file on `coordination/agent-control`, replace `[ ]` with `[x]` only when truly completed, and append evidence below. Then immediately reread this file and start the next eligible task.

## LAST EVIDENCE
- N1.2 completed 2026-08-22 01:23 UTC.
- PR #12 HEAD `75b661afffc45887cad1e64c7845d56b6c658288`, OPEN/DRAFT/mergeable/non-merged.
- NEXO REVIEW CLEAN exact SHA, review ID `4998454274`, P0/P1/P2 = 0/0/0; no rettifiche.
- Board closure comment: `5377047071`.
- N1.3 is not eligible until PR #12 is merged/closed or Coordinator explicitly releases shared reporting/conceptual files.
