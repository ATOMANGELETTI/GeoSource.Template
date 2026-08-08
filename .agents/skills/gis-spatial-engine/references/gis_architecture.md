# GeoSource GIS Spatial Architecture Guide

## Overview
GeoSource requires high-throughput spatial indexing and low-latency IPC serialization for rendering spatial layers.

### Key Guidelines:
1. **Always reproject on Rust side**: Keep coordinate math inside Rust (`georust/proj`).
2. **Binary IPC transfers**: For vector data > 1MB, serialize via FlatGeobuf or raw bytes rather than JSON strings.
3. **Spatial Indexing**: Use R-Tree (`rstar`) for 2D bounding box queries and H3 (`h3o`) for hierarchical hexagonal clustering.
