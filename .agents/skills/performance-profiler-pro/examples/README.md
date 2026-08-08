# Performance Profiler Pro Examples

## Example Criterion Microbenchmark in Rust
```rust
use criterion::{criterion_group, criterion_main, Criterion};

fn benchmark_spatial_index(c: &mut Criterion) {
    c.bench_function("rtree_build_10k", |b| {
        b.iter(|| {
            // Benchmark RTree creation
        })
    });
}

criterion_group!(benches, benchmark_spatial_index);
criterion_main!(benches);
```
