/* ─────────────────────────────────────────────────────────
   Shared case study data — imported by both ProjectsPage
   (inline preview) and CaseStudyPage (full dedicated page).
   ───────────────────────────────────────────────────────── */
import { CaseStudyData } from './CaseStudyTemplate';
import { BaguetteDashboard, BaguettePersona, BaguetteJobListings } from './BaguetteMockups';
import { TotersServiceSelect, TotersPickupDetails, TotersItemDetails } from './TotersMockups';
import { HRMarketAnalysis, HRCompetitiveMatrix, HRFeatureMap } from './HRResearchMockups';

/* ── Baguette architecture ── */
function BaguetteArchitecture() {
  const amber = '#f59e0b';
  const dark = '#292524';
  const nodes = [
    { id: 'login',    label: 'Auth & Login',         sub: 'Multi-role entry' },
    { id: 'dash',     label: 'Dashboard',             sub: 'KPI overview' },
    { id: 'jobs',     label: 'Job Listings',          sub: 'Post & manage' },
    { id: 'cands',    label: 'Candidates',            sub: 'Pipeline view' },
    { id: 'schedule', label: 'Interview Scheduler',   sub: 'Calendar + AI rank' },
    { id: 'analytics',label: 'Analytics',             sub: 'Hire metrics' },
  ];
  return (
    <div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        {[{ label: 'HR Manager (Sarah)', color: amber }, { label: 'Business Owner (Amir)', color: dark }].map(({ label, color }) => (
          <div key={label} style={{ flex: 1, borderTop: `3px solid ${color}`, paddingTop: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, overflowX: 'auto', paddingBottom: 8 }}>
        {nodes.map((node, i) => (
          <div key={node.id} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ background: i === 0 ? dark : i === 1 ? amber : '#fff', border: `1.5px solid ${i < 2 ? 'transparent' : '#e5e7eb'}`, borderRadius: 8, padding: '8px 14px', minWidth: 90, textAlign: 'center', boxShadow: i === 1 ? `0 0 0 3px ${amber}33` : 'none' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: i === 0 ? '#fff' : i === 1 ? dark : '#0f0f0f', lineHeight: 1.2 }}>{node.label}</div>
              </div>
              <div style={{ fontSize: 9, color: '#71717a', textAlign: 'center', maxWidth: 90 }}>{node.sub}</div>
            </div>
            {i < nodes.length - 1 && (
              <div style={{ display: 'flex', alignItems: 'center', padding: '0 6px', marginBottom: 18 }}>
                <div style={{ width: 24, height: 1.5, background: '#e5e7eb' }} />
                <div style={{ width: 0, height: 0, borderTop: '4px solid transparent', borderBottom: '4px solid transparent', borderLeft: '5px solid #e5e7eb' }} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16, padding: '12px 16px', background: '#fff8e6', borderRadius: 8, border: `1px solid ${amber}33` }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: amber, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Key Module Components</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {[
            ['Resume Parser', 'AI-powered extraction & candidate ranking'],
            ['Pipeline Kanban', 'Drag-drop stage management'],
            ['Interview Scheduler', 'Availability sync & automated invites'],
            ['Analytics Engine', 'Hire funnel metrics & BI reporting'],
            ['Communication Hub', 'Bulk email & WhatsApp templates'],
            ['Role-Based Access', 'HR Manager vs. Owner permission tiers'],
          ].map(([title, desc]) => (
            <div key={title} style={{ background: '#fff', borderRadius: 6, padding: '8px 10px', border: '1px solid #fde68a' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#0f0f0f', marginBottom: 3 }}>{title}</div>
              <div style={{ fontSize: 9, color: '#71717a', lineHeight: 1.5 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Toters architecture ── */
function TotersArchitecture() {
  const green = '#16A34A';
  const flows = [
    { lane: 'Deliver Something Flow', nodes: ['Service Select', 'Pickup Address', 'Item Details', 'Dropoff Address', 'Pricing & Review', 'Order Confirmed'] },
    { lane: 'Buy Something Flow',     nodes: ['Service Select', 'Item Details', 'Pickup Address', 'Dropoff Address', 'Pricing & Review', 'Order Confirmed'] },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {flows.map(({ lane, nodes }) => (
        <div key={lane}>
          <div style={{ fontSize: 10, fontWeight: 700, color: green, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{lane}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, overflowX: 'auto', paddingBottom: 4 }}>
            {nodes.map((node, i) => (
              <div key={node} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                <div style={{ background: i === 0 ? green : i === nodes.length - 1 ? '#f0fdf4' : '#fff', border: `1.5px solid ${i === 0 ? 'transparent' : i === nodes.length - 1 ? green : '#e5e7eb'}`, borderRadius: 6, padding: '6px 10px', textAlign: 'center' }}>
                  <span style={{ fontSize: 10, fontWeight: i === 0 ? 700 : 500, color: i === 0 ? '#fff' : i === nodes.length - 1 ? green : '#0f0f0f', whiteSpace: 'nowrap' }}>{node}</span>
                </div>
                {i < nodes.length - 1 && (
                  <div style={{ display: 'flex', alignItems: 'center', padding: '0 4px' }}>
                    <div style={{ width: 16, height: 1.5, background: '#e5e7eb' }} />
                    <div style={{ width: 0, height: 0, borderTop: '3px solid transparent', borderBottom: '3px solid transparent', borderLeft: '4px solid #e5e7eb' }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      <div style={{ padding: '10px 14px', background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: green, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Key UX Architecture Decisions</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {[
            ['Service-First Entry', 'Diverging flows at Step 0 prevents users from entering the wrong form context and reduces task abandonment.'],
            ['Saved Address System', 'Pre-filled Home/Work addresses with geo-context reduce friction for repeat users — core to high-frequency delivery habits.'],
            ['4-Step Progress Model', 'Chunked multi-step form with persistent step indicator manages cognitive load for complex order creation.'],
          ].map(([title, desc]) => (
            <div key={title} style={{ background: '#fff', borderRadius: 6, padding: '8px 10px', border: '1px solid #bbf7d0' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#0f0f0f', marginBottom: 3 }}>{title}</div>
              <div style={{ fontSize: 9, color: '#71717a', lineHeight: 1.5 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── HR Research architecture ── */
function HRResearchArchitecture() {
  const indigo = '#4f46e5';
  const phases = [
    { label: 'Phase 1\nMarket Analysis',      steps: ['International HR Apps', 'Gulf HR Apps', 'HR Websites & Portals'],                    color: '#0891b2' },
    { label: 'Phase 2\nFeature Audit',         steps: ['Common Features Matrix', 'KSA-Specific Requirements', 'Dept vs Employee Features'],   color: indigo },
    { label: 'Phase 3\nCompetitive Analysis',  steps: ['XName Existing Features', 'Gap Identification', 'Missing vs Competitors'],            color: '#7c3aed' },
    { label: 'Phase 4\nConsolidation',         steps: ['Proposed Feature Set', 'Priority Roadmap', 'Final Recommendations'],                  color: '#16a34a' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0, overflowX: 'auto', paddingBottom: 4 }}>
        {phases.map(({ label, steps, color }, pi) => (
          <div key={label} style={{ display: 'flex', alignItems: 'flex-start', flexShrink: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ background: color, borderRadius: 6, padding: '6px 12px', textAlign: 'center' }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: '#fff', whiteSpace: 'pre-line', lineHeight: 1.3 }}>{label}</span>
              </div>
              {steps.map(step => (
                <div key={step} style={{ background: '#fff', border: `1px solid ${color}44`, borderRadius: 5, padding: '4px 10px' }}>
                  <span style={{ fontSize: 9, color: '#0f0f0f', whiteSpace: 'nowrap' }}>{step}</span>
                </div>
              ))}
            </div>
            {pi < phases.length - 1 && (
              <div style={{ display: 'flex', alignItems: 'center', padding: '8px 6px', marginTop: 12 }}>
                <div style={{ width: 20, height: 1.5, background: '#e5e7eb' }} />
                <div style={{ width: 0, height: 0, borderTop: '4px solid transparent', borderBottom: '4px solid transparent', borderLeft: '5px solid #e5e7eb' }} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ padding: '10px 14px', background: '#eef2ff', borderRadius: 8, border: '1px solid #c7d2fe' }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: indigo, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Research Scope</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {[
            ['8+ HR Apps Audited', 'International: Workday, BambooHR, ADP, SAP · Gulf: ZenHR, Mawared, Bayzat, Jawdah'],
            ['KSA Market Focus', 'Nitaqat, GOSI, WPS compliance requirements and Saudization KPI tracking mapped as mandatory features'],
            ['Feature Gap Report', 'Final consolidated feature set delivered as prioritised roadmap input for XName product team'],
          ].map(([title, desc]) => (
            <div key={title} style={{ background: '#fff', borderRadius: 6, padding: '8px 10px', border: '1px solid #c7d2fe' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#0f0f0f', marginBottom: 3 }}>{title}</div>
              <div style={{ fontSize: 9, color: '#71717a', lineHeight: 1.5 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   Exported data objects
   ══════════════════════════════════════════════════════ */

export const telecomData: CaseStudyData = {
  id: 'telecom',
  pageId: 'superapp',
  projectTitle: 'Telecom Brand',
  platform: 'Super App · GCC Strategy',
  role: 'Strategic UX Architect · Market Research · Brand Positioning',
  year: '2024',
  tags: ['Super App', 'Telecom', 'Qatar', 'GCC Strategy', 'Product Strategy'],
  accentColor: '#dc2626',
  accentBg: '#fef2f2',
  overview:
    'A telecom brand asked whether to add digital services. We reframed it: could they become the connective tissue of daily digital life in Qatar? A zero-to-one engagement — from market research through to brand and product strategy.',
};

export const baguetteData: CaseStudyData = {
  id: 'baguette',
  pageId: 'cs-baguette',
  projectTitle: 'Baguette SA — Recruitment Intelligence Module',
  platform: 'Web SaaS · B2B',
  role: 'Lead UX Strategist & Architect',
  year: '2024',
  tags: ['React', 'SaaS', 'B2B', 'HR Tech', 'MENA'],
  accentColor: '#059669',
  accentBg: '#ecfdf5',
  overview: 'Baguette is a business super-app for SMEs across the UAE and GCC. I led UX strategy on its Recruitment Module — a zero-to-one engagement from research and information architecture through to high-fidelity UI.',
  challenge: 'HR managers at SMEs ran recruitment across 3–4 disconnected tools (LinkedIn, spreadsheets, email, WhatsApp) — causing data loss and zero visibility into the hiring funnel.',
  strategy: 'One role-aware dashboard consolidates posting, resume parsing, AI-ranking, scheduling and analytics — shaped by dual-persona research (an HR manager and a founder) and kept simple for non-technical operators.',
  techAlignment: "Component-first design on a stone/amber token system aligned to Baguette's brand, with annotated React handoff specs covering state mapping, permission-based visibility, and responsive breakpoints.",
  outcomes: [
    'Reduced average time-to-fill from 28 to 17 days in pilot testing',
    'Pipeline visibility increased candidate response rates by 34%',
    'Onboarding time for new HR users cut to under 15 minutes',
    'Two distinct user roles fully served from a single UI system',
  ],
  architectureCaption: 'End-to-end module flow from authentication through analytics, with role-based access bifurcation for HR Managers and Business Owners.',
  architectureElement: <BaguetteArchitecture />,
  screens: [
    { caption: 'Recruitment Dashboard — Real-time KPI cards, funnel analytics, and candidate activity feed in a single viewport.', element: <div style={{ padding: 12, height: '100%' }}><BaguetteDashboard /></div> },
    { caption: 'User Persona Board — Research artifact integrated into design sprints, anchoring all feature decisions to validated user needs.', element: <div style={{ padding: 12, height: '100%' }}><BaguettePersona /></div> },
    { caption: 'Job Listings Manager — Tabbed filter system with status indicators and quick-action rows for efficient multi-posting management.', element: <div style={{ padding: 12, height: '100%' }}><BaguetteJobListings /></div> },
  ],
};

export const totersData: CaseStudyData = {
  id: 'toters',
  pageId: 'cs-toters',
  projectTitle: 'Toters — On-Demand Delivery App',
  platform: 'Mobile · iOS & Android',
  role: 'UX Architect',
  year: '2024',
  tags: ['Mobile', 'Delivery', 'Logistics', 'Lebanon', 'MENA', 'Multi-flow'],
  accentColor: '#16A34A',
  accentBg: '#f0fdf4',
  overview: 'Toters is an on-demand delivery platform across Lebanon and MENA. I designed the full order-creation experience — service selection through a 4-step flow covering pickup, items, dropoff and pricing.',
  challenge: 'Two very different tasks — package delivery and grocery shopping — shared one entry point with no guidance, driving high abandonment, wrong-flow errors and repeat support requests.',
  strategy: 'A service-selection gate ("What do you need?") splits the flow at Step 0, before any data entry. A persistent step indicator and profile-prefilled fields cut friction for repeat orders.',
  techAlignment: 'Component-annotated handoff on Inter with precise sizing tokens (13.02–19.53px), documenting state transitions for saved-address selection, the package-size radio group, and the item list. Green (#16A34A) mapped as primary action colour with contrast-compliant specs.',
  outcomes: [
    'Task abandonment reduced by 38% after service-gate screen introduction',
    'Average order creation time dropped from 4.2 min to 2.6 min',
    'Support tickets for wrong-flow errors reduced by 61% post-launch',
    'Pre-fill from profile reduced average form inputs per session by 40%',
  ],
  architectureCaption: 'Two service-specific flows bifurcating from a shared service-selection entry point, both converging at a unified pricing and confirmation screen.',
  architectureElement: <TotersArchitecture />,
  screens: [
    { caption: 'Service Selection — A clear binary choice gate routes users into the correct multi-step flow before any form input, eliminating wrong-flow errors.', element: <div style={{ padding: 16, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: 280 }}><TotersServiceSelect /></div> },
    { caption: 'Pickup Address (Step 1) — Pre-filled profile data and saved address cards minimise input for repeat users ordering from familiar locations.', element: <div style={{ padding: 16, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: 280 }}><TotersPickupDetails /></div> },
    { caption: 'Item Details (Step 3) — Package size selector with incremental pricing and an add-items list with edit/delete actions for the Buy Something flow.', element: <div style={{ padding: 16, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: 280 }}><TotersItemDetails /></div> },
  ],
};

export const hrResearchData: CaseStudyData = {
  id: 'hr-research',
  pageId: 'cs-hr',
  projectTitle: 'HR Application — Market & Competitive Research',
  platform: 'Research Deliverable · SaaS Strategy',
  role: 'UX Strategist & Research Lead',
  year: '2024',
  tags: ['UX Research', 'Market Analysis', 'Competitive Audit', 'HR Tech', 'KSA', 'MENA'],
  accentColor: '#4f46e5',
  accentBg: '#eef2ff',
  overview: 'A confidential HR SaaS client engaged me for market and competitive research before a redesign — analysing international and Gulf HR apps and delivering a consolidated, KSA-compliant feature roadmap.',
  challenge: 'The client was about to invest in a major redesign without knowing where their product stood against Gulf-native and international competitors — risking rebuilding what they had while missing real gaps.',
  strategy: "A four-phase study: scan 8+ HR apps, extract common features (HR vs employee), map a competitive matrix, and deliver a prioritised feature set inclusive of KSA compliance (Nitaqat, GOSI, WPS, Saudization).",
  techAlignment: 'Research delivered as structured Figma boards for direct handoff to product and engineering. Recommendations were tagged by category and priority tier, mapping straight to sprint planning without further translation.',
  outcomes: [
    '8 HR applications systematically audited across international and Gulf markets',
    '4 critical feature gaps identified vs. top competitors (ATS, Analytics, LMS, Performance)',
    'KSA compliance module scoped as a market-differentiation opportunity',
    'Final feature roadmap adopted as the basis for the XName product redesign brief',
  ],
  architectureCaption: 'Four-phase research methodology from market scan through competitive gap analysis to final consolidated feature recommendations.',
  architectureElement: <HRResearchArchitecture />,
  screens: [
    { caption: 'Market Analysis Board — Structured audit of 8 international and Gulf HR apps, categorised by region and feature footprint.', element: <div style={{ padding: 12, height: '100%' }}><HRMarketAnalysis /></div> },
    { caption: 'Competitive Feature Matrix — XName mapped against three Gulf competitors, with gap rows (orange) surfacing critical missing capabilities.', element: <div style={{ padding: 12, height: '100%' }}><HRCompetitiveMatrix /></div> },
    { caption: 'Feature Consolidation Map — Final proposed feature set organised by HR Dept, Employee Self-Service, and KSA-Specific categories with new additions highlighted.', element: <div style={{ padding: 12, height: '100%' }}><HRFeatureMap /></div> },
  ],
};
