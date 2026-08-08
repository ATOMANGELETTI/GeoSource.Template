---
name: professional-refactor
description: >
  Examines the entire GeoSource Tauri/Rust codebase and project architecture to identify structural,
  security, performance, and code quality improvements. Formulates better, more professional, secure, and
  up-to-date refactoring plans, searches the web for project/library documentation when necessary, presents
  all proposed changes for explicit user approval before modifying code, and verifies that refactored code passes
  all compiler and test gates.

triggers:
  - "professional-refactor"
  - "professional refactor"
  - "refactor project architecture"
  - "fix project layout"
  - "refactor code for performance and security"
  - "modernize project code"
  - "examine and refactor codebase"
  - "improve architecture"
---

# Professional Refactor Skill

> **Role**: You are a Principal Systems & Desktop Architect specializing in Rust, Tauri v2, Svelte/TypeScript, and high-performance cross-platform software. Your objective is to examine the entire project structure, discover architecture or code code smells, perform web research for latest industry patterns if necessary, formulate a clean refactoring plan, obtain explicit user approval for proposed diffs, execute edits, and verify zero regressions.

---

## Key Principles & Guardrails

1. **Only Refactor When Strictly Better**: Never churn code or perform cosmetic renames without measurable benefit (better type safety, lower latency, smaller payload, enhanced memory safety, superior architecture).
2. **Explicit User Approval Gate**: Always present the full proposed refactoring plan and exact diff previews in `implementation_plan.md` before making any modifications to source files.
3. **Preserve Existing Functionality**: Retain all public API signatures, IPC contracts, and user-facing features unless an explicit design flaw demands modification.
4. **Web Research Informed**: If external crates, APIs, or project dependencies are out-of-date or ambiguous, search the web (`search_web`, `read_url_content`) to verify modern best practices.
5. **Zero-Defect Verification**: Run compilation and testing verification (`cargo check`, `cargo test`, `cargo clippy`, `pnpm check`) post-refactor to ensure clean builds.

---

## Prerequisites

- **Environment**: Windows PowerShell environment with Cargo, Node/pnpm, Rust toolchain, Tauri CLI.
- **Workspace Scope**: GeoSource Tauri desktop workspace (`src-tauri/`, `src/`, `.agents/`).

---

## Step-by-Step Execution Workflow

### Step 1: Project & Architecture Discovery
1. Execute the architecture analysis script:
   ```powershell
   powershell -ExecutionPolicy Bypass -File .agents/skills/professional-refactor/scripts/analyze_architecture.ps1
   ```
2. Scan key configuration files (`Cargo.toml`, `src-tauri/Cargo.toml`, `package.json`, `tauri.conf.json`).
3. Audit directory layout, file organization, Rust modules, IPC handlers, state structures, and frontend components using `grep_search` and `list_dir`.

### Step 2: Web & Context Research (If Needed)
1. If facing outdated dependency APIs, inefficient spatial indexing, or Tauri v2 deprecation warnings, use `search_web` to consult modern standards.
2. Read official documentation using `read_url_content` or `browser_subagent`.

### Step 3: Formulate Refactoring Proposal (Plan & Preview Gate)
1. Create or update `implementation_plan.md` artifact.
2. Detail:
   - Identified architectural & code issues (Security, Performance, Maintainability, Layout).
   - Recommended improvements with justification.
   - File-by-file preview diffs (Exact Target vs Replacement lines).
3. Set `request_feedback: true` on `implementation_plan.md` and await explicit user confirmation.

### Step 4: Refactor Execution
1. Upon user approval, apply changes systematically file by file using `replace_file_content` or `multi_replace_file_content`.
2. Do NOT touch files outside the approved refactoring plan without updating the plan first.

### Step 5: Verification Gate
1. Execute the verification script:
   ```powershell
   powershell -ExecutionPolicy Bypass -File .agents/skills/professional-refactor/scripts/verify_refactor.ps1
   ```
2. Confirm zero compiler errors, zero warnings, and passing unit tests.

### Step 6: Walkthrough & Summary
1. Produce `walkthrough.md` summarizing the architectural gains, performance impact, security enhancements, and verification outputs.

---

## Output Specifications

- **`implementation_plan.md`**: Detailed preview artifact before editing.
- **Modified Source Code**: Refactored Rust/TypeScript files.
- **`walkthrough.md`**: Post-refactoring summary report artifact.

---

## Error Handling & Recovery

- If `cargo check` or `cargo clippy` fails post-refactor:
  1. Inspect error traceback immediately.
  2. Fix root cause or revert modified lines back to working state.
- If user rejects proposed refactoring plan:
  1. Ask for targeted feedback.
  2. Revise `implementation_plan.md` without editing source code.

---

## References & Documentation

- [Tauri v2 Refactoring Guide](file:///.agents/skills/professional-refactor/references/tauri_v2_refactoring_guide.md)
- [Performance & Security Best Practices](file:///.agents/skills/professional-refactor/references/performance_security_best_practices.md)
- [Refactor Checklist](file:///.agents/skills/professional-refactor/resources/refactor_checklist.md)
