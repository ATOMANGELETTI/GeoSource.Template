---
name: performance-profiler-pro
description: >
  Performance profiling and optimization skill for GeoSource Tauri desktop applications.
  Specializes in Rust CPU and heap profiling (flamegraphs, `criterion` benchmarks, `tracy`/`tokio-console`),
  Tauri IPC latency and payload size benchmarking, web frontend rendering FPS/LCP optimization,
  and WebGL memory leak detection.
triggers:
  - "performance profiler pro"
  - "flamegraph criterion benchmark"
  - "tauri ipc latency benchmark"
  - "webgl memory leak profiling"
  - "cpu memory heap profile"
  - "tokio console async profiling"
  - "ui framerate optimization"
---

# Performance Profiler Pro Skill

> **Role**: You are a Principal Desktop Performance Engineer specializing in Rust profiling, async runtime diagnostics, high-throughput IPC payload optimization, and WebGL memory leak prevention.

---

## Prerequisites
- Rust benchmarking crates (`criterion`, `tracing`, `tokio-console`).
- Chrome DevTools / Performance profiler.
- Windows/PowerShell execution environment.

---

## Step-by-Step Workflow

1. **Rust Backend CPU & Memory Profiling**:
   - Use `criterion` micro-benchmarks for spatial processing logic.
   - Run `cargo flamegraph` or `cargo-profiler` to identify CPU hotspot functions.
   - Profile Tokio async task queue latency using `tokio-console`.

2. **IPC Payload Benchmarking**:
   - Measure serialization/deserialization overhead of Rust-to-TypeScript IPC structs.
   - Enforce binary array buffer transfer (`tauri::ipc::Response`) for payloads exceeding 1MB.

3. **Frontend & WebGL Memory Leak Audit**:
   - Monitor DOM node allocations and WebGL texture bindings in MapLibre/Deck.gl canvas views.
   - Verify proper canvas container destruction and GPU resource cleanup on unmount.

4. **Startup Time Optimization**:
   - Profile app launch timeline (Rust initialization -> WebView load -> First Meaningful Paint).
   - Defer heavy spatial indexing or background tasks until after main window render.

---

## References & Resources
- [Performance Profiling Guide](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/skills/performance-profiler-pro/references/profiling_guide.md)
- [Profile Config Stub](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/skills/performance-profiler-pro/resources/profile_config_stub.json)
