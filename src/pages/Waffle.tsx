import React, { useState } from 'react';
import waffleicon from '../assets/waffle/waffleicon.png';
import Hero from '../components/Hero';
import screen1 from '../assets/waffle/screen1.png';
import screen2 from '../assets/waffle/screen2.png';
import screen3 from '../assets/waffle/screen3.png';
import screen4 from '../assets/waffle/screen4.png';
import screen5 from '../assets/waffle/screen5.png';
import screen6 from '../assets/waffle/screen6.png';
import ScreensCarousel from '../components/ScreensCarousel';
import FeatureCard from '../components/FeatureCard';
import ScrollToTop from '../components/ScrollToTop';
import DownloadCTA from '../components/DownloadCTA';
import { usePageMeta, useScrollToStart } from '../hooks';

// Official brand color: Waffle Secondary
const ACCENT_COLOR = '#DFA656';

export default function Waffle() {
  const slides = [screen1, screen2, screen3, screen4, screen5, screen6];
  const carouselRefDesktop = React.useRef<HTMLDivElement | null>(null);
  const carouselRefMobile = React.useRef<HTMLDivElement | null>(null);

  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
  const markLoaded = (i: number) => setLoaded(prev => ({ ...prev, [i]: true }));

  usePageMeta({
    title: 'Waffle – Grid Browser for iPad | Nick Molargik',
    description: 'Waffle turns your iPad into a grid of live webpages. Browse sites side by side in a split-screen grid, save preset layouts, pop cells into their own windows, and sync with iCloud.',
    accentColor: ACCENT_COLOR,
    preloadImage: waffleicon,
  });

  useScrollToStart(carouselRefDesktop, carouselRefMobile);

  return (
    <>
      <section>
        <Hero
          heading="Waffle"
          description="Browse the web in a grid, not in tabs."
          imageSrc={waffleicon}
          appStoreHref="https://apps.apple.com/us/app/waffle-browser/id6751783473"
          githubHref="https://github.com/NMolargik/Waffle"
          systemRequirements={["iPadOS 26+", "macOS 26+", "visionOS 26+"]}
        />
      </section>
      {/* Responsive screenshots section */}
      <section className="bg-surface dark:bg-[#0c0c10] pt-6 pb-16">
        <div>
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
            className="mt-16 px-4 bg-[linear-gradient(to_right,_#DFA65608_1px,_transparent_1px),linear-gradient(to_bottom,_#DFA65608_1px,_transparent_1px)] bg-[size:40px_40px]"
          >
            <div className="mx-auto max-w-5xl">
              <div className="relative overflow-hidden bg-white dark:bg-[#0a0a0c] rounded-3xl border border-gray-100 dark:border-gray-800 border-t-2 px-6 py-10 shadow-sm sm:px-10" style={{ borderTopColor: ACCENT_COLOR }}>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#DFA656] to-transparent opacity-40"
                />
                <div className="relative space-y-6">
                  <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    Waffle — Your iPad, a Grid of Live Webpages
                  </h2>
                  <p className="text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                    Tabs make you choose. Waffle doesn&apos;t. Arrange multiple websites into a clean, customizable grid — up to
                    4x4 — and keep your mail, news, dashboards, and video on screen at the same time. No clutter. No app
                    switching. Just a smarter workspace.
                  </p>

                  <hr className="my-6 border-gray-200 dark:border-gray-800" />

                  <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                          How It Works
                        </h3>
                        <p className="mt-2 text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                          Every cell in the grid is a full browser. Tap a cell to select it — the address bar, back, forward,
                          and reload all control that cell. Type a web address or just search, then resize your grid with a
                          tap: add or remove rows and columns anytime.
                        </p>
                      </div>

                      <hr className="my-6 border-gray-200 dark:border-gray-800 lg:hidden" />

                      <div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                          Perfect For
                        </h3>
                        <p className="mt-2 text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                          Students juggling research, notes, and lectures. Traders and analysts watching live data. Streamers
                          tracking chat, feeds, and tools. Sports fans following every game at once. Anyone who wants a tidy,
                          efficient iPad workspace.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                          iPad-First, Through and Through
                        </h3>
                        <p className="mt-2 text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                          Waffle is built for iPadOS 26 with Apple&apos;s latest WebView APIs, Liquid Glass design, multi-window
                          support, and CloudKit sync. Full hardware keyboard support, drag-and-drop bookmarks, and Siri,
                          Shortcuts, and Spotlight integration make it feel native everywhere — in English, Spanish, French
                          (Canada), and Japanese.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                          Go Deluxe with Syrup
                        </h3>
                        <p className="mt-2 text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                          Waffle is free to use in a 2x2 grid. A one-time Syrup purchase — no subscription — unlocks everything
                          else: grids up to 4x4, rearranging, pop-out windows, fullscreen focus, and saved Presets. Family
                          Sharing included, so one purchase covers your whole family.
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 lg:mt-0" role="region" aria-label="Key Features">
                      <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                        Key Features
                      </h3>
                      <div className="mt-4 grid gap-4">
                        <FeatureCard
                          icon="🔳"
                          title="Adjustable Grid Layout"
                          description="Add or remove rows and columns with a tap to build the perfect grid for your workflow—up to a 4x4 layout of live webpages on screen at once."
                          index={0}
                          accentColor={ACCENT_COLOR}
                        />
                        <FeatureCard
                          icon="🔀"
                          title="Rearrange on the Fly"
                          description="Reshape your grid without reloading a thing—drag cells into a new order, or tap two cells to swap them. Every tile shows the page's title and icon so you always know what's moving."
                          index={1}
                          accentColor={ACCENT_COLOR}
                        />
                        <FeatureCard
                          icon="🪟"
                          title="Pop-Out Windows"
                          description="Detach any grid cell into its own window using iPadOS multi-window, then pop it right back into the grid when you're done."
                          index={2}
                          accentColor={ACCENT_COLOR}
                        />
                        <FeatureCard
                          icon="⤢"
                          title="Fullscreen When You Need Focus"
                          description="Bring any site front and center with a tap, then drop it back into the grid when you're ready to multitask again."
                          index={3}
                          accentColor={ACCENT_COLOR}
                        />
                        <FeatureCard
                          icon="⭐️"
                          title="Presets for Your Workflows"
                          description="Save an entire grid—size and every page in it—as a Preset, and bring it back in one tap. A morning news grid, a work grid, a game-day grid."
                          index={4}
                          accentColor={ACCENT_COLOR}
                        />
                        <FeatureCard
                          icon="☁️"
                          title="Cloud Sync with iCloud"
                          description="Bookmarks and Presets sync securely across your iPads with CloudKit, so your favorite setups are always right where you left them."
                          index={5}
                          accentColor={ACCENT_COLOR}
                        />
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 italic">
                    Waffle is free to download for devices running iPadOS 26 or later, and is available in English, Spanish,
                    French (Canada), and Japanese. Syrup is a one-time purchase with Family Sharing — no subscription.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <DownloadCTA
            appName="Waffle"
            appStoreUrl="https://apps.apple.com/us/app/waffle-browser/id6751783473"
            accentColor={ACCENT_COLOR}
          />
        </div>
      </section>
      <ScrollToTop />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Waffle",
            "applicationCategory": "BrowserApplication",
            "operatingSystem": "iPadOS",
            "inLanguage": ["en", "es", "fr-CA", "ja"],
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "url": "https://apps.apple.com/us/app/waffle-browser/id6751783473"
          })
        }}
      />
    </>
  );
}
