import React, { useEffect, useState } from 'react';
import mygraicon from '../assets/mygra/mygraicon.png';
import Hero from '../components/Hero';


import screen1 from '../assets/mygra/screen1.png';
import screen2 from '../assets/mygra/screen2.png';
import screen3 from '../assets/mygra/screen3.png';
import screen4 from '../assets/mygra/screen4.png';
import screen5 from '../assets/mygra/screen5.png';

export default function Mygra() {
  const slides: string[] = [screen1, screen2, screen3, screen4, screen5];

  const carouselRefDesktop = React.useRef<HTMLDivElement | null>(null);
  const carouselRefMobile = React.useRef<HTMLDivElement | null>(null);

  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
  const markLoaded = (i: number) => setLoaded(prev => ({ ...prev, [i]: true }));

  useEffect(() => {
    document.title = 'Mygra – Intelligent Migraine Journal | Nick Molargik';
    const desc = 'Log migraines fast, get on‑device AI insights, see weather correlations, and integrate with Apple Health. Private by default.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = desc;
    // Set accent color for navbar hover on Mygra
    document.documentElement.style.setProperty('--accent', '#a855f7'); // purple-500
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = mygraicon as unknown as string;
    document.head.appendChild(link);

    const scrollToStart = () => {
      if (carouselRefDesktop.current) {
        carouselRefDesktop.current.scrollTo({ left: 0, behavior: 'auto' });
      }
      if (carouselRefMobile.current) {
        carouselRefMobile.current.scrollTo({ left: 0, behavior: 'auto' });
      }
    };
    // attempt immediately, next frame, and after full load (covers image decode timing)
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
      :root { --accent: #a855f7; }
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
        buttonText="View on the App Store"
        buttonColorClass="bg-purple-500 text-white hover:text-white hover:bg-purple-600"
        buttonHref="https://apps.apple.com/us/app/mygra/id6747298583"
        systemRequirements={["iOS 18+", "iPadOS 18+", "watchOS 10.6+"]}
      />
    </section>

      {/* Responsive screenshots section */}
      <section className="mt-12 pb-24">
        {/* Desktop & large screens: 5 images in a single row */}
        <div className="hidden md:block px-4">
          <div ref={carouselRefDesktop} className="flex overflow-x-auto snap-x snap-mandatory gap-6 justify-start md:justify-center">
            {slides.map((src, idx) => (
              <div key={idx} className="relative flex-none h-96 w-auto snap-start">
                {!loaded[idx] && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-8 w-8 rounded-full border-2 border-black/20 dark:border-white/30 border-t-black/60 dark:border-t-white animate-spin" />
                  </div>
                )}
                <img
                  src={src}
                  alt={`Mygra screenshot ${idx + 1}`}
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
                  alt={`Mygra screenshot ${idx + 1}`}
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
        <div className="mt-10 max-w-3xl mx-auto px-4">
          <div>
            <h2 className="text-4xl font-bold tracking-tight mb-6">Mygra: Your Intelligent Migraine Journal.</h2>
            <p className="text-lg leading-relaxed">
              Take control of your migraines with Mygra – a supportive, intelligent migraine companion that helps you
              uncover patterns, avoid triggers, and find relief. Log each headache in seconds, harness private on‑device
              AI for personal insights, and discover what truly helps you feel better. Plus, Mygra syncs securely via
              iCloud across your Apple devices and integrates with Apple Health for a 360° view of your well‑being.
            </p>

            <h3 className="text-2xl font-semibold mt-10 mb-4">Log Migraines with Ease</h3>
            <ul className="list-disc pl-6 space-y-3 text-lg leading-relaxed">
              <li>
                <strong>Fast, detailed entries:</strong> Record migraine episodes in seconds – capture date, time, severity,
                duration, plus key details like triggers, foods, medications, and treatments.
              </li>
              <li>
                <strong>Pin important events:</strong> Mark significant migraines with a pin for quick reference later.
              </li>
              <li>
                <strong>Flexible editing:</strong> Swipe to edit or delete entries anytime as your information changes.
              </li>
            </ul>

            <h3 className="text-2xl font-semibold mt-10 mb-4">Smarter Insights with On‑Device AI</h3>
            <ul className="list-disc pl-6 space-y-3 text-lg leading-relaxed">
              <li>
                <strong>Personal Migraine Assistant:</strong> Apple’s on‑device intelligence powers Mygra’s Migraine Assistant
                to pinpoint sources of your migraines, with all analysis done privately on your device.
              </li>
              <li>
                <strong>Trend discovery:</strong> Uncover patterns in your history – see your most common triggers, find which
                foods or habits correlate with headaches, and track changes in frequency or severity over time.
              </li>
              <li>
                <strong>Weather correlations:</strong> Spot connections between your migraines and weather changes (pressure,
                humidity, temperature, and more) to anticipate headaches before they strike.
              </li>
              <li>
                <strong>Health data integration:</strong> Mygra works seamlessly with Apple Health (HealthKit) to analyze how
                sleep quality, exercise, and other health factors relate to your migraine episodes.
              </li>
            </ul>

            <h3 className="text-2xl font-semibold mt-10 mb-4">Powerful Filters &amp; Organization</h3>
            <ul className="list-disc pl-6 space-y-3 text-lg leading-relaxed">
              <li>
                <strong>Focus on what matters:</strong> Quickly filter to view only your pinned migraines for a focused review
                of critical episodes.
              </li>
              <li>
                <strong>Advanced sorting:</strong> Use flexible filters (by severity, trigger type, time period, and more) to
                drill down into specific subsets of your migraine log and gain deeper understanding.
              </li>
            </ul>

            <p className="text-lg leading-relaxed mt-10">
              Whether you experience chronic migraines or occasional headaches, Mygra is here to support you in finding answers
              and relief – so you can focus on living better, not living in pain.
            </p>
            <p className="text-base italic mt-6">
              Some of Mygra's features require iOS 26 and iPadOS 26. Others require access to Apple Intelligence.
            </p>
          </div>
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