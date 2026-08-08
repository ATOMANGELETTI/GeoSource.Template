<#
.SYNOPSIS
    Validates the cargo-health-check example skill structure.
#>
Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
$passed = 0; $failed = 0

function Assert-True {
    param([string]$label, [bool]$condition)
    if ($condition) { Write-Host "[PASS] $label" -ForegroundColor Green; $script:passed++ }
    else            { Write-Host "[FAIL] $label" -ForegroundColor Red;   $script:failed++ }
}

$dir = Resolve-Path (Join-Path $PSScriptRoot "..")
Assert-True "SKILL.md exists"                  (Test-Path "$dir\SKILL.md")
Assert-True "scripts/ exists"                  (Test-Path "$dir\scripts")
Assert-True "references/ exists"               (Test-Path "$dir\references")
Assert-True "run_health_check.ps1 exists"      (Test-Path "$dir\scripts\run_health_check.ps1")
Assert-True "cargo_commands.md exists"         (Test-Path "$dir\references\cargo_commands.md")

Write-Host ""
Write-Host "Results: $passed passed, $failed failed"
exit $(if ($failed -gt 0) { 1 } else { 0 })
