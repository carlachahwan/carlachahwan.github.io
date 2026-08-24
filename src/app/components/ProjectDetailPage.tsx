import { ArrowLeft } from 'lucide-react';
import { Page } from '../App';
import { ProjectData } from './projectsData';
import CalloutBanner from './CalloutBanner';
import NextProject from './NextProject';
import Zoomable from './Zoomable';
import { T, Eyebrow, HexMark, hexPoints } from './playbook';

interface Props {
  data: ProjectData;
  onNavigate: (page: Page) => void;
}

/** Section header: hex mark + amber label + hairline. */
function SectionLabel({ children }: { children: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
      <HexMark size={11} />
      <span style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.amber, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{children}</span>
      <div style={{ flex: 1, height: 1, background: T.line }} />
    </div>
  );
}

export default function ProjectDetailPage({ data, onNavigate }: Props) {
  return (
    <div style={{ minHeight: '100vh', background: T.bg, fontFamily: T.sans }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '48px 24px 96px' }}>
        {/* Back */}
        <button
          onClick={() => onNavigate('projects')}
          style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: T.sage, fontSize: 15, fontWeight: 500, marginBottom: 40, padding: 0 }}
        >
          <ArrowLeft size={14} /> Back to Projects
        </button>

        {/* Title + overview */}
        <section className="relative" style={{ marginBottom: 72 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {data.tags.map(tag => (
              <span key={tag} style={{ padding: '4px 12px', borderRadius: 2, background: T.bgSoft, color: T.sage, border: `1px solid ${T.line}`, fontSize: 13, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {tag}
              </span>
            ))}
          </div>

          <h1 style={{ fontFamily: T.serif, fontSize: 'clamp(34px, 5vw, 58px)', fontWeight: 300, color: T.text, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 20 }}>
            {data.title}
          </h1>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, marginBottom: 32 }}>
            {[['Role', data.role], ['Platform', data.platform]].map(([k, v]) => (
              <div key={k}>
                <div style={{ fontSize: 12, fontWeight: 500, color: T.dim, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>{k}</div>
                <div style={{ fontSize: 16, fontWeight: 500, color: T.text }}>{v}</div>
              </div>
            ))}
          </div>

          <div className="relative overflow-hidden" style={{ background: T.bgCard, border: `1px solid ${T.line}`, borderRadius: 14, padding: '32px 36px' }}>
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 900 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <polygon points={hexPoints(860, -10, 160)} fill="none" stroke={T.amber} strokeWidth="1.5" opacity="0.12" />
            </svg>
            <div className="relative">
              <Eyebrow color={T.amber} style={{ marginBottom: 14 }}>Overview</Eyebrow>
              <p style={{ fontSize: 19, color: T.text, lineHeight: 1.8, opacity: 0.92 }}>{data.overview}</p>
            </div>
          </div>
        </section>

        {/* Challenge → Solution — kept high-level and scannable */}
        <section style={{ marginBottom: 72 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            <div style={{ background: T.bgCard, border: `1px solid ${T.line}`, borderRadius: 14, padding: '26px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <HexMark size={11} />
                <span style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.amber, letterSpacing: '0.14em', textTransform: 'uppercase' }}>The Challenge</span>
              </div>
              <p style={{ fontSize: 16.5, color: 'var(--stone)', lineHeight: 1.75 }}>{data.strategy}</p>
            </div>
            <div style={{ background: T.bgCard, border: `1px solid ${T.mint}22`, borderRadius: 14, padding: '26px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <HexMark size={11} color={T.mint} />
                <span style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.mint, letterSpacing: '0.14em', textTransform: 'uppercase' }}>The Solution</span>
              </div>
              <p style={{ fontSize: 16.5, color: 'var(--stone)', lineHeight: 1.75 }}>{data.translation}</p>
            </div>
          </div>
        </section>

        {/* Galleries */}
        {data.galleries.map(({ label, note, shots }) => (
          <section key={label} style={{ marginBottom: 64 }}>
            <SectionLabel>{label}</SectionLabel>
            {note && <p style={{ fontSize: 16.5, color: T.sage, lineHeight: 1.6, marginBottom: 24, maxWidth: 640 }}>{note}</p>}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
              {shots.map(({ src, element, caption }, i) => (
                <figure key={i} style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <Zoomable caption={caption}>
                    <div style={{ borderRadius: 12, overflow: 'hidden', background: element ? '#fff' : T.bgSoft, border: `1px solid ${T.line}`, padding: element ? 16 : 0 }}>
                      {element
                        ? element
                        : <img src={src} alt={caption} loading="lazy" style={{ width: '100%', height: 'auto', display: 'block' }} />}
                    </div>
                  </Zoomable>
                  <figcaption style={{ fontSize: 14, color: T.sage, textAlign: 'center', lineHeight: 1.5 }}>{caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        ))}

        {/* Outcomes */}
        {data.outcomes.length > 0 && (
          <section style={{ marginBottom: 72 }}>
            <SectionLabel>The Outcome</SectionLabel>
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

        <NextProject current={data.pageId} onNavigate={onNavigate} />

        <CalloutBanner onNavigate={onNavigate} />

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
