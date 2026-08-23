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
const ACCENT      = '#2D9D94';  // primary accent (mint green, brand)
const ACCENT_DEEP = '#34ad92';  // deeper mint
const GOLD        = '#34D399';  // secondary accent — emerald green (distinct from primary mint)
const PURPLE      = '#e0d9c3';  // violet — third accent
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

/* Title-only pill — surfaces just the headline of a finding / theme / route
   with all supporting detail stripped out, for a fast, skimmable read.
   Items can carry an optional badge (e.g. the recommended brand route). */
type PillItem = string | { label: string; badge?: string };
function TitlePills({ items, color = ACCENT }: { items: PillItem[]; color?: string }) {
  return (
    <div style={autoGrid(200)}>
      {items.map(it => {
        const label = typeof it === 'string' ? it : it.label;
        const badge = typeof it === 'string' ? undefined : it.badge;
        return (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#14151A', border: `1px solid ${color}33`, borderRadius: 10, padding: '14px 16px' }}>
            <svg width="10" height="10" viewBox="0 0 10 10" style={{ flexShrink: 0 }} aria-hidden="true">
              <polygon points="5,0.5 9.33,3 9.33,7.5 5,10 0.67,7.5 0.67,3" fill={color} />
            </svg>
            <span style={{ fontSize: 15, fontWeight: 700, color: DARK, lineHeight: 1.3 }}>{label}</span>
            {badge && <span style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 800, color: '#14151A', background: color, padding: '2px 8px', borderRadius: 20, letterSpacing: '0.06em', flexShrink: 0 }}>{badge}</span>}
          </div>
        );
      })}
    </div>
  );
}

/* One- or two-sentence synthesis that closes a group of titles — the "so what"
   under the headlines. */
function GroupTakeaway({ children, color = ACCENT }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{ margin: '14px 0 4px', borderLeft: `3px solid ${color}`, padding: '2px 0 2px 16px' }}>
      <span style={{ fontSize: 16.5, color: DARK, lineHeight: 1.65 }}>{children}</span>
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
          <span style={{ fontSize: 13, fontWeight: 500, color: ACCENT, letterSpacing: '0.14em' }}>STEP {num}</span>
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

/* STEP 1 — Qatar market analysis and opportunity sizing, reduced to headline
   findings with a synthesis line under each group. */
function Ch1Visual() {
  const findings = [
    'Digital-Savvy Population',
    'Affluent & Spending Power',
    'Diverse & Mobile Population',
    'Government Digitalization (QNV 2030)',
    'World-Class Infrastructure',
  ];
  const opportunities = [
    'Fragmented Digital Ecosystem',
    'Untapped Payment Consolidation',
    'Niche E-commerce & Local Services',
  ];

  return (
    <div style={{ margin: '28px 0' }}>
      <BoardLabel>Qatar Market Analysis — five findings</BoardLabel>
      <TitlePills items={findings} />
      <GroupTakeaway>A high digital readiness doesn't mean users want more apps; it means they're ready for a better one.</GroupTakeaway>

      <BoardLabel color={GOLD}>Qatar Opportunity Sizing — three findings</BoardLabel>
      <TitlePills items={opportunities} color={GOLD} />
      <GroupTakeaway color={GOLD}>None of these gaps is a missing app — it's a missing connection. The opening is the trusted, wallet-led layer that ties fragmented services into one daily habit.</GroupTakeaway>
    </div>
  );
}

/* STEP 2 — two tiers studied for what to learn: direct competitors for the
   strengths to match and weaknesses to design out, indirect competitors for
   the single best feature worth borrowing into the super app. */
function Ch2Visual() {
  const direct = ['Snoonu', 'Talabat', 'Rafeeq', 'Careem'];
  const indirect = ['Banking apps', 'Government apps', 'Telecom self-care', 'International platforms'];

  return (
    <div style={{ margin: '28px 0' }}>
      <BoardLabel>Direct competitors — strengths to match, gaps to design out</BoardLabel>
      <TitlePills items={direct} />
      <GroupTakeaway>Each leads a vertical worth learning from — Snoonu's local logistics and breadth, Talabat's polished ordering and loyalty, Rafeeq's grip on hyper-local errands, Careem's rides-to-wallet playbook — and each reveals a gap to avoid: strength in one category rarely carried the depth or lifestyle breadth a super app needs.</GroupTakeaway>

      <BoardLabel color={PURPLE}>Indirect competitors — best features worth borrowing</BoardLabel>
      <TitlePills items={indirect} color={PURPLE} />
      <GroupTakeaway color={PURPLE}>None competes for the whole day, but each does one thing worth taking into the super app: banking apps' payment trust and security, government apps' essential service integration (Metrash2, Hukoomi), telecom self-care's massive install base, and international platforms' commerce and messaging polish.</GroupTakeaway>
    </div>
  );
}

/* STEP 3 — the behavioral drivers behind adoption, stripped to their headlines. */
function Ch3Visual() {
  const drivers = ['Trust decides adoption', 'Convenience beats price', 'Complexity is emotional'];

  return (
    <div style={{ margin: '28px 0' }}>
      <BoardLabel>Behavioral drivers</BoardLabel>
      <TitlePills items={drivers} />
      <GroupTakeaway>Users don't want more features — they want confidence the app won't waste their time. Retention, not acquisition, is won by removing friction and signalling trust at every risky step.</GroupTakeaway>
    </div>
  );
}

/* STEP 4 — global benchmarks and the durable patterns they share. */
function Ch4Visual() {
  const benchmarks = ['WeChat', 'Grab', 'Careem', 'Rappi'];
  const patterns = ['Hero-First Expansion', 'Simplicity at Scale', 'Designed Trust', 'Payments Drive Adoption'];

  return (
    <div style={{ margin: '28px 0' }}>
      <BoardLabel>Global benchmarks</BoardLabel>
      <TitlePills items={benchmarks} />

      <BoardLabel color={ACCENT_DEEP}>Four durable patterns</BoardLabel>
      <TitlePills items={patterns} color={ACCENT_DEEP} />

      <GroupTakeaway>One great thing first, many things later. Every durable super app earned the habit — usually through payments — before it expanded; the ones that launched with everything drowned in their own features.</GroupTakeaway>
    </div>
  );
}

/* STEP 5 — strategic themes sequenced into a phased build. */
function Ch5Visual() {
  const themes = ['Radical Integration', 'Trusted Wallet Layer', 'Daily Utility Hook', 'Smart Personalization', 'Experience as Strategy'];
  const phases = ['Phase 1 — Earn the habit', 'Phase 2 — Own the wallet', 'Phase 3 — Open the ecosystem'];

  return (
    <div style={{ margin: '28px 0' }}>
      <BoardLabel>Five strategic themes</BoardLabel>
      <TitlePills items={themes} />

      <BoardLabel color={ACCENT_DEEP}>Sequenced into a build logic</BoardLabel>
      <TitlePills items={phases} color={ACCENT_DEEP} />

      <GroupTakeaway>Integration builds the platform, the wallet builds the habit, and experience becomes the moat — sequenced so trust is earned before the ecosystem opens.</GroupTakeaway>
    </div>
  );
}

/* STEP 6 — the three brand routes and the personality behind the chosen one. */
function Ch6Visual() {
  const routes: PillItem[] = [
    'Route A — Extend the Telecom Brand',
    'Route B — Standalone Lifestyle Brand',
    { label: 'Route C — New Brand, Endorsed by Telecom', badge: 'RECOMMENDED' },
  ];
  const personality = ['Trustworthy', 'Effortless', 'Local at heart', 'Warm, not corporate', 'Quietly premium'];

  return (
    <div style={{ margin: '28px 0' }}>
      <BoardLabel>Three brand routes</BoardLabel>
      <TitlePills items={routes} />
      <GroupTakeaway>The answer was Route C — a new lifestyle brand with the telecom as a trust endorser, not the face: fresh enough to feel like the user's, backed enough to be trusted.</GroupTakeaway>

      <BoardLabel color={ACCENT_DEEP}>Brand personality</BoardLabel>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {personality.map(p => <Tag key={p} color={ACCENT_DEEP}>{p}</Tag>)}
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
            <span style={{ color: ACCENT }}>Worth Trusting.</span>
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
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: MID, letterSpacing: '0.1em', textTransform: 'uppercase' }}>The engagement, in six steps</div>
          <button onClick={toggleAll} style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: ACCENT, background: 'none', border: 'none', cursor: 'pointer' }}>
            {allOpen ? 'Collapse all' : 'Expand all'}
          </button>
        </div>

        {/* ── Chapter 1 ── */}
        <Chapter id="ch1" num="01" label="The Opening Question" takeaway="How can I transform my existing platform to a super app?" open={isOpen('ch1')} onToggle={() => toggleChapter('ch1')} innerRef={el => { chapterRefs.current['ch1'] = el; }}>
          <Body>
            This is how we approached the question. We reframed it: "could a telecom brand — with its trust, infrastructure, and reach — become the platform that connects the fragmented digital life of people in Qatar?"
          </Body>
          <Ch1Visual />
        </Chapter>

        {/* ── Chapter 2 ── */}
        <Chapter id="ch2" num="02" label="The Competitive Landscape" takeaway="Match what the leaders do well, borrow the best from the rest." open={isOpen('ch2')} onToggle={() => toggleChapter('ch2')} innerRef={el => { chapterRefs.current['ch2'] = el; }}>
          <Body>
            We studied the landscape in two tiers, looking for what to learn. Direct competitors — Snoonu, Talabat, Rafeeq, Careem — were profiled for the strengths worth matching and the weaknesses worth designing out. Indirect competitors — banking apps, government platforms like Metrash2 and Hukoomi, telecom self-care, international commerce — were mined for the single feature each does best, to fold into the super app.
          </Body>
          <Ch2Visual />
        </Chapter>

        {/* ── Chapter 3 ── */}
        <Chapter id="ch3" num="03" label="The Human Truth" takeaway="Users don't want features. They want confidence that the app won't waste their time." open={isOpen('ch3')} onToggle={() => toggleChapter('ch3')} innerRef={el => { chapterRefs.current['ch3'] = el; }}>
          <Body>
            Consumer behavior research across Qatar's expat and national demographics revealed a clear hierarchy: convenience beats price, which beats brand loyalty. Willingness to adopt is high — but only when value is clear and friction is low. Adoption drops sharply when onboarding is long, services feel fragmented, or the UX lacks confidence signals.
          </Body>
          <Ch3Visual />
        </Chapter>

        {/* ── Chapter 4 ── */}
        <Chapter id="ch4" num="04" label="The Global Benchmark" takeaway="The pattern is consistent: one great thing first. Many things later." open={isOpen('ch4')} onToggle={() => toggleChapter('ch4')} innerRef={el => { chapterRefs.current['ch4'] = el; }}>
          <Body>
            Analysing WeChat (China), Grab (Southeast Asia), Careem (MENA), and Rappi (Latin America), four durable patterns emerged. None started by launching everything at once — and attempts to clone WeChat's end-state elsewhere, without earning the habit first, consistently failed.
          </Body>
          <Ch4Visual />
        </Chapter>

        {/* ── Chapter 5 ── */}
        <Chapter id="ch5" num="05" label="The Synthesis" takeaway="Five strategic themes that turn research into a buildable product direction." open={isOpen('ch5')} onToggle={() => toggleChapter('ch5')} innerRef={el => { chapterRefs.current['ch5'] = el; }}>
          <Body>
            From the competitive audit, behavioral research, and benchmark analysis, five strategic opportunity themes emerged — not feature lists, but design principles shaping every decision from architecture to copy.
          </Body>
          <Ch5Visual />
        </Chapter>

        {/* ── Chapter 6 ── */}
        <Chapter id="ch6" num="06" label="The Brand Decision" takeaway="The brand has to feel like it belongs to the user — not to the telco." open={isOpen('ch6')} onToggle={() => toggleChapter('ch6')} innerRef={el => { chapterRefs.current['ch6'] = el; }}>
          <Body>
            Three branding routes were evaluated: extending the telecom brand directly, a standalone lifestyle brand with no visible connection, or a new brand with the telecom as a visible but secondary endorser.
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