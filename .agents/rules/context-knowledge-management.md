# Context & Knowledge Management Standard

This document defines the mandatory process for consulting existing knowledge before initiating any research, writing, or code changes. Skipping this process leads to duplicated work, contradictory implementations, and missed established patterns.

---

## Pillar 1: Mandatory KI-First Protocol

- **Non-Negotiable Gate**: Before performing ANY of the following actions — research via web search, `view_file`, `list_dir`, `grep_search`, or writing/editing code — the agent MUST review all Knowledge Item (KI) summaries provided at conversation start.
- **Relevance Check**: Identify all KI titles/summaries that match the current task domain. If any are relevant, read their artifacts in full before proceeding.
- **No Redundant Research**: If a KI already documents an established pattern, API usage, or architectural decision, that KI content takes precedence. Do not re-discover it independently from scratch.
- **Stale KI Caveat**: KIs are point-in-time snapshots. Always cross-reference KI content against the current workspace implementation before committing to an approach. Flag discrepancies explicitly.

---

## Pillar 2: Active-Context Consultation

Before invoking any tool to inspect the codebase, the agent MUST check:

1. **Open Documents**: Review the user's currently open files (provided in `ADDITIONAL_METADATA`). If the relevant file is already open and its content is visible in context, do NOT re-read it with `view_file`.
2. **Cursor Position**: Use the user's active cursor line as the primary anchor for targeted searches.
3. **Conversation History**: If the answer to a question or the content of a file was already retrieved earlier in the current conversation, do NOT re-fetch it. Use the content already in context.
4. **Transcript Lookup**: For information from earlier in a long session that has been truncated from the active context window, consult `transcript.jsonl` before calling tools to re-discover it.

---

## Pillar 3: No Redundant Tool Calls

- **Grep-Before-View**: Never call `view_file` on an unfamiliar large file to locate a symbol. Use `grep_search` first.
- **Single-Depth Directory Listing**: `list_dir` calls must be scoped to one directory at a time. Never recursively dump entire directory trees.
- **No Re-Fetch**: Never re-read a URL, re-run a search query, or re-list a directory unless the parameters have explicitly changed since the last call.
- **Deduplication Check**: Before calling any information-gathering tool, verify the information isn't already available in the current context window.

---

## Pillar 4: Knowledge Preservation

- **Learn from Corrections**: When the user corrects the agent's behavior or resolves a non-obvious setup problem, recommend using `/learn` to persist that correction as a new KI.
- **Pattern Reuse**: When the agent discovers a reusable pattern (e.g., how Tauri IPC commands are structured in this project), note it in the current task artifact so subsequent steps in the same session can reference it without re-discovery.
- **KI Accuracy Feedback**: If a KI is found to be stale or incorrect, the agent must flag this explicitly in its response so the user can update the KI.
