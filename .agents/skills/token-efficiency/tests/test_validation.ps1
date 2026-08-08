<#
.SYNOPSIS
    Automated validation test suite for the token-efficiencie skill.

.DESCRIPTION
    Validates that all required skill files exist, YAML frontmatter is
    correct, scripts are syntactically valid, and the skill body
    meets size and quality requirements.

.EXAMPLE
    .\test_validation.ps1
#>

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$SkillRoot = Join-Path $PSScriptRoot ".."
$SkillFile = Join-Path $SkillRoot "SKILL.md"
$Passed    = 0
$Failed    = 0

function Pass([string]$TestName) {
    Write-Host "  [PASS] $TestName" -ForegroundColor Green
    $script:Passed++
}

function Fail([string]$TestName, [string]$Reason) {
    Write-Host "  [FAIL] $TestName - $Reason" -ForegroundColor Red
    $script:Failed++
}

Write-Host "`n=== token-efficiencie Skill Validation ===" -ForegroundColor Cyan
Write-Host "Skill root: $SkillRoot`n"

# ── Test Group 1: Required Files Exist ───────────────────────────────────────
Write-Host "1. Required File Existence" -ForegroundColor Yellow

$requiredFiles = @(
    "SKILL.md",
    "README.md",
    "scripts/analyze_context_size.ps1",
    "scripts/compress_references.ps1",
    "scripts/generate_stub.ps1",
    "scripts/token_budget_report.ps1",
    "scripts/prune_skill_context.ps1",
    "examples/README.md",
    "examples/minimal_example/scenario.md",
    "examples/geosource_full_example/scenario.md",
    "resources/tem_rules_cheatsheet.md",
    "resources/skill_template.md",
    "references/token_budget_heuristics.md",
    "references/tool_call_overhead.md",
    "references/geosource_structure_map.md",
    "references/model_context_windows.md",
    "references/skill_injection_guide.md",
    "references/known_token_traps.md",
    "tests/test_validation.ps1"
)

foreach ($rel in $requiredFiles) {
    $full = Join-Path $SkillRoot $rel
    if (Test-Path -LiteralPath $full) {
        Pass "File exists: $rel"
    } else {
        Fail "File exists: $rel" "NOT FOUND at $full"
    }
}

# ── Test Group 2: YAML Frontmatter Validation ─────────────────────────────────
Write-Host "`n2. YAML Frontmatter" -ForegroundColor Yellow

$content = Get-Content -Raw -LiteralPath $SkillFile

# name field
if ($content -match 'name:\s*token-efficiency') {
    Pass "YAML: name is 'token-efficiency'"
} else {
    Fail "YAML: name field" "Expected 'token-efficiency'"
}

# description at least 2 sentences
$descMatch = [regex]::Match($content, 'description:\s*>\s*([\s\S]+?)(?=\ntriggers:)')
if ($descMatch.Success) {
    $descText = $descMatch.Groups[1].Value.Trim()
    $sentences = ($descText -split '\.').Count - 1
    if ($sentences -ge 2) {
        Pass "YAML: description has >= 2 sentences ($sentences found)"
    } else {
        Fail "YAML: description sentences" "Found only $sentences sentence(s)"
    }
}

# triggers count >= 5
$triggerMatches = [regex]::Matches($content, '^\s*-\s*"[^"]+"', [System.Text.RegularExpressions.RegexOptions]::Multiline)
$triggerSection = [regex]::Match($content, 'triggers:([\s\S]+?)(?=---|\Z)')
$triggerCount   = ([regex]::Matches($triggerSection.Value, '^\s*-\s*"', [System.Text.RegularExpressions.RegexOptions]::Multiline)).Count
if ($triggerCount -ge 5) {
    Pass "YAML: triggers has >= 5 entries ($triggerCount found)"
} else {
    Fail "YAML: trigger count" "Found only $triggerCount (need >= 5)"
}

# ── Test Group 3: Skill Body Size ────────────────────────────────────────────
Write-Host "`n3. Skill Body Size" -ForegroundColor Yellow

$lineCount = (Get-Content -LiteralPath $SkillFile | Measure-Object -Line).Lines
if ($lineCount -le 500) {
    Pass "SKILL.md is <= 500 lines ($lineCount lines)"
} else {
    Fail "SKILL.md line count" "$lineCount lines exceeds 500-line limit"
}

# ── Test Group 4: Required Sections in SKILL.md ──────────────────────────────
Write-Host "`n4. Required SKILL.md Sections" -ForegroundColor Yellow

$requiredSections = @(
    "## Prerequisites",
    "## Activation Protocol",
    "## Step-by-Step Workflow",
    "## Output Specification",
    "## Error Handling",
    "## References"
)

foreach ($section in $requiredSections) {
    if ($content -match [regex]::Escape($section)) {
        Pass "Section present: $section"
    } else {
        Fail "Section missing: $section" "Not found in SKILL.md"
    }
}

# ── Test Group 5: Script Syntax Check ────────────────────────────────────────
Write-Host "`n5. Script Syntax Validation" -ForegroundColor Yellow

$scripts = Get-ChildItem -Path (Join-Path $SkillRoot "scripts") -Filter "*.ps1" -ErrorAction SilentlyContinue
if ($scripts) {
    foreach ($script in $scripts) {
        $errors = $null
        $null = [System.Management.Automation.Language.Parser]::ParseFile(
            $script.FullName, [ref]$null, [ref]$errors
        )
        if ($errors.Count -eq 0) {
            Pass "Syntax valid: scripts/$($script.Name)"
        } else {
            Fail "Syntax invalid: scripts/$($script.Name)" "$($errors[0].Message)"
        }
    }
} else {
    Fail "Script directory" "No .ps1 files found in scripts/"
}

# ── Test Group 6: Validation Quality Gates ───────────────────────────────────
Write-Host "`n6. TEM Quality Gates in SKILL.md" -ForegroundColor Yellow

$qualityChecks = @{
    "grep-before-view rule" = 'grep_search'
    "Stub-first reading"    = 'generate_stub'
    "Browser scoping rule"  = 'browser_subagent'
    "Response discipline"   = 'TEM Rule|TEM verbosity'
    "Token report output"   = 'token_efficiency_report'
    "200-line threshold"    = '200 lines|> 200'
}

foreach ($check in $qualityChecks.GetEnumerator()) {
    if ($content -match $check.Value) {
        Pass "Quality gate documented: $($check.Key)"
    } else {
        Fail "Quality gate missing: $($check.Key)" "Pattern '$($check.Value)' not found"
    }
}

# ── Summary ───────────────────────────────────────────────────────────────────
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Results: $Passed passed, $Failed failed" -ForegroundColor $(if ($Failed -eq 0) { 'Green' } else { 'Red' })

if ($Failed -gt 0) {
    Write-Host "VALIDATION FAILED — fix the issues above before using this skill.`n" -ForegroundColor Red
    exit 1
} else {
    Write-Host "ALL TESTS PASSED — skill is ready.`n" -ForegroundColor Green
    exit 0
}
