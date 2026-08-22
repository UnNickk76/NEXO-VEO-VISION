# NEXO REVIEW — Dedicated Review File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO REVIEW
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- Review operates independently and never modifies implementation code or merges.
- Review one PR/SHA at a time, then update this file and immediately continue to the next eligible review.

## REVIEW QUEUE — ONE AT A TIME

- [ ] **R1 — PR #19 Navigation Domain Core**
  - START CONDITION: immediate.
  - Exact SHA to review: `7210baef8693f1a8e77da8750ff2e4e597534cbe`.
  - Context: prior review on `aee16726372f58208630f387481c517396695426` found 2 P1 governance/evidence issues; author reports both corrected.
  - Verify exact diff, conceptual evidence, report/LATEST/FABIO_CONTROLLO consistency, final CI evidence and no new regressions.

- [ ] **R2 — PR #20 Surface Capabilities**
  - START CONDITION: only when HEAD changes from already-reviewed `dbb78f17fec64cabd3537e8c80ca7998da54b696` and NEXO 2 explicitly reconsegna exact new SHA.
  - Goal: verify remaining reporting/VERIFY P1 and preserve policy/availability fix.

- [ ] **R3 — PR #12 Saved Places Core**
  - START CONDITION: NEXO 1 explicitly reconsegna a new exact SHA after completing the final conceptual-validator gate.
  - Current observed HEAD: `155ba7e8005d6848a506478d7f3139b3b69776d8`; do not review prematurely if handoff/gate is incomplete.

- [ ] **R4 — PR #17 Voice / Command Core**
  - START CONDITION: NEXO 3 completes shared-file gate and explicitly hands off exact SHA.
  - Current observed HEAD: `4d02a7fd5e579cbd48aa5e7c2588f5580d86c317`; not yet assumed ready.

- [x] **R5 — PR #18 Android Readiness**
  - Result: CLEAN on SHA `1e50e747a60c9ebba0dc98fa6efb136ff456bbf1`.
  - No duplicate review unless HEAD changes.

## REVIEW LOOP
For every eligible item: READ AGENTS.md + Issue #11 + this file → verify exact PR/SHA/diff/checks/reporting/governance → publish CLEAN or CHANGES REQUIRED on PR + Board → update this file (`[x]` only for the exact reviewed SHA/result) → immediately reread this file and continue with the next eligible item. Never duplicate review of the same SHA.

## LAST EVIDENCE
- Latest completed review reported by NEXO REVIEW: PR #19 old SHA `aee16726372f58208630f387481c517396695426` NON CLEAN with 2 P1; PR #18 CLEAN.
