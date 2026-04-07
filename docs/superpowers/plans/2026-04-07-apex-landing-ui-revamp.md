# APEX Landing Page UI Revamp — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Revamp four sections of `index.html` (nav, feature cards, How It Works, beta registration) within the existing Refined Dark Premium aesthetic — no new files, no JS changes.

**Architecture:** All changes are surgical edits to a single 1478-line `index.html` file containing embedded `<style>`, HTML sections, and a `<script>` block. CSS changes go in the `<style>` block (~lines 1–370). HTML changes target four named sections. Zero JavaScript modifications.

**Tech Stack:** Vanilla HTML/CSS, Tailwind (CDN, `apex-*` custom tokens), Lucide icons, Inter font. No build step — open `index.html` directly in browser to verify.

---

## File Map

| File | What changes |
|---|---|
| `index.html` lines ~117–146 | `.feat-card` CSS block — hover states, icon gradient, explore affordance |
| `index.html` lines ~378–399 | `<nav>` — logo lockup subtitle, BETA LIVE indicator |
| `index.html` lines ~825–884 | How It Works top band — full replacement |
| `index.html` lines ~1077–1133 | `#beta` section — layout restructure |

---

## Task 1: Feature Card CSS — Resting + Hover States

**Files:**
- Modify: `index.html` style block, `.feat-card` section (~lines 117–146)

- [ ] **Step 1: Replace the `.feat-card` CSS block**

Find this exact block (lines 117–146):
```css
/* ── Feature card ── */
.feat-card {
    position: relative; overflow: hidden; background: #0b0d0f;
    display: flex; flex-direction: column;
    padding: clamp(10px, 1.8vmin, 24px) clamp(10px, 1.5vmin, 20px) !important;
}
.feat-icon-box { width: clamp(26px,3vmin,36px); height: clamp(26px,3vmin,36px); flex-shrink: 0; }
.feat-icon-box i { width: clamp(12px,1.3vmin,16px) !important; height: clamp(12px,1.3vmin,16px) !important; }
.feat-title { font-size: clamp(13px, 1.5vmin, 16px) !important; }
.feat-desc  { font-size: clamp(12px, 1.35vmin, 15px) !important; margin: 0; }
.feat-header-row { gap: clamp(8px, 0.8vmin, 12px); margin-bottom: clamp(6px, 0.7vmin, 12px); }
.feat-content { position: relative; z-index: 2; flex-shrink: 0; }
.feat-thumb {
    flex: 1; min-height: 0;
    margin: 8px calc(-1 * clamp(10px, 1.5vmin, 20px)) calc(-1 * clamp(10px, 1.8vmin, 24px));
    padding: 0 6px;
    overflow: hidden;
    background: #0b0d0f;
}
.feat-thumb img {
    width: 100%; height: 100%;
    object-fit: contain; object-position: top center;
    display: block;
    opacity: 0.55;
    box-shadow: 0 6px 16px -4px rgba(0,212,170,0.12);
    transition: opacity 0.3s, transform 0.4s;
}
.feat-card:hover { background: #0d1016 !important; }
.feat-card:hover .feat-thumb { background: #0d1016; }
.feat-card:hover .feat-desc { color: #f0f0f0 !important; }
.feat-card:hover .feat-thumb img { opacity: 0.85; }
```

Replace with:
```css
/* ── Feature card ── */
.feat-card {
    position: relative; overflow: hidden; background: #111418;
    border: 1px solid #1e2530;
    display: flex; flex-direction: column; cursor: pointer;
    padding: clamp(10px, 1.8vmin, 24px) clamp(10px, 1.5vmin, 20px) !important;
    transition: border-color 0.25s, box-shadow 0.25s;
}
.feat-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, #00d4aa, transparent);
    opacity: 0; transition: opacity 0.25s;
}
.feat-icon-box {
    width: clamp(26px,3vmin,36px); height: clamp(26px,3vmin,36px); flex-shrink: 0;
    background: linear-gradient(135deg, rgba(0,212,170,0.15), rgba(0,212,170,0.05)) !important;
    border: 1px solid rgba(0,212,170,0.3) !important;
}
.feat-icon-box i { width: clamp(12px,1.3vmin,16px) !important; height: clamp(12px,1.3vmin,16px) !important; }
.feat-title { font-size: clamp(13px, 1.5vmin, 16px) !important; }
.feat-desc  { font-size: clamp(12px, 1.35vmin, 15px) !important; margin: 0; }
.feat-header-row { gap: clamp(8px, 0.8vmin, 12px); margin-bottom: clamp(6px, 0.7vmin, 12px); }
.feat-content { position: relative; z-index: 2; flex-shrink: 0; }
.feat-explore {
    font-size: 11px; color: #00d4aa; letter-spacing: 0.15em;
    margin-top: 10px; opacity: 0; transform: translateY(4px);
    transition: opacity 0.2s, transform 0.2s; font-family: Inter, sans-serif;
}
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
.feat-card:hover {
    border-color: rgba(0,212,170,0.3) !important;
    box-shadow: 0 0 20px rgba(0,212,170,0.06), inset 0 0 20px rgba(0,212,170,0.02);
}
.feat-card:hover::before { opacity: 1; }
.feat-card:hover .feat-thumb { background: #0d1016; }
.feat-card:hover .feat-desc { color: #f0f0f0 !important; }
.feat-card:hover .feat-thumb img { opacity: 0.85; }
.feat-card:hover .feat-explore { opacity: 1; transform: translateY(0); }
```

- [ ] **Step 2: Verify in browser**

Open `index.html` in browser. Scroll to Features section. Verify:
- Cards have slightly lighter background (`#111418` vs old near-black)
- Icon boxes show gradient teal instead of flat teal tint
- Hovering a card shows: teal top-edge glow, teal border, subtle box-shadow glow
- No layout shift on hover

- [ ] **Step 3: Commit**

```bash
cd "/Users/jonas/Documents/apex/landing page"
git add index.html
git commit -m "feat: elevate feature card hover states with gradient icons and top-edge glow"
```

---

## Task 2: Feature Cards HTML — Add Explore Affordance

**Files:**
- Modify: `index.html` — 9 clickable feat-card blocks (~lines 676–815, excluding feat 10 which is `cursor:default`)

- [ ] **Step 1: Add `.feat-explore` div to each of the 9 clickable cards**

Each clickable card has this structure:
```html
<div class="feat-card" style="cursor:pointer;" onclick="openFeature('...')">
    <div class="feat-content">
        <div class="flex items-center feat-header-row">...</div>
        <p class="feat-desc leading-relaxed" style="color:#6e7680;">...</p>
    </div>
    <div class="feat-thumb">...</div>
</div>
```

Add `<div class="feat-explore">— Explore</div>` immediately after the `<p class="feat-desc...">` closing tag, still inside `.feat-content`. Do this for all 9 clickable cards (shortlist, reports, stock, sectors, news, recession, portfolio, dcf, trends/company-finder).

Example — Feat 1 becomes:
```html
<div class="feat-card" style="cursor:pointer;" onclick="openFeature('shortlist')">
    <div class="feat-content">
        <div class="flex items-center feat-header-row">
            <div class="feat-icon-box flex items-center justify-center shrink-0" style="background:rgba(0,212,170,0.08); border:1px solid #252b34;">
                <i data-lucide="bookmark" class="w-4 h-4" style="color:#00d4aa;"></i>
            </div>
            <h3 class="feat-title font-bold leading-tight" style="font-family:Inter,sans-serif; color:#00d4aa;">Shortlist Management</h3>
        </div>
        <p class="feat-desc leading-relaxed" style="color:#6e7680;">Curate your highest-conviction stock picks and ideas with live prices, key figures, fair value estimates and AI-based recommendations in one focused view.</p>
        <div class="feat-explore">— Explore</div>
    </div>
    <div class="feat-thumb"><img src="shortlist_management.png" alt="Shortlist Management screenshot"></div>
</div>
```

Note: The `style="background:rgba(0,212,170,0.08); border:1px solid #252b34;"` inline styles on `.feat-icon-box` are overridden by the new CSS `!important` rules from Task 1 — leave them in place.

Do NOT add `.feat-explore` to Feat 10 (Trend Intelligence, `cursor:default`).

- [ ] **Step 2: Verify in browser**

Hover any of the 9 clickable cards. "— Explore" should fade in and slide up from below the description. Should not appear on the Trend Intelligence card.

- [ ] **Step 3: Commit**

```bash
cd "/Users/jonas/Documents/apex/landing page"
git add index.html
git commit -m "feat: add explore affordance to feature cards on hover"
```

---

## Task 3: Navigation Bar

**Files:**
- Modify: `index.html` — `<nav>` block (lines 378–399) + scroll JS (line 1224)

- [ ] **Step 1: Replace the nav logo + CTA block**

Find (lines 382–397):
```html
        <!-- Logo -->
        <div class="flex items-center gap-2.5 shrink-0">
            <img src="logo.png" alt="APEX" width="28" height="28" style="display:block;">
            <span class="font-sans font-semibold tracking-[0.18em] text-apex-text text-[13px] uppercase">APEX</span>
            <span class="hidden sm:inline text-apex-muted text-[11px] font-mono tracking-wider ml-1">Investment Intelligence</span>
        </div>

        <!-- Nav links -->
        <div class="hidden md:flex items-center gap-7 text-[12px] font-mono text-apex-muted uppercase tracking-[0.15em]">
            <a href="#features" id="nav-features" class="nav-link hover:text-apex-text transition-colors duration-150">Features</a>
            <a href="#how"      id="nav-how"      class="nav-link hover:text-apex-text transition-colors duration-150">How It Works</a>
            <a href="#pricing"  id="nav-pricing"  class="nav-link hover:text-apex-text transition-colors duration-150">Pricing</a>
        </div>

        <!-- CTA -->
        <a href="#beta" class="nav-cta">Join the Beta →</a>
```

Replace with:
```html
        <!-- Logo -->
        <div class="flex items-center gap-2.5 shrink-0">
            <img src="logo.png" alt="APEX" width="28" height="28" style="display:block;">
            <div class="flex flex-col leading-none">
                <span class="font-sans font-bold tracking-[0.06em] text-apex-text text-[11px] uppercase">APEX</span>
                <span class="hidden sm:inline font-mono uppercase text-[6px] tracking-[0.18em] mt-0.5" style="color:#4a5568;">Investment Intelligence</span>
            </div>
        </div>

        <!-- Nav links -->
        <div class="hidden md:flex items-center gap-7 text-[12px] font-mono text-apex-muted uppercase tracking-[0.15em]">
            <a href="#features" id="nav-features" class="nav-link hover:text-apex-text transition-colors duration-150">Features</a>
            <a href="#how"      id="nav-how"      class="nav-link hover:text-apex-text transition-colors duration-150">How It Works</a>
            <a href="#pricing"  id="nav-pricing"  class="nav-link hover:text-apex-text transition-colors duration-150">Pricing</a>
        </div>

        <!-- CTA -->
        <div class="flex items-center gap-3">
            <span class="hidden sm:flex items-center gap-1.5 text-[8px] font-mono uppercase tracking-[0.12em]" style="color:#00d4aa;">
                <span class="w-1.5 h-1.5 rounded-full bg-apex-accent pulse-live inline-block"></span>
                Beta Live
            </span>
            <a href="#beta" class="nav-cta">Join the Beta →</a>
        </div>
```

- [ ] **Step 2: Add teal hairline to scroll state**

Find line ~1224:
```js
nav.style.borderBottomColor = scrolled ? 'rgba(37,43,52,0.6)' : 'transparent';
```

Replace with:
```js
nav.style.borderBottomColor = scrolled ? 'rgba(37,43,52,0.6)' : 'transparent';
nav.style.boxShadow = scrolled ? '0 1px 0 0 rgba(0,212,170,0.15)' : 'none';
```

- [ ] **Step 3: Verify in browser**

- Logo shows "APEX" bold with "Investment Intelligence" as tiny subtitle beneath
- "● Beta Live" pulse dot appears to the left of the CTA on desktop
- On scroll: frosted glass activates + faint teal hairline appears below nav
- Mobile: subtitle and Beta Live indicator hidden (they use `hidden sm:*` / `hidden sm:flex`)

- [ ] **Step 4: Commit**

```bash
cd "/Users/jonas/Documents/apex/landing page"
git add index.html
git commit -m "feat: refine nav with wordmark subtitle and beta live pulse indicator"
```

---

## Task 4: How It Works — Replace Section

**Files:**
- Modify: `index.html` — How It Works top band (~lines 827–884)

- [ ] **Step 1: Replace the top band HTML**

Find the entire top band block (lines 827–884):
```html
    <!-- Top band: How It Works (50vh) -->
    <div style="height:50%; display:flex; align-items:center; overflow:hidden;">
        <div class="w-full max-w-5xl mx-auto px-8 py-6">
            <div class="text-center mb-6">
                <span class="font-mono text-[10px] text-apex-muted uppercase tracking-[0.24em]">How It Works</span>
                <h2 class="font-display mt-1.5" style="font-size:clamp(30px,3.5vw,50px); color:#f0f0f0;">Up and running in minutes.</h2>
            </div>

            <div class="relative grid grid-cols-1 md:grid-cols-3 gap-0">

                <!-- SVG connector 1→2 -->
                <div class="hidden md:block absolute" style="top:24px; left:calc(33.33% + 32px); width:calc(33.33% - 64px); height:2px; overflow:visible; pointer-events:none;">
                    <svg width="100%" height="2" style="overflow:visible;">
                        <defs>
                            <marker id="arrow1" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
                                <path d="M0,0 L0,5 L5,2.5 z" fill="rgba(0,212,170,0.35)"/>
                            </marker>
                        </defs>
                        <path id="connector-1-2" class="step-connector-path" d="M0,1 Q50%,1 100%,1" fill="none" stroke="rgba(0,212,170,0.35)" stroke-width="1" marker-end="url(#arrow1)"/>
                    </svg>
                </div>

                <!-- SVG connector 2→3 -->
                <div class="hidden md:block absolute" style="top:24px; left:calc(66.66% + 32px); width:calc(33.33% - 64px); height:2px; overflow:visible; pointer-events:none;">
                    <svg width="100%" height="2" style="overflow:visible;">
                        <defs>
                            <marker id="arrow2" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
                                <path d="M0,0 L0,5 L5,2.5 z" fill="rgba(0,212,170,0.35)"/>
                            </marker>
                        </defs>
                        <path id="connector-2-3" class="step-connector-path" d="M0,1 Q50%,1 100%,1" fill="none" stroke="rgba(0,212,170,0.35)" stroke-width="1" marker-end="url(#arrow2)"/>
                    </svg>
                </div>

                <!-- Step 1 -->
                <div class="reveal text-center px-6 pb-4 md:pb-0 relative">
                    <span class="step-watermark">01</span>
                    <h3 class="text-[15px] font-sans font-medium text-apex-text mb-2">Create Your Account</h3>
                    <p class="text-[13px] leading-relaxed" style="color:#6e7680;">Sign up and start a free 24-hour trial with full access — no credit card required.</p>
                </div>

                <!-- Step 2 -->
                <div class="reveal d1 text-center px-6 pb-4 md:pb-0 relative">
                    <span class="step-watermark">02</span>
                    <h3 class="text-[15px] font-sans font-medium text-apex-text mb-2">Add Your Watchlist</h3>
                    <p class="text-[13px] leading-relaxed" style="color:#6e7680;">Enter tickers you follow. Live prices populate instantly. Generate your first AI report in 30 seconds.</p>
                </div>

                <!-- Step 3 -->
                <div class="reveal d2 text-center px-6 relative">
                    <span class="step-watermark">03</span>
                    <h3 class="text-[15px] font-sans font-medium text-apex-text mb-2">Research. Decide. Act.</h3>
                    <p class="text-[13px] leading-relaxed" style="color:#6e7680;">Use AI reports, the recession radar, portfolio tracker, and newsletter signals — all in one place.</p>
                </div>

            </div>
        </div>
    </div>
```

Replace with:
```html
    <!-- Top band: How It Works (50vh) — vertical timeline + report preview -->
    <div style="height:50%; display:grid; grid-template-columns:1fr 1fr; overflow:hidden;">

        <!-- Left: vertical timeline -->
        <div class="reveal flex flex-col justify-center px-10 py-8 border-r" style="border-color:#1a2030;">
            <span class="font-mono uppercase tracking-[0.28em] mb-2" style="font-size:8px; color:#00d4aa;">How It Works</span>
            <h2 class="font-display mb-8 leading-tight" style="font-size:clamp(18px,2.2vw,26px); color:#f0f0f0; font-weight:300; letter-spacing:-0.03em;">
                Three steps to<br><span style="color:#00d4aa;">institutional insight.</span>
            </h2>

            <div class="relative" style="padding-left:28px;">
                <!-- Connector line -->
                <div style="position:absolute; left:7px; top:10px; bottom:10px; width:1px; background:linear-gradient(to bottom,#00d4aa,rgba(0,212,170,0.08));"></div>

                <!-- Step 1 -->
                <div class="reveal mb-6" style="position:relative;">
                    <div style="position:absolute; left:-28px; top:3px; width:15px; height:15px; border:1px solid #00d4aa; background:#0a0d12; display:flex; align-items:center; justify-content:center;">
                        <div style="width:5px; height:5px; background:#00d4aa; border-radius:50%; box-shadow:0 0 8px #00d4aa;"></div>
                    </div>
                    <div class="font-mono uppercase mb-1" style="font-size:7px; color:#00d4aa; letter-spacing:0.2em;">01 — Sign Up</div>
                    <div class="font-sans font-semibold mb-1" style="font-size:11px; color:#f0f0f0;">Start your free 24h trial</div>
                    <p style="font-size:9px; color:#6e7680; line-height:1.6; margin:0;">No credit card. Browser-based. All 10 feature tabs unlocked immediately.</p>
                </div>

                <!-- Step 2 -->
                <div class="reveal d1 mb-6" style="position:relative;">
                    <div style="position:absolute; left:-28px; top:3px; width:15px; height:15px; border:1px solid rgba(0,212,170,0.3); background:#0a0d12; display:flex; align-items:center; justify-content:center;">
                        <div style="width:5px; height:5px; background:rgba(0,212,170,0.3); border-radius:50%;"></div>
                    </div>
                    <div class="font-mono uppercase mb-1" style="font-size:7px; color:rgba(0,212,170,0.45); letter-spacing:0.2em;">02 — Explore</div>
                    <div class="font-sans font-semibold mb-1" style="font-size:11px; color:#c9d1d9;">Configure your watchlist</div>
                    <p style="font-size:9px; color:#6e7680; line-height:1.6; margin:0;">Add your stocks. Live prices, sector data, macro signals, and portfolio tools.</p>
                </div>

                <!-- Step 3 -->
                <div class="reveal d2" style="position:relative;">
                    <div style="position:absolute; left:-28px; top:3px; width:15px; height:15px; border:1px solid rgba(0,212,170,0.12); background:#0a0d12; display:flex; align-items:center; justify-content:center;">
                        <div style="width:5px; height:5px; background:rgba(0,212,170,0.12); border-radius:50%;"></div>
                    </div>
                    <div class="font-mono uppercase mb-1" style="font-size:7px; color:rgba(0,212,170,0.22); letter-spacing:0.2em;">03 — Research</div>
                    <div class="font-sans font-semibold mb-1" style="font-size:11px; color:#6e7680;">Generate your AI report</div>
                    <p style="font-size:9px; color:#4a5568; line-height:1.6; margin:0;">9-section institutional research, grounded in live data. Under 2 minutes.</p>
                </div>
            </div>
        </div>

        <!-- Right: AI report preview card -->
        <div class="reveal d1 flex flex-col justify-center px-8 py-8" style="background:#0c0f14;">
            <div class="font-mono uppercase mb-2.5" style="font-size:6px; color:#3a4555; letter-spacing:0.2em;">APEX AI Equity Report · Sample</div>

            <div style="background:#111418; border:1px solid #1e2530; border-top:2px solid #00d4aa; font-family:Inter,sans-serif;">

                <!-- Report header -->
                <div class="flex items-center justify-between" style="padding:10px 14px; border-bottom:1px solid #1e2530;">
                    <div>
                        <div style="font-size:13px; font-weight:700; color:#f0f0f0;">AAPL <span style="font-size:9px; font-weight:300; color:#6e7680;">· Apple Inc.</span></div>
                        <div style="font-size:7px; color:#4a5568; margin-top:1px;">NASDAQ · Generated today</div>
                    </div>
                    <div class="flex flex-col items-end" style="gap:3px;">
                        <div style="padding:3px 9px; background:rgba(0,212,170,0.1); border:1px solid rgba(0,212,170,0.3); font-size:8px; font-weight:700; color:#00d4aa; letter-spacing:0.1em;">STRONG BUY</div>
                        <div style="font-size:7px; color:#6e7680;">Price target · Moderate risk</div>
                    </div>
                </div>

                <div style="padding:12px 14px; display:flex; flex-direction:column; gap:9px;">

                    <!-- Row 1: 2-col highlights -->
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
                        <div class="flex" style="gap:8px; align-items:flex-start;">
                            <div style="width:22px; height:22px; background:linear-gradient(135deg,rgba(0,212,170,0.15),rgba(0,212,170,0.05)); border:1px solid rgba(0,212,170,0.25); display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:1px;">
                                <i data-lucide="file-text" style="width:10px; height:10px; color:#00d4aa;"></i>
                            </div>
                            <div>
                                <div style="font-size:8px; font-weight:600; color:#c9d1d9; margin-bottom:2px;">Thesis + Catalysts</div>
                                <div style="font-size:7px; color:#6e7680; line-height:1.5;">Investment case + 4 near & mid-term drivers</div>
                            </div>
                        </div>
                        <div class="flex" style="gap:8px; align-items:flex-start;">
                            <div style="width:22px; height:22px; background:linear-gradient(135deg,rgba(0,212,170,0.15),rgba(0,212,170,0.05)); border:1px solid rgba(0,212,170,0.25); display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:1px;">
                                <i data-lucide="bar-chart-2" style="width:10px; height:10px; color:#00d4aa;"></i>
                            </div>
                            <div>
                                <div style="font-size:8px; font-weight:600; color:#c9d1d9; margin-bottom:2px;">Financials + DCF</div>
                                <div style="font-size:7px; color:#6e7680; line-height:1.5;">3yr tables, valuation model, peer multiples</div>
                            </div>
                        </div>
                    </div>

                    <!-- Divider -->
                    <div style="height:1px; background:rgba(255,255,255,0.04);"></div>

                    <!-- Price scenarios -->
                    <div>
                        <div class="font-mono uppercase mb-1.5" style="font-size:6px; color:#4a5568; letter-spacing:0.16em;">Price Scenarios</div>
                        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:5px;">
                            <div style="background:#0a0d12; border:1px solid #1a2030; padding:6px 8px; text-align:center;">
                                <div style="font-size:6px; color:#f85149; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:2px;">Bear</div>
                                <div style="font-size:10px; font-weight:600; color:#8a9ab0;">$158</div>
                            </div>
                            <div style="background:rgba(0,212,170,0.05); border:1px solid rgba(0,212,170,0.22); padding:6px 8px; text-align:center;">
                                <div style="font-size:6px; color:#00d4aa; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:2px;">Base ★</div>
                                <div style="font-size:10px; font-weight:700; color:#f0f0f0;">$248</div>
                            </div>
                            <div style="background:#0a0d12; border:1px solid #1a2030; padding:6px 8px; text-align:center;">
                                <div style="font-size:6px; color:#3fb950; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:2px;">Bull</div>
                                <div style="font-size:10px; font-weight:600; color:#8a9ab0;">$310</div>
                            </div>
                        </div>
                    </div>

                    <!-- Divider -->
                    <div style="height:1px; background:rgba(255,255,255,0.04);"></div>

                    <!-- Analyst consensus -->
                    <div>
                        <div class="font-mono uppercase mb-1.5" style="font-size:6px; color:#4a5568; letter-spacing:0.16em;">Analyst Consensus</div>
                        <div class="flex items-center" style="gap:10px;">
                            <div style="flex:1; display:flex; flex-direction:column; gap:3px;">
                                <div style="display:flex; height:6px; overflow:hidden; gap:1px;">
                                    <div style="flex:18; background:rgba(63,185,80,0.7);"></div>
                                    <div style="flex:7; background:rgba(210,153,34,0.6);"></div>
                                    <div style="flex:3; background:rgba(248,81,73,0.6);"></div>
                                </div>
                                <div class="flex justify-between">
                                    <span style="font-size:6px; color:#3fb950;">18 Buy</span>
                                    <span style="font-size:6px; color:#d29922;">7 Hold</span>
                                    <span style="font-size:6px; color:#f85149;">3 Sell</span>
                                </div>
                            </div>
                            <div style="text-align:right; flex-shrink:0;">
                                <div style="font-size:10px; font-weight:700; color:#f0f0f0;">$241</div>
                                <div style="font-size:6px; color:#6e7680;">mean target</div>
                            </div>
                        </div>
                    </div>

                    <!-- Divider -->
                    <div style="height:1px; background:rgba(255,255,255,0.04);"></div>

                    <!-- Personalised Investment Fit -->
                    <div class="flex items-center" style="background:rgba(0,212,170,0.04); border:1px solid rgba(0,212,170,0.14); padding:9px 11px; gap:10px;">
                        <div style="flex:1;">
                            <div style="font-size:8px; font-weight:600; color:#f0f0f0; margin-bottom:2px;">Personalised Investment Fit</div>
                            <div style="font-size:7px; color:#6e7680; line-height:1.5;">Calibrated to your investor type, time horizon, and risk appetite.</div>
                        </div>
                        <div style="text-align:center; flex-shrink:0;">
                            <div style="font-size:18px; font-weight:700; color:#00d4aa; line-height:1;">4<span style="font-size:10px; color:#4a5568;">/5</span></div>
                            <div style="font-size:6px; color:#6e7680; margin-top:2px;">fit score</div>
                        </div>
                    </div>

                </div>

                <!-- Footer -->
                <div class="flex justify-between" style="padding:6px 14px; background:#0d1015; border-top:1px solid #1e2530;">
                    <div style="font-size:6px; color:#3a4555;">Claude Sonnet 4.6 · Yahoo Finance · Finnhub · Perplexity</div>
                    <div style="font-size:6px; color:#3a4555;">Generated in 1m 47s</div>
                </div>

            </div>
        </div>

    </div>
```

- [ ] **Step 2: Remove the step-connector draw animation from JS** (it references the now-removed SVG paths)

Find (~line 1260):
```js
document.querySelectorAll('.step-connector-path').forEach(p => p.classList.add('drawn'));
```

Replace with:
```js
// step-connector paths removed in How It Works redesign
```

- [ ] **Step 3: Verify in browser**

Scroll to How It Works section. Verify:
- Left half: vertical timeline with glowing step 1 node, fading steps 2 & 3
- Right half: report card with all 5 highlight rows visible
- Lucide icons render inside the report card highlight rows (file-text, bar-chart-2)
- Section stacks vertically on mobile (grid becomes 1-col via Tailwind responsive — note: the grid uses inline style, so add a media query if needed — see Step 4)
- Bottom half (Claude AI section) is untouched

- [ ] **Step 4: Add mobile stacking for the new grid**

In the `<style>` block, find the existing `@media (max-width: 768px)` section and add inside it:
```css
#how > div:first-child { grid-template-columns: 1fr !important; height: auto !important; }
```

This ensures the How It Works split stacks on mobile.

- [ ] **Step 5: Commit**

```bash
cd "/Users/jonas/Documents/apex/landing page"
git add index.html
git commit -m "feat: replace how it works with vertical timeline and AI report preview card"
```

---

## Task 5: Beta Registration — Split Layout

**Files:**
- Modify: `index.html` — `#beta` section (lines 1077–1133)

- [ ] **Step 1: Replace the beta section inner content**

Find (lines 1082–1133) — everything inside the `<section id="beta"...>` after the two absolute overlay divs:
```html
    <div class="max-w-lg mx-auto px-6 relative z-10 w-full">
        <div class="reveal text-center mb-8">
            <img src="logo.png" alt="APEX" width="52" height="52" class="mx-auto mb-5" style="display:block;">
            <span class="font-mono text-[10px] text-apex-muted uppercase tracking-[0.24em]">Early Access</span>
            <h2 class="font-display mt-3 mb-4" style="font-size:52px; line-height:1.05; color:#f0f0f0;">Be first in the door.</h2>
            <p class="text-apex-muted text-[14px] leading-relaxed">
                APEX is in pre-launch. Join the waitlist to get early access, locked-in beta pricing, and first look at new features.
            </p>
        </div>

        <!-- Form panel -->
        <div class="reveal d1" style="background:#111418; border:1px solid #252b34; padding:40px;">
            <form id="beta-form" action="https://formspree.io/f/xbdpzvvv" method="POST" onsubmit="handleSubmit(event)">

                <div class="mb-4">
                    <label class="block text-[11px] font-mono text-apex-muted uppercase tracking-[0.18em] mb-2">First Name</label>
                    <input name="first_name" type="text" required placeholder="Your first name"
                           class="form-input" autocomplete="given-name">
                </div>

                <div class="mb-6">
                    <label class="block text-[11px] font-mono text-apex-muted uppercase tracking-[0.18em] mb-2">Email Address</label>
                    <input name="email" type="email" required placeholder="you@email.com"
                           class="form-input" autocomplete="email">
                </div>

                <button type="submit" id="submit-btn" class="btn-primary w-full text-center uppercase tracking-[0.14em]" style="font-size:0.9rem;">
                    Join Waitlist
                </button>
            </form>

            <!-- Success state -->
            <div id="form-success" class="hidden text-center py-4">
                <div class="text-[28px] mb-3">✓</div>
                <div class="text-apex-text font-medium mb-1">You're on the list.</div>
                <div class="text-apex-muted text-[13px]">We'll be in touch before launch.</div>
            </div>

            <p class="mt-5 text-center text-[11px] font-mono text-apex-muted">
                No spam. No card. You'll hear from us before launch.
            </p>
        </div>

        <!-- Trust signals -->
        <div class="reveal d2 mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[10px] font-mono text-apex-muted uppercase tracking-[0.15em]">
            <span>Browser-based</span>
            <span style="color:#252b34;">·</span>
            <span>Free 24h trial on launch</span>
            <span style="color:#252b34;">·</span>
            <span>No lock-in</span>
        </div>
    </div>
```

Replace with:
```html
    <div class="w-full max-w-5xl mx-auto px-8 relative z-10" style="display:grid; grid-template-columns:1fr 1fr; gap:0; align-items:center; height:100%;">

        <!-- Left: value proposition -->
        <div class="reveal flex flex-col justify-center py-12 pr-12" style="border-right:1px solid #1e2530;">
            <div class="flex items-center gap-2 mb-6">
                <span class="w-1.5 h-1.5 rounded-full bg-apex-accent pulse-live inline-block"></span>
                <span class="font-mono uppercase tracking-[0.22em]" style="font-size:7px; color:#00d4aa;">Beta Live</span>
            </div>
            <h2 class="font-display mb-4 leading-tight" style="font-size:clamp(16px,2vw,24px); font-weight:300; letter-spacing:-0.03em; color:#f0f0f0; line-height:1.2;">
                Research like an institution.<br>
                <span style="color:#00d4aa;">Act like a founder.</span>
            </h2>
            <div class="flex flex-col" style="gap:10px; margin-top:8px;">
                <div class="flex items-center" style="gap:10px;">
                    <div style="width:4px; height:4px; background:#00d4aa; border-radius:50%; flex-shrink:0;"></div>
                    <span style="font-size:13px; color:#6e7680;">AI equity reports in under 2 minutes</span>
                </div>
                <div class="flex items-center" style="gap:10px;">
                    <div style="width:4px; height:4px; background:#00d4aa; border-radius:50%; flex-shrink:0;"></div>
                    <span style="font-size:13px; color:#6e7680;">Personalised investment fit scoring</span>
                </div>
                <div class="flex items-center" style="gap:10px;">
                    <div style="width:4px; height:4px; background:#00d4aa; border-radius:50%; flex-shrink:0;"></div>
                    <span style="font-size:13px; color:#6e7680;">10 research tools, one platform</span>
                </div>
                <div class="flex items-center" style="gap:10px;">
                    <div style="width:4px; height:4px; background:#00d4aa; border-radius:50%; flex-shrink:0;"></div>
                    <span style="font-size:13px; color:#6e7680;">Free 24h trial · No lock-in</span>
                </div>
            </div>
        </div>

        <!-- Right: form -->
        <div class="reveal d1 flex flex-col justify-center py-12 pl-12">
            <div class="font-sans font-semibold mb-6" style="font-size:14px; color:#c9d1d9;">Request early access</div>

            <form id="beta-form" action="https://formspree.io/f/xbdpzvvv" method="POST" onsubmit="handleSubmit(event)">
                <div class="mb-4">
                    <label class="block text-[11px] font-mono text-apex-muted uppercase tracking-[0.18em] mb-2">First Name</label>
                    <input name="first_name" type="text" required placeholder="Your first name"
                           class="form-input" autocomplete="given-name">
                </div>
                <div class="mb-6">
                    <label class="block text-[11px] font-mono text-apex-muted uppercase tracking-[0.18em] mb-2">Email Address</label>
                    <input name="email" type="email" required placeholder="you@email.com"
                           class="form-input" autocomplete="email">
                </div>
                <button type="submit" id="submit-btn" class="btn-primary w-full text-center uppercase tracking-[0.14em]" style="font-size:0.9rem;">
                    Join Waitlist
                </button>
            </form>

            <!-- Success state (keep id for JS handler) -->
            <div id="form-success" class="hidden text-center py-4">
                <div class="text-[28px] mb-3">✓</div>
                <div class="text-apex-text font-medium mb-1">You're on the list.</div>
                <div class="text-apex-muted text-[13px]">We'll be in touch before launch.</div>
            </div>

            <p class="mt-5 text-[11px] font-mono text-apex-muted" style="color:#4a5568;">
                Browser-based · No credit card required
            </p>
        </div>

    </div>
```

- [ ] **Step 2: Add mobile stacking for beta grid**

In the `@media (max-width: 768px)` block in `<style>`, add:
```css
#beta > div:last-child { grid-template-columns: 1fr !important; height: auto !important; padding: 3rem 1.5rem !important; }
#beta > div:last-child > div:first-child { border-right: none !important; padding-right: 0 !important; border-bottom: 1px solid #1e2530; padding-bottom: 2rem !important; }
#beta > div:last-child > div:last-child { padding-left: 0 !important; padding-top: 2rem !important; }
```

- [ ] **Step 3: Verify in browser**

Scroll to Beta section. Verify:
- Left half: "● Beta Live" pulse, headline with teal second line, 4 bullets
- Right half: "Request early access" label, First Name + Email inputs, JOIN WAITLIST button
- Form submits correctly (test with a real submission or check Formspree handler fires)
- Success state (`#form-success`) appears after submit (JS handler unchanged)
- Existing grid background and radial teal glow still visible
- Mobile: stacks left over right, border becomes bottom border on left block

- [ ] **Step 4: Commit**

```bash
cd "/Users/jonas/Documents/apex/landing page"
git add index.html
git commit -m "feat: restructure beta registration as split value-props + form layout"
```

---

## Task 6: Final Verification Pass

- [ ] **Step 1: Full page visual walkthrough**

Open `index.html` in browser and run through the full verification checklist:

- [ ] Nav: "Investment Intelligence" subtitle visible below APEX wordmark
- [ ] Nav: "● Beta Live" pulse dot left of CTA on desktop (hidden on mobile)
- [ ] Nav scroll: frosted glass + teal hairline (`box-shadow: 0 1px 0 0 rgba(0,212,170,0.15)`)
- [ ] Features: cards have `#111418` bg + gradient icon boxes
- [ ] Features: hover shows top-edge glow + teal border + box-shadow
- [ ] Features: "— Explore" text fades in on hover for 9 clickable cards; absent on card 10
- [ ] Features: clicking any card still opens the feature modal correctly
- [ ] How It Works: vertical timeline left, report preview right
- [ ] How It Works: Lucide icons render in report card (file-text, bar-chart-2)
- [ ] How It Works: all 5 report card rows visible (thesis, financials, scenarios, consensus, fit)
- [ ] How It Works: Claude AI bottom band untouched
- [ ] Beta: split layout, left bullets, right form
- [ ] Beta: form submit triggers `handleSubmit`, success state appears
- [ ] Scroll snap: all 5 page sections snap correctly on desktop
- [ ] Mobile (375px): How It Works stacks, Beta stacks, scroll snap disabled

- [ ] **Step 2: Final commit**

```bash
cd "/Users/jonas/Documents/apex/landing page"
git add index.html
git commit -m "chore: apex landing page ui revamp complete — nav, features, how it works, beta"
```
