# Git & Commit Discipline Standard

This document establishes the mandatory conventions for all version control operations within this repository. Clean commit history is not cosmetic — it is a functional tool for code review, bisection, changelog generation, and onboarding.

---

## Pillar 1: Conventional Commits Format

All commits MUST conform to the [Conventional Commits v1.0.0](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <short description>

[optional body]

[optional footer(s)]
```

### Required Types

| Type | When to Use |
|------|-------------|
| `feat` | A new feature or capability |
| `fix` | A bug fix |
| `chore` | Maintenance tasks (deps, config, tooling) |
| `refactor` | Code restructuring with no behavior change |
| `perf` | Performance improvements |
| `test` | Adding or fixing tests only |
| `docs` | Documentation changes only |
| `ci` | CI/CD pipeline changes |
| `build` | Build system changes |
| `revert` | Reverts a previous commit |

### Scope Requirement
- **Scope is mandatory** — every commit must include a scope in parentheses.
- Scope should be the component, crate name, or feature area affected (e.g., `ipc`, `map-renderer`, `auth`, `deps`, `readme`).
- Example: `feat(ipc): add get_location command with typed TypeScript wrapper`

### Description Rules
- Use the imperative mood: "add", "fix", "remove" — not "added", "fixes", "removed".
- Maximum 72 characters for the subject line.
- No trailing period.

---

## Pillar 2: Branching Strategy

- **No Direct Commits to `main` or `master`**: All changes must be developed on a feature or fix branch.
- **Branch Naming Convention**: `<type>/<scope>-<short-description>` — e.g., `feat/ipc-get-location`, `fix/auth-token-expiry`, `chore/upgrade-tauri-v2`.
- **Branch Lifetime**: Branches must be deleted after the PR is merged. Do not accumulate stale branches.
- **Rebase, Don't Merge**: Keep feature branches rebased on `main` rather than merge-committing `main` into the feature branch to avoid tangled history.

---

## Pillar 3: Pre-Commit Safety Check

- **`git diff` Before Proposing Changes**: Before staging any file modification, the agent MUST review the diff to verify:
  - No unintended files are included.
  - No debug artifacts, secrets, or temporary files are staged.
  - No previously committed but now-unwanted changes have been accidentally reverted.
- **Atomic Commits**: Each commit must represent one logical unit of change. Do not combine unrelated changes in a single commit.
- **No Force-Push to Shared Branches**: `git push --force` is forbidden on `main`, `develop`, or any shared branch. `--force-with-lease` is permitted on personal feature branches only.

---

## Pillar 4: Pull Request Requirements

- **PR Must Link to Issue/Task**: Every PR description must include a reference to the issue, task, or ticket it addresses (e.g., `Closes #42`, `Relates to PROJ-123`).
- **PR Description Template**:
  - **What**: A 1–3 sentence summary of what changed.
  - **Why**: The problem being solved or requirement being fulfilled.
  - **How**: Key technical decisions made.
  - **Verification**: How the change was tested.
- **Squash-Merge Only**: PRs must be squash-merged. The squash commit message must follow Conventional Commits format. Intermediate WIP commits are acceptable on the branch but must not pollute `main`.
- **No Self-Merge**: PRs must not be merged by the same person (or agent session) that opened them without at least a passing CI check.

---

## Pillar 5: Sensitive Content Guard

- **Pre-Commit Secrets Scan**: Before committing, verify no secrets, API keys, tokens, or passwords are included in the diff.
- **`.gitignore` Integrity**: Ensure `.gitignore` patterns are up-to-date. If a new build artifact, secret file, or IDE configuration appears, add it to `.gitignore` before the first commit.
- **Lock Files Committed**: `Cargo.lock` and `package-lock.json` / `pnpm-lock.yaml` MUST always be committed to ensure reproducible builds.
