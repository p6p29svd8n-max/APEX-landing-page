# Features Grid Redesign

**Date:** 2026-04-08  
**File:** `landing page/index.html`  
**Section:** `#features` (Page 2, lines ~710–885)

---

## Goal

Redesign the 2×5 features grid so cards are shorter and cleaner, with screenshots hidden by default and revealed subtly on hover as a background layer.

---

## Changes

### 1. Add subtitle below header

Below the existing `<h2>Everything in one place.</h2>`, add a new paragraph:

> "9 Core features are already live in the beta, more are in development."

Style: `font-size: clamp(13px, 1.3vmin, 15px)`, color `#6e7680`, `margin-top: 8px`.

### 2. Grid container — center vertically

**Current:** Grid wrapper is `flex: 1; overflow: hidden; min-height: 0` with `height: 100%` on the inner grid.

**New:** Replace with a flex container that centers the grid vertically:
```css
flex: 1;
display: flex;
align-items: center;
padding: 0 0 clamp(16px, 2vmin, 32px);
```
The inner `.feat-grid` drops `height: 100%` and uses `width: 100%` instead. `grid-template-rows` changes from `repeat(2, 1fr)` to `repeat(2, auto)`.

### 3. Card aspect ratio

Add `aspect-ratio: 1.88 / 1` to `.feat-card`. This is derived from the largest screenshot (`news_world_earnings.png`, `stock_viewer.png`: ~2579×1374 = ratio 1.877, rounded to 1.88).

Remove `flex-direction: column` and `display: flex` from `.feat-card` — or keep flex but let the card height be driven by `aspect-ratio`, not by the grid row.

### 4. Remove feat-thumb

- Remove the `.feat-thumb` CSS block entirely.
- Remove all `<div class="feat-thumb"><img ...></div>` elements from the 9 live feature cards (feat 10 "under development" has no thumb, so no change there).

### 5. Add screenshot as background layer

**New CSS class `.feat-bg`:**
```css
.feat-bg {
    position: absolute;
    inset: 0;
    overflow: hidden;
    opacity: 0;
    transition: opacity 0.35s;
    pointer-events: none;
}
.feat-bg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    display: block;
}
.feat-card:hover .feat-bg {
    opacity: 0.35;
}
```

**HTML structure per card (9 live cards):**
```html
<div class="feat-card" ...>
    <div class="feat-bg"><img src="[screenshot].png" alt=""></div>
    <div class="feat-content">
        <!-- icon, title, desc, explore — unchanged -->
    </div>
</div>
```

`.feat-bg` is the first child, behind `.feat-content` (which already has `position: relative; z-index: 2`).

### 6. Preserve all existing hover effects

No changes to:
- `::before` teal top-border flash
- `border-color` and `box-shadow` glow
- `.feat-desc` color transition to `#f0f0f0`
- `.feat-explore` slide-up animation
- `.feat-icon-box` styles

---

## Screenshots per card

| Card | Image file |
|---|---|
| Shortlist Management | `shortlist_management.png` |
| AI Equity Research Reports | `AI_equityreports.png` |
| Stock Viewer | `stock_viewer.png` |
| Key Sector Overview | `sector_overview.png` |
| Macro Data, World News & Earnings | `news_world_earnings.png` |
| Recession Radar & Fear & Greed | `recession_radar.png` |
| Portfolio Tracking & AI Analysis | `portfolio_analyzer.png` |
| Plug & Play DCF Analyzer | `DCF_analyzer.png` |
| Trend-Based Company Finder | `company_finder.png` |
| Trend Intelligence (feat 10) | *(no background image)* |

---

## What is NOT changing

- Section background, padding, `.page` class, 100vh height
- "What You Get" label and "Everything in one place." heading
- Corner decorations (`.section-deco`)
- 5-column grid structure (`grid-template-columns: repeat(5, 1fr)`)
- 1px hairline gaps (`gap: 1px; background: #252b34`)
- All card content: icons, titles, descriptions, "— Explore" text, `openFeature()` click handlers
- "Under development" opacity and cursor on feat 10
- Responsive grid overrides (`@media` breakpoints for 3-col, 2-col)
