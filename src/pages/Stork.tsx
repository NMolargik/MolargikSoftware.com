import React, { useState } from 'react';
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
import screen10 from '../assets/stork/screen10.png';
import screen11 from '../assets/stork/screen11.png';
import screen12 from '../assets/stork/screen12.png';
import screen13 from '../assets/stork/screen13.png';
import screen14 from '../assets/stork/screen14.png';
import ScreensCarousel from '../components/ScreensCarousel';
import FeatureCard from '../components/FeatureCard';
import ScrollToTop from '../components/ScrollToTop';
import DownloadCTA from '../components/DownloadCTA';
import { usePageMeta, useScrollToStart } from '../hooks';

// Official brand color: Stork Orange
const ACCENT_COLOR = '#E8672B';

export default function Stork() {
  const slides = [screen1, screen2, screen3, screen4, screen5, screen6, screen7, screen8, screen9, screen10, screen11, screen12, screen13, screen14];
  const carouselRefDesktop = React.useRef<HTMLDivElement | null>(null);
  const carouselRefMobile = React.useRef<HTMLDivElement | null>(null);

  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
  const markLoaded = (i: number) => setLoaded(prev => ({ ...prev, [i]: true }));

  usePageMeta({
    title: 'Stork – Delivery Stats for L&D Nurses | Nick Molargik',
    description: 'Track baby deliveries and trends with Stork. Log details, analyze stats, collaborate with peers. Built with Swift & SwiftUI.',
    accentColor: ACCENT_COLOR,
    preloadImage: storkicon,
  });

  useScrollToStart(carouselRefDesktop, carouselRefMobile);

  return (
    <>
      <section>
        <Hero
          heading="Stork - Delivery Stats"
          description="Journal and statistics for labor & delivery nurses."
          imageSrc={storkicon}
          appStoreHref="https://apps.apple.com/us/app/stork-delivery-stats/id6740038476"
          githubHref="https://github.com/NMolargik/Stork"
          systemRequirements={["iOS 18+", "iPadOS 18+", "macOS 15+", "visionOS 26+", "watchOS 11.6+"]}
        />
      </section>
      {/* Responsive screenshots section */}
      <section className="bg-gradient-to-b from-orange-50/30 to-[#FAFAFA] pt-6 pb-16">
        <div>
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
            <div className="relative overflow-hidden bg-white rounded-3xl border border-gray-100 border-t-2 px-6 py-10 shadow-sm sm:px-10" style={{ borderTopColor: ACCENT_COLOR }}>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#E8672B] to-transparent opacity-40"
              />
              <div className="relative space-y-6">
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900">
                  Stork — Labor &amp; Delivery Companion
                </h2>
                <p className="text-base sm:text-lg leading-relaxed text-gray-600">
                  Stork helps medical professionals track baby deliveries, visualize trends, and celebrate every birth.
                  Designed for Labor &amp; Delivery nurses, midwives, and OB-GYNs, Stork makes it simple to record, review,
                  and analyze delivery data — across iPhone, iPad, Mac, Apple Watch, and Apple Vision Pro.
                </p>

                <hr className="my-6 border-gray-200" />

                <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
                        What is Stork?
                      </h3>
                      <p className="mt-2 text-base sm:text-lg leading-relaxed text-gray-600">
                        Stork is a focused companion for Labor &amp; Delivery professionals who want a clear picture of their work.
                        Log every delivery with important context, organize with custom Tags, and view your history in a Calendar view.
                        Track your impact over weeks and months, and bring real numbers into conversations with peers and leadership.
                      </p>
                    </div>

                    <hr className="my-6 border-gray-200 lg:hidden" />

                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
                        Designed for Busy L&amp;D Teams
                      </h3>
                      <p className="mt-2 text-base sm:text-lg leading-relaxed text-gray-600">
                        Stork is built for fast, repeatable entries that fit naturally into your shift. Log deliveries quickly
                        from your Apple Watch, check stats from Home Screen widgets, or dive deeper on your iPhone, iPad, or Mac.
                        Your delivery history stays organized and at your fingertips.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
                        Celebrate Every Birth
                      </h3>
                      <p className="mt-2 text-base sm:text-lg leading-relaxed text-gray-600">
                        With the Marble Jar and visual stats, Stork turns your delivery history into something you can see and be
                        proud of—a tangible reminder of the lives you&apos;ve helped bring into the world.
                      </p>
                    </div>

                    <div className="mt-8 space-y-3">
                      <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
                        <span className="font-semibold">Perfect for:</span> Labor &amp; Delivery nurses, midwives, OB-GYNs, and
                        maternity unit staff.
                      </h3>
                      <p className="text-base sm:text-lg leading-relaxed text-gray-600">
                        Whether you&apos;re tracking your own deliveries or analyzing department trends, Stork streamlines your
                        workflow, helps visualize your impact, and keeps every birth beautifully organized.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 lg:mt-0" role="region" aria-label="Key Features">
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
                      Key Features
                    </h3>
                    <div className="mt-4 grid gap-4">
                      <FeatureCard
                        icon="🍼"
                        title="Track Every Delivery"
                        description="Record detailed information for each baby delivery — including gender, birth date, and delivery notes. Each entry adds to your Marble Jar, a beautiful visualization of weekly delivery trends."
                        index={0}
                        accentColor={ACCENT_COLOR}
                      />
                      <FeatureCard
                        icon="📅"
                        title="Calendar & Tags"
                        description="View your deliveries over the last month in a Calendar view, or organize them with custom Tags. Filter and sort your history to find exactly what you're looking for."
                        index={1}
                        accentColor={ACCENT_COLOR}
                      />
                      <FeatureCard
                        icon="📊"
                        title="View Trends & Statistics"
                        description="See your work come to life with charts and summaries that highlight delivery counts, baby gender ratios, and other helpful insights over time."
                        index={2}
                        accentColor={ACCENT_COLOR}
                      />
                      <FeatureCard
                        icon="📱"
                        title="On All Your Devices"
                        description="Powered by Swift and SwiftUI for a smooth, native experience on iPhone, iPad, Mac, Apple Watch, and Apple Vision Pro. Requires iOS 18+, iPadOS 18+, macOS 15+, watchOS 11+, or visionOS 2+."
                        index={3}
                        accentColor={ACCENT_COLOR}
                      />
                      <FeatureCard
                        icon="🔔"
                        title="Home Screen Widgets"
                        description="Quickly check how many deliveries you've logged this week—right from your Home Screen, without opening the app."
                        index={4}
                        accentColor={ACCENT_COLOR}
                      />
                      <FeatureCard
                        icon="⌚"
                        title="Apple Watch App"
                        description="View daily stats, quickly log a new delivery, and track your steps with the built-in pedometer—all from your wrist."
                        index={5}
                        accentColor={ACCENT_COLOR}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <DownloadCTA
          appName="Stork"
          appStoreUrl="https://apps.apple.com/us/app/stork-delivery-stats/id6740038476"
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
            "name": "Stork – Delivery Stats",
            "applicationCategory": "MedicalApplication",
            "operatingSystem": "iOS, iPadOS, macOS, watchOS, visionOS",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "url": "https://apps.apple.com/us/app/stork-delivery-stats/id6740038476"
          })
        }}
      />
    </>
  );
}
