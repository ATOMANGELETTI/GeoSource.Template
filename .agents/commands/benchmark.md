# `/benchmark` Command Specification

## Purpose
The `/benchmark` command benchmarks compilation times, IPC serialization latency, and memory footprint of the GeoSource application.

---

## Execution Protocol

1. **Compilation Benchmark**: Measure clean build time and incremental compilation time (`cargo check --timings`).
2. **IPC Latency Benchmark**: Measure round-trip execution latency of core Tauri IPC commands.
3. **Memory Footprint**: Capture baseline RSS memory consumption of the application backend process.
4. **Benchmark Summary**: Output benchmark metrics and highlight performance bottlenecks.
