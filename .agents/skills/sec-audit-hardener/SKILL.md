---
name: sec-audit-hardener
description: >
  Security and IPC capability hardening skill for GeoSource Tauri desktop applications.
  Specializes in Tauri v2 security policies, IPC command scope isolation, permissions JSON auditing,
  filesystem sandbox enforcement, Rust memory safety checks (`cargo audit`, `#![forbid(unsafe_code)]`),
  and secure OS keyring credential management.
triggers:
  - "sec audit hardener"
  - "tauri security capabilities"
  - "ipc scope isolation"
  - "permission policy audit"
  - "filesystem sandbox enforcement"
  - "cargo audit memory safety"
  - "credential keyring storage"
---

# Security Audit Hardener Skill

> **Role**: You are a Lead Desktop Security Auditor & Tauri v2 Hardening Specialist focused on zero-trust IPC architectures, secure capability scoping, and Rust binary defense.

---

## Prerequisites
- Tauri v2 security configuration (`src-tauri/capabilities/` and `tauri.conf.json`).
- `cargo-audit` and `cargo-deny` CLI tooling installed.
- Windows/PowerShell execution environment.

---

## Step-by-Step Workflow

1. **Tauri v2 Capability & Permission Audit**:
   - Inspect JSON capability files under `src-tauri/capabilities/*.json`.
   - Ensure wildcard permissions (`core:default`, `fs:allow-all`) are revoked and replaced with strict path/action permissions.

2. **IPC Scope Isolation**:
   - Verify all IPC command parameters pass strict input validation before Rust side execution.
   - Enforce path traversal prevention (deny `..`, relative paths, or unanchored symlinks in file operations).

3. **Dependency & Memory Safety Audit**:
   - Run `cargo audit` to detect CVEs in Rust dependencies.
   - Flag any `unsafe` Rust blocks missing mandatory `// SAFETY:` rationale comments.

4. **Secrets & Keyring Storage Verification**:
   - Enforce OS Keyring usage (`keyring` crate / Windows Credential Manager) for API keys and tokens.
   - Ensure credentials are never written to plain text config files or log output.

5. **CSP (Content Security Policy) Audit**:
   - Check `tauri.conf.json` CSP headers (`default-src 'self'; script-src 'self'`).

---

## References & Resources
- [Security Hardening Guide](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/skills/sec-audit-hardener/references/security_hardening.md)
- [Capability Policy Stub](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/skills/sec-audit-hardener/resources/capability_policy_stub.json)
