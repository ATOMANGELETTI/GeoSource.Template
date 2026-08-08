# PowerShell script: sync-version.ps1
# Synchronizes version across Cargo.toml, package.json, and tauri.config.json

param (
    [Parameter(Mandatory=$true)]
    [string]$Version
)

$ErrorActionPreference = "Stop"

Write-Host "=== GeoSource Version Synchronization Utility ===" -ForegroundColor Cyan
Write-Host "Target Version: $Version`n" -ForegroundColor Yellow

# 1. Update Cargo.toml
if (Test-Path "src-tauri/Cargo.toml") {
    $cargoPath = "src-tauri/Cargo.toml"
    $cargoContent = Get-Content $cargoPath -Raw
    $cargoContent = $cargoContent -replace '(?m)^version\s*=\s*"[^"]+"', "version = `"$Version`""
    Set-Content -Path $cargoPath -Value $cargoContent -NoNewline
    Write-Host "  [OK] Updated $cargoPath -> $Version" -ForegroundColor Green
}

# 2. Update package.json
if (Test-Path "package.json") {
    $pkgPath = "package.json"
    $pkgContent = Get-Content $pkgPath -Raw
    if ($pkgContent -and $pkgContent.Trim() -ne "") {
        $json = ConvertFrom-Json $pkgContent
        $json.version = $Version
        $json | ConvertTo-Json -Depth 10 | Set-Content -Path $pkgPath
        Write-Host "  [OK] Updated $pkgPath -> $Version" -ForegroundColor Green
    }
}

# 3. Update tauri config (tauri.conf.json or tauri.config.json)
$tauriPaths = @("src-tauri/tauri.conf.json", "src-tauri/tauri.config.json")
foreach ($tauriPath in $tauriPaths) {
    if (Test-Path $tauriPath) {
        $tauriContent = Get-Content $tauriPath -Raw
        if ($tauriContent -and $tauriContent.Trim() -ne "") {
            $json = ConvertFrom-Json $tauriContent
            $json.version = $Version
            $json | ConvertTo-Json -Depth 10 | Set-Content -Path $tauriPath
            Write-Host "  [OK] Updated $tauriPath -> $Version" -ForegroundColor Green
        }
    }
}

Write-Host "`n==========================================" -ForegroundColor Cyan
Write-Host "[OK] Version Synchronization Successful!" -ForegroundColor Green
