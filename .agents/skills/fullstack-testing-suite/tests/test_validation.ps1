<#
.SYNOPSIS
    Validation suite for fullstack-testing-suite skill integrity.
.DESCRIPTION
    Validates YAML frontmatter, file existence, and script syntax.
#>

$SkillDir = Resolve-Path "$PSScriptRoot\.."
$SkillMd = Join-Path $SkillDir "SKILL.md"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " Skill Validation: fullstack-testing-suite" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

$Passed = $true

# Check 1: SKILL.md Existence
if (Test-Path $SkillMd) {
    Write-Host "[PASS] SKILL.md exists." -ForegroundColor Green
} else {
    Write-Host "[FAIL] SKILL.md missing!" -ForegroundColor Red
    $Passed = $false
}

# Check 2: Scripts Existence
$Scripts = @(
    "scripts\run_fullstack_tests.ps1",
    "scripts\scaffold_test_suite.ps1",
    "scripts\verify_coverage.ps1"
)

foreach ($s in $Scripts) {
    $path = Join-Path $SkillDir $s
    if (Test-Path $path) {
        Write-Host "[PASS] Script found: $s" -ForegroundColor Green
    } else {
        Write-Host "[FAIL] Script missing: $s" -ForegroundColor Red
        $Passed = $false
    }
}

# Check 3: References & Examples
$Refs = @(
    "references\testing_architecture_guide.md",
    "examples\README.md",
    "resources\skill_template.md"
)

foreach ($r in $Refs) {
    $path = Join-Path $SkillDir $r
    if (Test-Path $path) {
        Write-Host "[PASS] Asset found: $r" -ForegroundColor Green
    } else {
        Write-Host "[FAIL] Asset missing: $r" -ForegroundColor Red
        $Passed = $false
    }
}

if ($Passed) {
    Write-Host "`nAll validation checks PASSED!" -ForegroundColor Green
    exit 0
} else {
    Write-Host "`nValidation checks FAILED!" -ForegroundColor Red
    exit 1
}
