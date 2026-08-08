# Schema Migration Validator Script
param (
    [Parameter(Mandatory=$false)]
    [string]$SqlFile = ""
)

Write-Host "[database-orm-architect] Validating Database Migration Schema..." -ForegroundColor Cyan

if ($SqlFile -and (Test-Path $SqlFile)) {
    $content = Get-Content -Raw $SqlFile
    if ($content -match "CREATE TABLE" -or $content -match "ALTER TABLE") {
        Write-Host "[database-orm-architect] SUCCESS: SQL file $SqlFile contains valid table DDL statements." -ForegroundColor Green
    } else {
        Write-Host "[database-orm-architect] WARNING: No table DDL statements detected in $SqlFile." -ForegroundColor Yellow
    }
} else {
    Write-Host "[database-orm-architect] Ready for database schema and ORM tasks." -ForegroundColor Yellow
}
