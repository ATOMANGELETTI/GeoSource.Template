# Token Budget Heuristics

Quick reference for estimating token consumption before loading files into
Antigravity IDE agent context.

---

## Approximation Rules

| Content Type | Chars per Token | Notes |
|---|---|---|
| Dense code (Rust, TypeScript) | 3.5–4 | Identifiers, syntax, brackets |
| Sparse code (scripts, YAML) | 4–5 | Lots of whitespace |
| Markdown prose | 4–5 | English text |
| JSON / TOML config | 3–4 | High symbol density |
| HTML / Svelte templates | 3–4 | Tags inflate char count |
| Minified code | 2–3 | Very dense, rarely used in context |

**Rule of thumb**: `file_size_bytes / 4` = conservative token estimate for code.

---

## File Size → Action Thresholds

| File Size | Est. Tokens | Recommended Action |
|---|---|---|
| < 2 KB | < 500 | Safe to `view_file` directly |
| 2–5 KB | 500–1,250 | Use `view_file` with line range if possible |
| 5–20 KB | 1,250–5,000 | **Stub required** — use `generate_stub.ps1` |
| 20–50 KB | 5,000–12,500 | **grep_search only** — never full read |
| > 50 KB | > 12,500 | **Never load** — use targeted grep or external summary |

---

## Tool Call Token Overhead

See `tool_call_overhead.md` for per-tool estimates.

---

## Context Window Budget Allocation

When operating in TEM, allocate your context budget as follows:

| Budget Category | % of Context Window | Notes |
|---|---|---|
| System + skill instructions | 5–10% | Fixed overhead |
| Conversation history | 10–20% | Grows over time — be concise |
| File content loaded | 20–40% | Apply strict thresholds above |
| Response buffer | 20–30% | Reserve for output |
| Safety margin | 10% | Never consume to the limit |

---

## GeoSource-Specific Estimates

Common GeoSource files and their approximate token costs:

| File | Approx. Tokens | Action |
|---|---|---|
| `src-tauri/src/main.rs` | ~400 | view_file (small) |
| `src-tauri/src/lib.rs` | ~300–800 | view_file or range |
| `src-tauri/Cargo.toml` | ~200 | view_file directly |
| `src/lib/stores/*.ts` | ~300–600 | view_file or stub |
| `src/routes/+layout.svelte` | ~400 | view_file directly |
| `src-tauri/tauri.conf.json` | ~500 | view_file directly |
| Large Svelte page components | ~800–2,000 | Stub + targeted range |
| Generated type files | ~2,000–8,000 | **grep_search only** |
