# Design Systems Pro Skill

`design-systems-pro` is a professional workspace skill for the Antigravity IDE and GeoSource Tauri/Rust application. It empowers Gemini to generate pixel-perfect UI components and design token specifications matching any major industry design system.

---

## 🌟 Supported Design Systems

1. **Material Design 3 (M3)** — Google Android & Web standard (Dynamic color HCT, pill components, tonal elevation).
2. **Apple Human Interface Guidelines (HIG)** — iOS / macOS / visionOS style (Vibrant glassmorphism, SF Pro typography, dynamic blur filters).
3. **Microsoft Fluent UI 2** — Windows 11 & Office style (Mica & Acrylic surfaces, subtle shadows, 4px grid).
4. **IBM Carbon Design System** — Enterprise & Cloud standard (2px high-density grid, cold crisp neutrals, structured layouts).
5. **Ant Design 5.0** — Data-dense enterprise web applications (Algorithmic color systems, compact tables/forms).
6. **Shopify Polaris** — E-commerce & SaaS dashboard design (Merchant-first layout, warm accessible green `#008060`).
7. **Atlassian Design System** — Developer tooling & Jira/Confluence style (Bold primary blue `#0747A6`, issue cards, rounded badges).
8. **Shadcn UI / Radix Primitives** — Modern minimalist web design (CSS variables, unstyled accessible primitives, dark mode defaults).

---

## 📁 Directory Structure

```
.agents/skills/design-systems-pro/
├── SKILL.md                          <- Primary agent instructions & triggers
├── README.md                         <- Human-readable overview & usage guide
├── scripts/
│   ├── generate_system_tokens.ps1    <- Compiles design system JSON to CSS/Tailwind tokens
│   └── validate_design_system.ps1    <- Validates token completeness & WCAG AA contrast
├── examples/
│   ├── README.md                     <- Instructions for testing design system examples
│   ├── minimal-tokens/               <- Basic CSS variables & token JSON
│   └── multi-system-gallery/         <- Cards implemented in Material 3, Apple HIG, Fluent, Shadcn
├── resources/
│   ├── design_tokens_schema.json     <- Master JSON Schema for W3C-compliant design tokens
│   └── design_system_template.md     <- Markdown template for generating design system specs
├── references/
│   ├── material_design_3.md          <- Complete M3 design specifications
│   ├── apple_hig.md                  <- Complete Apple HIG specifications
│   ├── fluent_ui.md                  <- Complete Microsoft Fluent UI 2 specifications
│   ├── carbon_design.md              <- Complete IBM Carbon specifications
│   ├── ant_design.md                 <- Complete Ant Design 5.0 specifications
│   ├── shadcn_radix.md               <- Complete Shadcn UI / Radix specifications
│   ├── polaris.md                    <- Complete Shopify Polaris specifications
│   └── atlassian.md                  <- Complete Atlassian Design System specifications
└── tests/
    ├── test_validation.ps1           <- Automated verification script for design-systems-pro
    └── expected_outputs/
        └── test_tokens_snapshot.json <- Test snapshot artifact
```

---

## 🚀 Quick Start / How to Trigger

Trigger this skill in your conversation with Gemini using any of these trigger phrases:
- `"use Material Design"`
- `"apply Apple HIG design"`
- `"use Fluent UI"`
- `"apply IBM Carbon design"`
- `"use Ant Design system"`
- `"apply Shopify Polaris style"`
- `"use Shadcn UI design system"`
- `"design-systems-pro"`

---

## ⚡ Automation Scripts

Run the PowerShell helper scripts directly from the workspace root:

```powershell
# Compile system tokens into CSS variables
powershell -ExecutionPolicy Bypass -File .agents/skills/design-systems-pro/scripts/generate_system_tokens.ps1 -System "material3"

# Audit design system tokens and contrast ratios
powershell -ExecutionPolicy Bypass -File .agents/skills/design-systems-pro/scripts/validate_design_system.ps1
```

---

## 🧪 Testing & Validation

Run the automated validation suite:
```powershell
powershell -ExecutionPolicy Bypass -File .agents/skills/design-systems-pro/tests/test_validation.ps1
```
