# Apple Human Interface Guidelines (HIG) Specification

Apple HIG emphasizes clarity, deference, and depth across iOS, macOS, and visionOS. Key features include vibrant glassmorphism, SF Pro typography, dynamic blur materials, and subtle 1px border highlights.

---

## 🎨 Color System Tokens

### Light Mode (System Accent: Blue)
- **System Blue**: `#007AFF`
- **System Gray**: `#8E8E93`
- **System Background**: `#F2F2F7` (Grouped Secondary Background)
- **Secondary System Background**: `#FFFFFF`
- **Label Primary**: `#000000`
- **Label Secondary**: `rgba(60, 60, 67, 0.60)`
- **Separator / Hairline**: `rgba(60, 60, 67, 0.29)` (0.5px or 1px stroke)

### Dark Mode
- **System Blue**: `#0A84FF`
- **System Background**: `#000000`
- **Secondary System Background**: `#1C1C1E`
- **Label Primary**: `#FFFFFF`
- **Glass Blur**: `backdrop-filter: blur(25px) saturate(190%)`

---

## 🔤 Typography (SF Pro / SF Compact)

- **Large Title**: 34px / Bold (700)
- **Title 1**: 28px / Bold (700)
- **Title 2**: 22px / SemiBold (600)
- **Headline**: 17px / SemiBold (600)
- **Body**: 17px / Regular (400)
- **Footnote**: 13px / Regular (400)

---

## 💎 Materials & Glassmorphism

- **Thin Material**: `rgba(255, 255, 255, 0.40)` + `backdrop-blur-md`
- **Regular Material**: `rgba(255, 255, 255, 0.65)` + `backdrop-blur-lg`
- **Thick Material**: `rgba(255, 255, 255, 0.85)` + `backdrop-blur-xl`
- **Corner Radii**: Continuous superellipse curves (`10px` for buttons, `16px`-`20px` for cards)
