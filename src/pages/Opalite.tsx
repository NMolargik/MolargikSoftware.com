import React, { useState } from 'react';
import opaliteIcon from '../assets/opalite/opaliteicon.png';
import Hero from '../components/Hero';
import screen1 from '../assets/opalite/screen1.jpg';
import screen2 from '../assets/opalite/screen2.jpg';
import screen3 from '../assets/opalite/screen3.jpg';
import screen4 from '../assets/opalite/screen4.jpg';
import screen5 from '../assets/opalite/screen5.jpg';
import screen6 from '../assets/opalite/screen6.jpg';
import screen7 from '../assets/opalite/screen7.jpg';
import screen8 from '../assets/opalite/screen8.jpg';
import screen9 from '../assets/opalite/screen9.jpg';
import screen10 from '../assets/opalite/screen10.jpg';
import screen11 from '../assets/opalite/screen11.jpg';
import screen12 from '../assets/opalite/screen12.jpg';
import screen13 from '../assets/opalite/screen13.jpg';
import screen14 from '../assets/opalite/screen14.jpg';
import screen15 from '../assets/opalite/screen15.jpg';
import screen16 from '../assets/opalite/screen16.jpg';
import screen17 from '../assets/opalite/screen17.jpg';
import screen18 from '../assets/opalite/screen18.jpg';
import ScreensCarousel from '../components/ScreensCarousel';
import { usePageMeta, useScrollToStart } from '../hooks';

const ACCENT_COLOR = '#B4A7D6';

export default function Opalite() {
  const slides = [screen1, screen2, screen3, screen4, screen5, screen6, screen7, screen8, screen9, screen10, screen11, screen12, screen13, screen14, screen15, screen16, screen17, screen18];
  const carouselRefDesktop = React.useRef<HTMLDivElement | null>(null);
  const carouselRefMobile = React.useRef<HTMLDivElement | null>(null);

  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
  const markLoaded = (i: number) => setLoaded(prev => ({ ...prev, [i]: true }));

  usePageMeta({
    title: 'Opalite – The Ultimate Color Companion | Nick Molargik',
    description: 'Pick colors five different ways, organize with palettes, draw on a canvas, test accessibility, and export to your favorite tools. Built with Swift & SwiftUI.',
    accentColor: ACCENT_COLOR,
    preloadImage: opaliteIcon,
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
          heading="Opalite - Launching Very Soon!"
          description="The ultimate color companion for designers, developers, and digital artists. Pick colors five different ways, organize with palettes, draw on a canvas, test accessibility, and export to your favorite tools."
          imageSrc={opaliteIcon}
          buttonHref=""
          systemRequirements={["iOS 18+", "iPadOS 18+", "watchOS 9+", "macOS 15+", "visionOS 2+"]}
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
          altPrefix="Opalite"
        />
        {/* Large text area below images */}
        <section
          aria-label="About Opalite"
          className="mt-16 px-4"
        >
          <div className="mx-auto max-w-5xl">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-6 py-10 shadow-[0_18px_45px_rgba(0,0,0,0.7)] sm:px-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#B4A7D6] to-transparent opacity-80"
              />
              <div className="relative space-y-6">
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
                  Opalite — Your Complete Color Companion
                </h2>
                <p className="text-base sm:text-lg leading-relaxed text-white/80">
                  Whether you're designing interfaces, creating digital art, or building apps, Opalite gives you professional-grade color tools in a beautifully crafted native experience.
                </p>

                <hr className="my-6 border-white/10" />

                <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-white">
                        Pick Colors Your Way
                      </h3>
                      <p className="mt-2 text-base sm:text-lg leading-relaxed text-white/80">
                        Opalite offers five intuitive ways to find your perfect color: a grid picker with preset swatches,
                        a spectrum slider for precise hues, RGB/HSL channel sliders for fine-tuning, direct hex/RGB/HSL code entry,
                        and the ability to sample colors from any photo or your camera.
                      </p>
                    </div>

                    <hr className="my-6 border-white/10 lg:hidden" />

                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-white">
                        Design with Confidence
                      </h3>
                      <p className="mt-2 text-base sm:text-lg leading-relaxed text-white/80">
                        Built-in WCAG contrast checker ensures AA & AAA compliance. Simulate color blindness (Protanopia,
                        Deuteranopia, Tritanopia) to verify your designs work for everyone. Auto-generated color harmonies
                        and AI-powered color name suggestions help you create cohesive palettes.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-white">
                        Pricing
                      </h3>
                      <p className="mt-2 text-base sm:text-lg leading-relaxed text-white/80">
                        <strong className="text-white">Free:</strong> Unlimited colors, 5 palettes, all creation tools, contrast checker, and more!<br />
                        <strong className="text-white">Onyx ($4.99/year, $19.99/lifetime):</strong> Unlimited palettes, Canvas drawing experience, import/export capabilities.
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
                          <span className="text-lg">🎨</span>
                          <span>Five Color Pickers</span>
                        </h4>
                        <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/75">
                          Grid swatches, spectrum slider, RGB/HSL sliders, direct code entry, and camera/photo sampling—pick colors however feels natural.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5 shadow-inner">
                        <h4 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                          <span className="text-lg">📁</span>
                          <span>Smart Palette Organization</span>
                        </h4>
                        <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/75">
                          Create unlimited colors for free. Group into palettes with names, notes, and tags. Drag and drop to rearrange. Search your entire library instantly.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5 shadow-inner">
                        <h4 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                          <span className="text-lg">♿</span>
                          <span>Accessibility Testing</span>
                        </h4>
                        <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/75">
                          WCAG contrast checker (AA & AAA), color blindness simulation, and auto-generated harmonies ensure your designs work for everyone.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5 shadow-inner">
                        <h4 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                          <span className="text-lg">✏️</span>
                          <span>Canvas Drawing (Requires Onyx)</span>
                        </h4>
                        <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/75">
                          Full PencilKit canvas with Apple Pencil support. Shape tools, pan/zoom/rotate, and unlimited canvas projects.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5 shadow-inner">
                        <h4 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                          <span className="text-lg">📤</span>
                          <span>Export Everywhere (Requires Onyx)</span>
                        </h4>
                        <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/75">
                          Adobe ASE for Photoshop/Illustrator, Procreate Swatches, GIMP/GPL, CSS custom properties, SwiftUI code, and PDF portfolios.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5 shadow-inner">
                        <h4 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                          <span className="text-lg">☁️</span>
                          <span>iCloud Sync</span>
                        </h4>
                        <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/75">
                          Your colors and palettes stay in perfect harmony across iPhone, iPad, Mac, and Vision Pro.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5 shadow-inner">
                        <h4 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                          <span className="text-lg">🤖</span>
                          <span>AI Color Names</span>
                        </h4>
                        <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/75">
                          AI-powered suggestions give your colors meaningful, memorable names instantly.
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
            "name": "Opalite",
            "applicationCategory": "DesignApplication",
            "operatingSystem": "iOS, iPadOS, macOS, visionOS",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "url": "https://apps.apple.com/us/app/opalite/id0000000000",
            "description": "Opalite is the ultimate color companion for designers, developers, and digital artists. Pick colors, organize palettes, test accessibility, and export everywhere."
          })
        }}
      />
    </>
  );
}
