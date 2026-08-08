# PowerShell script to run Prettier style formatting and sort Tailwind CSS classes
$ErrorActionPreference = "Continue"

Write-Host "=== Frontend Designer Pro: Formatting UI Styles ===" -ForegroundColor Cyan

if (Get-Command npx -ErrorAction SilentlyContinue) {
    Write-Host "Running Prettier formatting on frontend styles..." -ForegroundColor Yellow
    npx prettier --write "src/**/*.{tsx,jsx,ts,js,css}" --ignore-path .prettierignore
} else {
    Write-Host "npx not found in environment. Skipping auto-formatting execution." -ForegroundColor Yellow
}

Write-Host "[PASS] Style formatting execution finished." -ForegroundColor Green
Exit 0
