// src/components/Footer.tsx
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 px-6 py-8 text-center text-sm text-gray-300">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <span>© 2025 Molargik Software LLC</span>

        <div className="flex gap-6">
          <Link
            to="/privacy"
            className="text-gray-300 underline-offset-4 hover:underline"
          >
            Privacy Policy
          </Link>

          <Link
            to="/contact"
            className="text-gray-300 underline-offset-4 hover:underline"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}