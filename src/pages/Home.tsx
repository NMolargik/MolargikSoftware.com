import ProjectCard from '../components/ProjectCard';
import HomeHero from '../components/HomeHero';
import storkIcon from '../assets/stork/storkicon.svg';
import mygraIcon from '../assets/mygra/mygraicon.png';
import waffleIcon from '../assets/waffle/waffleicon.png';
import readySetIcon from '../assets/readyset/readyseticon.svg';
import v1Icon from '../assets/v1sports/v1icon.svg';

export default function Home() {
  return (
    <>
      <HomeHero />

      {/* Project cards row */}
      <section className="mx-auto mt-20 flex flex-wrap justify-center gap-8 px-6 max-w-6xl">
        <ProjectCard
          title="Mygra"
          tagline="Migraine insights powered by on‑device AI."
          image={mygraIcon}
          path="/mygra"
        />
        <ProjectCard
          title="Stork"
          tagline="Visual statistics for labor & delivery nurses."
          image={storkIcon}
          path="/stork"
        />
        <ProjectCard
          title="Waffle"
          tagline="Webpage multitasking on iPad."
          image={waffleIcon}
          path="/waffle"
        />
        <ProjectCard
          title="Ready, Set"
          tagline="A fitness metric companion to track & smash personal goals."
          image={readySetIcon}
          path="/ready-set"
        />
        <ProjectCard
          title="V1 Sports - Employment"
          tagline="Analyze your swing and improve with video & data."
          image={v1Icon}
          path="/v1sports"
        />
      </section>
    </>
  );
}