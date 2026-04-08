# Scroll Flow: Continuous Ambient Layer

**Date:** 2026-04-08
**File:** `landing page/index.html`
**Goal:** Replace hard scroll-snap page transitions with a free-scrolling experience unified by a persistent ambient background layer.

---

## Problem

- `scroll-snap-type: y mandatory` creates hard cut transitions between sections
- Section background colors differ subtly (`#0b0d0f`, `#0a0d12`, `#111418`), making each page feel like a separate room
- No visual continuity between sections — every section resets visually with its own corner marks and grid overlay
- Dead space at section edges accentuates the separation

---

## Solution Overview

1. Remove scroll snap (free scroll)
2. Add a single fixed ambient background layer spanning all sections
3. Unify all section backgrounds to one color
4. Add section entry fade-up animations via IntersectionObserver
5. Keep hero exactly as-is; remove redundant bg-grid only from beta section

---

## Changes

### 1. Remove Scroll Snap

**CSS — remove from `html` rule:**
```css
/* REMOVE: */
scroll-snap-type: y mandatory;
```

**CSS — remove from `section.page` rule:**
```css
/* REMOVE: */
scroll-snap-align: start;
scroll-snap-stop: always;
```

**Hero section inline style** — the hero `<section>` does not have `class="page"` so it carries `scroll-snap-align:start; scroll-snap-stop:always;` as inline styles. Remove both from the hero's `style="..."` attribute directly.

Section heights (`height: 100vh`) and `overflow: hidden` stay unchanged.

The `@media (max-width: 768px)` rule already sets `scroll-snap-type: none` — that override can be removed too (no longer needed).

---

### 2. Fixed Ambient Background Layer

Add as the **very first child of `<body>`**, before the `<nav>`:

```html
<div id="ambient-bg" aria-hidden="true">
    <div class="amb-orb" id="amb-orb-1"></div>
    <div class="amb-orb" id="amb-orb-2"></div>
    <div class="amb-orb" id="amb-orb-3"></div>
</div>
```

**CSS:**
```css
#ambient-bg {
    position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden;
    background-image:
        linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
    background-size: 44px 44px;
}
.amb-orb {
    position: absolute; border-radius: 50%;
    filter: blur(80px); pointer-events: none;
}
#amb-orb-1 {
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(0,212,170,0.07) 0%, transparent 70%);
    top: -100px; left: -120px;
}
#amb-orb-2 {
    width: 420px; height: 420px;
    background: radial-gradient(circle, rgba(0,212,170,0.045) 0%, transparent 70%);
    top: 40vh; right: -80px;
}
#amb-orb-3 {
    width: 560px; height: 560px;
    background: radial-gradient(circle, rgba(59,130,246,0.035) 0%, transparent 70%);
    bottom: -80px; left: -60px;
}
```

**All existing sections** must have `position: relative; z-index: 1` so they sit above the ambient layer. Add to both `section.page` and the hero (which lacks that class):
```css
section.page { z-index: 1; }
section#hero  { z-index: 1; }   /* hero doesn't carry class="page" */
```

**JS — parallax drift** (add to the existing script block):
```js
// Ambient orb parallax
const orb1 = document.getElementById('amb-orb-1');
const orb2 = document.getElementById('amb-orb-2');
const orb3 = document.getElementById('amb-orb-3');
window.addEventListener('scroll', () => {
    const y = window.scrollY;
    orb1.style.transform = `translateY(${y * 0.06}px)`;
    orb2.style.transform = `translateY(${y * -0.04}px)`;
    orb3.style.transform = `translateY(${y * 0.03}px)`;
}, { passive: true });
```

---

### 3. Unify Section Backgrounds

Change all section `background` inline styles to `#0a0d12`:

| Section | Current | New |
|---|---|---|
| `#features` | `#0b0d0f` | `#0a0d12` |
| `#how` | `#0a0d12` | unchanged |
| `#technology` | `#0a0d12` | unchanged |
| `#pricing` | `#111418` | `#0a0d12` |
| `#beta` | `#0a0d12` | unchanged |

Hero section is **not changed**.

---

### 4. Section Entry Animations

**CSS:**
```css
section.page {
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.55s ease, transform 0.55s ease;
}
section.page.in-view {
    opacity: 1;
    transform: translateY(0);
}
```

**JS — IntersectionObserver** (add to script block):
```js
// Section reveal
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, { threshold: 0.08 });

document.querySelectorAll('section.page').forEach(s => revealObserver.observe(s));
```

**Important:** The hero section does NOT have `class="page"`, so the `opacity: 0` default does not apply to it. Hero is always visible on load — no extra handling needed.

---

### 5. Remove Beta bg-grid, Keep Hero bg-grid

In the `#beta` section, remove:
```html
<div class="absolute inset-0 bg-grid pointer-events-none z-0"></div>
```

The hero section's `<div class="absolute inset-0 bg-grid pointer-events-none" style="z-index:2;">` stays unchanged.

---

## What Does NOT Change

- Hero section — fully untouched (layout, bg-grid, animations, content)
- All section interior designs, content, animations
- Corner decorations (`.sc`, `.section-deco`) on all sections
- Navbar scroll behavior
- Feature panel slide-over
- Responsive breakpoints (except removing now-redundant snap override)
- Custom scrollbar styling

---

## Risk Notes

- **Section opacity: 0 on load** — only applies to `section.page` elements. Hero lacks this class and is always visible. All other sections animate in on scroll as intended.
- **z-index layering** — sections need `z-index: 1` to sit above `ambient-bg` at `z-index: 0`. The feature panel (`#feature-panel`) currently uses `z-index: 50` — this is unaffected.
- **Pricing section** background change from `#111418` → `#0a0d12` makes it slightly darker. Interior content (cards, borders) is unaffected.
