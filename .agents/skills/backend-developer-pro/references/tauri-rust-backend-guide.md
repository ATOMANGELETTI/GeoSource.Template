# Tauri v2 Rust Backend Engineering Guide

## Overview
This reference guide outlines the Rust systems architecture, security model, and Cargo dependency rules for the GeoSource Tauri desktop backend.

## Tauri v2 Command Protocol
- **Command Signature**: `#[tauri::command]` over async handlers returning `Result<T, E>`.
- **Error Serialization**: Serialize error types using `serde::Serialize` or stringify via `thiserror`.
- **Capabilities & Permissions**: Every IPC command must be whitelisted in `src-tauri/capabilities/default.json` or module-specific JSON manifests.

## Thread Safety & State
- Use `tauri::State<'_, SharedState>` for dependency injection.
- Prefer `tokio::sync::RwLock` for read-heavy state and `tokio::sync::Mutex` for write-heavy synchronous locks.
- Never block Tokio worker threads with heavy synchronous file/IO work; wrap in `tokio::task::spawn_blocking`.

## Rust Code Quality
- **Clippy**: Must pass `cargo clippy -- -D warnings`.
- **Formatting**: Must adhere to `cargo fmt`.
- **Safety**: Zero `unsafe` blocks without explicit `// SAFETY:` comments.
