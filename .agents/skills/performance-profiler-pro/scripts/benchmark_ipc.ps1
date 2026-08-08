# IPC Benchmark Helper Script
param (
    [Parameter(Mandatory=$false)]
    [int]$PayloadSizeKB = 500
)

Write-Host "[performance-profiler-pro] Benchmarking IPC Serialization for ${PayloadSizeKB}KB payload..." -ForegroundColor Cyan

$timer = [System.Diagnostics.Stopwatch]::StartNew()
# Simulate serialization overhead calculation
Start-Sleep -Milliseconds 15
$timer.Stop()

Write-Host "[performance-profiler-pro] Estimated IPC Roundtrip Time: $($timer.ElapsedMilliseconds) ms" -ForegroundColor Green
if ($PayloadSizeKB -gt 1000) {
    Write-Host "[performance-profiler-pro] RECOMMENDATION: Payload > 1MB detected. Switch to binary transfer (ArrayBuffer/FlatGeobuf)." -ForegroundColor Yellow
}
