# Skill Designer Pro

An autonomous skill-authoring assistant for Antigravity IDE that conducts structured
interviews and generates complete, production-ready skills for the GeoSource project.

## What It Does

When triggered, Skill Designer Pro:
1. **Interviews** the user using a structured grill-me questionnaire (9 questions)
2. **Selects** the optimal AI model based on skill complexity
3. **Generates** a complete skill folder with all required files and sub-directories
4. **Validates** the generated skill (YAML, file existence, syntax, dry-run, tests)
5. **Summarizes** the result with a full walkthrough artifact

## Trigger Phrases

- "create a skill"
- "design a skill"
- "build a new skill"
- "new skill"
- "make a skill"
- "skill designer"
- "add a skill"
- "generate a skill"
- "I need a skill for..."
- "create an agent capability"

## File Structure

```
skill-designer-pro/
├── SKILL.md                        <- Core agent instructions (this skill)
├── README.md                       <- This file
├── scripts/
│   ├── generate_skill.ps1          <- Scaffold a new skill from template
│   └── validate_skill.ps1          <- Validate a generated skill
├── examples/
│   ├── README.md                   <- Guide to using examples
│   └── example_skill/              <- Full reference implementation
│       ├── SKILL.md
│       ├── scripts/example.ps1
│       ├── resources/template.md
│       ├── references/guide.md
│       └── tests/test.ps1
├── resources/
│   └── skill_template.md           <- Master SKILL.md template
├── references/
│   └── skill_design_guide.md       <- Deep reference on skill architecture
└── tests/
    ├── test_validation.ps1         <- Automated test suite
    └── expected_outputs/           <- Expected output snapshots
        └── dry_run_example.txt
```

## Model Selection

| Complexity | When | Model |
|---|---|---|
| Simple | < 5 steps, no external tools | Default |
| Moderate | Multi-step, 1-2 scripts | Gemini 2.5 Pro (High) |
| Complex | Multi-script, cross-cutting | Claude Sonnet 4.6 (Thinking) |

## Usage

Just tell Antigravity IDE you want to create a skill. It will trigger automatically
and guide you through the full design interview.

## Project Context

Optimized for: **GeoSource** — a Tauri v2 desktop app (Rust backend, Svelte/TS frontend)
