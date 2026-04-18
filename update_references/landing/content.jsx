/* Shared content for Aurealis landing — referenced by all 3 variations */

const FEATURES_MVP = [
  {
    icon: 'bookmark',
    title: 'Shortlist Management',
    desc: 'Curate your highest-conviction picks with live prices, key figures, fair-value estimates and AI recommendations in one focused view.',
  },
  {
    icon: 'file-text',
    title: 'AI Equity Research Reports',
    desc: 'On-demand, 9-section institutional reports in under 2 minutes — thesis, DCF, risk factors, catalysts, and personalised investment fit.',
  },
  {
    icon: 'bar-chart-2',
    title: 'Stock Viewer',
    desc: 'Live charts, financial & business data, short-interest, insider transactions, analyst consensus, and news in one panel.',
  },
  {
    icon: 'activity',
    title: 'Recession Radar',
    desc: '11 macro signals merged into one composite score across 5 regimes. Understand recession risk and market sentiment at a glance.',
  },
  {
    icon: 'briefcase',
    title: 'Portfolio AI Analysis',
    desc: 'Monitor performance, sector allocation and value history. Challenge your positions via critical AI-based portfolio analysis.',
  },
  {
    icon: 'calculator',
    title: 'Plug & Play DCF Analyzer',
    desc: 'Build comprehensive DCF models with adjustable WACC and terminal growth. AI commentary on key value drivers in under 30 seconds.',
  },
];

const FEATURES_PLANNED = [
  {
    icon: 'layers',
    title: 'Sector Insights',
    desc: 'Evaluate and filter current and historical performance across prominent sectors, with insight into leading companies in each.',
  },
  {
    icon: 'globe',
    title: 'Macro, World News & Earnings',
    desc: 'Yield curves, FX, commodities, global news, upcoming earnings and an estimated fear & greed index — in one tab.',
  },
  {
    icon: 'search',
    title: 'Trend Intelligence',
    desc: 'Vertical and horizontal trend analysis to identify market movements and investment opportunities across supply-chains and sectors.',
  },
];

const STEPS = [
  {
    n: '01',
    kicker: 'Sign Up',
    title: 'Start your free 24h trial',
    body: 'No credit card. Browser-based. Full platform unlocked — nothing gated.',
  },
  {
    n: '02',
    kicker: 'Configure',
    title: 'Build your watchlist',
    body: 'Add your tickers. Live prices, sector data, macro signals, recession radar and portfolio tracking — one place.',
  },
  {
    n: '03',
    kicker: 'Research',
    title: 'Generate your first AI report',
    body: '9-section institutional research grounded in live data from four independent sources. Delivered in under 2 minutes.',
  },
];

const STATS = [
  { value: '10',  label: 'Tools' },
  { value: '<2m', label: 'Per Report', accent: true },
  { value: '4',   label: 'Data Sources' },
  { value: '9',   label: 'Report Sections' },
];

const PRICING = [
  {
    name: 'Free Trial',
    price: { mo: '€0', yr: '€0' },
    unit: { mo: '/ 24h', yr: '/ 24h' },
    blurb: 'No credit card. Full platform for 24 hours.',
    features: [
      { on: true,  t: '3 AI research reports' },
      { on: true,  t: 'All dashboard tabs' },
      { on: true,  t: 'Live prices & charts' },
      { on: true,  t: 'Portfolio tracker' },
      { on: true,  t: 'Recession Radar' },
    ],
    cta: 'Start Free Trial',
  },
  {
    name: 'Base',
    badge: 'Best Value',
    price: { mo: '€9.99', yr: '€99.99' },
    unit: { mo: '/ mo', yr: '/ yr' },
    blurb: 'Bring your own API keys. ≈€20/mo in usage.',
    features: [
      { on: true,  t: 'Unlimited AI reports (BYOK)' },
      { on: true,  t: 'All dashboard tabs' },
      { on: true,  t: 'Newsletter ingestion' },
      { on: true,  t: 'Portfolio AI analysis' },
      { on: true,  t: 'DCF valuation model' },
    ],
    cta: 'Join Beta',
  },
  {
    name: 'Starter',
    badge: 'Most Popular',
    featured: true,
    price: { mo: '€12.99', yr: '€129.99' },
    unit: { mo: '/ mo', yr: '/ yr' },
    blurb: 'No setup required.',
    features: [
      { on: true,  t: '10 reports / month' },
      { on: true,  t: 'All dashboard tabs' },
      { on: true,  t: 'Newsletter ingestion' },
      { on: true,  t: 'Portfolio AI analysis' },
      { on: true,  t: 'DCF valuation model' },
      { on: false, t: 'No API key setup' },
    ],
    cta: 'Join Beta',
  },
  {
    name: 'Pro',
    price: { mo: '€29.99', yr: '€299.99' },
    unit: { mo: '/ mo', yr: '/ yr' },
    blurb: 'BYOK optional for unlimited.',
    features: [
      { on: true,  t: '30 reports / month' },
      { on: true,  t: 'All dashboard tabs' },
      { on: true,  t: 'Newsletter ingestion' },
      { on: true,  t: 'Portfolio AI analysis' },
      { on: true,  t: 'DCF valuation model' },
      { on: false, t: 'No API key setup' },
    ],
    cta: 'Join Beta',
  },
];

const TICKERS = [
  { t: 'SPX',   v: '5842.1', c: '+0.74%', up: true },
  { t: 'NDX',   v: '20 114', c: '+1.12%', up: true },
  { t: 'VIX',   v: '14.2',   c: '-3.8%',  up: false },
  { t: 'DXY',   v: '104.8',  c: '-0.3%',  up: false },
  { t: '10Y',   v: '4.42%',  c: '+2bp',   up: true },
  { t: 'BTC',   v: '68 240', c: '+2.3%',  up: true },
  { t: 'BRENT', v: '$82.4',  c: '+0.9%',  up: true },
  { t: 'GOLD',  v: '$2 318', c: '-0.2%',  up: false },
  { t: 'EURUSD',v: '1.0892', c: '+0.12%', up: true },
  { t: 'ADBE',  v: '$521.4', c: '+1.24%', up: true },
  { t: 'ASML',  v: '€824.6', c: '+0.91%', up: true },
  { t: 'UBER',  v: '$74.2',  c: '-1.08%', up: false },
];

Object.assign(window, {
  FEATURES_MVP, FEATURES_PLANNED, STEPS, STATS, PRICING, TICKERS,
});
