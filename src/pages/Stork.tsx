import React, { useEffect, useState } from 'react';
import storkicon from '../assets/stork/storkicon.png';
import Hero from '../components/Hero';
import screen1 from '../assets/stork/screen1.png';
import screen2 from '../assets/stork/screen2.png';
import screen3 from '../assets/stork/screen3.png';
import screen4 from '../assets/stork/screen4.png';
import screen5 from '../assets/stork/screen5.png';
import screen6 from '../assets/stork/screen6.png';
import screen7 from '../assets/stork/screen7.png';
import screen8 from '../assets/stork/screen8.png';
import screen9 from '../assets/stork/screen9.png';
import ScreensCarousel from '../components/ScreensCarousel';

export default function Stork() {
  const slides = [screen1, screen2, screen3, screen4, screen5, screen6, screen7, screen8, screen9];
  const carouselRefDesktop = React.useRef<HTMLDivElement | null>(null);
  const carouselRefMobile = React.useRef<HTMLDivElement | null>(null);

  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
  const markLoaded = (i: number) => setLoaded(prev => ({ ...prev, [i]: true }));

  useEffect(() => {
    document.title = 'Stork – Delivery Stats for L&D Nurses | Nick Molargik';
    const desc = 'Track baby deliveries and trends with Stork. Log details, analyze stats, collaborate with peers. Built with Swift & SwiftUI.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = desc;
    // Set accent color for navbar hover on Stork
    document.documentElement.style.setProperty('--accent', '#f97316'); // orange-500
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = storkicon as unknown as string;
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
        :root { --accent: #f97316; }
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
          heading="Stork - Delivery Stats"
          description="Journal and statistics for labor & delivery nurses."
          imageSrc={storkicon}
          buttonHref="https://apps.apple.com/us/app/stork-delivery-stats/id6740038476"
          systemRequirements={["iOS 18+", "iPadOS 18+"]}
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
          altPrefix="Stork"
        />
        {/* Large text area below images */}
        <section
          aria-label="About Stork"
          className="mt-16 px-4"
        >
          <div className="mx-auto max-w-5xl">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-6 py-10 shadow-[0_18px_45px_rgba(0,0,0,0.7)] sm:px-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#f97316] to-transparent opacity-80"
              />
              <div className="relative space-y-6">
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
                  Stork — Labor &amp; Delivery Companion
                </h2>
                <p className="text-base sm:text-lg leading-relaxed text-white/80">
                  Stork helps medical professionals track baby deliveries, visualize trends, and celebrate every birth.
                  Designed for Labor &amp; Delivery nurses, midwives, and OB-GYNs, Stork makes it simple to record, review,
                  and analyze delivery data — all in one intuitive iOS app.
                </p>

                <hr className="my-6 border-white/10" />

                <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-white">
                        What is Stork?
                      </h3>
                      <p className="mt-2 text-base sm:text-lg leading-relaxed text-white/80">
                        Stork is a focused companion for Labor &amp; Delivery professionals who want a clear picture of their work.
                        Log every delivery with important context, track your impact over weeks and months, and bring real numbers
                        into conversations with peers and leadership.
                      </p>
                    </div>

                    <hr className="my-6 border-white/10 lg:hidden" />

                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-white">
                        Designed for Busy L&amp;D Teams
                      </h3>
                      <p className="mt-2 text-base sm:text-lg leading-relaxed text-white/80">
                        Stork is built for fast, repeatable entries that fit naturally into your shift. Instead of juggling
                        scattered notes and spreadsheets, you can rely on a single, well-organized app that keeps your delivery
                        history at your fingertips.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-white">
                        Celebrate Every Birth
                      </h3>
                      <p className="mt-2 text-base sm:text-lg leading-relaxed text-white/80">
                        With the Marble Jar and visual stats, Stork turns your delivery history into something you can see and be
                        proud of—a tangible reminder of the lives you&apos;ve helped bring into the world.
                      </p>
                    </div>

                    <div className="mt-8 space-y-3">
                      <h3 className="text-xl sm:text-2xl font-semibold text-white">
                        <span className="font-semibold">Perfect for:</span> Labor &amp; Delivery nurses, midwives, OB-GYNs, and
                        maternity unit staff.
                      </h3>
                      <p className="text-base sm:text-lg leading-relaxed text-white/80">
                        Whether you&apos;re tracking your own deliveries or analyzing department trends, Stork streamlines your
                        workflow, helps visualize your impact, and keeps every birth beautifully organized.
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
                          <span className="text-lg">🍼</span>
                          <span>Track Every Delivery</span>
                        </h4>
                        <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/75">
                          Record detailed information for each baby delivery — including gender, birth date, hospital, and
                          delivery notes. Each entry adds to your Marble Jar, a beautiful visualization of weekly delivery trends.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5 shadow-inner">
                        <h4 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                          <span className="text-lg">🏥</span>
                          <span>Explore Hospital Data</span>
                        </h4>
                        <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/75">
                          Search hospitals with active delivery departments, view facility details, and set your default hospital
                          to keep logs consistent and accurate.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5 shadow-inner">
                        <h4 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                          <span className="text-lg">📊</span>
                          <span>View Trends &amp; Statistics</span>
                        </h4>
                        <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/75">
                          See your work come to life with charts and summaries that highlight delivery counts, baby gender ratios,
                          and other helpful insights over time.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5 shadow-inner">
                        <h4 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                          <span className="text-lg">📱</span>
                          <span>Built for iOS &amp; iPadOS</span>
                        </h4>
                        <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/75">
                          Powered by Swift and SwiftUI for a smooth, responsive experience on iPhone and iPad. Stork supports iOS
                          and iPadOS 18+, and is designed to feel at home on every Apple device.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5 shadow-inner">
                        <h4 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                          <span className="text-lg">🔔</span>
                          <span>Home Screen Widget</span>
                        </h4>
                        <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/75">
                          Quickly check how many deliveries you&apos;ve logged this week—right from your Home Screen, without
                          opening the app.
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
            "name": "Stork – Delivery Stats",
            "applicationCategory": "MedicalApplication",
            "operatingSystem": "iOS",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "url": "https://apps.apple.com/us/app/stork-delivery-stats/id6740038476"
          })
        }}
      />
    </>
  );
}