/**
 * Shared design system.
 * Dark theme: Roboto display/headings + Inter body & UI, hexagon motif, warm
 * amber accent on near-black, lifted by a small set of vibrant accents.
 * All surfaces of the site import from here so the look stays consistent.
 */
import { ReactNode, CSSProperties } from 'react';

/* ── Tokens ─────────────────────────────────────────────────────────────── */
export const T = {
  bg: '#0E0F13',        // near-black background
  bgCard: '#14151A',    // card surface
  bgSoft: '#1A1B21',    // secondary/muted surface
  text: '#F4F1EA',      // warm cream
  stone: '#C9CBC0',     // long-form body copy
  sage: '#8A9B8E',      // muted sage-grey text
  dim: '#696969',       // dimmer label
  faint: '#3A3D45',     // faintest text / struck-through
  amber: '#E8963C',     // primary accent
  amberDeep: '#cf7f28', // hover amber
  gold: '#D8A24A',      // secondary warm accent
  line: '#2A2C33',      // hairline / border

  /* Vibrant accents — used sparingly against the warm base so they read as
     highlights rather than a second theme. Mint = positive/outcome states,
     cyan = interactive/live signals. Both sing on near-black. */
  mint: '#4AE5BD',
  cyan: '#22D3EE',
  violet: '#A78BFA',

  /* Typefaces: Roboto carries headings/titles, Inter carries body + UI. */
  display: "'Roboto', 'Helvetica Neue', sans-serif",
  body: "'Inter', sans-serif",
  /* Back-compat aliases so existing call sites keep working. */
  serif: "'Roboto', 'Helvetica Neue', sans-serif",
  sans: "'Inter', sans-serif",
};

/** Soft glow for hover states — amber by default, any accent on request. */
export const glow = (color: string = T.amber, strength = 0.28) =>
  `0 4px 16px ${color}${Math.round(strength * 255).toString(16).padStart(2, '0')}`;

/* ── Hexagon primitives ─────────────────────────────────────────────────── */
export function hexPoints(cx: number, cy: number, r: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 180) * (60 * i - 30);
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(' ');
}

/** Small solid amber hexagon — used as a bullet / accent mark. */
export function HexMark({ size = 12, color = T.amber, style }: { size?: number; color?: string; style?: CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" style={{ flexShrink: 0, ...style }} aria-hidden="true">
      <polygon points={hexPoints(5, 5, 4.5)} fill={color} />
    </svg>
  );
}

/**
 * Large faint outlined hexagon that bleeds off a corner — the signature
 * background texture. `corner` picks which corner it anchors to.
 */
export function BgHex({ corner = 'top-right', opacity = 0.08 }: { corner?: 'top-right' | 'top-left' | 'bottom-left' | 'bottom-right'; opacity?: number }) {
  const cx = corner.includes('right') ? 1120 : 40;
  const cy = corner.includes('bottom') ? 620 : -80;
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1160 620"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <polygon points={hexPoints(cx, cy, 380)} fill="none" stroke={T.amber} strokeWidth="1.5" opacity={opacity} />
    </svg>
  );
}

/* ── Eyebrow label ──────────────────────────────────────────────────────── */
export function Eyebrow({ children, color = T.sage, style }: { children: ReactNode; color?: string; style?: CSSProperties }) {
  return (
    <p style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 500, letterSpacing: '0.14em', color, textTransform: 'uppercase', ...style }}>
      {children}
    </p>
  );
}

/* ── Serif display heading ──────────────────────────────────────────────── */
export function Display({ children, size = 52, style }: { children: ReactNode; size?: number | string; style?: CSSProperties }) {
  return (
    <h2
      style={{
        fontFamily: T.serif,
        fontSize: typeof size === 'number' ? `clamp(32px, 5vw, ${size}px)` : size,
        fontWeight: 300,
        lineHeight: 1.05,
        letterSpacing: '-0.025em',
        color: T.text,
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

/* ── Hairline divider ───────────────────────────────────────────────────── */
export function Hairline({ style }: { style?: CSSProperties }) {
  return <div style={{ height: 1, background: T.line, ...style }} />;
}
