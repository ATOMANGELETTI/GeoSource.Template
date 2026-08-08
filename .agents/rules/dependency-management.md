# Dependency Management Standard

This document establishes the mandatory procedures for adding, updating, and auditing dependencies across all package ecosystems used in this project (Cargo and npm/pnpm). Uncontrolled dependencies are a primary vector for supply-chain attacks and build reproducibility failures.

---

## Pillar 1: Pre-Addition Checklist

Before adding any new dependency — regardless of ecosystem — the agent MUST complete the following checks in order:

1. **Workspace Alternatives Check**: Verify that no existing dependency in the workspace already provides the required functionality. Use `cargo tree` or review `package.json` devDependencies/dependencies. Do not add a new crate or package that duplicates capability already available.
2. **Security Audit**:
   - Rust: Run `cargo audit` to verify the new package has no known advisories.
   - npm/pnpm: Run `npm audit` or `pnpm audit` immediately after adding the package.
   - If any vulnerability is found, do not proceed with the addition without user approval.
3. **License Compatibility**: Verify the dependency license is compatible with the project's license. Flag any GPL or copyleft licenses for user review before adding.
4. **Maintenance Status**: Prefer actively maintained packages. Flag any package that has not had a release in 12+ months or shows signs of abandonment.

---

## Pillar 2: Cargo Dependency Rules

- **`cargo add` Only**: Never hand-edit `Cargo.toml` dependency version strings directly. Always use:
  ```powershell
  cargo add <crate-name>
  cargo add --dev <crate-name>         # for dev dependencies
  cargo add --build <crate-name>       # for build dependencies
  ```
- **Workspace Pinning**: All shared dependencies MUST be declared in the root `[workspace.dependencies]` table with an explicit version. Individual crate `Cargo.toml` files reference them with `{ workspace = true }` — never repeat version strings.
- **Minimal Features**: Always specify the minimum required feature set:
  ```toml
  serde = { workspace = true, features = ["derive"] }
  ```
  Avoid enabling default features when only a subset is required (`default-features = false`).
- **`Cargo.lock` Committed**: `Cargo.lock` MUST always be committed to the repository for binary crates. It is the sole guarantee of reproducible builds.

---

## Pillar 3: npm / pnpm Dependency Rules

- **Package Manager CLI Only**: Never hand-edit `package.json` version strings directly. Always use:
  ```powershell
  pnpm add <package>
  pnpm add -D <package>      # for devDependencies
  ```
- **Exact Versions for Critical Deps**: For Tauri-related npm packages, UI framework packages, and build tooling, use exact version pinning (`--save-exact`) to prevent unexpected minor-version behavior changes.
- **Lock File Committed**: `pnpm-lock.yaml` (or `package-lock.json`) MUST always be committed. Never `.gitignore` lock files.
- **No `npm install` in CI without lock**: CI pipelines must use `pnpm install --frozen-lockfile` (or equivalent) to enforce lock file integrity.

---

## Pillar 4: Justification Documentation

- **Justification Comment Required**: When adding any new dependency, the agent MUST add a brief inline comment in the config file explaining why the dependency was chosen:
  - Rust (`Cargo.toml`): `# Used for <purpose>. Replaces manual <X>. Chosen over <alternative> because <reason>.`
  - npm (`package.json`): Document in the PR description or the relevant `documentation-readme.md` entry since JSON does not support comments.
- **ADR for Significant Additions**: Any dependency that introduces a significant new architectural pattern (e.g., a state management library, a new async runtime, a new UI framework) requires an ADR in `other/documents/adr/`.

---

## Pillar 5: Dependency Update Policy

- **Scheduled Audits**: At least once per sprint/milestone, run `cargo update` and `pnpm update` in a dedicated `chore(deps):` PR. Review the diff for any unexpected major-version bumps.
- **Security Advisories**: Any `cargo audit` or `npm audit` critical/high severity advisory must be addressed within 48 hours of discovery. Medium severity within one sprint cycle.
- **Breaking Updates**: Major version upgrades that change public APIs require their own dedicated PR with an updated ADR and comprehensive test verification before merging.
