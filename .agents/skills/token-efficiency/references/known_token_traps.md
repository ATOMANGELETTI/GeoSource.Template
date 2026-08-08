# Known Token Traps

Anti-patterns that silently inflate token usage in Antigravity IDE sessions.
Read this before starting any complex task in TEM.

---

## Trap 1 — The Recursive Directory Dump

**What happens**: `list_dir` called with recursive option on `src/` or `src-tauri/`
returns hundreds of entries, each with path, size, and child count.

**Token cost**: 2,000–10,000 tokens for a medium project tree.

**Fix**: Use shallow `list_dir` → identify the target subdirectory → shallow
`list_dir` again. Maximum 2 levels deep before using `grep_search` instead.

---

## Trap 2 — Full DOM Capture via browser_subagent

**What happens**: Agent instructs `browser_subagent` to "read the page" or
"get the page content" without scoping the return value.

**Token cost**: 5,000–50,000 tokens for a modern SPA page.

**Fix**: Always instruct `browser_subagent` to return ONLY the specific value
needed. Example: "Return only the text content of `#error-message` or empty
string if not found."

---

## Trap 3 — view_file Without Line Range on Large Files

**What happens**: Agent calls `view_file` on a 500-line Rust file to find a
single struct definition.

**Token cost**: 1,500–4,000 tokens for the full file read.

**Fix**: Use `grep_search` to find the line number first, then `view_file`
with a ±20 line window around that line number.

```
Step 1: grep_search("struct GeoLayer", MatchPerLine=true) → line 127
Step 2: view_file(StartLine=125, EndLine=155) → ~100 tokens
```

---

## Trap 4 — Documentation Root Loading

**What happens**: Agent uses `read_url_content("https://tauri.app/")` or similar
root URL to find a specific API.

**Token cost**: 5,000–20,000 tokens for a docs site root page.

**Fix**: Use `search_web` to find the exact doc URL first, then
`read_url_content` on the specific page (not the root).

---

## Trap 5 — Conversation History Bloat

**What happens**: Long conversation sessions accumulate tool call results, large
file excerpts, and verbose responses from previous turns. Every subsequent
turn includes this growing history.

**Token cost**: Can consume 30–50% of context window by turn 20.

**Fix**:
- Keep responses concise in TEM (apply response discipline rules)
- Avoid echoing large tool results back in your response
- Use artifacts for large outputs instead of inline code blocks

---

## Trap 6 — Multi-File Patch Chains

**What happens**: Agent writes to 5+ files sequentially, each producing a
full `write_to_file` call overhead plus confirmation response.

**Token cost**: ~500–1,000 tokens overhead per write call in a chain.

**Fix**: Batch edits with `multi_replace_file_content` when editing multiple
sections of the same file. Plan all writes before executing them.

---

## Trap 7 — Skill Stacking

**What happens**: User message triggers 3+ skills simultaneously. All bodies
are injected into context before the model even begins the task.

**Token cost**: 3,000–15,000 tokens of skill overhead before any work.

**Fix**: Structure SKILL.md bodies to be minimal (< 300 lines for low-frequency
skills). Move all verbose content to `references/` which is only loaded on demand.

---

## Trap 8 — run_command on Build/Test Output

**What happens**: Agent runs `cargo test` or `npm run build` and captures the
full output for analysis.

**Token cost**: Build output can be 5,000–50,000 tokens (especially on failure
with full error traces).

**Fix**: Pipe command output to `Select-String` for filtering, or redirect to
a temp file and `grep_search` the file:

```powershell
# Instead of: cargo test 2>&1
# Use:
cargo test 2>&1 | Select-String -Pattern "FAILED|error\[" | Select-Object -First 20
```

---

## Trap 9 — Unnecessary Re-reads

**What happens**: Agent reads the same file multiple times across a task
because it didn't retain the content from the first read.

**Token cost**: 2× the file's token cost.

**Fix**: In TEM, explicitly track "files already loaded this session" mentally.
If you've read a file, reference it from memory — do NOT re-read it unless
the task explicitly modifies it between reads.

---

## Trap 10 — Asking vs. Knowing

**What happens**: Agent uses `ask_question` to clarify something that's already
determinable from open editor files, project structure, or conversation history.

**Token cost**: The `ask_question` call itself is low (~100 tokens), but the
user response + round-trip adds 200–500 tokens and delays the task.

**Fix**: Check the user's active document, cursor position, and open files
from the metadata provided with every message — this is free context.
Only ask when the required information is truly unavailable.
