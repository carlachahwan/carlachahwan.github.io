/* ─────────────────────────────────────────────────────────
   Wireframe mockups — Quick Pay, KSC, WASM.

   These projects shipped as Figma "copy-as-code" exports rather than image
   captures, so their screens are recreated here as low-fidelity wireframes.
   That's deliberate: these are wireframe projects, so a blueprint treatment is
   the honest representation of the work — structure and hierarchy, not visual
   design. Content (labels, steps, priorities) is taken from the actual sources.
   ───────────────────────────────────────────────────────── */

const INK = '#3f3f46';      // primary wireframe line / text
const MUTE = '#a1a1aa';     // secondary line / placeholder text
const FILL = '#e4e4e7';     // block fill
const SOFT = '#f4f4f5';     // panel fill
const PAPER = '#ffffff';
const MARK = '#4AE5BD';     // mint green — reserved for the one thing that matters

/* ── Frames ── */
function Phone({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      width: '100%', maxWidth: 168, margin: '0 auto', background: PAPER,
      borderRadius: 16, overflow: 'hidden', border: `1.5px solid ${INK}`,
      display: 'flex', flexDirection: 'column', minHeight: 300, position: 'relative',
    }}>
      <div style={{ height: 14, borderBottom: `1px solid ${FILL}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 9px', flexShrink: 0 }}>
        <span style={{ fontSize: 5.5, color: MUTE, fontWeight: 700 }}>9:41</span>
        <div style={{ display: 'flex', gap: 2 }}>
          {[4, 3, 3].map((w, i) => <div key={i} style={{ width: w, height: 3.5, background: MUTE, borderRadius: 1 }} />)}
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>{children}</div>
    </div>
  );
}

function Browser({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      width: '100%', background: PAPER, borderRadius: 10, overflow: 'hidden',
      border: `1.5px solid ${INK}`, display: 'flex', flexDirection: 'column', minHeight: 260,
    }}>
      <div style={{ height: 16, background: SOFT, borderBottom: `1px solid ${FILL}`, display: 'flex', alignItems: 'center', gap: 3, padding: '0 8px', flexShrink: 0 }}>
        {[0, 1, 2].map(i => <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: MUTE }} />)}
        <div style={{ flex: 1, height: 7, background: FILL, borderRadius: 3, marginLeft: 6 }} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>{children}</div>
    </div>
  );
}

function Tablet({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      width: '100%', background: PAPER, borderRadius: 12, overflow: 'hidden',
      border: `1.5px solid ${INK}`, display: 'flex', flexDirection: 'column', minHeight: 260,
    }}>
      <div style={{ height: 12, borderBottom: `1px solid ${FILL}`, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 8px', gap: 2, flexShrink: 0 }}>
        {[4, 3, 3].map((w, i) => <div key={i} style={{ width: w, height: 3, background: MUTE, borderRadius: 1 }} />)}
      </div>
      <div style={{ flex: 1, display: 'flex' }}>{children}</div>
    </div>
  );
}

/* ── Wireframe atoms ── */
const Line = ({ w = '100%', h = 4, mb = 4 }: { w?: number | string; h?: number; mb?: number }) =>
  <div style={{ width: w, height: h, background: FILL, borderRadius: 2, marginBottom: mb }} />;

const Label = ({ children, size = 6.5, color = INK, weight = 700, mb = 4 }: any) =>
  <div style={{ fontSize: size, color, fontWeight: weight, marginBottom: mb, letterSpacing: '0.02em' }}>{children}</div>;

const Box = ({ h = 30, label, mb = 5 }: { h?: number; label?: string; mb?: number }) => (
  <div style={{ height: h, background: SOFT, border: `1px dashed ${MUTE}`, borderRadius: 3, marginBottom: mb, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    {label && <span style={{ fontSize: 5.5, color: MUTE, fontWeight: 600 }}>{label}</span>}
  </div>
);

const Btn = ({ children, solid, mb = 5 }: { children: React.ReactNode; solid?: boolean; mb?: number }) => (
  <div style={{
    padding: '6px 0', textAlign: 'center', borderRadius: 3, marginBottom: mb,
    background: solid ? MARK : 'transparent', border: solid ? 'none' : `1px solid ${INK}`,
  }}>
    <span style={{ fontSize: 6, fontWeight: 800, color: solid ? '#fff' : INK }}>{children}</span>
  </div>
);

/* ═══════════════ QUICK PAY ═══════════════ */

export function QuickPayLanding() {
  return (
    <Browser>
      <div style={{ padding: 10, flex: 1 }}>
        {/* Nav */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, paddingBottom: 6, borderBottom: `1px solid ${FILL}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 14, height: 8, background: INK, borderRadius: 2 }} />
            <span style={{ fontSize: 4.5, color: MUTE, fontWeight: 700 }}>Powered by SNB</span>
          </div>
          <div style={{ display: 'flex', gap: 5 }}>{[10, 10, 10].map((w, i) => <div key={i} style={{ width: w, height: 3, background: FILL, borderRadius: 1 }} />)}</div>
        </div>

        {/* Hero */}
        <Label size={8}>Transfer to the world within seconds</Label>
        <Line w="70%" h={3} />
        <Line w="52%" h={3} mb={8} />
        <div style={{ display: 'flex', gap: 5, marginBottom: 10 }}>
          <div style={{ flex: 1 }}><Btn solid mb={0}>Download the App</Btn></div>
          <div style={{ flex: 1 }}><Btn mb={0}>Learn More</Btn></div>
        </div>

        {/* Exchange rate converter — the first question a customer asks */}
        <div style={{ border: `1.5px solid ${MARK}`, borderRadius: 4, padding: 7, background: '#fffaf3' }}>
          <Label size={5.5} color={MARK}>EXCHANGE RATE</Label>
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <div style={{ flex: 1, border: `1px solid ${MUTE}`, borderRadius: 2, padding: '4px 5px' }}>
              <span style={{ fontSize: 6, color: INK, fontWeight: 700 }}>SAR</span>
            </div>
            <span style={{ fontSize: 7, color: MUTE }}>⇄</span>
            <div style={{ flex: 1, border: `1px solid ${MUTE}`, borderRadius: 2, padding: '4px 5px' }}>
              <span style={{ fontSize: 6, color: INK, fontWeight: 700 }}>USD</span>
            </div>
          </div>
          <div style={{ fontSize: 5, color: MUTE, marginTop: 4 }}>Rate: 1 USD = 0.27 SAR</div>
        </div>

        {/* Language strip */}
        <div style={{ marginTop: 8, display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          {['العربية', 'বাংলা', 'हिन्दी', 'اردو', 'Tagalog', '+4'].map(l => (
            <span key={l} style={{ fontSize: 4.5, color: MUTE, border: `1px solid ${FILL}`, borderRadius: 6, padding: '2px 4px' }}>{l}</span>
          ))}
        </div>
      </div>
    </Browser>
  );
}

export function QuickPayOnboarding() {
  const steps = [
    { n: '1', t: 'Enter ID and approve thru NAFATH' },
    { n: '2', t: 'Enter personal details' },
    { n: '3', t: 'Start transferring' },
  ];
  return (
    <Phone>
      <div style={{ padding: 10, flex: 1 }}>
        <Label size={7.5}>How It Works</Label>
        <Line w="80%" h={3} mb={9} />
        {steps.map((s, i) => (
          <div key={s.n} style={{ marginBottom: 8 }}>
            <div style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
              <div style={{
                width: 12, height: 12, borderRadius: '50%', flexShrink: 0,
                background: i === 0 ? MARK : 'transparent', border: i === 0 ? 'none' : `1px solid ${INK}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: 5.5, fontWeight: 800, color: i === 0 ? '#fff' : INK }}>{s.n}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 6, color: INK, fontWeight: 700, lineHeight: 1.4 }}>{s.t}</div>
                <Line w="60%" h={2.5} mb={0} />
              </div>
            </div>
            {i < steps.length - 1 && <div style={{ width: 1, height: 8, background: FILL, marginLeft: 6 }} />}
          </div>
        ))}
        <Box h={26} label="ID Number / Iqama" />
        <Btn solid>Continue with NAFATH</Btn>
        <div style={{ fontSize: 4.5, color: MUTE, textAlign: 'center', lineHeight: 1.5 }}>No Absher device authentication required</div>
      </div>
    </Phone>
  );
}

export function QuickPayServices() {
  const svc = ['Effortless Account Opening', 'Multilingual Experience', 'All in One Financial Services', 'Global Money Transfers', '90 Day Grace Period', 'No Absher Required'];
  return (
    <Browser>
      <div style={{ padding: 10, flex: 1 }}>
        <Label size={7.5}>Our Services</Label>
        <Line w="55%" h={3} mb={8} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
          {svc.map((s, i) => (
            <div key={s} style={{ border: `1px solid ${i === 3 ? MARK : FILL}`, borderRadius: 3, padding: 6 }}>
              <div style={{ width: 9, height: 9, borderRadius: 2, background: i === 3 ? MARK : FILL, marginBottom: 4 }} />
              <div style={{ fontSize: 5.5, color: INK, fontWeight: 700, lineHeight: 1.35, marginBottom: 3 }}>{s}</div>
              <Line w="90%" h={2} mb={2} />
              <Line w="70%" h={2} mb={0} />
            </div>
          ))}
        </div>
        <div style={{ marginTop: 7, fontSize: 5, color: MUTE, textAlign: 'center' }}>210+ countries via Western Union</div>
      </div>
    </Browser>
  );
}

/* ═══════════════ KSC ═══════════════ */

const KSC_NAV = ['Home', 'The City', 'Master Plan', 'Districts', 'Properties', 'News & Events'];

function KscHeader() {
  return (
    <div style={{ padding: '7px 9px', borderBottom: `1px solid ${FILL}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ width: 16, height: 8, background: INK, borderRadius: 1 }} />
      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        {KSC_NAV.map(n => <span key={n} style={{ fontSize: 4, color: MUTE, fontWeight: 600 }}>{n}</span>)}
        <span style={{ fontSize: 4, color: INK, fontWeight: 700, border: `1px solid ${FILL}`, borderRadius: 4, padding: '1px 3px' }}>العربية</span>
        <span style={{ fontSize: 4, color: '#fff', fontWeight: 800, background: MARK, borderRadius: 2, padding: '2px 4px' }}>Register your Interest</span>
      </div>
    </div>
  );
}

export function KscHome() {
  return (
    <Browser>
      <KscHeader />
      <div style={{ padding: 9, flex: 1 }}>
        <Box h={54} label="Hero — the city" />
        <Label size={7}>A city designed to be lived in</Label>
        <Line w="76%" h={3} />
        <Line w="58%" h={3} mb={8} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
          {['Master Plan', 'Districts', 'Properties', 'Developer'].map(t => (
            <div key={t} style={{ border: `1px solid ${FILL}`, borderRadius: 3, padding: 4 }}>
              <div style={{ height: 14, background: SOFT, borderRadius: 2, marginBottom: 3 }} />
              <div style={{ fontSize: 4.5, color: INK, fontWeight: 700 }}>{t}</div>
            </div>
          ))}
        </div>
      </div>
    </Browser>
  );
}

export function KscNewsIndex() {
  return (
    <Browser>
      <KscHeader />
      <div style={{ padding: 9, flex: 1 }}>
        <Label size={7}>Latest News</Label>
        {/* Filter row */}
        <div style={{ display: 'flex', gap: 3, marginBottom: 7, alignItems: 'center' }}>
          <span style={{ fontSize: 4.5, color: MUTE, fontWeight: 700 }}>Filter By:</span>
          {['All', 'Press Release', 'Industry', 'Events'].map((f, i) => (
            <span key={f} style={{
              fontSize: 4.5, fontWeight: 700, borderRadius: 6, padding: '2px 5px',
              background: i === 0 ? MARK : 'transparent', color: i === 0 ? '#fff' : MUTE,
              border: i === 0 ? 'none' : `1px solid ${FILL}`,
            }}>{f}</span>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 5 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ border: `1px solid ${FILL}`, borderRadius: 3, padding: 5 }}>
              <div style={{ height: 20, background: SOFT, borderRadius: 2, marginBottom: 4 }} />
              <div style={{ fontSize: 4, color: MUTE, marginBottom: 2 }}>October 26, 2024</div>
              <div style={{ fontSize: 5, color: INK, fontWeight: 700, lineHeight: 1.35, marginBottom: 3 }}>Khalid Bin Sultan City Unveils Ambitious Green Initiative</div>
              <span style={{ fontSize: 4.5, color: MARK, fontWeight: 800 }}>Read More →</span>
            </div>
          ))}
        </div>
        {/* Newsletter — converts interest into a relationship */}
        <div style={{ marginTop: 8, border: `1px dashed ${MARK}`, borderRadius: 3, padding: 6, display: 'flex', gap: 5, alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 5, color: INK, fontWeight: 700 }}>Stay updated on KSC's latest developments</div>
          </div>
          <div style={{ width: 40, height: 9, border: `1px solid ${MUTE}`, borderRadius: 2 }} />
          <div style={{ background: MARK, borderRadius: 2, padding: '3px 5px' }}>
            <span style={{ fontSize: 4.5, color: '#fff', fontWeight: 800 }}>Subscribe</span>
          </div>
        </div>
      </div>
    </Browser>
  );
}

export function KscArticle() {
  return (
    <Browser>
      <KscHeader />
      <div style={{ padding: 9, flex: 1 }}>
        <div style={{ fontSize: 4.5, color: MARK, fontWeight: 700, marginBottom: 4 }}>&lt; Back to News &amp; Events</div>
        <Label size={7}>Designing Greener Cities: The Future of Urban Living</Label>
        <div style={{ fontSize: 4.5, color: MUTE, marginBottom: 6 }}>May 15, 2024 · 12 min read</div>
        <Box h={34} label="Article image" />
        {[95, 100, 88, 100, 72].map((w, i) => <Line key={i} w={`${w}%`} h={2.5} />)}
        <div style={{ height: 5 }} />
        <Label size={5.5}>Innovative Solutions for Green Infrastructure</Label>
        {[100, 92, 60].map((w, i) => <Line key={i} w={`${w}%`} h={2.5} />)}
        {/* Related — keeps the visitor in the proof loop */}
        <div style={{ marginTop: 7, borderTop: `1px solid ${FILL}`, paddingTop: 6 }}>
          <Label size={5}>Related Articles</Label>
          <div style={{ display: 'flex', gap: 4 }}>
            {[0, 1].map(i => (
              <div key={i} style={{ flex: 1, border: `1px solid ${FILL}`, borderRadius: 2, padding: 4 }}>
                <div style={{ height: 10, background: SOFT, borderRadius: 2, marginBottom: 2 }} />
                <Line w="90%" h={2} mb={0} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Browser>
  );
}

/* ═══════════════ WASM ═══════════════ */

export function WasmSignIn() {
  return (
    <Phone>
      <div style={{ padding: 11, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ width: 20, height: 10, background: INK, borderRadius: 2, margin: '0 auto 10px' }} />
        <Label size={7}>Welcome Mohammed!</Label>
        <div style={{ fontSize: 5.5, color: MUTE, marginBottom: 8, lineHeight: 1.5 }}>Please sign in with Nafath. To log in with Nafath, you need to be registered on Qiwa.</div>
        <Label size={5} color={MUTE} weight={600}>ENTER YOUR NATIONAL ID / IQAMA</Label>
        <Box h={22} label="ID Number / Iqama" />
        <div style={{ fontSize: 4.5, color: MUTE, marginBottom: 8, lineHeight: 1.5 }}>You will be authenticated through your Nafath mobile app.</div>
        <Btn solid>Continue with Nafath</Btn>
        {/* Waiting state — explained, not left to spin */}
        <div style={{ border: `1px dashed ${MARK}`, borderRadius: 3, padding: 6, marginTop: 4 }}>
          <div style={{ fontSize: 5, color: INK, fontWeight: 700, marginBottom: 3 }}>Waiting for Nafath</div>
          <div style={{ fontSize: 4.5, color: MUTE, lineHeight: 1.4, marginBottom: 4 }}>Open the Nafath app and select the number below:</div>
          <div style={{ width: 20, height: 14, border: `1.5px solid ${MARK}`, borderRadius: 2, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 7, fontWeight: 800, color: MARK }}>42</span>
          </div>
        </div>
        <div style={{ marginTop: 'auto', fontSize: 4, color: MUTE, textAlign: 'center' }}>By signing in, you agree to our Terms of Service</div>
      </div>
    </Phone>
  );
}

export function WasmDocuments() {
  const docs = [
    { id: 'ID# - Test 001', p: 'Very Urgent', hot: true },
    { id: 'ID# - Test 002', p: 'Urgent', hot: true },
    { id: 'ID# - Test 003', p: 'Normal', hot: false },
    { id: 'ID# - Test 004', p: 'Instant', hot: false },
  ];
  return (
    <Phone>
      <div style={{ padding: 9, flex: 1 }}>
        <Label size={7}>Documents</Label>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 5, marginBottom: 6, borderBottom: `1px solid ${FILL}` }}>
          <div style={{ paddingBottom: 3, borderBottom: `1.5px solid ${MARK}` }}>
            <span style={{ fontSize: 5.5, color: MARK, fontWeight: 800 }}>Pending</span>
          </div>
          <span style={{ fontSize: 5.5, color: MUTE, fontWeight: 600 }}>Completed</span>
        </div>
        {/* Search + filter */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 6 }}>
          <div style={{ flex: 1, height: 12, border: `1px solid ${FILL}`, borderRadius: 2, display: 'flex', alignItems: 'center', paddingLeft: 4 }}>
            <span style={{ fontSize: 4.5, color: MUTE }}>Search Documents…</span>
          </div>
          <div style={{ width: 20, height: 12, border: `1px solid ${INK}`, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 4.5, color: INK, fontWeight: 700 }}>Filter</span>
          </div>
        </div>
        {/* Queue — priority is explicit */}
        {docs.map(d => (
          <div key={d.id} style={{ border: `1px solid ${FILL}`, borderRadius: 3, padding: 5, marginBottom: 4 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
              <span style={{ fontSize: 5, color: INK, fontWeight: 700 }}>{d.id}</span>
              <span style={{
                fontSize: 4, fontWeight: 800, borderRadius: 5, padding: '1px 4px',
                background: d.hot ? MARK : 'transparent', color: d.hot ? '#fff' : MUTE,
                border: d.hot ? 'none' : `1px solid ${FILL}`,
              }}>{d.p}</span>
            </div>
            <Line w="88%" h={2} />
            <div style={{ fontSize: 4, color: MUTE, marginTop: 2 }}>Logistics · September 8, 2025</div>
          </div>
        ))}
      </div>
    </Phone>
  );
}

export function WasmSigning() {
  return (
    <Tablet>
      {/* Left: page list */}
      <div style={{ width: '34%', borderRight: `1px solid ${FILL}`, padding: 8, background: SOFT }}>
        <Label size={5.5}>Sign Document</Label>
        <div style={{ fontSize: 4.5, color: MUTE, marginBottom: 6, lineHeight: 1.4 }}>Draw your signature on each of the below pages</div>
        {['Page 1', 'Page 2', 'Page 3', 'Page 4'].map((p, i) => (
          <div key={p} style={{
            border: `1px solid ${i === 0 ? MARK : FILL}`, background: PAPER,
            borderRadius: 2, padding: 4, marginBottom: 3,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 4.5, color: INK, fontWeight: 700 }}>{p}</span>
              {i === 0
                ? <span style={{ fontSize: 4, color: MARK, fontWeight: 800 }}>Sign this page</span>
                : <div style={{ width: 5, height: 5, borderRadius: '50%', border: `1px solid ${MUTE}` }} />}
            </div>
          </div>
        ))}
      </div>
      {/* Right: preview + actions */}
      <div style={{ flex: 1, padding: 8, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <Label size={5.5} mb={0}>Test 001</Label>
          <span style={{ fontSize: 4.5, color: MUTE }}>Page 1 of 3</span>
        </div>
        <Box h={62} label="Document Preview" />
        <div style={{ border: `1px dashed ${MARK}`, borderRadius: 3, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 5 }}>
          <span style={{ fontSize: 5, color: MARK, fontWeight: 700 }}>Draw your signature</span>
        </div>
        <div style={{ display: 'flex', gap: 5 }}>
          <div style={{ flex: 1 }}><Btn solid mb={0}>Sign</Btn></div>
          <div style={{ flex: 1 }}><Btn mb={0}>Reject</Btn></div>
        </div>
        <div style={{ fontSize: 4, color: MUTE, marginTop: 4, textAlign: 'center' }}>Rejection requires a comment · 0 / 500 characters</div>
      </div>
    </Tablet>
  );
}
