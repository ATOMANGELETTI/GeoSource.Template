# Workspace Slash Commands Catalog

The `commands/` directory defines standard operational procedures and protocol specifications for custom slash commands supported in the GeoSource Tauri/Rust workspace environment.

---

## Command Catalog

| Command | Protocol File | Description |
| :--- | :--- | :--- |
| `/grill-me` | [`grill-me.md`](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/commands/grill-me.md) | Interactive interview protocol to align on design decisions step-by-step. |
| `/goal` | [`goal.md`](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/commands/goal.md) | Long-running autonomous execution and multi-iteration verification protocol. |
| `/ipc-gen` | [`ipc-gen.md`](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/commands/ipc-gen.md) | Code generation protocol for typed Tauri IPC handlers and TS wrappers. |
| `/audit` | [`audit.md`](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/commands/audit.md) | Comprehensive security, dependency, performance, and code quality audit protocol. |
| `/release-prep` | [`release-prep.md`](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/commands/release-prep.md) | Release readiness check, version synchronization, and CHANGELOG update protocol. |
| `/verify` | [`verify.md`](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/commands/verify.md) | Full workspace automated testing and verification gate protocol. |
| `/benchmark` | [`benchmark.md`](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/commands/benchmark.md) | Build times, IPC latency, and runtime memory benchmarking protocol. |
| `/learn` | [`learn.md`](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/commands/learn.md) | Knowledge capture protocol to distill solution patterns into persistent skills/rules. |

---

## Execution Directives

Agents receiving any of the slash commands above MUST load and strictly adhere to the corresponding `.md` specification before commencing work.
