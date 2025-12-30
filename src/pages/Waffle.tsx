import React, { useState } from 'react';
import waffleicon from '../assets/waffle/waffleicon.png';
import Hero from '../components/Hero';
import screen1 from '../assets/waffle/screen1.png';
import screen2 from '../assets/waffle/screen2.png';
import screen3 from '../assets/waffle/screen3.png';
import screen4 from '../assets/waffle/screen4.png';
import screen5 from '../assets/waffle/screen5.png';
import ScreensCarousel from '../components/ScreensCarousel';
import { usePageMeta, useScrollToStart } from '../hooks';

// Official brand color: Waffle Secondary
const ACCENT_COLOR = '#DFA656';

export default function Waffle() {
  const slides = [screen1, screen2, screen3, screen4, screen5];
  const carouselRefDesktop = React.useRef<HTMLDivElement | null>(null);
  const carouselRefMobile = React.useRef<HTMLDivElement | null>(null);

  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
  const markLoaded = (i: number) => setLoaded(prev => ({ ...prev, [i]: true }));

  usePageMeta({
    title: 'Waffle – Grid Browser for iPad | Nick Molargik',
    description: 'Waffle lets you browse multiple sites side-by-side in a customizable grid on iPad. Presets, multi-window, CloudKit sync.',
    accentColor: ACCENT_COLOR,
    preloadImage: waffleicon,
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
          heading="Waffle"
          description="Webpage multitasking made easy on iPad."
          imageSrc={waffleicon}
          buttonHref="https://apps.apple.com/us/app/waffle-browser/id6751783473"
          systemRequirements={["iPadOS 26+"]}
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
            altPrefix="Waffle"
          />
          {/* Large text area below images */}
          <section
            aria-label="About Waffle"
            className="mt-16 px-4"
          >
            <div className="mx-auto max-w-5xl">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-6 py-10 shadow-[0_18px_45px_rgba(0,0,0,0.7)] sm:px-10">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#DFA656] to-transparent opacity-80"
                />
                <div className="relative space-y-6">
                  <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
                    🧇 Waffle — A New Way to Browse on iPad
                  </h2>
                  <p className="text-base sm:text-lg leading-relaxed text-white/80">
                    Discover Waffle, a browser experience crafted exclusively for iPad. Say goodbye to tab juggling and hello to a
                    customizable grid of webpages, letting you browse multiple sites side by side in any layout you choose, up to
                    a 4×4 grid. Whether you're researching, comparing, or multitasking, Waffle transforms your iPad into a powerful
                    multi-site workspace.
                  </p>

                  <hr className="my-6 border-white/10" />

                  <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-white">
                          What is Waffle?
                        </h3>
                        <p className="mt-2 text-base sm:text-lg leading-relaxed text-white/80">
                          Waffle is a grid-based browser for iPad that gives you full control over how you view the web. Arrange
                          sites in rows and columns, save presets for workflows you reuse, and snap layouts back exactly how you
                          like them—no more constantly rearranging windows.
                        </p>
                      </div>

                      <hr className="my-6 border-white/10 lg:hidden" />

                      <div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-white">
                          Built for Power Users &amp; Multitaskers
                        </h3>
                        <p className="mt-2 text-base sm:text-lg leading-relaxed text-white/80">
                          Whether you're comparing products, monitoring dashboards, following along with documentation, or keeping
                          multiple research sources open at once, Waffle helps you stay organized and in flow without losing track
                          of your tabs.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-white">
                          iPad-First, Through and Through
                        </h3>
                        <p className="mt-2 text-base sm:text-lg leading-relaxed text-white/80">
                          Waffle is built for iPadOS 26 with Apple&apos;s latest WebView APIs, multi-window support, and CloudKit
                          sync—so your browsing workspace feels fast, fluid, and native on every supported iPad.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-white">
                          Designed for power users, researchers, and serious multitaskers
                        </h3>                          
                        <p className="mt-2 text-base sm:text-lg leading-relaxed text-white/80">
                          Waffle is perfect for anyone who wants to
                          unlock the full potential of their iPad. From following rocket launches across multiple sites to managing
                          complex workflows, Waffle makes it effortless to work across multiple pages at once.
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
                            <span className="text-lg">🔳</span>
                            <span>Adjustable Grid Layout</span>
                          </h4>
                          <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/75">
                            Dynamically add or remove rows and columns to build the perfect grid for your workflow—up to a 4×4
                            layout of webpages on screen at once.
                          </p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5 shadow-inner">
                          <h4 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                            <span className="text-lg">🪟</span>
                            <span>Pop-Out Windows</span>
                          </h4>
                          <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/75">
                            Detach any grid cell into its own window using iPadOS multi-window, giving you even more flexibility
                            when you need a page to stand alone.
                          </p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5 shadow-inner">
                          <h4 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                            <span className="text-lg">⤢</span>
                            <span>Maximize When You Need Focus</span>
                          </h4>
                          <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/75">
                            Bring any site front and center with a tap, then drop it back into the grid when you&apos;re ready to
                            multitask again.
                          </p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5 shadow-inner">
                          <h4 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                            <span className="text-lg">⭐️</span>
                            <span>Presets for Your Workflows</span>
                          </h4>
                          <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/75">
                            Save your favorite grid configurations as Presets—perfect for repeatable tasks like research,
                            dashboards, or content monitoring. Reload them instantly whenever you need them.
                          </p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5 shadow-inner">
                          <h4 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                            <span className="text-lg">☁️</span>
                            <span>Cloud Sync with SwiftData + CloudKit</span>
                          </h4>
                          <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/75">
                            Your presets and layouts sync securely across your iPads, so your favorite setups are always right
                            where you left them.
                          </p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5 shadow-inner">
                          <h4 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                            <span className="text-lg">⚡️</span>
                            <span>Built for iPadOS 26</span>
                          </h4>
                          <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/75">
                            Powered by Apple&apos;s new WebView API for speed, security, and compatibility—enhanced with Liquid
                            Glass visuals to make every grid feel polished and modern.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-sm italic text-white/70">
                    Waffle is available for devices running iPadOS 26 or later. Some features require access to Apple&apos;s latest
                    APIs.
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
            "name": "Waffle",
            "applicationCategory": "BrowserApplication",
            "operatingSystem": "iPadOS",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "url": "https://apps.apple.com/us/app/waffle-browser/id6751783473"
          })
        }}
      />
    </>
  );
}