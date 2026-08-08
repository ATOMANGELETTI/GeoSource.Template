# Performance & Security Best Practices for GeoSource Refactoring

## 1. Spatial Engine Performance

- **Zero-Copy Serialization**: When transferring large geospatial dataset payloads (GeoJSON/WKB/FlatGeobuf) across the IPC boundary, avoid unnecessary JSON string re-serialization.
- **R-Tree & Spatial Indexing**: Use spatial indexing (`rstar` crate in Rust) for bounding-box spatial queries instead of $O(N)$ linear iteration.
- **Rayon Parallelization**: For CPU-heavy feature transformations, leverage `rayon` parallel iterators (`par_iter()`).

## 2. Desktop Security Hardening

- **Memory Safety**: Avoid `unsafe` blocks. If strictly required for foreign function interfaces (FFI / C libraries like SpatiaLite), add explicit `// SAFETY:` comments detailing invariants.
- **Input Sanitization**: Validate all file paths, layer identifiers, and user query strings before passing to backend commands.
- **Dependency Audit**: Routinely run `cargo audit` to catch published vulnerability CVEs in Rust dependencies.
