# Core Agent Configuration & System Schemas

The `core/` directory contains the foundational configuration schemas, manifest registries, runtime context loaders, environment parameters, and system prompt extensions for the GeoSource Tauri/Rust workspace agent environment.

---

## Catalog of Core Components

| Component | Description |
| :--- | :--- |
| [`agent-manifest.json`](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/core/agent-manifest.json) | Central system registry tracking all workspace agents, rules, workflows, skills, commands, plugins, and memory logs. |
| [`environment.json`](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/core/environment.json) | Workspace OS parameters, boundary constraints, path mappings, tool defaults, and runtime variables. |
| [`context-loader.json`](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/core/context-loader.json) | Pre-load priorities, Knowledge Item (KI) indexing strategy, token conservation thresholds, and search rules. |
| [`bootstrap.json`](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/core/bootstrap.json) | Startup hooks, task routing policies, subagent role binding rules, and execution initializers. |
| [`system-prompt-extensions.md`](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/core/system-prompt-extensions.md) | Injected workspace directives, safety boundaries, and prompt extensions for Antigravity AI runtime. |

---

## Architectural Role

1. **System Discovery**: The `agent-manifest.json` serves as the single source of truth for the IDE agent runtime to introspect all available tools, personas, and standards.
2. **Context Governance**: `context-loader.json` ensures agent turns remain token-efficient by enforcing stub-first reads, grep-first searches, and KI pre-flight checks.
3. **Environment Security**: `environment.json` enforces path traversal boundaries and explicitly Whitelists executable tool commands.
