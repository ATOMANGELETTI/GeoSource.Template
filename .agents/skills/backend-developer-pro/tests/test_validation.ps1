# Validation test script for backend-developer-pro skill
$ErrorActionPreference = "Stop"

Write-Host "=== Validating backend-developer-pro Skill Structure ===" -ForegroundColor Cyan

$SkillDir = Split-Path -Parent $PSScriptRoot

$RequiredFiles = @(
    "SKILL.md",
    "README.md",
    "scripts\verify-backend-rust.ps1",
    "scripts\run-cargo-clippy-fmt.ps1",
    "examples\secure-ipc-command\lib.rs",
    "resources\command_template.rs",
    "references\tauri-rust-backend-guide.md"
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

$skillContent = Get-Content (Join-Path $SkillDir "SKILL.md") -Raw
if ($skillContent -notmatch "name:\s*backend-developer-pro") {
    Write-Host "[FAIL] SKILL.md frontmatter name is invalid" -ForegroundColor Red
    $Failed++
}

if ($Failed -eq 0) {
    Write-Host "[SUCCESS] All backend-developer-pro files validated successfully." -ForegroundColor Green
    Exit 0
} else {
    Write-Host "[ERROR] Validation failed with $Failed error(s)." -ForegroundColor Red
    Exit 1
}
