# Tauri v2 Capability Audit Script
param (
    [Parameter(Mandatory=$false)]
    [string]$CapabilityDir = "src-tauri/capabilities"
)

Write-Host "[sec-audit-hardener] Auditing Tauri Capabilities..." -ForegroundColor Cyan

if (Test-Path $CapabilityDir) {
    $files = Get-ChildItem -Path $CapabilityDir -Filter "*.json"
    Write-Host "[sec-audit-hardener] Found $($files.Count) capability configuration file(s)." -ForegroundColor Green
    foreach ($f in $files) {
        $json = Get-Content -Raw $f.FullName | ConvertFrom-Json
        if ($json.permissions -contains "core:default") {
            Write-Host "[sec-audit-hardener] WARNING: $($f.Name) uses default wildcard permission core:default." -ForegroundColor Yellow
        } else {
            Write-Host "[sec-audit-hardener] PASS: $($f.Name) uses restricted permissions." -ForegroundColor Green
        }
    }
} else {
    Write-Host "[sec-audit-hardener] Ready for security audit tasks." -ForegroundColor Yellow
}
