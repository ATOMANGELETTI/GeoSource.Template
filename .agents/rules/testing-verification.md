# Testing & Verification Standard

This document defines the mandatory test coverage requirements, verification gates, and quality assurance processes for all code contributions in this repository. Tests are not optional — they are a first-class deliverable equal to the feature or fix itself.

---

## Pillar 1: Unit Test Requirements

- **Test-With-Code Rule**: Every new public function, method, Tauri command handler, or utility added to this codebase MUST be accompanied by at least one unit test in the same PR/commit.
- **Coverage Threshold**: The repository must maintain a minimum of **80% line coverage** across all Rust crates and TypeScript modules. A new contribution that drops coverage below this threshold must include additional tests to compensate.
- **Test File Co-location**:
  - Rust: Tests live in a `#[cfg(test)]` module at the bottom of the source file, or in a `tests/` directory adjacent to the source.
  - TypeScript: Test files live adjacent to the source file with a `.test.ts` or `.spec.ts` suffix.
- **Test Naming Convention**: Test names must be descriptive and follow the `it_should_<behavior>_when_<condition>` pattern for Rust, and `describe / it` blocks for TypeScript/Vitest.

---

## Pillar 2: Integration Test Requirements

- **IPC Command Coverage**: Every `#[tauri::command]` handler MUST have at least one integration test exercising the full frontend-to-backend call path.
- **Happy Path + Error Path**: Integration tests must cover both the successful case and at least one meaningful failure/error branch.
- **Test Isolation**: Integration tests must not depend on shared mutable state, network availability, or filesystem side effects from other tests. Use `tempdir` or mock providers as appropriate.

---

## Pillar 3: Regression Tests

- **Bug Fix Rule**: Every bug fix MUST be accompanied by a regression test that:
  1. Fails against the code before the fix is applied.
  2. Passes after the fix is applied.
- **Regression Test Naming**: Name regression tests with a reference to the issue: `test_regression_issue_<number>_<short_description>`.
- **Regression Test Location**: Place regression tests in `tests/regression/` within the relevant crate or module.

---

## Pillar 4: Snapshot & UI Component Tests

- **UI Snapshot Tests**: All UI components that render deterministic output must have snapshot/golden-file tests.
- **Playwright Visual Snapshot Verification**: All UI changes, layout fixes, styling updates, and visual features MUST be verified using Playwright visual tests (`npm run test:visual`). The agent MUST run visual tests to visually verify that what was asked to be fixed was actually fixed without visual regressions.
- **Snapshot Update Policy**: Snapshot files (`*.png`, `*.snap`) must be committed to the repository (`tests/visual/__snapshots__/`). When updating baseline visual snapshots after intentional UI modifications, run `npm run test:visual:update`. Snapshot updates require explicit verification — never auto-accept diffs blindly.
- **Visual Regression**: For significant UI changes, capture before/after screenshots and embed them in the `walkthrough.md` artifact.

---

## Pillar 5: Mandatory Pre-Completion Test Gate

Before any task is marked complete, the agent MUST run and verify the following pass with zero failures:

| Command | Scope | Requirement |
|---------|-------|-------------|
| `cargo test --workspace` | All Rust crates | Zero test failures |
| `npm test` / `pnpm test` | Frontend | Zero test failures |
| `npm run test:visual` | Playwright UI & Visual | Zero visual regressions |
| `cargo clippy -- -D warnings` | All Rust crates | Zero warnings |
| `npm run lint` | Frontend TypeScript | Zero errors |
| `cargo tarpaulin --out Lcov` (or equivalent) | Coverage | ≥ 80% line coverage |

- **No Skipping**: If a test suite cannot be run due to environment constraints, this must be explicitly stated in the task summary with justification. The user must acknowledge the skip.
- **Flaky Test Policy**: If a test fails intermittently, it must be investigated and either fixed or marked with `#[ignore]` (with a tracking issue comment) — never silently retried until it passes.
