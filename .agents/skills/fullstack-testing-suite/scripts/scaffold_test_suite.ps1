<#
.SYNOPSIS
    Scaffolds unit and integration test stubs for Rust or TypeScript components.
.DESCRIPTION
    Generates boilerplate test files adhering to GeoSource testing standards.
#>

param (
    [Parameter(Mandatory = $true)]
    [string]$TestName,

    [ValidateSet("Rust", "Frontend", "Both")]
    [string]$Type = "Both"
)

$WorkspaceRoot = Resolve-Path "$PSScriptRoot\..\..\..\.."
$ResourcesDir = "$PSScriptRoot\..\resources"

Write-Host "Scaffolding test suite for '$TestName' (Type: $Type)..." -ForegroundColor Cyan

if ($Type -eq "Rust" -or $Type -eq "Both") {
    $RustTargetDir = Join-Path $WorkspaceRoot "src-tauri\src\tests"
    if (-not (Test-Path $RustTargetDir)) {
        New-Item -ItemType Directory -Path $RustTargetDir -Force | Out-Null
    }
    $RustFile = Join-Path $RustTargetDir "$($TestName.ToLower())_test.rs"
    $TemplatePath = Join-Path $ResourcesDir "cargo_test_template.rs"
    
    if (Test-Path $TemplatePath) {
        $content = Get-Content $TemplatePath -Raw
        $content = $content.Replace("{{TEST_NAME}}", $TestName)
        Set-Content -Path $RustFile -Value $content -Encoding UTF8
        Write-Host "+ Scaffolded Rust test: $RustFile" -ForegroundColor Green
    } else {
        Write-Host "x Template not found: $TemplatePath" -ForegroundColor Red
    }
}

if ($Type -eq "Frontend" -or $Type -eq "Both") {
    $FrontendTargetDir = Join-Path $WorkspaceRoot "src\tests"
    if (-not (Test-Path $FrontendTargetDir)) {
        New-Item -ItemType Directory -Path $FrontendTargetDir -Force | Out-Null
    }
    $FrontendFile = Join-Path $FrontendTargetDir "$($TestName.ToLower()).test.ts"
    $TemplatePath = Join-Path $ResourcesDir "vitest_template.test.ts"

    if (Test-Path $TemplatePath) {
        $content = Get-Content $TemplatePath -Raw
        $content = $content.Replace("{{TEST_NAME}}", $TestName)
        Set-Content -Path $FrontendFile -Value $content -Encoding UTF8
        Write-Host "+ Scaffolded Vitest test: $FrontendFile" -ForegroundColor Green
    } else {
        Write-Host "x Template not found: $TemplatePath" -ForegroundColor Red
    }
}

Write-Host "Test scaffolding complete." -ForegroundColor Cyan
