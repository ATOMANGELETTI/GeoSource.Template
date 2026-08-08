# Documentation & README Maintenance Standard

This document defines the mandatory documentation standards for the GeoSource project. Documentation is a first-class deliverable — stale or missing documentation is a defect, not an oversight.

---

## Pillar 1: README Synchronization

- **Auto-Update Trigger**: The `README.md` at the project root MUST be updated whenever any of the following change:
  - Public API surface (new or removed Tauri commands, CLI flags, or public Rust exports).
  - Configuration schema (new fields in `tauri.conf.json`, environment variables, `.env` examples).
  - Installation, build, or setup steps.
  - Supported platforms or runtime requirements.
- **README Structure**: The project `README.md` must always contain the following sections (in order):
  1. Project title and one-line description.
  2. Badges (build status, license, version).
  3. Features overview.
  4. Installation / Prerequisites.
  5. Development setup (`cargo build`, `npm install`, dev server commands).
  6. Configuration reference (or link to full docs).
  7. Contributing guidelines link.
  8. License.
- **Agent Responsibility**: If an agent's task changes anything in the API/CLI/config surface, updating `README.md` is a mandatory subtask — not optional.

---

## Pillar 2: CHANGELOG Maintenance

- **Format**: Maintain `CHANGELOG.md` strictly in [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format.
- **Mandatory Entry**: Every `feat:` or `fix:` commit that reaches `main` MUST have a corresponding entry in `CHANGELOG.md` added in the same PR.
- **Section Structure**:
  ```markdown
  ## [Unreleased]
  ### Added
  ### Changed
  ### Fixed
  ### Removed
  ### Security
  ```
- **Entry Quality**: Entries must be written for end-users and maintainers — describe the behavior change, not the implementation detail.
- **Release Tagging**: When a release is cut, move `[Unreleased]` entries into a versioned section: `## [1.2.0] - YYYY-MM-DD`.

---

## Pillar 3: Architecture Decision Records (ADR)

- **Location**: All ADRs are stored in `other/documents/adr/`.
- **Filename Format**: `YYYY-MM-DD-<kebab-case-title>.md` (e.g., `2026-08-05-use-specta-for-type-generation.md`).
- **Trigger**: An ADR MUST be created when:
  - A new library or framework is chosen.
  - A significant architectural pattern is established or changed.
  - A non-obvious technical trade-off is made.
  - A previously considered approach is explicitly rejected.
- **ADR Template**:
  ```markdown
  # ADR: <Title>
  
  ## Status
  Accepted | Superseded by [ADR-YYYY-MM-DD](../../other/documents/adr/)
  
  ## Context
  What situation or problem prompted this decision?
  
  ## Decision
  What was decided?
  
  ## Consequences
  What are the positive and negative outcomes of this decision?
  ```

---

## Pillar 4: Inline Code Documentation

- **Rust Public Exports**: All `pub` functions, structs, enums, traits, and modules MUST have `///` rustdoc comments. Comments must describe:
  - What the item does (not how).
  - Parameters and return values for functions.
  - Panics, errors, and edge cases.
  - An `# Examples` section for non-trivial public APIs.
- **TypeScript Public Exports**: All exported functions, types, interfaces, and classes MUST have JSDoc comments with `@param`, `@returns`, and `@throws` tags where applicable.
- **Internal Code**: Private functions do not require doc comments but must have inline comments for non-obvious logic.

---

## Pillar 5: Project-Specific Documentation Paths

This project uses the following canonical paths for documentation artifacts — agents MUST use these paths and not create ad-hoc documentation locations:

| Content Type | Path |
|--------------|------|
| Change logs & release notes | `/other/changes/` |
| Project documentation & guides | `/other/documents/` |
| Architecture Decision Records | `other/documents/adr/` |
| Project root README | `README.md` |
| Changelog | `CHANGELOG.md` |
| API schema / Tauri command reference | `/other/documents/api-reference.md` |

- **No Orphaned Docs**: Never create documentation files outside these canonical paths unless a new path is explicitly agreed upon in an ADR.
- **Tauri Command Schema**: Maintain a reference document at `/other/documents/api-reference.md` listing all `#[tauri::command]` functions, their input/output types, and descriptions. This document must be updated in sync with any IPC surface changes.
