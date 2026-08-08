<#
.SYNOPSIS
    Automated validation suite for the 'always-beautiful' skill.
#>
$ErrorActionPreference = "Stop"

Write-Host "=== Running Automated Validation Suite for always-beautiful ===" -ForegroundColor Cyan

$baseDir = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$passCount = 0
$failCount = 0

function Assert-Check {
    param([bool]$Condition, [string]$Message)
    if ($Condition) {
        Write-Host "  [PASS] $Message" -ForegroundColor Green
        $global:passCount++
    } else {
        Write-Host "  [FAIL] $Message" -ForegroundColor Red
        $global:failCount++
    }
}

# 1. Check SKILL.md Existence and Frontmatter
$skillFile = Join-Path $baseDir "SKILL.md"
Assert-Check (Test-Path $skillFile) "SKILL.md exists"

if (Test-Path $skillFile) {
    $content = Get-Content -Path $skillFile -Raw
    Assert-Check ($content -match 'name:\s*always-beautiful') "YAML frontmatter has 'name: always-beautiful'"
    Assert-Check ($content -match 'description:') "YAML frontmatter has 'description' field"

    $triggersMatch = [regex]::Matches($content, '^\s*-\s*".*"', 'Multiline')
    Assert-Check ($triggersMatch.Count -ge 5) "YAML frontmatter defines at least 5 trigger phrases (found $($triggersMatch.Count))"
}

# 2. Check Directory & File Structure
$expectedFiles = @(
    "README.md",
    "scripts\audit_ui_aesthetics.ps1",
    "scripts\inject_design_tokens.ps1",
    "references\aesthetic_standards.md",
    "references\motion_and_microinteractions.md",
    "examples\README.md",
    "examples\minimal\BeforeAfterComponent.svelte",
    "examples\dashboard\PolishedDashboard.svelte",
    "resources\skill_template.md"
)

foreach ($relPath in $expectedFiles) {
    $fullPath = Join-Path $baseDir $relPath
    Assert-Check (Test-Path $fullPath) "File exists: $relPath"
}

# 3. Check PowerShell Script Syntax
$psScripts = Get-ChildItem -Path $baseDir -Recurse -Include *.ps1
foreach ($script in $psScripts) {
    $errors = $null
    $null = [System.Management.Automation.PSParser]::Tokenize((Get-Content $script.FullName -Raw), [ref]$errors)
    Assert-Check ($errors.Count -eq 0) "PowerShell syntax check for $($script.Name)"
}

Write-Host "`nValidation Summary:" -ForegroundColor Gray
Write-Host "PASS: $passCount | FAIL: $failCount" -ForegroundColor $(if ($failCount -eq 0) { "Green" } else { "Red" })

if ($failCount -gt 0) {
    exit 1
} else {
    exit 0
}
