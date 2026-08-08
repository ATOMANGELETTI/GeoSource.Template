---
name: tauri-ipc-generator
description: Generates typed Rust IPC commands and TypeScript wrappers adhering to Tauri v2 security policies. Trigger on IPC creation requests or /ipc-gen command.
---

# Tauri IPC Generator Skill

## Overview
This skill provides automated guidelines for generating safe, performant, typed Tauri v2 IPC handlers in Rust and their TypeScript invoking wrappers.

---

## Instructions

1. **Rust Handler Pattern**:
   - Location: `src-tauri/src/commands/`
   - Use `#[tauri::command]` attribute.
   - Return `Result<T, CommandError>` where `CommandError` implements `serde::Serialize`.
   - Never panic (`unwrap()`, `expect()`).

2. **Capability Whitelisting**:
   - Register command name in `src-tauri/capabilities/main.json`.

3. **TypeScript Invoke Wrapper**:
   - Location: `src/api/`
   - Provide full TypeScript interfaces for payload and return types.
   - Annotate function with JSDoc describing behavior and error states.
