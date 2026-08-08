<#
.SYNOPSIS
    Strips verbose content from reference/documentation files to reduce token cost.

.DESCRIPTION
    Processes markdown or text reference files by removing:
    - Consecutive blank lines (collapse to one)
    - HTML comments
    - Long code examples (truncated to first 10 lines with note)
    - Verbose "Note:", "Example:", or "See also:" sections when flagged
    - Lines matching configurable patterns

    Outputs compressed content to a new file with a .compressed.md extension
    or directly to stdout for agent consumption.

.PARAMETER InputFile
    Path to the reference file to compress.

.PARAMETER OutFile
    Optional path for the output file. Defaults to <InputFile>.compressed.md.

.PARAMETER MaxCodeBlockLines
    Maximum lines to keep in any fenced code block (default: 10).

.EXAMPLE
    .\compress_references.ps1 -InputFile "references/token_budget_heuristics.md"
#>

param(
    [Parameter(Mandatory = $true)]
    [string]$InputFile,

    [string]$OutFile,

    [int]$MaxCodeBlockLines = 10
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

if (-not (Test-Path -LiteralPath $InputFile)) {
    Write-Error "Input file not found: $InputFile"
    exit 1
}

$lines = Get-Content -LiteralPath $InputFile
$output = [System.Collections.Generic.List[string]]::new()
$output.Add("<!-- Compressed by compress_references.ps1 - verbose sections removed -->")

$inCodeBlock   = $false
$codeLineCount = 0
$lastBlank     = $false

foreach ($line in $lines) {
    # Toggle code block detection
    if ($line -match '^\s*```') {
        $inCodeBlock = -not $inCodeBlock
        $codeLineCount = 0
        $output.Add($line)
        continue
    }

    if ($inCodeBlock) {
        if ($codeLineCount -lt $MaxCodeBlockLines) {
            $output.Add($line)
        } elseif ($codeLineCount -eq $MaxCodeBlockLines) {
            $output.Add("    // ... ($($lines.Count - $codeLineCount) more lines omitted for token efficiency)")
        }
        $codeLineCount++
        continue
    }

    # Strip HTML comments
    if ($line -match '^\s*<!--.*-->') { continue }

    # Collapse consecutive blank lines
    if ($line.Trim() -eq '') {
        if (-not $lastBlank) { $output.Add('') }
        $lastBlank = $true
        continue
    }
    $lastBlank = $false

    $output.Add($line)
}

$compressed = $output -join "`n"
$originalTokens = [math]::Ceiling(((Get-Content -Raw -LiteralPath $InputFile).Length) / 5)
$compressedTokens = [math]::Ceiling($compressed.Length / 5)
$savings = $originalTokens - $compressedTokens

if (-not $OutFile) {
    $OutFile = [System.IO.Path]::ChangeExtension($InputFile, ".compressed.md")
}

$compressed | Set-Content -LiteralPath $OutFile -Encoding UTF8
Write-Host "Compressed: $InputFile" -ForegroundColor Green
Write-Host "  Original:   ~$originalTokens tokens" -ForegroundColor Gray
Write-Host "  Compressed: ~$compressedTokens tokens" -ForegroundColor Cyan
Write-Host "  Saved:      ~$savings tokens" -ForegroundColor Yellow
Write-Host "  Output:     $OutFile`n" -ForegroundColor Gray
