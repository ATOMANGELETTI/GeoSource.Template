<#
.SYNOPSIS
    Runs the GeoSource Cargo health check suite.
#>
[CmdletBinding()]
param(
    [string]$ProjectRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..\..\..\"))
)
Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$tauriDir = Join-Path $ProjectRoot "src-tauri"
$results  = @{}

function Run-CargoCheck {
    param([string]$Command, [string]$Label)
    Write-Host "  Running: $Command" -ForegroundColor Gray
    try {
        $output = & powershell -Command "Set-Location '$tauriDir'; $Command 2>&1"
        $results[$Label] = @{ Pass = ($LASTEXITCODE -eq 0); Output = $output }
    } catch {
        $results[$Label] = @{ Pass = $false; Output = $_.Exception.Message }
    }
}

Write-Host "=== GeoSource Cargo Health Check ===" -ForegroundColor Cyan
Run-CargoCheck "cargo check 2>&1"                       "Check"
Run-CargoCheck "cargo clippy -- -D warnings 2>&1"       "Clippy"
Run-CargoCheck "cargo fmt -- --check 2>&1"              "Fmt"
Run-CargoCheck "cargo test 2>&1"                        "Tests"

Write-Host ""
Write-Host "=== Results ===" -ForegroundColor Cyan
foreach ($key in $results.Keys) {
    $r = $results[$key]
    $status = if ($r.Pass) { "[PASS]" } else { "[FAIL]" }
    $color  = if ($r.Pass) { "Green" }  else { "Red" }
    Write-Host "$status $key" -ForegroundColor $color
}

$allPassed = ($results.Values | Where-Object { -not $_.Pass }).Count -eq 0
Write-Host ""
if ($allPassed) {
    Write-Host "Overall: HEALTHY" -ForegroundColor Green
    exit 0
} else {
    Write-Host "Overall: NEEDS ATTENTION" -ForegroundColor Yellow
    exit 1
}
