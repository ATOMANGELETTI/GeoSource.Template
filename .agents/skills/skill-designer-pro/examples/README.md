# Examples Directory — Skill Designer Pro

## Overview

This directory contains reference implementations showing how a well-structured
Antigravity IDE skill should look. Use these as a starting point when skill-designer-pro
generates a new skill for you.

## example_skill/

**Name**: cargo-health-check  
**Domain**: Rust/Tauri Code Quality  
**Complexity**: Simple (no external tools needed beyond cargo)

A fully working example showing:
- Correct YAML frontmatter structure
- Clear step-by-step workflow with expected outputs
- Error handling for every critical operation
- A helper PowerShell script in scripts/
- A reference doc in references/
- A test in tests/

### File Structure
```
example_skill/
├── SKILL.md                          <- Well-formed SKILL.md with frontmatter
├── scripts/
│   └── run_health_check.ps1          <- Runnable cargo health check
├── resources/
│   └── notes.md                      <- Placeholder resources note
├── references/
│   └── cargo_commands.md             <- Cargo command reference
└── tests/
    └── test_example.ps1              <- Structure validation test
```

## How to Use These Examples

1. Read `example_skill/SKILL.md` — notice the YAML structure and body format
2. Run `example_skill/tests/test_example.ps1` to see a passing test suite
3. Compare with `resources/skill_template.md` for the template version
4. When skill-designer-pro generates your new skill, it will follow this same pattern
