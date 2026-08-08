# Architecture Decision Records (ADRs)

This directory contains **Architecture Decision Records (ADRs)** for the GeoSource project. ADRs capture important architectural decisions, their context, and their consequences.

---

## Naming Convention

All ADR files must follow the pattern:
```text
YYYY-MM-DD-<kebab-case-title>.md
```
*Example:* `2026-08-05-use-specta-for-type-generation.md`

---

## Decision Status Lifecycle

- **Proposed:** Under review/discussion.
- **Accepted:** Approved and implemented/active.
- **Rejected:** Evaluated but decided against.
- **Deprecated:** No longer relevant or active.
- **Superseded:** Replaced by a newer decision (link to the replacing ADR).

---

## Standard ADR Template

When creating a new ADR, use the following structure:

```markdown
# [Short Title of Decision]

* **Status:** [Proposed | Accepted | Rejected | Deprecated | Superseded by YYYY-MM-DD-title]
* **Date:** YYYY-MM-DD
* **Authors:** [Name / Team]

## Context & Problem Statement

Describe the context, problem, or technical requirement driving this decision.

## Decision Drivers

* Technical constraints or performance targets
* Security / capability requirements
* User experience / maintainability considerations

## Considered Options

1. **Option 1:** [Description, Pros, Cons]
2. **Option 2:** [Description, Pros, Cons]

## Decision Outcome

Chosen Option: **Option N** because [justification].

### Expected Consequences

* **Positive:** Key benefits realized.
* **Negative / Trade-offs:** Acceptable drawbacks, added complexity, or technical debt incurred.
```
