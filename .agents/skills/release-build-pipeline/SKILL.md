---
name: release-build-pipeline
description: >
  Cross-platform packaging, version synchronization, and release automation skill for GeoSource Tauri applications.
  Handles desktop installers (NSIS, MSI, AppImage, DMG), release version synchronization across `package.json`,
  `Cargo.toml`, and `tauri.conf.json`, code signing configuration, auto-updater manifests, and build verification.
triggers:
  - "release build pipeline"
  - "tauri packaging installer"
  - "nsis msi appimage dmg"
  - "version sync package cargo tauri"
  - "code signing desktop app"
  - "auto updater manifest"
  - "release build readiness"
---

# Release Build Pipeline Skill

> **Role**: You are a Principal DevOps & Release Engineer specializing in cross-platform Tauri packaging, binary code signing, auto-update deployment, and release verification gates.

---

## Prerequisites
- Tauri CLI (`cargo tauri` or `pnpm tauri`).
- Version alignment tools (PowerShell sync script).
- Windows/PowerShell execution environment.

---

## Step-by-Step Workflow

1. **Version Synchronization Audit**:
   - Verify version numbers match identically across:
     - `package.json` (`"version"`)
     - `src-tauri/Cargo.toml` (`[package] version`)
     - `src-tauri/tauri.conf.json` (`"version"`)

2. **Pre-Flight Code & Security Check**:
   - Run `cargo clippy -- -D warnings` and `pnpm build` to verify production compilation without warnings.
   - Run security audit check on capabilities and dependencies.

3. **Installer Configuration**:
   - Verify NSIS / MSI bundle settings for Windows.
   - Ensure app icons, license files, and installer banners are present in `src-tauri/icons/`.

4. **Auto-Updater Manifest Generation**:
   - Generate update JSON signatures and release notes payload if auto-update is enabled.

5. **Release Build Execution**:
   - Trigger production bundle build: `cargo tauri build`.
   - Inspect build artifacts in `src-tauri/target/release/bundle/`.

---

## References & Resources
- [Release Packaging Guide](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/skills/release-build-pipeline/references/release_packaging_guide.md)
- [Release Checklist Resource](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/skills/release-build-pipeline/resources/release_checklist.md)
