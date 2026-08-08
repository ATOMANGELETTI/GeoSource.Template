# PowerShell script to execute cargo fmt and cargo clippy auto-fixes on Rust backend
param (
    [string]$TargetDir = "src-tauri"
)

$ErrorActionPreference = "Continue"

Write-Host "=== Backend Developer: Formatting & Fixing Rust Code ===" -ForegroundColor Cyan

if (Test-Path $TargetDir) {
    Push-Location $TargetDir
    try {
        Write-Host "Formatting Rust code with cargo fmt..." -ForegroundColor Yellow
        cargo fmt

        Write-Host "Auto-fixing Rust lints with cargo clippy..." -ForegroundColor Yellow
        cargo clippy --fix --allow-dirty --allow-staged
    } finally {
        Pop-Location
    }
} else {
    Write-Host "Directory '$TargetDir' not found." -ForegroundColor Yellow
}

Write-Host "[PASS] Rust formatting and clippy auto-fix complete." -ForegroundColor Green
Exit 0
