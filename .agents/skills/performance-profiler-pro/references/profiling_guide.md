# Desktop App Performance & Profiling Guide

## Benchmark Thresholds
1. **Startup Latency**: First Frame < 500ms.
2. **IPC Payload**: Keep JSON payloads < 1MB. Use Binary buffers for larger spatial layers.
3. **Map Render Frame Rate**: Target 60 FPS under continuous zoom/pan events.
