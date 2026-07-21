/* ─────────────────────────────────────────────────────────
   Toters — On-Demand Delivery App (Lebanon / MENA)
   Three pixel-faithful mini-UI recreations derived from the
   Figma JSX source: Service Selection, Pickup Details, Item List
   ───────────────────────────────────────────────────────── */

const GR = '#16A34A';   // green-600 (brand CTA)
const BK = '#0A0A0A';
const W  = '#ffffff';
const GY = '#F3F4F6';
const TX = '#4B5563';

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      width: '100%',
      maxWidth: 190,
      margin: '0 auto',
      background: W,
      borderRadius: 20,
      overflow: 'hidden',
      border: '2px solid #E5E7EB',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 300,
      position: 'relative',
      boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    }}>
      {/* Status bar */}
      <div style={{ height: 16, background: W, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', flexShrink: 0, borderBottom: '1px solid #F3F4F6' }}>
        <span style={{ fontSize: 6.5, color: BK, fontWeight: 600 }}>9:41</span>
        <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          <div style={{ width: 10, height: 5, borderRadius: 1, background: GR, border: '1px solid #d1d5db' }}>
            <div style={{ width: '70%', height: '100%', background: GR, borderRadius: 1 }} />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

/* ── Step indicator ── */
function StepDots({ current, total = 4 }: { current: number; total?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, padding: '8px 0' }}>
      {Array.from({ length: total }).map((_, i) => {
        const done = i < current - 1;
        const active = i === current - 1;
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: 18, height: 18, borderRadius: '50%',
              background: done ? GR : active ? BK : '#D1D5DB',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 7, color: W, fontWeight: 700 }}>
                {done ? '✓' : i + 1}
              </span>
            </div>
            {i < total - 1 && (
              <div style={{ width: 12, height: 2, background: done ? GR : '#D1D5DB', margin: '0 1px' }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── SCREEN 1: Service Selection ("What do you need?") ── */
export function TotersServiceSelect() {
  return (
    <PhoneFrame>
      <div style={{ flex: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* Heading */}
        <div style={{ marginBottom: 2 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: BK, lineHeight: 1.2, marginBottom: 2 }}>What do you need?</div>
          <div style={{ fontSize: 8, color: TX }}>Choose the service you need today</div>
        </div>

        {/* Warning note */}
        <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 6, padding: '6px 8px' }}>
          <div style={{ fontSize: 7, fontWeight: 700, color: '#92400E', marginBottom: 2 }}>Note</div>
          <div style={{ fontSize: 6.5, color: '#B45309', lineHeight: 1.5 }}>
            We deliver anything that fits on a motorbike. Larger vehicles incur an extra charge.
          </div>
        </div>

        {/* Deliver Something — SELECTED */}
        <div style={{ border: `2px solid ${BK}`, borderRadius: 8, padding: '10px 10px', display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(0,0,0,0.02)' }}>
          <div style={{ width: 42, height: 42, background: 'rgba(0,0,0,0.12)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <div style={{ fontSize: 18 }}>📦</div>
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, color: BK, marginBottom: 2 }}>Deliver Something</div>
            <div style={{ fontSize: 7.5, color: TX, fontWeight: 500, marginBottom: 2 }}>Send a package or document</div>
            <div style={{ fontSize: 6.5, color: '#9CA3AF', fontStyle: 'italic' }}>Perfect for documents, gifts, or packages</div>
          </div>
        </div>

        {/* Buy Something — inactive */}
        <div style={{ border: '2px solid #D1D5DB', borderRadius: 8, padding: '10px 10px', display: 'flex', alignItems: 'center', gap: 10, opacity: 0.7 }}>
          <div style={{ width: 42, height: 42, background: GY, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <div style={{ fontSize: 18 }}>🛒</div>
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, color: BK, marginBottom: 2 }}>Buy Something</div>
            <div style={{ fontSize: 7.5, color: TX, fontWeight: 500, marginBottom: 2 }}>Purchase items and get them delivered</div>
            <div style={{ fontSize: 6.5, color: '#9CA3AF', fontStyle: 'italic' }}>We'll shop for you and deliver to your door</div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{ background: GR, padding: '10px 14px', flexShrink: 0 }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: W, textAlign: 'center' }}>Continue</div>
      </div>
    </PhoneFrame>
  );
}

/* ── SCREEN 2: Pickup Details (Step 1 of 4) ── */
export function TotersPickupDetails() {
  return (
    <PhoneFrame>
      <StepDots current={1} />
      <div style={{ flex: 1, padding: '4px 14px 10px', display: 'flex', flexDirection: 'column', gap: 9, overflowY: 'hidden' }}>

        {/* Section header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 6, borderBottom: '1px solid #E5E7EB' }}>
          <div style={{ width: 24, height: 24, border: '1px solid #E5E7EB', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>📍</div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: BK }}>Pickup Details</div>
            <div style={{ fontSize: 7, color: TX }}>Where should we collect the package?</div>
          </div>
        </div>

        {/* Address search */}
        <div>
          <div style={{ fontSize: 8.5, fontWeight: 700, color: BK, marginBottom: 4 }}>Pickup Address</div>
          <div style={{ background: GY, borderRadius: 6, border: '1px solid #E5E7EB', padding: '7px 10px', fontSize: 7.5, color: '#9CA3AF', marginBottom: 4 }}>
            🔍  Start typing address...
          </div>
          {/* Suggestions */}
          <div style={{ background: W, border: '1px solid #E5E7EB', borderRadius: 6, overflow: 'hidden' }}>
            {['123 Main Street, Down Town, Beirut', '456 Market Street, Kaslik, Jounieh'].map((addr, i) => (
              <div key={i} style={{ padding: '5px 8px', fontSize: 7, color: BK, borderBottom: i === 0 ? '1px solid #F3F4F6' : 'none', display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ color: TX }}>📍</span> {addr}
              </div>
            ))}
          </div>
        </div>

        {/* Saved addresses */}
        <div>
          <div style={{ fontSize: 8.5, fontWeight: 700, color: BK, marginBottom: 5 }}>Or choose from saved</div>
          {/* Home — selected */}
          <div style={{ border: `2px solid ${BK}`, borderRadius: 6, padding: '7px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4, background: 'rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 11 }}>🏠</span>
              <div>
                <div style={{ fontSize: 8, fontWeight: 600, color: BK }}>Home</div>
                <div style={{ fontSize: 6.5, color: TX }}>Saint Elias St, Sarba, Jounieh</div>
              </div>
            </div>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: BK }} />
          </div>
          {/* Work */}
          <div style={{ border: '1px solid #E5E7EB', borderRadius: 6, padding: '7px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 11 }}>🏢</span>
              <div>
                <div style={{ fontSize: 8, fontWeight: 600, color: BK }}>Work</div>
                <div style={{ fontSize: 6.5, color: TX }}>Mirna Chalouhi St, Zalka, Metn</div>
              </div>
            </div>
            <div style={{ width: 8, height: 8, borderRadius: '50%', border: '1.5px solid #D1D5DB' }} />
          </div>
        </div>

        {/* Contact */}
        <div>
          <div style={{ fontSize: 8.5, fontWeight: 700, color: BK, marginBottom: 4 }}>Contact Information</div>
          <div style={{ border: `1px solid ${BK}`, borderRadius: 6, padding: '6px 8px', background: 'rgba(0,0,0,0.06)', marginBottom: 4 }}>
            <div style={{ fontSize: 7.5, color: BK }}>👤  Carla Chahwan (You)</div>
            <div style={{ fontSize: 6.5, color: TX, marginTop: 1 }}>Pre-filled from your profile</div>
          </div>
          <div style={{ border: `1px solid ${BK}`, borderRadius: 6, padding: '6px 8px', background: 'rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 7.5, color: BK }}>📞  +961 71 xxx xxx</div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: GR, padding: '10px 14px', flexShrink: 0 }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: W, textAlign: 'center' }}>Continue to Dropoff</div>
      </div>
    </PhoneFrame>
  );
}

/* ── SCREEN 3: Buy Something — Item List (Step 2 of 4) ── */
export function TotersItemDetails() {
  const items = [
    { name: 'Milk', detail: 'Khoury · Light', qty: 1, price: '$3.99' },
    { name: 'Bread', detail: 'Rifai', qty: 2, price: '$4.50' },
    { name: 'Eggs', detail: 'Farm Fresh', qty: 1, price: '$2.99' },
  ];

  return (
    <PhoneFrame>
      <StepDots current={2} />
      <div style={{ flex: 1, padding: '4px 14px 10px', display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'hidden' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 6, borderBottom: '1px solid #E5E7EB' }}>
          <div style={{ width: 24, height: 24, border: '1px solid #E5E7EB', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>🛒</div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: BK }}>Item Details</div>
            <div style={{ fontSize: 7, color: TX }}>Add the items you want us to pick up for you</div>
          </div>
        </div>

        {/* Package size */}
        <div>
          <div style={{ fontSize: 8.5, fontWeight: 700, color: BK, marginBottom: 5 }}>Package Size</div>
          {[
            { label: 'Small', desc: 'Envelope, document, small box · Up to 12"×9"×2"', selected: true, extra: 'Base rate' },
            { label: 'Medium', desc: 'Shoebox, small appliance', selected: false, extra: '+$3' },
            { label: 'Large', desc: 'Large box, multiple items', selected: false, extra: '+$7' },
          ].map(({ label, desc, selected, extra }) => (
            <div key={label} style={{ border: selected ? `2px solid ${BK}` : '1px solid #E5E7EB', borderRadius: 6, padding: '6px 8px', marginBottom: 4, background: selected ? 'rgba(0,0,0,0.03)' : W, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: selected ? BK : 'transparent', border: selected ? 'none' : '1.5px solid #D1D5DB' }} />
                <div>
                  <div style={{ fontSize: 8, fontWeight: selected ? 700 : 400, color: BK }}>{label}</div>
                  <div style={{ fontSize: 6.5, color: TX }}>{desc}</div>
                </div>
              </div>
              <div style={{ background: selected ? '#E5E7EB' : 'transparent', border: selected ? 'none' : '1px solid #D1D5DB', borderRadius: 4, padding: '2px 5px', fontSize: 6.5, color: BK }}>{extra}</div>
            </div>
          ))}
        </div>

        {/* Items list */}
        <div style={{ background: W, border: '1px solid rgba(0,0,0,0.08)', borderRadius: 8, padding: '8px 10px' }}>
          <div style={{ fontSize: 8.5, fontWeight: 600, color: BK, marginBottom: 6 }}>Your Items ({items.length})</div>
          {items.map(({ name, detail, qty, price }, i) => (
            <div key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', borderBottom: i < items.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 28, height: 28, background: GY, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0 }}>🛍️</div>
                <div>
                  <div style={{ fontSize: 8, fontWeight: 600, color: BK }}>{name} <span style={{ color: '#9CA3AF', fontWeight: 400 }}>· {detail}</span></div>
                  <div style={{ fontSize: 7, color: TX }}>Qty: {qty} · Est. {price}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 3 }}>
                <div style={{ width: 18, height: 18, border: '1px solid #E5E7EB', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, color: TX }}>✏️</div>
                <div style={{ width: 18, height: 18, border: '1px solid #FEE2E2', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, color: '#DC2626' }}>🗑</div>
              </div>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5, paddingTop: 5, borderTop: '1px solid #E5E7EB' }}>
            <span style={{ fontSize: 8, color: BK, fontWeight: 600 }}>Estimated Total</span>
            <span style={{ fontSize: 8, color: BK, fontWeight: 700 }}>$11.48</span>
          </div>
          <div style={{ textAlign: 'center', marginTop: 6, fontSize: 7.5, color: GR, fontWeight: 600, textDecoration: 'underline' }}>+ Add Another Item</div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: GR, padding: '10px 14px', flexShrink: 0 }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: W, textAlign: 'center' }}>Continue to Pickup</div>
      </div>
    </PhoneFrame>
  );
}
