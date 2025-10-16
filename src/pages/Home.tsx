import { useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import HomeHero from '../components/HomeHero';
import storkIcon from '../assets/stork/storkicon.svg';
import mygraIcon from '../assets/mygra/mygraicon.png';
import waffleIcon from '../assets/waffle/waffleicon.png';
import readySetIcon from '../assets/readyset/readyseticon.svg';
import mygraBackground from '../assets/mygra/cardBackground.png';
import storkBackground from '../assets/stork/cardBackground.png';
import waffleBackground from '../assets/waffle/cardBackground.png';
import readySetBackground from '../assets/readyset/cardBackground.png';

export default function Home() {
  useEffect(() => {
    document.title = 'Nick Molargik – Mobile Engineer | SwiftUI · Kotlin · Flutter';
    const desc =
      'Nick Molargik — Expert iOS engineer specializing in Swift & SwiftUI. I build high‑performance apps for iPhone, iPad, Apple Watch, and Mac using UIKit, Combine, SwiftData/Core Data, CloudKit, HealthKit, AVFoundation, Core ML and more.';
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
      {/* Latest Projects section */}
      <section className="mx-auto mt-16 w-full max-w-7xl px-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-white/60">Featured work</div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight [text-wrap:balance]">Latest Projects</h2>
            <p className="mt-1 text-sm text-white/60 md:hidden">Swipe to explore →</p>
          </div>
        </div>
        {/* Responsive list: mobile = horizontal carousel, md+ = 2-column grid */}
        <div className="relative md:static">
          {/* Responsive grid: small = 1 column list, md+ = 2 columns */}
          <div className="transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14 lg:gap-y-16 py-4">
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
                tagline="Webpage multitasking on iPad."
                image={waffleIcon}
                background={waffleBackground}
                path="/waffle"
                fitMode="contain"
              />
              <ProjectCard
                title="Stork"
                tagline="Visual statistics for labor & delivery nurses."
                image={storkIcon}
                background={storkBackground}
                path="/stork"
                fitMode="contain"
              />
              <ProjectCard
                title="Ready, Set"
                tagline="A fitness metric companion to track & smash personal goals."
                image={readySetIcon}
                background={readySetBackground}
                path="/ready-set"
                fitMode="contain"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}