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

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [projectsTab, setProjectsTab] = useState<TabKey>('case-studies');

  // Load GA4 once on mount.
  useEffect(() => { initAnalytics(); }, []);

  // Fire a virtual page view whenever the screen changes (covers the initial
  // load and every in-app navigation, since this SPA never changes its URL).
  useEffect(() => {
    const meta = PAGE_META[currentPage];
    if (meta) trackPageView(meta.path, meta.title);
  }, [currentPage]);

  const handleNavigate = (page: Page) => {
    // Heading back to Projects from a project page? Open the tab that project
    // lives in, derived from the page we're leaving — so no caller needs to
    // pass the tab explicitly.
    if (page === 'projects') {
      const tab = tabForPage(currentPage);
      if (tab) setProjectsTab(tab);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
