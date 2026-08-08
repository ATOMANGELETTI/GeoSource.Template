# Tauri & Rust Stack Standard

This document establishes mandatory rules specific to the GeoSource Tauri/Rust project stack. All agents working on this repository must adhere to these constraints without exception to ensure IPC safety, build reproducibility, and runtime security.

---

## Pillar 1: Tauri IPC Safety

- **Whitelist-Only Commands**: Only explicitly registered `#[tauri::command]` functions may be invoked from the frontend. Never add catch-all handlers or expose dynamic dispatch.
- **Dual-Side Validation**: All IPC command inputs MUST be validated on both sides:
  - **Rust side**: Validate types, ranges, and business rules inside the `#[tauri::command]` handler before any processing.
  - **TypeScript side**: Validate user inputs and sanitize data before calling `invoke()`.
- **Typed Invoke Wrappers**: Every `invoke()` call from the frontend MUST be wrapped in a typed TypeScript function with explicit input and output types. Raw untyped `invoke<any>()` calls are forbidden.
- **No Panic in Handlers**: IPC command handlers must NEVER panic. Wrap all fallible operations with `?` and return `Result<T, E>` where `E` implements `serde::Serialize`. An unhandled panic in a Tauri command crashes the backend process.
- **Error Type Serialization**: All error types returned from `#[tauri::command]` functions must implement both `thiserror::Error` and `serde::Serialize` to ensure structured, typed errors reach the frontend.

---

## Pillar 2: Tauri Configuration Safety

- **Explicit Allow-List**: The `tauri.conf.json` `allowlist` (or Tauri v2 `permissions`) must be explicitly scoped to only the capabilities the application requires. Wildcards (`all: true`) are forbidden.
- **No Open-Ended Shell Access**: Shell plugin access must list specific programs and argument patterns. Never configure unrestricted `open: all` shell permissions.
- **CSP Enforcement**: Content Security Policy must be set in `tauri.conf.json`. Inline scripts and `unsafe-eval` are forbidden in the CSP unless a documented exception is approved by the user.
- **Window Labels**: All Tauri windows must have explicit, stable string labels — never dynamically generated or random labels in production code.

---

## Pillar 3: Cargo Workspace Conventions

- **Workspace-Level Dependency Management**: All crate versions are declared once in the root `[workspace.dependencies]` table. Individual crate `Cargo.toml` files must use `{ workspace = true }` and must NOT hardcode version strings.
- **No Duplicate Crate Versions**: Before adding any new dependency, verify it does not introduce a duplicate transitive version conflict. Use `cargo tree -d` to check.
- **`cargo add` Only**: Never hand-edit `Cargo.toml` dependency versions directly. Always use `cargo add <crate>` or `cargo add --dev <crate>` to ensure version resolution is correct.
- **Feature Flags**: Always specify the minimal set of features required. Avoid enabling default features blindly — use `default-features = false` when only a subset is needed.

---

## Pillar 4: Rust Error Handling

- **Library Crates**: Use `thiserror` for all custom error types in library crates (`src-tauri/src/lib*.rs`, plugin crates). Errors must be domain-typed and descriptive.
- **Binary Entrypoints**: Use `anyhow` for top-level binary entrypoints (`main.rs`) only, where rich context chaining is more valuable than type specificity.
- **No Raw `unwrap()`**: `unwrap()` and `expect()` are forbidden in production code paths. Permitted only in:
  - Test code (`#[cfg(test)]` blocks).
  - Build scripts (`build.rs`) where failure is intentional.
  - `expect()` with a meaningful message in initialization code where recovery is impossible — must include a `// INVARIANT:` comment explaining why.
- **`?` Propagation**: All fallible operations must use `?` for error propagation. Swallowed errors (`let _ = result;`) are forbidden without a `// INTENTIONAL:` comment.

---

## Pillar 5: Unsafe Rust

- **No Bare `unsafe` Blocks**: Every `unsafe { }` block MUST be preceded by a `// SAFETY:` comment explaining:
  - Why the invariants required by the unsafe operation are upheld.
  - What would happen if those invariants were violated.
- **Minimize Scope**: `unsafe` blocks must be as small as possible — isolate only the specific unsafe operation, not surrounding safe code.
- **Review Gate**: Any new `unsafe` block introduction must be flagged explicitly in the `implementation_plan.md` and highlighted in the PR description for human review.

---

## Pillar 6: Frontend-Backend Contract

- **Schema Synchronization**: TypeScript types for all Tauri command inputs and outputs must stay in sync with Rust struct definitions. Any change to a Rust type used in an IPC boundary requires a simultaneous update to the corresponding TypeScript type.
- **Shared Type Source of Truth**: Prefer generating or deriving TypeScript bindings from Rust types using `specta` or similar tooling where available in the project, rather than maintaining types manually in parallel.
- **No `any` on IPC Boundaries**: `any` is strictly forbidden as an input or output type for `invoke()` wrappers. Use `unknown` with runtime narrowing if the type cannot be known statically.
