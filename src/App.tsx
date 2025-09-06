import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Stork from './pages/Stork';
import Mygra from './pages/Mygra';
import ReadySet from './pages/ReadySet';
import V1Sports from './pages/V1Sports';
import Sweetwater from './pages/Sweetwater';
import Privacy from './pages/Privacy';
import WaffleLanding from './pages/WaffleLanding';

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

function AppShell() {
  const location = useLocation();
  const isWaffleRoute = location.pathname.startsWith('/waffle/');
  return (
    <div className="flex flex-col min-h-screen">
      {!isWaffleRoute && <Navbar />}
      <main className="flex-1 pb-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stork" element={<Stork />} />
          <Route path="/mygra" element={<Mygra />} />
          <Route path="/ready-set" element={<ReadySet />} />
          <Route path="/v1sports" element={<V1Sports />} />
          <Route path="/sweetwater" element={<Sweetwater />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/waffle/:num1/:num2" element={<WaffleLanding />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      {!isWaffleRoute && <Footer />}
    </div>
  );
}