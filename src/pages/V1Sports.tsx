import v1Golf from '../assets/v1sports/V1Golf.png';
import v1Coach from '../assets/v1sports/V1Coach.png';
import v1Baseball from '../assets/v1sports/V1Baseball.png';
import screen1 from '../assets/v1sports/screen1.png';
import screen2 from '../assets/v1sports/screen2.png';
import screen3 from '../assets/v1sports/screen3.png';
import screen4 from '../assets/v1sports/screen4.png';
import screen5 from '../assets/v1sports/screen5.png';
import screen6 from '../assets/v1sports/screen6.png';
import screen7 from '../assets/v1sports/screen7.png';
import screen8 from '../assets/v1sports/screen8.png';
import screen9 from '../assets/v1sports/screen9.png';
import screen10 from '../assets/v1sports/screen10.png';
import screen11 from '../assets/v1sports/screen11.png';
import screen12 from '../assets/v1sports/screen12.png';
import screen13 from '../assets/v1sports/screen13.png';
import screen14 from '../assets/v1sports/screen14.png';
import screen15 from '../assets/v1sports/screen15.png';
import screen16 from '../assets/v1sports/screen16.png';
import screen17 from '../assets/v1sports/screen17.png';
import screen18 from '../assets/v1sports/screen18.png';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import ScreensCarousel from '../components/ScreensCarousel';
import ScrollToTop from '../components/ScrollToTop';
import { useState, useRef } from 'react';
import { usePageMeta, useScrollToStart } from '../hooks';

const ACCENT_COLOR = 'rgb(200, 70, 64)';
const ACCENT_HEX = '#C84640';

export default function V1Sports() {
  const slides = [screen1, screen2, screen3, screen4, screen5, screen6, screen7, screen8, screen9, screen10, screen11, screen12, screen13, screen14, screen15, screen16, screen17, screen18];
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
  const carouselRefDesktop = useRef<HTMLDivElement>(null);
  const carouselRefMobile = useRef<HTMLDivElement>(null);
  const markLoaded = (i: number) => setLoaded(prev => ({ ...prev, [i]: true }));
  useScrollToStart(carouselRefDesktop, carouselRefMobile);

  usePageMeta({
    title: 'V1 Sports | Nick Molargik',
    description: 'V1 Sports – coming soon.',
    accentColor: ACCENT_COLOR,
  });

  return (
    <>
      {/* Affiliation disclaimer */}
      <div className="w-full bg-red-600 text-white text-sm text-center px-4 py-2 pt-16">
        <strong>Disclaimer:</strong> Molargik Software LLC is not affiliated with V1 Sports. Nicholas Molargik is employed as a Senior Mobile Software Engineer at V1 Sports.
      </div>

      <section>
        <Hero
          heading="V1 Sports"
          description="Empowering golfers to improve their game. Supporting coaches in growing their business."
          imageSrc={v1Golf}
          imageSrcs={[v1Golf, v1Coach, v1Baseball]}
          showAppStoreButton={false}
          systemRequirements={['iOS 16+', 'iPadOS 16+', 'Android']}
        />
      </section>

      <section className="bg-surface dark:bg-[#0c0c10] pt-6 pb-16">
        <div>
          <ScreensCarousel
            slides={slides}
            loaded={loaded}
            offset={0}
            markLoaded={markLoaded}
            desktopRef={carouselRefDesktop}
            mobileRef={carouselRefMobile}
          />

          {/* About section */}
          <section
            aria-label="About V1 Sports"
            className="mt-16 px-4"
            style={{ background: `linear-gradient(to right, ${ACCENT_HEX}08 1px, transparent 1px), linear-gradient(to bottom, ${ACCENT_HEX}08 1px, transparent 1px)`, backgroundSize: '40px 40px' }}
          >
            <div className="mx-auto max-w-5xl">
              <div
                className="relative overflow-hidden bg-white dark:bg-[#0a0a0c] rounded-3xl border border-gray-100 dark:border-gray-800 border-t-2 px-6 py-10 shadow-sm sm:px-10"
                style={{ borderTopColor: ACCENT_HEX }}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent to-transparent opacity-40"
                  style={{ backgroundImage: `linear-gradient(to right, transparent, ${ACCENT_HEX}, transparent)` }}
                />
                <div className="relative space-y-6">
                  <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    V1 Sports — More Than Swing Analysis
                  </h2>
                  <p className="text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                    Analyze your swing, track your progress, and train on your own with powerful video tools.
                  </p>

                  <hr className="my-6 border-gray-200 dark:border-gray-800" />

                  <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                          What is V1 Sports?
                        </h3>
                        <p className="mt-2 text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                          V1 Sports is a video analysis company specializing in swing analysis for golf and baseball. Their apps give coaches and athletes the tools to visualize and break down swing mechanics in detail — making it easier to deliver feedback and understand technique.
                        </p>
                        <p className="mt-3 text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                          More than a software provider, V1 Sports positions itself as a partner in building modern, scalable, and sustainable coaching businesses.
                        </p>
                      </div>

                      <hr className="my-6 border-gray-200 dark:border-gray-800 lg:hidden" />

                      <div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                          Three Apps, One Platform
                        </h3>
                        <p className="mt-2 text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                          V1 Sports ships three published mobile applications. <strong>V1 Golf</strong> gives golfers video analysis, model swing comparisons, and drills from top coaches. <strong>V1 Baseball</strong> brings the same video-first approach to the diamond. <strong>V1 Coach</strong> is the professional-facing tool — giving instructors a full suite to manage students, record and annotate lessons, and run a scalable coaching business from their phone.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                          Built on a Cross-Platform Stack
                        </h3>
                        <p className="mt-2 text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                          The apps are built on Flutter, with native plugins handling performance-critical work. NativeCamera wraps iOS AVCapture and Android Camera2 APIs in Swift and Kotlin to deliver frame-accurate, high-speed video recording. NativeShotTracer uses CoreML and ML Kit for on-device pose detection and ball trajectory rendering. The video analysis engine — NativeAnalyzer — is built with Kotlin Multiplatform and Jetpack Compose, with direct C interop to FFmpeg for frame-level audio and video processing across iOS and Android.
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 lg:mt-0" role="region" aria-label="My Contributions">
                      <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                        My Contributions
                      </h3>
                      <div className="mt-4 grid gap-4">
                        <FeatureCard
                          icon="📱"
                          title="Flutter Application"
                          description="Contributing developer on the V1 Sports Flutter app, including the method channels that bridge native iOS and Android experiences into the cross-platform application."
                          index={0}
                          accentColor={ACCENT_HEX}
                        />
                        <FeatureCard
                          icon="📹"
                          title="NativeCamera"
                          description="Primary Developer / Maintainer of the native camera plugin. Wraps iOS AVCapture and Android Camera2 in Swift and Kotlin to deliver frame-accurate, high-speed video recording for swing analysis."
                          index={1}
                          accentColor={ACCENT_HEX}
                        />
                        <FeatureCard
                          icon="🎯"
                          title="NativeShotTracer"
                          description="Primary Developer / Maintainer of the shot tracing plugin. Uses CoreML and ML Kit for on-device pose detection and ball trajectory rendering, delivered as a Flutter plugin with native iOS and Android implementations."
                          index={2}
                          accentColor={ACCENT_HEX}
                        />
                        <FeatureCard
                          icon="🎬"
                          title="NativeAnalyzer"
                          description="Primary Developer / Maintainer of the video analysis engine. Built with Kotlin Multiplatform and Jetpack Compose, with direct C interop to FFmpeg for frame-level video processing across iOS and Android."
                          index={3}
                          accentColor={ACCENT_HEX}
                        />
                        <FeatureCard
                          icon="🦶"
                          title="Pressure Mat Integration"
                          description="Maintainer of the portable C library powering ground pressure mat hardware integration. Handles wireless UDP communication with the Sensor Edge device, foot biomechanics analysis, center-of-pressure tracking, and heatmap rendering — deployed to iOS."
                          index={4}
                          accentColor={ACCENT_HEX}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </section>
      <ScrollToTop />
    </>
  );
}
