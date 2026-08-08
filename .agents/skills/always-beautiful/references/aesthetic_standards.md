# GeoSource Aesthetic Standards & Design Token Specification

This document details the visual rules and aesthetic principles enforced by the `always-beautiful` skill.

---

## 1. Color Palette System

Never use un-themed primary browser colors (`#000`, `#fff`, `#f00`, `#00f`). All components must use calibrated color variables:

| Surface Layer | Dark Hex / Opacity | Purpose |
|---|---|---|
| **App Background** | `#0b0f19` | Deep dark slate background base |
| **Card Surface** | `rgba(15, 23, 42, 0.75)` | Semi-transparent frosted glass surface |
| **Glass Border** | `rgba(255, 255, 255, 0.12)` | Subtle specular light edge |
| **Hover Border** | `rgba(255, 255, 255, 0.25)` | Highlight border on user hover |
| **Primary Accent** | `linear-gradient(135deg, #6366f1, #a855f7)` | Indigo to violet vibrant accent |
| **Success Accent** | `linear-gradient(135deg, #10b981, #059669)` | Emerald green status gradient |
| **Warning Accent** | `linear-gradient(135deg, #f59e0b, #d97706)` | Amber warning status gradient |

---

## 2. Typography Rules

- **Font Hierarchy:** `Outfit`, `Inter`, or system UI stack (`system-ui, -apple-system, sans-serif`).
- **Heading Styles (`h1`, `h2`, `h3`):**
  - Font weight: `700` (Bold) or `800` (ExtraBold).
  - Letter spacing: `-0.02em` (Tighter tracking for header impact).
  - Optional title gradient: `background: linear-gradient(135deg, #fff 0%, #94a3b8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;`
- **Body Text:**
  - Font weight: `400` or `500`.
  - Line height: `1.6` for optimal readability.
  - Color: `#e2e8f0` (High contrast, non-harsh white).

---

## 3. Glassmorphism & Depth Elevation

All cards and modal popups must implement layered glass depth:
1. `backdrop-filter: blur(16px)` to soften background contents.
2. `border: 1px solid rgba(255, 255, 255, 0.12)` to establish physical boundary.
3. Dual-layer box shadow: Ambient soft blur + directional drop shadow (`0 20px 40px -15px rgba(0, 0, 0, 0.5)`).

---

## 4. Accessibility & Contrast

- All body text must maintain at least a **4.5:1** contrast ratio against its background.
- Interactive elements must include high-visibility focus states (`outline: 2px solid #6366f1; outline-offset: 2px`).
