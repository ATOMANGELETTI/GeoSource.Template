# GeoSource Project Structure Map

Compressed file index for the GeoSource Tauri v2 project workspace.
Use this map to navigate without running `list_dir` on the full tree.

**Workspace root**: `c:\Storage\Development\Projects\Tauri\GeoSource\GeoSource.Template\`

---

## Top-Level Structure

```
GeoSource.Template/
├── src/                    Frontend (Svelte/TypeScript)
├── src-tauri/              Rust backend + Tauri config
├── .agents/                Agent configuration and skills
├── .vscode/                VS Code settings
├── package.json            Node dependencies and scripts
├── vite.config.ts          Vite frontend bundler config
├── svelte.config.js        Svelte adapter config
├── tsconfig.json           TypeScript config
└── .gitignore
```

---

## Frontend — `src/`

```
src/
├── app.html               HTML shell
├── app.css / app.d.ts     Global styles and types
├── lib/
│   ├── components/        Svelte UI components
│   ├── stores/            Svelte writable/readable stores
│   └── utils/             Shared TypeScript utilities
└── routes/
    ├── +layout.svelte     Root layout
    ├── +page.svelte       Main route
    └── [additional routes as added]
```

**High-token files to avoid full reads**:
- Any large `.svelte` page component (likely > 300 lines)
- Generated `.d.ts` type files

---

## Backend — `src-tauri/`

```
src-tauri/
├── src/
│   ├── main.rs            Tauri app entry point
│   ├── lib.rs             Command registration + app builder
│   └── commands/          Tauri command handlers (Rust)
│       └── *.rs
├── Cargo.toml             Rust dependencies
├── Cargo.lock             Locked dependency versions
├── build.rs               Build script
├── tauri.conf.json        Tauri app configuration
├── capabilities/          Tauri v2 capability definitions
│   └── default.json
└── icons/                 App icons
```

**Common entry points for TEM**:
- `src-tauri/src/lib.rs` — find registered commands with `grep_search("invoke_handler")`
- `src-tauri/src/commands/` — individual command files, typically 50–200 lines each
- `src-tauri/Cargo.toml` — dependencies (always safe to `view_file`)

---

## Agent Configuration — `.agents/`

```
.agents/
├── AGENTS.md              Global workspace rules
└── skills/
    ├── skill-designer-pro/ Reference skill implementation
    └── token-efficiencie/  This skill
```

---

## Key Rust Command Pattern

All Tauri commands follow this pattern — use `grep_search` to find them:

```rust
#[tauri::command]
pub fn command_name(arg: Type) -> Result<ReturnType, String> { ... }
```

**Grep to find**: `grep_search("#[tauri::command]", Includes=["*.rs"])`

---

## Key npm Scripts

```json
"dev":   "tauri dev"      // Starts full dev server (Vite + Tauri)
"build": "tauri build"    // Production build
"check": "svelte-check"   // Type checking
```

---

## Dependency Quick Reference

| Dependency | Purpose |
|---|---|
| `@tauri-apps/api` | Tauri JavaScript bindings |
| `svelte` | UI framework |
| `vite` | Frontend bundler |
| `tauri` (Rust) | Desktop app framework |
| `serde` | Rust serialization |
| `serde_json` | JSON support |

> **TEM Note**: Do not run `cargo tree` or `npm list --all` for dependency
> exploration — use the Cargo.toml and package.json files directly.
