# Features Grid Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the `#features` section so cards use a fixed 1.88:1 aspect ratio, screenshots are hidden by default and fade in at 35% opacity on hover, and the grid is vertically centered in the full-height page.

**Architecture:** Single-file HTML change to `landing page/index.html`. CSS changes in the `<style>` block (lines ~141–189 for feat-card rules). HTML changes in the `#features` section (lines ~710–885). No JS changes needed.

**Tech Stack:** Vanilla HTML/CSS in a single `.html` file. No build step. Open in browser to verify.

---

### Task 1: Add subtitle text + CSS

**Files:**
- Modify: `landing page/index.html` — CSS block (~line 160) + header HTML (~line 721)

- [ ] **Step 1: Add subtitle CSS**

In the `<style>` block, after the `.feat-header-row` rule (~line 162), add:

```css
.feat-subtitle {
    font-size: clamp(13px, 1.3vmin, 15px);
    color: #6e7680;
    margin-top: 8px;
    text-align: center;
}
```

- [ ] **Step 2: Add subtitle HTML**

Find the section header div (~line 720–726):
```html
<div class="px-8 pt-12 pb-5 text-center shrink-0">
    <span class="font-mono text-[10px] text-apex-muted uppercase tracking-[0.24em]">What You Get</span>
    <h2 class="font-display mt-2 leading-snug" style="font-size:clamp(36px,4vw,60px); color:#f0f0f0;">
        Everything in one place.
    </h2>
</div>
```

Change it to:
```html
<div class="px-8 pt-12 pb-5 text-center shrink-0">
    <span class="font-mono text-[10px] text-apex-muted uppercase tracking-[0.24em]">What You Get</span>
    <h2 class="font-display mt-2 leading-snug" style="font-size:clamp(36px,4vw,60px); color:#f0f0f0;">
        Everything in one place.
    </h2>
    <p class="feat-subtitle">9 Core features are already live in the beta, more are in development.</p>
</div>
```

- [ ] **Step 3: Verify in browser**

Open `index.html` in a browser and scroll to the Features page. Confirm the subtitle appears below the heading in muted grey.

- [ ] **Step 4: Commit**

```bash
cd "/Users/jonas/Documents/apex/landing page"
git add index.html
git commit -m "feat: add features section subtitle"
```

---

### Task 2: Center the grid vertically in the page

**Files:**
- Modify: `landing page/index.html` — grid wrapper HTML (~line 729–730)

- [ ] **Step 1: Update grid wrapper**

Find (~line 729):
```html
<div class="flex-1 overflow-hidden" style="background:#252b34; min-height:0;">
    <div class="feat-grid" style="display:grid; grid-template-columns:repeat(5,1fr); grid-template-rows:repeat(2,1fr); gap:1px; height:100%; background:#252b34;">
```

Replace with:
```html
<div class="flex-1" style="display:flex; align-items:center; padding:0 0 clamp(16px,2vmin,32px);">
    <div class="feat-grid" style="display:grid; grid-template-columns:repeat(5,1fr); grid-template-rows:repeat(2,auto); gap:1px; width:100%; background:#252b34;">
```

Key changes:
- Outer div: `flex-1` + `display:flex; align-items:center` to center grid vertically. Remove `overflow:hidden`, `background`, `min-height:0`.
- Inner grid: `grid-template-rows:repeat(2,auto)` (was `1fr`), `width:100%` (was `height:100%`). Add `background:#252b34` here since it moved from outer.

- [ ] **Step 2: Verify in browser**

Scroll to Features page. The grid should still show all 10 cards but they no longer stretch to fill the full height. Cards may look tall still (feat-thumb still present at this point) — that's expected, fixed in Task 3–4.

- [ ] **Step 3: Commit**

```bash
cd "/Users/jonas/Documents/apex/landing page"
git add index.html
git commit -m "feat: center features grid vertically in page"
```

---

### Task 3: Add aspect-ratio to feat-card + add feat-bg CSS

**Files:**
- Modify: `landing page/index.html` — CSS block (~line 142–189)

- [ ] **Step 1: Add aspect-ratio to .feat-card**

Find the `.feat-card` rule (~line 142):
```css
.feat-card {
    position: relative; overflow: hidden; background: #111418;
    border: 1px solid #1e2530;
    display: flex; flex-direction: column; cursor: pointer;
    padding: clamp(10px, 1.8vmin, 24px) clamp(10px, 1.5vmin, 20px) !important;
    transition: border-color 0.25s, box-shadow 0.25s;
}
```

Replace with:
```css
.feat-card {
    position: relative; overflow: hidden; background: #111418;
    border: 1px solid #1e2530;
    display: flex; flex-direction: column; cursor: pointer;
    aspect-ratio: 1.88 / 1;
    padding: clamp(10px, 1.8vmin, 24px) clamp(10px, 1.5vmin, 20px) !important;
    transition: border-color 0.25s, box-shadow 0.25s;
}
```

- [ ] **Step 2: Add .feat-bg CSS**

After the `.feat-card:hover .feat-explore` rule (~line 189), add:

```css
.feat-bg {
    position: absolute; inset: 0; overflow: hidden;
    opacity: 0; transition: opacity 0.35s; pointer-events: none;
}
.feat-bg img {
    width: 100%; height: 100%;
    object-fit: cover; object-position: top center;
    display: block;
}
.feat-card:hover .feat-bg { opacity: 0.35; }
```

- [ ] **Step 3: Remove .feat-thumb CSS**

Find and delete the entire `.feat-thumb` block (~line 169–179):
```css
.feat-thumb {
    flex: 1; min-height: 0;
    margin: 8px calc(-1 * clamp(10px, 1.5vmin, 20px)) calc(-1 * clamp(10px, 1.8vmin, 24px));
    padding: 0 6px; overflow: hidden; background: #111418;
}
.feat-thumb img {
    width: 100%; height: 100%;
    object-fit: contain; object-position: top center;
    display: block; opacity: 0.55;
    box-shadow: 0 6px 16px -4px rgba(0,212,170,0.12);
    transition: opacity 0.3s, transform 0.4s;
}
```

Also remove these hover rules from the `.feat-card:hover` block (~line 186–188):
```css
.feat-card:hover .feat-thumb { background: #0d1016; }
.feat-card:hover .feat-thumb img { opacity: 0.85; }
```

- [ ] **Step 4: Verify in browser**

Scroll to Features. Cards should now be short, wide rectangles (~1.88:1 ratio). The screenshots are gone (no feat-thumb). Hovering a card should show a faint screenshot background fading in. All other hover effects (teal top border, glow, text brightening, "— Explore" slide) should still work.

- [ ] **Step 5: Commit**

```bash
cd "/Users/jonas/Documents/apex/landing page"
git add index.html
git commit -m "feat: add aspect-ratio to cards, replace feat-thumb with feat-bg"
```

---

### Task 4: Update HTML — swap feat-thumb for feat-bg in all 9 live cards

**Files:**
- Modify: `landing page/index.html` — #features HTML (~line 733–865)

For each of the 9 live feature cards, replace the `<div class="feat-thumb">...</div>` with `<div class="feat-bg"><img ...></div>`, and move it to be the **first child** of `feat-card` (before `feat-content`).

- [ ] **Step 1: Feat 1 — Shortlist Management**

Find:
```html
<div class="feat-card" style="cursor:pointer;" onclick="openFeature('shortlist')">
    <div class="feat-content">
```
and at the end of that card:
```html
    <div class="feat-thumb"><img src="shortlist_management.png" alt="Shortlist Management screenshot"></div>
</div>
```

Change to (feat-bg as first child, feat-thumb removed):
```html
<div class="feat-card" style="cursor:pointer;" onclick="openFeature('shortlist')">
    <div class="feat-bg"><img src="shortlist_management.png" alt=""></div>
    <div class="feat-content">
```
and remove the `<div class="feat-thumb">...</div>` line entirely.

- [ ] **Step 2: Feat 2 — AI Equity Research Reports**

Same pattern. Replace:
```html
    <div class="feat-thumb"><img src="AI_equityreports.png" alt="AI Equity Research Reports screenshot"></div>
```
With `<div class="feat-bg"><img src="AI_equityreports.png" alt=""></div>` as first child, remove feat-thumb.

- [ ] **Step 3: Feat 3 — Stock Viewer**

Replace:
```html
    <div class="feat-thumb"><img src="stock_viewer.png" alt="Stock Viewer screenshot"></div>
```
With `<div class="feat-bg"><img src="stock_viewer.png" alt=""></div>` as first child, remove feat-thumb.

- [ ] **Step 4: Feat 4 — Sector Overview**

Replace:
```html
    <div class="feat-thumb"><img src="sector_overview.png" alt="Sector Overview screenshot"></div>
```
With `<div class="feat-bg"><img src="sector_overview.png" alt=""></div>` as first child, remove feat-thumb.

- [ ] **Step 5: Feat 5 — Macro Data, World News & Earnings**

Replace:
```html
    <div class="feat-thumb"><img src="news_world_earnings.png" alt="Macro Data, World News & Earnings screenshot"></div>
```
With `<div class="feat-bg"><img src="news_world_earnings.png" alt=""></div>` as first child, remove feat-thumb.

- [ ] **Step 6: Feat 6 — Recession Radar**

Replace:
```html
    <div class="feat-thumb"><img src="recession_radar.png" alt="Recession Radar screenshot"></div>
```
With `<div class="feat-bg"><img src="recession_radar.png" alt=""></div>` as first child, remove feat-thumb.

- [ ] **Step 7: Feat 7 — Portfolio Tracking**

Replace:
```html
    <div class="feat-thumb"><img src="portfolio_analyzer.png" alt="Portfolio Tracking & AI Analysis screenshot"></div>
```
With `<div class="feat-bg"><img src="portfolio_analyzer.png" alt=""></div>` as first child, remove feat-thumb.

- [ ] **Step 8: Feat 8 — DCF Analyzer**

Replace:
```html
    <div class="feat-thumb"><img src="DCF_analyzer.png" alt="DCF Analyzer screenshot"></div>
```
With `<div class="feat-bg"><img src="DCF_analyzer.png" alt=""></div>` as first child, remove feat-thumb.

- [ ] **Step 9: Feat 9 — Trend-Based Company Finder**

Replace:
```html
    <div class="feat-thumb"><img src="company_finder.png" alt="Trend-Based Company Finder screenshot"></div>
```
With `<div class="feat-bg"><img src="company_finder.png" alt=""></div>` as first child, remove feat-thumb.

- [ ] **Step 10: Feat 10 — Trend Intelligence (Under Development)**

No change needed — this card has no `feat-thumb` and should get no `feat-bg`.

- [ ] **Step 11: Final visual check in browser**

Verify all 10 cards:
- Cards are wide/short rectangles at consistent 1.88:1 ratio
- No screenshot visible by default
- Hover over each live card — screenshot fades in at ~35% opacity behind text
- Text (title, description, "— Explore") remains clearly readable on hover
- Teal top-border flash, glow, text brighten, "— Explore" slide all still work
- Feat 10 (Trend Intelligence) has no hover background — correct
- Subtitle "9 Core features are already live..." visible below heading
- Grid is vertically centered in the page

- [ ] **Step 12: Commit**

```bash
cd "/Users/jonas/Documents/apex/landing page"
git add index.html
git commit -m "feat: replace feat-thumb with feat-bg background on hover for all feature cards"
```
