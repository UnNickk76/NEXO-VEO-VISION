# NEXO REVIEW — Dedicated Review File

CONTROL BRANCH: `coordination/agent-control`.
OWNER: NEXO REVIEW
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- Review is independent: no implementation code changes, no merges, no Ready transitions, no build reruns, no credential changes.
- Current main: `ba39d977072231d69ef848b1cc9ae2637b556c72`.
- Production TestFlight is manual / Coordinator-controlled.
- Consolidation freeze is active: review only exact SHAs explicitly handed off with required evidence; do not review stale/incomplete heads.
- PR #24 remains DRAFT at `8abc5d2dc39b2b8b63a62f63ffe8bc8cbed62a17`; NEXO 1 reports reconciliation/C007 finalization blocked. Not reviewable.
- PR #17 R4RR reviewed CLEAN on exact SHA `8f82b692d2cc6759c4ce773c791f3725f85e4062`, review `5000238141`; PR remains OPEN/DRAFT/mergeable=true and current-main compatible.
- Exact-head PR #17 workflows verified: NEXO 3 Voice Validation run `32574678400` SUCCESS; Location State Machine `32574678369` SUCCESS; Location Contract `32574678491` SUCCESS.
- Prior R4R CHANGES REQUIRED on obsolete SHA `21665a6b...` remains historical only.
- PR #18/#19/#20 remain stale/non-mergeable and require reconciliation/new handoff.

## REVIEW QUEUE — ONE AT A TIME

- [x] **R1 — PR #19 Navigation Domain Core historical SHA** — CHANGES REQUIRED on `7210baef...`, review `4998361255`.
- [x] **R3 — PR #12 Saved Places Core** — CLEAN and merged.
- [x] **R2 — PR #20 Surface Capabilities historical SHA** — CLEAN historical SHA `6e13d423...`; new reconciled SHA required.
- [x] **R9 — PR #22 Location Contract** — CLEAN and merged.
- [x] **R11 — PR #23 Location Permission / Degraded State Machine** — CLEAN and merged.

- [ ] **R13R — PR #24 LOCATION QUALITY POLICY**
  - START CONDITION: NEXO 1 hands off a current-main-based exact SHA after conservative C007 evidence, final reporting and applicable exact-head VERIFY. Current `8abc5d2d...` is not eligible.
  - PRIORITY: 1 when eligible; currently BLOCKED.

- [x] **R4R — PR #17 VOICE CORE**
  - REVIEWED EXACT SHA: `21665a6b0aeb986c37bbc70a23f55871d0723807`.
  - VERDICT: CHANGES REQUIRED / review `4999992268`, P0/P1/P2=0/2/0. Closed for this obsolete SHA.

- [x] **R4RR — PR #17 VOICE CORE RE-REVIEW**
  - REVIEWED EXACT SHA: `8f82b692d2cc6759c4ce773c791f3725f85e4062`.
  - VERDICT: CLEAN / review `5000238141`, P0/P1/P2=0/0/0.
  - VERIFIED: V02/V03/V34 evidence closes prior P1; N3.2RR historical/LATEST/FABIO closes reporting P1; exact-head Voice Validation `32574678400` SUCCESS; no review threads.
  - NOTE: GitHub self-approval is not permitted for the repository owner, so CLEAN is persisted as a COMMENT review anchored to the exact SHA.
  - NEXT: Coordinator serializes/merges; no Ready/merge by REVIEW.

- [ ] **R8R — PR #18 ANDROID READINESS**
  - START CONDITION: NEXO CODEX hands off a new mergeable exact SHA preserving Android Readiness/current main, with exact-head Android Readiness SUCCESS and reporting aligned.
  - PRIORITY: 3.

- [ ] **R6R — PR #19 NAVIGATION DOMAIN**
  - START CONDITION: NEXO CODEX hands off a new exact SHA after safe reconciliation, V28 correction, applicable exact-head VERIFY and reporting alignment.
  - PRIORITY: 4.

- [ ] **R7R — PR #20 SURFACE**
  - START CONDITION: NEXO 2 hands off a new exact SHA after safe current-main reconciliation, Surface checks and reporting. If unresolved shared-file conflicts are reported, do not review until Coordinator resolves/serializes them.
  - PRIORITY: 5.

## REVIEW ORDER — COORDINATOR DIRECTIVE
Prefer R13R → R4RR → R8R → R6R → R7R, but blocked earlier items do not prevent the next genuinely eligible exact SHA. After every Coordinator merge, reread current main before reviewing the next PR. Never duplicate an exact SHA.

## REVIEW LOOP
For every eligible item: READ AGENTS.md + Issue #11 + this file → verify exact PR/SHA/diff/checks/reporting/governance/current main → publish CLEAN or CHANGES REQUIRED → append review report + REVIEW NOTE → update queue → immediately reread.

## LAST EVIDENCE
- R4RR CLEAN: PR #17 exact HEAD `8f82b692d2cc6759c4ce773c791f3725f85e4062`, OPEN/DRAFT/mergeable=true, base current main `ba39d977...`.
- Exact-head Voice Validation `32574678400` SUCCESS; Location State Machine `32574678369` SUCCESS; Location Contract `32574678491` SUCCESS; no review threads.
- Review `5000238141`; Board comment `5380581710`.
- #24 remains blocked; #18/#19/#20 remain reconciliation-gated historical heads.
