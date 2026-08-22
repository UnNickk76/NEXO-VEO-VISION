# NEXO REVIEW — Dedicated Review File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO REVIEW
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- Review operates independently and never modifies implementation code or merges.
- Review one PR/SHA at a time, then update this file and immediately continue to the next eligible review.
- PR #12 exact SHA `75b661afffc45887cad1e64c7845d56b6c658288` has now been independently reviewed CLEAN; Coordinator must serialize/merge before shared-file release is assumed.
- PR #20 exact SHA `6e13d42379a5cff26cb37a67944f89302b925ac4` remains reviewable and is now the first eligible `[ ]` item.

## REVIEW QUEUE — ONE AT A TIME

- [x] **R1 — PR #19 Navigation Domain Core**
  - Reviewed exact SHA: `7210baef8693f1a8e77da8750ff2e4e597534cbe`.
  - Result: CHANGES REQUIRED / NON CLEAN — P0=0, P1=1, P2=0.
  - P1: V28 `Route Explanation` marked `parziale` without corresponding implementation/test evidence; new SHA required after conceptual/reporting correction and applicable VERIFY.
  - Review ID: `4998361255`.
  - Do not duplicate review on this SHA; await new exact SHA handoff after NEXO CODEX corrective task NC.1.

- [x] **R3 — PR #12 Saved Places Core — NEW SHA REVIEW — PRIORITY 1**
  - Reviewed exact SHA: `75b661afffc45887cad1e64c7845d56b6c658288`.
  - Result: CLEAN — P0=0, P1=0, P2=0.
  - Review ID: `4998454274`.
  - Multi-instance repository-scoped serialization and canonical conceptual-validator gate verified; reporting coherent.
  - Coordinator must decide serialization/merge; CLEAN alone does not release shared files until governance condition is satisfied.

- [ ] **R2 — PR #20 Surface Capabilities — NEW SHA REVIEW — PRIORITY 2**
  - START CONDITION: SATISFIED.
  - Exact SHA handed off by NEXO 2: `6e13d42379a5cff26cb37a67944f89302b925ac4`.
  - Prior reviewed SHA `dbb78f17fec64cabd3537e8c80ca7998da54b696` had one remaining reporting P1; NEXO 2 states this was corrected in the new SHA.
  - Goal: independently verify exact new SHA, reporting protocol, final checks, preservation of policy/availability fix and conceptual evidence; emit CLEAN or CHANGES REQUIRED. Do not review the old SHA again.

- [ ] **R4 — PR #17 Voice / Command Core**
  - START CONDITION: NEXO 3 completes shared-file gate and explicitly hands off exact SHA.
  - Current control-plane observed HEAD: `4d02a7fd5e579cbd48aa5e7c2588f5580d86c317`; not yet ready until Coordinator serializes/closes PR #12 or explicitly releases shared files and NEXO 3 completes its handoff.

- [x] **R5 — PR #18 Android Readiness**
  - Result: CLEAN on SHA `1e50e747a60c9ebba0dc98fa6efb136ff456bbf1`.
  - No duplicate review unless HEAD changes.

## REVIEW ORDER — COORDINATOR DIRECTIVE
Process eligible reviews strictly one at a time in this order unless a newer Coordinator directive changes it:
1. R3 / PR #12 — completed CLEAN.
2. Immediately reread this file.
3. R2 / PR #20 exact SHA `6e13d42...` — now first eligible.
4. Immediately reread this file.
5. If NEXO CODEX has handed off a new PR #19 SHA after NC.1, review that new SHA next.
6. If PR #12 CLEAN/closure releases NEXO 3 and PR #17 becomes reviewable, add/take R4 only after exact-SHA handoff.

After each review: update this file, write the three required reports/notes, reread immediately and continue with the next eligible review. Do not stop merely because one review report was emitted.

## REVIEW LOOP
For every eligible item: READ AGENTS.md + Issue #11 + this file → verify exact PR/SHA/diff/checks/reporting/governance → publish CLEAN or CHANGES REQUIRED on PR + Board → append personal review report + REVIEW NOTE to author report → update this file (`[x]` only for exact reviewed SHA/result) → immediately reread and continue. Never duplicate review of the same SHA.

## LAST EVIDENCE
- PR #12 SHA `75b661afffc45887cad1e64c7845d56b6c658288`: CLEAN, review ID `4998454274`; Issue #11 comment `5376965972`.
- PR #20 SHA `6e13d42379a5cff26cb37a67944f89302b925ac4`: START CONDITION satisfied and now first eligible review.
- PR #19 SHA `7210baef...`: CHANGES REQUIRED; await new SHA after NC.1.
- PR #18 SHA `1e50e747...`: CLEAN.
