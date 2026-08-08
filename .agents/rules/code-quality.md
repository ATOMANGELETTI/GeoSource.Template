# Code Quality, Security & Performance Standard

This document establishes the mandatory standards for all code written or modified within this repository. All implementations must adhere strictly to these principles to ensure high performance, top-tier security, modern syntax, and long-term maintainability.

---

## Pillar 1: Modern Syntax & Idioms

- **Use Current Language Features**: Always leverage modern language capabilities (e.g., Rust 2021 edition idioms, TypeScript strict mode, modern ES/HTML5 features, PowerShell 7+ native cmdlets).
- **Avoid Deprecated Patterns**: Never use deprecated APIs, obsolete legacy libraries, or outdated syntactic sugar.
- **Explicit & Strongly Typed**:
  - In Rust: Avoid indiscriminate `unwrap()` or `expect()`; leverage idiomatic pattern matching, `?` operator, and strong domain types.
  - In TypeScript: Enforce strict null checks, avoid `any` (use `unknown` or specific interfaces/generics), and utilize modern ECMAScript features (e.g., optional chaining `?.`, nullish coalescing `??`, private fields `#`).
  - In PowerShell: Use explicit typing, standard verbs, and param blocks with type constraints.
- **Immutability by Default**: Default to immutable declarations (`const` in JS/TS, immutable bindings in Rust) unless mutation is strictly required and scoped.

---

## Pillar 2: Performance & Memory Optimization

- **Zero-Cost Abstractions & Minimal Allocations**:
  - Prefer references, slices (`&str`, `&[T]`), and static lifetimes where appropriate over unnecessary heap clones (`String`, `Vec::clone()`).
  - Avoid duplicate array/string operations inside loops. Pre-allocate collections with known capacities (`Vec::with_capacity`).
- **Async & Non-Blocking Architecture**:
  - Never block event loops or main UI threads (e.g., synchronous IO or CPU-heavy work on JS event loop or Tauri main thread).
  - Use asynchronous I/O (`tokio`, `async/await`, web promises) for network, file system, and subprocess communications.
- **Resource Lifecycle & Cleanup**:
  - Properly manage thread pools, handles, file descriptors, and stream subscriptions to prevent memory leaks and handle exhaustion.
  - In frontend code, ensure event listeners, timers, and WebGL/Canvas contexts are cleanly unmounted or disposed.

---

## Pillar 3: Security & Vulnerability Defense

- **Input Validation & Sanitization**:
  - Apply strict zero-trust boundary verification. Validate and sanitize all external inputs (IPC calls, HTTP request payloads, user input fields, file inputs).
- **Injection & Execution Protections**:
  - Never execute dynamic shell commands constructed from unsanitized raw string concatenation.
  - In web contexts, avoid unsafe HTML insertion (`innerHTML`) without explicit sanitization; use safe DOM node creation or framework escaping.
- **Secrets & Credential Management**:
  - Never hardcode API keys, passwords, bearer tokens, or private certificates into source code or committed configs.
- **Minimal Privilege Principle**:
  - Restrict file system permissions, IPC command exposes in Tauri, and subprocess launch privileges strictly to what is required.

---

## Pillar 4: Code Quality & Maintainability

- **DRY & Modular Design**:
  - Decouple business logic from UI components and driver adapters.
  - Avoid copy-pasting code blocks; extract reusable helper routines into well-named utility modules.
- **Self-Documenting & Clean APIs**:
  - Write intuitive function signatures, clear variable naming, and concise doc comments for public exports (`///` in Rust, JSDoc in TS).
  - Keep functions focused (Single Responsibility Principle) and maintain reasonable function lengths.
- **Robust Error Handling & Logging**:
  - Handle all error branches explicitly. Provide meaningful context in errors (`anyhow` / custom error enums in Rust, custom Error classes in JS).
  - Avoid silent failure modes (`catch {}` without logging or handling).

---

## Pillar 5: Mandatory Pre-Completion Verification Checklist

Before declaring any coding task complete, the following verification steps MUST be performed and validated clean:

1. **Static Analysis & Linting**:
   - Rust: `cargo clippy -- -D warnings` (Zero linter warnings permitted).
   - TypeScript/JS: `npm run lint` or `eslint` (Zero errors/warnings permitted).
   - PowerShell: `Invoke-ScriptAnalyzer` (Zero high/medium severity diagnostics).
2. **Build Integrity**:
   - Code must compile cleanly without errors or build warnings (`cargo check` / `npm run build`).
3. **Automated Testing**:
   - Run relevant unit/integration tests to ensure no regressions were introduced.
4. **Security Check**:
   - Verify no secrets, temporary debug logs, or unsanitized dangerous executions remain in modified files.
