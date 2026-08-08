# System Architecture Overview of `.agents/`

This document outlines the structural layout, component interaction, and design principles governing the `.agents/` system in the `GeoSource.Template` workspace.

---

## Directory Hierarchy

```
.agents/
├── AGENTS.md                   # Master workspace rules & directory index
├── core/                       # Configurations, manifests, & system prompt extensions
│   ├── README.md
│   ├── agent-manifest.json
│   ├── environment.json
│   ├── context-loader.json
│   ├── bootstrap.json
│   └── system-prompt-extensions.md
├── commands/                   # Custom slash command execution protocols
│   ├── README.md
│   ├── grill-me.md
│   ├── goal.md
│   ├── ipc-gen.md
│   ├── audit.md
│   ├── release-prep.md
│   ├── verify.md
│   ├── benchmark.md
│   └── learn.md
├── scripts/                    # Node.js & PowerShell automation utilities
│   ├── README.md
│   ├── validate-agents.js
│   ├── gen-ipc.js
│   ├── run-workspace-tests.ps1
│   ├── check-deps-security.ps1
│   └── sync-version.ps1
├── plugins/                    # Domain-specific workspace plugins
│   ├── README.md
│   ├── geosource-tauri-plugin/
│   └── workspace-auditor-plugin/
├── documents/                  # Architecture & operational guides
│   ├── README.md
│   ├── architecture-overview.md
│   ├── agent-interaction-model.md
│   ├── extension-guide.md
│   └── tauri-geosource-spec.md
├── agents/                     # Specialized subagent persona definitions (11 subagents)
├── rules/                      # Core workspace standard rules (10 rules)
├── workflows/                  # Standard operational workflows (5 workflows)
├── skills/                     # Workspace skill packages
└── memory/                     # Individual agent activity logs & scratchpads
```

---

## Design Principles

1. **Self-Describing**: Every directory contains a dedicated `README.md` and machine-readable JSON manifest (`agent-manifest.json`).
2. **Token Efficiency**: Pre-flight knowledge item review, grep-first file discovery, stub-first file reading, and concise response discipline.
3. **Plan-First Security Gate**: All non-trivial modifications require an `implementation_plan.md` artifact and explicit user approval before execution.
4. **Empirical Verification**: Automated scripts (`validate-agents.js`, `run-workspace-tests.ps1`) validate changes before declaring tasks resolved.
