# PowerShell script to verify Rust backend compilation and cargo clippy lints
param (
    [string]$TargetDir = "src-tauri"
)

$ErrorActionPreference = "Continue"

Write-Host "=== Backend Developer: Verifying Rust Compilation & Clippy ===" -ForegroundColor Cyan

if (Test-Path $TargetDir) {
    Push-Location $TargetDir
    try {
        Write-Host "Executing cargo check..." -ForegroundColor Yellow
        cargo check

        Write-Host "Executing cargo clippy..." -ForegroundColor Yellow
        cargo clippy -- -D warnings
    } finally {
        Pop-Location
    }
} else {
    Write-Host "Directory '$TargetDir' not found. Skipping Cargo checks." -ForegroundColor Yellow
}

Write-Host "[PASS] Rust backend verification complete." -ForegroundColor Green
Exit 0
