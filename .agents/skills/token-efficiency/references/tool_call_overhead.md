# Tool Call Overhead — Token Cost Estimates

Each tool call in Antigravity IDE consumes tokens beyond just the content
returned. This reference documents the overhead cost per tool type.

---

## Overhead Model

Every tool call has two token costs:

1. **Call overhead** — tokens for the tool invocation structure itself (name,
   parameters, metadata). Roughly constant per tool.
2. **Response tokens** — tokens in the content returned. Highly variable.

In TEM, minimize both: choose tools with low overhead AND scope parameters to
limit response size.

---

## Per-Tool Estimates

| Tool | Call Overhead | Typical Response | Notes |
|---|---|---|---|
| `grep_search` (MatchPerLine=false) | ~50 | ~20–100 | Filenames only — very cheap |
| `grep_search` (MatchPerLine=true) | ~50 | ~100–2,000 | Grows with match count |
| `view_file` (small, no range) | ~60 | ~200–2,000 | Full file — use ranges |
| `view_file` (with StartLine/EndLine) | ~70 | ~50–500 | Targeted — preferred |
| `list_dir` (shallow) | ~50 | ~100–400 | One level — cheap |
| `list_dir` (recursive) | ~50 | ~500–5,000 | Avoid on large dirs |
| `run_command` (fast cmd) | ~80 | ~20–200 | Use for metadata queries |
| `run_command` (build/test cmd) | ~80 | ~500–10,000 | Output can be very large |
| `write_to_file` | ~100 | ~50 | Response is minimal |
| `multi_replace_file_content` | ~150 | ~50 | Slightly higher overhead |
| `search_web` | ~100 | ~500–3,000 | Summary format — scoped |
| `read_url_content` | ~80 | ~500–10,000 | HTML→markdown, scope the URL |
| `browser_subagent` | ~200 | ~500–20,000 | High overhead — use sparingly |
| `generate_image` | ~150 | ~50 | Response is just path |
| `ask_question` | ~100 | ~50–200 | Blocking — user must respond |

---

## Decision Rules

**Prefer lower-overhead alternatives whenever possible:**

```
Need: Does function X exist?
  BAD:  view_file(large_file)        → ~2,000 tokens
  GOOD: grep_search("fn X", ...)     → ~100 tokens  ✓

Need: Directory structure overview
  BAD:  list_dir(recursive=true)     → ~3,000 tokens
  GOOD: list_dir(one level) × 2     → ~600 tokens  ✓

Need: Read a 300-line file
  BAD:  view_file(no range)          → ~900 tokens
  GOOD: view_file(StartLine=50, EndLine=80) → ~100 tokens  ✓

Need: Page title from a web app
  BAD:  browser_subagent("get page content") → ~5,000 tokens
  GOOD: browser_subagent("return only document.title") → ~250 tokens  ✓
```

---

## Cumulative Cost Traps

Be especially careful about additive tool call chains:

- `list_dir` → `view_file` × N files: can easily cost 5,000–20,000 tokens
- `search_web` × 3 + `read_url_content` × 3: can cost 10,000+ tokens
- `browser_subagent` with DOM capture: routinely 10,000–50,000 tokens

**In TEM**: Every chain of > 3 tool calls should be evaluated for collapsing
into a single targeted call before execution.
