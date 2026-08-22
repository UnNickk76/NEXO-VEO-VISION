# NEXO 1 — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO 1
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- PR #12 `feat(f1): saved places local-first core`: OPEN / DRAFT / mergeable.
- Current HEAD verified by NEXO 1: `75b661afffc45887cad1e64c7845d56b6c658288`.
- Functional multi-instance concurrency fix is present according to PR state.
- N1.1 conceptual validation gate is CLOSED with real evidence: `python3 scripts/check_conceptual_master.py .` executed by GitHub Actions against exact pre-reporting SHA `155ba7e8005d6848a506478d7f3139b3b69776d8`, exit code `0` and all canonical assertions PASS.
- Compare `155ba7e...` → `75b661a...` changes only three reporting files; no validator input changed after PASS.
- Diagnostic PR #21 is CLOSED without merge; evidence remains on branch `nexo1/validate-pr12-conceptual`.
- Do not touch voice/surface/navigation/automotive/EAS/TestFlight areas owned elsewhere.

## QUEUE — ONE TASK AT A TIME

- [x] **N1.1 — CLOSE PR #12 VALIDATION GATE**
  - START CONDITION: immediate.
  - Goal: obtain a real reproducible final conceptual-validator result on the exact PR #12 content without inventing PASS; use an existing safe CI path or another non-destructive reproducible method if available.
  - If PASS: update only reporting/evidence required by AGENTS.md, produce new final SHA if needed, reconfirm DRAFT/mergeable, hand off to NEXO REVIEW.
  - If impossible: document exact blocker here and on PR/Board; do not fake completion.
  - COMPLETED EVIDENCE: validator exact SHA `155ba7e8005d6848a506478d7f3139b3b69776d8`, exit `0`; final PR #12 HEAD `75b661afffc45887cad1e64c7845d56b6c658288`; PR OPEN/DRAFT/mergeable; diagnostic PR #21 closed without merge; report appended to `coordination/reports/NEXO_1_REPORT.md`.

- [ ] **N1.2 — PR #12 REVIEW REWORK / CLEAN HANDOFF**
  - START CONDITION: N1.1 completed and NEXO REVIEW has reviewed the new SHA.
  - Goal: resolve only review findings on PR #12, rerun affected checks, reconsegnare exact SHA until CLEAN.
  - Do not merge autonomously.

- [ ] **N1.3 — F1 LOCATION CONTRACT**
  - START CONDITION: PR #12 CLEAN and merged/closed or Coordinator explicitly confirms shared reporting/conceptual files are free.
  - Goal: provider-neutral foreground location contract: coordinates, accuracy, timestamp, permission/status/error semantics; no map provider, no invented position.

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
- N1.1 completed 2026-08-22 00:34 UTC.
- PR #12 final HEAD `75b661afffc45887cad1e64c7845d56b6c658288`, OPEN/DRAFT/mergeable/non-merged.
- Canonical validator evidence: branch `nexo1/validate-pr12-conceptual`, file `validation/nexo1-pr12-conceptual-result.txt`, validated SHA `155ba7e8005d6848a506478d7f3139b3b69776d8`, command `python3 scripts/check_conceptual_master.py .`, exit code `0`, all canonical PASS output recorded.
- Post-validator compare to final PR HEAD: only `docs/codex-reports/2026-08-22_003135_pr12-conceptual-validator.md`, `docs/codex-reports/LATEST.md`, `Fabio/FABIO_CONTROLLO.md` changed.
- Diagnostic PR #21 CLOSED without merge, head `9e342c33e0fdb5a22b7738bda4a3aa9d4a9429b8`.
- Handoff requested to NEXO REVIEW on exact SHA `75b661afffc45887cad1e64c7845d56b6c658288`.
- N1.2 remains not eligible until NEXO REVIEW has reviewed that SHA.
