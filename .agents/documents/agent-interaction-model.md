# Agent Interaction & Collaboration Model

This document details how AI agents, subagents, workspace rules, operational workflows, slash commands, skills, and plugins interact within the GeoSource environment.

---

## Interaction Lifecycle

```
[User Request / Slash Command]
              │
              ▼
    ┌──────────────────┐
    │ AGENTS.md Rules  │  ──> Enforces plan-first gate & token efficiency
    └──────────────────┘
              │
              ▼
    ┌──────────────────┐
    │  core/ Manifest  │  ──> Routes task to appropriate agent persona
    └──────────────────┘
              │
              ▼
    ┌──────────────────┐
    │ Subagent Persona │  ──> Executes workflow from .agents/workflows/
    └──────────────────┘
              │
              ▼
    ┌──────────────────┐
    │ Plugin / Skill   │  ──> Executes scripts from .agents/scripts/
    └──────────────────┘
              │
              ▼
    ┌──────────────────┐
    │ Verification Gate│  ──> Runs automated tests & outputs walkthrough.md
    └──────────────────┘
```

---

## Role Routing Matrix

- **Rust Backend**: Delegated to [`rust-engineer.md`](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/agents/rust-engineer.md)
- **Frontend / UI**: Delegated to [`frontend-engineer.md`](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/agents/frontend-engineer.md)
- **Security & IPC Audit**: Delegated to [`security-auditor.md`](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/agents/security-auditor.md)
- **Documentation**: Delegated to [`docs-engineer.md`](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/agents/docs-engineer.md)
- **Orchestration**: Managed by [`coordinator.md`](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/agents/coordinator.md)
