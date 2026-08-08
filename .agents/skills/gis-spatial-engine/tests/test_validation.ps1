# Validation Script for gis-spatial-engine Skill
$ErrorActionPreference = "Stop"
$SkillDir = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)

Write-Host "=== Testing gis-spatial-engine Skill ===" -ForegroundColor Cyan

# 1. Test SKILL.md existence
$SkillMd = Join-Path $SkillDir "SKILL.md"
if (Test-Path $SkillMd) {
    Write-Host "[PASS] SKILL.md exists" -ForegroundColor Green
} else {
    Write-Error "[FAIL] SKILL.md missing"
}

# 2. Test YAML frontmatter parsing
$content = Get-Content -Raw $SkillMd
if ($content -match "name:\s*gis-spatial-engine" -and $content -match "triggers:") {
    Write-Host "[PASS] Frontmatter structure valid" -ForegroundColor Green
} else {
    Write-Error "[FAIL] Frontmatter invalid"
}

# 3. Test script existence
$scriptPath = Join-Path $SkillDir "scripts/process_geojson.ps1"
if (Test-Path $scriptPath) {
    Write-Host "[PASS] process_geojson.ps1 exists" -ForegroundColor Green
} else {
    Write-Error "[FAIL] Script missing"
}

Write-Host "=== gis-spatial-engine Validation PASSED ===" -ForegroundColor Green
exit 0
