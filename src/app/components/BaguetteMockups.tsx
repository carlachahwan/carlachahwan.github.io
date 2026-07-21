/* ─────────────────────────────────────────────────────────
   Baguette SA — Recruitment Module
   Three pixel-faithful mini-UI recreations derived from the
   Figma JSX source: Dashboard, Job Listings, Candidate Card
   ───────────────────────────────────────────────────────── */

/* ── Shared micro primitives ── */
const A = '#f59e0b';   // amber-400 (brand accent)
const D = '#292524';   // stone-800 (brand dark)
const W = '#ffffff';
const G = '#f5f5f4';   // stone-100

function SidebarIcon({ active }: { active?: boolean }) {
  return (
    <div style={{ width: 32, height: 32, borderRadius: 6, background: active ? A : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 14, height: 10, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ height: 2, borderRadius: 1, background: active ? D : '#a8a29e', width: i === 2 ? 10 : 14 }} />
        ))}
      </div>
    </div>
  );
}

/* ── SCREEN 1: Dashboard ── */
export function BaguetteDashboard() {
  const kpis = [
    { label: 'Open Positions', value: '79' },
    { label: 'Applicants', value: '160' },
    { label: 'Outstanding Offers', value: '7' },
    { label: 'Onboarding', value: '18' },
  ];

  const stages = [
    { label: 'Applied', pct: 69, w: '69%' },
    { label: 'Shortlisted', pct: 14, w: '14%' },
    { label: 'Rejected', pct: 7, w: '7%' },
  ];

  const candidates = [
    { name: 'Lara M.', role: 'Sr. Designer', status: 'Interview', dot: '#22c55e' },
    { name: 'Omar K.', role: 'DevOps Eng.', status: 'Shortlisted', dot: A },
    { name: 'Nadia S.', role: 'PM', status: 'Applied', dot: '#94a3b8' },
  ];

  return (
    <div style={{ background: G, borderRadius: 10, overflow: 'hidden', fontSize: 9, height: '100%', minHeight: 280, display: 'flex', flexDirection: 'column' }}>
      {/* Top Bar */}
      <div style={{ background: D, padding: '7px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 20, height: 20, background: A, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 7, fontWeight: 800, color: D }}>B</span>
          </div>
          <span style={{ color: W, fontWeight: 700, fontSize: 9 }}>Baguette</span>
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#44403c', border: `1.5px solid ${A}` }} />
          <span style={{ color: '#a8a29e', fontSize: 8 }}>Sarah · HR Manager</span>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <div style={{ width: 36, background: D, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 10, gap: 6 }}>
          {[true, false, false, false, false].map((a, i) => (
            <SidebarIcon key={i} active={a} />
          ))}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: 10, overflow: 'hidden' }}>
          <div style={{ fontWeight: 800, fontSize: 11, color: D, marginBottom: 8 }}>Dashboard</div>

          {/* KPI Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 5, marginBottom: 8 }}>
            {kpis.map(({ label, value }) => (
              <div key={label} style={{ background: W, borderRadius: 7, padding: '5px 7px', borderLeft: `3px solid ${A}` }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: D, lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: 7, color: '#78716c', marginTop: 2, lineHeight: 1.2 }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Lower grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
            {/* Recruitment stages */}
            <div style={{ background: W, borderRadius: 7, padding: '7px 8px' }}>
              <div style={{ fontWeight: 700, fontSize: 9, color: D, marginBottom: 6 }}>Recruitment Stages</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: D, marginBottom: 4 }}>2,651</div>
              {stages.map(({ label, pct, w }) => (
                <div key={label} style={{ marginBottom: 4 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                    <span style={{ fontSize: 7, color: '#78716c' }}>{label}</span>
                    <span style={{ fontSize: 7, fontWeight: 700, color: D }}>{pct}%</span>
                  </div>
                  <div style={{ height: 4, background: G, borderRadius: 2 }}>
                    <div style={{ width: w, height: '100%', background: A, borderRadius: 2 }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Candidate list */}
            <div style={{ background: W, borderRadius: 7, padding: '7px 8px' }}>
              <div style={{ fontWeight: 700, fontSize: 9, color: D, marginBottom: 6 }}>Recent Candidates</div>
              {candidates.map(({ name, role, status, dot }) => (
                <div key={name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <div style={{ width: 16, height: 16, borderRadius: '50%', background: G, border: `1.5px solid ${A}` }} />
                    <div>
                      <div style={{ fontSize: 8, fontWeight: 700, color: D }}>{name}</div>
                      <div style={{ fontSize: 7, color: '#78716c' }}>{role}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: dot }} />
                    <span style={{ fontSize: 7, color: '#78716c' }}>{status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── SCREEN 2: User Persona (Sarah) ── */
export function BaguettePersona() {
  return (
    <div style={{ background: W, borderRadius: 10, overflow: 'hidden', fontSize: 9, height: '100%', minHeight: 280, display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ background: D, padding: '8px 12px' }}>
        <div style={{ fontSize: 8, fontWeight: 700, color: '#a8a29e', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>User Persona 1</div>
        <div style={{ display: 'inline-flex', background: A, borderRadius: 6, padding: '3px 10px' }}>
          <span style={{ fontSize: 10, fontWeight: 800, color: D }}>Sarah · The HR Manager</span>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', gap: 0, overflow: 'hidden' }}>
        {/* Left: profile */}
        <div style={{ width: 110, background: W, padding: '10px 8px', borderRight: `1px solid ${G}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: G, border: `3px solid ${A}` }} />
          <span style={{ fontSize: 10, fontWeight: 700, color: D }}>Sarah</span>
          {[['Age', '33'], ['Gender', 'Female'], ['Location', 'Dubai, UAE'], ['Occupation', 'HR Manager']].map(([k, v]) => (
            <div key={k} style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 7, color: '#78716c' }}>{k}</span>
              <span style={{ fontSize: 7, fontWeight: 700, color: D }}>{v}</span>
            </div>
          ))}
        </div>

        {/* Right: goals, pain points, preferences */}
        <div style={{ flex: 1, padding: '10px 10px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            { title: 'Goals', items: ['Manage recruitment efficiently', 'Ensure positive candidate experience', 'Leverage data for hiring decisions'] },
            { title: 'Pain Points', items: ['Limited HR team & resources', 'Managing multiple job postings', 'Maintaining transparent pipeline'] },
            { title: 'Preferences', items: ['Integration with HR software', 'Customizable templates', 'Automated scheduling & ranking'] },
          ].map(({ title, items }) => (
            <div key={title} style={{ background: G, borderRadius: 7, padding: '6px 8px', border: `1px solid ${A}33` }}>
              <div style={{ fontWeight: 800, fontSize: 9, color: D, marginBottom: 4 }}>{title}</div>
              {items.map(item => (
                <div key={item} style={{ fontSize: 7.5, color: '#57534e', lineHeight: 1.5, display: 'flex', gap: 4, alignItems: 'flex-start' }}>
                  <span style={{ color: A, marginTop: 1 }}>›</span> {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── SCREEN 3: Job Listings ── */
export function BaguetteJobListings() {
  const jobs = [
    { title: 'Senior UX Designer', dept: 'Product', apps: 24, status: 'Active', statusColor: '#22c55e' },
    { title: 'DevOps Engineer', dept: 'Engineering', apps: 18, status: 'Active', statusColor: '#22c55e' },
    { title: 'Product Manager', dept: 'Strategy', apps: 31, status: 'Paused', statusColor: A },
    { title: 'Content Strategist', dept: 'Marketing', apps: 12, status: 'Active', statusColor: '#22c55e' },
  ];

  return (
    <div style={{ background: G, borderRadius: 10, overflow: 'hidden', fontSize: 9, height: '100%', minHeight: 280, display: 'flex', flexDirection: 'column' }}>
      {/* Top Bar */}
      <div style={{ background: D, padding: '7px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: W, fontWeight: 700, fontSize: 9 }}>Job Listings</span>
        <div style={{ background: A, borderRadius: 4, padding: '3px 8px' }}>
          <span style={{ fontSize: 7.5, fontWeight: 700, color: D }}>+ Post New Job</span>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ width: 36, background: D, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 10, gap: 6 }}>
          {[false, true, false, false].map((a, i) => (
            <SidebarIcon key={i} active={a} />
          ))}
        </div>

        <div style={{ flex: 1, padding: 10 }}>
          {/* Filters row */}
          <div style={{ display: 'flex', gap: 5, marginBottom: 8 }}>
            {['All Jobs', 'Active', 'Paused', 'Closed'].map((f, i) => (
              <div key={f} style={{ padding: '3px 8px', borderRadius: 4, background: i === 0 ? D : W, border: `1px solid ${i === 0 ? D : '#e5e5e5'}` }}>
                <span style={{ fontSize: 7.5, fontWeight: i === 0 ? 700 : 400, color: i === 0 ? W : '#78716c' }}>{f}</span>
              </div>
            ))}
          </div>

          {/* Table header */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 55px 50px', gap: 4, padding: '4px 6px', marginBottom: 4 }}>
            {['Job Title', 'Department', 'Applicants', 'Status'].map(h => (
              <span key={h} style={{ fontSize: 7.5, fontWeight: 700, color: '#78716c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</span>
            ))}
          </div>

          {/* Job rows */}
          {jobs.map(({ title, dept, apps, status, statusColor }) => (
            <div key={title} style={{ display: 'grid', gridTemplateColumns: '1fr 60px 55px 50px', gap: 4, background: W, borderRadius: 6, padding: '6px 6px', marginBottom: 4, alignItems: 'center', border: '1px solid #f0f0f0' }}>
              <span style={{ fontSize: 8.5, fontWeight: 700, color: D }}>{title}</span>
              <span style={{ fontSize: 7.5, color: '#78716c' }}>{dept}</span>
              <span style={{ fontSize: 8, fontWeight: 700, color: D }}>{apps}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: statusColor }} />
                <span style={{ fontSize: 7.5, color: '#78716c' }}>{status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
