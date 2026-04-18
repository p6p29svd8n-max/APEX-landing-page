/* V2 — EDITORIAL BRIEF (cream, serif) */
const { useEffect: useEffect2, useRef: useRef2, useState: useState2 } = React;

/* ---------- Hero bg: hand-drawn candlestick wave ---------- */
function V2HeroBg() {
  const svgRef = useRef2(null);
  useEffect2(() => {
    const svg = svgRef.current; if (!svg) return;
    let raf;
    const start = performance.now();
    const bars = svg.querySelectorAll('[data-bar]');
    const tick = (t) => {
      const dt = (t - start) / 1000;
      bars.forEach((b, i) => {
        const phase = dt * 0.4 + i * 0.25;
        const amp = 10 + 6 * Math.sin(phase * 0.7);
        b.setAttribute('transform', `translate(0, ${Math.sin(phase) * amp})`);
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  const bars = Array.from({ length: 60 }, (_, i) => {
    const x = 40 + i * 22;
    const h = 30 + (i % 7) * 10 + Math.sin(i * 0.4) * 40;
    const up = (i % 3 !== 0);
    return { x, h, up };
  });
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {/* paper grain */}
      <div style={{ position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(20,18,14,0.03) 0%, transparent 50%)',
        opacity: 0.6 }} />
      {/* vertical rules */}
      <div style={{ position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(to right, transparent 0, transparent calc(100% - 1px), rgba(20,18,14,0.04) 100%)',
        backgroundSize: '120px 100%' }} />
      <svg ref={svgRef} viewBox="0 0 1600 700" preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', bottom: 0, left: 0, width: '120%', height: '70%', opacity: 0.38 }}>
        <defs>
          <linearGradient id="fade2" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {/* horizontal baseline */}
        <line x1="0" y1="500" x2="1600" y2="500" stroke="var(--ink-4)" strokeWidth="0.5" strokeDasharray="2 4" />
        {/* target line teal */}
        <line x1="0" y1="340" x2="1600" y2="340" stroke="var(--accent)" strokeWidth="0.75" strokeDasharray="4 6" opacity="0.7" />
        <text x="20" y="334" fontSize="10" fill="var(--accent)" fontFamily="IBM Plex Mono" letterSpacing="2">TARGET $248</text>
        {bars.map((b, i) => (
          <g key={i} data-bar>
            <line x1={b.x} y1={500 - b.h} x2={b.x} y2={500 + b.h * 0.35}
              stroke="var(--ink-2)" strokeWidth="0.8" opacity="0.5" />
            <rect x={b.x - 6} y={500 - b.h + (b.up ? 0 : b.h * 0.35)}
              width="12" height={b.h * 0.75}
              fill={b.up ? 'var(--accent)' : 'transparent'}
              stroke="var(--ink)"
              strokeWidth="0.6"
              opacity={b.up ? 0.85 : 0.5} />
          </g>
        ))}
      </svg>
      {/* page bleed fade */}
      <div style={{ position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, var(--bg) 0%, transparent 20%, transparent 70%, var(--bg) 100%)' }} />
    </div>
  );
}

/* ---------- Hero ---------- */
function V2Hero() {
  return (
    <section id="top" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', paddingTop: 110 }}>
      <V2HeroBg />
      <div style={{ position: 'relative', maxWidth: 1240, margin: '0 auto', padding: '0 clamp(24px, 4vw, 80px)' }}>
        {/* masthead rule */}
        <div style={{ borderBottom: '1px solid var(--ink)', paddingBottom: 14, marginBottom: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.3em' }}>VOLUME 01 · ISSUE 04</span>
          <span className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.3em' }}>APRIL MMXXVI · BETA LIVE</span>
        </div>
        <div className="reveal" style={{ marginBottom: 20 }}>
          <span className="mono" style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: '0.3em' }}>— A Brief for the Private Investor</span>
        </div>
        <h1 className="reveal d1 display" style={{
          fontSize: 'clamp(48px, 7.6vw, 116px)', lineHeight: 0.98, margin: 0, color: 'var(--ink)',
          maxWidth: '14ch',
        }}>
          Institutional research,<br />
          <em style={{ color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>issued privately.</em>
        </h1>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: 60, marginTop: 56, alignItems: 'start' }}>
          <div className="reveal d2">
            <div style={{ borderTop: '1px solid var(--ink)', paddingTop: 14 }}>
              <span className="mono" style={{ fontSize: 10, color: 'var(--ink-3)' }}>The Premise</span>
              <p style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--ink-2)', marginTop: 10, fontFamily: 'var(--font-display)', fontWeight: 400 }}>
                Aurealis is an AI investment desk in your browser — generating on-demand equity reports, tracking your portfolio, and monitoring the macro cycle.
              </p>
            </div>
          </div>
          <div className="reveal d3" style={{ columns: 2, columnGap: 32, fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.7, columnRule: '1px solid var(--line)' }}>
            <p style={{ margin: 0 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 32, float: 'left', lineHeight: 0.8, marginRight: 6, marginTop: 4, color: 'var(--ink)' }}>W</span>
              hen a private investor sits down to evaluate a business, the tools at their disposal are a patchwork — a Yahoo chart, a half-read 10-K, a broker's price target.
            </p>
            <p style={{ marginTop: 14 }}>
              Aurealis collapses that patchwork into a single, browser-based desk. Four independent data sources, nine report sections, one verdict — calibrated to your risk profile and horizon.
            </p>
          </div>
        </div>
        <div className="reveal d4" style={{ display: 'flex', gap: 14, marginTop: 48, flexWrap: 'wrap' }}>
          <a href="#beta" className="btn btn-primary">Subscribe to the desk <Icon name="arrow" size={14} /></a>
          <a href="#features" className="btn btn-ghost">Read the brief ↓</a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Product plate ---------- */
function V2Product() {
  return (
    <section className="sect" style={{ paddingTop: 'calc(40px * var(--density))', paddingBottom: 'calc(80px * var(--density))' }}>
      <div className="sect-inner">
        <figure className="reveal" style={{ margin: 0 }}>
          <div style={{ border: '1px solid var(--ink)', padding: 12, background: 'var(--surface)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.2em' }}>PLATE I — THE COCKPIT</span>
              <span className="mono" style={{ fontSize: 10, color: 'var(--ink-3)' }}>OVERVIEW / LIVE</span>
            </div>
            <img src="../assets/dashboard-overview.png" alt="Aurealis dashboard" style={{ display: 'block', width: '100%', height: 'auto' }} />
          </div>
          <figcaption style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--ink-3)', fontStyle: 'italic', marginTop: 14, fontFamily: 'var(--font-display)' }}>
            <span>Fig. 1 — The overview tab, showing watchlist, recession radar and portfolio in a single frame.</span>
            <span className="mono" style={{ fontStyle: 'normal', letterSpacing: '0.2em' }}>PG. 01</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

/* ---------- Features ---------- */
function V2Features() {
  return (
    <section id="features" className="sect" style={{ borderTop: '1px solid var(--ink)', background: 'var(--bg-2)' }}>
      <div className="sect-inner">
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 40, alignItems: 'baseline', marginBottom: 48, borderBottom: '1px solid var(--line-2)', paddingBottom: 24 }}>
          <div>
            <span className="mono" style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '0.3em' }}>CHAPTER I</span>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 4.6vw, 64px)', margin: '8px 0 0', color: 'var(--ink)' }}>
              <em>What you get.</em>
            </h2>
          </div>
          <p style={{ fontSize: 16, color: 'var(--ink-3)', lineHeight: 1.6, margin: 0, fontFamily: 'var(--font-display)', maxWidth: '52ch' }}>
            Six core tools ship on day one of the beta. Three further modules arrive in the months after — unlocked automatically, at no additional cost to early subscribers.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 0 }}>
          {FEATURES_MVP.map((f, i) => (
            <article key={i} className={`reveal d${(i % 4) + 1}`} style={{
              display: 'grid', gridTemplateColumns: '80px 1.2fr 2fr 120px', gap: 32, alignItems: 'start',
              padding: 'calc(26px * var(--density)) 0', borderBottom: '1px solid var(--line-2)',
            }}>
              <span className="mono" style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: '0.22em', paddingTop: 8 }}>
                N° {String(i + 1).padStart(2,'0')}
              </span>
              <h3 className="display" style={{ fontSize: 'clamp(22px, 2.2vw, 30px)', margin: 0, color: 'var(--ink)', fontWeight: 400, lineHeight: 1.1 }}>
                <em>{f.title}.</em>
              </h3>
              <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.65, margin: 0, fontFamily: 'var(--font-display)' }}>{f.desc}</p>
              <span className="mono" style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '0.2em', paddingTop: 10, textAlign: 'right' }}>LIVE AT BETA</span>
            </article>
          ))}
        </div>

        <div className="reveal" style={{ marginTop: 80, marginBottom: 24, borderTop: '1px solid var(--ink)', paddingTop: 40 }}>
          <span className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.3em' }}>APPENDIX — PLANNED</span>
          <h2 className="display" style={{ fontSize: 'clamp(28px, 3.2vw, 42px)', margin: '8px 0 0', color: 'var(--ink-2)' }}>
            <em>On the roadmap.</em>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: '1px solid var(--line-2)', background: 'var(--line-2)' }}>
          {FEATURES_PLANNED.map((f, i) => (
            <article key={i} className="reveal feat-card" style={{ background: 'var(--surface)', opacity: 0.85 }}>
              <span className="mono" style={{ fontSize: 10, color: 'var(--ink-4)' }}>N° {String(FEATURES_MVP.length + i + 1).padStart(2,'0')}</span>
              <h3 className="display" style={{ fontSize: 22, margin: '4px 0 10px', fontWeight: 400, color: 'var(--ink-2)' }}><em>{f.title}.</em></h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-3)', margin: 0, fontFamily: 'var(--font-display)' }}>{f.desc}</p>
              <span className="mono" style={{ fontSize: 10, color: 'var(--ink-4)', letterSpacing: '0.22em', marginTop: 'auto', paddingTop: 16, borderTop: '1px dotted var(--line-2)' }}>IN DEVELOPMENT</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- How ---------- */
function V2How() {
  return (
    <section id="how" className="sect">
      <div className="sect-inner">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 60 }}>
          <span className="mono" style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '0.3em' }}>CHAPTER II — METHOD</span>
          <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 72px)', margin: '14px auto 0', color: 'var(--ink)', maxWidth: '16ch' }}>
            Three steps, one verdict.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }}>
          {STEPS.map((s, i) => (
            <div key={i} className={`reveal d${i+1}`} style={{ padding: '40px 32px 32px', borderRight: i < 2 ? '1px solid var(--line-2)' : 'none', position: 'relative' }}>
              <div className="display" style={{ fontSize: 120, lineHeight: 0.9, color: 'var(--ink)', fontWeight: 300, letterSpacing: '-0.05em' }}>{s.n}</div>
              <span className="mono" style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '0.3em' }}>— {s.kicker}</span>
              <h3 className="display" style={{ fontSize: 26, margin: '14px 0 12px', color: 'var(--ink)', fontWeight: 400 }}><em>{s.title}.</em></h3>
              <p style={{ fontSize: 15, color: 'var(--ink-3)', lineHeight: 1.65, margin: 0, fontFamily: 'var(--font-display)' }}>{s.body}</p>
            </div>
          ))}
        </div>
        <div className="reveal d3" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', marginTop: 48, borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)', padding: '28px 0' }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ textAlign: 'center', borderRight: i < STATS.length - 1 ? '1px solid var(--line-2)' : 'none' }}>
              <div className="display" style={{ fontSize: 52, color: s.accent ? 'var(--accent)' : 'var(--ink)', fontWeight: 300 }}>{s.value}</div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 8 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Sample report card ---------- */
function V2Sample() {
  return (
    <section id="tech" className="sect" style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--ink)' }}>
      <div className="sect-inner" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
        <div className="reveal">
          <span className="mono" style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '0.3em' }}>CHAPTER III — SAMPLE</span>
          <h2 className="display" style={{ fontSize: 'clamp(32px, 4vw, 56px)', margin: '14px 0 24px', color: 'var(--ink)', maxWidth: '16ch' }}>
            A page from the desk.
          </h2>
          <p style={{ fontSize: 16, color: 'var(--ink-2)', lineHeight: 1.7, fontFamily: 'var(--font-display)', marginBottom: 24 }}>
            Every report is nine sections long and typed against a strict JSON schema. Grounded in live data from Yahoo Finance, SEC Edgar, FRED and Perplexity, layered with Claude Sonnet 4.6 reasoning.
          </p>
          <blockquote style={{ borderLeft: '2px solid var(--accent)', paddingLeft: 20, margin: 0, fontFamily: 'var(--font-display)', fontSize: 19, fontStyle: 'italic', color: 'var(--ink)', lineHeight: 1.5 }}>
            "Adobe's AI integration across Creative Cloud (Firefly) represents an untapped monetisation vector consensus models underestimate."
            <footer className="mono" style={{ fontStyle: 'normal', fontSize: 10, color: 'var(--ink-4)', letterSpacing: '0.25em', marginTop: 14 }}>— AUREALIS DESK · SAMPLE THESIS</footer>
          </blockquote>
        </div>
        <div className="reveal d2" style={{ background: 'var(--surface)', border: '1px solid var(--ink)', padding: 32 }}>
          <div style={{ borderBottom: '1px solid var(--line-2)', paddingBottom: 16, marginBottom: 18 }}>
            <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.3em' }}>AUREALIS EQUITY BRIEF · SPECIMEN</div>
            <div className="display" style={{ fontSize: 32, color: 'var(--ink)', fontWeight: 400, marginTop: 10 }}>
              <em>Apple Inc.</em> <span style={{ color: 'var(--ink-3)', fontSize: 18 }}>AAPL</span>
            </div>
            <div style={{ display: 'flex', gap: 20, marginTop: 10, fontSize: 12, color: 'var(--ink-3)' }}>
              <span>NASDAQ</span>
              <span>·</span>
              <span>Generated today</span>
              <span>·</span>
              <span style={{ color: 'var(--ink) '}}>$187.42</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--ink-4)', marginBottom: 8 }}>VERDICT</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--accent)', fontStyle: 'italic' }}>Strong Buy</div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 6 }}>TARGET $248 · +32%</div>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--ink-4)', marginBottom: 8 }}>FIT SCORE</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span className="display" style={{ fontSize: 36, color: 'var(--ink)' }}>4</span>
                <span className="display" style={{ fontSize: 18, color: 'var(--ink-3)' }}>/5</span>
              </div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 6 }}>GROWTH · 3–5YR</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--line-2)' }}>
            {[['P/E', '28.4×'],['Growth', '+7.8%'],['FCF Y.', '3.6%'],['EPS', '$7.33']].map(([l, v], i) => (
              <div key={i} style={{ background: 'var(--surface)', padding: '10px 12px' }}>
                <div className="mono" style={{ fontSize: 9, color: 'var(--ink-4)' }}>{l}</div>
                <div style={{ fontSize: 15, color: 'var(--ink)', marginTop: 4, fontWeight: 500 }}>{v}</div>
              </div>
            ))}
          </div>
          <div className="mono" style={{ fontSize: 9, color: 'var(--ink-4)', marginTop: 16, letterSpacing: '0.25em', textAlign: 'right' }}>
            CLAUDE SONNET 4.6 · 1M 47S
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Pricing ---------- */
function V2Pricing() {
  const [annual, setAnnual] = useState2(false);
  return (
    <section id="pricing" className="sect">
      <div className="sect-inner">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="mono" style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '0.3em' }}>CHAPTER IV — SUBSCRIPTION</span>
          <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 72px)', margin: '14px auto 20px', color: 'var(--ink)' }}>
            <em>Simple tiers.</em>
          </h2>
          <div style={{ display: 'inline-flex', border: '1px solid var(--ink)', padding: 2 }}>
            {['Monthly', 'Annual'].map((lbl, i) => {
              const active = (i === 1) === annual;
              return (
                <button key={lbl} onClick={() => setAnnual(i === 1)}
                  style={{ padding: '8px 20px', background: active ? 'var(--ink)' : 'transparent', color: active ? 'var(--bg)' : 'var(--ink-2)', border: 'none', cursor: 'pointer', fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                  {lbl}
                </button>
              );
            })}
          </div>
        </div>
        <div className="reveal d1" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, border: '1px solid var(--ink)' }}>
          {PRICING.map((p, i) => (
            <div key={i} style={{ background: p.featured ? 'var(--bg-2)' : 'var(--surface)', padding: 'calc(32px * var(--density)) 24px', borderRight: i < 3 ? '1px solid var(--line-2)' : 'none', display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.2em' }}>— {p.name}</span>
                {p.badge && <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 12, color: 'var(--accent)' }}>{p.badge}</span>}
              </div>
              <div>
                <div className="display" style={{ fontSize: 48, color: 'var(--ink)', lineHeight: 1 }}>{annual ? p.price.yr : p.price.mo}</div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--ink-4)', marginTop: 6 }}>{annual ? p.unit.yr : p.unit.mo}</div>
              </div>
              <p style={{ fontSize: 12, color: 'var(--ink-3)', margin: 0, fontFamily: 'var(--font-display)', fontStyle: 'italic', minHeight: 36 }}>{p.blurb}</p>
              <ul className="price-list">{p.features.map((f, j) => <li key={j} className={f.on ? '' : 'off'}>{f.t}</li>)}</ul>
              <a href="#beta" className="btn btn-ghost" style={{ justifyContent: 'center', marginTop: 'auto' }}>{p.cta}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Beta ---------- */
function V2Beta() {
  return (
    <section id="beta" className="sect" style={{ background: 'var(--ink)', color: 'var(--bg)', borderTop: '1px solid var(--ink)' }}>
      <div className="sect-inner" style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 80, alignItems: 'center' }}>
        <div>
          <span className="mono" style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '0.3em' }}>— THE CLOSING ARGUMENT</span>
          <h2 className="display" style={{ fontSize: 'clamp(38px, 5vw, 80px)', margin: '18px 0 0', color: 'var(--bg)', lineHeight: 1 }}>
            Research like an institution.<br/>
            <em style={{ color: 'var(--accent)' }}>Invest like a pro.</em>
          </h2>
          <p style={{ fontSize: 17, color: 'color-mix(in oklab, var(--bg) 75%, var(--ink))', lineHeight: 1.7, maxWidth: 460, marginTop: 24, fontFamily: 'var(--font-display)' }}>
            Free 24-hour trial. Full platform unlocked. No credit card. No lock-in. Cancel by closing the tab.
          </p>
        </div>
        <div style={{ background: 'var(--bg)', border: '1px solid var(--accent)', padding: 32 }}>
          <div className="mono" style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '0.3em', marginBottom: 20 }}>REQUEST EARLY ACCESS</div>
          <BetaForm />
        </div>
      </div>
    </section>
  );
}

/* ---------- V2 Root ---------- */
function V2({ density }) {
  useReveal();
  return (
    <div className={`variation-root v2 density-${density}`}>
      <Nav variant="v2" />
      <V2Hero />
      <V2Product />
      <V2Features />
      <V2How />
      <V2Sample />
      <V2Pricing />
      <V2Beta />
      <Footer />
    </div>
  );
}
window.V2 = V2;
