# GeoSource Tauri Template System Specification

This specification outlines the technical architecture of the GeoSource application stack, including backend Rust crates, Tauri v2 IPC contracts, security capability boundaries, and frontend component integration.

---

## 1. System Architecture

- **Backend Architecture**: Rust binary crate in `src-tauri/src/` built on Tauri v2 framework.
- **Frontend Architecture**: Modern Web UI in `src/` communicating via typed Tauri IPC invoke interfaces.
- **Configuration Management**: Centralized configuration schemas in `configs/` and environment variables in `.env`.

---

## 2. IPC Security Policy

- All Tauri commands exposed via `#[tauri::command]` must be explicitly declared in `src-tauri/capabilities/main.json`.
- File system access must be restricted to workspace boundary scopes.
- Commands handling external network requests must validate input parameters before execution.
