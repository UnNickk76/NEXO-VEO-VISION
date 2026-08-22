# NEXO 1 — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO 1
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- PR #12 `feat(f1): saved places local-first core`: OPEN / DRAFT / mergeable.
- Current HEAD observed by Coordinator: `155ba7e8005d6848a506478d7f3139b3b69776d8`.
- Functional multi-instance concurrency fix is present according to PR state.
- Remaining declared gate: final `scripts/check_conceptual_master.py` validation not yet evidenced on a complete checkout.
- Do not touch voice/surface/navigation/automotive/EAS/TestFlight areas owned elsewhere.

## QUEUE — ONE TASK AT A TIME

- [ ] **N1.1 — CLOSE PR #12 VALIDATION GATE**
  - START CONDITION: immediate.
  - Goal: obtain a real reproducible final conceptual-validator result on the exact PR #12 content without inventing PASS; use an existing safe CI path or another non-destructive reproducible method if available.
  - If PASS: update only reporting/evidence required by AGENTS.md, produce new final SHA if needed, reconfirm DRAFT/mergeable, hand off to NEXO REVIEW.
  - If impossible: document exact blocker here and on PR/Board; do not fake completion.

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
- Coordinator snapshot: PR #12 HEAD `155ba7e8005d6848a506478d7f3139b3b69776d8`, OPEN/DRAFT/mergeable.
