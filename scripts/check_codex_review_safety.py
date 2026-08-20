#!/usr/bin/env python3
"""Dependency-free static checks for the fail-safe Codex workflow."""

from pathlib import Path
import re

workflow = Path(__file__).resolve().parents[1] / ".github/workflows/codex-auto-merge.yml"
text = workflow.read_text(encoding="utf-8")
protected = re.compile(
    r"(^|/)(\.github/|security/|SECURITY(\.md)?$|CODEOWNERS$|"
    r"[^/]*(credential|secret|token|certificate|provision)[^/]*$|eas\.json$|"
    r"app\.json$|app\.config\.[^/]+$|Expo\.plist$|Podfile(\.lock)?$|"
    r"[^/]*\.entitlements$|[^/]*\.(p8|p12|pem|key|mobileprovision)$|"
    r"fastlane/|ios/)|(^|/)[^/]*(testflight|signing)[^/]*$", re.IGNORECASE)


def eligible(*, draft=False, author="UnNickk76", same_repo=True,
             base="main", branch="codex/change", sensitive=False):
    return (not draft and author == "UnNickk76" and same_repo and
            base == "main" and branch.startswith("codex/") and not sensitive)


scenarios = {
    "review_not_started": eligible(),
    "review_clean": eligible(),
    "review_with_p1_p2": eligible(),
    "unresolved_thread": eligible(),
    "draft": eligible(draft=True),
    "fork": eligible(same_repo=False),
    "different_author": eligible(author="other"),
    "sensitive_file": eligible(sensitive=bool(protected.search(".github/workflows/x.yml"))),
}
assert scenarios == {
    "review_not_started": True, "review_clean": True,
    "review_with_p1_p2": True, "unresolved_thread": True,
    "draft": False, "fork": False, "different_author": False,
    "sensitive_file": False,
}

# The first four may validate, but none can merge: no write permission/command.
for forbidden in ("contents: write", "pull-requests: write", "gh pr merge", "--auto"):
    assert forbidden not in text, forbidden
for required in (
    "permissions: {}", "contents: read", "pull-requests: read",
    "github.event.pull_request.draft == false",
    "github.event.pull_request.user.login == 'UnNickk76'",
    "github.event.pull_request.head.repo.full_name == github.repository",
    "github.event.pull_request.base.ref == 'main'",
    "startsWith(github.event.pull_request.head.ref, 'codex/')",
    "for check in lint typecheck test build",
):
    assert required in text, required
assert protected.pattern in text
print("PASS: 8 scenarios; read-only permissions, paths and checks preserved")
