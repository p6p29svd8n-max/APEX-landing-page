/* V1 — QUANT TERMINAL (refined dark) */
const { useEffect: useEffect1, useRef: useRef1, useState: useState1 } = React;

/* ---------- Hero animated background: drifting grid + data nodes ---------- */
function V1HeroBg() {
  const canvasRef = useRef1(null);
  useEffect1(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext('2d');
    let w, h, dpr, raf;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = c.clientWidth; h = c.clientHeight;
      c.width = w * dpr; c.height = h * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const N = 40;
    const nodes = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.4 + 0.5,
      p: Math.random() * Math.PI * 2,
    }));

    let t0 = 0;
    const tick = (t) => {
      const dt = Math.min(32, t - t0); t0 = t;
      ctx.clearRect(0, 0, w, h);

      // subtle grid dots
      ctx.fillStyle = 'rgba(255,255,255,0.025)';
      const gap = 44;
      for (let x = (t * 0.01) % gap; x < w; x += gap) {
        for (let y = 0; y < h; y += gap) ctx.fillRect(x, y, 1, 1);
      }

      // nodes + connections
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const d2 = dx*dx + dy*dy;
          if (d2 < 160*160) {
            const a = (1 - Math.sqrt(d2)/160) * 0.18;
            ctx.strokeStyle = `rgba(0,212,170,${a})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        n.p += 0.02;
        const alpha = 0.4 + 0.35 * Math.sin(n.p);
        ctx.fillStyle = `rgba(0,212,170,${alpha * 0.6})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
      {/* ambient orbs */}
      <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', top: '-200px', left: '-200px', background: 'radial-gradient(circle, rgba(0,212,170,0.08), transparent 70%)', filter: 'blur(40px)' }} />
      <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', bottom: '-150px', right: '-150px', background: 'radial-gradient(circle, rgba(0,212,170,0.05), transparent 70%)', filter: 'blur(50px)' }} />
      {/* top/bottom fades */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,13,18,0.4) 0%, transparent 20%, transparent 70%, var(--bg) 100%)' }} />
    </>
  );
}

/* ---------- Hero ---------- */
function V1Hero() {
  return (
    <section id="top" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', paddingTop: 96, paddingBottom: 40 }}>
      <V1HeroBg />
      <div style={{ position: 'relative', maxWidth: 1320, margin: '0 auto', padding: '0 clamp(24px, 4vw, 80px)', minHeight: 'calc(100vh - 140px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="reveal" style={{ marginBottom: 24 }}>
          <span className="chip"><span className="dot"/>Beta registration live</span>
        </div>
        <h1 className="reveal d1 display" style={{ fontSize: 'clamp(44px, 6.8vw, 96px)', lineHeight: 1.02, margin: 0, maxWidth: '16ch', color: 'var(--ink)' }}>
          Institutional research.<br />
          <span style={{ color: 'var(--accent)' }}>Built for you.</span>
        </h1>
        <p className="reveal d2" style={{ fontSize: 'clamp(16px, 1.3vw, 19px)', lineHeight: 1.6, color: 'var(--ink-3)', maxWidth: '52ch', marginTop: 28 }}>
          Aurealis is an AI-powered investment research platform that generates on-demand equity reports, tracks your portfolio, and monitors the macro cycle — in a single, browser-based dashboard.
        </p>
        <div className="reveal d3" style={{ display: 'flex', gap: 14, marginTop: 36, flexWrap: 'wrap' }}>
          <a href="#beta" className="btn btn-primary">Request early access <Icon name="arrow" size={14} /></a>
          <a href="#features" className="btn btn-ghost">Explore features ↓</a>
        </div>
        <div className="reveal d4" style={{ display: 'flex', gap: 28, marginTop: 48, flexWrap: 'wrap' }}>
          {[
            ['Free 24h trial', 'on launch'],
            ['Browser-based', 'no install'],
            ['4 data sources', 'independent'],
            ['Under 2 min', 'per report'],
          ].map(([a, b]) => (
            <div key={a} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span className="mono" style={{ fontSize: 10, color: 'var(--ink-4)' }}>{b}</span>
              <span style={{ fontSize: 14, color: 'var(--ink-2)' }}>{a}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <TickerRibbon />
      </div>
    </section>
  );
}

/* ---------- Product shot section ---------- */
function V1Product() {
  return (
    <section className="sect" style={{ paddingTop: 'calc(60px * var(--density))' }}>
      <div className="sect-inner">
        <div className="reveal" style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 28 }}>
          <span className="eyebrow">The Cockpit</span>
          <span className="mono" style={{ fontSize: 10, color: 'var(--ink-4)' }}>OVERVIEW / LIVE</span>
        </div>
        <div className="reveal d1" style={{ position: 'relative', border: '1px solid var(--line)', background: 'var(--surface)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderBottom: '1px solid var(--line)', background: 'var(--bg-2)' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f85149' }} />
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#d29922' }} />
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />
            <span className="mono" style={{ fontSize: 10, color: 'var(--ink-4)', marginLeft: 14 }}>aurealis.local · overview</span>
            <span style={{ marginLeft: 'auto' }} className="chip"><span className="dot"/>LIVE</span>
          </div>
          <img src="../assets/dashboard-overview.png" alt="Aurealis dashboard"
            style={{ display: 'block', width: '100%', height: 'auto', opacity: 0.95 }} />
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'linear-gradient(180deg, transparent 60%, rgba(10,13,18,0.4) 100%)' }} />
        </div>
      </div>
    </section>
  );
}

/* ---------- Features split ---------- */
function V1Features() {
  return (
    <section id="features" className="sect">
      <div className="sect-inner">
        <div className="reveal" style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8, gap: 20, flexWrap: 'wrap' }}>
          <span className="eyebrow">What you get — MVP</span>
          <span className="mono" style={{ fontSize: 10, color: 'var(--ink-4)' }}>06 / CURRENT · 03 / PLANNED</span>
        </div>
        <h2 className="reveal d1 display" style={{ fontSize: 'clamp(32px, 4vw, 56px)', margin: '0 0 16px', color: 'var(--ink)', maxWidth: '20ch' }}>
          Everything you need on day one.
        </h2>
        <p className="reveal d2" style={{ fontSize: 15, color: 'var(--ink-3)', maxWidth: '60ch', marginBottom: 48, lineHeight: 1.6 }}>
          Six core tools live at beta. Three more land in the months after — each unlocked automatically as they ship.
        </p>
        <div className="reveal d2 feat-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {FEATURES_MVP.map((f, i) => (
            <article key={i} className="feat-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span className="feat-icon"><Icon name={f.icon} size={16} /></span>
                <span className="mono" style={{ fontSize: 10, color: 'var(--ink-4)' }}>0{i + 1}</span>
              </div>
              <h3 className="feat-title">{f.title}</h3>
              <p className="feat-desc">{f.desc}</p>
              <span className="mono" style={{ fontSize: 10, color: 'var(--accent)', marginTop: 'auto', paddingTop: 10, borderTop: '1px solid var(--line)', letterSpacing: '0.2em' }}>LIVE AT BETA</span>
            </article>
          ))}
        </div>

        <div className="reveal" style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', margin: '80px 0 24px', gap: 20, flexWrap: 'wrap' }}>
          <span className="eyebrow-muted">Planned — post-beta</span>
          <span className="mono" style={{ fontSize: 10, color: 'var(--ink-5)' }}>ROADMAP / IN DEVELOPMENT</span>
        </div>
        <div className="reveal d1 feat-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {FEATURES_PLANNED.map((f, i) => (
            <article key={i} className="feat-card planned">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span className="feat-icon" style={{ background: 'transparent', borderColor: 'var(--line-2)', color: 'var(--ink-4)' }}>
                  <Icon name={f.icon} size={16} />
                </span>
                <span className="mono" style={{ fontSize: 10, color: 'var(--ink-5)' }}>{String(FEATURES_MVP.length + i + 1).padStart(2,'0')}</span>
              </div>
              <h3 className="feat-title" style={{ color: 'var(--ink-2)' }}>{f.title}</h3>
              <p className="feat-desc">{f.desc}</p>
              <span className="mono" style={{ fontSize: 10, color: 'var(--ink-5)', marginTop: 'auto', paddingTop: 10, borderTop: '1px solid var(--line)', letterSpacing: '0.2em' }}>IN DEVELOPMENT</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- How it works ---------- */
function V1How() {
  return (
    <section id="how" className="sect" style={{ borderTop: '1px solid var(--line)', background: 'var(--bg-2)' }}>
      <div className="sect-inner">
        <div className="reveal" style={{ marginBottom: 16 }}>
          <span className="eyebrow">How it works</span>
        </div>
        <h2 className="reveal d1 display" style={{ fontSize: 'clamp(32px, 4vw, 56px)', margin: '0 0 64px', color: 'var(--ink)', maxWidth: '20ch' }}>
          Three steps to institutional insight.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: '1px solid var(--line)', background: 'var(--line)' }}>
          {STEPS.map((s, i) => (
            <div key={i} className={`reveal d${i+1}`} style={{ background: 'var(--surface)', padding: 'calc(36px * var(--density)) 32px', position: 'relative' }}>
              <div className="display" style={{
                position: 'absolute', top: 8, right: 16, fontSize: 120, color: 'var(--accent-dim)',
                lineHeight: 1, pointerEvents: 'none', fontWeight: 200
              }}>{s.n}</div>
              <span className="mono" style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '0.25em' }}>{s.n} — {s.kicker}</span>
              <h3 className="display" style={{ fontSize: 24, margin: '20px 0 14px', color: 'var(--ink)', fontWeight: 400, position: 'relative' }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.6, margin: 0, maxWidth: '32ch' }}>{s.body}</p>
            </div>
          ))}
        </div>
        <div className="reveal d3" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, marginTop: 40, border: '1px solid var(--line)', background: 'var(--line)' }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ background: 'var(--surface)', padding: '24px', textAlign: 'center' }}>
              <div className="display" style={{ fontSize: 48, color: s.accent ? 'var(--accent)' : 'var(--ink)', lineHeight: 1, fontWeight: 200 }}>{s.value}</div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--ink-4)', marginTop: 10 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Sample report ---------- */
function V1Sample() {
  return (
    <section id="tech" className="sect">
      <div className="sect-inner" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 60, alignItems: 'start' }}>
        <div>
          <div className="reveal" style={{ marginBottom: 16 }}><span className="eyebrow">Sample Output</span></div>
          <h2 className="reveal d1 display" style={{ fontSize: 'clamp(30px, 3.4vw, 48px)', margin: '0 0 20px', color: 'var(--ink)', maxWidth: '18ch' }}>
            Structured research. Not chatbot output.
          </h2>
          <p className="reveal d2" style={{ fontSize: 15, color: 'var(--ink-3)', lineHeight: 1.7, marginBottom: 28 }}>
            Nine sections. Every report. Every ticker. Grounded in live data from Yahoo Finance, SEC Edgar, FRED and Perplexity — layered with Claude Sonnet 4.6 reasoning and typed against a strict JSON schema.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              ['Personalised investment fit', 'calibrated per risk profile & horizon'],
              ['Full DCF model', 'WACC & terminal growth sensitivity'],
              ['Catalyst & risk extraction', 'enriched by live web research'],
              ['Self-hosted runtime', 'portfolio data never leaves your device'],
            ].map(([a, b], i) => (
              <li key={i} className={`reveal d${i+1}`} style={{ display: 'grid', gridTemplateColumns: '20px 1fr', gap: 14, paddingBottom: 14, borderBottom: '1px solid var(--line)' }}>
                <span style={{ color: 'var(--accent)' }}><Icon name="check" size={16} /></span>
                <div>
                  <div style={{ fontSize: 14, color: 'var(--ink)', fontWeight: 500 }}>{a}</div>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--ink-4)', marginTop: 4 }}>{b}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal d2" style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderTop: '2px solid var(--accent)', fontFamily: 'var(--font-body)' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 18, color: 'var(--ink)', fontWeight: 500 }}>AAPL · <span style={{ color: 'var(--ink-3)', fontWeight: 400 }}>Apple Inc.</span></div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--ink-4)', marginTop: 4 }}>NASDAQ · GENERATED TODAY · $187.42</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="mono" style={{ background: 'var(--accent)', color: 'var(--accent-fg)', display: 'inline-block', padding: '5px 10px', fontSize: 10, letterSpacing: '0.2em', fontWeight: 700 }}>STRONG BUY</div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--ink-4)', marginTop: 6 }}>TARGET $248 · MODERATE RISK</div>
            </div>
          </div>
          <div style={{ padding: '18px 20px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--line)' }}>
            {[
              ['P/E Fwd', '28.4×', false],
              ['Rev Growth', '+7.8%', 'pos'],
              ['EPS Fwd', '$7.33', false],
              ['FCF Yield', '3.6%', 'pos'],
            ].map(([l, v, c], i) => (
              <div key={i} style={{ background: 'var(--bg-2)', padding: '10px', textAlign: 'center' }}>
                <div className="mono" style={{ fontSize: 9, color: 'var(--ink-4)' }}>{l}</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: c === 'pos' ? 'var(--pos)' : 'var(--ink)', marginTop: 6 }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: 20, borderBottom: '1px solid var(--line)' }}>
            <div className="mono" style={{ fontSize: 10, color: 'var(--ink-4)', letterSpacing: '0.2em', marginBottom: 12 }}>PRICE SCENARIOS</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              <ScenarioCell label="Bear" value="$158" color="var(--neg)" />
              <ScenarioCell label="Base ★" value="$248" color="var(--accent)" bold />
              <ScenarioCell label="Bull" value="$310" color="var(--pos)" />
            </div>
          </div>
          <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="mono" style={{ fontSize: 10, color: 'var(--ink-4)' }}>ANALYST CONSENSUS</div>
              <div style={{ display: 'flex', gap: 8, fontSize: 11 }}>
                <span style={{ color: 'var(--pos)' }}>18 Buy</span>
                <span style={{ color: 'var(--ink-4)' }}>·</span>
                <span style={{ color: 'var(--ink-3)' }}>7 Hold</span>
                <span style={{ color: 'var(--ink-4)' }}>·</span>
                <span style={{ color: 'var(--neg)' }}>3 Sell</span>
              </div>
            </div>
            <div style={{ position: 'relative', height: 6, background: 'var(--bg-2)', borderRadius: 2 }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '64%', background: 'var(--accent)' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="mono" style={{ fontSize: 9, color: 'var(--ink-4)' }}>MEAN TARGET</span>
              <span style={{ fontSize: 14, color: 'var(--ink)', fontWeight: 600 }}>$241</span>
            </div>
          </div>
          <div style={{ padding: '10px 20px', background: 'var(--bg-2)', borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between' }}>
            <span className="mono" style={{ fontSize: 9, color: 'var(--ink-5)' }}>CLAUDE SONNET 4.6 · MARKETS API · PERPLEXITY</span>
            <span className="mono" style={{ fontSize: 9, color: 'var(--ink-5)' }}>GENERATED IN 1M 47S</span>
          </div>
        </div>
      </div>
    </section>
  );
}
function ScenarioCell({ label, value, color, bold }) {
  return (
    <div style={{ background: 'var(--bg-2)', border: '1px solid var(--line)', padding: '10px', textAlign: 'center' }}>
      <div className="mono" style={{ fontSize: 9, color, letterSpacing: '0.15em' }}>{label}</div>
      <div style={{ fontSize: 16, color: bold ? 'var(--ink)' : 'var(--ink-2)', fontWeight: bold ? 700 : 500, marginTop: 5 }}>{value}</div>
    </div>
  );
}

/* ---------- Pricing ---------- */
function V1Pricing() {
  const [annual, setAnnual] = useState1(false);
  return (
    <section id="pricing" className="sect" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="sect-inner">
        <div className="reveal" style={{ marginBottom: 16 }}><span className="eyebrow">Pricing</span></div>
        <div className="reveal d1" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 40, flexWrap: 'wrap', gap: 20 }}>
          <h2 className="display" style={{ fontSize: 'clamp(32px, 4vw, 56px)', margin: 0, color: 'var(--ink)' }}>
            Simple, transparent tiers.
          </h2>
          <div style={{ display: 'flex', background: 'var(--surface)', border: '1px solid var(--line)', padding: 3 }}>
            {['Monthly', 'Annual'].map((lbl, i) => {
              const active = (i === 1) === annual;
              return (
                <button key={lbl} onClick={() => setAnnual(i === 1)}
                  className="mono"
                  style={{ padding: '8px 18px', background: active ? 'var(--accent)' : 'transparent', color: active ? 'var(--accent-fg)' : 'var(--ink-3)', border: 'none', cursor: 'pointer', fontSize: 10, letterSpacing: '0.2em' }}>
                  {lbl}{i === 1 ? ' · -17%' : ''}
                </button>
              );
            })}
          </div>
        </div>
        <div className="reveal d2 price-grid">
          {PRICING.map((p, i) => (
            <div key={i} className={`price-card ${p.featured ? 'featured' : ''}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="price-name">{p.name}</span>
                {p.badge && <span className="mono" style={{ fontSize: 9, padding: '3px 8px', background: p.featured ? 'var(--accent)' : 'var(--accent-soft)', color: p.featured ? 'var(--accent-fg)' : 'var(--accent)', letterSpacing: '0.15em' }}>{p.badge}</span>}
              </div>
              <div>
                <div className="price-value">{annual ? p.price.yr : p.price.mo}</div>
                <div className="price-unit">{annual ? p.unit.yr : p.unit.mo}</div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.55, minHeight: 48 }}>{p.blurb}</div>
              <ul className="price-list">
                {p.features.map((f, j) => <li key={j} className={f.on ? '' : 'off'}>{f.t}</li>)}
              </ul>
              <a href="#beta" className="btn btn-ghost" style={{ marginTop: 'auto', justifyContent: 'center', borderColor: p.featured ? 'var(--accent)' : 'var(--line-2)', color: p.featured ? 'var(--accent)' : 'var(--ink)' }}>{p.cta}</a>
            </div>
          ))}
        </div>
        <div className="reveal d3 mono" style={{ fontSize: 10, color: 'var(--ink-4)', marginTop: 20, letterSpacing: '0.1em' }}>
          Need more? Buy extra reports from €0.99 · Credits never expire · Annual saves 2 months
        </div>
      </div>
    </section>
  );
}

/* ---------- Beta ---------- */
function V1Beta() {
  return (
    <section id="beta" className="sect" style={{ borderTop: '1px solid var(--line)', background: 'var(--bg-2)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(0,212,170,0.06), transparent 70%)', pointerEvents: 'none' }} />
      <div className="sect-inner" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 80, alignItems: 'center' }}>
        <div>
          <div className="reveal" style={{ marginBottom: 16 }}><span className="chip"><span className="dot"/>Beta live</span></div>
          <h2 className="reveal d1 display" style={{ fontSize: 'clamp(38px, 4.6vw, 68px)', margin: 0, color: 'var(--ink)', lineHeight: 1.05, maxWidth: '16ch' }}>
            Research like an institution.<br />
            <span style={{ color: 'var(--accent)' }}>Invest like a pro.</span>
          </h2>
          <ul className="reveal d2" style={{ listStyle: 'none', padding: 0, margin: '36px 0 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, maxWidth: 520 }}>
            {[
              'AI equity reports in under 2 minutes',
              'Personalised investment fit scoring',
              '10 research tools, one platform',
              'Free 24h trial · No lock-in',
            ].map((t, i) => (
              <li key={i} style={{ display: 'flex', gap: 10, fontSize: 13, color: 'var(--ink-2)', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--accent)', marginTop: 2 }}><Icon name="check" size={14}/></span>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="reveal d2" style={{ background: 'var(--surface)', border: '1px solid var(--line)', padding: 32, position: 'relative' }}>
          <div className="corners"><span/></div>
          <div className="mono" style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: 20 }}>Request early access</div>
          <BetaForm />
        </div>
      </div>
    </section>
  );
}

/* ---------- V1 Root ---------- */
function V1({ density }) {
  useReveal();
  return (
    <div className={`variation-root v1 density-${density}`}>
      <Nav variant="v1" />
      <V1Hero />
      <V1Product />
      <V1Features />
      <V1How />
      <V1Sample />
      <V1Pricing />
      <V1Beta />
      <Footer />
    </div>
  );
}
window.V1 = V1;
