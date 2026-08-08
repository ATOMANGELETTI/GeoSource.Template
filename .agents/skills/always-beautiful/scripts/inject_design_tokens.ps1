<#
.SYNOPSIS
    Injects standard aesthetic design tokens (glassmorphism variables, dynamic gradients, animation keyframes) into CSS stylesheets.
.PARAMETER CssPath
    Target CSS file path. Defaults to 'src/app.css'.
#>
[CmdletBinding()]
param(
    [string]$CssPath = "src/app.css"
)

Write-Host "=== Injecting Always-Beautiful Design Tokens ===" -ForegroundColor Cyan

$tokenBlock = @"

/* === ALWAYS-BEAUTIFUL DESIGN TOKENS === */
:root {
  /* Color Palette & Gradients */
  --bg-primary: #0b0f19;
  --bg-surface-glass: rgba(15, 23, 42, 0.75);
  --border-glass: rgba(255, 255, 255, 0.12);
  --accent-gradient: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%);
  --accent-glow: 0 0 20px rgba(99, 102, 241, 0.35);

  /* Elevation Shadows */
  --shadow-sm: 0 2px 8px -2px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 12px 32px -8px rgba(0, 0, 0, 0.6);

  /* Motion & Easing */
  --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
  --transition-fast: all 0.15s var(--ease-spring);
  --transition-normal: all 0.25s var(--ease-spring);
}

.glass-card {
  background: var(--bg-surface-glass);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border-glass);
  box-shadow: var(--shadow-lg);
  border-radius: 12px;
  transition: var(--transition-normal);
}

.glass-card:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.25);
  box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.7), var(--accent-glow);
}

.btn-primary-gradient {
  background: var(--accent-gradient);
  color: #ffffff;
  font-weight: 600;
  border-radius: 8px;
  padding: 0.6rem 1.2rem;
  border: none;
  cursor: pointer;
  transition: var(--transition-fast);
}

.btn-primary-gradient:hover {
  transform: translateY(-1px) scale(1.02);
  box-shadow: var(--accent-glow);
}

.btn-primary-gradient:active {
  transform: translateY(0) scale(0.98);
}
/* === END ALWAYS-BEAUTIFUL DESIGN TOKENS === */
"@

if (Test-Path $CssPath) {
    $existing = Get-Content -Path $CssPath -Raw -ErrorAction SilentlyContinue
    if ($existing -notmatch 'ALWAYS-BEAUTIFUL DESIGN TOKENS') {
        Add-Content -Path $CssPath -Value "`n$tokenBlock"
        Write-Host "Successfully injected design tokens into $CssPath" -ForegroundColor Green
    } else {
        Write-Host "Design tokens already present in $CssPath" -ForegroundColor Yellow
    }
} else {
    Write-Host "CSS file at $CssPath does not exist. Creating new token stylesheet..." -ForegroundColor Yellow
    $parentDir = Split-Path $CssPath -Parent
    if (-not [string]::IsNullOrEmpty($parentDir) -and -not (Test-Path $parentDir)) {
        New-Item -ItemType Directory -Path $parentDir -Force | Out-Null
    }
    Set-Content -Path $CssPath -Value $tokenBlock
    Write-Host "Created token stylesheet at $CssPath" -ForegroundColor Green
}

exit 0
