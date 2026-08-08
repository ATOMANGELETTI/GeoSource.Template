# Tauri v2 Security & IPC Hardening Reference Guide

## Principles of Least Privilege
1. **Never use wildcard permissions**: Define explicit commands allowed in `capabilities/`.
2. **Sanitize File Paths**: Strip relative components (`..`) and validate canonical path boundaries.
3. **Audit Unsafe Rust**: Require `// SAFETY:` explanations for all `unsafe` blocks.
4. **Use OS Credentials Manager**: Store secrets via system keyring plugins instead of plain config files.
