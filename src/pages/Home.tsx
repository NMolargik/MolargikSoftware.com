import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import Hero from '../components/Hero';
import logo from '../assets/whitelogo.png';
import resumePDF from '../assets/nickmolargikresume.pdf';
import opaliteIcon from '../assets/opalite/opaliteicon.png'
import storkIcon from '../assets/stork/storkicon.png';
import mygraIcon from '../assets/mygra/mygraicon.png';
import waffleIcon from '../assets/waffle/waffleicon.png';
import setDeckIcon from '../assets/setdeck/setdeckicon.png';
import opaliteBackground from '../assets/opalite/cardBackground.png';
import mygraBackground from '../assets/mygra/cardBackground.png';
import storkBackground from '../assets/stork/cardBackground.jpg';
import waffleBackground from '../assets/waffle/cardBackground.png';
import setDeckBackground from '../assets/setdeck/cardBackground.png';

// Automatically enable snowfall + accumulation from Nov 1 through Jan 10
const isChristmasSeason = (): boolean => {
  const now = new Date();
  const month = now.getMonth(); // 0-indexed: 0 = Jan, 10 = Nov, 11 = Dec
  const day = now.getDate();
  // Nov 1 - Dec 31 (months 10, 11) or Jan 1-10 (month 0, day <= 10)
  return month >= 10 || (month === 0 && day <= 10);
};
const CHRISTMAS_CHEER = isChristmasSeason();

// Hook to detect prefers-reduced-motion
function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}

export default function Home() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const showSnow = CHRISTMAS_CHEER && !prefersReducedMotion;
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
    { date: "🧇 Available Now", title: "Waffle 1.3", description: "Major visual cleanup, UX improvements", gradient: 'linear-gradient(135deg, #DFA656)'},
    { date: "🏋 Available Now", title: "SetDeck 2.2", description: "Apple Watch App and AI-driven muscle group tracking", gradient: 'linear-gradient(135deg, #65DA92)'},
    { date: "🧠 Available Now", title: "Mygra 1.6", description: "Calendar, Tags, Intensity Tracking, So Much More!", gradient: 'linear-gradient(135deg, #3b82f6)'},
    { date: "🟦 Coming 1/26!", title: "Opalite", description: "The ultimate color manager.", gradient: 'linear-gradient(135deg, #f97316, #facc15, #22c55e, #3b82f6, #a855f7, #ec4899)' },
    { date: "🚂 2026", title: "SwiftTrain", description: "Ready to learn app development?", color: "#f97316" },
  ];

  const snowContainerRef = useRef<HTMLDivElement | null>(null);

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

    .snow-overlay-back {
      position: absolute;
      inset: 0;
      z-index: 0;
      pointer-events: none;
    }

    .snow-overlay-front {
      position: absolute;
      inset: 0;
      z-index: 2;
      pointer-events: none;
    }
      `}</style>
      <Hero
        variant="home"
        heading="Indie Mobile App Development"
        description="Crafting mobile applications that balance elegant design with technical capability — built with Swift, SwiftUI, and SwiftData. Leveraging the latest Apple frameworks to build utilities for medical, fitness, and general use."
        imageSrc={logo}
        platforms={['iOS', 'iPadOS', 'macOS', 'watchOS', 'visionOS', 'tvOS']}
        actionButtons={[
          { label: 'Download Résumé', href: resumePDF, variant: 'primary', download: true },
          { label: 'GitHub', href: 'https://github.com/NMolargik', variant: 'github' },
          { label: 'LinkedIn', href: 'https://linkedin.com/in/nicholas-molargik', variant: 'linkedin' },
        ]}
      />

      {/* Timeline + projects with snowfall */}
      <div
        ref={snowContainerRef}
        className="relative overflow-hidden text-white"
        style={{ backgroundColor: 'rgb(36,36,36)' }}
      >
        {showSnow && (
          <>
            <SnowCanvas containerRef={snowContainerRef} />
            <SnowCapsCanvas containerRef={snowContainerRef} />
          </>
        )}

        {/* New roadmap view */}
        <section className="mx-auto mt-16 w-full max-w-7xl px-6">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight [text-wrap:balance]">Roadmap</h2>
          <div className="mt-6">
            {/* Desktop: horizontal timeline */}
            <ol
              className="relative hidden md:flex md:justify-between border-t-4 border-red-500 dark:border-red-700"
              aria-label="Product roadmap timeline"
            >
              {roadmap.map((item, idx) => (
                <li key={idx} className="relative flex-1" aria-label={`${item.title}: ${item.description || item.date}`}>
                  <span
                    className="absolute left-1/2 -top-[2px] -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full ring-4 ring-white dark:ring-slate-900"
                    style={item.gradient ? { background: item.gradient } : { backgroundColor: item.color || 'var(--accent)' }}
                  />
                  <div className="flex flex-col items-center text-center gap-1 mt-6">
                    <div className="text-sm font-semibold uppercase tracking-wide text-white">
                      {item.date}
                    </div>
                    <div className="text-lg md:text-xl font-bold text-white">
                      {item.title}
                    </div>
                    {item.description && (
                      <p className="text-white max-w-48 text-sm leading-snug text-center">
                        {item.description}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
            {/* Mobile: 2 columns if >3 items, bottom-aligned */}
            <div className={`md:hidden ${roadmap.length > 3 ? 'grid grid-cols-2 gap-x-6 items-end' : ''}`} role="region" aria-label="Product roadmap">
              {roadmap.length > 3 ? (
                <>
                  {/* Left column - first half, max 3 */}
                  <ol className="relative flex flex-col border-s-4 border-red-500 dark:border-red-700" aria-label="Current releases">
                    {roadmap.slice(0, Math.min(3, Math.ceil(roadmap.length / 2))).map((item, idx) => (
                      <li key={idx} className="relative ps-6 py-4" aria-label={`${item.title}: ${item.description || item.date}`}>
                        <span
                          className="absolute left-[-0.5rem] top-1/2 -translate-y-1/2 h-3 w-3 rounded-full ring-4 ring-white dark:ring-slate-900"
                          style={item.gradient ? { background: item.gradient } : { backgroundColor: item.color || 'var(--accent)' }}
                        />
                        <div className="flex flex-col items-start text-start gap-1">
                          <div className="text-sm font-semibold uppercase tracking-wide text-white">
                            {item.date}
                          </div>
                          <div className="text-lg font-bold text-white">
                            {item.title}
                          </div>
                          {item.description && (
                            <p className="text-white text-sm leading-snug">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                  {/* Right column - second half, max 3 */}
                  <ol className="relative flex flex-col border-s-4 border-red-500 dark:border-red-700" aria-label="Upcoming releases">
                    {roadmap.slice(Math.min(3, Math.ceil(roadmap.length / 2)), Math.min(3, Math.ceil(roadmap.length / 2)) + 3).map((item, idx) => (
                      <li key={idx} className="relative ps-6 py-4" aria-label={`${item.title}: ${item.description || item.date}`}>
                        <span
                          className="absolute left-[-0.5rem] top-1/2 -translate-y-1/2 h-3 w-3 rounded-full ring-4 ring-white dark:ring-slate-900"
                          style={item.gradient ? { background: item.gradient } : { backgroundColor: item.color || 'var(--accent)' }}
                        />
                        <div className="flex flex-col items-start text-start gap-1">
                          <div className="text-sm font-semibold uppercase tracking-wide text-white">
                            {item.date}
                          </div>
                          <div className="text-lg font-bold text-white">
                            {item.title}
                          </div>
                          {item.description && (
                            <p className="text-white text-sm leading-snug">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                </>
              ) : (
                <ol className="relative flex flex-col border-s-4 border-red-500 dark:border-red-700" aria-label="Product roadmap timeline">
                  {roadmap.map((item, idx) => (
                    <li key={idx} className="relative ps-6 py-4" aria-label={`${item.title}: ${item.description || item.date}`}>
                      <span
                        className="absolute left-[-0.5rem] top-1/2 -translate-y-1/2 h-3 w-3 rounded-full ring-4 ring-white dark:ring-slate-900"
                        style={item.gradient ? { background: item.gradient } : { backgroundColor: item.color || 'var(--accent)' }}
                      />
                      <div className="flex flex-col items-start text-start gap-1">
                        <div className="text-sm font-semibold uppercase tracking-wide text-white">
                          {item.date}
                        </div>
                        <div className="text-lg font-bold text-white">
                          {item.title}
                        </div>
                        {item.description && (
                          <p className="text-white text-sm leading-snug">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        </section>

        {/* Latest Projects section */}
        <section className="mx-auto mt-16 w-full max-w-7xl px-6 pb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight [text-wrap:balance]">Latest Projects</h2>
          {/* Responsive grid: small = 1 column list, md+ = 2 columns */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14 lg:gap-y-16 py-4">
            <ProjectCard
              title="Opalite - Coming 1/26"
              tagline="The ultimate color manager for designers, developers, and digital artists."
              image={opaliteIcon}
              background={opaliteBackground}
              path="/opalite"
              fitMode="contain"
              index={0}
            />
            <ProjectCard
              title="SetDeck"
              tagline="A gym companion to track & smash workout routines. Every Set Counts!"
              image={setDeckIcon}
              background={setDeckBackground}
              path="/setdeck"
              fitMode="contain"
              index={1}
            />
            <ProjectCard
              title="Mygra"
              tagline="Migraine insights powered by on-device AI."
              image={mygraIcon}
              background={mygraBackground}
              path="/mygra"
              fitMode="contain"
              index={2}
            />
            <ProjectCard
              title="Waffle"
              tagline="Webpage multitasking, managed, on iPad."
              image={waffleIcon}
              background={waffleBackground}
              path="/waffle"
              fitMode="contain"
              index={3}
            />
            <ProjectCard
              title="Stork"
              tagline="Journal and statistics for labor & delivery nurses."
              image={storkIcon}
              background={storkBackground}
              path="/stork"
              fitMode="contain"
              index={4}
            />
          </div>
        </section>

        {/* Call-to-action section */}
        <section className="mx-auto w-full max-w-7xl px-6 pb-24">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-sky-900/40 to-purple-900/40 px-6 py-12 sm:px-12 sm:py-16 text-center">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-60"
            />
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Have an app idea?
            </h2>
            <p className="mt-3 text-base sm:text-lg text-white/80 max-w-xl mx-auto">
              Let's bring your vision to life with native Apple development.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-orange-500 hover:bg-orange-600 px-6 py-3 text-white font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
            >
              Get in Touch
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

type SnowCanvasProps = {
  containerRef: { current: HTMLDivElement | null };
};

function SnowCanvas({ containerRef }: SnowCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = containerRef.current;
    if (!canvas || !parent) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const FLAKE_COUNT = 260;
    const SEGMENTS = 80;

    // Bitmap garland texture across the top edge
    let garlandImage: HTMLImageElement | null = null;
    let garlandPattern: CanvasPattern | null = null;

    const initGarland = () => {
      garlandImage = new Image();
      // Place a seamless garland texture in public/christmas-garland.png
      garlandImage.src = '/assets/christmas-garland.png';
      garlandImage.onload = () => {
        garlandPattern = ctx.createPattern(garlandImage as HTMLImageElement, 'repeat-x');
      };
    };

    initGarland();

    type Flake = {
      x: number;
      y: number;
      r: number;
      vy: number;
      vx: number;
      driftPhase: number;
    };

    let width = 0;
    let height = 0;
    let flakes: Flake[] = [];
    let groundHeights: number[] = [];
    let maxGroundHeight = 0;
    let animationFrameId: number;

    const setupScene = () => {
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight || 400;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      groundHeights = new Array(SEGMENTS).fill(0);
      maxGroundHeight = height * 0.25;

      flakes = new Array(FLAKE_COUNT).fill(null).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height - height,
        r: 1 + Math.random() * 2.2,
        vy: 0.8 + Math.random() * 0.9,
        vx: -0.3 + Math.random() * 0.6,
        driftPhase: Math.random() * Math.PI * 2,
      }));
    };

    setupScene();

    const handleResize = () => {
      setupScene();
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const segWidth = width / SEGMENTS;

      // update flakes
      flakes.forEach((flake) => {
        flake.driftPhase += 0.01;
        const drift = Math.sin(flake.driftPhase) * 0.25;

        flake.x += flake.vx + drift;
        flake.y += flake.vy;

        // wrap horizontally
        if (flake.x < -20) flake.x = width + 20;
        if (flake.x > width + 20) flake.x = -20;

        const idx = Math.max(0, Math.min(SEGMENTS - 1, Math.floor(flake.x / segWidth)));
        const colHeight = groundHeights[idx];

        if (flake.y + flake.r >= height - colHeight) {
          if (colHeight < maxGroundHeight) {
            const added = flake.r * 0.9;
            groundHeights[idx] = colHeight + added;

            // very light smoothing so the pile looks natural
            if (idx > 0) {
              groundHeights[idx - 1] = Math.max(groundHeights[idx - 1], groundHeights[idx] - 4);
            }
            if (idx < SEGMENTS - 1) {
              groundHeights[idx + 1] = Math.max(groundHeights[idx + 1], groundHeights[idx] - 4);
            }
          }

          // respawn flake near the top
          flake.x = Math.random() * width;
          flake.y = -Math.random() * 40;
          flake.vy = 0.8 + Math.random() * 0.9;
          flake.vx = -0.3 + Math.random() * 0.6;
        }
      });

      // draw flakes
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      flakes.forEach((flake) => {
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // draw accumulated snow pile at bottom
      ctx.fillStyle = 'rgba(255,255,255,0.96)';
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let i = 0; i < SEGMENTS; i++) {
        const x = (i / (SEGMENTS - 1)) * width;
        const topY = height - groundHeights[i];
        ctx.lineTo(x, topY);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();

      // draw garland bitmap across the top edge of the snowfall region
      if (garlandPattern && garlandImage) {
        const maxGarlandHeight = Math.min(garlandImage.height, height * 0.25);
        ctx.save();
        ctx.fillStyle = garlandPattern;
        ctx.translate(0, 0);
        ctx.fillRect(0, 0, width, maxGarlandHeight);
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      ctx.clearRect(0, 0, width, height);
    };
  }, [containerRef]);

  return <canvas ref={canvasRef} className="snow-overlay-back" />;
}

type SnowCapsCanvasProps = {
  containerRef: { current: HTMLDivElement | null };
};

function SnowCapsCanvas({ containerRef }: SnowCapsCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = containerRef.current;
    if (!canvas || !parent) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const FLAKE_COUNT = 260;
    const CORNER_INSET = 24; // pixels to avoid drawing snow on rounded card corners

    type Flake = {
      x: number;
      y: number;
      r: number;
      vy: number;
      vx: number;
      driftPhase: number;
    };

    type SettledFlake = {
      x: number;
      r: number;
    };

    type CardLedge = {
      left: number;
      right: number;
      top: number;
      settled: SettledFlake[];
      maxSettled: number;
    };

    let width = 0;
    let height = 0;
    let flakes: Flake[] = [];
    let ledges: CardLedge[] = [];
    let animationFrameId: number;

    const setupScene = () => {
      if (!parent) return;
      const containerRect = parent.getBoundingClientRect();

      width = parent.clientWidth;
      height = parent.clientHeight || 400;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Find project cards to accumulate on
      const nodes = parent.querySelectorAll('[data-snow-card="true"]') as NodeListOf<HTMLElement>;
      ledges = Array.from(nodes).map((el) => {
        const r = el.getBoundingClientRect();
        return {
          left: r.left - containerRect.left,
          right: r.right - containerRect.left,
          top: r.top - containerRect.top,
          settled: [],
          maxSettled: 80,
        };
      });

      flakes = new Array(FLAKE_COUNT).fill(null).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height - height,
        r: 1 + Math.random() * 2,
        vy: 0.7 + Math.random() * 0.9,
        vx: -0.25 + Math.random() * 0.5,
        driftPhase: Math.random() * Math.PI * 2,
      }));
    };

    setupScene();

    const handleResize = () => {
      setupScene();
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // update flakes
      flakes.forEach((flake) => {
        flake.driftPhase += 0.012;
        const drift = Math.sin(flake.driftPhase) * 0.25;
        flake.x += flake.vx + drift;
        flake.y += flake.vy;

        if (flake.x < -20) flake.x = width + 20;
        if (flake.x > width + 20) flake.x = -20;

        // collisions with card tops: let flakes "stick" to the top edge
        for (let i = 0; i < ledges.length; i++) {
          const ledge = ledges[i];
          const innerLeft = ledge.left + CORNER_INSET;
          const innerRight = ledge.right - CORNER_INSET;
          if (
            innerRight > innerLeft &&
            flake.x >= innerLeft &&
            flake.x <= innerRight &&
            flake.y + flake.r >= ledge.top
          ) {
            if (ledge.settled.length < ledge.maxSettled) {
              ledge.settled.push({
                x: flake.x,
                r: flake.r * 1.3,
              });
            }
            // respawn flake somewhere above
            flake.x = Math.random() * width;
            flake.y = -Math.random() * 40;
            flake.vy = 0.7 + Math.random() * 0.9;
            flake.vx = -0.25 + Math.random() * 0.5;
            break;
          }
        }
      });

      // draw flakes (foreground)
      ctx.fillStyle = 'rgba(255,255,255,0.96)';
      flakes.forEach((flake) => {
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // draw settled flakes sitting on the top edge of each card
      ledges.forEach((ledge) => {
        if (!ledge.settled.length) return;

        ctx.fillStyle = 'rgba(255,255,255,0.98)';
        ledge.settled.forEach((sf) => {
          const innerLeft = ledge.left + CORNER_INSET;
          const innerRight = ledge.right - CORNER_INSET;
          if (innerRight <= innerLeft) return;

          const clampedX = Math.max(innerLeft + sf.r, Math.min(innerRight - sf.r, sf.x));
          const y = ledge.top - sf.r * 0.8;
          ctx.beginPath();
          ctx.arc(clampedX, y, sf.r, Math.PI, 0, false); // half-circle sitting on the edge
          ctx.fill();
        });
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      ctx.clearRect(0, 0, width, height);
    };
  }, [containerRef]);

  return <canvas ref={canvasRef} className="snow-overlay-front" />;
}