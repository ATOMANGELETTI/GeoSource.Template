# Fullstack Testing Suite Examples

This directory contains standard reference examples for test development in GeoSource:

## Subdirectories

- **`minimal/`**: Bare-minimum test files for rapid boilerplate reference.
  - `sample.test.ts`: Vitest frontend unit test with standard assertions.
  - `sample_test.rs`: Cargo Rust unit test with `#[cfg(test)]` and basic module test.

- **`realworld_tauri_ipc/`**: Complete real-world Tauri v2 IPC integration and mock test suite.
  - `ipc_handler_test.rs`: Tokio async Rust test testing Tauri v2 commands with managed state.
  - `ipc_wrapper.test.ts`: Vitest frontend wrapper test with `@tauri-apps/api/core` invoke mocking.
