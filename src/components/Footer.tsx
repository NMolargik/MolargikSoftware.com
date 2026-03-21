import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 px-6 py-10 text-center text-sm">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <span className="text-gray-500">&copy; 2026 Molargik Software LLC</span>

        <span className="text-gray-400 text-sm tracking-wide">
          Doing stuff in the pursuit of things
        </span>

        <div className="flex gap-6">
          <Link
            to="/privacy"
            className="text-gray-500 hover:text-brandPurple underline-offset-4 hover:underline transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            to="/contact"
            className="text-gray-500 hover:text-brandPurple underline-offset-4 hover:underline transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
