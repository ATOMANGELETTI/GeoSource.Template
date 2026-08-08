<#
.SYNOPSIS
    Estimates token consumption for files in the current conversation context.

.DESCRIPTION
    Scans specified files or directories and estimates their token footprint
    using character-based approximations (1 token ≈ 4 characters for code,
    1 token ≈ 5 characters for prose). Outputs a ranked table of token cost
    per file to help the agent prioritize what NOT to load.

.PARAMETER Path
    Path to a file or directory to analyze.

.PARAMETER Recursive
    If set, scans subdirectories recursively.

.PARAMETER TopN
    How many largest files to display (default: 10).

.EXAMPLE
    .\analyze_context_size.ps1 -Path "src-tauri/src" -Recursive -TopN 20
#>

param(
    [Parameter(Mandatory = $true)]
    [string]$Path,

    [switch]$Recursive,

    [int]$TopN = 10
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Estimate-Tokens {
    param([string]$FilePath)
    $ext = [System.IO.Path]::GetExtension($FilePath).ToLower()
    $chars = (Get-Content -Raw -LiteralPath $FilePath -ErrorAction SilentlyContinue).Length
    if ($null -eq $chars) { return 0 }
    # Prose files (markdown, txt) → 5 chars/token; code → 4 chars/token
    $proseExts = @('.md', '.txt', '.rst')
    $divisor = if ($proseExts -contains $ext) { 5 } else { 4 }
    return [math]::Ceiling($chars / $divisor)
}

$files = if ($Recursive) {
    Get-ChildItem -LiteralPath $Path -Recurse -File
} else {
    Get-ChildItem -LiteralPath $Path -File
}

$results = $files | ForEach-Object {
    [PSCustomObject]@{
        File         = $_.FullName
        Lines        = (Get-Content -LiteralPath $_.FullName -ErrorAction SilentlyContinue | Measure-Object -Line).Lines
        Bytes        = $_.Length
        EstTokens    = Estimate-Tokens -FilePath $_.FullName
    }
} | Sort-Object -Property EstTokens -Descending | Select-Object -First $TopN

$totalTokens = ($results | Measure-Object -Property EstTokens -Sum).Sum

Write-Host "`n=== CONTEXT SIZE ANALYSIS ===" -ForegroundColor Cyan
Write-Host "Path: $Path`n" -ForegroundColor Gray
$results | Format-Table -AutoSize @(
    @{Label="File"; Expression={$_.File -replace [regex]::Escape($Path), '.'}}
    @{Label="Lines"; Expression={$_.Lines}; Alignment="Right"}
    @{Label="Bytes"; Expression={$_.Bytes}; Alignment="Right"}
    @{Label="Est. Tokens"; Expression={$_.EstTokens}; Alignment="Right"}
)
Write-Host "Top $TopN total estimated tokens: $totalTokens" -ForegroundColor Yellow
Write-Host "Recommendation: Files > 500 est. tokens should use grep_search or stubs.`n" -ForegroundColor Green
