import { Link } from 'react-router-dom';
import { CONTACT_EMAIL, LEGAL_NAME } from '../config/site';

const links = [
  { label: 'Guides', to: '/guides' },
  { label: 'Support', to: '/support' },
  { label: 'Press', to: '/press' },
  { label: 'Privacy', to: '/privacy' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 px-6 py-10 text-sm">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 sm:flex-row sm:justify-between">
        <div className="text-center sm:text-left">
          <span className="text-gray-500" suppressHydrationWarning>&copy; {new Date().getFullYear()} {LEGAL_NAME}</span>
          <p className="mt-1 text-gray-400 tracking-wide">Independent apps for every Apple device. Private by design.</p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 list-none p-0 m-0">
            {links.map(({ label, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-gray-500 hover:text-brandPurple underline-offset-4 hover:underline transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-gray-500 hover:text-brandPurple underline-offset-4 hover:underline transition-colors"
              >
                {CONTACT_EMAIL}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
