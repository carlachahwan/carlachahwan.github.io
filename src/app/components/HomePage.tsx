import { ArrowRight, Download, Compass, BarChart2, Users, Layers } from 'lucide-react';
import { Page } from '../App';
import { downloadCV } from '../utils/downloadCV';
import ClientLogos from './ClientLogos';
import { T, Eyebrow, HexMark, hexPoints, glow } from './playbook';
import { CaseStudiesArt, MobileLogicArt, WireframeArt, WorkArtKeyframes } from './WorkIllustrations';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

/* Each pillar carries its own accent — the warm base lifted by the vibrant
   cyan/mint so the row reads as four distinct disciplines, not one block. */
const expertise = [
  {
    icon: <Compass size={20} />,
    accent: T.amber,
    title: 'UX Strategy',
    desc: 'Translating business objectives into user-centered digital roadmaps through discovery, research synthesis, and strategic frameworks.',
  },
  {
    icon: <Layers size={20} />,
    accent: T.cyan,
    title: 'Information Architecture',
    desc: 'Designing scalable content structures, navigation systems, and mental models that reduce cognitive load across complex platforms.',
  },
  {
    icon: <BarChart2 size={20} />,
    accent: T.mint,
    title: 'Research & Analytics',
    desc: 'Conducting user research, heuristic audits, heatmap analysis, and behavioral analytics to drive evidence-based design decisions.',
  },
  {
    icon: <Users size={20} />,
    accent: T.gold,
    title: 'Product Leadership',
    desc: 'Orchestrating cross-functional teams of developers, designers, and stakeholders from ideation through delivery.',
  },
];

/* The three strands of work surfaced on the homepage — each maps to a tab on
   the Projects page. */
const workCategories = [
  {
    label: 'Strategy · Research',
    title: 'Case Studies',
    description: 'End-to-end UX strategy engagements — market research, competitive analysis, information architecture, and the product direction that came out of them.',
    art: CaseStudiesArt,
  },
  {
    label: 'Mobile · Product',
    title: 'Mobile App Design Logic',
    description: 'The thinking behind mobile products — how a business concept becomes a wireframe, and how that logic shows up in the UI that shipped.',
    art: MobileLogicArt,
  },
  {
    label: 'Structure · Flow',
    title: 'Wireframe',
    description: 'Low-fidelity structure work — turning a business strategy into screens, flows, and the architecture a team can build against.',
    art: WireframeArt,
  },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div style={{ background: T.bg, fontFamily: T.sans }}>
      <WorkArtKeyframes />
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ background: T.bg, paddingTop: 72, minHeight: '100vh', display: 'flex', alignItems: 'center' }}
      >
        {/* Signature hex bleed, top-right — with a filled amber wedge */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1160 620" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <polygon points={hexPoints(1120, -40, 400)} fill="none" stroke={T.amber} strokeWidth="1.5" opacity="0.1" />
          <clipPath id="hero-clip"><rect x="760" y="250" width="440" height="400" /></clipPath>
          <polygon points={hexPoints(1120, -40, 400)} fill={T.amber} opacity="0.9" clipPath="url(#hero-clip)" />
        </svg>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-24 w-full">
          <div className="max-w-4xl">
            <Eyebrow>Strategic UX Architect · Beirut, Lebanon</Eyebrow>

            <h1
              style={{
                fontFamily: T.serif,
                fontSize: 'clamp(50px, 8vw, 98px)',
                fontWeight: 300,
                color: T.text,
                lineHeight: 1.02,
                letterSpacing: '-0.03em',
                marginTop: 24,
                marginBottom: 32,
              }}
            >
              Architecting Systems<br />
              <span style={{ fontStyle: 'italic', color: T.amber }}>That Think</span>
              <span> &amp; Scale.</span>
            </h1>

            <p style={{ fontSize: 19, color: T.sage, lineHeight: 1.75, maxWidth: 560, marginBottom: 40 }}>
              I'm Carla Chahwan — a UX Strategy & Architecture leader with 9 years building
              intuitive, data-driven digital experiences across SaaS, eCommerce, and enterprise
              platforms in the MENA region and globally.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('projects')}
                className="flex items-center gap-2 transition-all"
                style={{ background: T.amber, color: T.bg, fontSize: 16, fontWeight: 600, padding: '14px 28px', letterSpacing: '0.01em', border: 'none', cursor: 'pointer', borderRadius: 3 }}
                onMouseEnter={e => (e.currentTarget.style.background = T.amberDeep)}
                onMouseLeave={e => (e.currentTarget.style.background = T.amber)}
              >
                View Projects <ArrowRight size={16} />
              </button>
              <button
                onClick={downloadCV}
                className="flex items-center gap-2 transition-all"
                style={{ border: `1px solid ${T.line}`, color: T.text, fontSize: 16, fontWeight: 500, padding: '14px 28px', background: 'transparent', cursor: 'pointer', borderRadius: 3 }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = T.amber; e.currentTarget.style.color = T.amber; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = T.line; e.currentTarget.style.color = T.text; }}
              >
                <Download size={15} />
                Download CV
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-x-20 sm:gap-x-28 gap-y-8 mt-16 pt-12 border-t" style={{ borderColor: T.line }}>
              {[['9', 'Years Experience'], ['15+', 'Products Shipped'], ['5', 'Countries Served']].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: T.serif, fontSize: 42, fontWeight: 300, color: T.text, letterSpacing: '-0.03em', lineHeight: 1 }}>{num}</div>
                  <div style={{ fontSize: 14, color: T.dim, marginTop: 8, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <ClientLogos />

      {/* Core Expertise */}
      <section style={{ background: T.bg, padding: '104px 0', borderTop: `1px solid ${T.line}` }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-16">
            <Eyebrow color={T.amber}>Core Expertise</Eyebrow>
            <h2 style={{ fontFamily: T.serif, fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: 300, color: T.text, letterSpacing: '-0.025em', lineHeight: 1.1, maxWidth: 520, marginTop: 18 }}>
              End-to-end UX across<br />the full product lifecycle.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertise.map(({ icon, accent, title, desc }) => (
              <div
                key={title}
                className="transition-all"
                style={{ background: T.bgCard, border: `1px solid ${T.line}`, borderRadius: 10, padding: 28 }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = accent; el.style.boxShadow = glow(accent, 0.16); }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = T.line; el.style.boxShadow = 'none'; }}
              >
                <div className="flex items-center justify-center mb-6" style={{ width: 40, height: 40, color: accent, background: `${accent}1a`, borderRadius: 8 }}>
                  {icon}
                </div>
                <h3 style={{ fontFamily: T.serif, fontSize: 22, fontWeight: 400, color: T.text, marginBottom: 12, letterSpacing: '-0.01em' }}>{title}</h3>
                <p style={{ fontSize: 15.5, color: T.sage, lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section style={{ background: T.bg, padding: '104px 0', borderTop: `1px solid ${T.line}` }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div>
              <Eyebrow color={T.amber}>Featured Work</Eyebrow>
              <h2 style={{ fontFamily: T.serif, fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: 300, color: T.text, letterSpacing: '-0.025em', lineHeight: 1.1, marginTop: 18 }}>
                Three ways I work
              </h2>
            </div>
            <button
              onClick={() => onNavigate('projects')}
              className="flex items-center gap-1.5 shrink-0 transition-colors"
              style={{ fontSize: 15, fontWeight: 500, color: T.amber, whiteSpace: 'nowrap', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.02em' }}
            >
              View All Projects <ArrowRight size={15} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {workCategories.map(({ label, title, description, art: Art }) => (
              <div
                key={title}
                className="overflow-hidden transition-all cursor-pointer relative flex flex-col"
                style={{ border: `1px solid ${T.line}`, background: T.bgCard, borderRadius: 12 }}
                onClick={() => onNavigate('projects')}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = T.amber; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = T.line; }}
              >
                {/* Illustration */}
                <div style={{ background: T.bgSoft, borderBottom: `1px solid ${T.line}`, padding: '28px 28px 20px' }}>
                  <Art />
                </div>

                <div className="relative flex flex-col flex-1 p-7">
                  <div className="flex items-center gap-2 mb-4">
                    <HexMark size={11} />
                    <p style={{ fontSize: 12.5, fontWeight: 500, color: T.dim, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</p>
                  </div>
                  <h3 style={{ fontFamily: T.serif, fontSize: 26, fontWeight: 400, color: T.text, marginBottom: 12, letterSpacing: '-0.015em', lineHeight: 1.2 }}>{title}</h3>
                  <p style={{ fontSize: 15.5, color: T.sage, lineHeight: 1.7, marginBottom: 24 }}>{description}</p>
                  <button
                    onClick={e => { e.stopPropagation(); onNavigate('projects'); }}
                    className="mt-auto transition-all"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: T.amber, fontSize: 15, fontWeight: 600, padding: '9px 0', border: 'none', cursor: 'pointer', width: 'fit-content', letterSpacing: '0.02em' }}
                    onMouseEnter={e => (e.currentTarget.style.gap = '12px')}
                    onMouseLeave={e => (e.currentTarget.style.gap = '8px')}
                  >
                    Explore the work <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Teaser */}
      <section style={{ background: T.bg, padding: '112px 0', position: 'relative', overflow: 'hidden', borderTop: `1px solid ${T.line}` }}>
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1160 620" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <polygon points={hexPoints(60, 640, 320)} fill="none" stroke={T.amber} strokeWidth="1.5" opacity="0.08" />
        </svg>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <Eyebrow color={T.amber} style={{ marginBottom: 16 }}>Let's Collaborate</Eyebrow>
          <h2 style={{ fontFamily: T.serif, fontSize: 'clamp(36px, 5vw, 62px)', fontWeight: 300, color: T.text, letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: 22 }}>
            Ready to build something<br />strategically exceptional?
          </h2>
          <p style={{ fontSize: 18, color: T.sage, lineHeight: 1.7, maxWidth: 500, margin: '0 auto 40px' }}>
            Whether it's a new product, a UX audit, or a complex information architecture challenge — I'd love to hear about your vision.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-2 transition-all"
            style={{ background: T.amber, color: T.bg, fontSize: 16, fontWeight: 600, padding: '15px 32px', border: 'none', cursor: 'pointer', borderRadius: 3 }}
            onMouseEnter={e => (e.currentTarget.style.background = T.amberDeep)}
            onMouseLeave={e => (e.currentTarget.style.background = T.amber)}
          >
            Start a Conversation <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}
