import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center pt-20">
      <motion.h1
        className="text-8xl font-bold text-brandPurple mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        404
      </motion.h1>
      <motion.h2
        className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Page Not Found
      </motion.h2>
      <motion.p
        className="text-gray-500 dark:text-gray-400 max-w-md mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        The page you're looking for doesn't exist or has been moved.
        Let's get you back on track.
      </motion.p>
      <motion.div
        className="flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brandPurple px-6 py-3 text-sm font-medium text-white hover:bg-brandPurple/90 transition"
        >
          <Home size={18} />
          Go Home
        </Link>
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0a0a0c] px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 transition"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>
      </motion.div>
    </div>
  );
}
