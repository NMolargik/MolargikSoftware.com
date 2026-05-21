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
    description: 'Waffle lets you browse multiple sites side-by-side in a customizable grid on iPad. Presets, multi-window, CloudKit sync.',
    accentColor: ACCENT_COLOR,
    preloadImage: waffleicon,
  });

  useScrollToStart(carouselRefDesktop, carouselRefMobile);

  return (
    <>
      <section>
        <Hero
          heading="Waffle"
          description="Webpage multitasking made easy on iPad."
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
                    Waffle — A New Way to Browse on iPad
                  </h2>
                  <p className="text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                    Discover Waffle, a browser experience crafted exclusively for iPad. Say goodbye to tab juggling and hello to a
                    customizable grid of webpages, letting you browse multiple sites side by side in any layout you choose, up to
                    a 4x4 grid. Whether you're researching, comparing, or multitasking, Waffle transforms your iPad into a powerful
                    multi-site workspace.
                  </p>

                  <hr className="my-6 border-gray-200 dark:border-gray-800" />

                  <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                          What is Waffle?
                        </h3>
                        <p className="mt-2 text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                          Waffle is a grid-based browser for iPad that gives you full control over how you view the web. Arrange
                          sites in rows and columns, save presets for workflows you reuse, and snap layouts back exactly how you
                          like them—no more constantly rearranging windows.
                        </p>
                      </div>

                      <hr className="my-6 border-gray-200 dark:border-gray-800 lg:hidden" />

                      <div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                          Built for Power Users &amp; Multitaskers
                        </h3>
                        <p className="mt-2 text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                          Whether you're comparing products, monitoring dashboards, following along with documentation, or keeping
                          multiple research sources open at once, Waffle helps you stay organized and in flow without losing track
                          of your tabs.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                          iPad-First, Through and Through
                        </h3>
                        <p className="mt-2 text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                          Waffle is built for iPadOS 26 with Apple&apos;s latest WebView APIs, multi-window support, and CloudKit
                          sync—so your browsing workspace feels fast, fluid, and native on every supported iPad.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                          Designed for power users, researchers, and serious multitaskers
                        </h3>
                        <p className="mt-2 text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                          Waffle is perfect for anyone who wants to
                          unlock the full potential of their iPad. From following rocket launches across multiple sites to managing
                          complex workflows, Waffle makes it effortless to work across multiple pages at once.
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
                          description="Dynamically add or remove rows and columns to build the perfect grid for your workflow—up to a 4x4 layout of webpages on screen at once."
                          index={0}
                          accentColor={ACCENT_COLOR}
                        />
                        <FeatureCard
                          icon="🪟"
                          title="Pop-Out Windows"
                          description="Detach any grid cell into its own window using iPadOS multi-window, giving you even more flexibility when you need a page to stand alone."
                          index={1}
                          accentColor={ACCENT_COLOR}
                        />
                        <FeatureCard
                          icon="⤢"
                          title="Maximize When You Need Focus"
                          description="Bring any site front and center with a tap, then drop it back into the grid when you're ready to multitask again."
                          index={2}
                          accentColor={ACCENT_COLOR}
                        />
                        <FeatureCard
                          icon="⭐️"
                          title="Presets for Your Workflows"
                          description="Save your favorite grid configurations as Presets—perfect for repeatable tasks like research, dashboards, or content monitoring. Reload them instantly whenever you need them."
                          index={3}
                          accentColor={ACCENT_COLOR}
                        />
                        <FeatureCard
                          icon="☁️"
                          title="Cloud Sync with SwiftData + CloudKit"
                          description="Your presets and layouts sync securely across your iPads, so your favorite setups are always right where you left them."
                          index={4}
                          accentColor={ACCENT_COLOR}
                        />
                        <FeatureCard
                          icon="⚡️"
                          title="Built for iPadOS 26"
                          description="Powered by Apple's new WebView API for speed, security, and compatibility—enhanced with Liquid Glass visuals to make every grid feel polished and modern."
                          index={5}
                          accentColor={ACCENT_COLOR}
                        />
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 italic">
                    Waffle is available for devices running iPadOS 26 or later. Some features require access to Apple&apos;s latest
                    APIs.
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
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "url": "https://apps.apple.com/us/app/waffle-browser/id6751783473"
          })
        }}
      />
    </>
  );
}
