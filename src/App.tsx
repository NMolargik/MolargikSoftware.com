import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LiquidGlassFilters from './components/LiquidGlassFilters';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load all page components for code splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Stork = lazy(() => import('./pages/Stork'));
const Mygra = lazy(() => import('./pages/Mygra'));
const SetDeck = lazy(() => import('./pages/SetDeck'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Waffle = lazy(() => import('./pages/Waffle'));
const Opalite = lazy(() => import('./pages/Opalite'));
const V1Sports = lazy(() => import('./pages/V1Sports'));
const StreetIQ = lazy(() => import('./pages/StreetIQ'));
const Maestro = lazy(() => import('./pages/Maestro'));
const OpaliteWeb = lazy(() => import('./pages/OpaliteWeb'));
const NotFound = lazy(() => import('./pages/NotFound'));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <LoadingSpinner size="lg" />
    </div>
  );
}

export default function App() {
  return import.meta.env.PROD ? (
    <HashRouter>
      <AppShell />
    </HashRouter>
  ) : (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

function ScrollToTopOnNav() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/** Returns true when the page is served from opalite.molargiksoftware.com */
function isOpaliteSubdomain() {
  return window.location.hostname.startsWith('opalite.');
}

function AppShell() {
  const opaliteSub = isOpaliteSubdomain();

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <LiquidGlassFilters />
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brandPurple focus:text-white focus:rounded-md focus:outline-none"
      >
        Skip to main content
      </a>
      <ScrollToTopOnNav />
      {!opaliteSub && <Navbar />}
      <main id="main-content" className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={opaliteSub ? <OpaliteWeb /> : <Home />} />
            <Route path="/opalite" element={<Opalite />} />
            <Route path="/opalite-web" element={<OpaliteWeb />} />

            <Route path="/maestro" element={<Maestro />} />
            <Route path="/setdeck" element={<SetDeck />} />
            <Route path="/mygra" element={<Mygra />} />
            <Route path="/stork" element={<Stork />} />
            <Route path="/waffle" element={<Waffle />} />
            <Route path="/v1sports" element={<V1Sports />} />
            <Route path="/streetiq" element={<StreetIQ />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
