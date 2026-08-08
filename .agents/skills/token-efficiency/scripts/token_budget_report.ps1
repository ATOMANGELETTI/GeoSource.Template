<#
.SYNOPSIS
    Produces a per-file token cost breakdown and efficiency recommendations.

.DESCRIPTION
    Scans a directory (or list of files) and generates a full token budget
    report with recommendations: which files should use grep_search, which
    should be stubbed, and which are safe to view_file directly.

.PARAMETER Path
    Directory or file to analyze.

.PARAMETER Recursive
    If set, scans subdirectories.

.PARAMETER OutputReport
    Optional path to write the markdown report. If omitted, prints to console.

.EXAMPLE
    .\token_budget_report.ps1 -Path "src-tauri/src" -Recursive -OutputReport "resources/last_budget_report.md"
#>

param(
    [Parameter(Mandatory = $true)]
    [string]$Path,

    [switch]$Recursive,

    [string]$OutputReport
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Estimate-Tokens([string]$FilePath) {
    $ext   = [System.IO.Path]::GetExtension($FilePath).ToLower()
    $chars = (Get-Content -Raw -LiteralPath $FilePath -ErrorAction SilentlyContinue).Length
    if ($null -eq $chars) { return 0 }
    $divisor = if ($ext -in '.md', '.txt') { 5 } else { 4 }
    return [math]::Ceiling($chars / $divisor)
}

function Get-Recommendation([int]$EstTokens, [int]$Lines) {
    if ($Lines -le 50)          { return "view_file directly (small)" }
    if ($EstTokens -le 200)     { return "view_file directly (low cost)" }
    if ($Lines -gt 200)         { return "USE grep_search or generate_stub.ps1" }
    if ($EstTokens -gt 500)     { return "STUB RECOMMENDED - generate_stub.ps1" }
    return "view_file with line range"
}

$files = if ($Recursive) {
    Get-ChildItem -LiteralPath $Path -Recurse -File
} else {
    Get-ChildItem -LiteralPath $Path -File
}

$rows = $files | ForEach-Object {
    $lineCount = (Get-Content -LiteralPath $_.FullName -ErrorAction SilentlyContinue | Measure-Object -Line).Lines
    $est = Estimate-Tokens -FilePath $_.FullName
    [PSCustomObject]@{
        File           = $_.FullName -replace [regex]::Escape($Path), '.'
        Lines          = $lineCount
        EstTokens      = $est
        Recommendation = Get-Recommendation -EstTokens $est -Lines $lineCount
    }
} | Sort-Object -Property EstTokens -Descending

$totalEst = ($rows | Measure-Object -Property EstTokens -Sum).Sum
$greedyCount = ($rows | Where-Object { $_.EstTokens -gt 200 } | Measure-Object).Count

$reportLines = [System.Collections.Generic.List[string]]::new()
$reportLines.Add("# Token Budget Report")
$reportLines.Add("")
$reportLines.Add("**Scanned Path**: ``$Path``")
$reportLines.Add("**Generated**: $(Get-Date -Format 'yyyy-MM-dd HH:mm')")
$reportLines.Add("**Total estimated tokens (all files)**: ~$totalEst")
$reportLines.Add("**Files requiring care (>200 tokens)**: $greedyCount")
$reportLines.Add("")
$reportLines.Add("## File Breakdown")
$reportLines.Add("")
$reportLines.Add("| File | Lines | Est. Tokens | Recommendation |")
$reportLines.Add("|---|---:|---:|---|")
foreach ($row in $rows) {
    $reportLines.Add("| ``$($row.File)`` | $($row.Lines) | ~$($row.EstTokens) | $($row.Recommendation) |")
}
$reportLines.Add("")
$reportLines.Add("## Summary")
$reportLines.Add("")
$reportLines.Add("- Files safe for ``view_file``: $(($rows | Where-Object { $_.Recommendation -like 'view_file*' } | Measure-Object).Count)")
$reportLines.Add("- Files requiring stubs/grep: $greedyCount")
$reportLines.Add("- If all files loaded naively: ~$totalEst tokens")
$reportLines.Add("- With TEM applied (grep + stubs): estimated ~$([math]::Round($totalEst * 0.25)) tokens (~75% reduction)")

$reportText = $reportLines -join "`n"

if ($OutputReport) {
    $reportText | Set-Content -LiteralPath $OutputReport -Encoding UTF8
    Write-Host "Token budget report written to: $OutputReport" -ForegroundColor Green
} else {
    Write-Output $reportText
}
