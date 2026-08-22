#!/usr/bin/env python3
"""Verifica riproducibile del registro concettuale NEXO."""
from pathlib import Path
import re
import sys

root = Path(sys.argv[1] if len(sys.argv) > 1 else ".").resolve()


def read(rel):
    path = root / rel
    if not path.is_file():
        raise SystemExit(f"FAIL missing file: {rel}")
    return path.read_text(encoding="utf-8")


master = read("docs/product/NEXO_CONCEPTUAL_MASTER.md")
agents = read("AGENTS.md")
vision = read("memory/NEXO_VEO_VISION.md")
ux = read("NEXO_VEO_VISION_UX_UI.txt")
roadmap = read("NEXO_VEO_VISION_ROADMAP.txt")
readme = read("README.md")


def expected_ids(prefix, count, width):
    return {f"{prefix}{number:0{width}d}" for number in range(1, count + 1)}


expected = {
    "V": expected_ids("V", 51, 2),
    "E": expected_ids("E", 47, 2),
    "U": expected_ids("U", 31, 2),
    "C": expected_ids("C", 7, 3),
}

rows = {}
row_pattern = re.compile(
    r"^\| \[([ x])\] \| `([VEUC]\d+)` \| (.+?) \| (.+?) \| (.+?) \|(?: (.+?) \|)?$",
    re.MULTILINE,
)
for match in row_pattern.finditer(master):
    mark, feature_id, requirement, phase_or_state, state_or_evidence, evidence_or_source = (
        match.groups()
    )
    if feature_id.startswith("C"):
        phase = phase_or_state.strip()
        state = state_or_evidence.strip()
        evidence = evidence_or_source.strip()
    else:
        phase = None
        state = phase_or_state.strip()
        evidence = state_or_evidence.strip()
    if feature_id in rows:
        raise SystemExit(f"FAIL duplicate ID: {feature_id}")
    rows[feature_id] = {
        "checked": mark == "x",
        "requirement": requirement.strip(),
        "phase": phase,
        "state": state,
        "evidence": evidence,
    }

for prefix, expected_set in expected.items():
    found = {feature_id for feature_id in rows if feature_id.startswith(prefix)}
    missing = sorted(expected_set - found)
    unexpected = sorted(found - expected_set)
    if missing or unexpected:
        raise SystemExit(
            f"FAIL {prefix}: missing={missing or 'none'} unexpected={unexpected or 'none'}"
        )
    print(f"PASS {prefix}: exact stable ID set ({len(expected_set)} rows)")

checked_count = 0
allowed_states = {
    "concettuale",
    "in corso",
    "parziale",
    "implementata",
    "rinviata",
    "sostituita",
    "scartata",
}
for feature_id, row in rows.items():
    state = row["state"].lower()
    evidence = row["evidence"]
    if state not in allowed_states:
        raise SystemExit(f"FAIL row {feature_id}: invalid state {row['state']!r}")
    if state in {"sostituita", "scartata"}:
        if evidence in {"", "—", "-"}:
            raise SystemExit(
                f"FAIL row {feature_id}: {state} requires motivation/evidence"
            )
        has_motivation = re.search(r"\bmotivazion\w*\b", evidence, re.IGNORECASE)
        has_decision_reference = re.search(
            r"\b(decision\w*|adr|issue\s*#?\d+|pr\s*#\d+)\b",
            evidence,
            re.IGNORECASE,
        )
        if not has_motivation or not has_decision_reference:
            raise SystemExit(
                f"FAIL row {feature_id}: {state} evidence requires both motivation and decision reference"
            )
    if not row["checked"]:
        if state == "implementata":
            raise SystemExit(
                f"FAIL row {feature_id}: implementata state requires [x]"
            )
        continue
    checked_count += 1
    failures = []
    if state != "implementata":
        failures.append("state must be implementata")
    if evidence in {"", "—", "-"}:
        failures.append("evidence is empty")
    if not re.search(r"\bPR\s*#\d+\b", evidence, re.IGNORECASE):
        failures.append("missing PR reference")
    if not re.search(r"\b[0-9a-f]{7,40}\b", evidence, re.IGNORECASE):
        failures.append("missing commit SHA")
    if not re.search(r"\b(test|tests|pytest|jest|vitest|detox|xctest)\b", evidence, re.IGNORECASE):
        failures.append("missing test reference")
    if failures:
        raise SystemExit(f"FAIL checked row {feature_id}: {', '.join(failures)}")

print(f"PASS completion evidence: {checked_count} checked rows valid")

assertions = {
    "master protocol": "Una voce implementata non viene eliminata" in master,
    "AGENTS registry": "Registro concettuale permanente" in agents
        and "stessa pull request dell'implementazione" in agents,
    "Vision saved places": "### 35A. Casa, Lavoro e luoghi salvati" in vision
        and "non avviano mai autonomamente" in vision,
    "UX saved places": "LUOGHI SALVATI" in ux
        and "conferma vocale avvia il percorso" in ux,
    "Roadmap phase 1": "Prima versione dei luoghi salvati" in roadmap,
    "README discovery": "docs/product/NEXO_CONCEPTUAL_MASTER.md" in readme,
}
for name, ok in assertions.items():
    if not ok:
        raise SystemExit(f"FAIL assertion: {name}")
    print(f"PASS assertion: {name}")

print("PASS: conceptual master registry is coherent")
