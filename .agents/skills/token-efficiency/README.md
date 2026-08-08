# token-efficiencie

**A fully autonomous token efficiency maximizer for Antigravity IDE agents.**

When triggered by phrases like "save tokens", "compact mode", or "optimize token usage", this skill silently activates Token-Efficient Mode (TEM) — reshaping how the agent discovers, reads, and responds to tasks to minimize quota consumption while maintaining complete, professional quality.

---

## What It Does

- **Enforces grep-before-view**: Searches for symbols before loading full files
- **Stub-first reading**: Generates code signatures for large files instead of reading them in full
- **Scoped browser tasks**: Delegates browser work with precise return requirements — no DOM dumps
- **Targeted documentation**: Reads specific doc pages rather than entire doc sites
- **Response discipline**: Applies structured verbosity rules to keep outputs tight
- **Produces a report**: Generates `token_efficiency_report.md` at task end with per-phase estimates and savings

---

## Trigger Phrases

```
"optimize token usage"   "reduce token cost"       "token efficient"
"save tokens"            "I'm running low on tokens" "compact mode"
"minimize AI cost"       "quota efficient"          "token budget"
"be concise"
```

---

## File Structure

```
.agents/skills/token-efficiencie/
├── SKILL.md                          ← Core skill instructions (this skill)
├── README.md                         ← This file
├── scripts/
│   ├── analyze_context_size.ps1      ← Estimates token consumption from file sizes
│   ├── compress_references.ps1       ← Strips verbose content from reference files
│   ├── generate_stub.ps1             ← Extracts signatures/stubs from source files
│   ├── token_budget_report.ps1       ← Per-file token cost breakdown
│   └── prune_skill_context.ps1       ← Removes low-signal content from skill files
├── examples/
│   ├── README.md                     ← How to use the examples
│   ├── minimal_example/              ← Simple TEM activation scenario
│   └── geosource_full_example/       ← Full Tauri command task with before/after analysis
├── resources/
│   ├── skill_template.md             ← Reusable template stub for SKILL.md generation
│   └── tem_rules_cheatsheet.md       ← Quick-reference TEM decision table
├── references/
│   ├── token_budget_heuristics.md    ← Token estimates per file/tool type
│   ├── tool_call_overhead.md         ← Per-tool token cost estimates
│   ├── geosource_structure_map.md    ← Compressed GeoSource file index
│   ├── model_context_windows.md      ← Context window limits per model
│   ├── skill_injection_guide.md      ← How SKILL.md content is injected into context
│   └── known_token_traps.md          ← Anti-patterns that silently inflate token usage
└── tests/
    ├── test_validation.ps1           ← Automated test suite
    └── expected_outputs/
        └── sample_report.md          ← Expected token_efficiency_report.md format
```

---

## How to Invoke

Simply use any trigger phrase in your message to the agent:

```
"Save tokens — add a Tauri command for loading GeoJSON files."
"Token efficient: refactor the map_state module."
"Compact mode: generate a Svelte component for the layer panel."
```

The skill activates automatically. You'll see no announcement — just faster,
leaner execution and a `token_efficiency_report.md` artifact at the end.

---

## Complexity

**Complex** — cross-cutting behavioral skill operating across all tool domains.
Recommended model: **Claude Sonnet 4.6 (Thinking)**.
