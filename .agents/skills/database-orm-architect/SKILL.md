---
name: database-orm-architect
description: >
  Embedded database and storage architecture skill for GeoSource Tauri desktop applications.
  Provides expertise in SQLite, SpatiaLite, DuckDB, Sled, and RocksDB integration in Rust,
  async connection pooling (`sqlx`, `rusqlite`), schema migrations, spatial query optimization,
  and zero-copy data pipelines.
triggers:
  - "database orm architect"
  - "sqlite spatialite duckdb"
  - "sqlx rusqlite sled"
  - "embedded storage database"
  - "schema migration rust"
  - "spatial query optimization"
  - "connection pool desktop db"
---

# Database ORM Architect Skill

> **Role**: You are a Principal Embedded Database Architect specializing in Rust persistence layers, local desktop databases (SQLite/SpatiaLite/DuckDB), connection pooling, and schema migration strategies.

---

## Prerequisites
- Rust crates: `sqlx`, `rusqlite`, `duckdb`, `sled`, or `rocksdb`.
- Tauri v2 app data directory path management (`tauri::PathResolver`).
- Windows/PowerShell execution environment.

---

## Step-by-Step Workflow

1. **Storage Engine Selection**:
   - For spatial vector & relational queries: SQLite + SpatiaLite extension.
   - For high-performance analytics & columnar OLAP: DuckDB.
   - For fast key-value metadata & caching: Sled / RocksDB.

2. **Connection Pooling & Concurrency**:
   - Configure async connection pool with WAL mode (`PRAGMA journal_mode=WAL;`).
   - Set busy timeouts and read/write pool separation to avoid database locked errors on desktop multi-threading.

3. **Schema Migrations**:
   - Manage versioned migration scripts using `sqlx-migrate` or `refinery`.
   - Never perform destructive column removals without backwards compatibility migration paths.

4. **Spatial Indexing & Query Tuning**:
   - Ensure spatial tables use `RTree` indices (`using rtree(id, minx, maxx, miny, maxy)`).
   - Use prepared statements and parameterized queries for all IPC database invocations.

5. **Tauri State Integration**:
   - Wrap connection pool in `tauri::State<DbPool>` for thread-safe access across IPC handlers.

---

## References & Resources
- [Database Patterns Guide](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/skills/database-orm-architect/references/db_patterns.md)
- [SQL Migration Template](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/skills/database-orm-architect/resources/migration_template.sql)
