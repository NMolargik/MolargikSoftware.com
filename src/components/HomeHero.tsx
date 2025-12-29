import { motion } from "framer-motion";
import logo from '../assets/whitelogo.png';
import resumePDF from '../assets/nickmolargikresume.pdf';

export default function HomeHero() {
  return (
    <section className="relative w-full">
      {/* Full-width background with dynamic height */}
      <div className="home-hero-bg absolute inset-0 overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,19,245,0.2)_20%,_transparent_60%)] opacity-50" />
      </div>
      {/* Constrained content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-4 sm:px-8 sm:py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Text Content */}
          <div className="flex-1 max-w-xl space-y-6">
            <h1 className="text-3xl md:text-3xl font-bold text-white tracking-tight bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
              Indie Mobile App Development
            </h1>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              Crafting mobile applications that balance elegant design with technical capability — built with Swift, SwiftUI, and SwiftData. Leveraging the latest Apple frameworks to build utilities for medical, fitness, and general use.
            </p>
            <div className="flex flex-wrap gap-3">
              {['iOS', 'iPadOS', 'macOS', 'watchOS', 'visionOS', 'tvOS'].map((platform, idx) => (
                <motion.span
                  key={platform}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.5, duration: 1.5 }}
                  className="inline-flex items-center rounded-md bg-white ring-1 ring-black px-2 py-1 text-xs font-medium text-black"
                >
                  {platform}
                </motion.span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-6 items-start sm:items-center">
              <a
                href={resumePDF}
                download
                className="inline-flex items-center justify-center rounded-md bg-orange-500 px-4 py-2 text-white font-semibold hover:bg-orange-600 transition focus-visible:ring-2 focus-visible:ring-orange-300 hover:text-white sm:px-5 sm:py-2"
              >
                Download Résumé
              </a>
              <div className="flex gap-3">
                <a
                  href="https://github.com/NMolargik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md bg-gray-700 px-4 py-2 text-white font-semibold hover:bg-gray-600 transition focus-visible:ring-2 focus-visible:ring-gray-400 hover:text-white"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/nicholas-molargik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 transition focus-visible:ring-2 focus-visible:ring-blue-400 hover:text-white"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
          {/* Image/Content Accent - Hidden on narrow screens */}
          <div className="hidden md:block flex-shrink-0 w-full md:w-auto">
            <div className="rounded-xl p-4 md:p-6 shadow-inner">
              <img
                src={logo}
                alt="Nick Molargik — Indie iOS Engineer"
                className="w-full max-w-[18rem] md:max-w-[22rem] rounded-lg object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}