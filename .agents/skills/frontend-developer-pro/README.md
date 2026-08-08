# Frontend Developer Pro Skill

`frontend-developer-pro` is a specialized skill for Antigravity IDE focused on high-performance, secure, up-to-date, and strictly typed React, Next.js, and TypeScript frontend development for GeoSource Tauri applications.

## Features
- **Strict TypeScript & State Management**: Zero-`any` policy, generic custom hooks, and typed IPC wrappers.
- **Security & Environment Config**: XSS protection, input validation, and secure `.env` parameter loading.
- **Performance Engineering**: React memoization (`useMemo`, `useCallback`), dynamic loading, and DOM optimization.
- **Linting & Code Quality**: Automated ESLint compliance and Prettier code formatting.

## Triggering the Skill
Use any of the following triggers:
- "frontend code"
- "react next component"
- "frontend performance"
- "eslint prettier fix"
- "frontend-developer-pro"

## File Tree
- `SKILL.md` — Core engineering instructions and workflow
- `scripts/verify-frontend-code.ps1` — Runs TypeScript verification and ESLint check
- `scripts/run-eslint-prettier.ps1` — Auto-fixes lint warnings and formats code with Prettier
- `examples/typed-ipc-hook/` — Typed custom hook for Tauri IPC invocations
- `resources/component_template.tsx` — Production-grade React component template
- `references/frontend-architecture-security-guide.md` — Deep frontend architecture & security guide
- `tests/test_validation.ps1` — Automated skill integrity test suite
