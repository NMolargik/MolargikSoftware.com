import { useEffect, useRef } from 'react';
import ProjectCard from '../components/ProjectCard';
import HomeHero from '../components/HomeHero';
import opaliteIcon from '../assets/opalite/opaliteicon.png'
import storkIcon from '../assets/stork/storkicon.png';
import mygraIcon from '../assets/mygra/mygraicon.png';
import waffleIcon from '../assets/waffle/waffleicon.png';
import setDeckIcon from '../assets/setdeck/setdeckicon.png';
import opaliteBackground from '../assets/opalite/cardBackground.png';
import mygraBackground from '../assets/mygra/cardBackground.png';
import storkBackground from '../assets/stork/cardBackground.png';
import waffleBackground from '../assets/waffle/cardBackground.png';
import setDeckBackground from '../assets/setdeck/cardBackground.png';

const CHRISTMAS_CHEER = true; // toggle this to enable/disable the snowfall + accumulation

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
    { date: "☃️ Launching Soon!", title: "Opalite", description: "The ultimate color manager.", gradient: 'linear-gradient(135deg, #f97316, #facc15, #22c55e, #3b82f6, #a855f7, #ec4899)' },
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
      <HomeHero />

      {/* Timeline + projects with snowfall */}
      <div
        ref={snowContainerRef}
        className="relative overflow-hidden text-white"
        style={{ backgroundColor: 'rgb(36,36,36)' }}
      >
        {CHRISTMAS_CHEER && (
          <>
            <SnowCanvas containerRef={snowContainerRef} />
            <SnowCapsCanvas containerRef={snowContainerRef} />
          </>
        )}

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
                    <div className="text-sm font-semibold uppercase tracking-wide text-white">
                      {item.date}
                    </div>
                    <div className="text-lg md:text-xl font-bold text-white">
                      {item.title}
                    </div>
                    {item.description && (
                      <p className="text-white">
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
          {/* Responsive list: mobile = horizontal carousel, md+ = 2-column grid */}
          <div className="relative md:static">
            {/* Responsive grid: small = 1 column list, md+ = 2 columns */}
            <div className="transition-all duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14 lg:gap-y-16 py-4">
                <ProjectCard
                  title="Opalite - Launching Very Soon!"
                  tagline="The ultimate color companion for designers, developers, and digital artists."
                  image={opaliteIcon}
                  background={opaliteBackground}
                  path="/opalite"
                  fitMode="contain"
                />
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