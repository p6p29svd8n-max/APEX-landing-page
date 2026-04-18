/* V3 — RESEARCH STATION (light quant) */
const { useEffect: useEffect3, useRef: useRef3, useState: useState3 } = React;

/* ---------- Hero bg: radar sweep + data ticks ---------- */
function V3HeroBg() {
  const svgRef = useRef3(null);
  useEffect3(() => {
    const svg = svgRef.current; if (!svg) return;
    let raf;
    const start = performance.now();
    const sweep = svg.querySelector('#sweep');
    const ticks = svg.querySelectorAll('[data-tick]');
    const tick = (t) => {
      const dt = (t - start) / 1000;
      sweep.setAttribute('transform', `rotate(${(dt * 18) % 360} 600 400)`);
      ticks.forEach((el, i) => {
        const phase = dt - i * 0.08;
        const v = Math.max(0, Math.sin(phase * 2) * 0.5 + 0.1);
        el.setAttribute('opacity', v.toFixed(2));
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* graph paper */}
      <div style={{ position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(10,10,10,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,10,0.04) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 90%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 90%)',
      }} />
      <svg ref={svgRef} viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.7 }}>
        <defs>
          <radialGradient id="sweepgrad">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="centerglow">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="600" cy="400" r="400" fill="url(#centerglow)" />
        {/* concentric rings */}
        {[100, 200, 300, 400].map(r => (
          <circle key={r} cx="600" cy="400" r={r} fill="none"
            stroke="var(--ink-4)" strokeWidth="0.35" strokeDasharray="3 5" opacity="0.35" />
        ))}
        {/* crosshair */}
        <line x1="0" y1="400" x2="1200" y2="400" stroke="var(--ink-4)" strokeWidth="0.4" strokeDasharray="2 6" opacity="0.35" />
        <line x1="600" y1="0" x2="600" y2="800" stroke="var(--ink-4)" strokeWidth="0.4" strokeDasharray="2 6" opacity="0.35" />
        {/* ticks */}
        {Array.from({length: 24}).map((_, i) => {
          const a = (i / 24) * Math.PI * 2;
          const r = 120 + (i % 5) * 50;
          const x = 600 + Math.cos(a) * r;
          const y = 400 + Math.sin(a) * r;
          return <circle key={i} data-tick cx={x} cy={y} r="3" fill="var(--accent)" opacity="0.3" />;
        })}
        {/* sweep wedge */}
        <g id="sweep">
          <path d="M 600 400 L 1000 400 A 400 400 0 0 1 860 680 Z" fill="url(#sweepgrad)" />
          <line x1="600" y1="400" x2="1000" y2="400" stroke="var(--accent)" strokeWidth="0.8" opacity="0.7" />
        </g>
        {/* center */}
        <circle cx="600" cy="400" r="4" fill="var(--accent)" />
        <circle cx="600" cy="400" r="12" fill="none" stroke="var(--accent)" strokeWidth="0.5" />
      </svg>
      {/* corner annotations */}
      <div style={{ position: 'absolute', top: 100, left: 24, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-4)', letterSpacing: '0.2em' }}>
        R · 01<br/>LAT 40.71 · LON -74.00<br/>DATA: LIVE
      </div>
      <div style={{ position: 'absolute', bottom: 60, right: 24, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-4)', letterSpacing: '0.2em', textAlign: 'right' }}>
        RECESSION SIGNAL<br/>0.24 · CAUTION<br/>11 / 11 INPUTS
      </div>
    </div>
  );
}

/* ---------- Hero ---------- */
function V3Hero() {
  return (
    <section id="top" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', paddingTop: 110, display: 'flex', alignItems: 'center' }}>
      <V3HeroBg />
      <div style={{ position: 'relative', maxWidth: 1240, margin: '0 auto', padding: '0 clamp(24px, 4vw, 80px)', width: '100%' }}>
        <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
          <span className="chip"><span className="dot"/>BETA LIVE</span>
          <span className="mono" style={{ fontSize: 10, color: 'var(--ink-4)' }}>— v0.9.3 · built 18.04.26</span>
        </div>
        <h1 className="reveal d1 display" style={{ fontSize: 'clamp(44px, 6.8vw, 104px)', lineHeight: 1.0, margin: 0, color: 'var(--ink)', maxWidth: '16ch' }}>
          A research desk,<br/>
          engineered for <span style={{ color: 'var(--accent)' }}>signal.</span>
        </h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 60, marginTop: 48, alignItems: 'start' }}>
          <p className="reveal d2" style={{ fontSize: 17, color: 'var(--ink-2)', lineHeight: 1.65, margin: 0, maxWidth: '52ch' }}>
            Aurealis is a browser-based investment research platform. It generates on-demand equity reports, tracks your portfolio and monitors eleven macroeconomic signals — calibrated to your risk profile, grounded in live data from four independent sources.
          </p>
          <div className="reveal d3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, padding: 16, border: '1px solid var(--line-2)', background: 'color-mix(in oklab, var(--surface) 92%, transparent)', backdropFilter: 'blur(8px)' }}>
            {[
              ['SECTIONS', '9'], ['SOURCES', '4'],
              ['TIME / RPT', '<2m'], ['SIGNALS', '11'],
            ].map(([l, v], i) => (
              <div key={i} style={{ borderLeft: '1px solid var(--accent)', paddingLeft: 10 }}>
                <div className="mono" style={{ fontSize: 9, color: 'var(--ink-4)' }}>{l}</div>
                <div className="display" style={{ fontSize: 26, color: 'var(--ink)', lineHeight: 1, marginTop: 4 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="reveal d4" style={{ display: 'flex', gap: 14, marginTop: 44, flexWrap: 'wrap' }}>
          <a href="#beta" className="btn btn-primary">Request early access <Icon name="arrow" size={14} /></a>
          <a href="#features" className="btn btn-ghost">Specs & features ↓</a>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <TickerRibbon />
      </div>
    </section>
  );
}

/* ---------- Product ---------- */
function V3Product() {
  return (
    <section className="sect" style={{ paddingTop: 'calc(60px * var(--density))' }}>
      <div className="sect-inner">
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '180px 1fr 180px', alignItems: 'end', gap: 40, marginBottom: 24 }}>
          <span className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.22em' }}>FIG. 01 — OVERVIEW</span>
          <div style={{ borderBottom: '1px solid var(--line-2)' }} />
          <span className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.22em', textAlign: 'right' }}>LIVE / WATCHLIST</span>
        </div>
        <div className="reveal d1" style={{ position: 'relative', border: '1px solid var(--line-2)' }}>
          <img src="../assets/dashboard-overview.png" alt="Aurealis dashboard" style={{ display: 'block', width: '100%', height: 'auto' }} />
          <div style={{ position: 'absolute', top: 12, left: 12, fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink-3)', letterSpacing: '0.2em', padding: '4px 8px', background: 'var(--surface)', border: '1px solid var(--line-2)' }}>
            ANNOT. A — WATCHLIST TABLE (37 POS)
          </div>
          <div style={{ position: 'absolute', top: 12, right: 12, fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink-3)', letterSpacing: '0.2em', padding: '4px 8px', background: 'var(--surface)', border: '1px solid var(--line-2)' }}>
            ANNOT. B — RECESSION RADAR
          </div>
          <div style={{ position: 'absolute', bottom: 12, right: 12, fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink-3)', letterSpacing: '0.2em', padding: '4px 8px', background: 'var(--surface)', border: '1px solid var(--line-2)' }}>
            ANNOT. C — PORTFOLIO
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Features ---------- */
function V3Features() {
  return (
    <section id="features" className="sect" style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--line-2)' }}>
      <div className="sect-inner">
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '80px 1fr 80px', gap: 24, alignItems: 'baseline', marginBottom: 48 }}>
          <span className="mono" style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '0.3em' }}>§ 01</span>
          <h2 className="display" style={{ fontSize: 'clamp(32px, 4.2vw, 56px)', margin: 0, color: 'var(--ink)', maxWidth: '22ch' }}>
            What ships on day one.
          </h2>
          <span className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.22em', textAlign: 'right' }}>06 / CORE</span>
        </div>
        <div className="feat-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {FEATURES_MVP.map((f, i) => (
            <article key={i} className={`feat-card reveal d${(i % 4) + 1}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 12, borderBottom: '1px solid var(--line-2)' }}>
                <span className="feat-icon"><Icon name={f.icon} size={16} /></span>
                <span className="mono" style={{ fontSize: 9, color: 'var(--accent)', letterSpacing: '0.25em' }}>MVP</span>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'baseline', marginTop: 6 }}>
                <span className="mono" style={{ fontSize: 9, color: 'var(--ink-4)' }}>§ {String(i + 1).padStart(2, '0')}</span>
                <h3 className="feat-title">{f.title}</h3>
              </div>
              <p className="feat-desc">{f.desc}</p>
            </article>
          ))}
        </div>

        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '80px 1fr 80px', gap: 24, alignItems: 'baseline', marginTop: 72, marginBottom: 28 }}>
          <span className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.3em' }}>§ 02</span>
          <h2 className="display" style={{ fontSize: 'clamp(26px, 3.2vw, 42px)', margin: 0, color: 'var(--ink-2)' }}>
            On the roadmap — post-beta.
          </h2>
          <span className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.22em', textAlign: 'right' }}>03 / NEXT</span>
        </div>
        <div className="feat-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {FEATURES_PLANNED.map((f, i) => (
            <article key={i} className="feat-card planned">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 12, borderBottom: '1px solid var(--line-2)' }}>
                <span className="feat-icon" style={{ background: 'transparent', borderColor: 'var(--line-2)', color: 'var(--ink-4)' }}>
                  <Icon name={f.icon} size={16} />
                </span>
                <span className="mono" style={{ fontSize: 9, color: 'var(--ink-4)', letterSpacing: '0.25em' }}>ROADMAP</span>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                <span className="mono" style={{ fontSize: 9, color: 'var(--ink-4)' }}>§ {String(FEATURES_MVP.length + i + 1).padStart(2, '0')}</span>
                <h3 className="feat-title" style={{ color: 'var(--ink-2)' }}>{f.title}</h3>
              </div>
              <p className="feat-desc">{f.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- How ---------- */
function V3How() {
  return (
    <section id="how" className="sect">
      <div className="sect-inner">
        <div className="reveal" style={{ marginBottom: 52 }}>
          <span className="mono" style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '0.3em' }}>§ 03 — PROCEDURE</span>
          <h2 className="display" style={{ fontSize: 'clamp(32px, 4.2vw, 56px)', margin: '14px 0 0', color: 'var(--ink)' }}>
            Three steps to a verdict.
          </h2>
        </div>
        <div style={{ position: 'relative' }}>
          {/* connecting dotted line */}
          <div style={{ position: 'absolute', top: 40, left: '16.66%', right: '16.66%', height: 1, borderTop: '1px dashed var(--line-2)' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40, position: 'relative' }}>
            {STEPS.map((s, i) => (
              <div key={i} className={`reveal d${i+1}`} style={{ padding: '0 8px' }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', border: '1px solid var(--accent)', background: 'var(--surface)', display: 'grid', placeItems: 'center', marginBottom: 20, position: 'relative' }}>
                  <span className="display" style={{ fontSize: 28, color: 'var(--accent)', fontWeight: 300 }}>{s.n}</span>
                </div>
                <span className="mono" style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '0.25em' }}>— {s.kicker.toUpperCase()}</span>
                <h3 className="display" style={{ fontSize: 24, margin: '12px 0 10px', color: 'var(--ink)' }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.7, margin: 0 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="reveal d3" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', marginTop: 64, border: '1px solid var(--line-2)', background: 'var(--line-2)', gap: 1 }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ background: 'var(--surface)', padding: '28px 20px', textAlign: 'center' }}>
              <div className="display" style={{ fontSize: 52, color: s.accent ? 'var(--accent)' : 'var(--ink)', lineHeight: 1 }}>{s.value}</div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 10 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Sample / Tech ---------- */
function V3Sample() {
  return (
    <section id="tech" className="sect" style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--line-2)' }}>
      <div className="sect-inner">
        <div className="reveal" style={{ marginBottom: 48 }}>
          <span className="mono" style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '0.3em' }}>§ 04 — ENABLING TECHNOLOGY</span>
          <h2 className="display" style={{ fontSize: 'clamp(32px, 4.2vw, 56px)', margin: '14px 0 18px', color: 'var(--ink)', maxWidth: '22ch' }}>
            Powered by Claude. Grounded in data.
          </h2>
          <p style={{ fontSize: 16, color: 'var(--ink-2)', lineHeight: 1.65, maxWidth: '68ch', margin: 0 }}>
            Reports aren't generated from headlines. Aurealis pulls real financial data from four independent sources, layers Claude Sonnet 4.6 reasoning on top, and types every response against a strict JSON schema — producing structured research that's calibrated to your profile.
          </p>
        </div>

        {/* Architecture diagram */}
        <div className="reveal d1" style={{ border: '1px solid var(--line-2)', background: 'var(--surface)', padding: 'calc(32px * var(--density))' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1.3fr auto 1fr', gap: 20, alignItems: 'stretch' }}>
            {/* Inputs */}
            <div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.2em', marginBottom: 14 }}>INPUTS / 4</div>
              <div style={{ display: 'grid', gap: 8 }}>
                {['Yahoo Finance', 'SEC Edgar', 'FRED', 'Perplexity'].map(s => (
                  <div key={s} style={{ padding: '10px 12px', border: '1px solid var(--line-2)', fontSize: 12, color: 'var(--ink-2)', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em', background: 'var(--bg-2)' }}>
                    → {s}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ width: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>▸</div>
            {/* Claude */}
            <div style={{ border: '1px solid var(--accent)', padding: 20, background: 'color-mix(in oklab, var(--accent) 5%, var(--surface))' }}>
              <div className="mono" style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: 14 }}>CLAUDE SONNET 4.6 · REASONING LAYER</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {['Chain-of-thought', 'JSON schema', 'Section templates', 'Validation', 'Persona fit', 'Risk extraction'].map(s => (
                  <div key={s} style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 12, color: 'var(--ink-2)' }}>
                    <span style={{ width: 4, height: 4, background: 'var(--accent)' }} /> {s}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ width: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>▸</div>
            {/* Outputs */}
            <div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.2em', marginBottom: 14 }}>OUTPUTS</div>
              <div style={{ display: 'grid', gap: 8 }}>
                {[
                  ['AI Report', '9-section brief'],
                  ['DCF', 'Valuation + sensitivity'],
                  ['Portfolio AI', 'Positions & allocation'],
                  ['Macro Radar', '11-signal risk'],
                ].map(([t, s]) => (
                  <div key={t} style={{ padding: '10px 12px', border: '1px solid var(--accent)', background: 'var(--bg-2)' }}>
                    <div style={{ fontSize: 12, color: 'var(--ink)', fontWeight: 500 }}>{t}</div>
                    <div className="mono" style={{ fontSize: 9, color: 'var(--ink-3)', marginTop: 3 }}>{s}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Pricing ---------- */
function V3Pricing() {
  const [annual, setAnnual] = useState3(false);
  return (
    <section id="pricing" className="sect">
      <div className="sect-inner">
        <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 40, gap: 24, flexWrap: 'wrap' }}>
          <div>
            <span className="mono" style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '0.3em' }}>§ 05 — SUBSCRIPTION</span>
            <h2 className="display" style={{ fontSize: 'clamp(32px, 4.2vw, 56px)', margin: '14px 0 0', color: 'var(--ink)' }}>
              Simple, transparent tiers.
            </h2>
          </div>
          <div style={{ display: 'flex', border: '1px solid var(--line-2)', padding: 2 }}>
            {['Monthly', 'Annual'].map((lbl, i) => {
              const active = (i === 1) === annual;
              return (
                <button key={lbl} onClick={() => setAnnual(i === 1)}
                  className="mono"
                  style={{ padding: '8px 18px', background: active ? 'var(--ink)' : 'transparent', color: active ? 'var(--bg)' : 'var(--ink-3)', border: 'none', cursor: 'pointer', fontSize: 10, letterSpacing: '0.22em' }}>
                  {lbl}
                </button>
              );
            })}
          </div>
        </div>
        <div className="reveal d1 price-grid">
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
              <ul className="price-list">{p.features.map((f, j) => <li key={j} className={f.on ? '' : 'off'}>{f.t}</li>)}</ul>
              <a href="#beta" className="btn btn-ghost" style={{ marginTop: 'auto', justifyContent: 'center', borderColor: p.featured ? 'var(--accent)' : 'var(--line-2)', color: p.featured ? 'var(--accent)' : 'var(--ink)' }}>{p.cta}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Beta ---------- */
function V3Beta() {
  return (
    <section id="beta" className="sect" style={{ borderTop: '1px solid var(--line-2)', background: 'var(--bg-2)' }}>
      <div className="sect-inner" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 60, alignItems: 'center' }}>
        <div>
          <span className="mono" style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '0.3em' }}>§ 06 — ACCESS</span>
          <h2 className="display" style={{ fontSize: 'clamp(38px, 5vw, 72px)', margin: '18px 0 0', color: 'var(--ink)', lineHeight: 1.05 }}>
            Research like an institution.<br/>
            <span style={{ color: 'var(--accent)' }}>Invest like a pro.</span>
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: '32px 0 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, maxWidth: 520 }}>
            {['AI equity reports in under 2 min', 'Personalised fit scoring', '10 tools, one platform', 'Free 24h trial · No lock-in'].map((t, i) => (
              <li key={i} style={{ display: 'flex', gap: 10, fontSize: 13, color: 'var(--ink-2)' }}>
                <span style={{ color: 'var(--accent)' }}><Icon name="check" size={14}/></span> {t}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--line-2)', padding: 32 }}>
          <div className="mono" style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '0.3em', marginBottom: 20 }}>REQUEST EARLY ACCESS</div>
          <BetaForm />
        </div>
      </div>
    </section>
  );
}

/* ---------- V3 Root ---------- */
function V3({ density }) {
  useReveal();
  return (
    <div className={`variation-root v3 density-${density}`}>
      <Nav variant="v3" />
      <V3Hero />
      <V3Product />
      <V3Features />
      <V3How />
      <V3Sample />
      <V3Pricing />
      <V3Beta />
      <Footer />
    </div>
  );
}
window.V3 = V3;
