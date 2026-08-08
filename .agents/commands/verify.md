# `/verify` Command Specification

## Purpose
The `/verify` command executes the full workspace automated test suite and verification gates to ensure code correctness and test coverage thresholds.

---

## Execution Protocol

1. **Test Runner Execution**: Run `powershell -ExecutionPolicy Bypass -File .agents/scripts/run-workspace-tests.ps1`.
2. **Rust Backend Tests**: Execute `cargo test --workspace --all-targets` and report pass/fail metrics.
3. **Frontend Tests**: Execute `pnpm test` (if configured) or lint checks.
4. **Coverage Audit**: Ensure new public functions have accompanying unit tests and 80% coverage threshold is respected.
