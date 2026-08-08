# GeoSource Agent Suite — Agent Index

> **Reference for all agents in `.agents/agents/`.**
> Use this index to understand which agent to invoke and when.

---

## Agent Roster

| Agent File | Role | Primary Trigger Keywords | Domain |
|---|---|---|---|
| [coordinator.md](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/agents/coordinator.md) | **Master Coordinator** | `coordinate`, `orchestrate`, `plan this task`, `multi-step` | All — entry point |
| [rust-engineer.md](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/agents/rust-engineer.md) | **Rust Engineer** | `tauri command`, `IPC`, `cargo`, `src-tauri` | `src-tauri/` |
| [frontend-engineer.md](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/agents/frontend-engineer.md) | **Frontend Engineer** | `next.js`, `react component`, `hook`, `UI`, `CSS` | `src/` |
| [code-reviewer.md](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/agents/code-reviewer.md) | **Code Reviewer** | `code review`, `clippy`, `lint`, `quality audit` | All source |
| [qa-engineer.md](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/agents/qa-engineer.md) | **QA Engineer** | `write tests`, `coverage`, `unit test`, `integration test` | All source |
| [release-engineer.md](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/agents/release-engineer.md) | **Release Engineer** | `commit`, `changelog`, `semver`, `release`, `PR` | Git + versions |
| [docs-engineer.md](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/agents/docs-engineer.md) | **Docs Engineer** | `jsdoc`, `rustdoc`, `ADR`, `update readme`, `document` | All docs |
| [dependency-auditor.md](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/agents/dependency-auditor.md) | **Dependency Auditor** | `cargo audit`, `pnpm audit`, `CVE`, `license check` | Cargo + pnpm |
| [performance-engineer.md](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/agents/performance-engineer.md) | **Performance Engineer** | `bundle size`, `slow`, `LCP`, `IPC latency`, `profiling` | All perf |
| [security-auditor.md](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/agents/security-auditor.md) | **Security Auditor** | `OWASP`, `CSP`, `tauri allowlist`, `vulnerability`, `XSS` | Security |
| [scaffolding-engineer.md](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/agents/scaffolding-engineer.md) | **Scaffolding Engineer** | `scaffold`, `new feature`, `boilerplate`, `onboarding` | All new code |

---

## Typical Agent Workflows

### New Full-Stack Feature
```
scaffolding-engineer → rust-engineer → frontend-engineer → qa-engineer → docs-engineer → release-engineer
```

### Bug Fix
```
code-reviewer → rust-engineer or frontend-engineer → qa-engineer → release-engineer
```

### Security Review Before Release
```
security-auditor → dependency-auditor → code-reviewer → release-engineer
```

### Dependency Update
```
dependency-auditor → rust-engineer or frontend-engineer → qa-engineer → release-engineer
```

### Performance Investigation
```
performance-engineer → frontend-engineer or rust-engineer → qa-engineer → release-engineer
```

---

## Universal Agent Contract

**All agents enforce these rules without exception:**

1. ✅ Read all `.agents/rules/*.md` before acting
2. ✅ Check KI summaries before any research
3. ✅ Never modify files outside their domain without escalation
4. ✅ Create `implementation_plan.md` before any code change
5. ✅ Log actions to `.agents/memory/<agent-slug>-log.md`
6. ✅ Produce end-of-turn summary: **Changed / Verified / Next**
7. ✅ Self-describe planned actions before executing
8. ✅ Escalate destructive/ambiguous actions to the user

---

## Memory Files

| Agent | Log File |
|---|---|
| coordinator | `.agents/memory/coordinator-log.md` |
| rust-engineer | `.agents/memory/rust-engineer-log.md` |
| frontend-engineer | `.agents/memory/frontend-engineer-log.md` |
| code-reviewer | `.agents/memory/code-reviewer-log.md` |
| qa-engineer | `.agents/memory/qa-engineer-log.md` |
| release-engineer | `.agents/memory/release-engineer-log.md` |
| docs-engineer | `.agents/memory/docs-engineer-log.md` |
| dependency-auditor | `.agents/memory/dependency-auditor-log.md` |
| performance-engineer | `.agents/memory/performance-engineer-log.md` |
| security-auditor | `.agents/memory/security-auditor-log.md` |
| scaffolding-engineer | `.agents/memory/scaffolding-engineer-log.md` |

---

## Rules Referenced by Agents

| Rule File | Enforced by |
|---|---|
| `code-quality.md` | All agents |
| `tauri-rust-stack.md` | rust-engineer, frontend-engineer, security-auditor, scaffolding-engineer |
| `testing-verification.md` | qa-engineer, code-reviewer |
| `planning-architecture.md` | coordinator, all agents |
| `context-knowledge-management.md` | All agents |
| `dependency-management.md` | dependency-auditor, rust-engineer, frontend-engineer |
| `git-commit-discipline.md` | release-engineer |
| `documentation-readme.md` | docs-engineer, release-engineer |
| `agentic-behavior.md` | All agents |
| `token-efficiency.md` | All agents |
