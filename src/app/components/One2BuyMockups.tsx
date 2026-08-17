/* ─────────────────────────────────────────────────────────
   One2Buy — Social Commerce Mobile App
   Pixel-faithful mini-UI recreations derived from the Figma
   JSX source (no screen captures exist for this project):
   Onboarding · Country/Language · Marketplace · Login · Product Detail.
   These are vector/DOM, so they stay crisp when zoomed.
   ───────────────────────────────────────────────────────── */

const R = '#ef4444';   // red-500 (brand accent)
const BK = '#000000';
const W = '#ffffff';
const S = '#f7f6f2';   // stone-50 bg

/* ── Phone frame wrapper ── */
function PhoneFrame({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div style={{
      width: '100%',
      maxWidth: 200,
      margin: '0 auto',
      background: dark ? '#1c1917' : S,
      borderRadius: 22,
      overflow: 'hidden',
      border: dark ? '2px solid #3f3f46' : '2px solid #e5e7eb',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 360,
      position: 'relative',
    }}>
      {/* Status bar */}
      <div style={{ height: 18, background: dark ? '#111' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', flexShrink: 0 }}>
        <span style={{ fontSize: 8, color: dark ? '#a1a1aa' : '#374151', fontWeight: 600 }}>9:41</span>
        <div style={{ display: 'flex', gap: 3 }}>
          {[6, 5, 4].map(w => <div key={w} style={{ width: w, height: 5, background: dark ? '#71717a' : '#374151', borderRadius: 1 }} />)}
        </div>
      </div>
      {children}
    </div>
  );
}

/* ── Product Detail View ── */
export function One2BuyProductDetail() {
  const tags = ['Cars', 'Electronics', 'Fashion', 'Home'];

  return (
    <PhoneFrame>
      {/* Product image area */}
      <div style={{ width: '100%', height: 90, background: '#e5e7eb', position: 'relative', flexShrink: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #f4f4f5 60%, #e4e4e7)' }} />
        <div style={{ position: 'absolute', top: 6, left: 8, background: R, borderRadius: '50%', width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 6, color: W }}>←</span>
        </div>
        <div style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 4 }}>
          {[true, false, false].map((a, i) => (
            <div key={i} style={{ width: a ? 14 : 5, height: 5, borderRadius: 3, background: a ? R : '#d1d5db' }} />
          ))}
        </div>
      </div>

      <div style={{ flex: 1, padding: '8px 10px', overflow: 'hidden' }}>
        {/* Price & title */}
        <div style={{ color: R, fontSize: 10, fontWeight: 800, marginBottom: 2 }}>AED 12,200</div>
        <div style={{ fontSize: 8.5, fontWeight: 800, color: '#1c1917', lineHeight: 1.3, marginBottom: 6 }}>Kia Seltos 2021 · Petrol · Jaipur</div>

        {/* Category tags */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 8, flexWrap: 'wrap' }}>
          {tags.map((t, i) => (
            <div key={t} style={{ padding: '2px 6px', borderRadius: 10, background: i === 0 ? R : '#f4f4f5', border: `1px solid ${i === 0 ? R : '#e5e7eb'}` }}>
              <span style={{ fontSize: 6.5, fontWeight: 600, color: i === 0 ? W : '#71717a' }}>{t}</span>
            </div>
          ))}
        </div>

        {/* Description */}
        <div style={{ fontSize: 7.5, color: '#374151', fontWeight: 600, marginBottom: 3 }}>Description</div>
        <div style={{ fontSize: 7, color: '#71717a', lineHeight: 1.5, marginBottom: 8 }}>
          Donec sed erat ut magna suscipit mattis. Aliquam erat volutpat. Morbi in orci risus in congue...
        </div>

        {/* You may also like */}
        <div style={{ fontSize: 7.5, fontWeight: 700, color: '#1c1917', marginBottom: 5 }}>You may also like</div>
        <div style={{ display: 'flex', gap: 5 }}>
          {[1, 2].map(i => (
            <div key={i} style={{ flex: 1, background: '#f4f4f5', borderRadius: 6, padding: 5 }}>
              <div style={{ height: 30, background: '#e5e7eb', borderRadius: 4, marginBottom: 4 }} />
              <div style={{ fontSize: 7, fontWeight: 700, color: '#1c1917' }}>Item {i}</div>
              <div style={{ fontSize: 6.5, color: R, fontWeight: 700 }}>AED 8,500</div>
            </div>
          ))}
        </div>
      </div>

      {/* Add to cart bar */}
      <div style={{ background: BK, padding: '8px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: 7, color: '#71717a' }}>Total</div>
          <div style={{ fontSize: 10, fontWeight: 800, color: W }}>AED 12,200</div>
        </div>
        <div style={{ background: R, borderRadius: 6, padding: '5px 12px' }}>
          <span style={{ fontSize: 8, fontWeight: 800, color: W }}>Chat to Buy</span>
        </div>
      </div>
    </PhoneFrame>
  );
}

/* ── Marketplace / Homepage browse ── */
export function One2BuyMarketplace() {
  const cats = ['Cars', 'Watercraft', 'Motorcycles'];
  const items = [
    ['Range Rover SUV Auto', '2017 · Petrol', 'AED 18,800'],
    ['Suzuki Vitara', '2021 · Petrol', 'AED 3,800'],
    ['YAMAHA RX100', 'Japan Model', 'AED 2,200'],
  ];
  return (
    <PhoneFrame>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header + search */}
        <div style={{ padding: '10px 12px 8px' }}>
          <div style={{ fontSize: 12, fontWeight: 900, color: '#1c1917', marginBottom: 6 }}>Automotive</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f4f4f5', borderRadius: 20, padding: '6px 10px' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', border: '1.5px solid #a1a1aa' }} />
            <span style={{ fontSize: 8, color: '#a1a1aa' }}>Search cars, parts, plates…</span>
          </div>
        </div>

        {/* Category chips */}
        <div style={{ display: 'flex', gap: 6, padding: '0 12px 8px' }}>
          {cats.map((c, i) => (
            <div key={c} style={{ padding: '4px 10px', borderRadius: 14, background: i === 0 ? R : '#f4f4f5', border: `1px solid ${i === 0 ? R : '#e5e7eb'}` }}>
              <span style={{ fontSize: 7.5, fontWeight: 700, color: i === 0 ? W : '#71717a' }}>{c}</span>
            </div>
          ))}
        </div>

        {/* Listings */}
        <div style={{ flex: 1, padding: '0 12px', display: 'flex', flexDirection: 'column', gap: 7, overflow: 'hidden' }}>
          {items.map(([title, meta, price]) => (
            <div key={title} style={{ display: 'flex', gap: 8, background: W, border: '1px solid #e5e7eb', borderRadius: 10, padding: 6 }}>
              <div style={{ width: 42, height: 42, borderRadius: 8, background: 'linear-gradient(135deg,#f4f4f5,#e4e4e7)', flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 8.5, fontWeight: 800, color: '#1c1917', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</div>
                <div style={{ fontSize: 7, color: '#71717a', marginBottom: 3 }}>{meta}</div>
                <div style={{ fontSize: 8.5, fontWeight: 800, color: R }}>{price}</div>
              </div>
              <div style={{ width: 16, height: 16, borderRadius: '50%', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 8, color: R }}>♥</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom nav */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', borderTop: '1px solid #e5e7eb', padding: '7px 0', flexShrink: 0 }}>
          {['Home', 'Categories', '', 'Favorites', 'Profile'].map((l, i) => (
            i === 2
              ? <div key="sell" style={{ width: 26, height: 26, borderRadius: '50%', background: R, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: -14, boxShadow: '0 2px 8px rgba(239,68,68,0.4)' }}><span style={{ fontSize: 12, color: W, fontWeight: 700 }}>+</span></div>
              : <span key={l} style={{ fontSize: 7, fontWeight: i === 0 ? 800 : 500, color: i === 0 ? R : '#a1a1aa' }}>{l}</span>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

/* ── Seller Shop / Storefront — the "your shop" half of the value prop ── */
export function One2BuyShop() {
  const items = [
    ['Vespa SXL 150', 'AED 50,200'], ['Samsung Z Fold4', 'AED 22,200'],
    ['MG Astor SUV', 'AED 4,200'], ['iPhone 14 Pro', 'AED 3,600'],
  ];
  return (
    <PhoneFrame>
      {/* Shop cover + identity */}
      <div style={{ height: 44, background: 'linear-gradient(135deg,#1c1917,#ef4444)', position: 'relative', flexShrink: 0 }} />
      <div style={{ padding: '0 12px', marginTop: -16, position: 'relative', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: W, border: `2px solid ${R}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 900, color: R }}>A</span>
          </div>
          <div style={{ flex: 1, paddingBottom: 2 }}>
            <div style={{ fontSize: 10, fontWeight: 900, color: '#1c1917' }}>Alaa’s Auto Store</div>
            <div style={{ fontSize: 7, color: '#78716c' }}>Alaa Saad · Joined July 2020</div>
          </div>
          <div style={{ background: R, borderRadius: 14, padding: '4px 12px' }}>
            <span style={{ fontSize: 8, fontWeight: 800, color: W }}>Follow</span>
          </div>
        </div>
        {/* Shop stats */}
        <div style={{ display: 'flex', gap: 14, margin: '8px 0 6px' }}>
          {[['128', 'Listings'], ['1.2k', 'Followers'], ['4.9★', 'Rating']].map(([n, l]) => (
            <div key={l}><span style={{ fontSize: 9, fontWeight: 800, color: '#1c1917' }}>{n}</span> <span style={{ fontSize: 7, color: '#71717a' }}>{l}</span></div>
          ))}
        </div>
      </div>

      {/* Shop listings grid */}
      <div style={{ flex: 1, padding: '4px 12px 12px', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {items.map(([title, price]) => (
            <div key={title} style={{ background: W, border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ height: 34, background: 'linear-gradient(135deg,#f4f4f5,#e4e4e7)' }} />
              <div style={{ padding: '4px 6px' }}>
                <div style={{ fontSize: 7.5, fontWeight: 700, color: '#1c1917', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</div>
                <div style={{ fontSize: 8, fontWeight: 800, color: R }}>{price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

/* ── Create Ad / Sell — turning any buyer into a seller ── */
export function One2BuyCreateAd() {
  return (
    <PhoneFrame>
      <div style={{ flex: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 11, fontWeight: 900, color: '#1c1917', marginBottom: 10 }}>Post Your Ad</div>

        {/* Photo upload */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: 8, border: `1.5px dashed ${R}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: R, fontSize: 16, flexShrink: 0 }}>+</div>
          {[0, 1].map(i => <div key={i} style={{ width: 40, height: 40, borderRadius: 8, background: 'linear-gradient(135deg,#f4f4f5,#e4e4e7)', flexShrink: 0 }} />)}
        </div>

        {/* Fields */}
        {[['Title', 'Vespa SXL 150 Scooter'], ['Category', 'Motorcycles ▾'], ['Price (AED)', '50,200']].map(([label, val], i) => (
          <div key={label} style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 7.5, fontWeight: 700, color: '#71717a', marginBottom: 3 }}>{label}</div>
            <div style={{ background: '#f4f4f5', border: '1px solid #e5e7eb', borderRadius: 8, padding: '7px 10px' }}>
              <span style={{ fontSize: 8.5, fontWeight: i === 2 ? 800 : 500, color: i === 2 ? R : '#1c1917' }}>{val}</span>
            </div>
          </div>
        ))}

        {/* Description */}
        <div style={{ fontSize: 7.5, fontWeight: 700, color: '#71717a', marginBottom: 3 }}>Description</div>
        <div style={{ background: '#f4f4f5', border: '1px solid #e5e7eb', borderRadius: 8, padding: '7px 10px', flex: 1, minHeight: 30 }}>
          <span style={{ fontSize: 8, color: '#a1a1aa' }}>Exudes style · (ABS) · 150CC…</span>
        </div>

        <div style={{ marginTop: 10, background: R, borderRadius: 30, padding: '10px 0', textAlign: 'center' }}>
          <span style={{ fontSize: 9, fontWeight: 800, color: W }}>Post Ad</span>
        </div>
      </div>
    </PhoneFrame>
  );
}

/* ── Chat to Buy — the peer-to-peer trust moment ── */
export function One2BuyChat() {
  const msgs = [
    { me: false, t: 'Hi! Is the Vespa still available?' },
    { me: true, t: 'Yes it is — barely used, ABS, 150CC.' },
    { me: false, t: 'Can we meet to see it this weekend?' },
    { me: true, t: 'Sure, Saturday works. I’ll share the location.' },
  ];
  return (
    <PhoneFrame>
      {/* Chat header — the item being discussed */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderBottom: '1px solid #e5e7eb', flexShrink: 0 }}>
        <div style={{ width: 26, height: 26, borderRadius: 6, background: 'linear-gradient(135deg,#f4f4f5,#e4e4e7)', flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 8.5, fontWeight: 800, color: '#1c1917' }}>Vespa SXL 150 Scooter</div>
          <div style={{ fontSize: 8, fontWeight: 800, color: R }}>AED 50,200</div>
        </div>
        <span style={{ fontSize: 7, color: '#71717a' }}>Alaa Saad</span>
      </div>

      {/* Safety tip banner (from source) */}
      <div style={{ background: '#fef2f2', borderBottom: `1px solid ${R}22`, padding: '5px 12px', flexShrink: 0 }}>
        <span style={{ fontSize: 7, fontWeight: 700, color: R }}>🛡 Tips: meet in person · check the item · don’t wire money online</span>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 6, overflow: 'hidden' }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ alignSelf: m.me ? 'flex-end' : 'flex-start', maxWidth: '78%', background: m.me ? R : '#f4f4f5', borderRadius: 10, padding: '6px 9px' }}>
            <span style={{ fontSize: 8, color: m.me ? W : '#1c1917', lineHeight: 1.4 }}>{m.t}</span>
          </div>
        ))}
      </div>

      {/* Composer */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 10px', borderTop: '1px solid #e5e7eb', flexShrink: 0 }}>
        <div style={{ flex: 1, background: '#f4f4f5', borderRadius: 20, padding: '6px 10px' }}>
          <span style={{ fontSize: 8, color: '#a1a1aa' }}>Message…</span>
        </div>
        <div style={{ width: 24, height: 24, borderRadius: '50%', background: R, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 10, color: W }}>➤</span>
        </div>
      </div>
    </PhoneFrame>
  );
}
