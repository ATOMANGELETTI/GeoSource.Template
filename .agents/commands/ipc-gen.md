# `/ipc-gen` Command Specification

## Purpose
The `/ipc-gen` command automates the boilerplate generation for new Tauri IPC commands in Rust and their corresponding typed TypeScript invoke wrappers.

---

## Execution Protocol

1. **Parameters**: Command name, input payload parameters, return payload structure.
2. **Backend Generation**: Create Rust function handler in `src-tauri/src/commands/` using `#[tauri::command]` and returning `Result<T, CommandError>`.
3. **Registration**: Register handler in `tauri::Builder` setup and declare permissions in `capabilities/main.json`.
4. **Frontend Generation**: Generate typed TypeScript wrapper function in `src/api/` with full JSDoc annotations and error handling.
5. **Automation Script**: Execute `node .agents/scripts/gen-ipc.js` when appropriate.
