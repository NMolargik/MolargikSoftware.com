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
  const base = 'px-3 py-2 rounded-md font-medium text-gray-600 hover:text-black hover:bg-gray-100 transition';

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur shadow-sm">
      <nav className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
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
                  className={`${base} font-semibold`}
                  style={({ isActive }) => (isActive ? { color } : {})}
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
          className="hidden rounded-md bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 lg:inline-block"
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
                className={`${base} block w-full font-semibold`}
                style={({ isActive }) => (isActive ? { color } : {})}
                onClick={() => setOpen(false)}
              >
                {label}
              </NavLink>
            </li>
          ))}
          <li>
            <Link
              to="/contact"
              className="mt-1 block rounded-md bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
              onClick={() => setOpen(false)}
            >
              Contact
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}