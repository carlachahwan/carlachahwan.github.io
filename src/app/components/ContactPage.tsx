import { useState, useEffect, useRef } from 'react';
import { Mail, MapPin, Linkedin, ArrowRight, CheckCircle, AlertCircle, Loader, MessageSquare, CalendarClock } from 'lucide-react';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { T, Eyebrow, HexMark, BgHex } from './playbook';

const SERVER_URL = `https://${projectId}.supabase.co/functions/v1/make-server-101d0b25`;

// Carla's Calendly scheduling link — themed to the dark editorial palette.
const CALENDLY_URL = 'https://calendly.com/chahwancarla1/30min';
const CALENDLY_EMBED_URL = `${CALENDLY_URL}?hide_gdpr_banner=1&background_color=14151A&text_color=F4F1EA&primary_color=E8963C`;
// Height shown while the widget loads. Once Calendly reports its real content
// height (see calendly.page_height below), the frame resizes to match so there's
// no inner scrollbar and no empty space beneath the calendar.
const CALENDLY_HEIGHT = 700;
// Ignore transient tiny heights Calendly emits mid-load (e.g. 2px, 26px).
const CALENDLY_MIN_HEIGHT = 400;

/**
 * Warm up Calendly as early as possible: open the network connections to its
 * hosts and start downloading the widget script. Called on Contact page mount
 * so the scheduler is ready (or nearly) by the time the visitor opens the tab.
 */
function preloadCalendly() {
  if (typeof document === 'undefined') return;

  const hosts = ['https://assets.calendly.com', 'https://calendly.com'];
  hosts.forEach(href => {
    if (document.querySelector(`link[data-calendly-pre][href="${href}"]`)) return;
    (['preconnect', 'dns-prefetch'] as const).forEach(rel => {
      const link = document.createElement('link');
      link.rel = rel;
      link.href = href;
      link.crossOrigin = 'anonymous';
      link.setAttribute('data-calendly-pre', '');
      document.head.appendChild(link);
    });
  });

  if (!document.getElementById('calendly-widget-script')) {
    const script = document.createElement('script');
    script.id = 'calendly-widget-script';
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
  }
}

/** Inline Calendly embed with a branded loading skeleton until the calendar renders. */
function CalendlyEmbed() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [height, setHeight] = useState(CALENDLY_HEIGHT);

  useEffect(() => {
    preloadCalendly();
    let cancelled = false;

    const tryInit = () => {
      const Calendly = (window as any).Calendly;
      if (cancelled || !containerRef.current) return false;
      if (Calendly && typeof Calendly.initInlineWidget === 'function') {
        containerRef.current.innerHTML = '';
        Calendly.initInlineWidget({ url: CALENDLY_EMBED_URL, parentElement: containerRef.current });
        return true;
      }
      return false;
    };

    let poll: ReturnType<typeof setInterval> | undefined;
    if (!tryInit()) {
      poll = setInterval(() => { if (tryInit()) clearInterval(poll); }, 120);
    }

    const onMessage = (e: MessageEvent) => {
      if (e.origin.indexOf('calendly.com') === -1) return;
      const data = e.data;
      if (!data || typeof data.event !== 'string' || data.event.indexOf('calendly') !== 0) return;
      setLoaded(true);
      // Calendly reports its content height per step — resize the frame to fit,
      // ignoring the transient tiny values it emits mid-load.
      if (data.event === 'calendly.page_height' && data.payload && typeof data.payload.height === 'string') {
        const px = parseInt(data.payload.height, 10);
        if (!Number.isNaN(px) && px >= CALENDLY_MIN_HEIGHT) setHeight(px);
      }
    };
    window.addEventListener('message', onMessage);

    const fallback = setTimeout(() => setLoaded(true), 8000);

    return () => {
      cancelled = true;
      if (poll) clearInterval(poll);
      clearTimeout(fallback);
      window.removeEventListener('message', onMessage);
    };
  }, []);

  return (
    <div style={{ position: 'relative', height, width: '100%', transition: 'height 0.3s ease' }}>
      {!loaded && (
        <div
          style={{
            position: 'absolute', inset: 0, zIndex: 1,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16,
            background: T.bgCard, borderRadius: 12,
          }}
        >
          <Loader size={28} className="animate-spin" style={{ color: T.amber }} />
          <p style={{ fontFamily: T.sans, fontSize: 16, fontWeight: 500, color: T.sage }}>Loading available times…</p>
        </div>
      )}
      <div ref={containerRef} style={{ minWidth: 320, height: '100%', width: '100%' }} />
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [focused, setFocused] = useState<string | null>(null);
  const [tab, setTab] = useState<'message' | 'call'>('call');

  useEffect(() => { preloadCalendly(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch(`${SERVER_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setStatus('success');
    } catch (err: any) {
      console.error('Contact form error:', err);
      setErrorMsg(err.message || 'Failed to send message. Please try again.');
      setStatus('error');
    }
  };

  const inputStyle = (field: string) => ({
    width: '100%',
    padding: '14px 16px',
    background: T.bgSoft,
    border: `1px solid ${focused === field ? T.amber : T.line}`,
    borderRadius: 6,
    fontSize: 16,
    color: T.text,
    outline: 'none',
    transition: 'all 0.15s ease',
    boxSizing: 'border-box' as const,
    fontFamily: T.sans,
  });

  const labelStyle = { display: 'block', fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.sage, marginBottom: 7, textTransform: 'uppercase' as const, letterSpacing: '0.1em' };

  const contactDetails = [
    { icon: <Mail size={18} />, label: 'Email', value: 'chahwancarla1@gmail.com', href: 'mailto:chahwancarla1@gmail.com' },
    { icon: <MapPin size={18} />, label: 'Location', value: 'Beirut, Lebanon', href: null },
    { icon: <Linkedin size={18} />, label: 'LinkedIn', value: 'linkedin.com/in/carla-chahwan', href: 'https://www.linkedin.com/in/carla-chahwan-142b3595/' },
  ];

  return (
    <div style={{ background: T.bg, fontFamily: T.sans }}>
      <style>{`.contact-input::placeholder { color: ${T.faint}; }`}</style>

      {/* Header — compact so the contact options sit above the fold */}
      <section className="relative overflow-hidden" style={{ background: T.bg, paddingTop: 72 }}>
        <BgHex corner="top-right" opacity={0.09} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10" style={{ paddingTop: 36, paddingBottom: 32 }}>
          <Eyebrow color={T.amber}>Get in Touch</Eyebrow>
          <h1 style={{ fontFamily: T.serif, fontSize: 'clamp(30px, 3.4vw, 44px)', fontWeight: 300, color: T.text, letterSpacing: '-0.03em', lineHeight: 1.1, maxWidth: 720, marginTop: 12 }}>
            Let's build something <span style={{ fontStyle: 'italic', color: T.amber }}>strategically exceptional.</span>
          </h1>
          <p style={{ fontSize: 17, color: T.sage, lineHeight: 1.6, maxWidth: 620, marginTop: 12 }}>
            Book a meeting or send a message — whichever suits you.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section style={{ background: T.bg, padding: '40px 0 72px', borderTop: `1px solid ${T.line}` }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

            {/* Left: Contact Details */}
            <div className="lg:col-span-2">
              <h2 style={{ fontFamily: T.serif, fontSize: 28, fontWeight: 300, color: T.text, letterSpacing: '-0.02em', marginBottom: 10 }}>
                Direct Contact
              </h2>
              <p style={{ fontSize: 17, color: T.sage, lineHeight: 1.7, marginBottom: 32 }}>
                Available for freelance engagements, senior UX strategy roles, and long-term product partnerships.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 40 }}>
                {contactDetails.map(({ icon, label, value, href }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 8, background: T.bgCard, border: `1px solid ${T.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.amber, flexShrink: 0 }}>
                      {icon}
                    </div>
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 500, color: T.dim, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith('http') ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          style={{ fontSize: 17, fontWeight: 500, color: T.text, textDecoration: 'none' }}
                          onMouseEnter={e => (e.currentTarget.style.color = T.amber)}
                          onMouseLeave={e => (e.currentTarget.style.color = T.text)}
                        >
                          {value}
                        </a>
                      ) : (
                        <p style={{ fontSize: 17, fontWeight: 500, color: T.text }}>{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Availability badge */}
              {/* Availability — mint carries the "open / positive" signal */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `${T.mint}14`, border: `1px solid ${T.mint}55`, borderRadius: 6, padding: '10px 16px' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: T.mint, boxShadow: `0 0 0 3px ${T.mint}40` }} />
                <span style={{ fontSize: 15, fontWeight: 500, color: T.text }}>Available for new projects</span>
              </div>

              {/* Engagement types */}
              <div style={{ marginTop: 36 }}>
                <p style={{ fontSize: 13, fontWeight: 500, color: T.dim, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>
                  Engagement Types
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    'UX Strategy & Architecture Consulting',
                    'End-to-end Product Design Leadership',
                    'UX Audits & Heuristic Evaluation',
                    'Design System Creation & Governance',
                    'Research Facilitation & Synthesis',
                  ].map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <HexMark size={10} />
                      <span style={{ fontSize: 16, color: T.sage }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Contact Form / Scheduler */}
            <div className="lg:col-span-3">
              <div style={{ background: T.bgCard, borderRadius: 16, border: `1px solid ${T.line}`, padding: '36px 32px', overflow: 'hidden' }}>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: 6, background: T.bgSoft, border: `1px solid ${T.line}`, borderRadius: 10, padding: 5, marginBottom: 28 }}>
                  {([
                    { key: 'call', label: 'Book a Meeting', icon: <CalendarClock size={16} /> },
                    { key: 'message', label: 'Send a Message', icon: <MessageSquare size={16} /> },
                  ] as const).map(({ key, label, icon }) => {
                    const active = tab === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setTab(key)}
                        aria-pressed={active}
                        className="flex items-center justify-center gap-2 transition-all"
                        style={{
                          flex: 1,
                          padding: '11px 16px',
                          borderRadius: 6,
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: 15.5,
                          fontWeight: 600,
                          letterSpacing: '0.02em',
                          background: active ? T.amber : 'transparent',
                          color: active ? T.bg : T.sage,
                          fontFamily: T.sans,
                        }}
                        onMouseEnter={e => { if (!active) e.currentTarget.style.color = T.text; }}
                        onMouseLeave={e => { if (!active) e.currentTarget.style.color = T.sage; }}
                      >
                        {icon}
                        {label}
                      </button>
                    );
                  })}
                </div>

                {/* ── Book a Meeting tab ── */}
                {tab === 'call' && (
                  <div>
                    <div style={{ marginBottom: 20 }}>
                      <h2 style={{ fontFamily: T.serif, fontSize: 26, fontWeight: 300, color: T.text, letterSpacing: '-0.02em', marginBottom: 8 }}>
                        Book a 30-min discovery session
                      </h2>
                      <p style={{ fontSize: 16, color: T.sage }}>Pick a time that works for you — happy to chat through your project scope before any commitment.</p>
                    </div>
                    {/* Full-bleed to the card edges so the calendar itself renders
                        larger without changing the card's overall size. */}
                    <div style={{ marginLeft: -32, marginRight: -32, marginBottom: -36, borderTop: `1px solid ${T.line}` }}>
                      <CalendlyEmbed />
                    </div>
                  </div>
                )}

                {/* ── Send a Message tab ── */}
                {tab === 'message' && (status === 'success' ? (
                  <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <CheckCircle size={52} style={{ color: T.mint, margin: '0 auto 20px' }} />
                    <h3 style={{ fontFamily: T.serif, fontSize: 28, fontWeight: 300, color: T.text, marginBottom: 10, letterSpacing: '-0.02em' }}>
                      Message Sent!
                    </h3>
                    <p style={{ fontSize: 17, color: T.sage, lineHeight: 1.7, maxWidth: 360, margin: '0 auto 28px' }}>
                      Thanks for reaching out. Your message has been saved and I'll get back to you within 1–2 business days.
                    </p>
                    <button
                      onClick={() => { setStatus('idle'); setForm({ name: '', email: '', company: '', message: '' }); }}
                      style={{ fontSize: 16, fontWeight: 600, color: T.amber, background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      Send another message →
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div>
                      <h2 style={{ fontFamily: T.serif, fontSize: 26, fontWeight: 300, color: T.text, letterSpacing: '-0.02em', marginBottom: 8 }}>
                        Send a Message
                      </h2>
                      <p style={{ fontSize: 16, color: T.sage }}>I read every message personally and respond within 48 hours.</p>
                    </div>

                    {status === 'error' && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(212,24,61,0.1)', border: '1px solid rgba(212,24,61,0.4)', borderRadius: 6, padding: '12px 14px' }}>
                        <AlertCircle size={16} style={{ color: '#e5647d', flexShrink: 0 }} />
                        <p style={{ fontSize: 16, color: '#e5647d' }}>{errorMsg}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label style={labelStyle}>Full Name *</label>
                        <input
                          type="text"
                          required
                          className="contact-input"
                          placeholder="Your name"
                          value={form.name}
                          onChange={e => setForm({ ...form, name: e.target.value })}
                          onFocus={() => setFocused('name')}
                          onBlur={() => setFocused(null)}
                          style={inputStyle('name')}
                          disabled={status === 'submitting'}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>Email Address *</label>
                        <input
                          type="email"
                          required
                          className="contact-input"
                          placeholder="your@email.com"
                          value={form.email}
                          onChange={e => setForm({ ...form, email: e.target.value })}
                          onFocus={() => setFocused('email')}
                          onBlur={() => setFocused(null)}
                          style={inputStyle('email')}
                          disabled={status === 'submitting'}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={labelStyle}>Company / Organisation</label>
                      <input
                        type="text"
                        className="contact-input"
                        placeholder="Where do you work? (optional)"
                        value={form.company}
                        onChange={e => setForm({ ...form, company: e.target.value })}
                        onFocus={() => setFocused('company')}
                        onBlur={() => setFocused(null)}
                        style={inputStyle('company')}
                        disabled={status === 'submitting'}
                      />
                    </div>

                    <div>
                      <label style={labelStyle}>Message *</label>
                      <textarea
                        required
                        rows={5}
                        className="contact-input"
                        placeholder="Tell me about your project, challenge, or opportunity..."
                        value={form.message}
                        onChange={e => setForm({ ...form, message: e.target.value })}
                        onFocus={() => setFocused('message')}
                        onBlur={() => setFocused(null)}
                        style={{ ...inputStyle('message'), resize: 'vertical', minHeight: 140 }}
                        disabled={status === 'submitting'}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="flex items-center justify-center gap-2 w-full transition-all"
                      style={{
                        background: status === 'submitting' ? T.bgSoft : T.amber,
                        color: status === 'submitting' ? T.sage : T.bg,
                        fontSize: 17,
                        fontWeight: 600,
                        padding: '16px 28px',
                        border: 'none',
                        borderRadius: 6,
                        cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                        letterSpacing: '0.01em',
                        fontFamily: T.sans,
                      }}
                      onMouseEnter={e => { if (status !== 'submitting') e.currentTarget.style.background = T.amberDeep; }}
                      onMouseLeave={e => { if (status !== 'submitting') e.currentTarget.style.background = T.amber; }}
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader size={16} className="animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send Message
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>

                    <p style={{ fontSize: 14, color: T.dim, textAlign: 'center' }}>
                      Your information is kept private and never shared.
                    </p>
                  </form>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
