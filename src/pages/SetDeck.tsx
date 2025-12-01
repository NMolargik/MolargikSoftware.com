import React, { useEffect, useState } from 'react';
import setDeckIcon from '../assets/setdeck/setdeckicon.png';
import Hero from '../components/Hero';
import screen1 from '../assets/setdeck/screen1.png';
import screen2 from '../assets/setdeck/screen2.png';
import screen3 from '../assets/setdeck/screen3.png';
import screen4 from '../assets/setdeck/screen4.png';

export default function SetDeck() {
  const slides = [screen1, screen2, screen3, screen4];
  const carouselRefDesktop = React.useRef<HTMLDivElement | null>(null);
  const carouselRefMobile = React.useRef<HTMLDivElement | null>(null);

  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
  const markLoaded = (i: number) => setLoaded(prev => ({ ...prev, [i]: true }));

  useEffect(() => {
    document.title = 'Ready, Set – Track Your Gym Progress | Nick Molargik';
    const desc = 'Effortless workout logging with set-by-set tracking, water & calories, trends, and HealthKit. Built with Swift & SwiftUI.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = desc;
    // Set accent color for navbar hover on SetDeck
    document.documentElement.style.setProperty('--accent', '#65DA92');
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = setDeckIcon as unknown as string;
    document.head.appendChild(link);

    const scrollToStart = () => {
      if (carouselRefDesktop.current) {
        carouselRefDesktop.current.scrollTo({ left: 0, behavior: 'auto' });
      }
      if (carouselRefMobile.current) {
        carouselRefMobile.current.scrollTo({ left: 0, behavior: 'auto' });
      }
    };
    scrollToStart();
    requestAnimationFrame(scrollToStart);
    window.addEventListener('load', scrollToStart);

    return () => {
      window.removeEventListener('load', scrollToStart);
      document.head.removeChild(link);
    };
  }, []);

  return (
    <>
      <style>{`
        :root { --accent: #22c55e; }
        header nav a:hover, nav a:hover, .nav-link:hover {
          color: var(--accent) !important;
        }
        header nav a:focus-visible, nav a:focus-visible, .nav-link:focus-visible {
          outline: 2px solid color-mix(in oklab, var(--accent), white 25%);
          outline-offset: 2px;
          border-radius: 6px;
        }
      `}</style>
      <section className="bg-white/10 backdrop-blur-xl ring-1 ring-white/15 rounded-3xl">
        <Hero
          heading="SetDeck"
          description="Crush every workout with structured routines, track every set you complete, and stay on top of your hydration and energy goals. Now also available on iPad!"
          imageSrc={setDeckIcon}
          buttonText="View on the App Store"
          buttonColorClass="bg-green-500 text-white hover:text-white hover:bg-green-600"
          buttonHref="https://apps.apple.com/us/app/ready-set/id6484503374"
          systemRequirements={["iOS 26+", "iPadOS 26+"]}
        />
      </section>
      {/* Responsive screenshots section */}
      <section className="mt-12 pb-24">
        {/* Desktop & large screens: horizontally scrollable images */}
        <div className="hidden md:block px-4">
          <div
            ref={carouselRefDesktop}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 justify-start md:justify-center"
          >
            {slides.map((src, idx) => (
              <div key={idx} className="relative flex-none h-96 w-auto snap-start">
                {!loaded[idx] && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-8 w-8 rounded-full border-2 border-black/20 dark:border-white/30 border-t-black/60 dark:border-t-white animate-spin" />
                  </div>
                )}
                <img
                  src={src}
                  alt={`SetDeck screenshot ${idx + 1}`}
                  width={1170}
                  height={2532}
                  loading="lazy"
                  className={`h-96 w-auto object-contain transition-opacity duration-300 ${loaded[idx] ? "opacity-100" : "opacity-0"}`}
                  onLoad={() => markLoaded(idx)}
                />
              </div>
            ))}
          </div>
        </div>
        {/* Small screens: seamless horizontal banner */}
        <div className="md:hidden mt-2">
          <div
            ref={carouselRefMobile}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 justify-start md:justify-center"
          >
            {slides.map((src, idx) => (
              <div key={idx} className="relative flex-none h-80 w-auto snap-start">
                {!loaded[idx] && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-8 w-8 rounded-full border-2 border-black/20 dark:border-white/30 border-t-black/60 dark:border-t-white animate-spin" />
                  </div>
                )}
                <img
                  src={src}
                  alt={`SetDeck screenshot ${idx + 1}`}
                  width={1170}
                  height={2532}
                  loading="lazy"
                  className={`h-80 w-auto object-contain transition-opacity duration-300 ${loaded[idx] ? "opacity-100" : "opacity-0"}`}
                  onLoad={() => markLoaded(idx)}
                />
              </div>
            ))}
          </div>
        </div>
        {/* Large text area below images */}
        <section>
          <div className="mt-10 max-w-3xl mx-auto px-4">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold tracking-tight">
                SetDeck — Your Complete Workout Routine Companion
              </h2>
              <p className="text-lg leading-relaxed">
                Crush every workout with structured routines, track every set you complete, and stay on top of your hydration and energy goals—all in one beautifully streamlined app.
              </p>

              <h3 className="text-2xl font-semibold mt-8">What is SetDeck?</h3>
              <p className="text-lg leading-relaxed">
                SetDeck is a modern fitness companion built for people who want structure, progression, and clarity. Whether you’re following a weekly routine or building your own from scratch, SetDeck guides you through every exercise set by set while automatically tracking your performance over time. Plus: quickly log water intake, calorie intake, and other daily stats with a single swipe.
              </p>

              <hr className="my-8 border-white/10" />

              <h3 className="text-2xl font-semibold mt-4">Key Features</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xl font-semibold">📅 Daily Routines, Clearly Organized</h4>
                  <p className="text-lg leading-relaxed">
                    Create or customize your weekly workout routine with up to seven distinct training days. Each day holds its own list of exercises to keep your sessions focused and intentional.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold">🏋️ Set-By-Set Workout Flow</h4>
                  <p className="text-lg leading-relaxed">
                    Every exercise includes one or more sets—with reps, weight, RPE, or duration. As you train, log your actual results to track true progress.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold">📈 Automatic Set History &amp; Strength Progression</h4>
                  <p className="text-lg leading-relaxed">
                    SetDeck saves a history entry every time you complete a set. Over weeks and months, your stats reveal patterns, trends, and areas of growth—helping you outlift your past self every session.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold">💧 Water &amp; 🔥 Energy Tracking</h4>
                  <p className="text-lg leading-relaxed">
                    Swipe to log water consumed or calories taken in. See your hydration and intake trends over time to ensure you’re fueling properly for your training.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold">📊 Insightful Trends &amp; Analytics</h4>
                  <p className="text-lg leading-relaxed">
                    View your patterns for hydration, calories, and—new with SetDeck—your strength performance across exercises and sets.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold">🔧 Custom Routine Builder</h4>
                  <p className="text-lg leading-relaxed">
                    Build new routines in seconds and shape your ideal training week.
                  </p>
                </div>
              </div>

              <hr className="my-8 border-white/10" />

              <h3 className="text-2xl font-semibold mt-4">Why Choose SetDeck?</h3>
              <p className="text-lg leading-relaxed">
                SetDeck is built for lifters, athletes, and anyone who wants a structured, measurable path toward real progress. With a clean UI designed around clarity and speed, every workout becomes easier to follow—and every metric becomes easier to track.
              </p>

              <hr className="my-8 border-white/10" />

              <h3 className="text-2xl font-semibold mt-4">Start Building a Stronger You</h3>
              <p className="text-lg leading-relaxed">
                Download SetDeck today and take control of your training—one set at a time.
              </p>
            </div>
          </div>
        </section>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "SetDeck",
            "applicationCategory": "FitnessApplication",
            "operatingSystem": "iOS, iPadOS",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "url": "https://apps.apple.com/us/app/ready-set/id6484503374",
            "description": "SetDeck is a structured workout companion that tracks routines, sets, hydration, calories, and long-term strength progression."
          })
        }}
      />
    </>
  );
}