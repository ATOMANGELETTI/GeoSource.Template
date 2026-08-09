# Utilities Directory (`other/utilities/`)

The `other/utilities/` directory contains standalone system binaries and maintenance batch scripts used by GeoSource for local tasks, log archival, and system operations.

## Directory Structure

```
other/utilities/
├── 7zr.exe                 # Lightweight standalone 7-Zip command-line executable
└── scripts/
    ├── clear-logs.bat      # Deletes uncompressed .log files from other/logs/archive/
    ├── clearall-logs.bat   # Deletes all .log files and .zip archives from other/logs/archive/
    └── compress-logs.bat   # Compresses archived .log files into a timestamped ZIP archive
```

## Utilities & Binaries

### `7zr.exe`
- **Description**: Standalone 7-Zip command-line archiver binary.
- **Usage**: Used by `compress-logs.bat` to package archived application logs into compressed ZIP files without external dependencies.

## Log Maintenance Automation Scripts (`other/utilities/scripts/`)

### 1. `compress-logs.bat`
- **Purpose**: Compresses all `.log` files in `other/logs/archive/` into a single timestamped ZIP archive (`YYYY-MM-DD_HH-mm-ss=<count>.zip`) using `7zr.exe` and deletes the original uncompressed log files (`-sdel`).
- **Execution**: Can be launched directly by double-clicking or invoked via script.

### 2. `clear-logs.bat`
- **Purpose**: Safely deletes all uncompressed `.log` files from `other/logs/archive/` while leaving compressed ZIP archives intact.

### 3. `clearall-logs.bat`
- **Purpose**: Purges all log files and ZIP archives from `other/logs/archive/`.
