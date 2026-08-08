# Workspace Workflows Catalog

This directory contains standardized execution workflows for AI agents and human developers operating within the **GeoSource** Tauri/Rust/TypeScript project.

---

## Available Workflows

| Workflow | Description | Trigger Criteria |
| :--- | :--- | :--- |
| 🚀 [Feature Development](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/workflows/feature-development.md) | Standard pipeline for building and integrating new UI components, business logic, or backend capabilities. | Implementing a new feature, adding UI screens, creating new modules. |
| 🐛 [Bug Fix & Debugging](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/workflows/bug-fix.md) | Systematic protocol for reproducing, diagnosing, isolating, and fixing bugs without regressions. | Resolving runtime errors, test failures, UI glitches, or crash reports. |
| ⚡ [Tauri IPC Integration](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/workflows/tauri-ipc-integration.md) | Secure protocol for connecting Rust backend handlers with TypeScript frontend invoke wrappers. | Exposing Rust functionality to UI, modifying IPC commands or permissions. |
| 📦 [Release Preparation](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/workflows/release-prep.md) | Pre-release auditing, version bumping, changelog update, security checks, and production build gate. | Preparing a new tag, candidate build, or production distribution. |
| 🛠️ [Refactoring & Code Quality](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/workflows/refactoring-code-quality.md) | Safe refactoring pipeline ensuring zero broken contracts, preserved coverage, and optimized token use. | Restructuring modules, cleaning technical debt, updating obsolete APIs. |

---

## Workflow Execution Rules

1. **Mandatory Compliance**: All AI agents must adhere to the steps specified in the matching workflow when undertaking relevant tasks.
2. **Rule Synergy**: Workflows operate in conjunction with workspace rules defined in [.agents/AGENTS.md](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/AGENTS.md).
3. **Artifact Integrity**: Workflows enforce mandatory plan-first gates (`implementation_plan.md`), task tracking (`task.md`), and post-execution summaries (`walkthrough.md`).
