# Always Beautiful Skill (`always-beautiful`)

`always-beautiful` is an autonomous UI/UX visual polish skill for GeoSource Tauri applications. It ensures all UI components feature rich aesthetics, custom color palettes, sleek glassmorphism depth, modern typography, dynamic micro-animations, and responsive interaction feedback.

## Directory Overview

```text
.agents/skills/always-beautiful/
├── SKILL.md                              <- Main skill instruction definition & YAML frontmatter
├── README.md                             <- Skill documentation and usage overview
├── scripts/
│   ├── audit_ui_aesthetics.ps1           <- PowerShell tool auditing frontend files for aesthetic gaps
│   └── inject_design_tokens.ps1          <- PowerShell tool injecting CSS variables & animation keyframes
├── references/
│   ├── aesthetic_standards.md            <- Typography, glassmorphism, color palette, and contrast rules
│   └── motion_and_microinteractions.md   <- Keyframe animation, cubic-bezier timing, and state specs
├── examples/
│   ├── README.md                         <- Guide to example components
│   ├── minimal/BeforeAfterComponent.svelte <- Minimal unpolished vs polished component comparison
│   └── dashboard/PolishedDashboard.svelte  <- Complete polished desktop dashboard layout
├── resources/
│   └── skill_template.md                 <- Aesthetic audit & polish report template
└── tests/
    └── test_validation.ps1               <- Automated PowerShell validation test suite
```

## How to Trigger

Trigger this skill automatically by using any of the following natural language triggers in your prompt:

- `"always beautiful"`
- `"always-beautiful"`
- `"ui visual polish"`
- `"beautiful ui"`
- `"make it look amazing"`
- `"enhance ui aesthetics"`
- `"add polish and animations"`
- `"check design quality"`

## Quick Start Validation

To run the automated validation test suite:

```powershell
powershell.exe -ExecutionPolicy Bypass -File .agents/skills/always-beautiful/tests/test_validation.ps1
```
