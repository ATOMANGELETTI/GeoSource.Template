# PowerShell script to analyze GeoSource workspace architecture, layout, lines of code, and structure smells.
[CmdletBinding()]
param(
    [string]$WorkspacePath = "."
)

$ErrorActionPreference = "Stop"

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host " Professional Refactor: Architectural Scanner" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

$absPath = (Resolve-Path $WorkspacePath).Path
Write-Host "[+] Workspace Target: $absPath" -ForegroundColor Green

# 1. Project Layout Scan
Write-Host "`n[1] Checking Directory Layout & Key Modules..." -ForegroundColor Yellow
$keyFiles = @(
    "Cargo.toml",
    "package.json",
    "tauri.conf.json",
    "src-tauri/Cargo.toml",
    "src-tauri/src/main.rs",
    "src-tauri/src/lib.rs",
    "src/App.svelte",
    "src/main.ts"
)

foreach ($file in $keyFiles) {
    $fullPath = Join-Path $absPath $file
    if (Test-Path $fullPath) {
        Write-Host "  [OK] Found $file" -ForegroundColor Green
    } else {
        Write-Host "  [MISSING] $file not found" -ForegroundColor DarkYellow
    }
}

# 2. File Metrics
Write-Host "`n[2] Code Metrics Summary..." -ForegroundColor Yellow
$rustFiles = Get-ChildItem -Path (Join-Path $absPath "src-tauri") -Recurse -Include *.rs -ErrorAction SilentlyContinue
$tsFiles = Get-ChildItem -Path (Join-Path $absPath "src") -Recurse -Include *.ts,*.js,*.svelte -ErrorAction SilentlyContinue

$rustCount = if ($rustFiles) { $rustFiles.Count } else { 0 }
$tsCount = if ($tsFiles) { $tsFiles.Count } else { 0 }

Write-Host "  Rust source files: $rustCount" -ForegroundColor Green
Write-Host "  Frontend source files: $tsCount" -ForegroundColor Green

# 3. Detect Potential Architectural Smells
Write-Host "`n[3] Architectural Smell Pre-Check..." -ForegroundColor Yellow
$smellsFound = 0

if ($rustFiles) {
    foreach ($file in $rustFiles) {
        $content = Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue
        if ($content -match "unwrap\(\)") {
            Write-Host "  [WARN] Potential unwrap() found in: $($file.Name)" -ForegroundColor Yellow
            $smellsFound++
        }
        if ($content -match "panic!\(") {
            Write-Host "  [WARN] Potential panic!() found in: $($file.Name)" -ForegroundColor Yellow
            $smellsFound++
        }
        if ($content -match "unsafe\s*\{") {
            Write-Host "  [WARN] Unsafe block found in: $($file.Name)" -ForegroundColor Yellow
            $smellsFound++
        }
    }
}

if ($smellsFound -eq 0) {
    Write-Host "  [OK] No immediate critical smells (unwrap, panic, raw unsafe) flagged." -ForegroundColor Green
}

Write-Host "`n[+] Architecture Scan Complete." -ForegroundColor Cyan
