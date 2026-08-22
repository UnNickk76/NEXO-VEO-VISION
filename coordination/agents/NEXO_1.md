# NEXO 1 — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO 1
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- PR #12 Saved Places: MERGED after CLEAN; merge commit `47b9d0a5c20490f0b73e95e52fadca151e89e136`.
- PR #22 `feat(location): add provider-neutral foreground location contract`: CLEAN on exact SHA `475c39539809361e7ede47f381e07f3be70454e3`, review ID `4998866766`, P0/P1/P2=0/0/0; exact-head Location Contract run #6 `32546418961` SUCCESS.
- Coordinator transitioned PR #22 Ready only after CLEAN and merged it. Current `main`: `8d8dee4a31416acb38c2e654082ca15efafd6fec`.
- Location contract/C007 is now canonical on main. Safe-freeze for PR #22 is released.
- Before any N1.4 WRITE, re-read current main and all open PR overlaps; preserve location contract and current-main reporting/conceptual state.
- Do not touch voice/surface/navigation/automotive/EAS/TestFlight areas owned elsewhere.

## QUEUE — ONE TASK AT A TIME

- [x] **N1.1 — CLOSE PR #12 VALIDATION GATE**
  - COMPLETED EVIDENCE: validator exact SHA `155ba7e8005d6848a506478d7f3139b3b69776d8`, exit 0; PR #12 final reviewed SHA `75b661afffc45887cad1e64c7845d56b6c658288`.

- [x] **N1.2 — PR #12 REVIEW REWORK / CLEAN HANDOFF**
  - COMPLETED EVIDENCE: CLEAN review ID `4998454274`; merged as main `47b9d0a5c20490f0b73e95e52fadca151e89e136`.

- [x] **N1.3 — F1 LOCATION CONTRACT**
  - COMPLETED EVIDENCE: PR #22 exact SHA `475c39539809361e7ede47f381e07f3be70454e3`; CLEAN review ID `4998866766`; exact-head run #6 `32546418961` SUCCESS; merged by Coordinator as main `8d8dee4a31416acb38c2e654082ca15efafd6fec`.

- [ ] **N1.4 — LOCATION PERMISSION / DEGRADED STATE MACHINE**
  - START CONDITION: SATISFIED — N1.3 is CLEAN and merged; safe-freeze released.
  - FIRST REQUIRED ACTION: re-read `main` `8d8dee4a...`, PR #17/#18/#19/#20 and shared-file ownership before WRITE. Use a new dedicated branch/PR from current main; do not append N1.4 onto merged PR #22 branch.
  - Goal: denied/restricted/unavailable/stale/degraded semantics with deterministic tests; preserve fail-closed/no-invented-position rule.
  - PROOF REQUIRED: dedicated PR DRAFT, exact SHA, deterministic checker/workflow, conceptual/reporting aligned to current main, NEXO REVIEW handoff.

- [ ] **N1.5 — LOCATION FRESHNESS / QUALITY POLICY**
  - START CONDITION: N1.4 completed/reviewable and no exact-SHA review conflict.
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
- 2026-08-22 04:05 UTC — Coordinator merged CLEAN PR #22 after Ready transition required by GitHub. Merge commit/current main `8d8dee4a31416acb38c2e654082ca15efafd6fec`.
- N1.4 is ACTIONABLE NOW from a fresh dedicated branch based on current main; old safe-freeze blocker is obsolete and removed.
