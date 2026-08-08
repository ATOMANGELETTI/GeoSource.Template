# Full Architecture Refactoring Proposal: Modular Spatial Engine & Async State

## Goal Description
Modularize the GeoSource Rust backend architecture by decoupling monolithic state in `lib.rs` into dedicated module domain crates (`state.rs`, `commands/`, `spatial/`). Upgrade IPC command handlers to use async Tokio channels and structured permissions.

## Proposed Changes

### Rust Backend Component

#### [NEW] `src-tauri/src/spatial/mod.rs`
#### [MODIFY] `src-tauri/src/lib.rs`
#### [MODIFY] `src-tauri/src/commands/spatial_commands.rs`

## Benefits & Justification
- Reduces compilation time via crate modularity.
- Prevents UI thread blocking during high-volume geospatial feature loading.
- Hardens Tauri v2 IPC scope isolation.

## Verification Plan
- `cargo check` and `cargo test` pass cleanly.
- IPC benchmark demonstrates < 5ms response latency for 10k GeoJSON features.
