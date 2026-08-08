# Skill Context Injection Guide

How Antigravity IDE loads skill content into agent context, and how to
minimize the token cost of skill activation.

---

## How Skills Are Loaded

When a trigger phrase is detected, the IDE:

1. Matches the trigger against all skill `triggers:` arrays (YAML frontmatter)
2. Loads the **full SKILL.md body** into the system prompt context
3. Does NOT automatically load files in `references/`, `scripts/`, or `examples/`
4. The agent must explicitly call `view_file` to load reference files

**Critical implication**: The SKILL.md body is ALWAYS loaded when a skill
activates, regardless of whether those sections are relevant to the current task.

---

## Token Cost of Skill Activation

| Skill File Size | Est. Tokens Injected | Notes |
|---|---|---|
| < 5 KB | < 1,250 | Low overhead |
| 5–10 KB | 1,250–2,500 | Acceptable |
| 10–20 KB | 2,500–5,000 | Getting expensive |
| > 20 KB | > 5,000 | **Refactor required** — split into references/ |

**The 500-line rule**: SKILL.md bodies must stay under 500 lines. This is not
arbitrary — at ~5 chars/line average, 500 lines ≈ 2,500 chars ≈ ~625 tokens
plus code blocks which are denser. Beyond 500 lines, split into `references/`.

---

## What to Keep in SKILL.md vs. References

### Keep in SKILL.md (always loaded, high signal)
- Role statement
- Trigger conditions
- Core step-by-step workflow (concise)
- Decision tables (tool selection, thresholds)
- Error handling rules
- References list (just filenames, not content)

### Move to references/ (loaded on demand, low frequency)
- Detailed architectural context
- Full API reference tables
- Historical decision rationale
- Extended examples
- Background reading
- Verbose error logs or debugging history

---

## Optimization Strategies

### 1 — Frontmatter-Only Loading
Skills are matched by their YAML frontmatter `name` and `description` only.
The body is loaded AFTER matching. This means:
- Keep frontmatter `description` to 3–5 sentences max
- Do not repeat the description verbatim in the body intro

### 2 — Conditional Reference Loading
Structure SKILL.md so the agent reads references only when needed:

```markdown
## References
Read ONLY when the specific need arises:
- `references/deep_context.md` — Read when implementing X
- `references/api_details.md` — Read when calling Y API
```

### 3 — Section Tagging for Pruning
Tag verbose sections so `prune_skill_context.ps1` can remove them:

```markdown
<!-- prune: true -->
This section contains verbose background that is rarely needed...
<!-- prune: end -->
```

### 4 — Stub the Examples
Never paste full code examples directly in SKILL.md. Reference them:

```markdown
## Examples
See `examples/geosource_full_example/` for a complete walkthrough.
```

---

## Multi-Skill Activation Cost

When multiple skills activate simultaneously (e.g., `modern-web-guidance` +
`token-efficiencie`), their bodies stack in context:

- 2 skills × 2,000 tokens each = 4,000 tokens before any work begins
- 5 skills active = potentially 10,000+ tokens of overhead

**TEM Rule**: In multi-skill sessions, explicitly note which references you
are NOT loading to track budget. Avoid triggering skills you don't need.
