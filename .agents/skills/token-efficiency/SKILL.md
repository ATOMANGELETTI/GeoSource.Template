---
name: token-efficiency
description: >
  Fully autonomous AI token efficiency maximizer for Antigravity IDE agents.
  Activates silently when token conservation is needed, reshaping agent behavior
  to minimize token consumption while maintaining complete, professional output
  quality. Applies targeted tool strategies (grep over view, stubs over full
  reads, subagent delegation for DOM-heavy work) and produces an artifact report
  at task completion. Designed for the GeoSource Tauri/Rust project workspace
  on Windows/PowerShell.

triggers:
  - "optimize token usage"
  - "reduce token cost"
  - "token efficient"
  - "save tokens"
  - "I'm running low on tokens"
  - "compact mode"
  - "minimize AI cost"
  - "quota efficient"
  - "token budget"
  - "be concise"
---

# Token Efficiency Skill

> **You are a token-efficiency-first Antigravity IDE agent.** When this skill
> activates, you silently switch into Token-Efficient Mode (TEM). Every decision
> — which tool to call, how much context to load, how verbose to be — is governed
> by the heuristics in this document. You maintain full professionalism and
> completeness; you simply eliminate waste.

---

## Prerequisites

- **Shell**: PowerShell (Windows) — all scripts use `.ps1`
- **Workspace root**: `c:\Storage\Development\Projects\Tauri\GeoSource\GeoSource.Template\`
- **Project type**: Tauri v2 desktop app — Svelte/TypeScript frontend, Rust backend
- **Key agent tools available**: `view_file`, `grep_search`, `list_dir`,
  `run_command`, `write_to_file`, `read_url_content`, `browser_subagent`,
  `search_web`
- **Reference files** (read on demand — do NOT pre-load all):
  - `references/token_budget_heuristics.md`
  - `references/tool_call_overhead.md`
  - `references/geosource_structure_map.md`
  - `references/model_context_windows.md`
  - `references/skill_injection_guide.md`
  - `references/known_token_traps.md`

---

## Activation Protocol

When this skill is triggered, immediately and silently:

1. **Log activation internally** — do NOT announce mode change to the user unless
   they asked a question about your behavior.
2. **Apply all TEM rules below** for the remainder of the current task.
3. **Track phase token estimates** using the heuristics in
   `references/token_budget_heuristics.md`.
4. **Produce `token_efficiency_report.md`** in the artifact directory at task end.

---

## Step-by-Step Workflow

### Step 1 — Context Audit (Before Any Tool Calls)

Before loading anything, mentally audit what you already know:
- What files are open in the user's editor? (Available from metadata — zero cost.)
- What is the task scope? (Single file, feature, or cross-cutting?)
- Do any KI summaries cover this exact task?

**Decision gate**: Only proceed to load files if you cannot answer the task from
existing context. If you can answer without tool calls, do so.

### Step 2 — Minimal Discovery Phase

Use the lowest-cost discovery tools first:

| Need | Use This | NOT This |
|---|---|---|
| Know if a symbol exists | `grep_search` | `view_file` on full file |
| Understand directory structure | `list_dir` (one level) | Recursive `list_dir` + read all |
| Find a pattern in codebase | `grep_search` with `Includes` filter | Load every file |
| Check file size before reading | `run_command` — `(Get-Item path).Length` | `view_file` blindly |
| Read a large file (> 200 lines) | `view_file` with `StartLine`/`EndLine` | Full file read |
| Understand a full module | Generate a stub via `scripts/generate_stub.ps1` | Full file read |

**Rule**: Never call `list_dir` AND then `view_file` on every result. Scan first,
read only what's needed.

### Step 3 — Stub-First File Reading

For any file over 100 lines that you need structural awareness of:

1. Run `scripts/generate_stub.ps1 -FilePath <path>` to get signatures only.
2. Use the stub as context.
3. Only `view_file` specific line ranges if the stub reveals a section you need.

For files over 200 lines where you only need a pattern:
- Use `grep_search` with a targeted `Query` and `Includes` filters.
- Never read the full file for a single-symbol lookup.

### Step 4 — Browser & DOM Work

When browser interaction is needed:

- **Never** use `browser_subagent` to dump full page DOM for a single value.
- Delegate to `browser_subagent` with a **precise, scoped task** returning only
  the exact data needed.
- Example: Instead of "get the page content", use "extract the value of
  `#api-endpoint-url` from the settings page and return only that string."

### Step 5 — Documentation Lookup

When you need API or framework docs:

- Use `search_web` with a precise query targeting the specific API surface.
- Use `read_url_content` on the exact doc page (not the root docs site).
- Do NOT load an entire docs site to find one function signature.
- Prefer `references/` files in this skill — they are pre-compressed for GeoSource context.

### Step 6 — Response Discipline

In TEM, apply these output rules:

| Output Element | TEM Rule |
|---|---|
| Code blocks | Include only the changed section + minimal surrounding context |
| Explanations | One sentence per decision — no verbose rationale |
| File summaries | Use a 2-line summary, not a paragraph |
| Error messages | State the fix directly — no root-cause essays |
| Tool call results | Summarize the relevant part, don't echo full output |

### Step 7 — Task Completion Report

At the end of every task in TEM, produce `token_efficiency_report.md` in the
artifact directory. See **Output Specification** below.

---

## Output Specification

### Files Created
- **`token_efficiency_report.md`** (artifact dir) — per-phase token breakdown

### Files Modified
- None — TEM is behavioral only; it does not rewrite project source files.

### Behavioral Changes (silent, no files written)
- Stub-first reading strategy applied
- grep-before-view rule enforced
- Browser delegation scoped precisely
- Response verbosity reduced per TEM output rules

### Report Format

```markdown
# Token Efficiency Report

**Task**: <one-line task description>
**Mode**: Token-Efficient Mode (TEM) — activated by: "<trigger phrase>"
**Model**: <active model name>

## Phase Breakdown

| Phase | Tool Calls | Est. Tokens | Notes |
|---|---|---|---|
| Discovery | N | ~XXXX | grep_search used instead of view_file N times |
| Implementation | N | ~XXXX | Stubs used for N files |
| Documentation | N | ~XXXX | read_url_content scoped to exact pages |
| Response | — | ~XXXX | TEM verbosity rules applied |
| **Total** | **N** | **~XXXX** | |

## Savings Estimate

Baseline (non-TEM) estimated: ~XXXX tokens
TEM actual estimated: ~XXXX tokens
**Estimated savings: ~XXXX tokens (~XX%)**

## TEM Rules Applied

- [ ] grep-before-view enforced
- [ ] Stub-first reading for files > 100 lines
- [ ] Browser tasks scoped precisely
- [ ] Documentation lookups targeted
- [ ] Response verbosity reduced
```

---

## Error Handling

| Failure Condition | Action |
|---|---|
| `generate_stub.ps1` fails on a file type | Fall back to `view_file` with `StartLine`/`EndLine` range — log the fallback in report |
| `grep_search` returns 0 results on valid symbol | Widen query, then `view_file` targeted range — do not full-file read |
| `browser_subagent` returns more data than expected | Truncate to required fields before using in context |
| A reference file is missing | Continue without it — do not load alternative large files as substitutes |
| Token report cannot be generated | Log a one-line inline summary instead of skipping entirely |

---

## References

Read these only when the specific need arises — do NOT pre-load:

- [`references/token_budget_heuristics.md`](references/token_budget_heuristics.md) — Token estimates per file/tool type
- [`references/tool_call_overhead.md`](references/tool_call_overhead.md) — Per-tool token cost estimates
- [`references/geosource_structure_map.md`](references/geosource_structure_map.md) — Compressed GeoSource file index
- [`references/model_context_windows.md`](references/model_context_windows.md) — Context window limits per model
- [`references/skill_injection_guide.md`](references/skill_injection_guide.md) — How skill content is loaded into context
- [`references/known_token_traps.md`](references/known_token_traps.md) — Anti-patterns that silently inflate token usage
