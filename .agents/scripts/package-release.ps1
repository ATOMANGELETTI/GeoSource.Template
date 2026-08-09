# PowerShell script: package-release.ps1
# Automated release packaging pipeline for GeoSource Tauri applications
# Builds production binaries, gathers native installers, creates portable ZIP releases, computes SHA256 checksums, and outputs release manifests.

param (
    [string]$Version,
    [switch]$Clean,
    [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "       GeoSource Automated Release Packaging Pipeline       " -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan

$rootDir = Get-Location
$releaseDir = Join-Path $rootDir "release"
$targetReleaseDir = Join-Path $rootDir "src-tauri/target/release"
$bundleDir = Join-Path $targetReleaseDir "bundle"

# 1. Determine Version
if (-not $Version) {
    if (Test-Path "package.json") {
        $pkgJson = Get-Content "package.json" -Raw | ConvertFrom-Json
        $Version = $pkgJson.version
    } else {
        $Version = "0.1.0"
    }
}

Write-Host "`n[1/6] Synchronizing Version Strings -> v$Version..." -ForegroundColor Yellow
$syncScript = Join-Path $rootDir ".agents/scripts/sync-version.ps1"
if (Test-Path $syncScript) {
    & $syncScript -Version $Version
} else {
    Write-Host "  [WARN] sync-version.ps1 script not found. Proceeding with current manifests." -ForegroundColor Yellow
}

# 2. Setup Release Directory
Write-Host "`n[2/6] Setting up Release Directory: $releaseDir..." -ForegroundColor Yellow
if ($Clean -and (Test-Path $releaseDir)) {
    Write-Host "  [CLEAN] Removing previous release artifacts..." -ForegroundColor Magenta
    Get-ChildItem -Path $releaseDir -Recurse | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue
}

if (-not (Test-Path $releaseDir)) {
    New-Item -ItemType Directory -Path $releaseDir -Force | Out-Null
}

# 3. Execute Production Build
if (-not $SkipBuild) {
    Write-Host "`n[3/6] Executing Production Build (npm run tauri:build)..." -ForegroundColor Yellow
    Write-Host "  Building Next.js static frontend & compiling optimized Rust release binary..." -ForegroundColor Gray

    # Set environment variable to ensure production mode
    $env:NODE_ENV = "production"

    # Execute build via npm/npx
    & npm run tauri:build
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Production build failed with exit code $LASTEXITCODE"
        exit $LASTEXITCODE
    }
    Write-Host "  [OK] Production compilation completed successfully." -ForegroundColor Green
} else {
    Write-Host "`n[3/6] Skipping build step (-SkipBuild specified)..." -ForegroundColor Cyan
}

# 4. Collect Native Installer Artifacts
Write-Host "`n[4/6] Collecting Native Installers into $releaseDir..." -ForegroundColor Yellow

$collectedArtifacts = @()

if (Test-Path $bundleDir) {
    $bundleItems = Get-ChildItem -Path $bundleDir -Recurse -File | Where-Object {
        $_.Extension -in @(".msi", ".exe", ".deb", ".AppImage", ".rpm", ".dmg", ".pkg") -and $_.Name -notlike "*portable*"
    }

    foreach ($item in $bundleItems) {
        $destPath = Join-Path $releaseDir $item.Name
        Copy-Item -Path $item.FullName -Destination $destPath -Force
        Write-Host "  [COLLECTED] Native Installer: $($item.Name)" -ForegroundColor Green
        
        $collectedArtifacts += [PSCustomObject]@{
            Name     = $item.Name
            Type     = "Installer ($($item.Extension.TrimStart('.')))"
            Path     = $destPath
            SizeBytes= (Get-Item $destPath).Length
        }
    }
} else {
    Write-Host "  [NOTICE] No target bundle directory found at $bundleDir" -ForegroundColor Yellow
}

# 5. Create Standalone Portable Release Archives
Write-Host "`n[5/6] Generating Portable Releases for Compatible Systems..." -ForegroundColor Yellow

# Windows Portable ZIP
$winExePath = Join-Path $targetReleaseDir "geosource-template.exe"
if (Test-Path $winExePath) {
    $zipName = "geosource-template-v${Version}-windows-x64-portable.zip"
    $zipPath = Join-Path $releaseDir $zipName
    $stagingDir = Join-Path $rootDir "src-tauri/target/portable-staging-win"

    if (Test-Path $stagingDir) { Remove-Item $stagingDir -Recurse -Force }
    New-Item -ItemType Directory -Path $stagingDir -Force | Out-Null

    # Copy binary and associated release DLLs (e.g. WebView2Loader.dll)
    Copy-Item -Path $winExePath -Destination (Join-Path $stagingDir "geosource-template.exe") -Force
    Get-ChildItem -Path $targetReleaseDir -File -Filter "*.dll" | ForEach-Object {
        Copy-Item -Path $_.FullName -Destination (Join-Path $stagingDir $_.Name) -Force
        Write-Host "  [PORTABLE INCLUDED] DLL: $($_.Name)" -ForegroundColor Gray
    }

    # Copy configurations
    $configSrc = Join-Path $rootDir "other/configs"
    if (Test-Path $configSrc) {
        Copy-Item -Path $configSrc -Destination (Join-Path $stagingDir "configs") -Recurse -Force
    }

    # Copy root documentation & license
    if (Test-Path (Join-Path $rootDir "README.md")) {
        Copy-Item -Path (Join-Path $rootDir "README.md") -Destination (Join-Path $stagingDir "README.md") -Force
    }

    # Generate PORTABLE_NOTES.txt
    $portableNotes = @"
GeoSource Template - Portable Desktop Release
==============================================
Version: $Version
Platform: Windows (x64)
Built At: $((Get-Date).ToUniversalTime().ToString("yyyy-MM-dd HH:mm:ss 'UTC'"))

Instructions:
1. Extract all contents of this ZIP archive into any folder.
2. Launch 'geosource-template.exe' directly (no installation required).
3. Configuration files and settings are located in the 'configs/' directory.
"@
    Set-Content -Path (Join-Path $stagingDir "PORTABLE_NOTES.txt") -Value $portableNotes

    # Create Zip archive
    if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
    Compress-Archive -Path "$stagingDir\*" -DestinationPath $zipPath -CompressionLevel Optimal
    Remove-Item $stagingDir -Recurse -Force

    Write-Host "  [CREATED] Windows Portable Release: $zipName" -ForegroundColor Green
    $collectedArtifacts += [PSCustomObject]@{
        Name     = $zipName
        Type     = "Portable ZIP (Windows x64)"
        Path     = $zipPath
        SizeBytes= (Get-Item $zipPath).Length
    }
}

# 6. Generate Checksums & Release Manifest
Write-Host "`n[6/6] Generating SHA256 Checksums & Release Manifest..." -ForegroundColor Yellow

$checksumFile = Join-Path $releaseDir "SHA256SUMS.txt"
$manifestFile = Join-Path $releaseDir "release-manifest.json"

$checksumLines = @()
$manifestArtifacts = @()

foreach ($artifact in $collectedArtifacts) {
    $hash = (Get-FileHash -Path $artifact.Path -Algorithm SHA256).Hash.ToLower()
    $checksumLines += "$hash  $($artifact.Name)"

    $manifestArtifacts += [PSCustomObject]@{
        name       = $artifact.Name
        type       = $artifact.Type
        sizeBytes  = $artifact.SizeBytes
        sha256     = $hash
    }
}

Set-Content -Path $checksumFile -Value ($checksumLines -join "`n") -Encoding UTF8
Write-Host "  [OK] Generated Checksums file: SHA256SUMS.txt" -ForegroundColor Green

$manifestData = [PSCustomObject]@{
    product     = "GeoSource Template"
    version     = $Version
    builtAt     = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
    artifacts   = $manifestArtifacts
}

$manifestData | ConvertTo-Json -Depth 10 | Set-Content -Path $manifestFile -Encoding UTF8
Write-Host "  [OK] Generated Release Manifest: release-manifest.json" -ForegroundColor Green

# Print Visual Summary
Write-Host "`n============================================================" -ForegroundColor Cyan
Write-Host "             Release Packages Generated Successfully!       " -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Cyan

foreach ($art in $collectedArtifacts) {
    $sizeMB = [math]::Round($art.SizeBytes / 1MB, 2)
    Write-Host ("  - {0,-45} [{1,8} MB] ({2})" -f $art.Name, $sizeMB, $art.Type) -ForegroundColor White
}

Write-Host "`nAll release artifacts saved in: $releaseDir" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
