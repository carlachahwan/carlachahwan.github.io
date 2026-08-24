import { useEffect } from 'react';
import { ArrowRight, Download, Compass, BarChart2, Users, Layers } from 'lucide-react';
import { Page } from '../App';
import { downloadCV } from '../utils/downloadCV';
import ClientLogos from './ClientLogos';
import { T, Eyebrow, HexMark, hexPoints, glow } from './playbook';
import { CaseStudiesArt, MobileLogicArt, WireframeArt, WorkArtKeyframes } from './WorkIllustrations';
import aboutPortrait from '../../imports/carla-about.png';

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
    accent: T.gold,
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
  // Reveal-on-scroll: elements with .reveal fade/slide in when they enter view.
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Interactive gradient sphere — magnetic follow + a light source that tracks the cursor.
  useEffect(() => {
    const wrap = document.querySelector<HTMLElement>('.ob-sphere-wrap');
    const hero = wrap?.closest('section');
    if (!wrap || !hero) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cur = { tx: 0, ty: 0, sc: 1, hx: 36, hy: 30 };
    const tgt = { ...cur };
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const dx = e.clientX - cx, dy = e.clientY - cy;
      const near = Math.hypot(dx, dy) < r.width * 0.85;
      tgt.tx = Math.max(-34, Math.min(34, dx * 0.05));
      tgt.ty = Math.max(-34, Math.min(34, dy * 0.05));
      tgt.hx = Math.max(6, Math.min(94, ((e.clientX - r.left) / r.width) * 100));
      tgt.hy = Math.max(6, Math.min(94, ((e.clientY - r.top) / r.height) * 100));
      tgt.sc = near ? 1.07 : 1;
      wrap.classList.toggle('hot', near);
    };
    const onLeave = () => { tgt.tx = 0; tgt.ty = 0; tgt.sc = 1; tgt.hx = 36; tgt.hy = 30; wrap.classList.remove('hot'); };
    const tick = () => {
      const k = 0.09;
      cur.tx += (tgt.tx - cur.tx) * k; cur.ty += (tgt.ty - cur.ty) * k; cur.sc += (tgt.sc - cur.sc) * k;
      cur.hx += (tgt.hx - cur.hx) * k; cur.hy += (tgt.hy - cur.hy) * k;
      wrap.style.setProperty('--tx', cur.tx.toFixed(2) + 'px');
      wrap.style.setProperty('--ty', cur.ty.toFixed(2) + 'px');
      wrap.style.setProperty('--sc', cur.sc.toFixed(3));
      wrap.style.setProperty('--hx', cur.hx.toFixed(1) + '%');
      wrap.style.setProperty('--hy', cur.hy.toFixed(1) + '%');
      raf = requestAnimationFrame(tick);
    };
    hero.addEventListener('mousemove', onMove);
    hero.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(tick);
    return () => { hero.removeEventListener('mousemove', onMove); hero.removeEventListener('mouseleave', onLeave); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div style={{ background: T.bg, fontFamily: T.sans }}>
      <WorkArtKeyframes />
      {/* On phones the card rows below become horizontal swipe carousels; on
          larger screens they revert to a static grid. */}
      <style>{`
        .hcar { scroll-snap-type: x mandatory; scroll-padding-left: 24px; }
        .hcar::-webkit-scrollbar { display: none; }
        .hcar { scrollbar-width: none; -ms-overflow-style: none; }
        .hcar > * { scroll-snap-align: start; }
        /* ── scroll-reveal ── */
        .reveal { opacity: 0; transform: translateY(26px); transition: opacity .9s cubic-bezier(.2,.7,.2,1), transform .9s cubic-bezier(.2,.7,.2,1); }
        .reveal.in { opacity: 1; transform: none; }
        /* ── hero entrance ── */
        .ob-rise { opacity: 0; transform: translateY(30px); animation: ob-rise .95s cubic-bezier(.2,.7,.2,1) forwards; }
        .ob-line { display: block; opacity: 0; transform: translateY(60%); animation: ob-rise 1s cubic-bezier(.2,.75,.2,1) forwards; }
        @keyframes ob-rise { to { opacity: 1; transform: none; } }
        /* ── signature gradient sphere (interactive) ── */
        .ob-sphere-wrap { position: absolute; right: 2%; top: 50%; width: min(56vw, 560px); aspect-ratio: 1; z-index: 0; pointer-events: none;
          transform: translateY(-50%) translate3d(var(--tx,0px), var(--ty,0px), 0) scale(var(--sc,1)); }
        .ob-sphere { width: 100%; height: 100%; border-radius: 50%; opacity: .94; will-change: filter; transition: box-shadow .5s ease;
          background: radial-gradient(circle at var(--hx,36%) var(--hy,30%), #FFFFFF 0%, #8FE0D2 13%, #2D9D94 40%, #C86F4C 78%, #9C5A3B 100%);
          filter: blur(2px); animation: ob-hue 22s linear infinite; }
        .ob-sphere-wrap.hot .ob-sphere { box-shadow: 0 30px 90px rgba(45,157,148,0.35); }
        @keyframes ob-hue { 0%,100% { filter: blur(2px) hue-rotate(0deg); } 50% { filter: blur(2px) hue-rotate(14deg); } }
        /* ── scroll cue ── */
        .ob-scroll { animation: ob-bob 1.8s ease-in-out infinite; }
        @keyframes ob-bob { 0%,100% { transform: translateX(-50%) translateY(0); opacity:.65; } 50% { transform: translateX(-50%) translateY(6px); opacity:1; } }
        /* ── ghost link ── */
        .ob-link { position: relative; }
        .ob-link::after { content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 1px; background: currentColor; transform: scaleX(1); transform-origin: left; transition: transform .4s cubic-bezier(.2,.7,.2,1); }
        .ob-link:hover::after { transform: scaleX(0); transform-origin: right; }
        @media (prefers-reduced-motion: reduce) {
          .reveal, .ob-rise, .ob-line { opacity:1 !important; transform:none !important; animation:none !important; }
          .ob-sphere, .ob-scroll { animation: none !important; }
        }
      `}</style>
      {/* Hero — monumental type + signature gradient sphere */}
      <section
        className="relative overflow-hidden"
        style={{ background: T.bg, minHeight: '100vh', paddingTop: 72, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
      >
        {/* Signature gradient sphere — the one chromatic moment (interactive) */}
        <div className="ob-sphere-wrap" aria-hidden="true"><div className="ob-sphere" /></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 w-full" style={{ zIndex: 1 }}>
          <p className="ob-rise" style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: T.sage, marginBottom: 'clamp(20px, 4vh, 44px)', animationDelay: '.05s' }}>
            Strategic UX Architect — Beirut, Lebanon
          </p>

          <h1 style={{ fontFamily: T.serif, fontSize: 'clamp(50px, 11vw, 132px)', fontWeight: 300, color: T.text, lineHeight: 0.86, letterSpacing: '-0.03em', textTransform: 'uppercase', margin: 0 }}>
            <span className="ob-line" style={{ animationDelay: '.12s' }}>Architecting</span>
            <span className="ob-line" style={{ animationDelay: '.24s' }}>Systems That</span>
            <span className="ob-line" style={{ animationDelay: '.36s' }}><span style={{ color: T.amber }}>Think</span>&nbsp;&amp; Scale</span>
          </h1>

          <div className="ob-rise" style={{ animationDelay: '.55s', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 28, marginTop: 'clamp(28px, 5vh, 56px)' }}>
            <p style={{ fontSize: 18, color: T.sage, lineHeight: 1.7, maxWidth: 460 }}>
              A UX Strategy &amp; Architecture leader with 9 years building intuitive, data-driven digital experiences across the MENA region and globally.
            </p>
            <div style={{ display: 'flex', gap: 32, flexShrink: 0 }}>
              <button onClick={() => onNavigate('projects')} className="ob-link inline-flex items-center gap-2" style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: T.sans, fontSize: 15, fontWeight: 600, letterSpacing: '0.03em', textTransform: 'uppercase', color: T.text, paddingBottom: 5 }}>
                View Projects <ArrowRight size={15} />
              </button>
              <button onClick={downloadCV} className="ob-link inline-flex items-center gap-2" style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: T.sans, fontSize: 15, fontWeight: 600, letterSpacing: '0.03em', textTransform: 'uppercase', color: T.text, paddingBottom: 5 }}>
                Download CV <Download size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="ob-scroll" style={{ position: 'absolute', bottom: 26, left: '50%', display: 'flex', alignItems: 'center', gap: 8, fontFamily: T.sans, fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: T.dim }}>
          Scroll <ArrowRight size={13} style={{ transform: 'rotate(90deg)' }} />
        </div>
      </section>

      {/* Stats strip */}
      <section style={{ background: T.bg, borderTop: `1px solid ${T.line}`, borderBottom: `1px solid ${T.line}` }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-3">
          {[['9', 'Years Experience'], ['15+', 'Products Shipped'], ['5', 'Countries Served']].map(([num, label], i) => (
            <div key={label} className="reveal" style={{ transitionDelay: `${i * 90}ms`, borderLeft: i > 0 ? `1px solid ${T.line}` : undefined, padding: 'clamp(28px,4vw,44px) clamp(16px,3vw,36px)' }}>
              <div style={{ fontFamily: T.serif, fontSize: 'clamp(34px, 6vw, 60px)', fontWeight: 300, color: T.text, letterSpacing: '-0.03em', lineHeight: 1 }}>{num}</div>
              <div style={{ fontSize: 12, color: T.dim, marginTop: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section style={{ background: T.bg, borderBottom: `1px solid ${T.line}`, padding: 'clamp(64px,10vw,120px) 0' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="reveal order-2 lg:order-1">
            <Eyebrow color={T.gold}>About</Eyebrow>
            <h2 style={{ fontFamily: T.serif, fontSize: 'clamp(34px, 4.5vw, 60px)', fontWeight: 300, color: T.text, letterSpacing: '-0.03em', lineHeight: 1.0, textTransform: 'uppercase', marginTop: 18, marginBottom: 26 }}>
              Carla<br />Chahwan
            </h2>
            <p style={{ fontSize: 18, color: T.sage, lineHeight: 1.75, maxWidth: 520, marginBottom: 20 }}>
              I'm a UX Strategy &amp; Architecture leader with 9 years building intuitive, data-driven digital experiences across SaaS, eCommerce, and enterprise platforms in the MENA region and globally.
            </p>
            <p style={{ fontSize: 18, color: T.sage, lineHeight: 1.75, maxWidth: 520, marginBottom: 32 }}>
              I start with the business problem and design the system — research, information architecture, and the product direction — that solves it.
            </p>
            <button onClick={() => onNavigate('contact')} className="ob-link inline-flex items-center gap-2" style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: T.sans, fontSize: 15, fontWeight: 600, letterSpacing: '0.03em', textTransform: 'uppercase', color: T.text, paddingBottom: 5 }}>
              Let's talk <ArrowRight size={15} />
            </button>
          </div>
          <div className="reveal order-1 lg:order-2 flex justify-center lg:justify-end">
            <div style={{ background: '#EEEBE3', padding: '0 clamp(10px,2.5vw,28px)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
              <img src={aboutPortrait} alt="Carla Chahwan" className="w-auto" style={{ maxHeight: 560, objectFit: 'contain', display: 'block' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <ClientLogos />

      {/* Core Expertise */}
      <section style={{ background: T.bg, padding: '104px 0', borderTop: `1px solid ${T.line}` }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-16 reveal">
            <Eyebrow color={T.amber}>Core Expertise</Eyebrow>
            <h2 style={{ fontFamily: T.serif, fontSize: 'clamp(34px, 4vw, 56px)', fontWeight: 300, color: T.text, letterSpacing: '-0.03em', lineHeight: 1.02, maxWidth: 520, marginTop: 18 }}>
              End-to-end UX across<br />the full product lifecycle.
            </h2>
          </div>

          <div className="hcar flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto sm:overflow-visible -mx-6 px-6 sm:mx-0 sm:px-0 reveal">
            {expertise.map(({ icon, accent, title, desc }) => (
              <div
                key={title}
                className="transition-all shrink-0 basis-[78%] sm:basis-auto"
                style={{ background: T.bgCard, border: `1px solid ${T.line}`, borderRadius: 0, padding: 28 }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = accent; el.style.boxShadow = glow(accent, 0.16); }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = T.line; el.style.boxShadow = 'none'; }}
              >
                <div className="flex items-center justify-center mb-6" style={{ width: 40, height: 40, color: accent, background: `${accent}1a`, borderRadius: 0 }}>
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
            <div className="reveal">
              <Eyebrow color={T.gold}>Featured Work</Eyebrow>
              <h2 style={{ fontFamily: T.serif, fontSize: 'clamp(34px, 4vw, 56px)', fontWeight: 300, color: T.text, letterSpacing: '-0.03em', lineHeight: 1.02, marginTop: 18 }}>
                Explore by category
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

          <div className="hcar flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible -mx-6 px-6 md:mx-0 md:px-0 reveal">
            {workCategories.map(({ label, title, description, art: Art }) => (
              <div
                key={title}
                className="overflow-hidden transition-all cursor-pointer relative flex flex-col shrink-0 basis-[85%] md:basis-auto"
                style={{ border: `1px solid ${T.line}`, background: T.bgCard, borderRadius: 0 }}
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
                    <p style={{ fontSize: 12.5, fontWeight: 500, color: T.dim, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{label}</p>
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
            style={{ background: T.amber, color: T.bg, fontSize: 16, fontWeight: 600, padding: '15px 32px', border: 'none', cursor: 'pointer', borderRadius: 0 }}
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
