# Backend Developer Pro Skill

`backend-developer-pro` is a specialized skill for Antigravity IDE focused on Tauri v2 Rust desktop backend engineering, IPC command handlers, thread-safe state management, Cargo dependency security, and zero-panic runtime systems.

## Features
- **Tauri v2 IPC Engineering**: `#[tauri::command]` handlers with typed JSON payload serialization.
- **Robust Error Handling**: Custom `thiserror` enums serialized seamlessly to TypeScript error catches.
- **Thread Safety & Async Tokio**: Safe async state manipulation using `tokio::sync::RwLock`.
- **Automated Rust Linting**: PowerShell wrappers for `cargo clippy`, `cargo fmt`, `cargo check`, and `cargo test`.

## Triggering the Skill
Use any of the following triggers:
- "tauri backend"
- "rust ipc handler"
- "cargo backend"
- "rust security"
- "backend-developer-pro"

## File Tree
- `SKILL.md` — Core instructions and Rust backend engineering workflow
- `scripts/verify-backend-rust.ps1` — Runs `cargo check`, `cargo test`, and `cargo clippy`
- `scripts/run-cargo-clippy-fmt.ps1` — Runs `cargo fmt` and `cargo clippy --fix`
- `examples/secure-ipc-command/` — Reference implementation of a secure Rust IPC command
- `resources/command_template.rs` — Production-ready Rust Tauri command template
- `references/tauri-rust-backend-guide.md` — Architectural guide for Tauri v2 Rust backends
- `tests/test_validation.ps1` — Automated skill integrity test suite

