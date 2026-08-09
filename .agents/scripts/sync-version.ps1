# PowerShell script: sync-version.ps1
# Synchronizes version across Cargo.toml, package.json, and tauri.conf.json / tauri.config.json

param (
    [Parameter(Mandatory=$true)]
    [string]$Version
)

$ErrorActionPreference = "Stop"

$utf8NoBom = [System.Text.UTF8Encoding]::new($false)

Write-Host "=== GeoSource Version Synchronization Utility ===" -ForegroundColor Cyan
Write-Host "Target Version: $Version`n" -ForegroundColor Yellow

function Set-TextNoBom {
    param (
        [string]$Path,
        [string]$Content
    )
    $fullPath = (Get-Item $Path).FullName
    [System.IO.File]::WriteAllText($fullPath, $Content, $script:utf8NoBom)
}

# 1. Update Cargo.toml
if (Test-Path "src-tauri/Cargo.toml") {
    $cargoPath = "src-tauri/Cargo.toml"
    $cargoContent = [System.IO.File]::ReadAllText((Get-Item $cargoPath).FullName)
    $cargoContent = $cargoContent -replace '(?m)^version\s*=\s*"[^"]+"', "version = `"$Version`""
    Set-TextNoBom -Path $cargoPath -Content $cargoContent
    Write-Host "  [OK] Updated $cargoPath -> $Version" -ForegroundColor Green
}

# 2. Update package.json
if (Test-Path "package.json") {
    $pkgPath = "package.json"
    $pkgContent = [System.IO.File]::ReadAllText((Get-Item $pkgPath).FullName)
    if ($pkgContent -and $pkgContent.Trim() -ne "") {
        $pkgContent = $pkgContent -replace '"version"\s*:\s*"[^"]+"', "`"version`": `"$Version`""
        Set-TextNoBom -Path $pkgPath -Content $pkgContent
        Write-Host "  [OK] Updated $pkgPath -> $Version" -ForegroundColor Green
    }
}

# 3. Update tauri config (tauri.conf.json or tauri.config.json)
$tauriPaths = @("src-tauri/tauri.conf.json", "src-tauri/tauri.config.json")
foreach ($tauriPath in $tauriPaths) {
    if (Test-Path $tauriPath) {
        $tauriContent = [System.IO.File]::ReadAllText((Get-Item $tauriPath).FullName)
        if ($tauriContent -and $tauriContent.Trim() -ne "") {
            $tauriContent = $tauriContent -replace '"version"\s*:\s*"[^"]+"', "`"version`": `"$Version`""
            Set-TextNoBom -Path $tauriPath -Content $tauriContent
            Write-Host "  [OK] Updated $tauriPath -> $Version" -ForegroundColor Green
        }
    }
}

Write-Host "`n==========================================" -ForegroundColor Cyan
Write-Host "[OK] Version Synchronization Successful!" -ForegroundColor Green
