<#
.SYNOPSIS
    Runs Rust Cargo tests and TypeScript Vitest tests for GeoSource Tauri application.
.DESCRIPTION
    Orchestrates the fullstack test suite, collecting execution status and output logs.
#>

param (
    [switch]$SkipRust,
    [switch]$SkipFrontend
)

$ErrorActionPreference = "Continue"
$WorkspaceRoot = Resolve-Path "$PSScriptRoot\..\..\..\.."
$RustDir = Join-Path $WorkspaceRoot "src-tauri"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " GeoSource Fullstack Test Runner" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

$RustPassed = $true
$FrontendPassed = $true

if (-not $SkipRust) {
    Write-Host "`n[1/2] Running Rust Backend Cargo Tests..." -ForegroundColor Yellow
    if (Test-Path $RustDir) {
        Push-Location $RustDir
        try {
            $cargoResult = cargo test -- --nocapture 2>&1
            Write-Host $cargoResult
            if ($LASTEXITCODE -ne 0) {
                $RustPassed = $false
                Write-Host "x Cargo tests FAILED" -ForegroundColor Red
            } else {
                Write-Host "+ Cargo tests PASSED" -ForegroundColor Green
            }
        } finally {
            Pop-Location
        }
    } else {
        Write-Host "x Rust directory not found at $RustDir" -ForegroundColor Red
        $RustPassed = $false
    }
}

if (-not $SkipFrontend) {
    Write-Host "`n[2/2] Running Frontend Vitest Suite..." -ForegroundColor Yellow
    Push-Location $WorkspaceRoot
    try {
        $vitestResult = npx vitest run 2>&1
        Write-Host $vitestResult
        if ($LASTEXITCODE -ne 0) {
            $FrontendPassed = $false
            Write-Host "x Vitest suite FAILED" -ForegroundColor Red
        } else {
            Write-Host "+ Vitest suite PASSED" -ForegroundColor Green
        }
    } finally {
        Pop-Location
    }
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host " Test Execution Summary" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
if (-not $SkipRust) {
    $rStatus = if ($RustPassed) { "PASS" } else { "FAIL" }
    $rColor = if ($RustPassed) { "Green" } else { "Red" }
    Write-Host "  Rust Backend Tests:     [$rStatus]" -ForegroundColor $rColor
}
if (-not $SkipFrontend) {
    $fStatus = if ($FrontendPassed) { "PASS" } else { "FAIL" }
    $fColor = if ($FrontendPassed) { "Green" } else { "Red" }
    Write-Host "  Frontend Vitest Tests:  [$fStatus]" -ForegroundColor $fColor
}

if ($RustPassed -and $FrontendPassed) {
    Write-Host "`nOVERALL RESULT: PASSED" -ForegroundColor Green
    exit 0
} else {
    Write-Host "`nOVERALL RESULT: FAILED" -ForegroundColor Red
    exit 1
}
