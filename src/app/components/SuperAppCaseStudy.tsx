import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { Page } from '../App';
import CalloutBanner from './CalloutBanner';
import NextProject from './NextProject';

interface Props { onNavigate: (page: Page) => void; }

/* ── Dark editorial palette (UX Audit Playbook) ──
   Amber-dominant with warm/sage variety so the six chapters' finding cards
   stay distinguishable. DARK/MID are TEXT colours (cream / sage on near-black);
   LIGHT is the card surface. */
const ACCENT      = '#E8963C';  // primary amber accent (brand)
const ACCENT_DEEP = '#cf7f28';  // deeper amber
const GOLD        = '#D8A24A';  // light gold
const GREEN       = '#8A9B8E';  // sage
const PURPLE      = '#A9905F';  // muted khaki
const DARK        = '#F4F1EA';  // cream — heading text
const MID         = '#8A9B8E';  // sage — body text
const LIGHT       = '#14151A';  // card surface

/* ── chapter definitions ── */
const CHAPTERS = [
  { id: 'ch1', num: '01', label: 'The Opening Question' },
  { id: 'ch2', num: '02', label: 'The Competitive Landscape' },
  { id: 'ch3', num: '03', label: 'The Human Truth' },
  { id: 'ch4', num: '04', label: 'The Global Benchmark' },
  { id: 'ch5', num: '05', label: 'The Synthesis' },
  { id: 'ch6', num: '06', label: 'The Brand Decision' },
];

/* Responsive grid helper — avoids hardcoded repeat(3,1fr) breaking on mobile */
const autoGrid = (min: number): React.CSSProperties => ({
  display: 'grid',
  gridTemplateColumns: `repeat(auto-fit, minmax(${min}px, 1fr))`,
  gap: 12,
});

/* ── small primitives ── */
function Tag({ children, color = ACCENT }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 20, background: `${color}18`, color, fontSize: 13, fontWeight: 700, letterSpacing: '0.04em' }}>
      {children}
    </span>
  );
}

function Callout({ children, icon = '→' }: { children: React.ReactNode; icon?: string }) {
  return (
    <div style={{ borderLeft: `3px solid ${ACCENT}`, margin: '24px 0', background: 'rgba(232,150,60,0.09)', padding: '14px 18px 14px 20px', borderRadius: '0 8px 8px 0' }}>
      <span style={{ fontSize: 15, fontWeight: 700, color: ACCENT, marginRight: 6 }}>{icon}</span>
      <span style={{ fontSize: 17, fontWeight: 500, color: DARK, lineHeight: 1.6 }}>{children}</span>
    </div>
  );
}

function StatCard({ value, label, sub }: { value: string; label: string; sub?: string }) {
  return (
    <div style={{ background: '#14151A', border: '1px solid #2A2C33', borderRadius: 12, padding: '20px 18px', textAlign: 'center' }}>
      <div style={{ fontSize: 34, fontWeight: 900, color: DARK, lineHeight: 1, letterSpacing: '-0.03em' }}>{value}</div>
      <div style={{ fontSize: 14, fontWeight: 700, color: ACCENT, marginTop: 4 }}>{label}</div>
      {sub && <div style={{ fontSize: 13, color: MID, marginTop: 3, lineHeight: 1.4 }}>{sub}</div>}
    </div>
  );
}

/* Finding → UX Implication card. Mirrors the source board pattern where every
   research finding carries an explicit design consequence. */
function FindingCard({ icon, title, points, implication, color = ACCENT }: {
  icon: string; title: string; points: string[]; implication: string; color?: string;
}) {
  return (
    <div style={{ background: '#14151A', border: `1px solid ${color}33`, borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '16px 16px 12px' }}>
        <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
        <div style={{ fontSize: 15, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>{title}</div>
        {points.map(p => (
          <div key={p} style={{ display: 'flex', gap: 7, alignItems: 'flex-start', marginBottom: 5 }}>
            <span style={{ color, fontSize: 12, marginTop: 4, flexShrink: 0 }}>●</span>
            <span style={{ fontSize: 14.5, color: MID, lineHeight: 1.55 }}>{p}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 'auto', background: `${color}0d`, borderTop: `1px solid ${color}22`, padding: '10px 16px' }}>
        <span style={{ fontSize: 12, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: '0.06em', marginRight: 6 }}>UX Implication</span>
        <span style={{ fontSize: 14, color: MID, lineHeight: 1.5 }}>{implication}</span>
      </div>
    </div>
  );
}

function BoardLabel({ children, color = ACCENT }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{ fontSize: 13, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '24px 0 12px' }}>
      {children}
    </div>
  );
}

/* Animated arrow — an amber line that repeatedly "draws" itself then nudges
   its head forward. Used as the chapter-takeaway marker and inline flow cue. */
function AnimatedArrow({ width = 40, delay = 0 }: { width?: number; delay?: number }) {
  return (
    <svg width={width} height="14" viewBox="0 0 40 14" style={{ flexShrink: 0, overflow: 'visible' }} aria-hidden="true">
      <line x1="0" y1="7" x2="30" y2="7" stroke={ACCENT} strokeWidth="1.5"
        strokeDasharray="30" strokeDashoffset="30"
        style={{ animation: `arrow-draw 2.4s ease-in-out ${delay}s infinite` }} />
      <polyline points="24,2 31,7 24,12" fill="none" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        style={{ animation: `arrow-head 2.4s ease-in-out ${delay}s infinite` }} />
    </svg>
  );
}

/* Accordion chapter. Collapsed, it shows just the number, title and the
   one-line takeaway (the essence) so a reader skims all six in seconds;
   expanded, it reveals the full narrative + visual. Smooth height animation
   via the grid-template-rows 0fr→1fr trick (no JS measurement). */
function Chapter({ id, num, label, takeaway, open, onToggle, innerRef, children }: {
  id: string; num: string; label: string; takeaway: string;
  open: boolean; onToggle: () => void;
  innerRef: (el: HTMLElement | null) => void; children: React.ReactNode;
}) {
  return (
    <section
      ref={innerRef}
      id={id}
      style={{ scrollMarginTop: 90, marginBottom: 16, border: `1px solid ${open ? `${ACCENT}55` : '#2A2C33'}`, borderRadius: 14, overflow: 'hidden', background: LIGHT, transition: 'border-color 0.25s ease' }}
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        style={{ display: 'block', width: '100%', textAlign: 'left', background: 'transparent', border: 'none', cursor: 'pointer', padding: '24px 28px', fontFamily: "'Inter', sans-serif" }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <svg width="11" height="11" viewBox="0 0 10 10" style={{ flexShrink: 0 }} aria-hidden="true">
            <polygon points="5,0.5 9.33,3 9.33,7.5 5,10 0.67,7.5 0.67,3" fill={ACCENT} />
          </svg>
          <span style={{ fontSize: 13, fontWeight: 500, color: ACCENT, letterSpacing: '0.14em' }}>CHAPTER {num}</span>
          <div style={{ flex: 1, height: 1, background: '#2A2C33' }} />
          <ChevronDown size={20} color={open ? ACCENT : MID} style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease', flexShrink: 0 }} />
        </div>
        <h2 style={{ fontFamily: "'Roboto', 'Helvetica Neue', sans-serif", fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: 300, color: DARK, letterSpacing: '-0.025em', marginBottom: 12, lineHeight: 1.15 }}>{label}</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <AnimatedArrow />
          <span style={{ fontSize: 17, fontStyle: 'italic', color: ACCENT, lineHeight: 1.6 }}>{takeaway}</span>
        </div>
      </button>

      <div style={{ display: 'grid', gridTemplateRows: open ? '1fr' : '0fr', transition: 'grid-template-rows 0.35s ease' }}>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ padding: '8px 28px 28px' }}>{children}</div>
        </div>
      </div>
    </section>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  // Slightly brighter than sage for comfortable long-form reading on near-black.
  return <div style={{ fontSize: 18, color: '#C9CBC0', lineHeight: 1.8, marginBottom: 28 }}>{children}</div>;
}

/* ─────────────────────────── Chapter visuals ─────────────────────────── */

/* CH1 — mirrors the two source boards: Market Analysis (5 findings) and
   Opportunity Sizing (3 opportunities), each with a UX Implication footer. */
function Ch1Visual() {
  const findings = [
    {
      icon: '📱', title: 'Digital-Savvy Population', color: ACCENT,
      points: ['~99% smartphone penetration', '~99% internet penetration', 'High digital literacy; early adopters of new tech'],
      implication: 'Users expect seamless, intuitive experiences — low tolerance for heavy or dated UIs.',
    },
    {
      icon: '💎', title: 'Affluent & Spending Power', color: GOLD,
      points: ['High GDP per capita', 'High disposable income; willingness to pay for convenience and premium services'],
      implication: 'Focus on value-added services, frictionless payment, and tiered/premium features.',
    },
    {
      icon: '🌍', title: 'Diverse & Mobile Population', color: PURPLE,
      points: ['Large expatriate base reliant on digital tools, often sending remittances', 'Young demographic, frequent users of digital services'],
      implication: 'Multi-language support (Arabic and English critical; consider Hindi, Tagalog) plus robust international payments and remittances.',
    },
    {
      icon: '🏛️', title: 'Government Digitalization (QNV 2030)', color: ACCENT_DEEP,
      points: ['"Digitally advanced society" agenda; favorable regulatory environment', 'Government push toward smart cities, e-health, and digital education'],
      implication: 'Design for Hukoomi deep-linking and e-government integration; data security and compliance for citizen services.',
    },
    {
      icon: '⚡', title: 'World-Class Infrastructure', color: GREEN,
      points: ['5G and fiber enable fast, reliable app performance and rich media content'],
      implication: 'Can support complex features: real-time delivery and transport tracking, video support calls.',
    },
  ];

  const opportunities = [
    {
      icon: '🧩', title: 'Fragmented Digital Ecosystem', color: ACCENT,
      points: ['Users juggle 5–10+ apps for daily needs — food, transport, banking, government, shopping'],
      implication: 'The primary value proposition is consolidation and reduced app fatigue.',
    },
    {
      icon: '💳', title: 'Untapped Payment Consolidation', color: GOLD,
      points: ['No truly neutral, widely accepted cross-service wallet dominates outside specific apps', 'Cash on delivery still common in some sectors — an opportunity to shift behavior'],
      implication: 'Prioritize a secure, easy digital wallet (QR, NFC, card linking); emphasize speed and convenience over cash.',
    },
    {
      icon: '🏪', title: 'Niche E-commerce & Local Services', color: PURPLE,
      points: ['Local artisanal goods, specialized home services, and event bookings are fragmented or under-served', 'Potential for a "local marketplace" catering to Qatar\'s community needs (Phase 3)'],
      implication: 'Build a trusted platform for small businesses, local discovery, and review systems.',
    },
  ];

  return (
    <div style={{ margin: '28px 0' }}>
      <BoardLabel>Qatar Market Analysis — five findings</BoardLabel>
      <div style={autoGrid(230)}>
        {findings.map(f => <FindingCard key={f.title} {...f} />)}
      </div>
      <BoardLabel color={GOLD}>Qatar Opportunity Sizing — three white spaces</BoardLabel>
      <div style={autoGrid(230)}>
        {opportunities.map(o => <FindingCard key={o.title} {...o} />)}
      </div>
    </div>
  );
}

/* CH2 — direct competitors with strengths/gaps, indirect tier, and the
   feature-coverage matrix that evidences the white-space claim. */
function Ch2Visual() {
  const direct = [
    {
      name: 'Snoonu', tag: 'Qatar — homegrown super app', color: ACCENT,
      strengths: ['Strong local brand and logistics', 'Broad catalog: food, grocery, pharmacy, e-commerce, courier'],
      gaps: ['Breadth outpaces depth — discovery and IA strain as categories grow'],
    },
    {
      name: 'Talabat', tag: 'Regional — food & q-commerce', color: ACCENT_DEEP,
      strengths: ['Regional scale and refined ordering UX', 'Established loyalty mechanics'],
      gaps: ['Category-limited: food and grocery centric, not a lifestyle platform'],
    },
    {
      name: 'Rafeeq', tag: 'Qatar — local delivery', color: GOLD,
      strengths: ['Local niches competitors ignore (e.g. water, gas, errands)'],
      gaps: ['Smaller scale; utilitarian UX; confined to delivery verticals'],
    },
    {
      name: 'Careem', tag: 'MENA — super app blueprint', color: PURPLE,
      strengths: ['Proven rides→super-app playbook; Careem Pay wallet'],
      gaps: ['Qatar footprint thinner than core UAE market; localization gaps'],
    },
  ];

  const indirect = [
    { icon: '🏦', label: 'Banking apps', desc: 'Own payments trust but not lifestyle frequency' },
    { icon: '🏛️', label: 'Government apps', desc: 'Metrash2, Hukoomi — essential but single-purpose' },
    { icon: '📶', label: 'Telecom self-care', desc: 'High install base, low emotional engagement' },
    { icon: '🌐', label: 'International platforms', desc: 'Global commerce and messaging, weak local integration' },
  ];

  const features = ['Food delivery', 'Grocery / q-commerce', 'Ride-hailing', 'Payments / wallet', 'Government services', 'Telecom services', 'Local marketplace'];
  //           Snoonu  Talabat  Rafeeq  Careem   (● full, ◐ partial, — none)
  const matrix: Record<string, string[]> = {
    'Food delivery':        ['●', '●', '●', '◐'],
    'Grocery / q-commerce': ['●', '●', '◐', '◐'],
    'Ride-hailing':         ['—', '—', '—', '●'],
    'Payments / wallet':    ['◐', '◐', '—', '◐'],
    'Government services':  ['—', '—', '—', '—'],
    'Telecom services':     ['—', '—', '—', '—'],
    'Local marketplace':    ['◐', '—', '—', '—'],
  };
  const players = ['Snoonu', 'Talabat', 'Rafeeq', 'Careem'];

  return (
    <div style={{ margin: '28px 0' }}>
      <BoardLabel>Direct competitors — vertical owners</BoardLabel>
      <div style={autoGrid(240)}>
        {direct.map(({ name, tag, color, strengths, gaps }) => (
          <div key={name} style={{ background: '#14151A', border: `1px solid ${color}33`, borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ background: color, padding: '10px 14px' }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#14151A' }}>{name}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#F4F1EAcc', letterSpacing: '0.04em' }}>{tag}</div>
            </div>
            <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 5 }}>
              {strengths.map(s => (
                <div key={s} style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                  <span style={{ color: GREEN, fontSize: 12, marginTop: 3, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 14, color: MID, lineHeight: 1.5 }}>{s}</span>
                </div>
              ))}
              {gaps.map(g => (
                <div key={g} style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                  <span style={{ color: '#ef4444', fontSize: 12, marginTop: 3, flexShrink: 0 }}>✗</span>
                  <span style={{ fontSize: 14, color: MID, lineHeight: 1.5 }}>{g}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <BoardLabel color={PURPLE}>Indirect competitors — trust and attention holders</BoardLabel>
      <div style={autoGrid(180)}>
        {indirect.map(({ icon, label, desc }) => (
          <div key={label} style={{ background: '#14151A', border: '1px solid #2A2C33', borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: DARK, marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 13.5, color: MID, lineHeight: 1.55 }}>{desc}</div>
          </div>
        ))}
      </div>

      <BoardLabel color={ACCENT_DEEP}>Feature coverage — where the white space lives</BoardLabel>
      <div style={{ background: '#14151A', border: '1px solid #2A2C33', borderRadius: 12, overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 480 }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '10px 14px', fontSize: 13, fontWeight: 800, color: DARK, borderBottom: '2px solid #2A2C33' }}>Capability</th>
              {players.map(p => (
                <th key={p} style={{ padding: '10px 8px', fontSize: 13, fontWeight: 800, color: DARK, borderBottom: '2px solid #2A2C33', textAlign: 'center' }}>{p}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map(f => {
              const whiteSpace = matrix[f].every(v => v !== '●');
              return (
                <tr key={f} style={{ background: whiteSpace ? `${GOLD}10` : 'transparent' }}>
                  <td style={{ padding: '8px 14px', fontSize: 14, fontWeight: whiteSpace ? 800 : 600, color: whiteSpace ? ACCENT : DARK, borderBottom: '1px solid #2A2C33' }}>
                    {f}{whiteSpace && <span style={{ marginLeft: 6, fontSize: 11, fontWeight: 800, color: GOLD, letterSpacing: '0.05em' }}>WHITE SPACE</span>}
                  </td>
                  {matrix[f].map((v, i) => (
                    <td key={i} style={{ padding: '8px', textAlign: 'center', fontSize: 15, color: v === '●' ? GREEN : v === '◐' ? GOLD : '#3A3D45', borderBottom: '1px solid #2A2C33' }}>{v}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div style={{ padding: '8px 14px', fontSize: 12, color: '#696969', borderTop: '1px solid #2A2C33' }}>
          ● full coverage &nbsp;·&nbsp; ◐ partial &nbsp;·&nbsp; — absent
        </div>
      </div>

      <div style={{ marginTop: 16, background: `${GOLD}12`, border: `2px dashed ${GOLD}`, borderRadius: 12, padding: '16px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: ACCENT, marginBottom: 4 }}>THE KEY INSIGHT</div>
        <div style={{ fontSize: 17, color: ACCENT, lineHeight: 1.6 }}>
          Every player owns <strong>one vertical</strong>. None owns the <strong>connective tissue</strong> between them —
          and no one integrates payments, government, and telecom into daily life. That gap is the strategic entry point.
        </div>
      </div>
    </div>
  );
}

/* CH3 — key numbers, behavioral drivers (synthesized insights, not verbatims),
   and the "What this Means" business/product split from the source board. */
function Ch3Visual() {
  const drivers = [
    { theme: '🛡️ Trust decides adoption', insight: 'People avoid platforms that feel complicated, unsafe, or unclear in value. Trust strongly influences whether they adopt at all.' },
    { theme: '⚡ Convenience beats price', insight: 'The hierarchy is convenience > price > brand loyalty. Users prioritize effortless journeys and time savings.' },
    { theme: '😤 Complexity is emotional', insight: 'Users dislike complexity. They want guided flows, transparency, personalization, and reassurance at every risky step.' },
  ];

  return (
    <div style={{ margin: '28px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={autoGrid(150)}>
        <StatCard value="80%+" label="Prefer Digital" sub="prefer managing essential services digitally" />
        <StatCard value="60–70%" label="Onboarding Drop-off" sub="abandon during long or confusing onboarding flows" />
        <StatCard value="25–35%" label="Trust Lifts Completion" sub="completion lift from trust & security reassurance" />
        <StatCard value="3×" label="Simplicity Retains" sub="more likely to stay when the experience feels simple and reliable" />
        <StatCard value="70%+" label="Returning User Value" sub="of platform value comes from returning users" />
      </div>

      <div style={{ background: '#14151A', border: `1px solid ${ACCENT}33`, borderRadius: 12, padding: '16px 20px' }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Behavioral Drivers</div>
        <div style={autoGrid(190)}>
          {drivers.map(({ theme, insight }) => (
            <div key={theme} style={{ background: LIGHT, borderRadius: 8, padding: '12px 14px' }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: ACCENT, marginBottom: 6 }}>{theme}</div>
              <div style={{ fontSize: 14, color: MID, lineHeight: 1.6 }}>{insight}</div>
            </div>
          ))}
        </div>
      </div>

      {/* "What this Means?" board — the research-to-principle bridge */}
      <div style={autoGrid(280)}>
        <div style={{ background: '#14151A', border: '1px solid #fecaca', borderRadius: 12, padding: '16px 18px' }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: ACCENT_DEEP, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>For the Business</div>
          <div style={{ fontSize: 15, color: MID, lineHeight: 1.7 }}>
            The opportunity is to lead through <strong>experience excellence, not just availability</strong> — and that
            demands investment in trust, clarity, and unified journeys to win long-term adoption.
          </div>
        </div>
        <div style={{ background: '#14151A', border: `1px solid ${PURPLE}33`, borderRadius: 12, padding: '16px 18px' }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: PURPLE, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>For UX & Product</div>
          {[
            ['Reduce friction', 'simplify onboarding and navigation'],
            ['Build confidence', 'highlight reassurance, transparency, and guidance'],
            ['Personalize', 'help users feel the platform understands them'],
          ].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 6 }}>
              <span style={{ color: PURPLE, fontSize: 13, marginTop: 3, flexShrink: 0 }}>→</span>
              <span style={{ fontSize: 15, color: MID, lineHeight: 1.6 }}><strong style={{ color: DARK }}>{k}</strong> — {v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* CH4 — per-platform benchmarks first (the comparanda), then the extracted
   patterns and the anti-pattern. */
function Ch4Visual() {
  const benchmarks = [
    { flag: '🇨🇳', name: 'WeChat', region: 'China', hero: 'Messaging', lesson: 'Became a daily operating system: payments as the glue, mini-programs as the ecosystem. Habit first, everything else second.' },
    { flag: '🇸🇬', name: 'Grab', region: 'Southeast Asia', hero: 'Ride-hailing', lesson: 'Won one hero use-case, then layered food, deliveries, and GrabPay onto an existing daily behavior.' },
    { flag: '🇦🇪', name: 'Careem', region: 'MENA', hero: 'Rides', lesson: 'Localization as strategy — cash options, regional payment realities, Arabic-first flows — proved super apps must adapt, not copy.' },
    { flag: '🇨🇴', name: 'Rappi', region: 'Latin America', hero: 'Delivery', lesson: 'Made complex logistics invisible to users; expanded into an "everything app" while keeping the front stage simple.' },
  ];

  const patterns = [
    { icon: '🦸', title: 'Hero-First Expansion', desc: 'Lead with one killer use-case. Win trust. Expand from there. Grab started with rides. WeChat with messaging.' },
    { icon: '✂️', title: 'Simplicity at Scale', desc: "The apps with the most features aren't the most used. Rappi succeeded by making complex logistics feel invisible to users." },
    { icon: '🛡️', title: 'Designed Trust', desc: 'Payments, data permissions, and support flows are trust infrastructure. Users sense when safety is designed in vs. bolted on.' },
    { icon: '💳', title: 'Payments Drive Adoption', desc: 'Every durable super app built a wallet first. Payments create daily utility, which creates habit, which creates lock-in.' },
  ];

  return (
    <div style={{ margin: '28px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={autoGrid(230)}>
        {benchmarks.map(({ flag, name, region, hero, lesson }) => (
          <div key={name} style={{ background: '#14151A', border: '1px solid #2A2C33', borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 22 }}>{flag}</span>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: DARK }}>{name}</div>
                <div style={{ fontSize: 12, color: '#696969', fontWeight: 600 }}>{region} · hero: {hero}</div>
              </div>
            </div>
            <div style={{ fontSize: 14, color: MID, lineHeight: 1.6 }}>{lesson}</div>
          </div>
        ))}
      </div>

      <BoardLabel>Four durable patterns</BoardLabel>
      <div style={autoGrid(240)}>
        {patterns.map(({ icon, title, desc }) => (
          <div key={title} style={{ background: '#14151A', border: '1px solid #2A2C33', borderRadius: 12, padding: '16px 18px' }}>
            <div style={{ fontSize: 26, marginBottom: 8 }}>{icon}</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: DARK, marginBottom: 6 }}>{title}</div>
            <div style={{ fontSize: 14, color: MID, lineHeight: 1.6 }}>{desc}</div>
          </div>
        ))}
      </div>

      <div style={{ background: '#14151A', border: '1px solid #fecaca', borderRadius: 12, padding: '14px 18px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <div style={{ fontSize: 24, flexShrink: 0 }}>⚠️</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#dc2626', marginBottom: 4 }}>THE ANTI-PATTERN: Feature Dumping</div>
          <div style={{ fontSize: 15, color: '#7f1d1d', lineHeight: 1.6 }}>
            Apps that launch with 20 features to compete immediately create cognitive overload, dilute their brand proposition,
            and fail to build the trust required for users to return. More features ≠ more value.
          </div>
        </div>
      </div>
    </div>
  );
}

/* CH5 — five strategic themes plus the phased build sequence that turns
   themes into a roadmap. */
function Ch5Visual() {
  const themes = [
    { num: '01', icon: '🔗', title: 'Radical Integration', color: ACCENT, desc: 'Connect services users currently switch between: telecom, food, mobility, payments, government.' },
    { num: '02', icon: '💳', title: 'Trusted Wallet Layer', color: ACCENT_DEEP, desc: 'A telecom-backed digital wallet carries inherited trust. This is the unfair advantage no pure-play startup has.' },
    { num: '03', icon: '☀️', title: 'Daily Utility Hook', color: GREEN, desc: 'Own a high-frequency daily behavior (bill pay, top-up, transit) to build the habit that brings users back.' },
    { num: '04', icon: '🎯', title: 'Smart Personalization', color: PURPLE, desc: 'Use telecom data (location, usage, demographics) responsibly to surface relevant services at the right moment.' },
    { num: '05', icon: '✨', title: 'Experience as Strategy', color: GOLD, desc: 'In a market where competitors are functional, a beautifully designed experience is a competitive moat, not a nice-to-have.' },
  ];

  const phases = [
    { phase: 'Phase 1', title: 'Earn the habit', color: ACCENT, items: 'Hero services + telecom core (bills, top-up), onboarding excellence, trust signals from day one.' },
    { phase: 'Phase 2', title: 'Own the wallet', color: ACCENT_DEEP, items: 'Unified wallet (QR, NFC, card linking), daily utility expansion, e-government integration via Hukoomi.' },
    { phase: 'Phase 3', title: 'Open the ecosystem', color: PURPLE, items: 'Local marketplace for small businesses, partner services, personalization at scale.' },
  ];

  return (
    <div style={{ margin: '28px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
      {themes.map(({ num, icon, title, color, desc }) => (
        <div key={num} style={{ background: '#14151A', border: `1px solid ${color}33`, borderRadius: 12, padding: '14px 18px', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <div style={{ width: 36, height: 36, background: `${color}18`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
            {icon}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 800, color, letterSpacing: '0.1em' }}>{num}</span>
              <span style={{ fontSize: 16, fontWeight: 800, color: DARK }}>{title}</span>
            </div>
            <div style={{ fontSize: 15, color: MID, lineHeight: 1.6 }}>{desc}</div>
          </div>
        </div>
      ))}

      <BoardLabel color={ACCENT_DEEP}>Sequenced into a build logic</BoardLabel>
      <div style={autoGrid(210)}>
        {phases.map(({ phase, title, color, items }) => (
          <div key={phase} style={{ background: '#14151A', border: `1px solid ${color}33`, borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ background: `${color}12`, padding: '8px 14px', borderBottom: `2px solid ${color}` }}>
              <span style={{ fontSize: 12, fontWeight: 800, color, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{phase}</span>
              <span style={{ fontSize: 15, fontWeight: 800, color: DARK, marginLeft: 8 }}>{title}</span>
            </div>
            <div style={{ padding: '12px 14px', fontSize: 14, color: MID, lineHeight: 1.6 }}>{items}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* CH6 — three brand routes, recommendation, positioning territory, and
   personality attributes. */
function Ch6Visual() {
  const routes = [
    {
      label: 'Route A', title: 'Extend the Telecom Brand', color: '#696969',
      pros: ['Inherited trust immediately', 'Lower marketing investment'],
      cons: ['Perceived as a utility, not a lifestyle app', 'Limits emotional appeal and youth adoption'],
      selected: false,
    },
    {
      label: 'Route B', title: 'Standalone Lifestyle Brand', color: PURPLE,
      pros: ['Full creative freedom', 'No legacy brand baggage'],
      cons: ['Zero inherited trust', 'High CAC to build brand from scratch'],
      selected: false,
    },
    {
      label: 'Route C', title: 'New Brand, Endorsed by Telecom', color: ACCENT,
      pros: ['Fresh lifestyle positioning', 'Telecom endorsement provides trust scaffolding', 'Attracts new audience segments'],
      cons: ['Requires clear brand architecture discipline'],
      selected: true,
    },
  ];

  const personality = ['Trustworthy', 'Effortless', 'Local at heart', 'Warm, not corporate', 'Quietly premium'];

  return (
    <div style={{ margin: '28px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={autoGrid(230)}>
        {routes.map(({ label, title, color, pros, cons, selected }) => (
          <div key={label} style={{ background: selected ? `${color}08` : '#14151A', border: selected ? `2px solid ${color}` : '1px solid #2A2C33', borderRadius: 12, overflow: 'hidden', position: 'relative' }}>
            {selected && (
              <div style={{ position: 'absolute', top: 10, right: 10, background: color, color: '#14151A', fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 20, letterSpacing: '0.06em' }}>
                RECOMMENDED
              </div>
            )}
            <div style={{ padding: '14px 14px 0' }}>
              <div style={{ fontSize: 11, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: DARK, lineHeight: 1.3, marginBottom: 10 }}>{title}</div>
            </div>
            <div style={{ padding: '0 14px 14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {pros.map(p => (
                <div key={p} style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                  <span style={{ color: GREEN, fontSize: 12, flexShrink: 0, marginTop: 2 }}>✓</span>
                  <span style={{ fontSize: 13, color: MID, lineHeight: 1.5 }}>{p}</span>
                </div>
              ))}
              {cons.map(c => (
                <div key={c} style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                  <span style={{ color: '#ef4444', fontSize: 12, flexShrink: 0, marginTop: 2 }}>✗</span>
                  <span style={{ fontSize: 13, color: MID, lineHeight: 1.5 }}>{c}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: `${ACCENT}0d`, border: `1px solid ${ACCENT}33`, borderRadius: 10, padding: '14px 18px', textAlign: 'center' }}>
        <div style={{ fontSize: 14, color: ACCENT, fontWeight: 700 }}>
          Decision: A new lifestyle brand — visually and tonally distinct — with the telecom brand as a trust endorser, not the face.
        </div>
      </div>

      <div style={{ background: '#14151A', border: '1px solid #2A2C33', borderRadius: 12, padding: '16px 18px' }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: DARK, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Positioning Territory</div>
        <div style={{ fontSize: 15.5, color: MID, lineHeight: 1.7, marginBottom: 12 }}>
          For people living in Qatar who juggle a fragmented digital life, this is the one trusted place where everyday
          essentials — payments, services, and local life — simply work together.
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {personality.map(p => <Tag key={p} color={ACCENT_DEEP}>{p}</Tag>)}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────── Main component ──────────────────────────── */
export default function SuperAppCaseStudy({ onNavigate }: Props) {
  const [activeChapter, setActiveChapter] = useState('ch1');
  const chapterRefs = useRef<Record<string, HTMLElement | null>>({});

  /* Accordion state — first chapter open by default. */
  const [openChapters, setOpenChapters] = useState<Record<string, boolean>>({ ch1: true });
  const isOpen = (id: string) => !!openChapters[id];
  const toggleChapter = (id: string) => setOpenChapters(o => ({ ...o, [id]: !o[id] }));
  const allOpen = CHAPTERS.every(c => openChapters[c.id]);
  const toggleAll = () =>
    setOpenChapters(allOpen ? {} : Object.fromEntries(CHAPTERS.map(c => [c.id, true])));

  /* Track which chapter is in view */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    CHAPTERS.forEach(({ id }) => {
      const el = chapterRefs.current[id];
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveChapter(id); },
        { rootMargin: '-30% 0px -60% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const activeIndex = CHAPTERS.findIndex(c => c.id === activeChapter);
  const progress = ((activeIndex + 1) / CHAPTERS.length) * 100;

  return (
    <div style={{ minHeight: '100vh', background: '#0E0F13', fontFamily: "'Inter', sans-serif" }}>
      {/* Animation keyframes for the flow arrows / illustrations */}
      <style>{`
        @keyframes arrow-draw {
          0%   { stroke-dashoffset: 30; opacity: 0.2; }
          45%  { stroke-dashoffset: 0;  opacity: 1; }
          80%  { stroke-dashoffset: 0;  opacity: 1; }
          100% { stroke-dashoffset: 0;  opacity: 0.2; }
        }
        @keyframes arrow-head {
          0%, 30% { transform: translateX(-4px); opacity: 0; }
          55%     { transform: translateX(0);   opacity: 1; }
          80%     { transform: translateX(2px);  opacity: 1; }
          100%    { transform: translateX(2px);  opacity: 0.2; }
        }
        @keyframes flow-dash { to { stroke-dashoffset: -16; } }
        @keyframes hex-pulse {
          0%, 100% { opacity: 0.5; }
          50%      { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="arrow-draw"], [style*="arrow-head"], [style*="flow-dash"], [style*="hex-pulse"] { animation: none !important; }
        }
      `}</style>
      {/* ── Top progress bar ── */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 3, background: '#2A2C33', zIndex: 60 }} aria-hidden="true">
        <div style={{ height: '100%', background: ACCENT, width: `${progress}%`, transition: 'width 0.4s ease' }} />
      </div>

      {/* ── Page content — full width, no side navigation ── */}
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '48px 24px 96px' }}>

        {/* Back button */}
        <button onClick={() => onNavigate('projects')} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: MID, fontSize: 15, fontWeight: 600, marginBottom: 40, padding: 0 }}>
          <ArrowLeft size={14} /> Back to Projects
        </button>

        {/* ── Hero ── */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
            <Tag color={ACCENT}>Strategic UX Architect</Tag>
            <Tag color={ACCENT_DEEP}>Market Research</Tag>
            <Tag color={PURPLE}>Product Strategy</Tag>
            <Tag color={GOLD}>Brand Positioning</Tag>
          </div>
          <h1 style={{ fontFamily: "'Roboto', 'Helvetica Neue', sans-serif", fontSize: 'clamp(36px, 5.5vw, 62px)', fontWeight: 300, color: DARK, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 16 }}>
            Designing a Super App<br />
            <span style={{ fontStyle: 'italic', color: ACCENT }}>Worth Trusting.</span>
          </h1>
          <p style={{ fontSize: 20, color: MID, lineHeight: 1.7, maxWidth: 560, marginBottom: 24 }}>
            A strategic UX case study for a telecom brand entering Qatar's digital ecosystem — from market research to brand strategy to product architecture.
          </p>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[['Context', 'Qatar · GCC Market Entry'], ['Scope', 'Research → Strategy → Architecture'], ['Output', 'Strategic Roadmap + Brand Framework']].map(([k, v]) => (
              <div key={k}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#696969', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>{k}</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: DARK }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Accordion toolbar — skim the six takeaways, expand what interests you */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid #2A2C33' }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: MID, letterSpacing: '0.1em', textTransform: 'uppercase' }}>The engagement, in six chapters</div>
          <button onClick={toggleAll} style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: ACCENT, background: 'none', border: 'none', cursor: 'pointer' }}>
            {allOpen ? 'Collapse all' : 'Expand all'}
          </button>
        </div>

        {/* ── Chapter 1 ── */}
        <Chapter id="ch1" num="01" label="The Opening Question" takeaway="The opportunity isn't to add a feature — it's to remove someone's chaos." open={isOpen('ch1')} onToggle={() => toggleChapter('ch1')} innerRef={el => { chapterRefs.current['ch1'] = el; }}>
          <Body>
            Qatar is a near-total digital society: ~99% smartphone and internet penetration, world-class 5G and fiber, high disposable income, and a young, diverse population that prefers digital for everyday services — accelerated by QNV 2030. But high digital readiness doesn't mean users want more apps; it means they're ready for a better one.
          </Body>
          <Body>
            The brief arrived as: "should we add digital services to our telecom app?" We reframed it: "could a telecom brand — with its trust, infrastructure, and reach — become the platform that connects the fragmented digital life of people in Qatar?" A fundamentally different question. The analysis then ran as a finding-to-implication chain: every market signal translated into a UX consequence before any product decision.
          </Body>
          <Callout icon="💡">The strategic reframe: from "add a feature" to "become the connective tissue of daily digital life."</Callout>
          <Ch1Visual />
        </Chapter>

        {/* ── Chapter 2 ── */}
        <Chapter id="ch2" num="02" label="The Competitive Landscape" takeaway="Everyone owns a vertical. Nobody owns the space between them." open={isOpen('ch2')} onToggle={() => toggleChapter('ch2')} innerRef={el => { chapterRefs.current['ch2'] = el; }}>
          <Body>
            We mapped the landscape in two tiers. Direct competitors — Snoonu, Talabat, Rafeeq, Careem — were profiled for strengths, weaknesses, and UX gaps. The more revealing tier was indirect: banking apps, government platforms like Metrash2 and Hukoomi, telecom self-care, international commerce. Each holds a fragment of the user's trust without competing for the whole day.
          </Body>
          <Body>
            The feature-coverage matrix made the white space undeniable: no player integrates payments, government services, and telecom into one lifestyle layer. The handoff between verticals — finishing a food order and paying a bill, ending a commute and ordering groceries — is owned by no one. That gap is the entry point.
          </Body>
          <Ch2Visual />
        </Chapter>

        {/* ── Chapter 3 ── */}
        <Chapter id="ch3" num="03" label="The Human Truth" takeaway="Users don't want features. They want confidence that the app won't waste their time." open={isOpen('ch3')} onToggle={() => toggleChapter('ch3')} innerRef={el => { chapterRefs.current['ch3'] = el; }}>
          <Body>
            Consumer behavior research across Qatar's expat and national demographics revealed a clear hierarchy: convenience beats price, which beats brand loyalty. Willingness to adopt is high — but only when value is clear and friction is low. Adoption drops sharply when onboarding is long, services feel fragmented, or the UX lacks confidence signals.
          </Body>
          <Body>
            The numbers agree. Drop-off on poor onboarding (60–70%) isn't a bug to fix later — it's a business-critical risk to design out from day one. The trust-to-completion lift (25–35%) makes brand equity a conversion driver, not a marketing asset. With returning users generating 70%+ of platform value, retention — not acquisition — defines the brief.
          </Body>
          <Ch3Visual />
        </Chapter>

        {/* ── Chapter 4 ── */}
        <Chapter id="ch4" num="04" label="The Global Benchmark" takeaway="The pattern is consistent: one great thing first. Many things later." open={isOpen('ch4')} onToggle={() => toggleChapter('ch4')} innerRef={el => { chapterRefs.current['ch4'] = el; }}>
          <Body>
            Analysing WeChat (China), Grab (Southeast Asia), Careem (MENA), and Rappi (Latin America), four durable patterns emerged. None started by launching everything at once — and attempts to clone WeChat's end-state elsewhere, without earning the habit first, consistently failed.
          </Body>
          <Body>
            Payments were the most instructive insight: every platform achieving durable daily use locked its position in through a wallet layer first. Payments aren't a feature — they're what turns occasional use into daily ritual. Careem added a second lesson: localization is strategy, not polish.
          </Body>
          <Ch4Visual />
        </Chapter>

        {/* ── Chapter 5 ── */}
        <Chapter id="ch5" num="05" label="The Synthesis" takeaway="Five strategic themes that turn research into a buildable product direction." open={isOpen('ch5')} onToggle={() => toggleChapter('ch5')} innerRef={el => { chapterRefs.current['ch5'] = el; }}>
          <Body>
            From the competitive audit, behavioral research, and benchmark analysis, five strategic opportunity themes emerged — not feature lists, but design principles shaping every decision from architecture to copy.
          </Body>
          <Body>
            The themes are sequenced into a phased build: integration creates the platform, the wallet creates the habit, daily utility creates return behavior, personalization creates loyalty, and experience becomes the moat. The local marketplace — under-served per the analysis — is held for Phase 3, after trust and habit are earned.
          </Body>
          <Ch5Visual />
        </Chapter>

        {/* ── Chapter 6 ── */}
        <Chapter id="ch6" num="06" label="The Brand Decision" takeaway="The brand has to feel like it belongs to the user — not to the telco." open={isOpen('ch6')} onToggle={() => toggleChapter('ch6')} innerRef={el => { chapterRefs.current['ch6'] = el; }}>
          <Body>
            Three branding routes were evaluated: extending the telecom brand directly, a standalone lifestyle brand with no visible connection, or a new brand with the telecom as a visible but secondary endorser.
          </Body>
          <Body>
            The recommendation was Route C — a new lifestyle brand with telecom endorsement. A pure brand extension limits positioning to "utility," which works for bills but not daily lifestyle integration. A standalone brand abandons the client's most valuable asset: a decade of trust with millions of subscribers.
          </Body>
          <Ch6Visual />
        </Chapter>

        {/* ── Pull quote ── */}
        <div style={{ borderTop: `4px solid ${ACCENT}`, paddingTop: 48, marginTop: 48, marginBottom: 48 }}>
          <blockquote style={{ fontFamily: "'Roboto', 'Helvetica Neue', sans-serif", fontSize: 'clamp(24px, 2.8vw, 34px)', fontStyle: 'italic', fontWeight: 300, color: DARK, lineHeight: 1.4, letterSpacing: '-0.02em', margin: 0 }}>
            "The opportunity isn't to build another app with many features — it's to build a <span style={{ color: ACCENT }}>trusted, integrated, personalized ecosystem</span> that becomes part of daily routine."
          </blockquote>
          <div style={{ marginTop: 16, fontSize: 15, color: '#696969', fontWeight: 600 }}>— Strategic Synthesis, Qatar Super App Engagement</div>
        </div>

        {/* ── Read this next ── */}
        <NextProject current="superapp" onNavigate={onNavigate} />

        {/* ── Shared call-out banner ── */}
        <CalloutBanner onNavigate={onNavigate} />

        {/* ── Back link ── */}
        <div style={{ marginTop: 48 }}>
          <button onClick={() => onNavigate('projects')} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: MID, fontSize: 16, fontWeight: 600, padding: 0 }}>
            <ArrowLeft size={15} /> Back to all projects
          </button>
        </div>
      </div>
    </div>
  );
}