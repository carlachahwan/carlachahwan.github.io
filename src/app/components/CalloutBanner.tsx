import { ArrowRight } from 'lucide-react';
import { Page } from '../App';
import { T, Eyebrow, hexPoints } from './playbook';

interface CalloutBannerProps {
  onNavigate: (page: Page) => void;
  /** Constrain width to match the reading column on detail pages. */
  maxWidth?: number;
}

/**
 * Highlighted "Have a project in mind?" call-out banner.
 * Shared across the Projects page and every project detail page.
 */
export default function CalloutBanner({ onNavigate, maxWidth }: CalloutBannerProps) {
  return (
    <div style={{ maxWidth, margin: maxWidth ? '0 auto' : undefined, width: '100%' }}>
      <div
        className="relative overflow-hidden"
        style={{ background: T.bgCard, borderRadius: 16, border: `1px solid ${T.line}`, padding: '48px 44px' }}
      >
        {/* Signature hex outline — kept subtle; no filled wedge behind the CTA. */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <polygon points={hexPoints(940, -20, 220)} fill="none" stroke={T.amber} strokeWidth="1.5" opacity="0.12" />
        </svg>

        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <Eyebrow color={T.amber} style={{ marginBottom: 14 }}>Let's Collaborate</Eyebrow>
            <h3 style={{ fontFamily: T.serif, fontSize: 'clamp(28px, 3vw, 36px)', fontWeight: 300, color: T.text, letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: 12 }}>
              Have a project in mind?
            </h3>
            <p style={{ fontFamily: T.sans, fontSize: 17, color: T.sage, lineHeight: 1.7, maxWidth: 460 }}>
              Let's collaborate on your next strategic UX challenge — from vision to a product your users trust.
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="flex items-center gap-2 transition-all shrink-0"
            style={{ fontFamily: T.sans, background: T.amber, color: T.bg, fontSize: 16, fontWeight: 600, padding: '15px 30px', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', borderRadius: 3 }}
            onMouseEnter={e => (e.currentTarget.style.background = T.amberDeep)}
            onMouseLeave={e => (e.currentTarget.style.background = T.amber)}
          >
            Start a Conversation <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
