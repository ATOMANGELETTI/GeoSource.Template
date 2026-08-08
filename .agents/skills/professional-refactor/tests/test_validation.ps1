# Automated test validation script for professional-refactor skill
[CmdletBinding()]
param()

$ErrorActionPreference = "Stop"

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host " Testing Skill Integrity: professional-refactor" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

$skillDir = Split-Path (Split-Path $MyInvocation.MyCommand.Path -Parent) -Parent
Write-Host "[+] Skill Directory: $skillDir" -ForegroundColor Green

$passCount = 0
$failCount = 0

function Assert-Check {
    param(
        [string]$Name,
        [scriptblock]$Condition
    )
    try {
        $result = & $Condition
        if ($result) {
            Write-Host "  [PASS] $Name" -ForegroundColor Green
            $script:passCount++
        } else {
            Write-Host "  [FAIL] $Name" -ForegroundColor Red
            $script:failCount++
        }
    } catch {
        Write-Host "  [ERROR] $Name : $_" -ForegroundColor Red
        $script:failCount++
    }
}

# 1. Check SKILL.md and README.md existence
Assert-Check "SKILL.md exists" { Test-Path (Join-Path $skillDir "SKILL.md") }
Assert-Check "README.md exists" { Test-Path (Join-Path $skillDir "README.md") }

# 2. Check YAML frontmatter in SKILL.md
Assert-Check "SKILL.md YAML Frontmatter valid" {
    $content = Get-Content (Join-Path $skillDir "SKILL.md") -Raw
    ($content -match "^---\r?\nname:\s*professional-refactor") -and
    ($content -match "description:\s*>") -and
    ($content -match "triggers:")
}

# 3. Check scripts existence and PowerShell AST syntax
$scripts = @("scripts/analyze_architecture.ps1", "scripts/verify_refactor.ps1")
foreach ($scriptRel in $scripts) {
    $scriptPath = Join-Path $skillDir $scriptRel
    Assert-Check "$scriptRel exists" { Test-Path $scriptPath }
    Assert-Check "$scriptRel valid PowerShell AST syntax" {
        $tokens = $null
        $errors = $null
        [System.Management.Automation.Language.Parser]::ParseFile($scriptPath, [ref]$tokens, [ref]$errors)
        $errors.Count -eq 0
    }
}

# 4. Check examples & references
Assert-Check "simple_refactor_proposal.md exists" { Test-Path (Join-Path $skillDir "examples/simple_refactor_proposal.md") }
Assert-Check "full_architecture_refactor_proposal.md exists" { Test-Path (Join-Path $skillDir "examples/full_architecture_refactor_proposal.md") }
Assert-Check "refactor_checklist.md exists" { Test-Path (Join-Path $skillDir "resources/refactor_checklist.md") }
Assert-Check "tauri_v2_refactoring_guide.md exists" { Test-Path (Join-Path $skillDir "references/tauri_v2_refactoring_guide.md") }
Assert-Check "performance_security_best_practices.md exists" { Test-Path (Join-Path $skillDir "references/performance_security_best_practices.md") }

Write-Host "`n==================================================" -ForegroundColor Cyan
Write-Host " Test Summary: $passCount Passed, $failCount Failed" -ForegroundColor $(if ($failCount -eq 0) { "Green" } else { "Red" })
Write-Host "==================================================" -ForegroundColor Cyan

if ($failCount -gt 0) {
    exit 1
}
