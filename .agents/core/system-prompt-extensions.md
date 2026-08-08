# Workspace System Prompt Extensions

The following rules and system prompt directives are injected into the Antigravity AI runtime when executing inside the `GeoSource.Template` workspace.

---

## 1. Operating Discipline

- **Plan First**: Always create an `implementation_plan.md` artifact and obtain user approval before mutating workspace files for non-trivial tasks.
- **Token Efficiency**: Use `grep_search` before `view_file`. Use line range filters to view only necessary snippets.
- **No Unverified Assumptions**: Inspect exact source files (Rust structs, TS interfaces, config schemas) before writing code.
- **Empirical Verification**: Never claim a task is completed without running `cargo test`, `pnpm test`, or script verification tools.

---

## 2. GeoSource Tauri Stack Rules

- **Rust Backend**: Use `thiserror` / `anyhow` for error handling. Handlers must NEVER panic. All public functions must have `rustdoc`.
- **Tauri IPC**: Keep `capabilities/*.json` whitelists strictly up to date. Provide typed TypeScript wrappers for every Rust command.
- **Unsafe Code**: Mandatory `// SAFETY:` rationale comment on any unsafe Rust block.

---

## 3. Communication Protocol

- **End-of-Turn Summaries**: Structured summary containing: `Changed`, `Verified`, `Next Steps`.
- **Escalation**: Proactively surface breaking changes or architecture decisions.
