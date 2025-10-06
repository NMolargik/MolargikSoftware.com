import { useRef } from 'react';
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
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (dir: 'left' | 'right') => {
    const el = scrollerRef.current;
    if (!el) return;
    const dx = Math.round(el.clientWidth * 0.9) * (dir === 'left' ? -1 : 1);
    el.scrollBy({ left: dx, behavior: 'smooth' });
  };

  return (
    <>
      <HomeHero />
      {/* Latest Projects section */}
      <section className="mx-auto mt-16 w-full max-w-6xl px-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Latest Projects</h2>
          <div className="flex gap-2 md:hidden">
            <button
              type="button"
              onClick={() => scrollByAmount('left')}
              aria-label="Scroll left"
              className="rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur transition hover:bg-white/10"
            >
              ◀
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount('right')}
              aria-label="Scroll right"
              className="rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur transition hover:bg-white/10"
            >
              ▶
            </button>
          </div>
        </div>
        {/* Responsive list: mobile = horizontal carousel, md+ = 2-column grid */}
        <div className="relative md:static">
          {/* --- Mobile / small screens: Horizontal carousel --- */}
          <div
            ref={scrollerRef}
            className="flex flex-nowrap gap-8 overflow-x-auto pb-8 snap-x snap-mandatory md:hidden"
          >
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
          <div className="md:hidden">
            <div className="absolute inset-y-0 left-2 flex items-center sm:hidden">
              <button
                type="button"
                onClick={() => scrollByAmount('left')}
                aria-label="Scroll left"
                className="rounded-full border border-white/10 bg-white/10 px-3 py-2 backdrop-blur"
              >
                ◀
              </button>
            </div>
            <div className="absolute inset-y-0 right-2 flex items-center sm:hidden">
              <button
                type="button"
                onClick={() => scrollByAmount('right')}
                aria-label="Scroll right"
                className="rounded-full border border-white/10 bg-white/10 px-3 py-2 backdrop-blur"
              >
                ▶
              </button>
            </div>
          </div>
          {/* --- md and up: 2-column grid with transition --- */}
          <div className="hidden md:block transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 py-4">
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