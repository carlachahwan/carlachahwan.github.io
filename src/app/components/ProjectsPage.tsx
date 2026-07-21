import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { telecomData, baguetteData, totersData, hrResearchData } from './caseStudyData';
import { mobileProjects, wireframeProjects, ProjectData } from './projectsData';
import CalloutBanner from './CalloutBanner';
import { TabKey, TAB_LABEL } from './projectRegistry';
import { T, Eyebrow, HexMark, BgHex } from './playbook';
import { Page } from '../App';

interface ProjectsPageProps {
  onNavigate: (page: Page) => void;
  /** Which tab to open on — set by App when returning from a project page. */
  initialTab?: TabKey;
}

const TABS: { key: TabKey; label: string }[] = [
  { key: 'case-studies', label: TAB_LABEL['case-studies'] },
  { key: 'mobile', label: TAB_LABEL.mobile },
  { key: 'wireframe', label: TAB_LABEL.wireframe },
];

/* Case-study cards keep their existing short blurbs. */
const caseStudyCards: { data: typeof telecomData; blurb: string }[] = [
  {
    data: telecomData,
    blurb: 'Reframing a telecom brand into the connective tissue of daily digital life in Qatar — research to product and brand strategy.',
  },
  {
    data: baguetteData,
    blurb: 'An end-to-end recruitment module inside a business super app — unifying fragmented HR tools into one intelligent pipeline.',
  },
  {
    data: totersData,
    blurb: 'A service-selection gate and multi-form architecture that cut task abandonment by 38% on a courier app.',
  },
  {
    data: hrResearchData,
    blurb: 'A competitive audit of 8 HR platforms that surfaced 4 critical gaps and set the KSA-compliant redesign roadmap.',
  },
];

/** Shared project card shell. */
function Card({
  tagline, title, role, blurb, cta, onOpen,
}: { tagline: string; title: string; role: string; blurb: string; cta: string; onOpen: () => void }) {
  return (
    <div
      className="overflow-hidden transition-all cursor-pointer relative flex flex-col"
      style={{ border: `1px solid ${T.line}`, background: T.bgCard, borderRadius: 12 }}
      onClick={onOpen}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = T.amber; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = T.line; }}
    >
      <div className="relative flex flex-col flex-1 p-7">
        <div className="flex items-center gap-2 mb-4">
          <HexMark size={11} />
          <p style={{ fontSize: 12.5, fontWeight: 500, color: T.dim, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{tagline}</p>
        </div>
        <h3 style={{ fontFamily: T.serif, fontSize: 24, fontWeight: 400, color: T.text, marginBottom: 8, letterSpacing: '-0.015em', lineHeight: 1.2 }}>{title}</h3>
        <p style={{ fontSize: 14, color: T.sage, marginBottom: 16, lineHeight: 1.5 }}>{role}</p>
        <p style={{ fontSize: 15, color: T.sage, lineHeight: 1.7, marginBottom: 24 }}>{blurb}</p>
        <button
          onClick={e => { e.stopPropagation(); onOpen(); }}
          className="mt-auto transition-all"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: T.amber, fontSize: 15, fontWeight: 600, padding: '9px 0', border: 'none', cursor: 'pointer', width: 'fit-content', letterSpacing: '0.02em' }}
          onMouseEnter={e => (e.currentTarget.style.gap = '12px')}
          onMouseLeave={e => (e.currentTarget.style.gap = '8px')}
        >
          {cta} <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}

export default function ProjectsPage({ onNavigate, initialTab = 'case-studies' }: ProjectsPageProps) {
  const [tab, setTab] = useState<TabKey>(initialTab);

  const renderProjects = (list: ProjectData[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {list.map(p => (
        <Card
          key={p.id}
          tagline={p.tags.slice(0, 2).join(' · ')}
          title={p.title}
          role={p.role}
          blurb={p.overview}
          cta="Check more details"
          onOpen={() => onNavigate(p.pageId)}
        />
      ))}
    </div>
  );

  return (
    <div style={{ background: T.bg, fontFamily: T.sans }}>
      {/* Page Header */}
      <section className="relative overflow-hidden" style={{ background: T.bg, paddingTop: 72 }}>
        <BgHex corner="top-right" opacity={0.09} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-20">
          <Eyebrow color={T.amber}>Selected Work</Eyebrow>
          <h1 style={{ fontFamily: T.serif, fontSize: 'clamp(40px, 5.5vw, 68px)', fontWeight: 300, color: T.text, letterSpacing: '-0.03em', lineHeight: 1.05, marginTop: 20, marginBottom: 24 }}>
            Case Studies &amp;<br />
            <span style={{ fontStyle: 'italic', color: T.amber }}>Deep-Dive Projects</span>
          </h1>
          <p style={{ fontSize: 18, color: T.sage, lineHeight: 1.75, maxWidth: 600 }}>
            End-to-end UX frameworks — from discovery and research through to information
            architecture, interactive prototypes, and developer-ready design systems.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section style={{ background: T.bg, borderTop: `1px solid ${T.line}`, position: 'sticky', top: 72, zIndex: 20 }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap gap-8" role="tablist" aria-label="Project categories">
            {TABS.map(({ key, label }) => {
              const active = tab === key;
              return (
                <button
                  key={key}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTab(key)}
                  className="relative transition-colors"
                  style={{
                    fontFamily: T.sans,
                    fontSize: 15.5,
                    fontWeight: active ? 600 : 500,
                    letterSpacing: '0.02em',
                    color: active ? T.amber : T.sage,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '20px 0',
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.color = T.text; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.color = T.sage; }}
                >
                  {label}
                  {active && (
                    <span style={{ position: 'absolute', left: 0, right: 0, bottom: -1, height: 2, background: T.amber }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
        <div style={{ height: 1, background: T.line }} />
      </section>

      {/* Tab panels */}
      <section style={{ background: T.bg, padding: '64px 0 80px' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {tab === 'case-studies' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {caseStudyCards.map(({ data, blurb }) => (
                <Card
                  key={data.id}
                  tagline={data.tags.slice(0, 2).join(' · ')}
                  title={data.projectTitle}
                  role={data.role}
                  blurb={blurb}
                  cta="Check more details"
                  onOpen={() => onNavigate(data.pageId)}
                />
              ))}
            </div>
          )}

          {tab === 'mobile' && renderProjects(mobileProjects)}
          {tab === 'wireframe' && renderProjects(wireframeProjects)}
        </div>
      </section>

      {/* Bottom callout */}
      <section style={{ background: T.bg, borderTop: `1px solid ${T.line}`, padding: '80px 0' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <CalloutBanner onNavigate={onNavigate} />
        </div>
      </section>
    </div>
  );
}
