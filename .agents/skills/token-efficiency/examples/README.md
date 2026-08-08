# Examples — token-efficiencie Skill

This directory contains two examples demonstrating how the `token-efficiencie`
skill reshapes agent behavior when activated.

---

## Examples Included

### 1. `minimal_example/`
A simple, self-contained scenario showing TEM activation for a small task.
**Use this first** to understand the core behavioral changes.

Task: Find a Tauri command definition in the GeoSource backend.

### 2. `geosource_full_example/`
A complete real-world GeoSource task — adding a new Tauri command for loading
GeoJSON files — executed in both normal mode and TEM mode, with a side-by-side
before/after token analysis.

**Use this** to see the full impact of TEM on a production task.

---

## How to Read the Examples

Each example contains:
- `scenario.md` — Task description and trigger phrase used
- `normal_execution.md` — How the agent would behave without TEM
- `tem_execution.md` — How the agent behaves with TEM active
- `comparison.md` — Side-by-side token analysis
