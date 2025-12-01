import { useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import HomeHero from '../components/HomeHero';
import storkIcon from '../assets/stork/storkicon.png';
import mygraIcon from '../assets/mygra/mygraicon.png';
import waffleIcon from '../assets/waffle/waffleicon.png';
import setDeckIcon from '../assets/setdeck/setdeckicon.png';
import mygraBackground from '../assets/mygra/cardBackground.png';
import storkBackground from '../assets/stork/cardBackground.png';
import waffleBackground from '../assets/waffle/cardBackground.png';
import setDeckBackground from '../assets/setdeck/cardBackground.png';

export default function Home() {
  useEffect(() => {
    document.title = 'Molargik Software LLC - Indie Mobile App Development';
    const desc =
      'Molargik Software LLC - Indie Mobile App Development. Expert iOS engineer specializing in Swift & SwiftUI. I build high‑performance apps for iPhone, iPad, Apple Watch, and Mac using Swift, SwiftData, Combine, SwiftData/Core Data, CloudKit, HealthKit, AVFoundation, Core ML and more.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = desc;
    // Set accent color for navbar hover on Home
    document.documentElement.style.setProperty('--accent', '#38bdf8'); // sky-400
  }, []);

  const roadmap: { date: string; title: string; description?: string; color?: string; gradient?: string }[] = [
    { date: "⭐️ Just Released", title: "SetDeck", description: "Ready, Set 2.0 with a massive UX overhaul and additional features.", color: "#65DA92" },
    { date: "☃️ January 2026", title: "Opalite", description: "A brand new project all about color.", gradient: 'linear-gradient(135deg, #f97316, #facc15, #22c55e, #3b82f6, #a855f7, #ec4899)' },
    { date: "🚂 2026", title: "SwiftTrain", description: "Not an app 🤔", color: "#f97316" },
  ];

  return (
    <>
      <style>{`
        :root { --accent: #38bdf8; }
        header nav a:hover, nav a:hover, .nav-link:hover {
          color: var(--accent) !important;
        }
        header nav a:focus-visible, nav a:focus-visible, .nav-link:focus-visible {
          outline: 2px solid color-mix(in oklab, var(--accent), white 25%);
          outline-offset: 2px;
          border-radius: 6px;
        }
      `}</style>
      <HomeHero />

      {/* New roadmap view */}
      <section className="mx-auto mt-16 w-full max-w-7xl px-6">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight [text-wrap:balance]">Roadmap</h2>
        <div className="mt-6">
          <ol className="relative flex flex-col md:flex-row md:justify-between border-s-4 border-red-500 md:border-s-0 md:border-t-4 border-red-500 dark:border-red-700 dark:md:border-red-700">
            {roadmap.map((item, idx) => (
              <li key={idx} className="relative flex-1 md:flex-initial md:w-auto ps-6 md:ps-0 py-4 md:py-0">
                <span
                  className="absolute left-[-0.4rem] top-1/2 md:left-1/2 md:top-0 -translate-y-1/2 md:-translate-x-1/2 md:-translate-y-1/2 h-3 w-3 rounded-full ring-4 ring-white dark:ring-slate-900"
                  style={item.gradient ? { background: item.gradient } : { backgroundColor: item.color || 'var(--accent)' }}
                />
                <div className="flex flex-col items-start md:items-center text-center md:text-center gap-1 mt-2 md:mt-6">
                  <div className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    {item.date}
                  </div>
                  <div className="text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100">
                    {item.title}
                  </div>
                  {item.description && (
                    <p className="text-slate-600 dark:text-slate-300">
                      {item.description}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Latest Projects section */}
      <section className="mx-auto mt-16 w-full max-w-7xl px-6 pb-24">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight [text-wrap:balance]">Latest Projects</h2>
          </div>
        </div>
        {/* Responsive list: mobile = horizontal carousel, md+ = 2-column grid */}
        <div className="relative md:static">
          {/* Responsive grid: small = 1 column list, md+ = 2 columns */}
          <div className="transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14 lg:gap-y-16 py-4">
              <ProjectCard
                title="SetDeck"
                tagline="A gym companion to track & smash workout routines. Every Set Counts!"
                image={setDeckIcon}
                background={setDeckBackground}
                path="/setdeck"
                fitMode="contain"
              />
              <ProjectCard
                title="Mygra"
                tagline="Migraine insights powered by on-device AI."
                image={mygraIcon}
                background={mygraBackground}
                path="/mygra"
                fitMode="contain"
              />
              <ProjectCard
                title="Waffle"
                tagline="Webpage multitasking, managed, on iPad."
                image={waffleIcon}
                background={waffleBackground}
                path="/waffle"
                fitMode="contain"
              />
              <ProjectCard
                title="Stork"
                tagline="Journal and statistics for labor & delivery nurses."
                image={storkIcon}
                background={storkBackground}
                path="/stork"
                fitMode="contain"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}