import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-sm'
          : 'bg-transparent'
      }`}
    >
      {/* Subtle orange accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1.5px] transition-opacity duration-300"
        style={{
          background: 'linear-gradient(90deg, transparent, #FF6C00 30%, #FF6C00 70%, transparent)',
          opacity: scrolled ? 0.35 : 0,
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

        {/* Contact button */}
        <Link
          to="/contact"
          className="hidden lg:inline-block rounded-full bg-brandPurple px-5 py-2 text-sm font-medium text-white hover:bg-brandPurple/90 transition-colors"
        >
          Contact
        </Link>

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
            className="lg:hidden overflow-hidden bg-white border-b border-gray-200"
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
              <li>
                <Link
                  to="/contact"
                  className="mt-2 block rounded-full bg-brandPurple px-5 py-2 text-sm font-medium text-white text-center hover:bg-brandPurple/90 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
