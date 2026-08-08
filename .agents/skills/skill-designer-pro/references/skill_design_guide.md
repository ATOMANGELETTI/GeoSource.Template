# Skill Design Guide — Antigravity IDE

A comprehensive reference for designing high-quality skills for the Antigravity IDE system,
specifically tailored for the GeoSource Tauri/Rust project.

---

## 1. What Is a Skill?

A **skill** is a folder of instructions and supporting files that extends Antigravity IDE agent
capabilities for specialized tasks. When triggered by matching keywords in the user's request,
the agent reads the SKILL.md and follows its instructions exactly.

Anatomy of a skill:
```
<skill-name>/
├── SKILL.md         <- Required. Frontmatter + instruction body.
├── README.md        <- Human-readable overview.
├── scripts/         <- PowerShell/Python automation helpers.
├── examples/        <- Reference implementations.
├── resources/       <- Templates, assets, configs.
├── references/      <- Deep docs read on demand.
└── tests/           <- Validation scripts.
```

---

## 2. SKILL.md Structure

### YAML Frontmatter (Required)
```yaml
---
name: skill-name-lowercase-hyphenated
description: >
  Detailed description. Must explain:
  - What the skill does
  - When it triggers  
  - What it produces
  - Project context (GeoSource, Tauri, Rust)

triggers:
  - "exact phrase 1"
  - "exact phrase 2"
  # Minimum 5 triggers. Use varied phrasing.
---
```

### Body Rules
- Keep under 500 lines
- Start with a Role Statement (who the agent becomes)
- Use numbered steps — never vague prose
- Specify expected output for every step
- Include error handling for every critical operation
- Reference files in references/ for anything that exceeds 50 lines of context

---

## 3. Trigger Design

Good triggers are:
- **Specific enough** to not cause false positives
- **Varied enough** to catch all natural phrasings
- **Action-oriented** ("create X", "build X", "debug X")

Bad triggers:
- Too generic: "build" (triggers on everything)
- Too specific: "create the GeoSource Tauri release bundle on Windows x64" (never triggered)

Minimum: 5 triggers. Recommended: 8-12.

---

## 4. Workflow Design

### Granularity
Each step should be:
- **Atomic**: does exactly one thing
- **Verifiable**: has a clear success/failure signal
- **Recoverable**: includes error handling

### Tool Selection Reference

| Tool | When to Use |
|---|---|
| `run_command` | Shell commands, PowerShell scripts, cargo/npm/tauri |
| `view_file` | Reading source files before editing |
| `write_to_file` | Creating new files (artifacts only) |
| `multi_replace_file_content` | Editing multiple non-adjacent sections |
| `replace_file_content` | Editing a single contiguous block |
| `grep_search` | Finding patterns across the codebase |
| `list_dir` | Exploring directory structure |
| `search_web` | Finding documentation, crates, packages |
| `browser_subagent` | Visual browser interaction |
| `ask_question` | Clarifying ambiguity, grill-me interviews |

### GeoSource-Specific Commands

```powershell
# Rust / Cargo
cargo build                          # Debug build
cargo build --release                # Release build
cargo test                           # Run all tests
cargo clippy -- -D warnings          # Lint with warnings as errors
cargo fmt                            # Format code

# Tauri
cargo tauri dev                      # Start dev server
cargo tauri build                    # Build app bundle
cargo tauri icon <image>             # Generate icons

# Frontend
npm run dev                          # Vite dev server
npm run build                        # Production bundle
npm run check                        # Svelte type check
```

---

## 5. Script Design (PowerShell)

### Required Header
Every script must start with:
```powershell
[CmdletBinding()]
param(...)
Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
```

### Exit Codes
- `0` — Success
- `1` — Validation failure or expected error
- `2` — Fatal error (environment misconfigured)

### Output conventions
```powershell
Write-Host "[INFO] message"    -ForegroundColor Cyan
Write-Host "[PASS] check"      -ForegroundColor Green
Write-Host "[FAIL] check"      -ForegroundColor Red
Write-Host "[WARN] advisory"   -ForegroundColor Yellow
Write-Error "fatal error"      # Always use for fatal conditions
```

---

## 6. Model Selection Guide

| Skill Complexity | Characteristics | Recommended Model |
|---|---|---|
| **Simple** | Single-domain, < 5 steps, one tool | Default |
| **Moderate** | 5-10 steps, 2-3 tools, 1-2 scripts | Gemini 2.5 Pro (High) |
| **Complex** | Multi-domain, > 10 steps, custom protocols | Claude Sonnet 4.6 (Thinking) |

Complexity is assessed **after** the interview, based on scope and interconnectedness.

---

## 7. Validation Checklist

Before publishing a skill, verify:

### YAML
- [ ] name is lowercase-hyphenated
- [ ] description is ≥ 2 paragraphs
- [ ] triggers has ≥ 5 entries with varied phrasing
- [ ] No YAML syntax errors

### Files
- [ ] All files referenced in SKILL.md body exist
- [ ] All .ps1 scripts pass PowerShell syntax check
- [ ] No broken relative paths

### Workflow
- [ ] Every step is numbered and atomic
- [ ] Every step has expected output
- [ ] Every step has error handling

### Tests
- [ ] tests/test_validation.ps1 exists and passes
- [ ] Exit code is 0 on clean run

---

## 8. Common Mistakes

| Mistake | Fix |
|---|---|
| Trigger too vague | Add domain-specific terms |
| Missing error handling | Add "On failure:" to every step |
| SKILL.md over 500 lines | Move deep docs to references/ |
| Script without StrictMode | Add Set-StrictMode -Version Latest |
| No expected output per step | Add "Expected output:" after each action |
| name with spaces or uppercase | Use lowercase-hyphenated format |

---

## 9. GeoSource Project Reference

### Key Files
- `src-tauri/tauri.conf.json` — Tauri configuration
- `src-tauri/Cargo.toml` — Rust dependencies
- `src-tauri/src/main.rs` — Tauri entry point
- `src-tauri/src/lib.rs` — Tauri command definitions
- `src/routes/` — Svelte page routes
- `src/lib/` — Shared Svelte components and utilities
- `package.json` — Frontend dependencies and scripts
- `.agents/` — All Antigravity IDE configuration

### Environment
- OS: Windows 11
- Shell: PowerShell 7+
- Rust: stable toolchain
- Node: v20+
- Package manager: npm or pnpm
