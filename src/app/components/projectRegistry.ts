/**
 * One place that knows every project, which tab category it belongs to, and how
 * they're ordered. Drives two things:
 *   1. The "next project" prompt at the foot of each detail page.
 *   2. Sending "Back to Projects" to the tab the project actually lives in.
 */
import { Page } from '../App';

export type TabKey = 'case-studies' | 'mobile' | 'wireframe';

export type RegistryItem = {
  pageId: Page;
  title: string;
  category: TabKey;
  /** One line to tempt the visitor into the next project. */
  teaser: string;
};

export const TAB_LABEL: Record<TabKey, string> = {
  'case-studies': 'Case Studies',
  mobile: 'Mobile App Design Logic',
  wireframe: 'Wireframe',
};

export const PROJECT_REGISTRY: RegistryItem[] = [
  // ── Case studies ──
  {
    pageId: 'superapp',
    title: 'Telecom Brand — Qatar Super App',
    category: 'case-studies',
    teaser: 'Reframing a telecom brand into the connective tissue of daily digital life in Qatar.',
  },
  {
    pageId: 'cs-baguette',
    title: 'Baguette SA — Recruitment Module',
    category: 'case-studies',
    teaser: 'Unifying fragmented HR tools into one intelligent candidate pipeline.',
  },
  {
    pageId: 'cs-toters',
    title: 'Toters — On-Demand Delivery App',
    category: 'case-studies',
    teaser: 'A service-selection gate that cut task abandonment by 38%.',
  },
  {
    pageId: 'cs-hr',
    title: 'HR Application — Market & Competitive Research',
    category: 'case-studies',
    teaser: 'An audit of 8 HR platforms that set the KSA-compliant redesign roadmap.',
  },

  // ── Mobile App design logic ──
  {
    pageId: 'p-octothink',
    title: 'OctoThink — Mobile Application',
    category: 'mobile',
    teaser: 'One engagement loop, carried from wireframe through years of the product.',
  },
  {
    pageId: 'p-one2buy',
    title: 'One2Buy — Marketplace App',
    category: 'mobile',
    teaser: 'A GCC marketplace where every buyer is a potential seller.',
  },
  {
    pageId: 'p-azadea',
    title: 'Azadea — Website & Mobile App',
    category: 'mobile',
    teaser: 'A full heuristic audit of web and mobile — every finding paired with a fix.',
  },

  // ── Wireframe ──
  {
    pageId: 'p-quickpay',
    title: 'Quick Pay — Remittance Web & App',
    category: 'wireframe',
    teaser: 'Removing identity and language friction for expat workers in Saudi Arabia.',
  },
  {
    pageId: 'p-ksc',
    title: 'Khalid Bin Sultan City — Web Platform',
    category: 'wireframe',
    teaser: 'Building credibility through structure for a city that doesn’t exist yet.',
  },
  {
    pageId: 'p-wasm',
    title: 'WASM — Digital Document Signing',
    category: 'wireframe',
    teaser: 'Making a legally serious act feel safe, fast and unambiguous on a phone.',
  },
];

/** Which tab does this page belong to? `undefined` for non-project pages. */
export function tabForPage(page: Page): TabKey | undefined {
  return PROJECT_REGISTRY.find(p => p.pageId === page)?.category;
}

/** The next project in the same category, wrapping around. */
export function nextProject(page: Page): RegistryItem | undefined {
  const category = tabForPage(page);
  if (!category) return undefined;
  const siblings = PROJECT_REGISTRY.filter(p => p.category === category);
  if (siblings.length < 2) return undefined;
  const i = siblings.findIndex(p => p.pageId === page);
  return siblings[(i + 1) % siblings.length];
}
