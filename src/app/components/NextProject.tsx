import { ArrowRight } from 'lucide-react';
import { Page } from '../App';
import { nextProject, tabForPage, TAB_LABEL } from './projectRegistry';
import { T, HexMark } from './playbook';

interface Props {
  /** The project currently being read. */
  current: Page;
  onNavigate: (page: Page) => void;
}

/**
 * "Read this next" prompt shown at the foot of every project detail page,
 * suggesting the next project from the same tab category.
 */
export default function NextProject({ current, onNavigate }: Props) {
  const next = nextProject(current);
  const category = tabForPage(current);
  if (!next || !category) return null;

  return (
    <section style={{ marginBottom: 48 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <HexMark size={11} />
        <span style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.amber, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
          Next in {TAB_LABEL[category]}
        </span>
        <div style={{ flex: 1, height: 1, background: T.line }} />
      </div>

      <div
        role="link"
        tabIndex={0}
        onClick={() => onNavigate(next.pageId)}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onNavigate(next.pageId); } }}
        className="transition-all cursor-pointer"
        style={{ background: T.bgCard, border: `1px solid ${T.line}`, borderRadius: 14, padding: '28px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}
        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = T.amber; }}
        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = T.line; }}
      >
        <div>
          <h3 style={{ fontFamily: T.serif, fontSize: 'clamp(22px, 2.4vw, 30px)', fontWeight: 300, color: T.text, letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 8 }}>
            {next.title}
          </h3>
          <p style={{ fontFamily: T.sans, fontSize: 16, color: T.sage, lineHeight: 1.6, maxWidth: 560 }}>{next.teaser}</p>
        </div>
        <span
          className="flex items-center gap-2 shrink-0"
          style={{ fontFamily: T.sans, fontSize: 15, fontWeight: 600, color: T.amber, letterSpacing: '0.02em', whiteSpace: 'nowrap' }}
        >
          Read next <ArrowRight size={15} />
        </span>
      </div>
    </section>
  );
}
