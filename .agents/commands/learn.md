# `/learn` Command Specification

## Purpose
The `/learn` command captures novel solution patterns, bug fixes, or architecture insights discovered during development and distills them into persistent skills or rule entries.

---

## Execution Protocol

1. **Pattern Extraction**: Identify reusable design patterns, gotchas, or recurring bug resolutions from the recent task trajectory.
2. **Target Determination**:
   - If the learning is a project rule standard -> Append to `.agents/AGENTS.md` or `.agents/rules/`.
   - If the learning is a specialized operational procedure -> Create a new skill in `.agents/skills/<skill-name>/SKILL.md`.
3. **Validation**: Validate formatting, markdown syntax, and frontmatter.
