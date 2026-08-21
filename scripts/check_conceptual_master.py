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

def ids(prefix):
    return re.findall(rf"^\| \[[ x]\] \| `({prefix}\d+)` \|", master, re.MULTILINE)

expected = {"V": 51, "E": 47, "U": 31, "C": 6}
for prefix, count in expected.items():
    found = ids(prefix)
    if len(found) != count or len(set(found)) != count:
        raise SystemExit(
            f"FAIL {prefix}: expected {count} unique rows, got {len(found)} rows/{len(set(found))} unique"
        )
    print(f"PASS {prefix}: {count} unique rows")

checked = re.findall(r"^\| \[x\] \|", master, re.MULTILINE)
if checked:
    raise SystemExit(f"FAIL: {len(checked)} product rows marked complete without runtime evidence")
print("PASS completion state: no product feature falsely marked complete")

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
