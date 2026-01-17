import { lazy, Suspense } from 'react';
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
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
const SwiftTrain = lazy(() => import('./pages/SwiftTrain'));
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

function AppShell() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brandPurple focus:text-white focus:rounded-md focus:outline-none"
      >
        Skip to main content
      </a>
      <>
        <Navbar />
      </>
      <main id="main-content" className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/opalite" element={<Opalite />} />
            <Route path="/swifttrain" element={<SwiftTrain />} />
            <Route path="/setdeck" element={<SetDeck />} />
            <Route path="/mygra" element={<Mygra />} />
            <Route path="/stork" element={<Stork />} />
            <Route path="/waffle" element={<Waffle />} />
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
