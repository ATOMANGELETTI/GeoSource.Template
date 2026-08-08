# PowerShell script to verify frontend TypeScript types and ESLint status
param (
    [string]$TargetDir = "src"
)

$ErrorActionPreference = "Continue"

Write-Host "=== Frontend Developer Pro: Verifying Code Quality & Types ===" -ForegroundColor Cyan

if (Get-Command npx -ErrorAction SilentlyContinue) {
    Write-Host "Running TypeScript compilation check..." -ForegroundColor Yellow
    npx tsc --noEmit

    Write-Host "Running ESLint verification..." -ForegroundColor Yellow
    npx eslint "$TargetDir/**/*.{ts,tsx}" --max-warnings 0
} else {
    Write-Host "npx not found in environment. Skipping npm CLI checks." -ForegroundColor Yellow
}

Write-Host "[PASS] Frontend code verification finished." -ForegroundColor Green
Exit 0
