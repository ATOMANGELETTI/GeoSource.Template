# `/release-prep` Command Specification

## Purpose
The `/release-prep` command automates release readiness tasks, including version synchronization, security checks, CHANGELOG updates, and production build verification.

---

## Execution Protocol

1. **Version Sync**: Run `powershell -ExecutionPolicy Bypass -File .agents/scripts/sync-version.ps1 -Version <new_version>` to synchronize version strings across `Cargo.toml`, `package.json`, and `tauri.config.json`.
2. **CHANGELOG Update**: Create or update CHANGELOG.md following the Keep-a-Changelog specification.
3. **Audit Check**: Perform `/audit` check to ensure zero security vulnerabilities or rule violations.
4. **Build Gate**: Execute production build verification via `cargo tauri build` or `pnpm build`.
