# Cargo Commands Reference

## Essential Commands (run in src-tauri/)

| Command | Purpose |
|---|---|
| `cargo check` | Fast syntax/type check without building |
| `cargo build` | Debug build |
| `cargo build --release` | Optimized release build |
| `cargo test` | Run all unit and integration tests |
| `cargo clippy` | Lint analysis |
| `cargo clippy -- -D warnings` | Fail on any warning |
| `cargo fmt` | Format code automatically |
| `cargo fmt -- --check` | Check formatting without modifying |
| `cargo doc` | Generate documentation |
| `cargo tauri dev` | Start Tauri dev server |
| `cargo tauri build` | Build distributable bundle |

## Useful Flags

- `--release` — Optimized build
- `-- -D warnings` — Treat warnings as errors
- `--all-features` — Enable all feature flags
- `-- --nocapture` — Show println! output in tests
