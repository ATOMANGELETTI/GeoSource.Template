# Planning & Architecture Standard

This document establishes the mandatory planning gates that all agents must complete before touching any source code in this repository. The goal is to prevent reckless edits, surface hidden complexity early, and maintain an auditable trail of architectural decisions.

---

## Pillar 1: Mandatory Plan-First Gate

- **No Code Before a Plan**: For any task that involves creating, modifying, or deleting source files, the agent MUST create or update an `implementation_plan.md` artifact in the current conversation artifact directory before writing a single line of code.
- **Scope Triggers — Plan Required When**:
  - The change touches 2 or more files.
  - The task introduces a new module, crate, or npm package.
  - The task modifies a public API, Tauri IPC command surface, or configuration schema.
  - The task is architecturally ambiguous or involves trade-offs between approaches.
  - The task is destructive (deletes files, renames exports, changes data models).
- **Scope Exceptions — Plan NOT Required For**:
  - Fixing a single isolated typo or syntax error.
  - Updating a comment or docstring only.
  - Adding a single-line log statement for debugging.
  - Trivial formatting or whitespace-only changes.

---

## Pillar 2: Implementation Plan Requirements

Every `implementation_plan.md` MUST contain the following sections:

1. **Overview**: A concise 2–4 sentence description of the goal and why the change is needed.
2. **Open Questions**: Any ambiguous requirements, design decisions, or unclear constraints — resolved via `/grill-me` if 2 or more exist.
3. **Proposed Changes**: Files to be created, modified, or deleted, grouped by component. Use `[NEW]`, `[MODIFY]`, `[DELETE]` markers.
4. **Verification Plan**: Exactly which build, lint, test, and manual verification steps will be run.
5. **Risks & Alternatives**: At least one alternative approach considered and why it was rejected.

---

## Pillar 3: User Approval Gate

- After creating `implementation_plan.md`, the agent MUST stop and set `RequestFeedback: true` in the artifact metadata.
- The agent MUST NOT proceed to execution until the user explicitly approves the plan (via Proceed or written confirmation).
- If the user requests changes to the plan, the agent updates the artifact and re-requests approval before any code changes.

---

## Pillar 4: Task Tracking During Execution

- Upon approval, the agent MUST create a `task.md` artifact with a checkbox list of all implementation steps.
- Task items MUST be updated (`[ ]` → `[/]` → `[x]`) as work progresses.
- If a task item cannot be completed as planned, it must be flagged in `task.md` with a justification and escalated to the user before moving on.

---

## Pillar 5: Post-Execution Walkthrough

- After all tasks are complete, the agent MUST create or update a `walkthrough.md` artifact documenting:
  - What was changed and why.
  - What was verified (build, lint, test results).
  - Any deviations from the original plan and their justification.
  - What the user should verify manually (if anything).

---

## Pillar 6: Architecture Decision Records

- Any decision that establishes a pattern, selects a library, or rejects a significant alternative MUST be recorded as an ADR in `other/documents/adr/`.
- ADR filename format: `YYYY-MM-DD-short-title.md`.
- ADR template: Title / Status / Context / Decision / Consequences.
- The agent is responsible for creating or updating the relevant ADR as part of the implementation task.
