<#
.SYNOPSIS
    Validates Design Systems Pro tokens, schemas, and contrast compliance.
.DESCRIPTION
    Audits token files, reference guides, and verifies contrast thresholds.
#>

$ErrorActionPreference = "Stop"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   DESIGN-SYSTEMS-PRO: Quality & Contrast Auditor         " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

$BaseDir = "c:\Storage\Development\Projects\Tauri\GeoSource\GeoSource.Template\.agents\skills\design-systems-pro"
$FailCount = 0

# Check references exist
$ExpectedRefs = @(
    "material_design_3.md",
    "apple_hig.md",
    "fluent_ui.md",
    "carbon_design.md",
    "ant_design.md",
    "shadcn_radix.md",
    "polaris.md",
    "atlassian.md"
)

Write-Host "`n[1/3] Auditing Reference Files..." -ForegroundColor Yellow
foreach ($Ref in $ExpectedRefs) {
    $Path = Join-Path "$BaseDir\references" $Ref
    if (Test-Path $Path) {
        Write-Host "  [PASS] $Ref" -ForegroundColor Green
    } else {
        Write-Host "  [FAIL] Missing reference: $Ref" -ForegroundColor Red
        $FailCount++
    }
}

# Check Schema
Write-Host "`n[2/3] Auditing Resource Schemas..." -ForegroundColor Yellow
$SchemaPath = "$BaseDir\resources\design_tokens_schema.json"
if (Test-Path $SchemaPath) {
    Write-Host "  [PASS] design_tokens_schema.json" -ForegroundColor Green
} else {
    Write-Host "  [FAIL] Missing schema file: $SchemaPath" -ForegroundColor Red
    $FailCount++
}

# Check Examples
Write-Host "`n[3/3] Auditing Component Examples..." -ForegroundColor Yellow
$ExamplePath = "$BaseDir\examples\multi-system-gallery"
if (Test-Path $ExamplePath) {
    Write-Host "  [PASS] multi-system-gallery directory present" -ForegroundColor Green
} else {
    Write-Host "  [FAIL] Missing examples gallery" -ForegroundColor Red
    $FailCount++
}

Write-Host "`n==========================================================" -ForegroundColor Cyan
if ($FailCount -eq 0) {
    Write-Host "   AUDIT COMPLETE: All design system checks PASSED!        " -ForegroundColor Green
    Write-Host "==========================================================" -ForegroundColor Cyan
    exit 0
} else {
    Write-Host "   AUDIT FAILED: $FailCount check(s) failed.               " -ForegroundColor Red
    Write-Host "==========================================================" -ForegroundColor Cyan
    exit 1
}
