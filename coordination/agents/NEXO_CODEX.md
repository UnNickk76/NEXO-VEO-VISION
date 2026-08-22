# NEXO CODEX — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO CODEX
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- Current main: `2155db10e40cebe71ba02e97e3afb35cf7288004` after CLEAN PR #24 Location Quality merge.
- TestFlight production is manual / Coordinator-controlled.
- PR #18 Android Readiness: OPEN / DRAFT, safely reconstructed on current main with backup `backup/pr18-before-2155db10` preserving historical HEAD `1e50e747a60c9ebba0dc98fa6efb136ff456bbf1`.
- PR #18 current HEAD: `93b43bda56ebd521ffec2a8abba653b8bb936f2b`; compare current main → HEAD = ahead 2 / behind 0; delta contains only `.github/workflows/android-readiness.yml` plus preserved historical Android report. Shared `LATEST.md` / `FABIO_CONTROLLO.md` intentionally remain current-main canonical and must be regenerated only with accurate final #18 reporting.
- Android Readiness run `32592321823` and Voice Validation `32592321853` were queued after reconciliation at last observation; no SUCCESS is claimed until completed.
- PR #19 Navigation Domain Core remains BLOCKED until #18 is CLEAN + MERGED; historical HEAD `7210baef8693f1a8e77da8750ff2e4e597534cbe`, residual V28 finding remains subject to fresh verification.

## QUEUE — ONE TASK AT A TIME

- [ ] **NC.1A — FINALIZE RECONCILED PR #18 ANDROID READINESS / RE-HANDOFF**
  - START CONDITION: SATISFIED / ACTIVE QUEUE ITEM.
  - Reconciliation is already completed by Coordinator. DO NOT redo/reset/rebase it.
  - Preserve exact current-main state and Android Readiness workflow; no EAS Build, APK/AAB, Play, iOS/TestFlight or application feature changes.
  - REQUIRED NOW: observe exact-head Android Readiness on the current HEAD; if SUCCESS, create a new AGENTS-compliant final report for the reconciliation activity, update `LATEST.md` + `FABIO_CONTROLLO.md`, rerun any checks invalidated by those edits, record final exact SHA and explicit NEXO REVIEW handoff.
  - Historical report `docs/codex-reports/2026-08-21_205500_android-build-readiness.md` is preserved for history and must not be rewritten.
  - Definition of done: current-main-based mergeable exact SHA, no regressions, Android Readiness exact-head SUCCESS, coherent final reporting, DRAFT, exact-SHA REVIEW handoff.

- [ ] **NC.1 — PR #19 CURRENT-MAIN RECONCILIATION + REAL FINDING CORRECTION / RE-HANDOFF**
  - START CONDITION: BLOCKED until PR #18 is CLEAN + MERGED by Coordinator and this file is retargeted to the new main.
  - Preserve Navigation Domain Core; fix only findings still real after fresh review, including V28 if still applicable; run Navigation/Expo Doctor/lint/conceptual checks; reporting + REVIEW handoff.

- [ ] **NC.2 — ROUTE MODEL / PROVIDER CONTRACT HARDENING**
  - START CONDITION: blocked by consolidation freeze until #18/#19/#20 backlog is closed.

## SERIAL MERGE QUEUE RULE
Strict order remains #18 → #19 → #20 after the completed #24 merge. Never reconcile a later PR before the current one is merged.

## UPDATE RULE
After every task: update this file, mark `[x]` only with real evidence, write GitHub report/handoff, reread current main and obey the active START CONDITION.

## LAST EVIDENCE
- #24 merged CLEAN as main `2155db10e40cebe71ba02e97e3afb35cf7288004`.
- Backup branch protects pre-reconciliation #18 work.
- #18 branch current compare is ahead 2 / behind 0; exact-head CI is pending/queued and must be observed before any REVIEW request.
