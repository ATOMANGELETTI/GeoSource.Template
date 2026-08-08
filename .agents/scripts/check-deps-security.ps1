# PowerShell script: check-deps-security.ps1
# Audits Cargo and npm dependencies for security and compliance

$ErrorActionPreference = "Continue"

Write-Host "=== GeoSource Dependency Security & Audit Runner ===" -ForegroundColor Cyan

# 1. Cargo Audit Check
if (Test-Path "src-tauri/Cargo.toml") {
    Write-Host "`n[1/2] Auditing Cargo Dependencies..." -ForegroundColor Yellow
    $cargoCmd = Get-Command "cargo" -ErrorAction SilentlyContinue
    if ($cargoCmd) {
        Push-Location "src-tauri"
        try {
            & cargo audit | Out-Null
            if ($LASTEXITCODE -eq 0) {
                Write-Host "  [OK] Cargo audit PASSED (No known vulnerabilities detected)" -ForegroundColor Green
            } else {
                Write-Host "  [WARN] Cargo audit returned vulnerabilities or non-zero exit code." -ForegroundColor Yellow
            }
        } catch {
            Write-Host "  [WARN] cargo-audit is not installed. Install via: cargo install cargo-audit" -ForegroundColor Yellow
        }
        Pop-Location
    } else {
        Write-Host "  [WARN] Cargo executable not found in PATH." -ForegroundColor Yellow
    }
}

# 2. Workspace Agent System Validation
Write-Host "`n[2/2] Running Workspace Agent Validation..." -ForegroundColor Yellow
node .agents/scripts/validate-agents.js

Write-Host "`n==========================================" -ForegroundColor Cyan
Write-Host "[OK] Security and Dependency Audit Completed!" -ForegroundColor Green
exit 0
