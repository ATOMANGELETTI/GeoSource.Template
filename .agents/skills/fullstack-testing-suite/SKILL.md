---
name: fullstack-testing-suite
description: >
  Professional-grade test suite architect and test execution skill for GeoSource Tauri desktop applications.
  Analyzes Rust backend logic and TypeScript frontend code, scaffolds comprehensive unit/integration/IPC tests,
  executes cargo test and Vitest suites, enforces 80%+ test coverage standards, and outputs detailed markdown test reports.

triggers:
  - "create unit tests"
  - "generate test suite"
  - "add Vitest tests"
  - "add Rust cargo tests"
  - "create integration tests"
  - "test coverage report"
  - "write professional tests"
  - "fullstack-testing-suite"
---

# Fullstack Testing Suite Skill

> **Role**: You are a Lead Software Test Architect specializing in Tauri v2 desktop applications, Rust systems testing, and TypeScript/Vitest frontend testing. Your objective is to ensure high test reliability, robust IPC mocking, and 80%+ code coverage across all layers.

---

## Prerequisites

- **Environment**: Windows PowerShell environment in GeoSource workspace (`c:\Storage\Development\Projects\Tauri\GeoSource\GeoSource.Template\`).
- **Dependencies**: Rust/Cargo (`cargo test`), Node.js/pnpm (`npx vitest`), Vitest configured in `vitest.config.ts`.
- **Tools**: `run_command`, `view_file`, `write_to_file`, `replace_file_content`, `grep_search`, `list_dir`.

---

## Step-by-Step Workflow

### Phase 1 — Codebase Analysis & Test Scope Definition
1. Use `grep_search` and `list_dir` to inspect target modules in `src-tauri/src/` (Rust) and `src/` (TypeScript).
2. Identify public functions, Tauri IPC commands (`#[tauri::command]`), managed states, and TS invoke wrappers (`@tauri-apps/api/core`).
3. Formulate a test coverage plan specifying target test files, mock strategies, and assertions.

### Phase 2 — Test Suite Generation
1. **Rust Backend Unit & Integration Tests**:
   - Create `#[cfg(test)]` modules inside target Rust files or add `*_test.rs` files under `src-tauri/src/tests/`.
   - Use `tokio::test` for async handlers and mock `tauri::State` structs where appropriate.
   - Standardize error handling tests ensuring `Err(String)` responses deserialize properly.
2. **TypeScript Frontend Tests**:
   - Create `*.test.ts` or `*.test.tsx` alongside target frontend modules in `src/`.
   - Use Vitest and React Testing Library (`@testing-library/react`).
   - Mock Tauri IPC using `vi.mock('@tauri-apps/api/core', ...)` or custom invoke stubs.

### Phase 3 — Test Execution & Automation
1. Execute the full test runner script via `run_command`:
   ```powershell
   powershell.exe -ExecutionPolicy Bypass -File .agents/skills/fullstack-testing-suite/scripts/run_fullstack_tests.ps1
   ```
2. Parse CLI output for pass/fail counts, assertion failures, and compilation errors.

### Phase 4 — Coverage Verification & Quality Gate
1. Run coverage verification script:
   ```powershell
   powershell.exe -ExecutionPolicy Bypass -File .agents/skills/fullstack-testing-suite/scripts/verify_coverage.ps1 -Threshold 80
   ```
2. Verify line, branch, and function coverage meet or exceed the mandatory 80% threshold.

### Phase 5 — Reporting
1. Generate or update `test_report.md` in the artifacts directory detailing test results, coverage breakdowns, and recommendations.

---

## Output Specification

- **Rust Tests**: `src-tauri/src/**/tests/*.rs` or inline `mod tests`
- **TypeScript Tests**: `src/**/*.test.ts` or `src/**/*.test.tsx`
- **Execution Script**: `.agents/skills/fullstack-testing-suite/scripts/run_fullstack_tests.ps1`
- **Artifact Report**: `test_report.md` detailing execution metrics and coverage gaps.

---

## Error Handling

- **Cargo Compilation Failure**: Read compiler errors immediately, fix missing imports or feature flags in `Cargo.toml`.
- **Vitest Failure**: Check component props and `vi.mock` implementations. Ensure `@tauri-apps/api/core` invoke mocks return expected Promise signatures.
- **Coverage Deficit (< 80%)**: Identify uncovered branches from coverage outputs and generate targeted edge-case unit tests.

---

## Reference Documentation

- [Testing Architecture Guide](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/skills/fullstack-testing-suite/references/testing_architecture_guide.md)
- [Example IPC Handler Test](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/skills/fullstack-testing-suite/examples/realworld_tauri_ipc/ipc_handler_test.rs)
- [Example Vitest Invoke Wrapper Test](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/skills/fullstack-testing-suite/examples/realworld_tauri_ipc/ipc_wrapper.test.ts)
