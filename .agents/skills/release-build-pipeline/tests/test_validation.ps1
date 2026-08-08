# Validation Script for release-build-pipeline Skill
$ErrorActionPreference = "Stop"
$SkillDir = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)

Write-Host "=== Testing release-build-pipeline Skill ===" -ForegroundColor Cyan

# 1. Test SKILL.md existence
$SkillMd = Join-Path $SkillDir "SKILL.md"
if (Test-Path $SkillMd) {
    Write-Host "[PASS] SKILL.md exists" -ForegroundColor Green
} else {
    Write-Error "[FAIL] SKILL.md missing"
}

# 2. Test YAML frontmatter parsing
$content = Get-Content -Raw $SkillMd
if ($content -match "name:\s*release-build-pipeline" -and $content -match "triggers:") {
    Write-Host "[PASS] Frontmatter structure valid" -ForegroundColor Green
} else {
    Write-Error "[FAIL] Frontmatter invalid"
}

# 3. Test script existence
$scriptPath = Join-Path $SkillDir "scripts/verify_release_readiness.ps1"
if (Test-Path $scriptPath) {
    Write-Host "[PASS] verify_release_readiness.ps1 exists" -ForegroundColor Green
} else {
    Write-Error "[FAIL] Script missing"
}

Write-Host "=== release-build-pipeline Validation PASSED ===" -ForegroundColor Green
exit 0
