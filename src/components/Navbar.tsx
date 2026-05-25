import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { trackLiquidGlassCursor } from '../utils/liquidGlass';
import GlassButton from './GlassButton';
import Logo from '../assets/logoLong.png';

const links = [
  { label: 'Opalite', path: '/opalite' },
  { label: 'SetDeck', path: '/setdeck' },
  { label: 'Mygra', path: '/mygra' },
  { label: 'Stork', path: '/stork' },
  { label: 'Waffle', path: '/waffle' },
  { label: 'V1 Sports', path: '/v1sports' },
  { label: 'About', path: '/about' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const linkClass =
    'px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-brandOrange hover:bg-orange-50/80 transition-all duration-200';
  const activeLinkClass =
    'px-3 py-2 rounded-lg text-sm font-semibold text-gray-900 bg-gray-100/60';

  return (
    <header
      onMouseMove={trackLiquidGlassCursor}
      className={`fixed top-0 w-full z-50 transition-all duration-300 liquid-glass ${
        scrolled ? 'shadow-sm' : ''
      }`}
      style={{ borderRadius: 0, border: 'none', borderBottom: '1px solid rgba(255,255,255,0.4)' }}
    >
      {/* Subtle orange accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1.5px] transition-opacity duration-300 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, #FF6C00 30%, #FF6C00 70%, transparent)',
          opacity: scrolled ? 0.35 : 0,
          zIndex: 2,
        }}
      />
      <nav className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={Logo} alt="Molargik Software" className="h-6 w-auto" />
        </Link>

        {/* Desktop links — absolutely centered */}
        <ul className="hidden gap-1 lg:flex items-center list-none absolute left-1/2 -translate-x-1/2">
          {links.map(({ label, path }) => (
            <li key={path}>
              <NavLink
                to={path}
                end={path === '/'}
                className={({ isActive }) => (isActive ? activeLinkClass : linkClass)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Contact button (desktop only — mobile gets one inside the menu) */}
        <div className="hidden lg:block">
          <GlassButton to="/contact" accentColor="#6D00FF" size="sm">
            Contact
          </GlassButton>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-gray-700 p-1"
          aria-label="Toggle navigation"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden liquid-glass liquid-glass-card"
            style={{ borderRadius: 0, border: 'none', borderTop: '1px solid rgba(255,255,255,0.4)' }}
          >
            <ul className="space-y-1 px-6 pb-4 pt-2 list-none">
              {links.map(({ label, path }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    end={path === '/'}
                    className={({ isActive }) =>
                      `block w-full ${isActive ? activeLinkClass : linkClass}`
                    }
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
              <li className="mt-2">
                <GlassButton
                  to="/contact"
                  accentColor="#6D00FF"
                  size="sm"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Contact
                </GlassButton>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
