# Motion & Micro-Interactions Specification

This document specifies the timing curves, hover feedback, press scales, and keyframe transitions enforced by `always-beautiful`.

---

## 1. Easing Curves & Timings

Never use linear CSS transitions (`transition: all 0.3s linear`). Always use natural spring-like cubic-bezier curves:

```css
/* Recommended Standard Easing Curves */
--ease-spring: cubic-bezier(0.16, 1, 0.3, 1);  /* Smooth decelerating spring */
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1); /* Tactile slight overshoot */

/* Standard Durations */
--duration-fast: 150ms;
--duration-normal: 250ms;
--duration-slow: 400ms;
```

---

## 2. Interactive Element Hover & Active States

| State | CSS Transform | Box Shadow Effect |
|---|---|---|
| **Default** | `transform: translateY(0) scale(1)` | Base surface shadow |
| **Hover** | `transform: translateY(-2px) scale(1.01)` | Glowing accent drop shadow |
| **Active / Click** | `transform: translateY(0) scale(0.97)` | Recessed inset shadow |
| **Focus-Visible** | `transform: translateY(0)` | `0 0 0 3px rgba(99, 102, 241, 0.4)` ring |

---

## 3. Standard Keyframe Animations

```css
/* Page / Component Entry Slide Up */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Subtle Live Indicator Pulse */
@keyframes pulseGlow {
  0%, 100% {
    opacity: 1;
    box-shadow: 0 0 8px rgba(99, 102, 241, 0.6);
  }
  50% {
    opacity: 0.5;
    box-shadow: 0 0 16px rgba(99, 102, 241, 0.2);
  }
}

/* Skeleton Loading Shimmer */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```
