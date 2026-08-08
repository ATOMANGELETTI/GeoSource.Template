# Token Efficiency & Quality Preservation Standard

This document establishes mandatory guidelines for maximizing token efficiency across all agent operations within this repository without compromising accuracy, security, code quality, or thoroughness.

---

## Pillar 1: Discovery & Context Minimization

- **Grep-Before-View Rule**: Never invoke `view_file` on a large file simply to locate a function, symbol, or string. Always use `grep_search` with targeted `Query` and `Includes` filters first.
- **Selective & Line-Bounded Reading**:
  - For files under 100 lines (or ~2 KB), direct `view_file` is permitted.
  - For files over 100 lines, use `StartLine` and `EndLine` ranges around target symbols discovered via `grep_search`.
  - For files over 500 lines or complex modules, generate structural stubs (e.g., via `generate_stub.ps1` where available) or read signatures first.
- **Directory Discovery**: Limit `list_dir` calls to single directory depth (`1` level). Never recursively list and read entire directory trees indiscriminately.
- **Context Audit Gate**: Before calling tools to inspect code, check existing user metadata (open files, active document) and knowledge items (KIs). Do not re-fetch information already present in the active conversation context.

---

## Pillar 2: Scoped Subagent & Documentation Interaction

- **Precise Browser Subagent Delegation**: When delegating DOM or browser actions to `browser_subagent`, craft highly specific, single-value extraction instructions. Never request full DOM tree dumps or broad page state when only a single property or element value is required.
- **Targeted Web Reading**: When searching for API syntax or documentation, target specific page endpoints (`read_url_content`) rather than fetching entire documentation roots or top-level landing pages.
- **No Redundant Fetching**: Never re-read a web page or re-run a search query unless parameters or target URLs have explicitly changed.

---

## Pillar 3: Concise Communication & Response Discipline

- **Focused Code Diffs & Snippets**: In response outputs, provide only modified blocks with minimal necessary surrounding context lines (+2 to +3 lines). Avoid reprinting unmodified file bodies or boilerplate.
- **Direct & Decision-Oriented Explanations**: Present rationale concisely—target one sentence per architectural decision. Omit verbose filler, generic greetings, and historical essays on root causes.
- **Summarized Tool Outputs**: Synthesize tool output results directly into clean natural language summaries rather than echoing raw, verbose tool responses back to the conversation context.
- **Batch Edits**: Prefer `multi_replace_file_content` over consecutive single-replacement calls when performing non-contiguous edits in the same file.

---

## Pillar 4: Quality & Integrity Non-Negotiables

- **Zero Quality Degradation**: Token optimization MUST NOT lead to swallowed errors, dummy fallbacks, omitted tests, or premature completion.
- **Strict Verification Compliance**: All mandatory build, lint (`cargo clippy`, `npm run lint`), and test execution steps defined in the [Code Quality Standard](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/rules/code-quality.md) must be executed in full before declaring task completion.
- **Complete Traceability**: Maintain absolute accuracy in file links, function signatures, and error diagnostics regardless of response brevity.
