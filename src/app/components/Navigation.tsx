import { useState } from 'react';
import { Download, Linkedin, Menu, X } from 'lucide-react';
import { Page } from '../App';
import { downloadCV } from '../utils/downloadCV';
import { T } from './playbook';
import profilePhoto from '../../imports/Updated_Me.png';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const LINKEDIN_URL = 'https://www.linkedin.com/in/carla-chahwan-142b3595/';

const navLinks: { label: string; page: Page }[] = [
  { label: 'Home', page: 'home' },
  { label: 'Projects', page: 'projects' },
  { label: 'Contact', page: 'contact' },
];

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{ background: 'rgba(14,15,19,0.85)', backdropFilter: 'blur(14px)', borderColor: T.line }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between" style={{ height: 72 }}>
        {/* Logo — photo + name */}
        <button onClick={() => onNavigate('home')} className="flex items-center gap-3">
          <img
            src={profilePhoto}
            alt="Carla Chahwan"
            style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', objectPosition: 'center top', border: `1.5px solid ${T.amber}`, flexShrink: 0 }}
          />
          <span style={{ fontFamily: T.serif, color: T.text, fontSize: 20, fontWeight: 400, letterSpacing: '-0.01em' }}>
            Carla Chahwan
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-9">
          {navLinks.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              className="relative transition-colors"
              style={{ fontFamily: T.sans, fontSize: 15, fontWeight: 500, letterSpacing: '0.02em', color: currentPage === page ? T.text : T.sage }}
              onMouseEnter={e => { if (currentPage !== page) e.currentTarget.style.color = T.text; }}
              onMouseLeave={e => { if (currentPage !== page) e.currentTarget.style.color = T.sage; }}
            >
              {label}
              {currentPage === page && (
                <span className="absolute left-1/2 -translate-x-1/2 -bottom-2" style={{ width: 5, height: 5, background: T.amber, transform: 'translateX(-50%) rotate(45deg)' }} />
              )}
            </button>
          ))}
        </div>

        {/* Download CV CTA + LinkedIn */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={downloadCV}
            className="flex items-center gap-2 transition-all"
            style={{ fontFamily: T.sans, background: T.amber, color: T.bg, fontSize: 15, fontWeight: 600, padding: '9px 18px', letterSpacing: '0.02em', border: 'none', cursor: 'pointer', borderRadius: 3 }}
            onMouseEnter={e => (e.currentTarget.style.background = T.amberDeep)}
            onMouseLeave={e => (e.currentTarget.style.background = T.amber)}
          >
            <Download size={13} />
            Download CV
          </button>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Carla Chahwan on LinkedIn"
            className="flex items-center justify-center transition-all"
            style={{ width: 36, height: 36, border: `1px solid ${T.line}`, color: T.text, borderRadius: 3 }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = T.amber; e.currentTarget.style.color = T.amber; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = T.line; e.currentTarget.style.color = T.text; }}
          >
            <Linkedin size={16} />
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} style={{ color: T.text }}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden px-6 py-5 flex flex-col gap-5 border-t" style={{ borderColor: T.line, background: T.bg }}>
          {navLinks.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => { onNavigate(page); setMobileOpen(false); }}
              className="text-left"
              style={{ fontFamily: T.sans, fontSize: 17, fontWeight: 500, color: currentPage === page ? T.amber : T.sage }}
            >
              {label}
            </button>
          ))}
          <div className="flex items-center gap-3">
            <button
              onClick={() => { downloadCV(); setMobileOpen(false); }}
              className="flex items-center gap-2 w-fit"
              style={{ fontFamily: T.sans, background: T.amber, color: T.bg, fontSize: 15, fontWeight: 600, padding: '9px 18px', border: 'none', cursor: 'pointer', borderRadius: 3 }}
            >
              <Download size={13} />
              Download CV
            </button>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Carla Chahwan on LinkedIn"
              className="flex items-center justify-center"
              style={{ width: 38, height: 38, border: `1px solid ${T.line}`, color: T.text, borderRadius: 3 }}
            >
              <Linkedin size={16} />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
