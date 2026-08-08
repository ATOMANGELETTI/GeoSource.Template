# Minimal Example — Token-Efficient Mode Activation

## Scenario

**User message**: "Token efficient: find where the `load_project` command is
defined in the GeoSource backend."

**Trigger matched**: `"token efficient"` → `token-efficiencie` skill activates.

---

## Normal Execution (without TEM)

Steps an agent might take WITHOUT TEM:

```
1. list_dir("src-tauri/src", Recursive=true)
   → Returns full tree: ~40 files listed
   → Cost: ~800 tokens

2. view_file("src-tauri/src/main.rs")
   → Full file: ~80 lines
   → Cost: ~300 tokens

3. view_file("src-tauri/src/lib.rs")
   → Full file: ~120 lines
   → Cost: ~450 tokens

4. view_file("src-tauri/src/commands/mod.rs")
   → Full file: ~60 lines
   → Cost: ~220 tokens

5. view_file("src-tauri/src/commands/project.rs")
   → Full file: ~200 lines
   → Cost: ~750 tokens

TOTAL TOOL CALLS: 5
ESTIMATED TOKENS: ~2,520
```

---

## TEM Execution (with token-efficiencie active)

Steps the agent takes IN TEM:

```
1. grep_search("load_project", Includes=["*.rs"], MatchPerLine=true)
   → Returns: src-tauri/src/commands/project.rs:47: pub fn load_project(...)
   → Cost: ~120 tokens

2. view_file("src-tauri/src/commands/project.rs", StartLine=44, EndLine=65)
   → Returns 22 lines: the function signature + first few lines
   → Cost: ~90 tokens

TOTAL TOOL CALLS: 2
ESTIMATED TOKENS: ~210
```

---

## Comparison

| Metric | Normal | TEM | Savings |
|---|---|---|---|
| Tool calls | 5 | 2 | 3 fewer |
| Est. tokens | ~2,520 | ~210 | ~2,310 (~92%) |
| Time to answer | ~5 round-trips | ~2 round-trips | Faster |

---

## Key TEM Rules Applied

- ✅ `grep_search` used instead of navigating directory structure
- ✅ `view_file` with precise line range (not full file)
- ✅ No `list_dir` calls — structure known from GeoSource map
- ✅ 2 tool calls instead of 5
