#!/usr/bin/env python
"""Check research citations in a council session.

Usage:
  python .claude/skills/roast-room/scripts/check_research.py <session folder>

For every R### or F### id in the session prose, the id must exist in
research/sources.json and that record's status must be "opened". A quoted
passage with that id as its attribution, right after the closing quote, is
recognized with the same window check_quotes.py uses (20 to 400 characters,
at least 6 words after normalization) and must match that record's excerpt
under check_quotes.norm.

This catches a missing id, a cite that is not opened, and a misquote. It does
not decide whether the passage supports the claim. Exit 1 means at least one
finding. The Roast Room protocol treats that as a finding, not a failed council,
and does not rewrite cards to clear it.
"""
import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from check_quotes import norm

QUOTE_RE = re.compile(r"[\"“]([^\"“”\n]{20,400})[\"”]\s*,?\s*[\(\[]([RF]\d{3})")
ID_RE = re.compile(r"(?<![A-Za-z0-9])([RF]\d{3})(?!\d)")


def prose_files(session):
    found = []
    for name in ("brief.md", "draft-resolution.md", "verdict.md"):
        path = session / name
        if path.is_file():
            found.append(path)
    found.extend(sorted(session.glob("round-*.md")))
    research = session / "research"
    if research.is_dir():
        found.extend(sorted(p for p in research.rglob("*.md") if p.is_file()))
    unique = []
    seen = set()
    for path in found:
        if path not in seen:
            seen.add(path)
            unique.append(path)
    return unique


def load_records(path, findings):
    by_id = {}
    if not path.exists():
        return by_id
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        findings.append(("ledger", "research/sources.json", f"not valid JSON ({exc})"))
        return by_id
    records = data.get("records") if isinstance(data, dict) else None
    if not isinstance(records, list):
        findings.append(("ledger", "research/sources.json", "needs a records list"))
        return by_id
    for rec in records:
        if not isinstance(rec, dict):
            findings.append(("ledger", "research/sources.json", "a record is not an object"))
            continue
        rid = rec.get("id")
        if rid in (None, ""):
            continue
        if not isinstance(rid, str):
            findings.append(("ledger", "research/sources.json", "an id is not a string"))
            continue
        if rid in by_id:
            findings.append(("duplicate", "research/sources.json", rid))
            continue
        by_id[rid] = rec
    return by_id


def format_finding(item):
    kind = item[0]
    if kind == "misquote":
        _, rel, rid, quote = item
        return f'  FINDING misquote [{rel}] {rid} "{quote}"'
    if kind == "missing":
        _, rel, rid = item
        return f"  FINDING missing [{rel}] {rid}"
    if kind == "not-opened":
        _, rel, rid, status = item
        return f"  FINDING not-opened [{rel}] {rid} status={status}"
    if kind == "ledger":
        _, rel, detail = item
        return f"  FINDING ledger [{rel}] {detail}"
    if kind == "duplicate":
        _, rel, rid = item
        return f"  FINDING duplicate [{rel}] {rid}"
    return f"  FINDING {kind}"


def main():
    if len(sys.argv) != 2:
        print("usage: check_research.py <session folder>", file=sys.stderr)
        sys.exit(2)
    session = Path(sys.argv[1])
    if not session.is_dir():
        print(f"session folder not found: {session}", file=sys.stderr)
        sys.exit(2)

    findings = []
    by_id = load_records(session / "research" / "sources.json", findings)
    ids_checked = set()
    quotes_checked = 0

    for path in prose_files(session):
        rel = str(path.relative_to(session))
        text = path.read_text(encoding="utf-8", errors="replace")
        for quote, rid in QUOTE_RE.findall(text):
            folded = norm(quote)
            if len(folded.split()) < 6:
                continue
            quotes_checked += 1
            rec = by_id.get(rid)
            if rec is not None and rec.get("status") == "opened":
                excerpt = rec.get("excerpt")
                if not isinstance(excerpt, str) or folded not in norm(excerpt):
                    findings.append(("misquote", rel, rid, quote[:160]))
        for rid in ID_RE.findall(text):
            key = (rel, rid)
            if key in ids_checked:
                continue
            ids_checked.add(key)
            rec = by_id.get(rid)
            if rec is None:
                findings.append(("missing", rel, rid))
            elif rec.get("status") != "opened":
                findings.append(("not-opened", rel, rid, str(rec.get("status"))))

    print(
        f"research id cites checked: {len(ids_checked)}; "
        f"research quotes checked: {quotes_checked}; "
        f"findings: {len(findings)}"
    )
    for item in findings:
        print(format_finding(item))
    sys.exit(1 if findings else 0)


if __name__ == "__main__":
    main()
