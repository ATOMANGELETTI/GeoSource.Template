# Tauri v2 & Rust IPC Refactoring Guide

## 1. Tauri v2 IPC Command Standards

All Tauri IPC commands in GeoSource must adhere to the following refactoring standards:

- **Async Command Signature**: Long-running operations MUST be async.
  ```rust
  #[tauri::command]
  pub async fn process_spatial_data(input: SpatialPayload) -> Result<SpatialResult, AppError> {
      // Async logic
  }
  ```
- **Error Serialization**: Never return `String` for errors. Use a custom enum implementing `serde::Serialize` and `thiserror::Error`.
  ```rust
  #[derive(Debug, thiserror::Error)]
  pub enum AppError {
      #[error("IO error: {0}")]
      Io(#[from] std::io::Error),
      #[error("Spatial engine error: {0}")]
      Spatial(String),
  }

  impl serde::Serialize for AppError {
      fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
      where
          S: serde::Serializer,
      {
          serializer.serialize_str(&self.to_string())
      }
  }
  ```

## 2. Capabilities & Isolation

- Enforce exact command whitelisting in `src-tauri/capabilities/default.json`.
- Restrict filesystem access scope strictly to application data directories or user-selected file paths.
