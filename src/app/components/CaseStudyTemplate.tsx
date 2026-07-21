import { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { Page } from '../App';

export interface CaseStudyData {
  id: string;
  pageId: Page;
  projectTitle: string;
  platform: string;
  role: string;
  year: string;
  tags: string[];
  accentColor: string;
  accentBg: string;
  overview: string;
  challenge?: string;
  strategy?: string;
  techAlignment?: string;
  outcomes?: string[];
  architectureCaption?: string;
  architectureElement?: ReactNode;
  screens?: { caption: string; element: ReactNode }[];
}

interface CaseStudyTemplateProps {
  data: CaseStudyData;
  isLast?: boolean;
  onNavigate: (page: Page) => void;
}

export default function CaseStudyTemplate({ data, onNavigate }: CaseStudyTemplateProps) {
  const ac = data.accentColor;

  return (
    <article
      id={data.id}
      style={{ scrollMarginTop: 90 }}
      onClick={() => onNavigate(data.pageId)}
    >
      <div
        className="relative overflow-hidden rounded-2xl cursor-pointer transition-all group"
        style={{ background: data.accentBg, border: `1.5px solid ${ac}22` }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 40px ${ac}18`;
          (e.currentTarget as HTMLDivElement).style.borderColor = `${ac}55`;
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
          (e.currentTarget as HTMLDivElement).style.borderColor = `${ac}22`;
        }}
      >
        {/* Subtle accent glow */}
        <div style={{ position: 'absolute', width: 300, height: 300, background: `radial-gradient(circle, ${ac}12 0%, transparent 70%)`, top: -80, right: -60, pointerEvents: 'none' }} />

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left: meta + overview */}
          <div style={{ padding: '40px 44px', borderRight: '1px solid rgba(0,0,0,0.06)' }}>
            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
              {data.tags.map(tag => (
                <span
                  key={tag}
                  style={{ padding: '3px 10px', borderRadius: 20, background: `${ac}18`, color: ac, fontSize: 11, fontWeight: 700, letterSpacing: '0.04em' }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h2 style={{ fontSize: 'clamp(20px, 2.5vw, 30px)', fontWeight: 800, color: '#0f0f0f', letterSpacing: '-0.025em', lineHeight: 1.2, marginBottom: 14 }}>
              {data.projectTitle}
            </h2>

            {/* Meta row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 20 }}>
              {[['Role', data.role], ['Platform', data.platform]].map(([k, v]) => (
                <div key={k}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>{k}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{v}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={e => { e.stopPropagation(); onNavigate(data.pageId); }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: ac, color: '#fff', fontSize: 13, fontWeight: 700, padding: '11px 22px', border: 'none', borderRadius: 8, cursor: 'pointer', letterSpacing: '0.01em' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Read the case study <ArrowRight size={14} />
            </button>
          </div>

          {/* Right: overview text */}
          <div style={{ padding: '40px 44px', display: 'flex', alignItems: 'center' }}>
            <p style={{ fontSize: 15, color: '#52525b', lineHeight: 1.8 }}>{data.overview}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
