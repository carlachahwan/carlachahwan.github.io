/* ─────────────────────────────────────────────────────────
   One2Buy — Social Commerce Mobile App
   Three pixel-faithful mini-UI recreations derived from the
   Figma JSX source: Onboarding, Login, Product Detail
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
      maxWidth: 160,
      margin: '0 auto',
      background: dark ? '#1c1917' : S,
      borderRadius: 20,
      overflow: 'hidden',
      border: dark ? '2px solid #3f3f46' : '2px solid #e5e7eb',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 280,
      position: 'relative',
    }}>
      {/* Status bar */}
      <div style={{ height: 14, background: dark ? '#111' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px', flexShrink: 0 }}>
        <span style={{ fontSize: 6, color: dark ? '#a1a1aa' : '#374151', fontWeight: 600 }}>9:41</span>
        <div style={{ display: 'flex', gap: 3 }}>
          {[5, 4, 3].map(w => <div key={w} style={{ width: w, height: 4, background: dark ? '#71717a' : '#374151', borderRadius: 1 }} />)}
        </div>
      </div>
      {children}
    </div>
  );
}

/* ── SCREEN 1: Onboarding / Splash + Role Select ── */
export function One2BuyOnboarding() {
  return (
    <PhoneFrame>
      {/* Red decorative circles (brand pattern from JSX) */}
      <div style={{ position: 'absolute', width: 120, height: 120, background: R, borderRadius: '50%', bottom: -20, left: -40, opacity: 0.9 }} />
      <div style={{ position: 'absolute', width: 90, height: 90, background: R, borderRadius: '50%', bottom: -20, right: -30, opacity: 0.9 }} />
      <div style={{ position: 'absolute', width: 60, height: 60, background: BK, borderRadius: '50%', bottom: -5, left: -5, opacity: 1 }} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '20px 16px 60px', position: 'relative', zIndex: 1 }}>
        {/* Logo area */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 56, height: 56, background: BK, borderRadius: 12, margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: R, fontWeight: 900, fontSize: 14 }}>1•2</span>
          </div>
          <div style={{ fontSize: 9, fontWeight: 800, color: '#1c1917', marginBottom: 4 }}>Your Shop & Shopping Partner</div>
          <div style={{ fontSize: 7.5, color: '#78716c', lineHeight: 1.4, maxWidth: 110, margin: '0 auto' }}>Buy, sell, and connect in one unified social commerce platform</div>
        </div>

        {/* Role chooser */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ background: R, borderRadius: 40, padding: '10px 0', textAlign: 'center' }}>
            <span style={{ fontSize: 9, fontWeight: 800, color: W }}>Open Your Own Shop</span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: 8, fontWeight: 700, color: '#1c1917' }}>Or</span>
          </div>
          <div style={{ background: R, borderRadius: 40, padding: '10px 0', textAlign: 'center' }}>
            <span style={{ fontSize: 9, fontWeight: 800, color: W }}>Start Shopping</span>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

/* ── SCREEN 2: Login Screen ── */
export function One2BuyLogin() {
  return (
    <PhoneFrame>
      {/* Back button dot */}
      <div style={{ position: 'absolute', top: 22, left: 10, width: 14, height: 14, background: R, borderRadius: '50%', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 5, height: 5, background: W, borderRadius: 1 }} />
      </div>

      <div style={{ flex: 1, padding: '28px 14px 16px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* Heading */}
        <div style={{ marginBottom: 16, textAlign: 'center' }}>
          <div style={{ fontSize: 13, fontWeight: 900, color: '#1c1917', marginBottom: 3 }}>Welcome Back!</div>
          <div style={{ fontSize: 8, color: '#78716c' }}>Glad to see you again. Enjoy your shopping.</div>
        </div>

        {/* Big login circle button (from JSX design) */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
          <div style={{ width: 60, height: 60, background: R, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 9, fontWeight: 800, color: W }}>Log In</span>
          </div>
        </div>

        {/* Form fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 10 }}>
          {['Your Email', 'Password'].map(placeholder => (
            <div key={placeholder} style={{ background: '#f4f4f5', borderRadius: 30, padding: '7px 12px' }}>
              <span style={{ fontSize: 8, color: '#71717a' }}>{placeholder}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
          <span style={{ fontSize: 7.5, color: '#71717a' }}>Remember me</span>
          <span style={{ fontSize: 7.5, color: '#71717a' }}>Forgot Password?</span>
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
          <div style={{ flex: 1, height: 1, background: '#e5e7eb' }} />
          <span style={{ fontSize: 7.5, color: '#71717a' }}>Or Log in With</span>
          <div style={{ flex: 1, height: 1, background: '#e5e7eb' }} />
        </div>

        {/* Social logins */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
          {['G', 'f'].map(l => (
            <div key={l} style={{ width: 28, height: 28, background: W, borderRadius: '50%', boxShadow: '0 2px 8px rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: '#374151' }}>{l}</span>
            </div>
          ))}
        </div>

        {/* Register nudge */}
        <div style={{ position: 'absolute', bottom: 10, left: 0, right: 0, textAlign: 'center' }}>
          <div style={{ fontSize: 7.5, color: '#78716c', marginBottom: 6 }}>Don't have an account? Let's get you registered</div>
          <div style={{ display: 'inline-block', background: R, padding: '5px 14px', borderRadius: 6 }}>
            <span style={{ fontSize: 8, fontWeight: 800, color: W }}>Register</span>
          </div>
        </div>
      </div>

      {/* Bottom red accents */}
      <div style={{ position: 'absolute', bottom: -16, left: -20, width: 80, height: 80, background: R, borderRadius: '50%', opacity: 0.15 }} />
      <div style={{ position: 'absolute', bottom: -16, right: -20, width: 60, height: 60, background: R, borderRadius: '50%', opacity: 0.15 }} />
    </PhoneFrame>
  );
}

/* ── SCREEN 3: Product Detail View ── */
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
