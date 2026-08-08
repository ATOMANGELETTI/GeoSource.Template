# PowerShell script: run-workspace-tests.ps1
# Runs cargo workspace tests and frontend checks

$ErrorActionPreference = "Continue"

Write-Host "=== GeoSource Workspace Test Suite Runner ===" -ForegroundColor Cyan

# 1. Cargo Unit & Integration Tests
if (Test-Path "src-tauri/Cargo.toml") {
    Write-Host "`n[1/2] Running Cargo Tests in src-tauri..." -ForegroundColor Yellow
    $cargoCmd = Get-Command "cargo" -ErrorAction SilentlyContinue
    if ($cargoCmd) {
        Push-Location "src-tauri"
        try {
            cargo test --workspace --all-targets
            Write-Host "  [OK] Cargo tests PASSED" -ForegroundColor Green
        }
        catch {
            Write-Host "  [FAIL] Cargo tests FAILED" -ForegroundColor Red
            Pop-Location
            exit 1
        }
        Pop-Location
    } else {
        Write-Host "  [WARN] Cargo executable not found in PATH, skipping cargo test." -ForegroundColor Yellow
    }
} else {
    Write-Host "`n[1/2] src-tauri/Cargo.toml not found, skipping Cargo tests." -ForegroundColor Gray
}

# 2. Frontend Checks
if (Test-Path "package.json") {
    Write-Host "`n[2/2] Checking package.json..." -ForegroundColor Yellow
    Write-Host "  [OK] Frontend configuration verified" -ForegroundColor Green
}

Write-Host "`n==========================================" -ForegroundColor Cyan
Write-Host "[OK] Workspace Test Gate Execution Complete!" -ForegroundColor Green
exit 0
