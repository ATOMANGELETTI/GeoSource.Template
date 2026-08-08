-- Migration Template: V1__init_geosource_schema.sql
PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS spatial_datasets (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    crs TEXT NOT NULL DEFAULT 'EPSG:4326',
    feature_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_datasets_created ON spatial_datasets(created_at);
