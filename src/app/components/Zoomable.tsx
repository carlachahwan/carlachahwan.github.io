import { useState, useEffect, ReactNode } from 'react';
import { X, Maximize2 } from 'lucide-react';
import { T } from './playbook';

/**
 * Wraps any visual (image or rendered mockup) and makes it click-to-zoom.
 * Clicking opens a full-screen dimmed overlay with the same content enlarged;
 * click anywhere, or press Esc, to close. Turns static screens into something
 * a reader can actually inspect — the "interactive" layer over the visuals.
 */
export default function Zoomable({ children, caption }: { children: ReactNode; caption?: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="group relative"
        style={{ cursor: 'zoom-in' }}
        role="button"
        tabIndex={0}
        aria-label={caption ? `Zoom: ${caption}` : 'Zoom image'}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(true); } }}
      >
        {children}
        {/* Hover affordance */}
        <div
          className="opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ position: 'absolute', top: 10, right: 10, width: 28, height: 28, borderRadius: 6, background: 'rgba(14,15,19,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}
        >
          <Maximize2 size={15} color={T.text} />
        </div>
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(14,15,19,0.92)', backdropFilter: 'blur(4px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, cursor: 'zoom-out' }}
        >
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            style={{ position: 'absolute', top: 20, right: 20, width: 40, height: 40, borderRadius: 8, background: T.bgCard, border: `1px solid ${T.line}`, color: T.text, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>

          {/* Enlarged content — stop propagation so clicking the art doesn't close */}
          <div
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: 'min(1100px, 92vw)', maxHeight: '82vh', overflow: 'auto', borderRadius: 12, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, cursor: 'default' }}
          >
            {children}
          </div>
          {caption && (
            <p style={{ fontFamily: T.body, fontSize: 14, color: T.sage, marginTop: 16, textAlign: 'center', maxWidth: 600 }}>{caption}</p>
          )}
        </div>
      )}
    </>
  );
}
