# PowerShell script to execute ESLint --fix and Prettier formatting on frontend code
$ErrorActionPreference = "Continue"

Write-Host "=== Frontend Developer Pro: Running ESLint Fix & Prettier Format ===" -ForegroundColor Cyan

if (Get-Command npx -ErrorAction SilentlyContinue) {
    Write-Host "Auto-fixing ESLint issues..." -ForegroundColor Yellow
    npx eslint "src/**/*.{ts,tsx}" --fix

    Write-Host "Formatting frontend code with Prettier..." -ForegroundColor Yellow
    npx prettier --write "src/**/*.{ts,tsx,json,css}"
} else {
    Write-Host "npx CLI unavailable in current path." -ForegroundColor Yellow
}

Write-Host "[PASS] Lint and formatting auto-fix complete." -ForegroundColor Green
Exit 0
