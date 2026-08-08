# Release Readiness Checklist

- [ ] Version synced across package.json, Cargo.toml, tauri.conf.json
- [ ] `cargo clippy -- -D warnings` passes cleanly
- [ ] Frontend production build (`pnpm build`) succeeds
- [ ] Installer icons & license file present in `src-tauri/icons/`
- [ ] Code signing certificates configured for Windows/macOS target
- [ ] Auto-updater manifest signed & published
