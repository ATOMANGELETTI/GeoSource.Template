# Embedded Database Patterns for Tauri v2 Applications

## Architectural Principles
1. **Always use WAL mode (`PRAGMA journal_mode=WAL;`)**: Enables non-blocking concurrent readers while writing.
2. **Path Resolution via Tauri PathResolver**: Never hardcode database paths (`app_handle.path().app_data_dir()`).
3. **Prepared Statements**: Compile SQL queries once, reuse across IPC commands to eliminate SQL injection and query parsing overhead.
