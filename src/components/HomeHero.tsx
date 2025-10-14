import logo from '../assets/nickheadshot.svg';
import resumePDF from '../assets/nickmolargikresume.pdf';

export default function HomeHero() {
  return (
    <section className="relative flex flex-col md:flex-row md:flex-wrap xl:flex-nowrap items-center justify-center gap-12 bg-[radial-gradient(ellipse_at_top_left,_rgba(99,19,245,0.25)_0%,_transparent_70%),_radial-gradient(ellipse_at_bottom_right,_rgba(237,117,47,0.25)_0%,_transparent_70%),_linear-gradient(to_bottom,_#0f172a_0%,_#000_100%)] min-h-[24vh] w-full px-4 py-8 md:py-12 shadow-[0_25px_40px_-10px_rgba(0,0,0,0.6)]">
      {/* Text content */}
      <div className="backdrop-blur-xl bg-white/10 ring-1 ring-white/15 rounded-3xl p-6 md:p-8 shadow-2xl md:flex-1 md:min-w-[340px] md:max-w-[640px]">
        <div className="flex flex-col items-start max-w-lg text-left space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white [text-wrap:balance]">
            iOS Engineer — Swift &amp; SwiftUI
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-xs text-white/70">
            <span className="inline-flex items-center rounded-full bg-white/10 ring-1 ring-white/15 px-2.5 py-1">iPhone</span>
            <span className="inline-flex items-center rounded-full bg-white/10 ring-1 ring-white/15 px-2.5 py-1">iPad</span>
            <span className="inline-flex items-center rounded-full bg-white/10 ring-1 ring-white/15 px-2.5 py-1">Mac</span>
            <span className="inline-flex items-center rounded-full bg-white/10 ring-1 ring-white/15 px-2.5 py-1">Apple Watch</span>
            <span className="inline-flex items-center rounded-full bg-white/10 ring-1 ring-white/15 px-2.5 py-1">Apple TV</span>
            <span className="inline-flex items-center rounded-full bg-white/10 ring-1 ring-white/15 px-2.5 py-1">Apple Vision Pro</span>
          </div>
          <p className="text-gray-200 text-lg leading-relaxed [text-wrap:balance]">
            I design and ship polished Apple experiences across iPhone, iPad, Watch, and Mac. Deep in Swift, SwiftUI, and the Apple SDK stack — from <span className="font-semibold text-white">UIKit &amp; Combine</span> to <span className="font-semibold text-white">SwiftData, CloudKit, HealthKit, AVFoundation</span>, and more.
          </p>

          {/* Apple tech badges */}
          <ul className="flex flex-wrap gap-2 pt-1" aria-label="Core Apple technologies">
            {[
              'Swift', 'Swift Playgrounds', 'SwiftUI', 'UIKit', 'Combine', 'SwiftData',
              'CloudKit', 'HealthKit', 'AVFoundation',
              'WeatherKit', 'StoreKit', 'MapKit', 'Apple Intelligence'
            ].map((t) => (
              <li key={t} className="inline-flex items-center rounded-full bg-white/10 ring-1 ring-white/15 px-3 py-1 text-xs font-medium text-white/90">
                {t}
              </li>
            ))}
          </ul>

          {/* Button group */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch gap-3 pt-2 w-full">
            <a
              href="https://github.com/NMolargik"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 min-w-[160px] whitespace-nowrap rounded-md bg-gray-700 px-6 py-3 text-center font-semibold text-white transition hover:bg-gray-600 focus-visible:ring-2 focus-visible:ring-white/40"
            >
              GitHub
            </a>

            <a
              href="https://linkedin.com/in/nicholas-molargik"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 min-w-[160px] whitespace-nowrap rounded-md bg-[#0A66C2] px-6 py-3 text-center font-semibold text-white transition hover:bg-[#085aab] focus-visible:ring-2 focus-visible:ring-white/40"
            >
              LinkedIn
            </a>

            <a
              href={resumePDF}
              download
              className="w-full sm:flex-1 min-w-[200px] md:min-w-[220px] whitespace-nowrap rounded-md bg-orange-500 px-6 py-3 text-center font-semibold text-white transition hover:bg-orange-400 focus-visible:ring-2 focus-visible:ring-white/40"
            >
              Download Résumé
            </a>
          </div>
        </div>
      </div>

      {/* Image */}
      <div className="hidden md:flex justify-center md:justify-end md:flex-1 md:min-w-[320px]">
        <img
          src={logo}
          alt="Nick Molargik — iOS & Apple platform engineer"
          className="w-full max-w-[22rem] md:max-w-[20rem] lg:max-w-[24rem] rounded-2xl shadow-2xl ring-1 ring-white/10"
        />
      </div>
    </section>
  );
}