/**
 * Google Analytics 4 (GA4) integration.
 *
 * This site is a single-page app — navigation only changes React state, not the
 * URL — so GA's default page_view fires just once per visit. To count each
 * section as its own view we disable the automatic page_view and fire one
 * manually on every in-app navigation (see App.tsx). GA4 derives views, average
 * engagement time, engagement/bounce rate and exits from these events.
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │  SET YOUR MEASUREMENT ID BELOW.                                       │
 * │  Get it from Google Analytics → Admin → Data streams → your web       │
 * │  stream → "Measurement ID" (looks like G-XXXXXXXXXX).                 │
 * └─────────────────────────────────────────────────────────────────────┘
 */
export const GA_MEASUREMENT_ID = 'G-FHEPV7283J'; // Carla Chahwan portfolio — GA4 stream

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

const isConfigured = () =>
  GA_MEASUREMENT_ID && !GA_MEASUREMENT_ID.startsWith('G-XXXX');

/** True on the deployed site only — keeps local dev out of your analytics. */
const isProd = () =>
  typeof window !== 'undefined' &&
  window.location.hostname !== 'localhost' &&
  window.location.hostname !== '127.0.0.1';

let started = false;

/** Load gtag.js once. Called from App on mount. */
export function initAnalytics() {
  if (started || typeof window === 'undefined') return;
  if (!isConfigured() || !isProd()) return; // silently no-op until configured / in prod
  started = true;

  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  // send_page_view: false — we send page_view manually per SPA navigation.
  window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false });
}

/** Record a virtual page view for the current SPA screen. */
export function trackPageView(path: string, title: string) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', 'page_view', {
    page_title: title,
    page_path: path,
    page_location: window.location.origin + path,
  });
}

/** Record a custom event (a click, a conversion, etc.). */
export function trackEvent(name: string, params: Record<string, any> = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}

/** Virtual path + title for every screen, used for SPA page-view tracking. */
export const PAGE_META: Record<string, { path: string; title: string }> = {
  home:          { path: '/',                         title: 'Home — Carla Chahwan' },
  projects:      { path: '/projects',                 title: 'Projects — Carla Chahwan' },
  contact:       { path: '/contact',                  title: 'Contact — Carla Chahwan' },
  superapp:      { path: '/projects/telecom-super-app', title: 'Telecom Super App — Case Study' },
  'cs-baguette': { path: '/projects/baguette',        title: 'Baguette SA — Case Study' },
  'cs-toters':   { path: '/projects/toters',          title: 'Toters — Case Study' },
  'cs-hr':       { path: '/projects/hr-research',     title: 'HR Research — Case Study' },
  'p-octothink': { path: '/projects/octothink',       title: 'OctoThink — Mobile App' },
  'p-one2buy':   { path: '/projects/one2buy',         title: 'One2Buy — Mobile App' },
  'p-azadea':    { path: '/projects/azadea',          title: 'Azadea — Website & App' },
  'p-quickpay':  { path: '/projects/quick-pay',       title: 'Quick Pay — Wireframe' },
  'p-ksc':       { path: '/projects/ksc',             title: 'Khalid Bin Sultan City — Wireframe' },
  'p-wasm':      { path: '/projects/wasm',            title: 'WASM — Wireframe' },
};
