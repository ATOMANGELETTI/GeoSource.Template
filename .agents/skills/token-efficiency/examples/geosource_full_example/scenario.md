# Full GeoSource Example — Adding a Tauri Command in TEM

## Scenario

**User message**: "Save tokens — add a Tauri command `load_geojson` that reads
a GeoJSON file from disk and returns its contents as a string."

**Trigger matched**: `"save tokens"` → `token-efficiencie` skill activates.

**Task scope**: Add a Rust command in `src-tauri/src/commands/` + register it
in `lib.rs` + add a TypeScript invoke binding in `src/lib/`.

---

## Phase 1 — Discovery (TEM vs Normal)

### Normal Mode Discovery
```
list_dir(src-tauri/, recursive=true)   → ~3,000 tokens
view_file(src-tauri/Cargo.toml)        → ~200 tokens
view_file(src-tauri/src/main.rs)       → ~300 tokens
view_file(src-tauri/src/lib.rs)        → ~450 tokens (full file)
view_file(src-tauri/src/commands/)     → each file read: ~2,000 tokens total
DISCOVERY TOTAL: ~5,950 tokens
```

### TEM Discovery
```
# Use geosource_structure_map.md (already in context — 0 additional tokens)
# Know: commands/ dir, lib.rs is command registration point

grep_search("invoke_handler", Includes=["*.rs"])   → ~80 tokens (find registration line)
view_file(lib.rs, StartLine=1, EndLine=30)          → ~130 tokens (see existing pattern)
grep_search("#[tauri::command]", Includes=["*.rs"]) → ~120 tokens (find all commands)
DISCOVERY TOTAL: ~330 tokens
```

**Discovery savings**: ~5,620 tokens (~95% reduction)

---

## Phase 2 — Implementation

In both modes, the implementation code is the same. TEM only affects HOW the
agent finds context, not what it writes.

### New File: `src-tauri/src/commands/geo.rs`

```rust
use std::fs;
use tauri::command;

#[tauri::command]
pub fn load_geojson(path: String) -> Result<String, String> {
    fs::read_to_string(&path).map_err(|e| e.to_string())
}
```

### Modification: `src-tauri/src/lib.rs`

```rust
// Add to invoke_handler:
tauri::generate_handler![
    // ... existing commands ...
    geo::load_geojson,
]
```

### New File: `src/lib/geo.ts`

```typescript
import { invoke } from "@tauri-apps/api/core";

export async function loadGeoJSON(path: string): Promise<string> {
  return await invoke<string>("load_geojson", { path });
}
```

---

## Phase 3 — Verification (TEM vs Normal)

### Normal Mode Verification
```
run_command("cargo build")    → full build output: ~3,000 tokens
view_file(lib.rs)             → re-read to confirm: ~450 tokens
VERIFICATION TOTAL: ~3,450 tokens
```

### TEM Verification
```
run_command("cargo check 2>&1 | Select-String 'error' | Select-Object -First 5")
→ Targeted error check: ~50 tokens

# If no errors — done. No re-read of lib.rs (already confirmed from earlier range read)
VERIFICATION TOTAL: ~50 tokens
```

**Verification savings**: ~3,400 tokens (~99% reduction)

---

## Full Comparison

| Phase | Normal Tokens | TEM Tokens | Savings |
|---|---|---|---|
| Discovery | ~5,950 | ~330 | ~5,620 |
| Implementation | ~800 | ~800 | 0 (same) |
| Verification | ~3,450 | ~50 | ~3,400 |
| Response | ~600 | ~200 | ~400 |
| **Total** | **~10,800** | **~1,380** | **~9,420 (~87%)** |

---

## TEM Rules Applied

- ✅ `geosource_structure_map.md` used instead of `list_dir` (0-cost navigation)
- ✅ `grep_search` used to find command registration pattern
- ✅ `view_file` with line range (first 30 lines of lib.rs, not full file)
- ✅ `cargo check` instead of `cargo build` for validation
- ✅ Piped + filtered command output (5 lines, not full build log)
- ✅ Concise response — no verbose rationale paragraphs
- ✅ No re-reads of files already loaded this session
