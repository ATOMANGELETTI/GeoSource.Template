# Validation test script for frontend-designer-pro skill
$ErrorActionPreference = "Stop"
$SkillDir = Split-Path -Parent $PSScriptRoot

Write-Host "=== Validating frontend-designer-pro Skill Structure ===" -ForegroundColor Cyan

$RequiredFiles = @(
    "SKILL.md",
    "README.md",
    "scripts\verify-ui-design.ps1",
    "scripts\format-styles.ps1",
    "examples\README.md",
    "examples\glassmorphism-card\GlassmorphismCard.tsx",
    "resources\design_tokens.json",
    "references\ui-design-system-guide.md"
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
    Write-Host "[SUCCESS] All frontend-designer-pro files validated successfully." -ForegroundColor Green
    Exit 0
} else {
    Write-Host "[ERROR] Validation failed with $Failed missing file(s)." -ForegroundColor Red
    Exit 1
}
