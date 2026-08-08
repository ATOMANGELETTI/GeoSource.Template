# Model Context Windows — Reference

Context window limits for models used in Antigravity IDE.
Use this reference to understand how much budget is available and plan
token allocation accordingly.

---

## Context Window Summary

| Model | Context Window | Output Limit | Notes |
|---|---|---|---|
| **Claude Sonnet 4.6** | 200,000 tokens | 8,192 tokens | Current model for complex skills |
| **Claude Sonnet 4.6 (Thinking)** | 200,000 tokens | 16,000 tokens | Extended output; thinking uses tokens |
| **Gemini 2.5 Pro** | 1,000,000 tokens | 8,192 tokens | Huge context; high cost per call |
| **Gemini 2.5 Flash** | 1,000,000 tokens | 8,192 tokens | Faster, lower cost |
| **Default (fast)** | 32,000–128,000 | 4,096 tokens | Varies — conservative budget |

---

## Token Budget Planning

### Claude Sonnet 4.6 (Thinking) — Primary GeoSource Model

With 200K context window, allocation:

| Category | Budget | Notes |
|---|---|---|
| System prompt + skills | ~5,000–15,000 | Grows with active skills |
| Conversation history | ~5,000–50,000 | Grows rapidly in long sessions |
| Files loaded | Target < 40,000 | Apply TEM thresholds strictly |
| Thinking tokens | ~5,000–20,000 | Internal reasoning (not visible) |
| Response buffer | ~8,000 | Output limit |
| **Effective file budget** | **~80,000–120,000** | Rough available for context |

### Practical Limits for GeoSource

At 4 chars/token for Rust code:
- 120,000 token file budget = ~480 KB of Rust source
- A typical GeoSource src-tauri/src/ directory is ~50–200 KB
- **You have room, but never load the whole codebase at once**

---

## Warning Signs — Context Pressure

Watch for these signals that context is filling up:

1. Conversation has been long (> 20 tool calls)
2. Multiple large files were loaded in previous turns
3. Response quality degrades or repeats earlier content
4. Model starts truncating its own output

**In TEM**: If any of these signals appear, switch to stub-only mode and
aggressively prune what's being loaded.

---

## Thinking Token Overhead (Claude Sonnet 4.6 Thinking)

In Thinking mode, the model generates internal reasoning before responding.
This reasoning is NOT visible but consumes tokens from the context window.

- Simple tasks: ~500–2,000 thinking tokens
- Complex tasks: ~5,000–20,000 thinking tokens
- Budget accordingly: assume 10% of your 200K window goes to thinking

> **TEM Rule**: In Thinking mode, prefer fewer, higher-quality tool calls over
> many cheap ones — thinking overhead makes each round-trip costlier.
