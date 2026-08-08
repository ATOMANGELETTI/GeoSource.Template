# `/goal` Command Specification

## Purpose
The `/goal` command indicates that the task is intended to run autonomously for an extended period without user intervention (e.g. overnight or background processing). The agent must be extra thorough and only conclude when the objective is 100% verified.

---

## Execution Protocol

1. **Self-Correction & Thoroughness**: Continuously validate implementation details against workspace rules and tests.
2. **Iterative Audit**: When tasks complete, run verification scripts (`.agents/scripts/run-workspace-tests.ps1`, `validate-agents.js`) to ensure zero regressions.
3. **No Early Exit**: Do not stop or ask for user input unless blocked by explicit critical errors that require manual credentials or external service access.
4. **Walkthrough Generation**: Generate a complete `walkthrough.md` artifact detailing all changes, verification results, and diff summaries upon task completion.
