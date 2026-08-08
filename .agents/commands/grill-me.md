# `/grill-me` Command Specification

## Purpose
The `/grill-me` command triggers an interactive design interview. The AI agent asks the user questions one at a time to clarify every aspect of a proposed feature, architecture change, or system configuration until complete alignment is reached.

---

## Execution Protocol

1. **Pre-flight Codebase Inspection**: Before asking any question, search the codebase (`grep_search`, `list_dir`) to check if the answer is already documented or implicit in existing code.
2. **One-Question Discipline**: Ask questions one at a time using the `ask_question` tool.
3. **Recommendation Mandate**: Always provide a recommended option marked with `(Recommended)` as the first choice.
4. **Targeted Formatting**: Format choices as direct user responses rather than descriptions of agent actions.
5. **Plan Synthesis**: Once all questions are resolved, draft an `implementation_plan.md` artifact incorporating all agreed-upon choices.
