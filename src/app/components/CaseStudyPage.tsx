import { ArrowLeft } from 'lucide-react';
import { Page } from '../App';
import { CaseStudyData } from './CaseStudyTemplate';
import CalloutBanner from './CalloutBanner';
import NextProject from './NextProject';
import Zoomable from './Zoomable';
import { T, Eyebrow, HexMark, hexPoints } from './playbook';

interface Props {
  data: CaseStudyData;
  onNavigate: (page: Page) => void;
}

/** Small section header: eyebrow-style label + hairline. */
function SectionLabel({ children }: { children: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
      <HexMark size={11} />
      <span style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.amber, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{children}</span>
      <div style={{ flex: 1, height: 1, background: T.line }} />
    </div>
  );
}

export default function CaseStudyPage({ data, onNavigate }: Props) {
  return (
    <div style={{ minHeight: '100vh', background: T.bg, fontFamily: T.sans }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '48px 24px 96px' }}>

        {/* Back button */}
        <button
          onClick={() => onNavigate('projects')}
          style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: T.sage, fontSize: 15, fontWeight: 500, marginBottom: 40, padding: 0 }}
        >
          <ArrowLeft size={14} /> Back to Projects
        </button>

        {/* ── Title + Overview ── */}
        <section className="relative" style={{ marginBottom: 72 }}>
          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {data.tags.map(tag => (
              <span key={tag} style={{ fontFamily: T.sans, padding: '4px 12px', borderRadius: 2, background: T.bgSoft, color: T.sage, border: `1px solid ${T.line}`, fontSize: 13, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Title = project name */}
          <h1 style={{ fontFamily: T.serif, fontSize: 'clamp(34px, 5vw, 58px)', fontWeight: 300, color: T.text, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 20 }}>
            {data.projectTitle}
          </h1>

          {/* Meta row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, marginBottom: 32 }}>
            {[['Role', data.role], ['Platform', data.platform]].map(([k, v]) => (
              <div key={k}>
                <div style={{ fontSize: 12, fontWeight: 500, color: T.dim, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>{k}</div>
                <div style={{ fontSize: 16, fontWeight: 500, color: T.text }}>{v}</div>
              </div>
            ))}
          </div>

          {/* Overview — the project vision */}
          <div className="relative overflow-hidden" style={{ background: T.bgCard, border: `1px solid ${T.line}`, borderRadius: 14, padding: '32px 36px' }}>
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 900 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <polygon points={hexPoints(860, -10, 160)} fill="none" stroke={T.amber} strokeWidth="1.5" opacity="0.12" />
            </svg>
            <div className="relative">
              <Eyebrow color={T.amber} style={{ marginBottom: 14 }}>The Vision</Eyebrow>
              <p style={{ fontSize: 19, color: T.text, lineHeight: 1.8, opacity: 0.92 }}>{data.overview}</p>
            </div>
          </div>
        </section>

        {/* ── Challenge → Solution — high-level and scannable ── */}
        {(data.challenge || data.strategy) && (
          <section style={{ marginBottom: 72 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              {data.challenge && (
                <div style={{ background: T.bgCard, border: `1px solid ${T.line}`, borderRadius: 14, padding: '26px 28px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                    <HexMark size={11} />
                    <span style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.amber, letterSpacing: '0.14em', textTransform: 'uppercase' }}>The Challenge</span>
                  </div>
                  <p style={{ fontSize: 16.5, color: 'var(--stone)', lineHeight: 1.75 }}>{data.challenge}</p>
                </div>
              )}
              {data.strategy && (
                <div style={{ background: T.bgCard, border: `1px solid ${T.mint}22`, borderRadius: 14, padding: '26px 28px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                    <HexMark size={11} color={T.mint} />
                    <span style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.mint, letterSpacing: '0.14em', textTransform: 'uppercase' }}>The Solution</span>
                  </div>
                  <p style={{ fontSize: 16.5, color: 'var(--stone)', lineHeight: 1.75 }}>{data.strategy}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── Visuals — key screens / research boards ── */}
        {data.screens && data.screens.length > 0 && (
          <section style={{ marginBottom: 72 }}>
            <SectionLabel>A Look Inside</SectionLabel>
            {data.architectureCaption && (
              <p style={{ fontSize: 16.5, color: T.sage, lineHeight: 1.6, marginBottom: 24, maxWidth: 640 }}>{data.architectureCaption}</p>
            )}

            {/* Architecture / flow diagram */}
            {data.architectureElement && (
              <Zoomable caption={data.architectureCaption}>
                <div style={{ background: '#fff', border: `1px solid ${T.line}`, borderRadius: 14, padding: 24, overflowX: 'auto', marginBottom: 20 }}>
                  {data.architectureElement}
                </div>
              </Zoomable>
            )}

            {/* Screens / research boards */}
            <div style={{ background: T.bgCard, border: `1px solid ${T.line}`, borderRadius: 14, padding: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
              {data.screens.map(({ caption, element }, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <Zoomable caption={caption}>
                    <div style={{ borderRadius: 12, overflow: 'hidden', background: '#fff', border: `1px solid ${T.line}`, minHeight: 280 }}>
                      {element}
                    </div>
                  </Zoomable>
                  <p style={{ fontSize: 14, color: T.sage, textAlign: 'center', lineHeight: 1.5, padding: '0 4px' }}>{caption}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Outcomes ── */}
        {data.outcomes && data.outcomes.length > 0 && (
          <section style={{ marginBottom: 72 }}>
            <SectionLabel>The Impact</SectionLabel>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
              {data.outcomes.map((o, i) => (
                <div key={i} style={{ background: T.bgCard, borderRadius: 12, padding: '18px 20px', display: 'flex', alignItems: 'flex-start', gap: 12, border: `1px solid ${T.mint}22` }}>
                  <HexMark size={12} color={T.mint} style={{ marginTop: 3 }} />
                  <span style={{ fontSize: 16.5, color: T.text, lineHeight: 1.6, opacity: 0.9 }}>{o}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Read this next ── */}
        <NextProject current={data.pageId} onNavigate={onNavigate} />

        {/* ── Shared call-out banner ── */}
        <CalloutBanner onNavigate={onNavigate} />

        {/* Back link */}
        <div style={{ marginTop: 48 }}>
          <button
            onClick={() => onNavigate('projects')}
            style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: T.sage, fontSize: 16, fontWeight: 500, padding: 0 }}
          >
            <ArrowLeft size={15} /> Back to all projects
          </button>
        </div>
      </div>
    </div>
  );
}
