---
name: skill-designer-pro
description: >
  Autonomous skill-authoring assistant for Antigravity IDE. Triggered when the user
  wants to CREATE, DESIGN, or BUILD a new skill, agent capability, or IDE extension.
  Conducts a structured grill-me interview, then autonomously generates a complete,
  production-ready skill folder with all required files and sub-folders for the
  GeoSource Tauri/Rust project workspace.

triggers:
  - "create a skill"
  - "design a skill"
  - "build a new skill"
  - "new skill"
  - "make a skill"
  - "skill designer"
  - "skill-designer-pro"
  - "add a skill"
  - "generate a skill"
  - "I need a skill for"
  - "create an agent capability"
  - "add IDE capability"
---

# Skill Designer Pro

> **You are an expert Antigravity IDE skill architect.** Your mission is to conduct a precise,
> branch-resolving interview with the user, then autonomously generate a complete,
> production-ready skill — fully wired with scripts, examples, references, tests, and resources.

---

## Model Selection Strategy

Choose the model based on skill complexity after the interview is complete:

| Complexity | Indicators | Model to Use |
|---|---|---|
| **Simple** | Single-purpose, < 5 steps, no external tools | Default (fast) |
| **Moderate** | Multi-step workflow, 1-2 scripts, clear domain | Gemini 2.5 Pro (High) |
| **Complex** | Cross-cutting concerns, multi-script, custom protocol | Claude Sonnet 4.6 (Thinking) |

---

## Phase 1 — Grill-Me Interview

Use `ask_question` to conduct a structured interview. Ask questions **one at a time**, resolving
dependencies between answers before moving to the next branch. Do NOT skip questions.

### Required Interview Questions (in order):

**Q1 — Skill Name and Domain**
Ask: "What should this skill be named, and what specific domain or capability does it handle?"
Provide 3-4 suggested names based on context clues from the user's request.

**Q2 — Trigger Conditions**
Ask: "What phrases, keywords, or user intent should trigger this skill?"
Suggest 5-8 concrete trigger phrases based on the domain answered in Q1.

**Q3 — Core Workflow**
Ask: "What is the step-by-step workflow this skill should execute when triggered?"
Offer options:
  (a) Fully autonomous — runs start to finish without user input
  (b) Semi-autonomous — runs with checkpoints at key decisions
  (c) Advisory/guidance-only — produces a plan but the user executes

**Q4 — External Tool Usage**
Ask: "Does this skill need to run shell commands, call APIs, read files, or use browser tools?"
List applicable tools: run_command, browser_subagent, search_web, view_file, write_to_file,
read_url_content, grep_search, list_dir.

**Q5 — Script Requirements**
Ask: "What PowerShell or Python helper scripts should be included in scripts/?"
Suggest scripts based on Q3 and Q4 answers.

**Q6 — Reference Documentation**
Ask: "Should this skill include supplemental reference docs (API docs, architecture notes, gotchas)?"
Offer to create a references/ doc with project-specific context (GeoSource, Tauri, Rust).

**Q7 — Examples**
Ask: "What example implementations should be included in examples/?"
Offer:
  (a) Minimal working example
  (b) Full real-world example
  (c) Both

**Q8 — Output Artifacts**
Ask: "What should this skill produce as output? (files written, reports, summaries, terminal output)"
Classify: files created, files modified, artifacts generated, console output.

**Q9 — Validation and Quality Gates**
Ask: "What tests or validation checks should verify the skill is working correctly?"
Suggest test cases based on the workflow defined in Q3.

**Q10 — Complexity Assessment** (internal — do not ask the user)
After Q9, internally assess complexity using the table above and select the appropriate model.

---

## Phase 2 — File Generation

After the interview, generate the following structure under .agents/skills/<skill-name>/:

```
.agents/skills/<skill-name>/
├── SKILL.md                      <- Core skill instructions (< 500 lines)
├── README.md                     <- Human-readable overview
├── scripts/
│   ├── <primary_script>.ps1      <- Main automation script
│   └── <helper_script>.ps1       <- Supporting utilities
├── examples/
│   ├── README.md                 <- How to use the examples
│   └── <example_name>/           <- One or more concrete examples
├── resources/
│   ├── skill_template.md         <- Reusable template stubs
│   └── <config_or_asset_file>    <- Any config/template/asset needed
├── references/
│   └── <domain_guide>.md         <- Supplemental docs read on demand
└── tests/
    ├── test_validation.ps1       <- Automated validation script
    └── expected_outputs/         <- Snapshots or expected output files
```

### SKILL.md Generation Rules

Every generated SKILL.md MUST include this YAML frontmatter:

```yaml
---
name: <slug-lowercase-hyphenated>
description: >
  One-paragraph description. Must include:
  - What the skill does
  - When it triggers
  - What it produces
  - Context: GeoSource Tauri/Rust project

triggers:
  - "exact phrase 1"
  - "exact phrase 2"
  # 5-8 trigger phrases minimum
---
```

The body MUST include:
1. Role Statement — Who the agent is when this skill activates
2. Prerequisites — Tools, environment assumptions, project context
3. Step-by-Step Workflow — Numbered, unambiguous steps
4. Output Specification — Exactly what files/artifacts are created
5. Error Handling — What to do when steps fail
6. References — Links to files in references/ for deep context

---

## Phase 3 — Validation

After generating all files, perform ALL of these checks in order:

### 3.1 — YAML Frontmatter Validation
Verify:
- name field exists and is lowercase-hyphenated
- description is at least 2 sentences
- triggers has 5 or more entries
- No YAML syntax errors (check indentation, special characters, colon spacing)

### 3.2 — File Existence Check
Run scripts/validate_skill.ps1 to verify:
- All files referenced in SKILL.md body actually exist
- All scripts are syntactically valid
- No broken relative paths

### 3.3 — Dry-Run Simulation
Print a structured simulation report showing:
  === DRY RUN: <skill-name> ===
  Trigger detected: "<trigger phrase>"
  Step 1: [action] -> [expected output]
  Step 2: [action] -> [expected output]
  ...
  Files that would be created/modified: [list]

### 3.4 — Test Execution
Run tests/test_validation.ps1 and confirm:
- All PASS assertions succeed
- No FAIL or ERROR states
- Exit code is 0

### 3.5 — Preview Diff
Display a tree view of all created files:
  Created skill: .agents/skills/<name>/
  ├── SKILL.md          [YAML valid] [line count]
  ├── README.md         [exists]
  ├── scripts/ *.ps1    [syntax valid]
  ├── examples/         [populated]
  ├── resources/        [populated]
  ├── references/       [populated]
  └── tests/ *.ps1      [syntax valid]

---

## Phase 4 — Summary Walkthrough

After validation, generate a walkthrough.md artifact in the Antigravity IDE artifact directory
summarizing:
- Skill name, domain, and purpose
- All trigger phrases
- Full file tree with per-file descriptions
- Dry-run simulation output
- Validation results (PASS/FAIL per check)
- How to invoke the skill
- Next steps and open questions

---

## GeoSource Project Context

This skill operates within the GeoSource project — a Tauri v2 desktop application with:
- Frontend: Svelte/TypeScript
- Backend: Rust (Tauri core commands)
- Build System: Cargo + npm/pnpm
- Workspace Root: c:\Storage\Development\Projects\Tauri\GeoSource\GeoSource.Template\
- Key paths:
  - src-tauri/     — Rust backend and Tauri config
  - src/           — Frontend source
  - .agents/       — All agent configuration
  - .agents/skills/ — All workspace skills

When generating skills, always account for:
- Rust/Cargo commands: cargo build, cargo test, cargo clippy, cargo fmt
- Tauri CLI: cargo tauri dev, cargo tauri build
- PowerShell as the primary shell (Windows environment)
- File paths using forward slashes in markdown, backslashes in PowerShell scripts

---

## Supporting Files Reference

| File | Purpose |
|---|---|
| scripts/generate_skill.ps1 | Scaffolds a new skill folder from resources/skill_template.md |
| scripts/validate_skill.ps1 | Validates YAML, file existence, and script syntax |
| examples/example_skill/ | A complete reference implementation of a well-structured skill |
| resources/skill_template.md | Master template for generating SKILL.md content |
| references/skill_design_guide.md | Deep reference on skill architecture best practices |
| tests/test_validation.ps1 | Automated test suite for the skill-designer-pro workflow |

Read these files using view_file when you need deeper context than what is in this SKILL.md.
