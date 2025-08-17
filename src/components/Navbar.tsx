// Ensure Tailwind includes these custom classes in the build
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../assets/logo.svg';   // vite can import SVG as React component

const links = [
  { label: 'Stork', path: '/stork' },
  { label: 'Mygra', path: '/mygra' },
  { label: 'Ready, Set', path: '/ready-set' },
  { label: 'V1 Sports', path: '/v1sports' },
  { label: 'Sweetwater', path: '/sweetwater' },
  { label: 'About', path: '/about' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const base =
    'px-3 py-2 rounded-md font-medium text-gray-600 hover:text-black hover:bg-gray-100 transition';

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur shadow-sm">
      <nav className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        {/* logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={Logo} alt="Logo" className="h-10 w-10 scale-125" />
          <span className="text-lg font-semibold text-black">Molargik&nbsp;Software&nbsp;LLC</span>
        </Link>

        {/* desktop links */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <ul className="hidden gap-1 lg:flex items-center">
            {links.map(({ label, path }, index) => (
              <li key={path}>
                <NavLink
                  to={path}
                  end={path === '/'}
                  className={`${base} font-semibold`}
                  style={({ isActive }) =>
                    isActive ? { color: index % 2 === 0 ? '#6D00FF' : '#FF6C00' } : {}
                  }
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
          {links.map(({ label, path }, index) => (
            <li key={path}>
              <NavLink
                to={path}
                end={path === '/'}
                className={`${base} block w-full font-semibold`}
                style={({ isActive }) =>
                  isActive ? { color: index % 2 === 0 ? '#6D00FF' : '#FF6C00' } : {}
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