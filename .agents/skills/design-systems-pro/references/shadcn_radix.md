# Shadcn UI / Radix Primitives Specification

Shadcn UI is a modern, unstyled component distribution system built on top of Radix UI primitives and Tailwind CSS. It features CSS variable tokens, high dark-mode elegance, clean 1px borders, and customizable component slots.

---

## 🎨 Color Palette & CSS Variables (Dark Mode Defaults)

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --card: 0 0% 100%;
  --card-foreground: 240 10% 3.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;
  --secondary: 240 4.8% 95.9%;
  --secondary-foreground: 240 5.9% 10%;
  --muted: 240 4.8% 95.9%;
  --muted-foreground: 240 3.8% 46.1%;
  --accent: 240 4.8% 95.9%;
  --accent-foreground: 240 5.9% 10%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  --border: 240 5.9% 90%;
  --input: 240 5.9% 90%;
  --ring: 240 5.9% 10%;
  --radius: 0.5rem;
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  --card: 240 10% 3.9%;
  --card-foreground: 0 0% 98%;
  --primary: 0 0% 98%;
  --primary-foreground: 240 5.9% 10%;
  --muted: 240 3.7% 15.9%;
  --muted-foreground: 240 5% 64.9%;
  --border: 240 3.7% 15.9%;
  --ring: 240 4.9% 83.9%;
}
```

---

## 🔤 Typography (Inter / Geist Sans)

- **H1**: 36px (2.25rem) / ExtraBold (800) / tracking-tight
- **H2**: 30px (1.875rem) / SemiBold (600) / tracking-tight
- **H3**: 24px (1.5rem) / SemiBold (600) / tracking-tight
- **Body**: 16px (1rem) / Regular (400) / leading-7

---

## 📐 Radius & Styling

- **Radius**: Default `0.5rem` (`8px`)
- **Card**: `rounded-xl border bg-card text-card-foreground shadow`
- **Button Primary**: `bg-primary text-primary-foreground hover:bg-primary/90`
