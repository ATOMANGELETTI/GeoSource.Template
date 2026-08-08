# GeoSource Refactoring Audit Checklist

Use this checklist during Step 1 (Project & Architecture Discovery) to identify high-impact refactoring opportunities:

## 1. Rust Backend (`src-tauri/`)

- [ ] **Error Handling**: Are there any `.unwrap()`, `.expect()`, or `panic!()` calls in IPC command paths? Replace with `thiserror` / `anyhow` typed errors.
- [ ] **Async & Threading**: Are file I/O or spatial indexing operations running synchronously on the main thread? Convert to `tokio::task::spawn_blocking` or async I/O.
- [ ] **State Mutability**: Is shared application state using coarse `Mutex<T>` locks causing lock contention? Refactor to fine-grained `RwLock<T>` or `dashmap`.
- [ ] **Security Scope**: Are Tauri v2 IPC command permissions properly scoped in `capabilities/` JSON files?
- [ ] **Memory Safety**: Are unsafe blocks properly guarded and documented with `// SAFETY:` rationale?

## 2. Frontend (`src/`)

- [ ] **Type Safety**: Are IPC invocation wrappers strictly typed using TypeScript interfaces instead of `any`?
- [ ] **Component Layout**: Are large monolithic Svelte components (>300 lines) broken into modular, single-responsibility sub-components?
- [ ] **CSS & Aesthetics**: Are design tokens, CSS variables, and modern glassmorphism styling consistent across views?
- [ ] **State Management**: Are store updates batched to avoid unnecessary re-renders during high-frequency map updates?

## 3. Project & Workspace Architecture

- [ ] **Directory Layout**: Are Rust modules cleanly separated into domain folders (`commands/`, `models/`, `spatial/`, `services/`)?
- [ ] **Dependencies**: Are Cargo crates and npm packages up to date without security advisories?
- [ ] **Build Times**: Are common build targets cached and workspace configurations optimized?
