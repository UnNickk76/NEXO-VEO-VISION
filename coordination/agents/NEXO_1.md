# NEXO 1 — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO 1
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- PR #12 `feat(f1): saved places local-first core`: MERGED by Coordinator after NEXO REVIEW CLEAN.
- Reviewed exact HEAD: `75b661afffc45887cad1e64c7845d56b6c658288`.
- Merge commit on `main`: `47b9d0a5c20490f0b73e95e52fadca151e89e136`.
- NEXO REVIEW verdict: CLEAN, review ID `4998454274`, P0/P1/P2 = 0/0/0.
- N1.3 produced PR #22 `feat(location): add provider-neutral foreground location contract`, OPEN / DRAFT / mergeable, exact HEAD `475c39539809361e7ede47f381e07f3be70454e3`.
- Location Contract run #3 `32546311607`, job `96965279495` = SUCCESS on last functional/conceptual SHA `0d148712426e381b83a3cb0fe2f8895dcca57096`; final three commits are reporting-only.
- N1.3 handoff to NEXO REVIEW registered on Issue #11 comment `5377380623`.
- Do not touch voice/surface/navigation/automotive/EAS/TestFlight areas owned elsewhere.

## QUEUE — ONE TASK AT A TIME

- [x] **N1.1 — CLOSE PR #12 VALIDATION GATE**
  - START CONDITION: immediate.
  - COMPLETED EVIDENCE: validator exact SHA `155ba7e8005d6848a506478d7f3139b3b69776d8`, exit `0`; final PR #12 HEAD `75b661afffc45887cad1e64c7845d56b6c658288`; diagnostic PR #21 closed without merge.

- [x] **N1.2 — PR #12 REVIEW REWORK / CLEAN HANDOFF**
  - START CONDITION: N1.1 completed and NEXO REVIEW has reviewed the new SHA.
  - COMPLETED EVIDENCE: NEXO REVIEW CLEAN on exact SHA `75b661afffc45887cad1e64c7845d56b6c658288`, review ID `4998454274`, P0/P1/P2 = 0/0/0; Coordinator merged PR #12 to main as `47b9d0a5c20490f0b73e95e52fadca151e89e136`.

- [x] **N1.3 — F1 LOCATION CONTRACT**
  - START CONDITION: SATISFIED — PR #12 is merged and shared-file gate released. Before WRITE, re-read current main and open PR overlaps because #17/#18/#19/#20 may now require rebase/reconciliation.
  - Goal: provider-neutral foreground location contract: coordinates, accuracy, timestamp, permission/status/error semantics; no map provider, no invented position.
  - COMPLETED EVIDENCE: PR #22 exact HEAD `475c39539809361e7ede47f381e07f3be70454e3`, OPEN/DRAFT/mergeable; Location Contract run #3 `32546311607`, job `96965279495` SUCCESS on functional/conceptual SHA `0d148712426e381b83a3cb0fe2f8895dcca57096`; Expo Doctor 18/18, lint 0 errors/1 preexisting warning, TypeScript compile PASS, checker PASS, conceptual validator PASS with C001–C007 stable set. Compare to final HEAD changes only three reporting files. C007 remains `[ ] / parziale`; no provider/GPS runtime. Handoff Board comment `5377380623`; report `docs/codex-reports/2026-08-22_022837_f1-location-contract.md`.

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
- 2026-08-22 02:30 UTC — N1.3 completed/reviewable on PR #22 exact HEAD `475c39539809361e7ede47f381e07f3be70454e3`.
- Functional/conceptual VERIFY: run #3 `32546311607`, job `96965279495`, SUCCESS; final delta after verified SHA is reporting-only.
- PR #22 OPEN / DRAFT / mergeable; NEXO REVIEW handoff on Board comment `5377380623`.
- Next action: reread task/report + Issue #11 for new REVIEW NOTE/conflicts before deciding whether N1.4 remains immediately eligible.
