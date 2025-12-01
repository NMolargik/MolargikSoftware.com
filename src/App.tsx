import { BrowserRouter, HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Stork from './pages/Stork';
import Mygra from './pages/Mygra';
import SetDeck from './pages/SetDeck';
import Privacy from './pages/Privacy';
import WaffleLanding from './pages/WaffleLanding';
import Waffle from './pages/Waffle';
import Opalite from './pages/Opalite';
import SwiftTrain from './pages/SwiftTrain';

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
  const location = useLocation();
  const isWaffleRoute = location.pathname.startsWith('/waffle/') || location.pathname === '/wafflelanding';
  return (
    <div className="flex flex-col min-h-screen">
      {!isWaffleRoute && (
        <>
          <Navbar />
        </>
      )}
      <main className="flex-1">
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
          <Route path="/wafflelanding" element={<WaffleLanding />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      {!isWaffleRoute && <Footer />}
    </div>
  );
}