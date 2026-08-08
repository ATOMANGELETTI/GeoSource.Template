# Fullstack Testing Suite Skill

An autonomous testing architecture and code generator skill for GeoSource Tauri desktop applications.

## Overview

The `fullstack-testing-suite` skill provides end-to-end testing automation across the GeoSource fullstack:
- **Rust Backend**: Unit tests, Tokio async command tests, state mock harnesses, error serialization validation.
- **TypeScript Frontend**: Vitest unit/component tests, `@tauri-apps/api/core` invoke mocks, React component interaction tests.
- **Quality Assurance**: Automated script execution (`run_fullstack_tests.ps1`), 80% coverage threshold enforcement (`verify_coverage.ps1`), and structured markdown reporting.

## Directory Layout

```
fullstack-testing-suite/
├── SKILL.md                          <- Main skill instructions & trigger definition
├── README.md                         <- Skill documentation
├── scripts/
│   ├── run_fullstack_tests.ps1       <- Runs Cargo tests and Vitest suites
│   ├── scaffold_test_suite.ps1       <- Scaffolds Rust & TS test boilerplate
│   └── verify_coverage.ps1           <- Verifies test coverage metrics (80% gate)
├── examples/
│   ├── README.md                     <- Examples documentation
│   ├── minimal/                      <- Basic Rust and TS test stubs
│   └── realworld_tauri_ipc/          <- Full Tauri IPC handler & TS wrapper tests
├── resources/
│   ├── skill_template.md             <- Reusable skill template
│   ├── vitest_template.test.ts       <- Vitest test template
│   └── cargo_test_template.rs        <- Cargo unit test template
├── references/
│   └── testing_architecture_guide.md <- Deep testing guide & best practices
└── tests/
    ├── test_validation.ps1           <- Validation test for skill integrity
    └── expected_outputs/             <- Expected output snapshots
```

## How to Trigger

Trigger this skill in Antigravity IDE by requesting:
- `"create unit tests for module X"`
- `"generate test suite for Tauri IPC commands"`
- `"add Vitest tests for frontend components"`
- `"add Rust cargo tests"`
- `"run fullstack testing suite"`
