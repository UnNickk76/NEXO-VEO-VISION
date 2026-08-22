# NEXO 3 — Dedicated Work File

CONTROL BRANCH: `coordination/agent-control`
OWNER: NEXO 3
COORDINATOR: NEXO Coordinator

## CURRENT VERIFIED STATE
- PR #17 `feat(voice): provider-neutral intent command core`: OPEN / DRAFT.
- Exact HEAD verified by NEXO 3: `4d02a7fd5e579cbd48aa5e7c2588f5580d86c317`.
- Base/main observed: `213fb129201230c3875e5fb8fc157260f995fe04`.
- PR #12 remains OPEN / DRAFT, but NEXO 1 has now closed its conceptual-validator gate and handed off final exact SHA `75b661afffc45887cad1e64c7845d56b6c658288` to NEXO REVIEW.
- Shared conceptual/reporting files are **not yet released** merely because validation passed: PR #12 is still open and awaiting independent review/serialization.
- NEXO 3 must not overwrite shared reporting/conceptual state until PR #12 is merged/closed or Coordinator explicitly records those files free.
- Do not touch location/surface/navigation/automotive native/EAS/TestFlight areas owned elsewhere.

## QUEUE — ONE TASK AT A TIME

- [x] **N3.1 — PR #17 CURRENT-HEAD AUDIT / SAFE FREEZE**
  - START CONDITION: immediate, READ-ONLY with respect to shared reporting/conceptual files.
  - Goal: verify exact current PR #17 HEAD/diff/commits versus the last authorized voice-core intent, identify what changed since prior blocked SHA, and record whether the functional voice files are internally coherent. Do not modify shared files. Update this queue file with evidence.
  - COMPLETED EVIDENCE: audited exact PR #17 HEAD `4d02a7fd5e579cbd48aa5e7c2588f5580d86c317` against prior authorized/frozen SHA `6dca71ef03b299962aa2f2d78554d63ee5c85ec2`. Delta is exactly 3 commits: `471934b4fa2cbcc963cceb195eda548f5546c59e` (voice core hardening), `5d642d330e1c3ab2ebf2edac8d175fc78dd457d1` (behavior checker hardening), `4d02a7fd5e579cbd48aa5e7c2588f5580d86c317` (historical resume report). Functional changes are confined to `frontend/src/voice/command-core.ts` and `frontend/scripts/check-voice-command-core.mjs`; added report is non-functional. Static audit found the two functional files coherent with provider-neutral/fail-closed intent: navigation still requires pre-resolved destination ID; unsupported/unsafe/incomplete input produces unknown/null command; envelope adds correlation/idempotency/source/surface/timestamp; bus exposes handled/unhandled/rejected and duplicate protection. Existing historical report records a real local checker execution PASS on reconstructed final functional contents; no GitHub Actions workflow/status exists on exact HEAD, so no CI PASS is claimed. PR remains DRAFT; no shared conceptual/reporting file modified by this audit.

- [ ] **N3.2 — RELEASE BLOCK CHECK + PR #17 COMPLETION**
  - START CONDITION: PR #12 merged/closed or Coordinator explicitly records shared files free.
  - Goal: finish PR #17 reporting/conceptual/test gates, rerun applicable checks, exact-SHA handoff to NEXO REVIEW.
  - BLOCKED: PR #12 final SHA `75b661afffc45887cad1e64c7845d56b6c658288` is handed to REVIEW but remains OPEN / DRAFT; shared conceptual/reporting ownership is not yet free.
  - RESUME CONDITION: PR #12 receives CLEAN and is serialised/merged/closed, or Coordinator explicitly authorizes safe shared-file continuation after verifying conflicts are absent.

- [ ] **N3.3 — VOICE INTENT NORMALIZATION**
  - START CONDITION: N3.2 completed/reviewable and no conflict.
  - Goal: deterministic normalization, unknown/confidence semantics, no invented destination; edge-case tests.

- [ ] **N3.4 — COMMAND VALIDATION POLICY**
  - START CONDITION: N3.3 completed.
  - Goal: schema/version/required fields/rejection reasons/stale-duplicate semantics provider-neutral.

- [ ] **N3.5 — CONFIRMATION LIFECYCLE STATE MACHINE**
  - START CONDITION: N3.4 completed.
  - Goal: confirmation timeout/stale/idempotency for ambiguous/destructive/start-navigation commands; deterministic tests.

- [ ] **N3.6 — COMMAND BUS HARDENING + VOICE FOUNDATION REVIEW**
  - START CONDITION: N3.5 completed.
  - Goal: handler registration, unhandled/failure semantics, fake handlers, test matrix, V02/V03/V34 conservative reconciliation and NEXO REVIEW handoff.

## UPDATE RULE
After every task: update this file on `coordination/agent-control`, mark `[x]` only when truly completed, append exact PR/SHA/check evidence, write chat + GitHub report, then immediately reread and start the next eligible task. A blocked task remains `[ ]` with blocker recorded.

## LAST EVIDENCE
- N3.1 completed by current-head audit on PR #17 exact HEAD `4d02a7fd5e579cbd48aa5e7c2588f5580d86c317`.
- PR #12 validator gate is now complete, but final PR #12 SHA `75b661afffc45887cad1e64c7845d56b6c658288` is still awaiting NEXO REVIEW and remains open; this does not release shared files.
- N3.2 remains legitimately BLOCKED pending PR #12 CLEAN + serialization/closure or explicit Coordinator release.
