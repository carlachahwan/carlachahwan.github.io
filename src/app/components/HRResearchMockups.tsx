/* ─────────────────────────────────────────────────────────
   HR Application — Market & Competitive Research
   Three polished research-deliverable screens:
   1. Market Landscape Overview  2. Competitive Gap Matrix  3. Feature Consolidation Board
   ───────────────────────────────────────────────────────── */

const IN  = '#4f46e5';
const BK  = '#0f172a';
const W   = '#ffffff';
const SL  = '#f8fafc';
const TX  = '#64748b';

/* ── reusable pill tag ── */
function Pill({ label, color = IN, filled = false }: { label: string; color?: string; filled?: boolean }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 7px',
      borderRadius: 20,
      background: filled ? color : `${color}18`,
      color: filled ? W : color,
      fontSize: 7.5,
      fontWeight: 700,
      letterSpacing: '0.03em',
      whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
  );
}

/* ──────────────────────────────────────────────
   SCREEN 1 — Market Landscape Overview
   ────────────────────────────────────────────── */
export function HRMarketAnalysis() {
  const sections = [
    {
      label: 'International', color: '#0891b2',
      apps: [
        { name: 'Workday', badge: 'Enterprise', features: ['Payroll', 'Perf.', 'Analytics', 'ATS'] },
        { name: 'BambooHR', badge: 'SMB', features: ['Leave', 'Onboarding', 'Self-Svc'] },
        { name: 'ADP Workforce', badge: 'Enterprise', features: ['Payroll', 'Compliance', 'Benefits'] },
        { name: 'SAP SuccessFactors', badge: 'Enterprise', features: ['Succession', 'LMS', 'Perf.'] },
      ],
    },
    {
      label: 'Gulf Region', color: '#d97706',
      apps: [
        { name: 'ZenHR', badge: 'UAE / KSA', features: ['WPS', 'Leave', 'Payroll'] },
        { name: 'Mawared HR', badge: 'KSA', features: ['Recruitment', 'Perf.', 'Nitaqat'] },
        { name: 'Bayzat', badge: 'UAE', features: ['Insurance', 'Payroll', 'Benefits'] },
        { name: 'Jawdah', badge: 'KSA', features: ['KPIs', 'HR Portal', 'WPS'] },
      ],
    },
  ];

  return (
    <div style={{ background: W, borderRadius: 12, overflow: 'hidden', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', height: '100%', minHeight: 280 }}>
      {/* Canvas header */}
      <div style={{ background: BK, padding: '8px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 9.5, fontWeight: 800, color: W, letterSpacing: '-0.01em' }}>Market Landscape Analysis</div>
          <div style={{ fontSize: 7, color: '#94a3b8', marginTop: 1 }}>Phase 1 of 4 · 8 HR Applications Audited</div>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {['#ef4444', '#f59e0b', '#22c55e'].map(c => <div key={c} style={{ width: 7, height: 7, borderRadius: '50%', background: c }} />)}
        </div>
      </div>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
        {sections.map(({ label, color, apps }) => (
          <div key={label} style={{ padding: '10px 10px', borderRight: label === 'International' ? '1px solid #f1f5f9' : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 7 }}>
              <div style={{ width: 3, height: 12, background: color, borderRadius: 2 }} />
              <span style={{ fontSize: 8.5, fontWeight: 800, color: BK }}>{label}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {apps.map(({ name, badge, features }) => (
                <div key={name} style={{ background: SL, borderRadius: 6, padding: '5px 7px', border: `1px solid ${color}22` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontSize: 8.5, fontWeight: 700, color: BK }}>{name}</span>
                    <span style={{ fontSize: 6.5, color: TX, background: '#e2e8f0', padding: '1px 5px', borderRadius: 3 }}>{badge}</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {features.map(f => <Pill key={f} label={f} color={color} />)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Common feature strip */}
      <div style={{ padding: '7px 12px', background: `${IN}0d`, borderTop: `1px solid ${IN}22`, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 7.5, fontWeight: 800, color: IN, whiteSpace: 'nowrap' }}>Shared Core →</span>
        {['Payroll', 'Leave Mgmt', 'Self-Service', 'Recruitment', 'Mobile App', 'Analytics'].map(f => (
          <Pill key={f} label={f} color={IN} />
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   SCREEN 2 — Competitive Gap Matrix
   ────────────────────────────────────────────── */
export function HRCompetitiveMatrix() {
  const features = [
    { name: 'Employee Self-Service', row: [true, true, true, true] },
    { name: 'Mobile Application',   row: [true, true, false, true] },
    { name: 'Payroll & WPS',        row: [true, true, true, true] },
    { name: 'Leave Management',     row: [true, true, true, true] },
    { name: 'Recruitment / ATS',    row: [false, false, true, false], gap: true },
    { name: 'Performance Reviews',  row: [false, true, true, false], gap: true },
    { name: 'KSA Compliance',       row: [true, false, true, false] },
    { name: 'Analytics Dashboard',  row: [false, true, false, true], gap: true },
    { name: 'Training / LMS',       row: [false, false, false, true], gap: true },
  ];
  const cols = ['XName', 'ZenHR', 'Mawared', 'Bayzat'];

  return (
    <div style={{ background: W, borderRadius: 12, overflow: 'hidden', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', height: '100%', minHeight: 280 }}>
      <div style={{ background: BK, padding: '8px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 9.5, fontWeight: 800, color: W }}>Competitive Feature Matrix</div>
          <div style={{ fontSize: 7, color: '#94a3b8', marginTop: 1 }}>Phase 3 of 4 · XName vs. Gulf Competitors</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}><span style={{ fontSize: 9, color: '#22c55e' }}>✓</span><span style={{ fontSize: 7, color: '#94a3b8' }}>Has</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}><span style={{ fontSize: 9, color: '#ef4444' }}>✗</span><span style={{ fontSize: 7, color: '#94a3b8' }}>Missing</span></div>
        </div>
      </div>

      <div style={{ flex: 1, padding: '8px 12px', overflowY: 'auto' }}>
        {/* Column headers */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 44px 44px 44px 44px', gap: 2, marginBottom: 5 }}>
          <div />
          {cols.map((c, i) => (
            <div key={c} style={{ textAlign: 'center', fontSize: 7.5, fontWeight: 800, color: i === 0 ? IN : TX }}>{c}</div>
          ))}
        </div>

        {/* Feature rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {features.map(({ name, row, gap }) => (
            <div key={name} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 44px 44px 44px 44px',
              gap: 2,
              background: gap ? '#fff7ed' : SL,
              borderRadius: 5,
              padding: '4px 6px',
              border: gap ? '1px solid #fed7aa' : '1px solid transparent',
              alignItems: 'center',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {gap && <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#f59e0b', flexShrink: 0 }} />}
                <span style={{ fontSize: 8, color: BK, fontWeight: gap ? 700 : 400 }}>{name}</span>
              </div>
              {row.map((has, ci) => (
                <div key={ci} style={{ textAlign: 'center', fontSize: 10, fontWeight: 800 }}>
                  <span style={{ color: has ? '#16a34a' : '#ef4444' }}>{has ? '✓' : '✗'}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Gap summary footer */}
      <div style={{ padding: '6px 12px', background: '#fff7ed', borderTop: '1px solid #fed7aa', display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#f59e0b', flexShrink: 0 }} />
        <span style={{ fontSize: 7.5, color: '#92400e', fontWeight: 600 }}>4 critical gaps identified vs. competitors → ATS, Analytics, LMS, Performance</span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   SCREEN 3 — Feature Consolidation Board
   ────────────────────────────────────────────── */
export function HRFeatureMap() {
  const categories = [
    {
      label: 'HR Department', color: IN, icon: '🏢',
      existing: ['Payroll Processing', 'Leave Management', 'Employee Records', 'KSA WPS'],
      proposed: ['Recruitment ATS', 'Performance Module', 'Workforce Analytics'],
    },
    {
      label: 'Employee Self-Service', color: '#0891b2', icon: '👤',
      existing: ['Payslip Access', 'Leave Requests', 'Document Upload'],
      proposed: ['Training Portal (LMS)', 'Expense Claims', 'Career Development'],
    },
    {
      label: 'KSA-Specific', color: '#d97706', icon: '🇸🇦',
      existing: ['GOSI Integration', 'Nitaqat Compliance', 'Iqama Tracking'],
      proposed: ['Saudization KPI Dashboard', 'Ministry of HR API', 'Vision 2030 Reporting'],
    },
  ];

  return (
    <div style={{ background: W, borderRadius: 12, overflow: 'hidden', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', height: '100%', minHeight: 280 }}>
      <div style={{ background: BK, padding: '8px 14px' }}>
        <div style={{ fontSize: 9.5, fontWeight: 800, color: W }}>Feature Consolidation Board</div>
        <div style={{ fontSize: 7, color: '#94a3b8', marginTop: 1 }}>Phase 4 of 4 · Final Proposed Feature Set for XName</div>
      </div>

      <div style={{ flex: 1, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 7 }}>
        {categories.map(({ label, color, icon, existing, proposed }) => (
          <div key={label} style={{ background: SL, borderRadius: 7, border: `1px solid ${color}22`, overflow: 'hidden' }}>
            <div style={{ padding: '5px 8px', background: `${color}0d`, borderBottom: `1px solid ${color}22`, display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ fontSize: 10 }}>{icon}</span>
              <span style={{ fontSize: 8.5, fontWeight: 800, color: BK }}>{label}</span>
            </div>
            <div style={{ padding: '6px 8px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
              <div>
                <div style={{ fontSize: 7, fontWeight: 700, color: TX, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>Existing</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  {existing.map(f => <Pill key={f} label={f} color={color} />)}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 7, fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>⚡ Proposed</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  {proposed.map(f => <Pill key={f} label={f} color={color} filled />)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
