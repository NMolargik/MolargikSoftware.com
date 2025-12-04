import React, { useEffect, useState } from 'react';
import setDeckIcon from '../assets/setdeck/setdeckicon.png';
import Hero from '../components/Hero';
import screen1 from '../assets/setdeck/screen1.png';
import screen2 from '../assets/setdeck/screen2.png';
import screen3 from '../assets/setdeck/screen3.png';
import screen4 from '../assets/setdeck/screen4.png';
import screen5 from '../assets/setdeck/screen5.png';
import screen6 from '../assets/setdeck/screen6.png';
import screen7 from '../assets/setdeck/screen7.png';
import screen8 from '../assets/setdeck/screen8.png';
import ScreensCarousel from '../components/ScreensCarousel';

export default function SetDeck() {
  const slides = [screen1, screen2, screen3, screen4, screen5, screen6, screen7, screen8];
  const carouselRefDesktop = React.useRef<HTMLDivElement | null>(null);
  const carouselRefMobile = React.useRef<HTMLDivElement | null>(null);

  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
  const markLoaded = (i: number) => setLoaded(prev => ({ ...prev, [i]: true }));

  useEffect(() => {
    document.title = 'SetDeck – Track Your Gym Progress | Nick Molargik';
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
        :root { --accent: #65AA00; }
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
          buttonHref="https://apps.apple.com/us/app/setdeck/id6484503374"
          systemRequirements={["iOS 26+", "iPadOS 26+"]}
        />
      </section>
      {/* Responsive screenshots section */}
      <section
        className="pb-24 text-white"
        style={{ backgroundColor: 'rgb(36,36,36)' }}
      >
        <div className="pt-12">
        <ScreensCarousel
          slides={slides}
          loaded={loaded}
          offset={0}
          markLoaded={markLoaded}
          desktopRef={carouselRefDesktop}     
          mobileRef={carouselRefMobile}
          altPrefix="SetDeck"
        />
        {/* Large text area below images */}
        <section
          aria-label="About SetDeck"
          className="mt-16 px-4"
        >
          <div className="mx-auto max-w-5xl">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-6 py-10 shadow-[0_18px_45px_rgba(0,0,0,0.7)] sm:px-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#65DA92] to-transparent opacity-80"
              />
              <div className="relative space-y-6">
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
                  SetDeck — Your Complete Workout Routine Companion
                </h2>
                <p className="text-base sm:text-lg leading-relaxed text-white/80">
                  Crush every workout with structured routines, track every set you complete, and stay on top of your hydration and energy goals—all in one beautifully streamlined app.
                </p>

                <hr className="my-6 border-white/10" />

                <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-white">
                        What is SetDeck?
                      </h3>
                      <p className="mt-2 text-base sm:text-lg leading-relaxed text-white/80">
                        SetDeck is a modern fitness companion built for people who want structure, progression, and clarity.
                        Whether you’re following a weekly routine or building your own from scratch, SetDeck guides you through
                        every exercise set by set while automatically tracking your performance over time. Plus: quickly log
                        water intake, calorie intake, and other daily stats with a single swipe.
                      </p>
                    </div>

                    <hr className="my-6 border-white/10 lg:hidden" />

                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-white">
                        Why Choose SetDeck?
                      </h3>
                      <p className="mt-2 text-base sm:text-lg leading-relaxed text-white/80">
                        SetDeck is built for lifters, athletes, and anyone who wants a structured, measurable path toward real
                        progress. With a clean UI designed around clarity and speed, every workout becomes easier to follow—and
                        every metric becomes easier to track.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-white">
                        Start Building a Stronger You
                      </h3>
                      <p className="mt-2 text-base sm:text-lg leading-relaxed text-white/80">
                        Download SetDeck today and take control of your training—one set at a time.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 lg:mt-0">
                    <h3 className="text-xl sm:text-2xl font-semibold text-white">
                      Key Features
                    </h3>
                    <div className="mt-4 grid gap-4">
                      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5 shadow-inner">
                        <h4 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                          <span className="text-lg">📅</span>
                          <span>Daily Routines, Clearly Organized</span>
                        </h4>
                        <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/75">
                          Create or customize your weekly workout routine with up to seven distinct training days. Each day holds
                          its own list of exercises to keep your sessions focused and intentional.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5 shadow-inner">
                        <h4 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                          <span className="text-lg">🏋️</span>
                          <span>Set-By-Set Workout Flow</span>
                        </h4>
                        <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/75">
                          Every exercise includes one or more sets—with reps, weight, RPE, or duration. As you train, log your
                          actual results to track true progress.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5 shadow-inner">
                        <h4 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                          <span className="text-lg">📈</span>
                          <span>Automatic Set History &amp; Strength Progression</span>
                        </h4>
                        <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/75">
                          SetDeck saves a history entry every time you complete a set. Over weeks and months, your stats reveal
                          patterns, trends, and areas of growth—helping you outlift your past self every session.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5 shadow-inner">
                        <h4 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                          <span className="text-lg">💧🔥</span>
                          <span>Water &amp; Energy Tracking</span>
                        </h4>
                        <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/75">
                          Swipe to log water consumed or calories taken in. See your hydration and intake trends over time to
                          ensure you’re fueling properly for your training.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5 shadow-inner">
                        <h4 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                          <span className="text-lg">📊</span>
                          <span>Insightful Trends &amp; Analytics</span>
                        </h4>
                        <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/75">
                          View your patterns for hydration, calories, and—new with SetDeck—your strength performance across
                          exercises and sets.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5 shadow-inner">
                        <h4 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                          <span className="text-lg">🔧</span>
                          <span>Custom Routine Builder</span>
                        </h4>
                        <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/75">
                          Build new routines in seconds and shape your ideal training week.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5 shadow-inner">
                        <h4 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                          <span className="text-lg">📱</span>
                          <span>Home Screen Widgets</span>
                        </h4>
                        <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/75">
                          Add SetDeck widgets to your Home Screen to instantly see today’s water intake and calorie consumption at a glance.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        </div>
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