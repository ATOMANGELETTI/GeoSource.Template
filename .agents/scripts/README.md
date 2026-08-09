# Workspace Automation Scripts Catalog

The `scripts/` directory contains Node.js and PowerShell automation utilities used by workspace agents and developers to automate building, testing, linting, validation, code generation, and release tasks.

---

## Script Catalog

| Script | Engine | Description |
| :--- | :--- | :--- |
| [`validate-agents.js`](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/scripts/validate-agents.js) | Node.js | Validates `.agents/` structure, links, JSON schemas, frontmatter, and agent references. |
| [`gen-ipc.js`](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/scripts/gen-ipc.js) | Node.js | Generates boilerplate Rust Tauri IPC handlers and typed TypeScript invoke wrappers. |
| [`run-workspace-tests.ps1`](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/scripts/run-workspace-tests.ps1) | PowerShell | Runs Cargo unit/integration tests and frontend verification checks. |
| [`check-deps-security.ps1`](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/scripts/check-deps-security.ps1) | PowerShell | Audits Cargo and npm dependencies for security vulnerabilities and compliance. |
| [`sync-version.ps1`](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/scripts/sync-version.ps1) | PowerShell | Synchronizes version strings across `Cargo.toml`, `package.json`, and `tauri.config.json`. |
| [`package-release.ps1`](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/scripts/package-release.ps1) | PowerShell | Automates release packaging, installer collection, portable ZIP creation, SHA256 checksums, and release manifest generation. |

---

## Execution Syntax

```bash
# Validate workspace agents directory structure & links
node .agents/scripts/validate-agents.js

# Generate Tauri IPC boilerplate
node .agents/scripts/gen-ipc.js --name get_user_location --args "latitude:f64,longitude:f64"

# Run workspace tests
powershell -ExecutionPolicy Bypass -File .agents/scripts/run-workspace-tests.ps1

# Run security & dependency audit
powershell -ExecutionPolicy Bypass -File .agents/scripts/check-deps-security.ps1

# Sync versions
powershell -ExecutionPolicy Bypass -File .agents/scripts/sync-version.ps1 -Version "1.2.0"

# Execute full release packaging & portable ZIP release pipeline
powershell -ExecutionPolicy Bypass -File .agents/scripts/package-release.ps1
```
