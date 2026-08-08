<#
.SYNOPSIS
    Automated test suite for the skill-designer-pro skill itself.
    Validates all files in the skill-designer-pro folder are present and correct.

.DESCRIPTION
    Run this script to verify the skill-designer-pro skill is properly installed
    and all supporting files are in place. Exit code 0 = success, 1 = failure.

.EXAMPLE
    .\test_validation.ps1
#>

[CmdletBinding()]
param()
Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$passed  = 0
$failed  = 0
$warnings = 0

function Assert-True {
    param([string]$label, [bool]$condition, [string]$detail = "")
    if ($condition) {
        Write-Host "  [PASS] $label" -ForegroundColor Green
        $script:passed++
    } else {
        Write-Host "  [FAIL] $label" -ForegroundColor Red
        if ($detail) { Write-Host "         => $detail" -ForegroundColor DarkRed }
        $script:failed++
    }
}

function Assert-Warn {
    param([string]$label, [bool]$condition, [string]$detail = "")
    if ($condition) {
        Write-Host "  [PASS] $label" -ForegroundColor Green
        $script:passed++
    } else {
        Write-Host "  [WARN] $label" -ForegroundColor Yellow
        if ($detail) { Write-Host "         => $detail" -ForegroundColor DarkYellow }
        $script:warnings++
    }
}

$skillRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
Write-Host ""
Write-Host "=== Skill Designer Pro — Self-Test ===" -ForegroundColor Cyan
Write-Host "Skill root: $skillRoot"
Write-Host ""

# ── Section 1: Required Files ──────────────────────────────────────────────────
Write-Host "[ Section 1: Required Files ]" -ForegroundColor White
Assert-True "SKILL.md exists"                          (Test-Path "$skillRoot\SKILL.md")
Assert-True "README.md exists"                         (Test-Path "$skillRoot\README.md")

# ── Section 2: Scripts ─────────────────────────────────────────────────────────
Write-Host ""
Write-Host "[ Section 2: Scripts ]" -ForegroundColor White
Assert-True "scripts\ exists"                          (Test-Path "$skillRoot\scripts")
Assert-True "scripts\generate_skill.ps1 exists"        (Test-Path "$skillRoot\scripts\generate_skill.ps1")
Assert-True "scripts\validate_skill.ps1 exists"        (Test-Path "$skillRoot\scripts\validate_skill.ps1")

# ── Section 3: Script Syntax ───────────────────────────────────────────────────
Write-Host ""
Write-Host "[ Section 3: Script Syntax ]" -ForegroundColor White
$ps1Files = Get-ChildItem "$skillRoot\scripts" -Filter "*.ps1"
foreach ($ps1 in $ps1Files) {
    try {
        $errors = $null
        $null = [System.Management.Automation.Language.Parser]::ParseFile(
            $ps1.FullName, [ref]$null, [ref]$errors
        )
        $syntaxOk = ($null -eq $errors -or $errors.Count -eq 0)
        $detail   = if ($syntaxOk -or $null -eq $errors) { "" } else { [string]::Join("; ", @($errors | Select-Object -First 2 -ExpandProperty Message | Where-Object { $_ -ne $null })) }
        Assert-True "scripts\$($ps1.Name) - syntax valid" $syntaxOk $detail
    } catch {
        Assert-True "scripts\$($ps1.Name) — parseable" $false "Exception: $_"
    }
}

# ── Section 4: Examples ────────────────────────────────────────────────────────
Write-Host ""
Write-Host "[ Section 4: Examples ]" -ForegroundColor White
Assert-True "examples\ exists"                              (Test-Path "$skillRoot\examples")
Assert-True "examples\README.md exists"                     (Test-Path "$skillRoot\examples\README.md")
Assert-True "examples\example_skill\ exists"                (Test-Path "$skillRoot\examples\example_skill")
Assert-True "examples\example_skill\SKILL.md exists"        (Test-Path "$skillRoot\examples\example_skill\SKILL.md")
Assert-True "examples\example_skill\scripts\ exists"        (Test-Path "$skillRoot\examples\example_skill\scripts")
Assert-True "examples\example_skill\references\ exists"     (Test-Path "$skillRoot\examples\example_skill\references")
Assert-True "examples\example_skill\tests\ exists"          (Test-Path "$skillRoot\examples\example_skill\tests")

# ── Section 5: Resources ───────────────────────────────────────────────────────
Write-Host ""
Write-Host "[ Section 5: Resources ]" -ForegroundColor White
Assert-True "resources\ exists"                        (Test-Path "$skillRoot\resources")
Assert-True "resources\skill_template.md exists"       (Test-Path "$skillRoot\resources\skill_template.md")

# ── Section 6: References ──────────────────────────────────────────────────────
Write-Host ""
Write-Host "[ Section 6: References ]" -ForegroundColor White
Assert-True "references\ exists"                              (Test-Path "$skillRoot\references")
Assert-True "references\skill_design_guide.md exists"         (Test-Path "$skillRoot\references\skill_design_guide.md")

# ── Section 7: SKILL.md YAML Validation ────────────────────────────────────────
Write-Host ""
Write-Host "[ Section 7: SKILL.md YAML Validation ]" -ForegroundColor White
$content = Get-Content "$skillRoot\SKILL.md" -Raw
$yamlMatch = [regex]::Match($content, '(?s)^---\n(.*?)\n---')
Assert-True "YAML frontmatter block found"            $yamlMatch.Success

if ($yamlMatch.Success) {
    $yaml = $yamlMatch.Groups[1].Value
    $nameMatch = [regex]::Match($yaml, '^name:\s*(.+)$', 'Multiline')
    Assert-True "name field present"                  $nameMatch.Success
    if ($nameMatch.Success) {
        $nameVal = $nameMatch.Groups[1].Value.Trim()
        Assert-True "name is lowercase-hyphenated"    ($nameVal -match '^[a-z][a-z0-9-]+$') `
                    "Got: '$nameVal'"
    }
    Assert-True "description field present"           ($yaml -match 'description:')
    Assert-True "triggers field present"              ($yaml -match 'triggers:')
    $trigCount = ([regex]::Matches($yaml, '^\s+-\s+"', 'Multiline')).Count
    Assert-True "at least 5 trigger entries"          ($trigCount -ge 5) "Found: $trigCount"
}

# ── Section 8: Line Count Check ────────────────────────────────────────────────
Write-Host ""
Write-Host "[ Section 8: SKILL.md Size ]" -ForegroundColor White
$lineCount = (Get-Content "$skillRoot\SKILL.md").Count
Assert-Warn "SKILL.md <= 500 lines (recommended)"    ($lineCount -le 500) "Lines: $lineCount"

# ── Section 9: Validate-Skill Script Self-Test ────────────────────────────────
Write-Host ""
Write-Host "[ Section 9: Self-Validate via validate_skill.ps1 ]" -ForegroundColor White
try {
    $output = & powershell -File "$skillRoot\scripts\validate_skill.ps1" -SkillPath $skillRoot 2>&1
    $exitOk = ($LASTEXITCODE -le 0)
    Assert-True "validate_skill.ps1 exits cleanly on self"  $exitOk
    Assert-Warn "no FAIL lines in validate output"          (-not ($output -match '\[FAIL\]'))
} catch {
    Assert-True "validate_skill.ps1 runnable" $false "Exception: $_"
}

# ── Final Summary ──────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "─────────────────────────────────────────────" -ForegroundColor DarkGray
$totalRun = $passed + $failed + $warnings
Write-Host "Total: $totalRun checks | $passed PASS | $warnings WARN | $failed FAIL" -ForegroundColor $(
    if ($failed -gt 0) { "Red" } elseif ($warnings -gt 0) { "Yellow" } else { "Green" }
)
Write-Host ""
if ($failed -gt 0) {
    Write-Host "RESULT: FAIL — skill-designer-pro has structural issues." -ForegroundColor Red
    exit 1
} elseif ($warnings -gt 0) {
    Write-Host "RESULT: PASS WITH WARNINGS — skill-designer-pro is functional." -ForegroundColor Yellow
    exit 0
} else {
    Write-Host "RESULT: PASS — skill-designer-pro is healthy and ready." -ForegroundColor Green
    exit 0
}


