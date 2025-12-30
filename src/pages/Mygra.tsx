import React, { useState } from 'react';
import mygraicon from '../assets/mygra/mygraicon.png';
import Hero from '../components/Hero';
import screen1 from '../assets/mygra/screen1.png';
import screen2 from '../assets/mygra/screen2.png';
import screen3 from '../assets/mygra/screen3.png';
import screen4 from '../assets/mygra/screen4.png';
import screen5 from '../assets/mygra/screen5.png';
import screen6 from '../assets/mygra/screen6.png';
import screen7 from '../assets/mygra/screen7.png';
import screen8 from '../assets/mygra/screen8.png';
import screen9 from '../assets/mygra/screen9.png';
import screen10 from '../assets/mygra/screen10.png';
import screen11 from '../assets/mygra/screen11.png';
import screen12 from '../assets/mygra/screen12.png';
import screen13 from '../assets/mygra/screen13.png';
import screen14 from '../assets/mygra/screen14.png';
import ScreensCarousel from '../components/ScreensCarousel';
import { usePageMeta, useScrollToStart } from '../hooks';

// Official brand color: Mygra Purple
const ACCENT_COLOR = '#6E60FF';

export default function Mygra() {
  const slides: string[] = [screen1, screen2, screen3, screen4, screen5, screen6, screen7, screen8, screen9, screen10, screen11, screen12, screen13, screen14];

  const carouselRefDesktop = React.useRef<HTMLDivElement | null>(null);
  const carouselRefMobile = React.useRef<HTMLDivElement | null>(null);

  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
  const markLoaded = (i: number) => setLoaded(prev => ({ ...prev, [i]: true }));

  usePageMeta({
    title: 'Mygra – Intelligent Migraine Journal | Nick Molargik',
    description: 'Log migraines fast, get on‑device AI insights, see weather correlations, and integrate with Apple Health. Private by default.',
    accentColor: ACCENT_COLOR,
    preloadImage: mygraicon,
  });

  useScrollToStart(carouselRefDesktop, carouselRefMobile);

  return (
    <>
    <style>{`
      :root { --accent: ${ACCENT_COLOR}; }
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
        heading="Mygra"
        description="Your Intelligent Migraine Journal."
        imageSrc={mygraicon}
        buttonHref="https://apps.apple.com/us/app/mygra/id6747298583"
        systemRequirements={["iOS 18+", "iPadOS 18+", "watchOS 10.6+"]}
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
          altPrefix="Mygra"
        />
        {/* Large text area below images */}
        <section
          aria-label="About Mygra"
          className="mt-16 px-4"
        >
          <div className="mx-auto max-w-5xl">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-6 py-10 shadow-[0_18px_45px_rgba(0,0,0,0.7)] sm:px-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#6E60FF] to-transparent opacity-80"
              />
              <div className="relative space-y-6">
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
                  Mygra — Your Intelligent Migraine Journal.
                </h2>
                <p className="text-base sm:text-lg leading-relaxed text-white/80">
                  Take control of your migraines with Mygra – a supportive, intelligent migraine companion that helps you
                  uncover patterns, avoid triggers, and find relief. Log each headache in seconds, harness private on‑device
                  AI for personal insights, and discover what truly helps you feel better. Plus, Mygra syncs securely via
                  iCloud across your Apple devices and integrates with Apple Health for a 360° view of your well‑being.
                </p>

                <hr className="my-6 border-white/10" />

                <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-white">
                        What is Mygra?
                      </h3>
                      <p className="mt-2 text-base sm:text-lg leading-relaxed text-white/80">
                        Mygra is a modern migraine journal designed to help you understand what&apos;s really going on with your
                        headaches. Capture rich details about each episode, connect the dots across your history, and bring clear,
                        organized data to your next doctor visit or personal review.
                      </p>
                    </div>

                    <hr className="my-6 border-white/10 lg:hidden" />

                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-white">
                        Smarter Insights with On‑Device AI
                      </h3>
                      <p className="mt-2 text-base sm:text-lg leading-relaxed text-white/80">
                        Mygra uses Apple&apos;s on‑device intelligence to power the Migraine Assistant, surfacing patterns and
                        potential triggers from your data—all while keeping your information private on your device. Over time,
                        you&apos;ll see clearer trends in frequency, severity, and what might be contributing to your pain.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-white">
                        Powerful Filters &amp; Organization
                      </h3>
                      <p className="mt-2 text-base sm:text-lg leading-relaxed text-white/80">
                        With flexible filtering and pinned episodes, Mygra makes it easy to zoom in on your most important
                        migraines—by severity, time period, trigger type, and more—so you can focus on the events that matter most.
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
                          <span className="text-lg">📝</span>
                          <span>Fast, Detailed Migraine Logging</span>
                        </h4>
                        <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/75">
                          Log migraine episodes in seconds—capture date, time, severity, duration, and important context like
                          triggers, foods, medications, and treatments so nothing gets lost.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5 shadow-inner">
                        <h4 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                          <span className="text-lg">📍</span>
                          <span>Pinned &amp; Important Episodes</span>
                        </h4>
                        <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/75">
                          Pin significant migraines for quick access and focused review—perfect for tracking breakthrough pain
                          or episodes you want to discuss with your care team.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5 shadow-inner">
                        <h4 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                          <span className="text-lg">🤖</span>
                          <span>Migraine Assistant with On‑Device AI</span>
                        </h4>
                        <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/75">
                          Apple Intelligence helps identify potential sources of your migraines using your own history, with all
                          analysis performed privately on your device.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5 shadow-inner">
                        <h4 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                          <span className="text-lg">🌦️</span>
                          <span>Weather Correlations</span>
                        </h4>
                        <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/75">
                          See how changes in pressure, humidity, temperature, and more correlate with your migraine episodes,
                          helping you anticipate and prepare for trouble days.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5 shadow-inner">
                        <h4 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                          <span className="text-lg">❤️</span>
                          <span>Apple Health Integration</span>
                        </h4>
                        <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/75">
                          Connect with Apple Health (HealthKit) to compare migraines with factors like sleep quality, exercise,
                          and other health metrics for a more complete picture.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5 shadow-inner">
                        <h4 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                          <span className="text-lg">🔍</span>
                          <span>Advanced Filters &amp; Views</span>
                        </h4>
                        <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/75">
                          Filter by severity, trigger type, time range, and more to zoom in on specific groups of migraines and
                          understand patterns across your history.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5 shadow-inner">
                        <h4 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                          <span className="text-lg">☁️</span>
                          <span>iCloud Sync Across Devices</span>
                        </h4>
                        <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/75">
                          Keep your migraine journal in sync across iPhone and iPad with secure iCloud support, so your history
                          is always available when you need it.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="mt-8 text-sm italic text-white/70">
                  Some of Mygra&apos;s features require iOS 26 and iPadOS 26. Others require access to Apple Intelligence.
                </p>
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
            "name": "Mygra",
            "applicationCategory": "HealthApplication",
            "operatingSystem": "iOS, iPadOS, watchOS",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "url": "https://apps.apple.com/us/app/mygra/id6747298583"
          })
        }}
      />
    </>
  );
}