---
name: token-quality-auditor
description: Audits workspace code quality, token conservation, link integrity, and security compliance. Trigger on /audit command or pre-release verification.
---

# Token & Quality Auditor Skill

## Overview
This skill provides operational guidance for conducting token efficiency audits, checking workspace link integrity, and verifying compliance with workspace rules in `AGENTS.md`.

---

## Directives

1. **Token Efficiency Gate**:
   - Verify `grep_search` is prioritized over `view_file`.
   - Verify file views omit redundant lines using line range bounds.

2. **Link Integrity Audit**:
   - Run `node .agents/scripts/validate-agents.js` to ensure all `file:///` URLs point to valid existing workspace paths.

3. **Code Quality Gate**:
   - Check that all Rust functions have doc comments (`///`).
   - Check that all unsafe blocks contain explicit `// SAFETY:` rationale comments.
