<#
.SYNOPSIS
    Audits UI source files for missing transitions, unstyled inputs, plain default colors, and low visual polish.
.PARAMETER TargetPath
    Path to directory or file to audit. Defaults to 'src'.
#>
[CmdletBinding()]
param(
    [string]$TargetPath = "src"
)

Write-Host "=== Always-Beautiful UI Aesthetic Auditor ===" -ForegroundColor Cyan
Write-Host "Scanning path: $TargetPath" -ForegroundColor Gray

if (-not (Test-Path $TargetPath)) {
    Write-Host "Target path '$TargetPath' does not exist. Skipping scan." -ForegroundColor Yellow
    exit 0
}

$files = Get-ChildItem -Path $TargetPath -Recurse -Include *.svelte, *.tsx, *.jsx, *.html, *.css -ErrorAction SilentlyContinue

if ($files.Count -eq 0) {
    Write-Host "No UI target files found under '$TargetPath'." -ForegroundColor Yellow
    exit 0
}

$issuesFound = 0
$scannedCount = 0

foreach ($file in $files) {
    $scannedCount++
    $content = Get-Content -Path $file.FullName -Raw -ErrorAction SilentlyContinue
    if ([string]::IsNullOrWhiteSpace($content)) { continue }

    $fileIssues = @()

    # Check 1: Raw plain hex/RGB colors without variables/tokens
    if ($content -match '#000000|#ffffff|#ff0000|#00ff00|#0000ff|rgb\(0,0,0\)') {
        $fileIssues += "Contains hardcoded plain default hex/RGB colors instead of theme design tokens"
    }

    # Check 2: Interactive elements without CSS transition properties
    if (($content -match '<button|<a\s|class=".*btn.*"') -and ($content -notmatch 'transition|duration-|ease-')) {
        $fileIssues += "Interactive elements detected without hover/active transitions"
    }

    # Check 3: Lack of border-radius or rounded corners on cards/surfaces
    if (($content -match 'class=".*card.*"') -and ($content -notmatch 'rounded-|border-radius')) {
        $fileIssues += "Card container lacks rounded corner design tokens"
    }

    if ($fileIssues.Count -gt 0) {
        $issuesFound += $fileIssues.Count
        Write-Host "[Aesthetic Warning] $($file.Name):" -ForegroundColor Yellow
        foreach ($issue in $fileIssues) {
            Write-Host "  - $issue" -ForegroundColor DarkYellow
        }
    }
}

Write-Host "`nScanned $scannedCount files." -ForegroundColor Gray
if ($issuesFound -eq 0) {
    Write-Host "PASS: All UI components meet baseline visual aesthetic criteria!" -ForegroundColor Green
} else {
    Write-Host "NOTICE: Found $issuesFound potential visual polish opportunities." -ForegroundColor Cyan
}

exit 0
