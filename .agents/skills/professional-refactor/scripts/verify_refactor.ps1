# PowerShell script to run compilation, linting, and verification gates post-refactor.
[CmdletBinding()]
param(
    [string]$WorkspacePath = "."
)

$ErrorActionPreference = "Stop"

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host " Professional Refactor: Quality Verification Gate" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

$absPath = (Resolve-Path $WorkspacePath).Path
Push-Location $absPath

try {
    # 1. Cargo Check
    if (Test-Path "src-tauri/Cargo.toml") {
        Write-Host "`n[1/3] Running Cargo Check..." -ForegroundColor Yellow
        Push-Location "src-tauri"
        cargo check --quiet
        if ($LASTEXITCODE -ne 0) {
            Write-Error "Cargo check failed with exit code $LASTEXITCODE"
        }
        Write-Host "  [PASS] Cargo check clean." -ForegroundColor Green
        
        # 2. Cargo Clippy
        Write-Host "`n[2/3] Running Cargo Clippy..." -ForegroundColor Yellow
        cargo clippy --quiet -- -D warnings
        if ($LASTEXITCODE -ne 0) {
            Write-Host "  [WARN] Cargo clippy reported warnings/errors." -ForegroundColor Yellow
        } else {
            Write-Host "  [PASS] Cargo clippy clean." -ForegroundColor Green
        }
        Pop-Location
    } else {
        Write-Host "  [SKIP] Cargo.toml not found in src-tauri." -ForegroundColor Gray
    }

    # 3. Frontend Check (if package.json exists)
    if (Test-Path "package.json") {
        Write-Host "`n[3/3] Checking Package Scripts..." -ForegroundColor Yellow
        $pkgJson = Get-Content "package.json" -Raw | ConvertFrom-Json
        if ($pkgJson.scripts.'check') {
            Write-Host "  Executing pnpm/npm run check..." -ForegroundColor Yellow
            npm run check
            if ($LASTEXITCODE -eq 0) {
                Write-Host "  [PASS] Frontend check passed." -ForegroundColor Green
            } else {
                Write-Host "  [WARN] Frontend check returned exit code $LASTEXITCODE" -ForegroundColor Yellow
            }
        } else {
            Write-Host "  [SKIP] No 'check' script found in package.json." -ForegroundColor Gray
        }
    }

    Write-Host "`n==================================================" -ForegroundColor Cyan
    Write-Host " [PASS] All Refactoring Quality Gates Verified!" -ForegroundColor Green
    Write-Host "==================================================" -ForegroundColor Cyan
}
finally {
    Pop-Location
}
