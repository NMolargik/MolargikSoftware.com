import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Stork from './pages/Stork';
import Mygra from './pages/Mygra';
import ReadySet from './pages/ReadySet';
import V1Sports from './pages/V1Sports';
import Sweetwater from './pages/Sweetwater';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stork" element = {<Stork />} />
        <Route path="/mygra" element = {<Mygra />} />
        <Route path="/ready-set" element = {<ReadySet />} />
        <Route path="/v1sports" element = {<V1Sports />} />
        <Route path="/sweetwater" element = {<Sweetwater />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}