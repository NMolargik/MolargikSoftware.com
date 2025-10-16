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
      <div className="relative z-10 max-w-7xl mx-auto px- py-6 md:px-12 md:py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Text Content */}
          <div className="flex-1 max-w-xl space-y-6">
            <h1 className="text-3xl md:text-3xl font-bold text-white tracking-tight bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
              Indie iOS, iPadOS, and Mac Development
            </h1>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              Crafting privacy-first Apple apps with SwiftUI, Apple Intelligence, and Skip.tools. From world-class storefronts at Sweetwater to sports tech at V1 Sports, now building innovative solutions like Mygra, Waffle, Stork, and Ready, Set.
            </p>
            <div className="flex flex-wrap gap-3">
              {['iOS', 'iPadOS', 'macOS', 'watchOS', 'visionOS'].map((platform) => (
                <span
                  key={platform}
                  className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white/80 ring-1 ring-white/20 hover:bg-white/20 transition"
                >
                  {platform}
                </span>
              ))}
            </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <a
                  href={resumePDF}
                  download
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-orange-500 px-6 py-2 text-white font-semibold hover:bg-orange-600 transition focus-visible:ring-2 focus-visible:ring-orange-300 hover:text-white"
                >
                  Download Résumé
                </a>
                <div className="flex gap-4">
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
            <div className="bg-white/5 rounded-xl p-4 md:p-6 shadow-inner ring-1 ring-white/10">
              <img
                src={logo}
                alt="Nick Molargik — Indie iOS Engineer"
                className="w-full max-w-[18rem] md:max-w-[22rem] rounded-lg object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}