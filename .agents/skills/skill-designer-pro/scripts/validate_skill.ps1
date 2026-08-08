<#
.SYNOPSIS
    Validates a generated skill directory for correctness and completeness.
    Used by skill-designer-pro Phase 3 validation.

.PARAMETER SkillPath
    Absolute path to the skill directory to validate.

.EXAMPLE
    .\validate_skill.ps1 -SkillPath "C:\...\\.agents\skills\tauri-builder"
#>

[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)]
    [string]$SkillPath
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$passed = 0
$failed = 0
$warnings = 0

function Assert-True {
    param([string]$label, [bool]$condition, [string]$detail = "")
    if ($condition) {
        Write-Host "  [PASS] $label" -ForegroundColor Green
        $script:passed++
    } else {
        Write-Host "  [FAIL] $label" -ForegroundColor Red
        if ($detail) { Write-Host "         $detail" -ForegroundColor DarkRed }
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
        if ($detail) { Write-Host "         $detail" -ForegroundColor DarkYellow }
        $script:warnings++
    }
}

Write-Host ""
Write-Host "=== Skill Designer Pro — Validate Skill ===" -ForegroundColor Cyan
Write-Host "Path: $SkillPath"
Write-Host ""

# ── Check: Path exists ─────────────────────────────────────────────────────────
if (-not (Test-Path $SkillPath)) {
    Write-Host "[FATAL] Skill path does not exist: $SkillPath" -ForegroundColor Red
    exit 2
}

$skillMd = Join-Path $SkillPath "SKILL.md"

# ── Section 1: File Structure ──────────────────────────────────────────────────
Write-Host "[ Section 1: File Structure ]" -ForegroundColor White
Assert-True "SKILL.md exists"                    (Test-Path $skillMd)
Assert-True "README.md exists"                   (Test-Path (Join-Path $SkillPath "README.md"))
Assert-True "scripts/ directory exists"          (Test-Path (Join-Path $SkillPath "scripts"))
Assert-True "examples/ directory exists"         (Test-Path (Join-Path $SkillPath "examples"))
Assert-True "resources/ directory exists"        (Test-Path (Join-Path $SkillPath "resources"))
Assert-True "references/ directory exists"       (Test-Path (Join-Path $SkillPath "references"))
Assert-True "tests/ directory exists"            (Test-Path (Join-Path $SkillPath "tests"))
Assert-Warn "tests/test_validation.ps1 exists"  (Test-Path (Join-Path $SkillPath "tests\test_validation.ps1"))

# ── Section 2: YAML Frontmatter ───────────────────────────────────────────────
Write-Host ""
Write-Host "[ Section 2: YAML Frontmatter ]" -ForegroundColor White
if (Test-Path $skillMd) {
    $content = Get-Content $skillMd -Raw
    $lines   = Get-Content $skillMd

    # Extract YAML block between --- delimiters
    $yamlMatch = [regex]::Match($content, '(?s)^---\n(.*?)\n---')
    Assert-True "YAML block found (--- delimiters)"     $yamlMatch.Success

    if ($yamlMatch.Success) {
        $yaml = $yamlMatch.Groups[1].Value

        # name field
        $nameMatch = [regex]::Match($yaml, '^name:\s*(.+)$', 'Multiline')
        Assert-True "name field present"                    $nameMatch.Success
        if ($nameMatch.Success) {
            $nameVal = $nameMatch.Groups[1].Value.Trim()
            Assert-True "name is lowercase-hyphenated"      ($nameVal -match '^[a-z][a-z0-9-]+$') `
                        "Got: '$nameVal'"
        }

        # description field
        $descMatch = [regex]::Match($yaml, '(?s)description:\s*>\n(.+?)(?=\n\w|\z)', 'Multiline')
        Assert-True "description field present"             ($yaml -match 'description:')
        Assert-Warn "description is multi-line (>2 sentences)" ($yaml -match 'description:\s*>[\s\S]{100,}')

        # triggers field
        $triggerMatches = [regex]::Matches($yaml, '^\s+-\s+"', 'Multiline')
        Assert-True "triggers field present"                ($yaml -match 'triggers:')
        Assert-True "at least 5 trigger entries"            ($triggerMatches.Count -ge 5) `
                    "Found: $($triggerMatches.Count)"
    }

    # Line count check
    Assert-Warn "SKILL.md under 500 lines (recommended)"  ($lines.Count -le 500) `
                "Lines: $($lines.Count)"
}

# ── Section 3: Script Syntax Validation ────────────────────────────────────────
Write-Host ""
Write-Host "[ Section 3: Script Syntax ]" -ForegroundColor White
$ps1Files = Get-ChildItem -Path $SkillPath -Filter "*.ps1" -Recurse
if ($ps1Files.Count -eq 0) {
    Write-Host "  [INFO] No .ps1 scripts found (skipping syntax check)" -ForegroundColor Gray
} else {
    foreach ($ps1 in $ps1Files) {
        $rel = $ps1.FullName.Replace($SkillPath, ".")
        try {
            $errors = $null
            $null = [System.Management.Automation.Language.Parser]::ParseFile(
                $ps1.FullName, [ref]$null, [ref]$errors
            )
            $syntaxOk = ($errors.Count -eq 0)
            Assert-True "$rel syntax valid" $syntaxOk `
                        ($errors | ForEach-Object { $_.Message } | Select-Object -First 3 | ForEach-Object { <#
.SYNOPSIS
    Validates a generated skill directory for correctness and completeness.
    Used by skill-designer-pro Phase 3 validation.

.PARAMETER SkillPath
    Absolute path to the skill directory to validate.

.EXAMPLE
    .\validate_skill.ps1 -SkillPath "C:\...\\.agents\skills\tauri-builder"
#>

[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)]
    [string]$SkillPath
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$passed = 0
$failed = 0
$warnings = 0

function Assert-True {
    param([string]$label, [bool]$condition, [string]$detail = "")
    if ($condition) {
        Write-Host "  [PASS] $label" -ForegroundColor Green
        $script:passed++
    } else {
        Write-Host "  [FAIL] $label" -ForegroundColor Red
        if ($detail) { Write-Host "         $detail" -ForegroundColor DarkRed }
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
        if ($detail) { Write-Host "         $detail" -ForegroundColor DarkYellow }
        $script:warnings++
    }
}

Write-Host ""
Write-Host "=== Skill Designer Pro — Validate Skill ===" -ForegroundColor Cyan
Write-Host "Path: $SkillPath"
Write-Host ""

# ── Check: Path exists ─────────────────────────────────────────────────────────
if (-not (Test-Path $SkillPath)) {
    Write-Host "[FATAL] Skill path does not exist: $SkillPath" -ForegroundColor Red
    exit 2
}

$skillMd = Join-Path $SkillPath "SKILL.md"

# ── Section 1: File Structure ──────────────────────────────────────────────────
Write-Host "[ Section 1: File Structure ]" -ForegroundColor White
Assert-True "SKILL.md exists"                    (Test-Path $skillMd)
Assert-True "README.md exists"                   (Test-Path (Join-Path $SkillPath "README.md"))
Assert-True "scripts/ directory exists"          (Test-Path (Join-Path $SkillPath "scripts"))
Assert-True "examples/ directory exists"         (Test-Path (Join-Path $SkillPath "examples"))
Assert-True "resources/ directory exists"        (Test-Path (Join-Path $SkillPath "resources"))
Assert-True "references/ directory exists"       (Test-Path (Join-Path $SkillPath "references"))
Assert-True "tests/ directory exists"            (Test-Path (Join-Path $SkillPath "tests"))
Assert-Warn "tests/test_validation.ps1 exists"  (Test-Path (Join-Path $SkillPath "tests\test_validation.ps1"))

# ── Section 2: YAML Frontmatter ───────────────────────────────────────────────
Write-Host ""
Write-Host "[ Section 2: YAML Frontmatter ]" -ForegroundColor White
if (Test-Path $skillMd) {
    $content = Get-Content $skillMd -Raw
    $lines   = Get-Content $skillMd

    # Extract YAML block between --- delimiters
    $yamlMatch = [regex]::Match($content, '(?s)^---\n(.*?)\n---')
    Assert-True "YAML block found (--- delimiters)"     $yamlMatch.Success

    if ($yamlMatch.Success) {
        $yaml = $yamlMatch.Groups[1].Value

        # name field
        $nameMatch = [regex]::Match($yaml, '^name:\s*(.+)$', 'Multiline')
        Assert-True "name field present"                    $nameMatch.Success
        if ($nameMatch.Success) {
            $nameVal = $nameMatch.Groups[1].Value.Trim()
            Assert-True "name is lowercase-hyphenated"      ($nameVal -match '^[a-z][a-z0-9-]+$') `
                        "Got: '$nameVal'"
        }

        # description field
        $descMatch = [regex]::Match($yaml, '(?s)description:\s*>\n(.+?)(?=\n\w|\z)', 'Multiline')
        Assert-True "description field present"             ($yaml -match 'description:')
        Assert-Warn "description is multi-line (>2 sentences)" ($yaml -match 'description:\s*>[\s\S]{100,}')

        # triggers field
        $triggerMatches = [regex]::Matches($yaml, '^\s+-\s+"', 'Multiline')
        Assert-True "triggers field present"                ($yaml -match 'triggers:')
        Assert-True "at least 5 trigger entries"            ($triggerMatches.Count -ge 5) `
                    "Found: $($triggerMatches.Count)"
    }

    # Line count check
    Assert-Warn "SKILL.md under 500 lines (recommended)"  ($lines.Count -le 500) `
                "Lines: $($lines.Count)"
}

# ── Section 3: Script Syntax Validation ────────────────────────────────────────
Write-Host ""
Write-Host "[ Section 3: Script Syntax ]" -ForegroundColor White
$ps1Files = Get-ChildItem -Path $SkillPath -Filter "*.ps1" -Recurse
if ($ps1Files.Count -eq 0) {
    Write-Host "  [INFO] No .ps1 scripts found (skipping syntax check)" -ForegroundColor Gray
} else {
    foreach ($ps1 in $ps1Files) {
        $rel = $ps1.FullName.Replace($SkillPath, ".")
        try {
            $errors = $null
            $null = [System.Management.Automation.Language.Parser]::ParseFile(
                $ps1.FullName, [ref]$null, [ref]$errors
            )
            $syntaxOk = ($errors.Count -eq 0)
            Assert-True "$rel syntax valid" $syntaxOk `
                        ([string]::Join("; ", ($errors | Select-Object -First 3 -ExpandProperty Message)))
        } catch {
            Assert-True "$rel parseable" $false "Exception: $_"
        }
    }
}

# ── Section 4: Reference File Check ───────────────────────────────────────────
Write-Host ""
Write-Host "[ Section 4: Referenced Files ]" -ForegroundColor White
if (Test-Path $skillMd) {
    $content = Get-Content $skillMd -Raw
    # Find all file references like scripts/foo.ps1, examples/bar/, resources/baz.md
    $fileRefs = [regex]::Matches($content, '(?:scripts|examples|resources|references|tests)/[\w.\-/]+')
    $checkedPaths = @{}
    foreach ($ref in $fileRefs) {
        $refPath = Join-Path $SkillPath $ref.Value.TrimEnd('/')
        if ($checkedPaths.ContainsKey($refPath)) { continue }
        $checkedPaths[$refPath] = $true
        $exists = (Test-Path $refPath) -or (Test-Path ($refPath -replace '[\\/]$', ''))
        Assert-Warn "Referenced path exists: $($ref.Value)" $exists
    }
    if ($fileRefs.Count -eq 0) {
        Write-Host "  [INFO] No file references detected in SKILL.md body" -ForegroundColor Gray
    }
}

# ── Final Summary ──────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "────────────────────────────────────────────" -ForegroundColor DarkGray
Write-Host "Results: $passed PASS  |  $warnings WARN  |  $failed FAIL" -ForegroundColor $(
    if ($failed -gt 0) { "Red" } elseif ($warnings -gt 0) { "Yellow" } else { "Green" }
)
Write-Host ""

if ($failed -gt 0) {
    Write-Host "Validation FAILED. Fix the issues above before using this skill." -ForegroundColor Red
    exit 1
} elseif ($warnings -gt 0) {
    Write-Host "Validation PASSED with warnings. Review warnings above." -ForegroundColor Yellow
    exit 0
} else {
    Write-Host "Validation PASSED. Skill is ready to use!" -ForegroundColor Green
    exit 0
}
 } | Out-String)
        } catch {
            Assert-True "$rel parseable" $false "Exception: $_"
        }
    }
}

# ── Section 4: Reference File Check ───────────────────────────────────────────
Write-Host ""
Write-Host "[ Section 4: Referenced Files ]" -ForegroundColor White
if (Test-Path $skillMd) {
    $content = Get-Content $skillMd -Raw
    # Find all file references like scripts/foo.ps1, examples/bar/, resources/baz.md
    $fileRefs = [regex]::Matches($content, '(?:scripts|examples|resources|references|tests)/[\w.\-/]+')
    $checkedPaths = @{}
    foreach ($ref in $fileRefs) {
        $refPath = Join-Path $SkillPath $ref.Value.TrimEnd('/')
        if ($checkedPaths.ContainsKey($refPath)) { continue }
        $checkedPaths[$refPath] = $true
        $exists = (Test-Path $refPath) -or (Test-Path ($refPath -replace '[\\/]$', ''))
        Assert-Warn "Referenced path exists: $($ref.Value)" $exists
    }
    if ($fileRefs.Count -eq 0) {
        Write-Host "  [INFO] No file references detected in SKILL.md body" -ForegroundColor Gray
    }
}

# ── Final Summary ──────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "────────────────────────────────────────────" -ForegroundColor DarkGray
Write-Host "Results: $passed PASS  |  $warnings WARN  |  $failed FAIL" -ForegroundColor $(
    if ($failed -gt 0) { "Red" } elseif ($warnings -gt 0) { "Yellow" } else { "Green" }
)
Write-Host ""

if ($failed -gt 0) {
    Write-Host "Validation FAILED. Fix the issues above before using this skill." -ForegroundColor Red
    exit 1
} elseif ($warnings -gt 0) {
    Write-Host "Validation PASSED with warnings. Review warnings above." -ForegroundColor Yellow
    exit 0
} else {
    Write-Host "Validation PASSED. Skill is ready to use!" -ForegroundColor Green
    exit 0
}


