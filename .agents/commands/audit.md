# `/audit` Command Specification

## Purpose
The `/audit` command triggers a full security, dependency vulnerability, code quality, token efficiency, and documentation compliance audit across the entire GeoSource workspace.

---

## Execution Protocol

1. **Security & Dependency Audit**: Run `powershell -ExecutionPolicy Bypass -File .agents/scripts/check-deps-security.ps1` to inspect Cargo and pnpm dependencies for vulnerabilities.
2. **Structure & Rule Audit**: Run `node .agents/scripts/validate-agents.js` to ensure links, schemas, and frontmatter are valid.
3. **Code Quality Check**: Check for unused imports, missing `rustdoc`/`JSDoc` comments, missing `// SAFETY:` notes on unsafe blocks, and IPC whitelist compliance.
4. **Audit Report Artifact**: Produce a structured audit report summarizing vulnerabilities, quality findings, and recommended fixes.
