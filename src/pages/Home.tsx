import { useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import Hero from '../components/Hero';
import GlassButton from '../components/GlassButton';
import LiquidGlass from '../components/LiquidGlass';
import { hexToRgbTriple, trackLiquidGlassCursor } from '../utils/liquidGlass';
import type { CSSProperties } from 'react';
import logo from '../assets/logo.svg';
import headshot from '../assets/nickheadshot.jpg';
import resumePDF from '../assets/nickmolargikresume.pdf';
import opaliteIcon from '../assets/opalite/opaliteicon.png';
import storkIcon from '../assets/stork/storkicon.png';
import mygraIcon from '../assets/mygra/mygraicon.png';
import waffleIcon from '../assets/waffle/waffleicon.png';
import setDeckIcon from '../assets/setdeck/setdeckicon.png';
import v1SportsIcon from '../assets/v1sports/V1Sports.jpg';
import streetIQIcon from '../assets/streetiq/streetiqicon.webp';
import maestroIcon from '../assets/maestro/maestroicon.png';
import { staggerContainer, staggerChild, fadeUp } from '../utils/animations';

const projects = [
  { title: 'Maestro', tagline: 'Turn any song into a Tesla light show, choreographed on your Mac.', image: maestroIcon, path: '/maestro', accentColor: '#2D7FF9' },
  { title: 'Opalite', tagline: 'The ultimate color manager for designers, developers, and digital artists.', image: opaliteIcon, path: '/opalite', accentColor: '#CAC0E8' },
  { title: 'Stork', tagline: 'Tracking and statistics for Labor & Delivery nurses.', image: storkIcon, path: '/stork', accentColor: '#E8672B' },
  { title: 'SetDeck', tagline: 'A gym companion to track & smash workout routines.', image: setDeckIcon, path: '/setdeck', accentColor: '#65DA92' },
  { title: 'Mygra', tagline: 'Migraine insights powered by on-device AI.', image: mygraIcon, path: '/mygra', accentColor: '#6E60FF' },
  { title: 'Waffle', tagline: 'Webpage multitasking, managed, on iPad.', image: waffleIcon, path: '/waffle', accentColor: '#DFA656' },
  { title: 'StreetIQ', tagline: 'AI-powered pavement intelligence helping cities assess roads and plan budgets. Building their native iOS app.', image: streetIQIcon, path: '/streetiq', accentColor: '#3FA8BC', ctaLabel: 'View Employment' },
  { title: 'V1 Sports', tagline: 'Empowering golfers to improve their game. Supporting coaches in growing their business.', image: v1SportsIcon, path: '/v1sports', accentColor: '#C84640', ctaLabel: 'View Employment' },
];

const skills = [
  {
    category: 'Mobile Development',
    accent: '#2563EB',
    items: ['SwiftUI', 'Swift', 'Kotlin Multiplatform', 'Flutter', 'Jetpack Compose'],
  },
  {
    category: 'Apple Ecosystem',
    accent: '#16A34A',
    items: ['HealthKit', 'WeatherKit', 'Apple Intelligence', 'SwiftData', 'CloudKit', 'WebView API', 'CoreML', 'AVFoundation'],
  },
  {
    category: 'Systems Engineering',
    accent: '#7C3AED',
    items: ['C Libraries', 'MATLAB', 'Python', 'GitLab CI/CD', 'Hardware Integration', 'Arduino', '3D Printing'],
  },
];

export default function Home() {
  useEffect(() => {
    document.title = 'Molargik Software LLC - Indie Mobile App Development';
    const desc =
      'Molargik Software LLC - Indie Mobile App Development. Expert iOS engineer specializing in Swift & SwiftUI.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = desc;
  }, []);

  return (
    <>
      <Hero
        variant="home"
        heading="Crafting Elegant Mobile Experiences"
        description="Senior Software Engineer building high-performance apps with Swift, SwiftUI, SwiftData, Flutter, and Kotlin Multiplatform — from concept to App Store."
        imageSrc={logo}
        headshotSrc={headshot}
        platforms={['iOS', 'iPadOS', 'macOS', 'watchOS', 'visionOS', 'tvOS', 'Flutter']}
        actionButtons={[
          { label: 'View My Work', href: '#apps', variant: 'primary' },
          { label: 'Download Résumé', href: resumePDF, variant: 'secondary', download: true },
          { label: 'GitHub', href: 'https://github.com/NMolargik', variant: 'github' },
          { label: 'LinkedIn', href: 'https://linkedin.com/in/nicholas-molargik', variant: 'linkedin' },
        ]}
      />

      {/* Apps Section */}
      <section id="apps" className="relative bg-white py-12 md:py-16 scroll-mt-20 overflow-hidden">
        {/* Ambient orbs so the glass cards read as refractive */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-10 left-1/4 w-[420px] h-[420px] rounded-full opacity-40 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(109, 0, 255, 0.4) 0%, rgba(109, 0, 255, 0) 70%)' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-10 right-1/5 w-[460px] h-[460px] rounded-full opacity-40 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(255, 108, 0, 0.4) 0%, rgba(255, 108, 0, 0) 70%)' }}
        />
        <div className="relative max-w-6xl mx-auto px-6">
          <motion.div className="text-center mb-8" {...fadeUp}>
            <h2 className="text-headline text-gray-900">Creations and Contributions</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Published apps and professional contributions serving designers, nurses, athletes, and everyday users.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <ProjectCard key={project.path} {...project} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="bg-surface py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div className="text-center mb-8" {...fadeUp}>
            <h2 className="text-headline text-gray-900">Technologies</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Deep expertise across mobile platforms and Apple frameworks.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {skills.map((group) => {
              const pillRgb = hexToRgbTriple(group.accent);
              const pillStyle: CSSProperties = pillRgb
                ? ({ '--lg-accent': pillRgb, color: group.accent } as CSSProperties)
                : { color: group.accent };
              return (
                <motion.div key={group.category} variants={staggerChild}>
                  <LiquidGlass
                    variant="card"
                    accentColor={group.accent}
                    className="rounded-2xl p-6 h-full"
                  >
                    <h3
                      className="text-lg font-semibold mb-4"
                      style={{ color: group.accent }}
                    >
                      {group.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((skill) => (
                        <span
                          key={skill}
                          onMouseMove={trackLiquidGlassCursor}
                          className="liquid-glass liquid-glass-pill inline-flex items-center rounded-full px-3 py-1 text-sm font-medium"
                          style={pillStyle}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </LiquidGlass>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-white py-12 md:py-16">
        <motion.div className="max-w-4xl mx-auto px-6 text-center" {...fadeUp}>
          <h2 className="text-headline text-gray-900">Have an idea? Let's build it.</h2>
          <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
            Whether it's a new app concept or a collaboration opportunity, I'd love to hear from you.
          </p>
          <div className="mt-8">
            <GlassButton to="/contact" accentColor="#6D00FF" size="lg">
              Get in Touch
            </GlassButton>
          </div>
        </motion.div>
      </section>
    </>
  );
}
