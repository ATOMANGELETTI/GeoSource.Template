# TEM Rules Quick-Reference Cheatsheet

Pocket guide for Token-Efficient Mode (TEM). Pin this. Use it.

---

## The 5 Cardinal Rules

```
1. GREP FIRST  — never view_file a large file for a symbol search
2. STUB LARGE  — files > 100 lines get a stub before full read
3. SCOPE BROWSER — browser_subagent returns ONLY the exact value needed
4. TARGET DOCS — read_url_content on the SPECIFIC page, not the root
5. TRIM OUTPUT — one sentence per decision; no essays
```

---

## Tool Selection Decision Table

```
I need to...                        Use...
─────────────────────────────────────────────────────
Find a symbol in the codebase    →  grep_search (MatchPerLine=true)
Check if a file exists           →  run_command: Test-Path
Get file size before reading     →  run_command: (Get-Item path).Length
Browse directory structure       →  list_dir (ONE level only)
Read a 50-line file              →  view_file (no range needed)
Read a section of 300-line file  →  grep_search → view_file(StartLine, EndLine)
Understand a 500-line module     →  generate_stub.ps1 → grep targeted sections
Get a DOM value from a page      →  browser_subagent (return ONLY that value)
Find an API signature in docs    →  search_web → read_url_content (exact page)
Write multiple file edits        →  multi_replace_file_content (batch them)
```

---

## File Size → Action Quick Map

```
< 2 KB  (< 500 tokens)   → view_file directly ✓
2–5 KB  (500–1,250)      → view_file with range if possible
5–20 KB (1,250–5,000)    → generate_stub.ps1 FIRST
> 20 KB (> 5,000)        → grep_search ONLY — never full read
```

---

## Response Discipline Quick Rules

```
Code blocks:    Changed section only (+ 2 lines context each side)
Explanations:   1 sentence per decision
File summaries: 2 lines max
Errors:         State the fix — skip the root cause essay
Tool results:   Quote only the relevant part
```

---

## End-of-Task Checklist

Before finishing any TEM task:

- [ ] Produced token_efficiency_report.md?
- [ ] No file read more than once this session?
- [ ] All tool call results summarized (not echoed in full)?
- [ ] Response kept under TEM verbosity rules?
- [ ] Stubs used for files > 100 lines?
