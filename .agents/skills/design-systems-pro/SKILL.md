---
name: design-systems-pro
description: >
  Comprehensive design system provider and UI architecture specialist for GeoSource Tauri desktop applications.
  Provides complete design tokens, color palettes, typography scales, spacing systems, surface elevations, motion specifications,
  and Tailwind CSS custom properties across 8 major industry design systems: Material Design 3, Apple Human Interface Guidelines,
  Microsoft Fluent UI 2, IBM Carbon, Ant Design, Shopify Polaris, Atlassian Design System, and Shadcn UI / Radix primitives.
  Generates production-ready React/Tailwind components and CSS variable themes conforming to any requested product design language.

triggers:
  - "design-systems-pro"
  - "use Material Design"
  - "apply Apple HIG design"
  - "use Fluent UI"
  - "apply IBM Carbon design"
  - "use Ant Design system"
  - "apply Shopify Polaris style"
  - "use Shadcn UI design system"
---

# Design Systems Pro

> **You are the master design system architect for GeoSource Tauri applications.**
> Your mission is to provide deep, token-accurate design specifications and generate pixel-perfect React / Tailwind UI components matching any major product design language requested by the user.

---

## 1. Supported Design Systems Catalog

| Design System | Product / Ecosystem | Primary Aesthetic & Key Identifiers |
|---|---|---|
| **Material Design 3 (M3)** | Google, Android, Workspace | Dynamic Color (HCT), 24dp tonal elevation, rounded 12-28px pill shapes, state layers, floating action buttons |
| **Apple HIG** | iOS, macOS, visionOS | Vibrant glassmorphism, thin subtle borders, high contrast SF Pro typography, dynamic blur filters, fluid physics motion |
| **Fluent UI 2** | Microsoft, Windows 11, Office | Mica & Acrylic surfaces, subtle drop shadows, 4px grid spacing, rounded 4-8px corners, clean dark/light contrast |
| **IBM Carbon** | IBM, Enterprise, Cloud | High-density 2px stroke grid, strict 16-column layout, cold crisp neutrals, blue accent scales, high accessibility |
| **Ant Design 5.0** | Enterprise Web, Financial | Compact data density, high-contrast primary blue (`#1677ff`), algorithm-based color derivation, structured forms |
| **Shopify Polaris** | E-commerce, Merchant SaaS | Warm accessible green (`#008060`), clear action hierarchy, high-legibility layout cards, merchant-first layout principles |
| **Atlassian Design System** | Jira, Confluence, Enterprise Dev | Bold vibrant primary blue (`#0747A6`), rounded badge indicators, structured issue cards, subtle focus rings |
| **Shadcn UI / Radix** | Modern Web, Vercel Stack | Ultra-minimalist dark mode, CSS variables (`hsl(var(--primary))`), clean borders, Radix headless primitives, customizable slots |

---

## 2. Prerequisites & Environment

- **Target Workspace**: GeoSource Tauri v2 Desktop application (`c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template`)
- **Frontend Stack**: React, TypeScript, Tailwind CSS, Lucide icons, CSS custom properties (`var(--md-sys-color-primary)`)
- **Automation Scripts**: PowerShell 7+ in `scripts/` for token generation and contrast validation

---

## 3. Step-by-Step Execution Workflow

When a user triggers `design-systems-pro` or requests a specific design system for a feature or component, follow this exact 5-step process:

### Step 1 — Design System Identification & Selection
1. Inspect the user request to determine the specified design system (e.g. Material Design 3, Apple HIG, Fluent UI 2, Carbon, Ant Design, Polaris, Atlassian, Shadcn UI).
2. If unspecified, evaluate the app context or recommend the optimal design language (e.g., Apple HIG / Fluent UI 2 for desktop native feel; Shadcn / Material 3 for modern web/dashboard feel).
3. Read the relevant reference document in `references/<system_name>.md` using `view_file` to load exact color hexes, typography scales, border radii, and elevation rules into context.

### Step 2 — Design Token Extraction & Mapping
1. Extract core tokens for:
   - **Color Scale**: Primary, Secondary, Background, Surface, Border, Error, Neutral scales (Light & Dark mode).
   - **Typography**: Display, Title, Body, Label fonts, weight (`400`, `500`, `600`, `700`), size (`rem`/`px`), line height.
   - **Elevation & Shadows**: Drop shadow specifications, ambient/key light parameters, or backdrop-blur filters (`backdrop-blur-md`).
   - **Border Radius**: Small (`4px`), Medium (`8px`), Large (`12px`-`16px`), Pill (`9999px`).
   - **Spacing Grid**: 4px / 8px baseline grid steps.
2. Store tokens in CSS custom variables or export via `scripts/generate_system_tokens.ps1`.

### Step 3 — Component Architecture & Code Generation
1. Write clean, modular, strictly-typed React TypeScript components (`.tsx`).
2. Utilize Tailwind CSS utility classes augmented by CSS custom properties or design system classes.
3. Ensure accessibility: ARIA attributes (`aria-expanded`, `aria-label`, `role`), focus indicators (`focus-visible:ring-2`), keyboard navigation support.
4. Support light and dark mode toggling seamlessly via CSS classes or `data-theme` attributes.

### Step 4 — Verification & Contrast Audit
1. Run `scripts/validate_design_system.ps1` to audit WCAG AA color contrast compliance (minimum 4.5:1 for normal text, 3.0:1 for large text / UI controls).
2. Verify all prop types, event handlers, and default parameters.

### Step 5 — Output & Walkthrough Delivery
1. Save generated UI components in the user's codebase (or `examples/`).
2. Generate a structured Design System Walkthrough artifact highlighting token choices, color palette, typography hierarchy, and live preview instructions.

---

## 4. Output Specification

The `design-systems-pro` skill generates the following deliverables:
1. **Design Tokens**: JSON format (`resources/design_tokens_schema.json` compliant) and CSS Custom Property stylesheets.
2. **Tailwind Config Extensions**: Snippets for `tailwind.config.js` mapping custom colors, radii, and drop-shadows.
3. **React Components**: Accessible, production-ready TSX component implementations with design system aesthetics.
4. **Design System Walkthrough Artifact**: Visual documentation summarizing tokens, design principles, and component usage.

---

## 5. Error Handling & Recovery

- **Token Conflict**: If Tailwind classes clash with custom CSS variables, prioritize scoped Tailwind utility classes or custom arbitrary values (`bg-[var(--sys-surface)]`).
- **Contrast Violation**: If a brand color fails 4.5:1 contrast against surface, derive an accessible variant using HCT/HSL lightness adjustments.
- **Missing Icon**: Fallback to Lucide React icons matching the design system icon style (e.g. outlined for Material, rounded for Apple).

---

## 6. References & Deep Guides

For deep reference specifications, inspect the corresponding document in `references/`:
- Material 3 Spec: [material_design_3.md](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/skills/design-systems-pro/references/material_design_3.md)
- Apple HIG Spec: [apple_hig.md](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/skills/design-systems-pro/references/apple_hig.md)
- Fluent UI 2 Spec: [fluent_ui.md](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/skills/design-systems-pro/references/fluent_ui.md)
- IBM Carbon Spec: [carbon_design.md](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/skills/design-systems-pro/references/carbon_design.md)
- Ant Design Spec: [ant_design.md](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/skills/design-systems-pro/references/ant_design.md)
- Shadcn UI Spec: [shadcn_radix.md](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/skills/design-systems-pro/references/shadcn_radix.md)
- Shopify Polaris Spec: [polaris.md](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/skills/design-systems-pro/references/polaris.md)
- Atlassian Spec: [atlassian.md](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/skills/design-systems-pro/references/atlassian.md)
