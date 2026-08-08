# Simple Refactoring Proposal: Typed Error Handling

## Goal Description
Refactor unhandled panic risk in IPC handler `load_geojson_file` by replacing `.unwrap()` calls with typed `Result<T, AppError>`.

## Proposed Changes

### Rust Backend Layer

#### [MODIFY] `src-tauri/src/commands.rs`

```diff
-#[tauri::command]
-pub fn load_geojson(path: String) -> String {
-    let content = std::fs::read_to_string(path).unwrap();
-    content
-}
+#[tauri::command]
+pub async fn load_geojson(path: String) -> Result<String, AppError> {
+    let content = tokio::fs::read_to_string(&path)
+        .await
+        .map_err(|e| AppError::IoError(e.to_string()))?;
+    Ok(content)
+}
```

## Verification Plan
- Run `cargo test` and `cargo check` to verify zero compiler errors.
