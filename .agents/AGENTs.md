# Workspace Agent Rules

The following rules apply to **all** agent interactions within this workspace without exception. Read and internalize every linked rule before beginning any task.

---

## Core Development Standards

- [Code Quality Standard](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/rules/code-quality.md): Enforces modern syntax, performance optimization, security defense, clean architecture, and mandatory pre-completion verification.
- [Token Efficiency Standard](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/rules/token-efficiency.md): Enforces token conservation, grep-first discovery, stub-first file reading, and concise response discipline while maintaining full code quality.
- [Testing & Verification Standard](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/rules/testing-verification.md): Unit tests for all new public functions, integration tests for all IPC commands, 80% coverage threshold, regression test mandate, and mandatory pre-completion test gate.

---

## Architecture & Planning

- [Planning & Architecture Standard](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/rules/planning-architecture.md): Strict plan-first gate — `implementation_plan.md` and user approval required before any code change; task tracking and post-execution walkthrough mandatory.
- [Context & Knowledge Management Standard](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/rules/context-knowledge-management.md): Mandatory KI review before any research or code work; prohibits redundant tool calls and re-fetching of in-context data.

---

## Project Stack Rules

- [Tauri & Rust Stack Standard](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/rules/tauri-rust-stack.md): IPC whitelist enforcement, workspace-level Cargo deps, thiserror/anyhow error handling, no-panic IPC handlers, typed TS invoke wrappers, and mandatory SAFETY comments on unsafe blocks.
- [Dependency Management Standard](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/rules/dependency-management.md): `cargo add` / pnpm CLI only, pre-addition security audit, workspace alternatives check, justification comments, and lock files always committed.

---

## Process & Communication

- [Git & Commit Discipline Standard](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/rules/git-commit-discipline.md): Conventional Commits with mandatory scope, no direct commits to main, squash-merge PRs, issue linkage, and `git diff` pre-flight before proposing changes.
- [Documentation & README Maintenance Standard](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/rules/documentation-readme.md): README sync on API/config changes, Keep-a-Changelog CHANGELOG entries per feat/fix, ADRs in `other/documents/adr/`, JSDoc/rustdoc on all public exports, and canonical paths (`/other/changes/`, `/other/documents/`).
- [Agentic Behavior & Communication Standard](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/rules/agentic-behavior.md): Structured end-of-turn summaries (changed / verified / next), mandatory escalation protocol for ambiguous/destructive/external-service actions, proactive risk surfacing, no silent checklist skips, and `/grill-me` for 2+ unresolved design decisions.

---

## Standard Development Workflows

All agents MUST follow the relevant standardized workflow catalog in [.agents/workflows/README.md](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/workflows/README.md) when performing tasks:

- [Feature Development Workflow](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/workflows/feature-development.md): Mandatory 6-phase pipeline for new features, components, and services.
- [Bug Fix & Debugging Workflow](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/workflows/bug-fix.md): Empirical log analysis, reproduction testing, root-cause isolation, and regression verification.
- [Tauri IPC Integration Workflow](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/workflows/tauri-ipc-integration.md): Rust command handler, error serialization, whitelist capabilities, and TS invoke wrappers.
- [Release Preparation Workflow](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/workflows/release-prep.md): Security audit, version synchronization, CHANGELOG updates, and production build gate.
- [Refactoring & Code Quality Workflow](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/workflows/refactoring-code-quality.md): Baseline verification, incremental refactoring, API contract safety, and token/performance checks.

---

## Workspace System Architecture & Ecosystem Catalog

All workspace subdirectories are fully implemented and integrated. Refer to their catalogs for specific configurations, specifications, and execution scripts:

- **Core System & Schemas**: [.agents/core/](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/core/README.md) — Master manifests ([`agent-manifest.json`](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/core/agent-manifest.json)), environment parameters ([`environment.json`](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/core/environment.json)), context loader configs ([`context-loader.json`](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/core/context-loader.json)), bootstrap hooks ([`bootstrap.json`](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/core/bootstrap.json)), and system prompt extensions ([`system-prompt-extensions.md`](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/core/system-prompt-extensions.md)).
- **Slash Commands Protocol**: [.agents/commands/](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/commands/README.md) — Specifications for `/grill-me`, `/goal`, `/ipc-gen`, `/audit`, `/release-prep`, `/verify`, `/benchmark`, and `/learn`.
- **Automation Utilities**: [.agents/scripts/](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/scripts/README.md) — Node.js & PowerShell automation utilities ([`validate-agents.js`](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/scripts/validate-agents.js), [`gen-ipc.js`](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/scripts/gen-ipc.js), [`run-workspace-tests.ps1`](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/scripts/run-workspace-tests.ps1), [`check-deps-security.ps1`](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/scripts/check-deps-security.ps1), [`sync-version.ps1`](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/scripts/sync-version.ps1)).
- **Workspace Plugins**: [.agents/plugins/](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/plugins/README.md) — Custom plugin packages ([`geosource-tauri-plugin`](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/plugins/geosource-tauri-plugin/plugin.json), [`workspace-auditor-plugin`](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/plugins/workspace-auditor-plugin/plugin.json)).
- **Architecture Documentation**: [.agents/documents/](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/documents/README.md) — Architectural guides ([`architecture-overview.md`](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/documents/architecture-overview.md), [`agent-interaction-model.md`](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/documents/agent-interaction-model.md), [`extension-guide.md`](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/documents/extension-guide.md), [`tauri-geosource-spec.md`](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/documents/tauri-geosource-spec.md)).
- **Agent Roles Catalog**: [.agents/agents/](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/agents/README.md) — 11 specialized agent personas.
- **Custom Skills**: `.agents/skills/` — `skill-designer-pro`, `token-efficiencie`.
- **Memory Logs**: `.agents/memory/` — Individual agent activity logs and scratchpad tracking files.


