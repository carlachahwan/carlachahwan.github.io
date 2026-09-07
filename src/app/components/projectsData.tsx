/**
 * Data for the "Mobile App design logic" and "Wireframe" project tabs.
 *
 * NOTE ON COPY: the narrative below is drafted from the actual design sources in
 * the Dev Folder (Figma code exports + screen captures) — it describes what each
 * design does and the logic behind it. It deliberately avoids inventing metrics
 * or outcomes. Carla should review/adjust the `strategy` and `translation` copy
 * before the site goes public.
 */
import { ReactNode } from 'react';
import { Page } from '../App';
import o2bSplash from '../../imports/projects/one2buy/01-splash.png';
import o2bHome from '../../imports/projects/one2buy/02-home.png';
import o2bSellMenu from '../../imports/projects/one2buy/03-sell-menu.png';
import o2bShopSize from '../../imports/projects/one2buy/04-shop-size.png';
import o2bEditShop from '../../imports/projects/one2buy/05-edit-shop.png';
import o2bMyShops from '../../imports/projects/one2buy/06-my-shops.png';
import o2bCreateAd from '../../imports/projects/one2buy/07-create-ad.png';
import o2bSupportChat from '../../imports/projects/one2buy/08-support-chat.png';
import {
  QuickPayLanding, QuickPayOnboarding, QuickPayServices,
  KscHome, KscNewsIndex, KscArticle,
  WasmSignIn, WasmDocuments, WasmSigning,
} from './WireframeMockups';

/* ── OctoThink screens ── */
import octoWire1 from '../../imports/projects/octothink/wire-1.png';
import octoWire2 from '../../imports/projects/octothink/wire-2.png';
import octoWire3 from '../../imports/projects/octothink/wire-3.png';
import octoWire4 from '../../imports/projects/octothink/wire-4.png';
import octoOld1 from '../../imports/projects/octothink/old-1.jpg';
import octoOld2 from '../../imports/projects/octothink/old-2.jpg';
import octoOld3 from '../../imports/projects/octothink/old-3.jpg';
import octoOld4 from '../../imports/projects/octothink/old-4.jpg';
import octoNew1 from '../../imports/projects/octothink/new-1.jpg';
import octoNew2 from '../../imports/projects/octothink/new-2.jpg';
import octoNew3 from '../../imports/projects/octothink/new-3.jpg';
import octoNew4 from '../../imports/projects/octothink/new-4.jpg';

/* ── Azadea screens ── */
import azMob1 from '../../imports/projects/azadea/mobile-1.jpg';
import azMob2 from '../../imports/projects/azadea/mobile-2.jpg';
import azMob3 from '../../imports/projects/azadea/mobile-3.jpg';
import azMob4 from '../../imports/projects/azadea/mobile-4.jpg';
import azWeb1 from '../../imports/projects/azadea/web-1.jpg';
import azWeb2 from '../../imports/projects/azadea/web-2.jpg';
import azWeb3 from '../../imports/projects/azadea/web-3.jpg';

/**
 * A gallery item is either a real screen capture (`src`) or a rendered mockup
 * component (`element`) — the wireframe projects have no exported images, only
 * Figma code, so those screens are recreated as components.
 */
export type Shot = { caption: string; src?: string; element?: ReactNode; /** Very tall screens get their own full-width row so the grid stays even. */ wide?: boolean };

export type ProjectGallery = {
  label: string;
  note?: string;
  shots: Shot[];
};

export type ProjectData = {
  id: string;
  pageId: Page;
  category: 'mobile' | 'wireframe';
  title: string;
  role: string;
  platform: string;
  tags: string[];
  /** Short blurb for the Projects-page card. */
  overview: string;
  /** The business concept / strategic intent. */
  strategy: string;
  /** How the strategy became structure — wireframe / UI. */
  translation: string;
  galleries: ProjectGallery[];
  outcomes: string[];
};

export const octothinkData: ProjectData = {
  id: 'octothink',
  pageId: 'p-octothink',
  category: 'mobile',
  title: 'OctoThink — Mobile Application',
  role: 'UX Architect · Wireframing · UI Direction',
  platform: 'Mobile · iOS & Android',
  tags: ['Mobile', 'Gamification', 'Engagement', 'Redesign'],
  overview:
    'A brain-training mobile app rebuilt around a clear engagement loop — from strategic concept, to wireframe, to a UI that makes progress and competition legible.',
  strategy:
    'OctoThink only compounds value if people come back — so it had to be a repeatable engagement loop, not just a catalogue of games.',
  translation:
    'I mapped that loop as an information architecture — choose your domains, play, track progress, compete on the leaderboard — and carried the same skeleton from wireframe into the UI as it matured over the years.',
  galleries: [
    {
      label: 'Wireframes',
      note: 'Where it started — the architecture proven in low fidelity, with the flow and hierarchy settled before any visual design.',
      shots: [
        { src: octoWire1, caption: 'Homepage — the hub of the engagement loop' },
        { src: octoWire2, caption: 'Games — the core play surface' },
        { src: octoWire3, caption: 'Leaderboard — competition as a first-class destination' },
        { src: octoWire4, caption: 'Statistics — progress made measurable' },
      ],
    },
    {
      label: 'The app in its earlier years',
      note: 'The interface as it stood — the architecture in its first visual form.',
      shots: [
        { src: octoOld1, caption: 'Home, earlier generation' },
        { src: octoOld2, caption: 'Game flow, earlier generation' },
        { src: octoOld3, caption: 'Navigation, earlier generation' },
        { src: octoOld4, caption: 'Content view, earlier generation' },
      ],
    },
    {
      label: 'The app today',
      note: 'Years on — the same skeleton, matured: a clearer hierarchy with progress and competition brought forward.',
      shots: [
        { src: octoNew1, caption: 'Home, current generation' },
        { src: octoNew2, caption: 'Play surface, current generation' },
        { src: octoNew3, caption: 'Progress view, current generation' },
        { src: octoNew4, caption: 'Leaderboard, current generation' },
      ],
    },
  ],
  outcomes: [
    'A single engagement loop the whole product is organised around',
    'Domain selection at onboarding, so content is relevant from first session',
    'An architecture durable enough to carry the product across successive generations',
    'A wireframe-first foundation the build team could work against',
  ],
};

export const one2buyData: ProjectData = {
  id: 'one2buy',
  pageId: 'p-one2buy',
  category: 'mobile',
  title: 'One2Buy — Marketplace App',
  role: 'UX Architect · Product Strategy · UI Design',
  platform: 'Mobile · GCC · Bilingual (AR/EN)',
  tags: ['Marketplace', 'GCC', 'Bilingual', 'C2C'],
  overview:
    'A GCC marketplace positioned as “Your Shop & Shopping Partner” — a business strategy that turns every buyer into a potential seller, translated directly into the UI.',
  strategy:
    'Positioned as “Your Shop & Shopping Partner”, One2Buy had to serve a first-time buyer and a small seller with equal ease — across seven GCC markets, in Arabic and English, where trust makes or breaks every peer-to-peer deal.',
  translation:
    'Selling is a first-class flow: the center “Sell” button opens Create Shop or Create Ads. Sellers pick a tiered shop size, set up the storefront on one screen, and manage up to three shops from a single place — while ads scale from a one-off promotion to a monthly plan.',
  galleries: [
    {
      label: 'The seller journey',
      note: 'The end-to-end flow, from first launch to running a shop and an ad — exported from the Figma design. Tap any screen to view it larger.',
      shots: [
        { src: o2bSplash, caption: '1 · Splash — the promise up front: “Your Shop & Shopping Partner.” One tap into the marketplace.' },
        { src: o2bHome, caption: '2 · Home — search, filter, and a category grid, with “Sell” anchored at the center of the bottom nav so every buyer is one tap from listing.' },
        { src: o2bSellMenu, caption: '3 · The Sell action — tapping the center button reveals the two ways to sell: Create Shop or Create Ads.' },
        { src: o2bShopSize, caption: '4 · Create Shop · pick a size — tiered shops from 9 to 500 items with a yearly / monthly toggle, so sellers pay only for what they need.' },
        { src: o2bEditShop, wide: true, caption: '5 · Set up the shop — logo, name, category, description, product images, and a clear plan-and-payment summary, all on one manageable screen.' },
        { src: o2bMyShops, caption: '6 · My Shops — sellers run up to three shops from one place, each with product count, validity dates, and quick Edit / View.' },
        { src: o2bCreateAd, caption: '7 · Create Ads · choose a plan — a recurring Monthly / Yearly ad or a one-off Single ad, so promotion scales to the seller’s goal.' },
        { src: o2bSupportChat, caption: '8 · Support chat — in-app help kept one tap away, so questions never push a user out of the app.' },
      ],
    },
  ],
  outcomes: [
    'Selling treated as a first-class flow, not a hidden mode',
    'A center-stage “Sell” entry that turns any buyer into a seller',
    'Tiered shop sizes and flexible ad plans — sellers pay only for what they need',
    'Up to three shops managed from a single seller dashboard',
    'Category architecture that scales from automotive to electronics',
  ],
};

export const azadeaData: ProjectData = {
  id: 'azadea',
  pageId: 'p-azadea',
  category: 'mobile',
  title: 'Azadea — Website & Mobile App',
  role: 'UX Architect · Heuristic Audit · Redesign',
  platform: 'eCommerce · Web + Mobile',
  tags: ['eCommerce', 'Retail', 'Audit', 'Web + Mobile'],
  overview:
    'A full heuristic audit of Azadea’s website and mobile app — every finding paired with a recommendation, then carried into the redesign.',
  strategy:
    'For a fashion retailer, revenue lives in one chain — find, understand, trust, buy. The goal wasn’t a visual refresh but to audit that chain end-to-end across web and mobile and fix every break in priority order.',
  translation:
    'Each finding became a concrete change: Add to Cart restored as the primary action, endless scroll replaced with pagination, the size guide made readable, navigation and breadcrumbs kept through checkout, and mobile readability raised.',
  galleries: [
    {
      label: 'Mobile app — after the audit',
      note: 'The redesigned mobile surfaces, with the audit’s recommendations applied.',
      shots: [
        { src: azMob1, caption: 'Redesigned mobile — home & category entry' },
        { src: azMob2, caption: 'Redesigned mobile — product listing' },
        { src: azMob3, caption: 'Redesigned mobile — product detail' },
        { src: azMob4, caption: 'Redesigned mobile — cart & checkout' },
      ],
    },
    {
      label: 'Website — after the audit',
      note: 'The redesigned desktop surfaces, with the audit’s recommendations applied.',
      shots: [
        { src: azWeb1, caption: 'Redesigned web — homepage & header' },
        { src: azWeb2, caption: 'Redesigned web — product list page' },
        { src: azWeb3, caption: 'Redesigned web — product detail & checkout' },
      ],
    },
  ],
  outcomes: [
    'Every audit finding paired with an actionable recommendation',
    'Add to Cart restored as the primary CTA across listing and detail',
    'Endless scroll replaced with pagination / load-more',
    'Navigation and breadcrumbs kept persistent through checkout',
    'Readability raised — font sizes and contrast fixed for all users',
  ],
};

export const quickPayData: ProjectData = {
  id: 'quickpay',
  pageId: 'p-quickpay',
  category: 'wireframe',
  title: 'Quick Pay — Remittance Web & App',
  role: 'UX Architect · Information Architecture · Wireframing',
  platform: 'FinTech · Web + Mobile · KSA',
  tags: ['FinTech', 'Remittance', 'KSA', 'Multilingual'],
  overview:
    'An SNB-powered remittance product for expatriate workers in Saudi Arabia — a strategy of removing onboarding friction, expressed structurally in the wireframe.',
  strategy:
    'Quick Pay serves expatriate workers sending money home from Saudi Arabia — an audience usually failed by onboarding. The bet: remove the two barriers that block them, identity friction and language.',
  translation:
    'Onboarding compresses to three legible steps via NAFATH (no Absher needed), the live exchange rate answers the first question up front, and 9+ languages plus 210-country reach are stated as plain benefits.',
  galleries: [
    {
      label: 'The wireframes',
      note: 'Structure only — the strategy expressed as hierarchy, before any visual design.',
      shots: [
        { element: <QuickPayLanding />, caption: 'Landing — the promise, then the exchange rate: the first question answered immediately' },
        { element: <QuickPayOnboarding />, caption: 'Onboarding — three legible steps, with “no Absher required” stated as a benefit' },
        { element: <QuickPayServices />, caption: 'Services — each barrier removed, restated as a proposition' },
      ],
    },
  ],
  outcomes: [
    'Onboarding reduced to three legible steps via NAFATH — no Absher required',
    'Multilingual by architecture, supporting 9+ languages',
    'Exchange rate answered up-front, before any commitment',
    'Global transfer reach (210+ countries) surfaced as a core proposition',
    'Branch, tutorial and support paths for users who need a human',
  ],
};

export const kscData: ProjectData = {
  id: 'ksc',
  pageId: 'p-ksc',
  category: 'wireframe',
  title: 'Khalid Bin Sultan City — Web Platform',
  role: 'UX Architect · Information Architecture · Wireframing',
  platform: 'Real Estate · Web · Bilingual (EN/AR)',
  tags: ['Real Estate', 'Property', 'Bilingual', 'UAE'],
  overview:
    'A city-development platform where the strategy is credibility — structured so a masterplan, its districts, and its story all lead to one action: register interest.',
  strategy:
    'A long-horizon city development is a trust problem — buyers commit to something that doesn’t exist yet. The strategy was to build credibility through structure and route every path to one action: register interest.',
  translation:
    'Two cooperating systems — the place (city → masterplan → districts → properties) and the proof (a filtered news & events narrative with newsletter capture) — with “Register your Interest” and Arabic held at top level throughout.',
  galleries: [
    {
      label: 'The wireframes',
      note: 'Structure only — the two systems, and the single conversion they both feed.',
      shots: [
        { element: <KscHome />, caption: 'Home — vision first, with “Register your Interest” and العربية held at top level' },
        { element: <KscNewsIndex />, caption: 'News & Events — filtered proof of momentum, closing on newsletter capture' },
        { element: <KscArticle />, caption: 'Article — the story template, with related content keeping the visitor in the loop' },
      ],
    },
  ],
  outcomes: [
    'Two cooperating systems: the place (city → masterplan → districts → properties) and the proof (news & events)',
    'A persistent “Register your Interest” conversion path',
    'News & events architecture with filtering, detail templates and related content',
    'Newsletter capture to convert interest into an ongoing relationship',
    'Bilingual EN/AR treated as structure, not translation',
  ],
};

export const wasmData: ProjectData = {
  id: 'wasm',
  pageId: 'p-wasm',
  category: 'wireframe',
  title: 'WASM — Digital Document Signing',
  role: 'UX Architect · Information Architecture · Wireframing',
  platform: 'Enterprise · Mobile + iPad · KSA',
  tags: ['Enterprise', 'GovTech', 'Nafath', 'Mobile + iPad'],
  overview:
    'An enterprise document-signing platform for Saudi organisations — where the strategy was to make a legally serious act feel safe, fast, and unambiguous on a phone.',
  strategy:
    'A signature is a legal act, so an enterprise signing tool must be as rigorous as the paperwork it replaces — anchored on verifiable national identity, explicit urgency, and the right to decline.',
  translation:
    'Nafath authentication (against Qiwa), priority-tagged Pending/Completed queues with filtering, and deliberate page-by-page signing — no bulk gesture, rejection with a required reason, and a full audit trail — across mobile and iPad.',
  galleries: [
    {
      label: 'The wireframes',
      note: 'Structure only — identity, urgency and the deliberate pace of signing, across mobile and iPad.',
      shots: [
        { element: <WasmSignIn />, caption: 'Sign in — Nafath as the trust anchor, with the waiting state explained' },
        { element: <WasmDocuments />, caption: 'Documents — the queue, with priority made explicit and filtering to find one among hundreds' },
        { element: <WasmSigning />, caption: 'Signing (iPad) — page by page, with rejection as a first-class path' },
      ],
    },
  ],
  outcomes: [
    'National identity as the trust anchor — Nafath authentication against Qiwa registration',
    'Priority built into the queue: Instant, Normal, Urgent, Very Urgent',
    'Page-by-page signing — no bulk gesture that could sign something unread',
    'Rejection as a first-class path, with a required reason',
    'Actions History preserving a full audit trail',
    'One architecture across two form factors — mobile stacks, iPad uses the canvas',
  ],
};

export const mobileProjects: ProjectData[] = [octothinkData, one2buyData, azadeaData];
export const wireframeProjects: ProjectData[] = [quickPayData, kscData, wasmData];

export const allExtraProjects: ProjectData[] = [...mobileProjects, ...wireframeProjects];
