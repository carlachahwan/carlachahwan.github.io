/*
 * ClientLogos — auto-scrolling client logo marquee for the homepage.
 *
 * File location: src/app/components/ClientLogos.tsx
 * Requires:      src/app/components/clientLogoData.ts (base64 logo data)
 *
 * The source logos are a mix of formats (PNG + SVG) with inconsistent baked-in
 * backgrounds — some transparent, some white, some dark. Dropped straight onto
 * the dark editorial background that reads as a row of mismatched white boxes,
 * with the dark marks disappearing entirely.
 *
 * Fix: every logo sits in its own uniform cream tile. That neutralises the
 * mixed backgrounds, keeps each brand's real colours, and guarantees dark marks
 * stay legible — while reading as a deliberate design choice rather than an
 * accident. The list renders twice back-to-back; the track slides by -50% and
 * loops, which reads as a seamless infinite scroll.
 */
import { CLIENT_LOGOS } from './clientLogoData';
import { T } from './playbook';

const SCROLL_SECONDS = 55; // higher = slower (tiles are wider, so ease the pace)

export default function ClientLogos() {
  return (
    <section
      aria-label="Clients I have worked with"
      style={{ background: T.bg, borderTop: `1px solid ${T.line}`, borderBottom: `1px solid ${T.line}`, padding: '56px 0', overflow: 'hidden' }}
    >
      <style>{`
        @keyframes logo-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .logo-marquee-track {
          display: flex;
          align-items: center;
          gap: 20px;
          width: max-content;
          animation: logo-marquee ${SCROLL_SECONDS}s linear infinite;
        }
        .logo-tile {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 104px;
          width: 208px;
          padding: 20px 26px;
          background: #F4F1EA;
          border: 1px solid rgba(244,241,234,0.12);
          border-radius: 10px;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .logo-tile img {
          max-height: 100%;
          max-width: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
          display: block;
        }
        .logo-tile:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 28px rgba(45,157,148,0.18);
        }
        @media (prefers-reduced-motion: reduce) {
          .logo-marquee-track { animation: none; }
          .logo-tile:hover { transform: none; }
        }
      `}</style>

      <p style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.sage, letterSpacing: '0.14em', textTransform: 'uppercase', textAlign: 'center', marginBottom: 40 }}>
        Trusted by teams &amp; brands across the region
      </p>

      {/* Fade masks on both edges */}
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 100, background: `linear-gradient(to right, ${T.bg}, transparent)`, zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 100, background: `linear-gradient(to left, ${T.bg}, transparent)`, zIndex: 2, pointerEvents: 'none' }} />

        <div className="logo-marquee-track">
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map(({ src, alt }, i) => (
            <div className="logo-tile" key={`${alt}-${i}`} aria-hidden={i >= CLIENT_LOGOS.length}>
              <img src={src} alt={i < CLIENT_LOGOS.length ? alt : ''} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
