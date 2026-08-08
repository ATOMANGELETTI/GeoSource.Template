# Developer Guide: Extending `.agents/`

This guide explains how developers and AI agents can extend the workspace with new rules, subagents, workflows, commands, skills, scripts, and plugins.

---

## 1. Adding a New Workspace Rule

1. Create a markdown file in `.agents/rules/<rule-name>.md`.
2. Format content with clear section headers, rules, and code examples.
3. Add a link reference in `.agents/AGENTS.md` under the appropriate category.
4. Register the rule in `.agents/core/agent-manifest.json`.

---

## 2. Adding a New Command

1. Create a command specification file in `.agents/commands/<command-name>.md`.
2. Document the purpose, execution protocol, and required scripts/artifacts.
3. Update `.agents/commands/README.md` and `.agents/core/agent-manifest.json`.

---

## 3. Adding a New Plugin / Skill

1. Create `.agents/plugins/<plugin-name>/plugin.json`.
2. Place skill instructions in `.agents/plugins/<plugin-name>/skills/<skill-name>/SKILL.md` with standard YAML frontmatter (`name`, `description`).
3. Run `node .agents/scripts/validate-agents.js` to verify syntax and links.
