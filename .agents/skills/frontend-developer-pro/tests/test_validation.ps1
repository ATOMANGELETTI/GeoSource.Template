# Validation test script for frontend-developer-pro skill
$ErrorActionPreference = "Stop"
$SkillDir = Split-Path -Parent $PSScriptRoot

Write-Host "=== Validating frontend-developer-pro Skill Structure ===" -ForegroundColor Cyan

$RequiredFiles = @(
    "SKILL.md",
    "README.md",
    "scripts\verify-frontend-code.ps1",
    "scripts\run-eslint-prettier.ps1",
    "examples\README.md",
    "examples\typed-ipc-hook\useTauriCommand.ts",
    "resources\component_template.tsx",
    "references\frontend-architecture-security-guide.md"
)

$Failed = 0

foreach ($file in $RequiredFiles) {
    $fullPath = Join-Path $SkillDir $file
    if (Test-Path $fullPath) {
        Write-Host "[PASS] File exists: $file" -ForegroundColor Green
    } else {
        Write-Host "[FAIL] Missing required file: $file" -ForegroundColor Red
        $Failed++
    }
}

if ($Failed -eq 0) {
    Write-Host "[SUCCESS] All frontend-developer-pro files validated successfully." -ForegroundColor Green
    Exit 0
} else {
    Write-Host "[ERROR] Validation failed with $Failed missing file(s)." -ForegroundColor Red
    Exit 1
}
