# Token Efficiency Report
# (Expected output format — sample for test comparison)

**Task**: Find `load_project` command definition in GeoSource backend
**Mode**: Token-Efficient Mode (TEM) — activated by: "token efficient"
**Model**: Claude Sonnet 4.6 (Thinking)

## Phase Breakdown

| Phase | Tool Calls | Est. Tokens | Notes |
|---|---|---|---|
| Discovery | 2 | ~210 | grep_search used instead of 5 view_file calls |
| Implementation | 0 | ~0 | Read-only task |
| Documentation | 0 | ~0 | No docs needed |
| Response | — | ~80 | TEM verbosity rules applied |
| **Total** | **2** | **~290** | |

## Savings Estimate

Baseline (non-TEM) estimated: ~2,520 tokens
TEM actual estimated: ~290 tokens
**Estimated savings: ~2,230 tokens (~88%)**

## TEM Rules Applied

- [x] grep-before-view enforced
- [x] Stub-first reading for files > 100 lines
- [x] Browser tasks scoped precisely (N/A — no browser)
- [x] Documentation lookups targeted (N/A — no docs)
- [x] Response verbosity reduced
