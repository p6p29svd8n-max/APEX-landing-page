/* Shared pieces used by all 3 variations */
const { useEffect, useRef, useState, useMemo } = React;

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal:not(.in)').forEach(el => io.observe(el));
    return () => io.disconnect();
  });
}

/* Minimal inline-SVG icon set (avoids CDN dependency) */
const ICONS = {
  bookmark: 'M6 3h12v18l-6-4-6 4z',
  'file-text': 'M7 3h8l4 4v14H7zM14 3v5h5M9 13h8M9 17h5',
  'bar-chart-2': 'M7 20V10M12 20V4M17 20v-7',
  activity: 'M2 12h4l3-9 4 18 3-9h6',
  briefcase: 'M4 7h16v13H4zM9 7V4h6v3',
  calculator: 'M5 3h14v18H5zM8 7h8M8 11h2M12 11h2M16 11h2M8 15h2M12 15h2M16 15h2M8 19h2M12 19h2',
  layers: 'M12 3l9 5-9 5-9-5zM3 13l9 5 9-5M3 18l9 5 9-5',
  globe: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18',
  search: 'M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14zM21 21l-5-5',
  arrow: 'M5 12h14m-5-5 5 5-5 5',
  check: 'M4 12l5 5L20 6',
};
function Icon({ name, size = 16, stroke = 'currentColor', strokeWidth = 1.5, fill = 'none' }) {
  const d = ICONS[name] || ICONS.bookmark;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke}
         strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {d.split('M').filter(Boolean).map((seg, i) => <path key={i} d={'M' + seg} />)}
    </svg>
  );
}

/* ------ Nav ------ */
function Nav({ variant }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onS = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onS); onS();
    return () => window.removeEventListener('scroll', onS);
  }, []);
  return (
    <nav className="nav" style={{ boxShadow: scrolled ? '0 1px 0 var(--line)' : 'none' }}>
      <a href="#top" className="nav-brand">
        <span className="logo-mark">A</span>
        <span>Aurealis<span style={{ color: 'var(--ink-4)', marginLeft: 8, fontWeight: 400 }}>Intelligence</span></span>
      </a>
      <div className="nav-links">
        <a href="#features">Features</a>
        <a href="#how">How it works</a>
        <a href="#tech">Technology</a>
        <a href="#pricing">Pricing</a>
      </div>
      <a href="#beta" className="nav-cta">Join Beta →</a>
    </nav>
  );
}

/* ------ Ticker ribbon ------ */
function TickerRibbon({ border = true }) {
  const items = [...window.TICKERS, ...window.TICKERS]; // duplicate for loop
  return (
    <div style={{
      borderTop: border ? '1px solid var(--line)' : 'none',
      borderBottom: border ? '1px solid var(--line)' : 'none',
      padding: '10px 0',
      overflow: 'hidden',
      background: 'color-mix(in oklab, var(--bg) 92%, transparent)',
      position: 'relative',
    }}>
      <div className="ticker-ribbon">
        {items.map((it, i) => (
          <span className="ticker-item" key={i}>
            <span className="tk">{it.t}</span>
            <span>{it.v}</span>
            <span className={it.up ? 'up' : 'dn'}>{it.c}</span>
            <span style={{ color: 'var(--ink-5)' }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------ Footer ------ */
function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--line)',
      padding: 'calc(60px * var(--density)) clamp(24px, 4vw, 80px) 40px',
      background: 'var(--bg-2)',
    }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 32, marginBottom: 40 }}>
          <div style={{ maxWidth: 360 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span style={{ width: 26, height: 26, background: 'var(--accent)', color: 'var(--accent-fg)', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 13 }}>A</span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--ink)' }}>Aurealis Intelligence</span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--ink-4)', lineHeight: 1.6, margin: 0 }}>
              Aurealis is not a registered financial advisor. Content is for informational purposes only.
              Investing involves risk, including possible loss of principal.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
            <FooterCol title="Product" items={['Features', 'Pricing', 'Join Beta', 'Changelog']} />
            <FooterCol title="Company" items={['About', 'Contact', 'Press kit']} />
            <FooterCol title="Legal" items={['Terms', 'Privacy', 'Imprint']} />
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--line)', paddingTop: 22, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span className="mono" style={{ fontSize: 10, color: 'var(--ink-4)' }}>© 2026 Aurealis · Built for private investors</span>
          <span className="mono" style={{ fontSize: 10, color: 'var(--ink-4)' }}>v0.9.3 · beta</span>
        </div>
      </div>
    </footer>
  );
}
function FooterCol({ title, items }) {
  return (
    <div>
      <div className="mono" style={{ fontSize: 10, color: 'var(--ink-4)', marginBottom: 12 }}>{title}</div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map(it => (
          <li key={it}>
            <a href="#" style={{ fontSize: 13, color: 'var(--ink-2)', textDecoration: 'none' }}>{it}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------ Beta form ------ */
function BetaForm() {
  const [sent, setSent] = useState(false);
  return (
    <form onSubmit={e => { e.preventDefault(); setSent(true); }}
      style={{ display: 'grid', gap: 12 }}>
      {!sent ? (
        <>
          <input className="form-input" placeholder="First name" required />
          <input className="form-input" placeholder="Email address" type="email" required />
          <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }}>
            Join Waitlist <Icon name="arrow" size={14} />
          </button>
          <span className="mono" style={{ fontSize: 10, color: 'var(--ink-4)' }}>No credit card · No lock-in</span>
        </>
      ) : (
        <div style={{ padding: '24px', border: '1px solid var(--accent)', background: 'var(--accent-dim)', textAlign: 'center' }}>
          <div style={{ color: 'var(--accent)', fontSize: 24, marginBottom: 8 }}>✓</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--ink)', marginBottom: 4 }}>You're on the list.</div>
          <div style={{ fontSize: 13, color: 'var(--ink-3)' }}>We'll be in touch before launch.</div>
        </div>
      )}
    </form>
  );
}

Object.assign(window, { useReveal, Icon, Nav, TickerRibbon, Footer, BetaForm });
