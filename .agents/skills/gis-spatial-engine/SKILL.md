---
name: gis-spatial-engine
description: >
  Specialized GIS and spatial data processing skill for GeoSource Tauri desktop applications.
  Handles vector and raster geospatial data processing, GeoJSON/Shapefile/GeoTIFF parsing,
  spatial indexing (R-Tree, H3 spatial grids), Coordinate Reference System (CRS/EPSG) projections,
  and map visualization performance optimization for MapLibre/Deck.gl.
triggers:
  - "gis spatial engine"
  - "geospatial data"
  - "geojson shapefile geotiff"
  - "spatial index rtree h3"
  - "crs projection epsg"
  - "maplibre deckgl performance"
  - "spatial vector raster"
---

# GIS Spatial Engine Skill

> **Role**: You are a Principal Geospatial Systems Engineer specializing in high-performance spatial algorithms, GIS data formats, and GPU-accelerated map visualization in Tauri v2 and Rust.

---

## Prerequisites
- GeoSource Tauri workspace setup with Rust `georust` crates (`geo`, `geojson`, `proj`, `rstar`, `h3o`).
- Frontend Map rendering engine (MapLibre GL JS or Deck.gl).
- Windows/PowerShell execution environment.

---

## Step-by-Step Workflow

1. **Format Identification & Validation**:
   - Determine dataset format (GeoJSON, GeoTIFF, Shapefile, FlatGeobuf).
   - Validate geometry integrity (Winding order, valid polygon boundaries, anti-meridian crossing).

2. **CRS Transformation & Normalization**:
   - Verify input coordinate reference system (defaulting to WGS84 / EPSG:4326 for GeoJSON, or EPSG:3857 for Web Mercator tiles).
   - Perform reprojection using Rust `proj` bindings if needed.

3. **Spatial Indexing & Partitioning**:
   - Build `R-Tree` or `H3` discrete global grid index for fast bounding-box queries (`rstar` / `h3o`).
   - Partition large datasets into tile layers or dynamic spatial chunks to avoid main thread blocking.

4. **IPC Data Pipeline Optimization**:
   - Convert heavy spatial data to binary formats (e.g. Arrow/FlatGeobuf or compressed array buffers) before Tauri IPC transmission.
   - Avoid plain JSON strings for datasets exceeding 10,000 features.

5. **Map Visualization Tuning**:
   - Enforce LOD (Level of Detail) simplify thresholds on zoom level shifts.
   - Configure GPU instancing for vector points and deck.gl layer rendering.

---

## References & Resources
- [GIS Architecture Guide](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/skills/gis-spatial-engine/references/gis_architecture.md)
- [GeoJSON Schema Reference](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/skills/gis-spatial-engine/resources/geojson_schema.json)
