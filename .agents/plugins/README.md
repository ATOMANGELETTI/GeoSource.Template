# Workspace Plugins Catalog

The `plugins/` directory contains modular plugin bundles designed for the GeoSource Tauri/Rust workspace environment. Each plugin packages specialized capabilities, custom tools, subagent definitions, and skills for targeted domain workflows.

---

## Plugin Directory

| Plugin | Path | Description |
| :--- | :--- | :--- |
| **`geosource-tauri-plugin`** | [`geosource-tauri-plugin/plugin.json`](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/plugins/geosource-tauri-plugin/plugin.json) | Tauri v2 backend IPC generation, capability whitelisting, Rust command verification, and typed frontend contract binding. |
| **`workspace-auditor-plugin`** | [`workspace-auditor-plugin/plugin.json`](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/plugins/workspace-auditor-plugin/plugin.json) | Token efficiency monitoring, code quality auditing, security vulnerability scanning, and link integrity verification. |

---

## Plugin Structure

```
.agents/plugins/<plugin-name>/
├── plugin.json                # Plugin metadata, dependencies, and skill exports
├── skills/                    # Domain-specific skill packages
│   └── <skill-name>/
│       └── SKILL.md           # Instructions with YAML frontmatter
└── agents/                    # Embedded subagent definitions
```
