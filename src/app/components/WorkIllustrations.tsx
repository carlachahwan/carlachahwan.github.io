/**
 * Line-art illustrations for the homepage "Featured Work" cards.
 * Drawn in the UX Audit Playbook language: amber on near-black, hexagon motif,
 * hairline strokes, subtle looping animation.
 */
import { T, hexPoints } from './playbook';

const stroke = { fill: 'none', stroke: T.amber, strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
const faint = { ...stroke, stroke: T.line, strokeWidth: 1 };

/** Case Studies — stacked research boards with a hex "finding" marker. */
export function CaseStudiesArt() {
  return (
    <svg viewBox="0 0 220 130" style={{ width: '100%', height: 'auto', display: 'block' }} aria-hidden="true">
      {/* back boards */}
      <rect x="26" y="16" width="150" height="92" rx="6" {...faint} />
      <rect x="18" y="24" width="150" height="92" rx="6" {...faint} />
      {/* front board */}
      <rect x="10" y="32" width="150" height="82" rx="6" {...stroke} />
      {/* board content lines */}
      <line x1="24" y1="50" x2="86" y2="50" {...stroke} opacity="0.85" />
      <line x1="24" y1="64" x2="132" y2="64" {...faint} />
      <line x1="24" y1="76" x2="112" y2="76" {...faint} />
      <line x1="24" y1="88" x2="140" y2="88" {...faint} />
      <line x1="24" y1="100" x2="98" y2="100" {...faint} />
      {/* finding hex marker */}
      <polygon points={hexPoints(178, 44, 15)} fill={T.amber} opacity="0.95" />
      <polygon points={hexPoints(178, 44, 24)} fill="none" stroke={T.amber} strokeWidth="1" opacity="0.35" />
      {/* connector from board to finding */}
      <path d="M160 62 C 172 62, 178 56, 178 60" {...stroke} strokeDasharray="3 4" opacity="0.7" />
    </svg>
  );
}

/** Mobile App design logic — phones connected by a decision/flow arrow. */
export function MobileLogicArt() {
  return (
    <svg viewBox="0 0 220 130" style={{ width: '100%', height: 'auto', display: 'block' }} aria-hidden="true">
      {/* phone 1 */}
      <rect x="14" y="22" width="52" height="88" rx="8" {...stroke} />
      <line x1="30" y1="34" x2="50" y2="34" {...faint} />
      <rect x="24" y="44" width="32" height="22" rx="3" {...faint} />
      <line x1="24" y1="76" x2="56" y2="76" {...faint} />
      <line x1="24" y1="86" x2="46" y2="86" {...faint} />

      {/* decision hex in the middle */}
      <polygon points={hexPoints(110, 66, 18)} fill="none" stroke={T.amber} strokeWidth="1.5" />
      <polygon points={hexPoints(110, 66, 7)} fill={T.amber} />

      {/* flow arrows */}
      <line x1="70" y1="66" x2="88" y2="66" {...stroke}
        strokeDasharray="16" strokeDashoffset="16"
        style={{ animation: 'work-arrow 2.6s ease-in-out infinite' }} />
      <polyline points="84,62 89,66 84,70" {...stroke} style={{ animation: 'work-arrow-head 2.6s ease-in-out infinite' }} />

      <line x1="132" y1="66" x2="150" y2="66" {...stroke}
        strokeDasharray="16" strokeDashoffset="16"
        style={{ animation: 'work-arrow 2.6s ease-in-out 0.5s infinite' }} />
      <polyline points="146,62 151,66 146,70" {...stroke} style={{ animation: 'work-arrow-head 2.6s ease-in-out 0.5s infinite' }} />

      {/* phone 2 (the improved one — amber tinted) */}
      <rect x="154" y="22" width="52" height="88" rx="8" {...stroke} />
      <rect x="154" y="22" width="52" height="88" rx="8" fill={T.amber} opacity="0.08" stroke="none" />
      <line x1="170" y1="34" x2="190" y2="34" {...faint} />
      <rect x="164" y="44" width="32" height="14" rx="3" fill={T.amber} opacity="0.5" stroke="none" />
      <line x1="164" y1="68" x2="196" y2="68" {...faint} />
      <line x1="164" y1="78" x2="186" y2="78" {...faint} />
      <line x1="164" y1="88" x2="196" y2="88" {...faint} />
    </svg>
  );
}

/** Wireframe — a low-fidelity blueprint grid with hex node. */
export function WireframeArt() {
  return (
    <svg viewBox="0 0 220 130" style={{ width: '100%', height: 'auto', display: 'block' }} aria-hidden="true">
      {/* frame */}
      <rect x="16" y="18" width="188" height="96" rx="6" {...stroke} />
      {/* header bar */}
      <rect x="16" y="18" width="188" height="16" rx="6" fill={T.amber} opacity="0.14" stroke="none" />
      <line x1="16" y1="34" x2="204" y2="34" {...faint} />
      {/* sidebar */}
      <line x1="70" y1="34" x2="70" y2="114" {...faint} />
      <rect x="24" y="44" width="36" height="8" rx="2" {...faint} />
      <rect x="24" y="58" width="36" height="8" rx="2" {...faint} />
      <rect x="24" y="72" width="36" height="8" rx="2" {...faint} />
      {/* content blocks */}
      <rect x="82" y="44" width="52" height="34" rx="3" {...faint} />
      <rect x="144" y="44" width="52" height="34" rx="3" {...faint} />
      <line x1="82" y1="90" x2="196" y2="90" {...faint} />
      <line x1="82" y1="100" x2="160" y2="100" {...faint} />
      {/* measure guides */}
      <line x1="82" y1="38" x2="196" y2="38" stroke={T.amber} strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
      {/* hex node */}
      <polygon points={hexPoints(196, 22, 9)} fill={T.amber} />
    </svg>
  );
}

/** Keyframes for the illustration arrows (mounted once by HomePage). */
export function WorkArtKeyframes() {
  return (
    <style>{`
      @keyframes work-arrow {
        0%   { stroke-dashoffset: 16; opacity: 0.25; }
        45%  { stroke-dashoffset: 0;  opacity: 1; }
        80%  { stroke-dashoffset: 0;  opacity: 1; }
        100% { stroke-dashoffset: 0;  opacity: 0.25; }
      }
      @keyframes work-arrow-head {
        0%, 30% { opacity: 0; transform: translateX(-3px); }
        55%     { opacity: 1; transform: translateX(0); }
        80%     { opacity: 1; transform: translateX(2px); }
        100%    { opacity: 0.25; transform: translateX(2px); }
      }
      @media (prefers-reduced-motion: reduce) {
        [style*="work-arrow"] { animation: none !important; }
      }
    `}</style>
  );
}
