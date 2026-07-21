import { Page } from '../App';
import { T, HexMark } from './playbook';

interface FooterProps {
  /* Kept so App.tsx (<Footer onNavigate={...} />) compiles unchanged;
     not used by the footer itself. */
  onNavigate: (page: Page) => void;
}

export default function Footer(_props: FooterProps) {
  return (
    <footer style={{ background: T.bg, borderTop: `1px solid ${T.line}` }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2.5">
            <HexMark size={11} />
            <p style={{ fontFamily: T.sans, fontSize: 15, color: T.sage }}>© 2026 Carla Chahwan. All rights reserved.</p>
          </div>
          <p style={{ fontFamily: T.sans, fontSize: 14, color: T.dim, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Strategic UX Architect · Beirut, Lebanon</p>
        </div>
      </div>
    </footer>
  );
}
