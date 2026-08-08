# Professional Refactor Skill

`professional-refactor` is an agentic skill for the Antigravity IDE designed to analyze, restructure, and refactor whole GeoSource Tauri/Rust projects for maximum performance, security, architecture quality, and maintainability.

## Key Features

- **Whole-Project Analysis**: Scans Rust backend (`src-tauri/`), Svelte/TypeScript frontend (`src/`), configuration files, and workspace layout.
- **Web-Informed Modernization**: Conducts web searches (`search_web`) to check latest library standards, Rust crates, and Tauri v2 patterns.
- **Plan & Preview First**: Formulates a clear `implementation_plan.md` artifact showing proposed changes with exact diffs before touching any code.
- **Strict Quality Gates**: Executes build, lint, and test validation (`verify_refactor.ps1`) to ensure zero compilation or runtime errors.

## Trigger Phrases

- `"professional-refactor"`
- `"professional refactor"`
- `"refactor project architecture"`
- `"fix project layout"`
- `"refactor code for performance and security"`
- `"modernize project code"`
- `"examine and refactor codebase"`
- `"improve architecture"`

## Directory Structure

```
.agents/skills/professional-refactor/
├── SKILL.md                                 <- Core skill definition and workflow
├── README.md                                <- Human-readable overview
├── scripts/
│   ├── analyze_architecture.ps1            <- Architectural scanner script
│   └── verify_refactor.ps1                 <- Build & lint quality gate script
├── examples/
│   ├── README.md                            <- Usage guide for examples
│   ├── simple_refactor_proposal.md          <- Micro-refactoring proposal example
│   └── full_architecture_refactor_proposal.md <- Full project refactoring proposal
├── resources/
│   └── refactor_checklist.md                <- Code smell & architectural checklist
├── references/
│   ├── tauri_v2_refactoring_guide.md        <- Tauri v2 & Rust IPC best practices
│   └── performance_security_best_practices.md<- Security & spatial data perf guide
└── tests/
    └── test_validation.ps1                  <- Automated skill validation test suite
```
