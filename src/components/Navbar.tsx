import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../assets/logolong.png'; // vite can import SVG as React component

const links = [
  { label: 'Mygra', path: '/mygra', color: '#8B5CF6' },
  { label: 'Waffle', path: '/waffle', color: '#EAB308' },
  { label: 'Stork', path: '/stork', color: '#ec8448ff' },
  { label: 'Ready, Set', path: '/ready-set', color: '#10B981' },
  { label: 'About', path: '/about', color: '#3B82F6' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const base = 'nav-link px-3 py-2 rounded-md font-semibold text-gray-700/90 hover:bg-gray-100 hover:text-[var(--link-accent)] transition';

  return (
    <>
      <style>{`
        header a.nav-link:hover {
          color: var(--link-accent) !important;
        }
        header nav a.nav-link:focus-visible {
          outline: 2px solid color-mix(in oklab, var(--link-accent), white 25%);
          outline-offset: 2px;
          border-radius: 6px;
        }
      `}</style>
      <header className="sticky top-0 z-50 bg-white/80 border-b border-black/5 backdrop-blur shadow-sm">
        <nav className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          {/* logo */}
          <Link to="/" className="w-auto flex items-center gap-2">
            <img src={Logo} alt="Logo" className="max-w-[280px] object-contain" />
          </Link>
          {/* desktop links */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <ul className="hidden gap-1 lg:flex items-center">
              {links.map(({ label, path, color }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    end={path === '/'}
                    className={base}
                    style={({ isActive }) => ({
                      ...(isActive ? { color } : {}),
                      ['--link-accent' as any]: color
                    })}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          {/* contact button */}
          <Link
            to="/contact"
            className="hidden rounded-md bg-[#f97316] px-4 py-2 text-sm font-semibold text-white hover:bg-[#fb923c] lg:inline-block"
          >
            Contact
          </Link>
          {/* hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden"
            aria-label="Toggle navigation"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
        {/* mobile menu */}
        {open && (
          <ul className="space-y-1 border-t bg-white px-6 pb-4 pt-3 lg:hidden">
            {links.map(({ label, path, color }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  end={path === '/'}
                  className={`${base} block w-full`}
                  style={({ isActive }) => ({
                    ...(isActive ? { color } : {}),
                    ['--link-accent' as any]: color
                  })}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </NavLink>
              </li>
            ))}
            <li>
              <Link
                to="/contact"
                className="mt-1 block rounded-md bg-[#f97316] px-4 py-2 text-sm font-semibold text-white hover:bg-[#fb923c]"
                onClick={() => setOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        )}
      </header>
    </>
  );
}