import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ProjectsPage from './components/ProjectsPage';
import ContactPage from './components/ContactPage';
import SuperAppCaseStudy from './components/SuperAppCaseStudy';
import CaseStudyPage from './components/CaseStudyPage';
import ProjectDetailPage from './components/ProjectDetailPage';
import { baguetteData, totersData, hrResearchData } from './components/caseStudyData';
import { octothinkData, one2buyData, azadeaData, quickPayData, kscData, wasmData } from './components/projectsData';
import { tabForPage, TabKey } from './components/projectRegistry';
import { initAnalytics, trackPageView, PAGE_META } from './utils/analytics';

export type Page =
  | 'home' | 'projects' | 'contact'
  | 'superapp' | 'cs-baguette' | 'cs-toters' | 'cs-hr'
  // Mobile App design logic
  | 'p-octothink' | 'p-one2buy' | 'p-azadea'
  // Wireframe
  | 'p-quickpay' | 'p-ksc' | 'p-wasm';

const CASE_STUDY_PAGES: Page[] = [
  'superapp', 'cs-baguette', 'cs-toters', 'cs-hr',
  'p-octothink', 'p-one2buy', 'p-azadea', 'p-quickpay', 'p-ksc', 'p-wasm',
];

// Hash routing: every page has a readable path in PAGE_META (e.g.
// /projects/one2buy). We mirror it into the URL hash so the browser's
// back/forward buttons work and any screen is deep-linkable and shareable.
const PATH_TO_PAGE = Object.fromEntries(
  Object.entries(PAGE_META).map(([page, meta]) => [meta.path, page as Page]),
) as Record<string, Page>;

function pageFromHash(): Page {
  const path = window.location.hash.replace(/^#/, '') || '/';
  return PATH_TO_PAGE[path] ?? 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>(pageFromHash);
  const [projectsTab, setProjectsTab] = useState<TabKey>('case-studies');

  // Load GA4 once on mount.
  useEffect(() => { initAnalytics(); }, []);

  // Keep app state in sync with the URL hash — covers back/forward and any
  // deep link the visitor lands on or shares.
  useEffect(() => {
    const onHash = () => {
      setCurrentPage(pageFromHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Fire a virtual page view and update the document title whenever the
  // screen changes (covers the initial load and every in-app navigation).
  useEffect(() => {
    const meta = PAGE_META[currentPage];
    if (meta) {
      trackPageView(meta.path, meta.title);
      document.title = meta.title;
    }
  }, [currentPage]);

  const handleNavigate = (page: Page) => {
    // Heading back to Projects from a project page? Open the tab that project
    // lives in, derived from the page we're leaving — so no caller needs to
    // pass the tab explicitly.
    if (page === 'projects') {
      const tab = tabForPage(currentPage);
      if (tab) setProjectsTab(tab);
    }
    const path = PAGE_META[page]?.path ?? '/';
    const current = window.location.hash.replace(/^#/, '') || '/';
    if (current === path) {
      // Already on this hash (e.g. re-selecting the current page) — update
      // state directly since no hashchange event will fire.
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Changing the hash triggers the hashchange listener above, which sets
      // the page and scrolls to top.
      window.location.hash = path;
    }
  };

  const isCaseStudy = CASE_STUDY_PAGES.includes(currentPage);

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Inter', sans-serif", background: 'var(--bg)' }}>
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      <main style={{ paddingTop: isCaseStudy ? 72 : 0 }}>
        {currentPage === 'home'        && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'projects'    && <ProjectsPage onNavigate={handleNavigate} initialTab={projectsTab} />}
        {currentPage === 'contact'     && <ContactPage />}
        {currentPage === 'superapp'    && <SuperAppCaseStudy onNavigate={handleNavigate} />}
        {currentPage === 'cs-baguette' && <CaseStudyPage data={baguetteData} onNavigate={handleNavigate} />}
        {currentPage === 'cs-toters'   && <CaseStudyPage data={totersData}   onNavigate={handleNavigate} />}
        {currentPage === 'cs-hr'       && <CaseStudyPage data={hrResearchData} onNavigate={handleNavigate} />}

        {/* Mobile App design logic */}
        {currentPage === 'p-octothink' && <ProjectDetailPage data={octothinkData} onNavigate={handleNavigate} />}
        {currentPage === 'p-one2buy'   && <ProjectDetailPage data={one2buyData}   onNavigate={handleNavigate} />}
        {currentPage === 'p-azadea'    && <ProjectDetailPage data={azadeaData}    onNavigate={handleNavigate} />}

        {/* Wireframe */}
        {currentPage === 'p-quickpay'  && <ProjectDetailPage data={quickPayData}  onNavigate={handleNavigate} />}
        {currentPage === 'p-ksc'       && <ProjectDetailPage data={kscData}       onNavigate={handleNavigate} />}
        {currentPage === 'p-wasm'      && <ProjectDetailPage data={wasmData}      onNavigate={handleNavigate} />}
      </main>
      {!isCaseStudy && <Footer onNavigate={handleNavigate} />}
    </div>
  );
}
