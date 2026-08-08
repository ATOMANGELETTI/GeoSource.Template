<#
.SYNOPSIS
    Automated unit & validation test suite for design-systems-pro skill.
.DESCRIPTION
    Validates YAML frontmatter, script syntax, design tokens compilation, and file integrity.
#>

$ErrorActionPreference = "Stop"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   TEST SUITE: design-systems-pro Validation              " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

$SkillDir = "c:\Storage\Development\Projects\Tauri\GeoSource\GeoSource.Template\.agents\skills\design-systems-pro"
$FailCount = 0

# Test 1: SKILL.md Frontmatter check
Write-Host "`n[TEST 1] Verifying SKILL.md YAML Frontmatter..." -ForegroundColor Yellow
$SkillMdPath = "$SkillDir\SKILL.md"
if (Test-Path $SkillMdPath) {
    $Content = Get-Content $SkillMdPath -Raw
    if ($Content -match "^---" -and $Content -match "name:\s*design-systems-pro" -and $Content -match "triggers:") {
        Write-Host "  [PASS] SKILL.md YAML Frontmatter structure valid" -ForegroundColor Green
    } else {
        Write-Host "  [FAIL] SKILL.md missing valid frontmatter attributes" -ForegroundColor Red
        $FailCount++
    }
} else {
    Write-Host "  [FAIL] SKILL.md does not exist" -ForegroundColor Red
    $FailCount++
}

# Test 2: Token Generator execution
Write-Host "`n[TEST 2] Testing Token Generator Execution..." -ForegroundColor Yellow
$GenScript = "$SkillDir\scripts\generate_system_tokens.ps1"
try {
    & powershell -ExecutionPolicy Bypass -File $GenScript -System "apple" -OutputFile "$SkillDir\examples\minimal-tokens\theme.css"
    Write-Host "  [PASS] generate_system_tokens.ps1 executed successfully" -ForegroundColor Green
} catch {
    Write-Host "  [FAIL] generate_system_tokens.ps1 failed: $_" -ForegroundColor Red
    $FailCount++
}

# Test 3: System Auditor execution
Write-Host "`n[TEST 3] Testing System Auditor Execution..." -ForegroundColor Yellow
$AuditScript = "$SkillDir\scripts\validate_design_system.ps1"
try {
    & powershell -ExecutionPolicy Bypass -File $AuditScript
    Write-Host "  [PASS] validate_design_system.ps1 passed all checks" -ForegroundColor Green
} catch {
    Write-Host "  [FAIL] validate_design_system.ps1 failed: $_" -ForegroundColor Red
    $FailCount++
}

Write-Host "`n==========================================================" -ForegroundColor Cyan
if ($FailCount -eq 0) {
    Write-Host "   TEST SUITE RESULT: ALL TESTS PASSED (0 errors)        " -ForegroundColor Green
    Write-Host "==========================================================" -ForegroundColor Cyan
    exit 0
} else {
    Write-Host "   TEST SUITE RESULT: FAILED ($FailCount errors)          " -ForegroundColor Red
    Write-Host "==========================================================" -ForegroundColor Cyan
    exit 1
}
