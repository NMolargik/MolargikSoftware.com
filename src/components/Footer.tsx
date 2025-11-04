import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [cfRequests, setCfRequests] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;
    // Fetch from a backend/Worker route you will create (see my message)
    fetch('/cf-requests')
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((data) => {
        if (!mounted) return;
        const views = typeof data?.pageViews === 'number' ? data.pageViews : null;
        setCfRequests(views);
      })
      .catch(() => {
        if (!mounted) return;
        setCfRequests(null);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <footer className="border-t border-white/10 bg-slate-950 px-6 py-8 text-center text-sm text-gray-300">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <span>© 2025 Molargik Software LLC</span>
        <span aria-live="polite" className="text-gray-400">
          {cfRequests === null ? '—' : `Unique Views Today: ${cfRequests.toLocaleString()}`}
        </span>
        <div className="flex gap-6">
          <Link to="/privacy" className="text-gray-300 underline-offset-4 hover:underline">Privacy Policy</Link>
          <Link to="/contact" className="text-gray-300 underline-offset-4 hover:underline">Contact</Link>
        </div>
      </div>
    </footer>
  );
}