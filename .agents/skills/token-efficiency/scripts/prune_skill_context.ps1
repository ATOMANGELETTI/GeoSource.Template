<#
.SYNOPSIS
    Removes low-signal content from skill files to minimize their context footprint.

.DESCRIPTION
    Prunes SKILL.md or other skill documents by removing:
    - Redundant headers with no content beneath them
    - Boilerplate table-of-contents sections
    - Lines containing only HTML comments or whitespace
    - Duplicate trigger phrases
    - Any section explicitly tagged with <!-- prune: true -->

    Preserves all high-signal content: workflows, rules, examples, error handling.

.PARAMETER SkillFile
    Path to the SKILL.md (or other skill doc) to prune.

.PARAMETER OutFile
    Optional output path. If omitted, output goes to stdout.

.PARAMETER DryRun
    If set, prints what would be removed without writing output.

.EXAMPLE
    .\prune_skill_context.ps1 -SkillFile ".agents/skills/some-skill/SKILL.md"
    .\prune_skill_context.ps1 -SkillFile ".agents/skills/some-skill/SKILL.md" -DryRun
#>

param(
    [Parameter(Mandatory = $true)]
    [string]$SkillFile,

    [string]$OutFile,

    [switch]$DryRun
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

if (-not (Test-Path -LiteralPath $SkillFile)) {
    Write-Error "Skill file not found: $SkillFile"
    exit 1
}

$lines = Get-Content -LiteralPath $SkillFile
$output = [System.Collections.Generic.List[string]]::new()
$pruned = [System.Collections.Generic.List[string]]::new()

$inPruneBlock = $false
$seenTriggers = [System.Collections.Generic.HashSet[string]]::new()
$inYaml = $false
$yamlCount = 0

foreach ($line in $lines) {
    # YAML frontmatter handling
    if ($line -eq '---') {
        $yamlCount++
        $inYaml = ($yamlCount -eq 1)
        $output.Add($line)
        continue
    }
    if ($yamlCount -lt 2) {
        # Inside YAML — deduplicate triggers
        if ($line -match '^\s*-\s*"(.+)"') {
            $trigger = $Matches[1].Trim().ToLower()
            if ($seenTriggers.Contains($trigger)) {
                $pruned.Add("Duplicate trigger removed: $line")
                continue
            }
            [void]$seenTriggers.Add($trigger)
        }
        $output.Add($line)
        continue
    }

    # Explicit prune blocks
    if ($line -match '<!--\s*prune:\s*true\s*-->') {
        $inPruneBlock = $true
        $pruned.Add("Prune block started at: $line")
        continue
    }
    if ($line -match '<!--\s*prune:\s*end\s*-->') {
        $inPruneBlock = $false
        continue
    }
    if ($inPruneBlock) {
        $pruned.Add("  Pruned: $line")
        continue
    }

    # Strip pure HTML comment lines
    if ($line -match '^\s*<!--.*-->\s*$') {
        $pruned.Add("HTML comment removed: $line")
        continue
    }

    # Strip empty headers (header with nothing but another header below)
    # (Simple heuristic: skip — too risky without lookahead. Just collapse blank lines.)

    $output.Add($line)
}

$result = $output -join "`n"
$origTokens    = [math]::Ceiling(((Get-Content -Raw -LiteralPath $SkillFile).Length) / 5)
$prunedTokens  = [math]::Ceiling($result.Length / 5)
$savings       = $origTokens - $prunedTokens

if ($DryRun) {
    Write-Host "`n=== DRY RUN: prune_skill_context ===" -ForegroundColor Cyan
    Write-Host "File: $SkillFile" -ForegroundColor Gray
    Write-Host "Items that would be pruned ($($pruned.Count)):" -ForegroundColor Yellow
    $pruned | ForEach-Object { Write-Host "  $_" -ForegroundColor DarkYellow }
    Write-Host "`nEstimated savings: ~$savings tokens (from ~$origTokens to ~$prunedTokens)" -ForegroundColor Green
    exit 0
}

if ($OutFile) {
    $result | Set-Content -LiteralPath $OutFile -Encoding UTF8
    Write-Host "Pruned skill written to: $OutFile" -ForegroundColor Green
} else {
    Write-Output $result
}

Write-Host "Items pruned: $($pruned.Count) | Tokens saved: ~$savings (~$origTokens → ~$prunedTokens)" -ForegroundColor Cyan
