---
name: always-beautiful
description: >
  State-of-the-art UI/UX visual design and aesthetic polish skill for GeoSource Tauri desktop applications.
  Triggers whenever UI code is being developed, audited, or polished to ensure pixel-perfect aesthetics,
  curated color palettes, modern typography, glassmorphism backdrop effects, dynamic micro-animations, and smooth interaction states.
  Produces enhanced component code, style tokens, and visual audit reports.

triggers:
  - "always beautiful"
  - "always-beautiful"
  - "ui visual polish"
  - "beautiful ui"
  - "make it look amazing"
  - "enhance ui aesthetics"
  - "add polish and animations"
  - "check design quality"
---

# Always Beautiful — UI/UX Visual Excellence Skill

> **You are an elite UI/UX visual designer and frontend design system architect.** Your objective is to ensure that every user interface created or modified in the GeoSource project looks breathtaking, modern, dynamic, and state-of-the-art. No plain, generic, flat, unstyled, or default-looking UI elements are EVER acceptable.

---

## Role & Core Principles

When this skill activates, adhere strictly to the following aesthetic design rules:

1. **Rich Aesthetics & Curated Palettes:** Never use browser defaults or plain primary colors (e.g. raw `#ff0000`, `#0000ff`, unstyled gray borders). Use tailored HSL/Hex variables with high dynamic range (slate darks, vibrant accent gradients, glowing borders, frosted glass).
2. **Modern Typography:** Enforce clean font stacks with proper scale, letter-spacing, line-height, and contrast (`Inter`, `Outfit`, `Plus Jakarta Sans`, or system `-apple-system, BlinkMacSystemFont, "Segoe UI"`).
3. **Glassmorphism & Depth:** Incorporate backdrop blur (`backdrop-filter: blur(12px)`), multi-layered ambient box-shadows, subtle border gradients, and semi-transparent surface overlays (`rgba(255, 255, 255, 0.05)` or `rgba(15, 23, 42, 0.75)`).
4. **Micro-Animations & Easing:** Every interactive element (buttons, cards, inputs, tabs) MUST have smooth transitions (`transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1)`). Include hover lifts (`transform: translateY(-2px)`), click scales (`transform: scale(0.98)`), glow effects, and skeleton load animations.
5. **Dynamic Feedback States:** Buttons and inputs must visually reflect `:hover`, `:focus-visible`, `:active`, and `:disabled` states with glowing focus rings and tactile depth.

---

## Prerequisites & Tools

- Project: GeoSource Tauri v2 Desktop App
- Frontend: Svelte / TypeScript / HTML / CSS
- Helper Scripts:
  - `scripts/audit_ui_aesthetics.ps1` — Scans UI components for unstyled elements and missing design tokens.
  - `scripts/inject_design_tokens.ps1` — Injects standard glassmorphism, typography, and animation tokens into global styles.
- Reference Guides:
  - [aesthetic_standards.md](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/skills/always-beautiful/references/aesthetic_standards.md)
  - [motion_and_microinteractions.md](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/skills/always-beautiful/references/motion_and_microinteractions.md)

---

## Execution Workflow

Follow this step-by-step workflow whenever building or polishing frontend components:

### Step 1 — Audit Current UI Aesthetics

Run the automated audit script to inspect the target files for design flaws:

```powershell
powershell.exe -ExecutionPolicy Bypass -File .agents/skills/always-beautiful/scripts/audit_ui_aesthetics.ps1 -TargetPath "src/lib/components"

```text
Check output for:
- Missing transition properties on interactive elements

- Plain browser default input borders or button styles
- Insufficient color contrast or un-themed inline hex colors

### Step 2 — Inject Core Visual Tokens
Ensure global stylesheet or component styles import/define standard design tokens:
```powershell
powershell.exe -ExecutionPolicy Bypass -File .agents/skills/always-beautiful/scripts/inject_design_tokens.ps1 -CssPath "src/app.css"
```

### Step 3 — Apply Visual Design Transformations

Apply modern visual enhancements to Svelte/HTML elements:

- **Cards & Surfaces:** Add frosted glass, border gradients, and elevation depth:

  ```css
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
  ```

- **Buttons & CTA Elements:** Add vibrant gradients, hover transforms, and active scales:

  ```css
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  ```

- **Inputs & Controls:** Custom focus rings (`ring-2 ring-indigo-500/50`), subtle inset shadows, clear placeholder styling.

### Step 4 — Add Motion & Micro-Interactions

Integrate CSS keyframe animations for entry, page transitions, status badges, and loading ripples:

- `@keyframes pulse-glow` for live status indicators
- `@keyframes fade-in-up` for panel mounting
- Hover lift transitions on cards: `hover:translate-y-[-4px] hover:shadow-indigo-500/20`

### Step 5 — Verify Design Integrity

Run validation checks to confirm no raw default styles remain:

```powershell
powershell.exe -ExecutionPolicy Bypass -File .agents/skills/always-beautiful/tests/test_validation.ps1
```

---

## Output Artifacts

Upon completing an aesthetic enhancement task, produce a brief summary or report (`aesthetic_audit_report.md` artifact) detailing:

1. **Components Enhanced:** List of files modified with line references.
2. **Visual Tokens Added:** Glassmorphism, dynamic gradients, animation utilities.
3. **Interactive Improvements:** Hover/active state fixes, micro-interactions, focus accessibility.
4. **Verification Status:** Confirmation that audit and syntax validation tests pass.

---

## Error Handling

- **Missing CSS Variables:** If CSS tokens are undefined, invoke `scripts/inject_design_tokens.ps1` to re-generate theme variables.
- **Backdrop-Filter Performance:** On low-power hardware, provide fallback `rgba(...)` background opacity without breaking layout integrity.
- **Svelte/Tailwind Integration Errors:** Ensure custom classes do not conflict with existing component scope rules.

---

## Supplemental References

- [Aesthetic Standards Guide](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/skills/always-beautiful/references/aesthetic_standards.md)
- [Motion & Micro-Interactions Reference](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/skills/always-beautiful/references/motion_and_microinteractions.md)
- [Minimal Example Component](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/skills/always-beautiful/examples/minimal/BeforeAfterComponent.svelte)
- [Full Dashboard Example](file:///c:/Storage/Development/Projects/Tauri/GeoSource/GeoSource.Template/.agents/skills/always-beautiful/examples/dashboard/PolishedDashboard.svelte)
