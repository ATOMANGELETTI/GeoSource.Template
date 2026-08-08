# UI/UX Visual Design System & Aesthetic Standard

## Overview
This reference guide details the visual design standards and aesthetic principles required for all user interfaces designed within the GeoSource Tauri desktop workspace.

## Core Design Principles

### 1. Palette & Dark Mode Elevation
- **Color Systems**: Utilize HSL color spaces with tailored light/dark pairs.
- **Glassmorphism**: Combine translucent backgrounds (`bg-white/10`, `bg-slate-900/60`), backdrop blurs (`backdrop-blur-xl`), and crisp borders (`border-white/20`, `border-slate-800/80`).
- **Elevation Layers**:
  - Base Background: `bg-slate-950`
  - Container / Card: `bg-slate-900/70 backdrop-blur-md`
  - Floating Modal / Dropdown: `bg-slate-900/90 backdrop-blur-2xl shadow-2xl`

### 2. Typography Rhythm
- **Primary Font**: `Inter`, `Roboto`, or `Outfit` with crisp anti-aliasing (`antialiased`).
- **Hierarchy**:
  - Page Title: `text-2xl font-bold tracking-tight text-slate-100`
  - Section Heading: `text-lg font-semibold tracking-normal text-slate-200`
  - Body Text: `text-sm font-normal text-slate-400`
  - Micro Caption: `text-xs font-medium uppercase tracking-wider text-slate-500`

### 3. Micro-Animations & Interactivity
- Hover scale transitions: `hover:scale-[1.02] transition-transform duration-200 ease-out`
- Focus outlines: `focus:ring-2 focus:ring-primary-500/50 focus:outline-none`
- Active press feedback: `active:scale-[0.98]`
