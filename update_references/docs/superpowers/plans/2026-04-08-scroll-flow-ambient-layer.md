# Scroll Flow: Continuous Ambient Layer — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace hard scroll-snap page transitions with a free-scrolling experience unified by a persistent fixed ambient background layer, orb parallax, and section entry animations.

**Architecture:** Single-file change to `landing page/index.html`. CSS changes in the `<style>` block (lines ~46–420). HTML changes: one new `<div id="ambient-bg">` after `<body>`, inline style edits on hero/features/pricing/beta. JS additions in the existing script block (~line 1600+).

**Tech Stack:** Vanilla HTML/CSS/JS. No dependencies. IntersectionObserver + scroll event listener.

---

## File Map

| File | Changes |
|---|---|
| `landing page/index.html` | CSS: remove snap, add ambient + animation rules. HTML: add ambient div, fix hero inline, unify backgrounds. JS: parallax + reveal observer. |

---

### Task 1: Add ambient background layer (CSS + HTML)

**Files:**
- Modify: `landing page/index.html` — CSS block + `<body>` opening

- [ ] **Step 1: Add ambient CSS**

In the `<style>` block, after the `.bg-grid` rule block (~line 98), add:

```css
/* ── Ambient background layer ── */
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
section#hero { z-index: 1; }
```

- [ ] **Step 2: Add ambient HTML**

After `<body>` (~line 420), add as the very first child:

```html
<!-- ── Ambient background layer ── -->
<div id="ambient-bg" aria-hidden="true">
    <div class="amb-orb" id="amb-orb-1"></div>
    <div class="amb-orb" id="amb-orb-2"></div>
    <div class="amb-orb" id="amb-orb-3"></div>
</div>
```

- [ ] **Step 3: Verify by reading**

Read lines 420–430 to confirm `#ambient-bg` is the first child of body. Read the CSS block to confirm all 6 new rules are present.

- [ ] **Step 4: Commit**

```bash
cd "/Users/jonas/Documents/apex/landing page"
git add index.html
git commit -m "feat: add fixed ambient background layer with grid and teal orbs"
```

---

### Task 2: Remove scroll snap

**Files:**
- Modify: `landing page/index.html` — CSS block lines 51–67 + hero inline style line 461

- [ ] **Step 1: Update the `html` CSS rule (line 51)**

Find:
```css
html { scroll-snap-type: y mandatory; overflow-y: scroll; }
```
Replace with:
```css
html { overflow-y: scroll; }
```

- [ ] **Step 2: Update the `section.page` CSS rule (line 52)**

Find:
```css
section.page { scroll-snap-align: start; scroll-snap-stop: always; height: 100vh; overflow: hidden; position: relative; }
```
Replace with:
```css
section.page { height: 100vh; overflow: hidden; position: relative; z-index: 1; }
```

- [ ] **Step 3: Remove the media query snap override (~line 67)**

Find and delete this line inside the `@media (max-width: 768px)` block:
```css
html { scroll-snap-type: none; }
```

- [ ] **Step 4: Remove snap from hero inline style (line 461)**

Find:
```html
     style="height:calc(100vh - 60px); margin-top:60px; scroll-snap-align:start; scroll-snap-stop:always;">
```
Replace with:
```html
     style="height:calc(100vh - 60px); margin-top:60px;">
```

- [ ] **Step 5: Verify**

Read lines 50–70 and line 461. Confirm:
- `scroll-snap-type` is gone from both `html` rule and media query
- `scroll-snap-align` and `scroll-snap-stop` are gone from `section.page`
- `z-index: 1` is present on `section.page`
- Hero inline style has no snap properties

- [ ] **Step 6: Commit**

```bash
cd "/Users/jonas/Documents/apex/landing page"
git add index.html
git commit -m "feat: remove mandatory scroll snap, enable free scrolling"
```

---

### Task 3: Section entry animations (CSS + JS)

**Files:**
- Modify: `landing page/index.html` — CSS block + JS script block (~line 1600)

- [ ] **Step 1: Add section reveal CSS**

In the `<style>` block, after the existing `section.page` rule, add a new block (CSS cascade means these override cleanly):

```css
/* ── Section reveal animation ── */
section.page { opacity: 0; transform: translateY(16px); transition: opacity 0.55s ease, transform 0.55s ease; }
section.page.in-view { opacity: 1; transform: translateY(0); }
```

Transition must be on `section.page` itself (not `:not(.in-view)`) so the browser applies it reliably when the `in-view` class is added.

- [ ] **Step 2: Add IntersectionObserver JS**

In the script block near the bottom of the file, after the existing `scroll` event listener (~line 1628), add:

```js
// ── Section reveal on scroll ──
const revealSectionObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, { threshold: 0.08 });

document.querySelectorAll('section.page').forEach(s => revealSectionObs.observe(s));
```

- [ ] **Step 3: Verify**

Open `index.html` in a browser and scroll slowly. Each section (`#features`, `#how`, `#technology`, `#pricing`, `#beta`) should fade up gently as it enters the viewport. The hero (no `class="page"`) should always be fully visible.

- [ ] **Step 4: Commit**

```bash
cd "/Users/jonas/Documents/apex/landing page"
git add index.html
git commit -m "feat: add section entry fade-up animations via IntersectionObserver"
```

---

### Task 4: Orb parallax JS + unify backgrounds + remove beta bg-grid

**Files:**
- Modify: `landing page/index.html` — JS block + section inline styles (lines 716, 1323, 1450)

- [ ] **Step 1: Add orb parallax JS**

In the script block, directly after the `revealSectionObs` code added in Task 3, add:

```js
// ── Ambient orb parallax ──
const _orb1 = document.getElementById('amb-orb-1');
const _orb2 = document.getElementById('amb-orb-2');
const _orb3 = document.getElementById('amb-orb-3');
window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (_orb1) _orb1.style.transform = `translateY(${y * 0.06}px)`;
    if (_orb2) _orb2.style.transform = `translateY(${y * -0.04}px)`;
    if (_orb3) _orb3.style.transform = `translateY(${y * 0.03}px)`;
}, { passive: true });
```

- [ ] **Step 2: Unify #features background (line 716)**

Find:
```html
<section id="features" class="page flex flex-col" style="background:#0b0d0f; padding-left:clamp(16px,5vw,80px); padding-right:clamp(16px,5vw,80px);">
```
Replace with:
```html
<section id="features" class="page flex flex-col" style="background:#0a0d12; padding-left:clamp(16px,5vw,80px); padding-right:clamp(16px,5vw,80px);">
```

- [ ] **Step 3: Unify #pricing background (line 1323)**

Find:
```html
<section id="pricing" class="page flex flex-col items-center justify-center overflow-hidden" style="background:#111418;">
```
Replace with:
```html
<section id="pricing" class="page flex flex-col items-center justify-center overflow-hidden" style="background:#0a0d12;">
```

- [ ] **Step 4: Remove beta's redundant bg-grid (line 1450)**

Find and delete this line inside `#beta`:
```html
    <div class="absolute inset-0 bg-grid pointer-events-none z-0"></div>
```

- [ ] **Step 5: Verify**

Open `index.html` in browser:
- Scroll slowly — orbs should drift very subtly at different rates (barely perceptible, atmospheric)
- Features and Pricing sections should be the same dark shade as How/Technology
- Beta section background unchanged (its section-deco grid overlay still present)
- No visible "jump" between section backgrounds as you scroll

- [ ] **Step 6: Commit**

```bash
cd "/Users/jonas/Documents/apex/landing page"
git add index.html
git commit -m "feat: orb parallax, unified section backgrounds, remove beta bg-grid"
```
