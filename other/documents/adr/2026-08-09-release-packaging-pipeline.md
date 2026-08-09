# ADR: Automated Release Packaging & Portable ZIP Releases

- **Date**: 2026-08-09
- **Status**: Approved
- **Author**: GeoSource Release Engineering

---

## Context

GeoSource Template required a standardized, professional distribution workflow to package compiled desktop applications for production release. End users require both system installers (NSIS `.exe` and MSI `.msi`) for formal installations and standalone portable ZIP packages (`.zip`) for zero-install portable deployment across supported desktop operating systems.

Previously, release builds produced raw output in `src-tauri/target/release/bundle/` without aggregating artifacts into a dedicated `release/` distribution folder, without portable archive bundling, and without cryptographic SHA256 checksum verification manifests.

---

## Decision

We have implemented an automated release packaging pipeline encapsulated in `.agents/scripts/package-release.ps1` and integrated into `package.json` via `npm run release`.

Key architectural decisions:
1. **Output Directory (`release/`)**: All distribution artifacts are collected into a top-level `release/` folder.
2. **Native Installer Bundling**: Native installer binaries produced by Tauri v2 (`.msi`, `-setup.exe`, `.deb`, `.AppImage`, `.dmg`) are automatically discovered and copied to `release/`.
3. **Portable ZIP Releases**:
   - Compiles and packages standalone binaries (`geosource-template.exe`) into `geosource-template-v<VERSION>-<OS>-<ARCH>-portable.zip`.
   - Bundles default configuration files (`other/configs/settings.yaml`, `other/configs/bindings.yaml`, `other/configs/appinfo.yaml`), log directory (`other/logs/`), `README.md`, and `PORTABLE_NOTES.txt` inside the portable archive.
4. **Integrity & Verification**:
   - Generates cryptographic `SHA256SUMS.txt` for all release files.
   - Generates machine-readable `release-manifest.json` containing build timestamps, file sizes, artifact types, and hashes.
5. **CLI Integration**:
   - Exposed via `npm run release` and `npm run release:clean`.

---

## Consequences

### Positive
- One-command release distribution packaging across native installers and portable ZIP formats.
- Complete cryptographic verification and machine-readable metadata.
- Clean separation between developer target builds and production release artifacts.

### Negative
- Requires PowerShell execution environment on Windows developer machines.
