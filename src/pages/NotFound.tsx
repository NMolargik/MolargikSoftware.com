import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <h1 className="text-8xl font-bold text-brandPurple mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-600 max-w-md mb-8">
        The page you're looking for doesn't exist or has been moved.
        Let's get you back on track.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-brandPurple px-6 py-3 text-sm font-semibold text-white hover:bg-brandPurple/90 transition"
        >
          <Home size={18} />
          Go Home
        </Link>
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>
      </div>
    </div>
  );
}
