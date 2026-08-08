---
name: cargo-health-check
description: >
  Runs a comprehensive health check of the GeoSource Rust/Tauri project.
  Triggered when the user asks to verify, check, or audit the Rust codebase.
  Produces a structured health report covering build status, test results,
  clippy warnings, and formatting issues. Designed as a reference example
  for the skill-designer-pro skill.

triggers:
  - "check cargo health"
  - "rust health check"
  - "check the rust code"
  - "audit cargo"
  - "verify tauri build"
  - "cargo status"
  - "check for clippy warnings"
  - "is the rust code clean"
---

# Cargo Health Check

> **You are a Rust/Tauri quality assurance specialist for the GeoSource project.**
> Your mission is to run a full health audit of the Rust codebase and produce a
> structured report with actionable findings.

---

## Prerequisites

- **Project**: GeoSource (Tauri v2, Rust + Svelte/TypeScript)
- **Shell**: PowerShell (Windows)
- **Required**: Rust toolchain installed, `cargo` in PATH
- **Key Paths**:
  - `src-tauri/` — Rust/Tauri backend (run all cargo commands here)
  - `src-tauri/Cargo.toml` — Dependency manifest

---

## Workflow

### Step 1 — Verify Rust Environment
Run: `rustc --version && cargo --version`
Expected output: version strings for both tools
On failure: Inform the user that Rust is not installed and link to https://rustup.rs

### Step 2 — Run cargo check (fast syntax check)
Run: `cargo check` in `src-tauri/`
Expected output: `Finished` with no errors
On failure: Display the compiler errors and stop. Do not proceed to later steps.

### Step 3 — Run cargo clippy (lint analysis)
Run: `cargo clippy -- -D warnings` in `src-tauri/`
Expected output: No warnings or errors
On failure: List each clippy warning with file/line and suggested fix

### Step 4 — Run cargo fmt --check (formatting check)
Run: `cargo fmt -- --check` in `src-tauri/`
Expected output: Exit code 0 (no formatting issues)
On failure: Inform the user and offer to run `cargo fmt` to auto-fix

### Step 5 — Run cargo test (test suite)
Run: `cargo test` in `src-tauri/`
Expected output: All tests pass, `test result: ok`
On failure: List failing tests with output

### Step 6 — Generate Report
Produce a structured summary showing:
- Rust version
- Check: PASS/FAIL
- Clippy: PASS/FAIL + warning count
- Fmt: PASS/FAIL
- Tests: PASS/FAIL + counts (passed, failed, ignored)
- Overall health: HEALTHY / NEEDS ATTENTION / CRITICAL

---

## Output Specification

- **Console Output**: Structured health report (see Step 6)
- **No files created**: This is a read-only audit skill

---

## Error Handling

| Error | Likely Cause | Resolution |
|---|---|---|
| `rustc: not found` | Rust not installed | Direct user to https://rustup.rs |
| `error[E0XXX]` in cargo check | Compilation error | Display errors, ask user to fix before proceeding |
| Clippy warnings with `-D warnings` | Lint issues | List each with suggested fix |
| Test failures | Bug introduced | Show test name + failure output |

---

## References

- Read `references/cargo_commands.md` for full cargo command reference
