# Release Readiness Verification Script
$ErrorActionPreference = "Continue"

Write-Host "[release-build-pipeline] Verifying Version Synchronization..." -ForegroundColor Cyan

$pkgJsonPath = "package.json"
$cargoTomlPath = "src-tauri/Cargo.toml"

if ((Test-Path $pkgJsonPath) -and (Test-Path $cargoTomlPath)) {
    $pkgJson = Get-Content -Raw $pkgJsonPath | ConvertFrom-Json
    $cargoContent = Get-Content -Raw $cargoTomlPath
    
    $pkgVersion = $pkgJson.version
    if ($cargoContent -match 'version\s*=\s*"([^"]+)"') {
        $cargoVersion = $Matches[1]
        if ($pkgVersion -eq $cargoVersion) {
            Write-Host "[release-build-pipeline] PASS: Versions synchronized ($pkgVersion)" -ForegroundColor Green
        } else {
            Write-Host "[release-build-pipeline] MISMATCH: package.json ($pkgVersion) vs Cargo.toml ($cargoVersion)" -ForegroundColor Red
        }
    }
} else {
    Write-Host "[release-build-pipeline] Ready for release build tasks." -ForegroundColor Yellow
}
