import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import LiquidGlass from '../components/LiquidGlass';
import ScrollToTop from '../components/ScrollToTop';
import { useRouteMeta } from '../hooks';
import { guides, guidePath } from '../data/guides.mjs';
import { fadeUp } from '../utils/animations';

export default function Guides() {
  useRouteMeta({ accentColor: '#2D7FF9' });

  return (
    <>
      <section className="pt-28 pb-10 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex"
          >
            <LiquidGlass variant="card" accentColor="#2D7FF9" className="inline-flex items-center justify-center w-16 h-16 rounded-2xl">
              <BookOpen size={32} style={{ color: '#2D7FF9' }} aria-hidden="true" />
            </LiquidGlass>
          </motion.div>
          <h1 className="text-headline text-gray-900">Tesla light show guides</h1>
          <p className="mt-4 text-lg text-gray-500">
            Plain-language answers about making, loading, and fixing Tesla light shows, written from Tesla’s own published
            instructions. They work whether or not you ever install Maestro.
          </p>
        </div>
      </section>

      <section className="pb-20 bg-white">
        <ul className="max-w-3xl mx-auto px-6 space-y-6 list-none p-0">
          {guides.map((g: { slug: string; short: string; summary: string }) => (
            <motion.li key={g.slug} {...fadeUp}>
              <Link to={guidePath(g.slug)} className="block">
                <LiquidGlass variant="card" interactive accentColor="#2D7FF9" className="rounded-3xl px-6 py-6 sm:px-8">
                  <h2 className="text-xl font-semibold text-gray-900">{g.short}</h2>
                  <p className="mt-1 text-gray-600">{g.summary}</p>
                </LiquidGlass>
              </Link>
            </motion.li>
          ))}
        </ul>
        <p className="max-w-3xl mx-auto px-6 mt-8 text-sm text-gray-500 italic">
          Maestro is an independent app and is not affiliated with or endorsed by Tesla, Inc.
        </p>
      </section>
      <ScrollToTop />
    </>
  );
}
