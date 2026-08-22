# NEXO 1 — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO 1
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- PR #12 Saved Places: MERGED after CLEAN; merge commit `47b9d0a5c20490f0b73e95e52fadca151e89e136`.
- PR #22 Location Contract: CLEAN and MERGED; merge commit/current foundation main `8d8dee4a31416acb38c2e654082ca15efafd6fec` at N1.4 start.
- PR #23 `feat(location): add permission degraded state machine`: OPEN / DRAFT / mergeable at handoff; exact final HEAD `dfeefff17f03d7fcbd3b171a5e82dcd359f12d09`.
- N1.4 functional/conceptual SHA `f9c53e40732dce009379a67fd899cfd7679865a7` verified by Location State Machine run #2 `32551730907` / job `96979479985` SUCCESS and Location Contract run #8 `32551730913` SUCCESS.
- Reporting-only commits after verified SHA updated historical report, `LATEST.md` and `Fabio/FABIO_CONTROLLO.md`; no functional/conceptual/workflow path changed after the fresh runs.
- C007 remains `[ ] / parziale`; no OS/GPS provider runtime exists yet.
- Do not touch voice/surface/navigation/automotive/EAS/TestFlight areas owned elsewhere.

## QUEUE — ONE TASK AT A TIME

- [x] **N1.1 — CLOSE PR #12 VALIDATION GATE**
  - COMPLETED EVIDENCE: validator exact SHA `155ba7e8005d6848a506478d7f3139b3b69776d8`, exit 0; PR #12 final reviewed SHA `75b661afffc45887cad1e64c7845d56b6c658288`.

- [x] **N1.2 — PR #12 REVIEW REWORK / CLEAN HANDOFF**
  - COMPLETED EVIDENCE: CLEAN review ID `4998454274`; merged as main `47b9d0a5c20490f0b73e95e52fadca151e89e136`.

- [x] **N1.3 — F1 LOCATION CONTRACT**
  - COMPLETED EVIDENCE: PR #22 exact SHA `475c39539809361e7ede47f381e07f3be70454e3`; CLEAN review ID `4998866766`; exact-head run #6 `32546418961` SUCCESS; merged by Coordinator as main `8d8dee4a31416acb38c2e654082ca15efafd6fec`.

- [x] **N1.4 — LOCATION PERMISSION / DEGRADED STATE MACHINE**
  - START CONDITION: satisfied and consumed.
  - Goal: denied/restricted/unavailable/stale/degraded semantics with deterministic tests; preserve fail-closed/no-invented-position rule.
  - COMPLETED EVIDENCE: PR #23 DRAFT; functional/conceptual SHA `f9c53e40732dce009379a67fd899cfd7679865a7`; Location State Machine run #2 `32551730907`, job `96979479985` SUCCESS; Location Contract run #8 `32551730913` SUCCESS; final post-reporting HEAD `dfeefff17f03d7fcbd3b171a5e82dcd359f12d09`; report `docs/codex-reports/2026-08-22_042800_f1-location-permission-state-machine.md`; REVIEW handoff PR comment `5377875924`; Board completion `5377876386`.

- [ ] **N1.5 — LOCATION FRESHNESS / QUALITY POLICY**
  - START CONDITION: N1.4 completed/reviewable and no exact-SHA review conflict.
  - Goal: stale fix, invalid coordinates, accuracy/freshness thresholds and conservative fallback; checker required.
  - STATUS: BLOCKED / SAFE FREEZE — PR #23 has been handed to NEXO REVIEW on exact SHA `dfeefff17f03d7fcbd3b171a5e82dcd359f12d09`. Appending N1.5 to the same branch/PR would invalidate that handoff. Resume only after review/serialization or explicit Coordinator strategy for a separate safe slice.

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
- 2026-08-22 04:30 UTC — N1.4 completed/reviewable on PR #23.
- Final PR #23 HEAD post-reporting: `dfeefff17f03d7fcbd3b171a5e82dcd359f12d09`, OPEN/DRAFT/mergeable at handoff.
- Fresh concluding verification after conceptual update: Location State Machine run #2 `32551730907`, job `96979479985` SUCCESS; Location Contract run #8 `32551730913` SUCCESS.
- NEXO REVIEW handoff recorded on PR #23 comment `5377875924` and Board comment `5377876386`.
- N1.5 remains legitimately BLOCKED / SAFE FREEZE while exact-SHA review is pending.
