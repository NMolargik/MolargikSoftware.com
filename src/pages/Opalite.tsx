import React, { useState } from 'react';
import opaliteIcon from '../assets/opalite/opaliteicon.png';
import Hero from '../components/Hero';
import screen1 from '../assets/opalite/screen1.png';
import screen2 from '../assets/opalite/screen2.png';
import screen3 from '../assets/opalite/screen3.png';
import screen4 from '../assets/opalite/screen4.png';
import screen5 from '../assets/opalite/screen5.png';
import screen6 from '../assets/opalite/screen6.png';
import screen7 from '../assets/opalite/screen7.png';
import screen8 from '../assets/opalite/screen8.png';
import screen9 from '../assets/opalite/screen9.png';
import screen10 from '../assets/opalite/screen10.png';
import screen11 from '../assets/opalite/screen11.png';
import screen12 from '../assets/opalite/screen12.png';
import screen13 from '../assets/opalite/screen13.png';
import screen14 from '../assets/opalite/screen14.png';
import screen15 from '../assets/opalite/screen15.png';
import screen16 from '../assets/opalite/screen16.png';
import screen17 from '../assets/opalite/screen17.png';
import screen18 from '../assets/opalite/screen18.png';
import screen19 from '../assets/opalite/screen19.png';
import screen20 from '../assets/opalite/screen20.png';
import screen21 from '../assets/opalite/screen21.png';
import screen22 from '../assets/opalite/screen22.png';
import screen23 from '../assets/opalite/screen23.png';
import screen24 from '../assets/opalite/screen24.png';
import screen25 from '../assets/opalite/screen25.png';
import screen26 from '../assets/opalite/screen26.png';
import screen27 from '../assets/opalite/screen27.png';
import screen28 from '../assets/opalite/screen28.png';
import opaliteDemo from '../assets/opalite/opaliteWorkflowDemo.mp4';
import ScreensCarousel from '../components/ScreensCarousel';
import FeatureCard from '../components/FeatureCard';
import ScrollToTop from '../components/ScrollToTop';
import DownloadCTA from '../components/DownloadCTA';
import { usePageMeta, useScrollToStart } from '../hooks';

// Official brand color: Opalite Blue
const ACCENT_COLOR = '#BBEBFC';

export default function Opalite() {
  const slides = [screen1, screen2, screen3, screen4, screen5, screen6, screen7, screen8, screen9, screen10, screen11, screen12, screen13, screen14, screen15, screen16, screen17, screen18, screen19, screen20, screen21, screen22, screen23, screen24, screen25, screen26, screen27, screen28];
  const carouselRefDesktop = React.useRef<HTMLDivElement | null>(null);
  const carouselRefMobile = React.useRef<HTMLDivElement | null>(null);

  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
  const markLoaded = (i: number) => setLoaded(prev => ({ ...prev, [i]: true }));

  usePageMeta({
    title: 'Opalite – The Ultimate Color Companion | Nick Molargik',
    description: 'Create colors using various tools, organize with palettes, draw on a canvas, test accessibility, and export to your favorite tools. Built with Swift & SwiftUI.',
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
      <section className="relative overflow-hidden">
        {/* Now Available banner */}
        <div className="absolute top-6 -right-11 z-20 rotate-45 bg-red-600 text-white text-xs font-bold uppercase tracking-wider py-3 pl-14 pr-8 shadow-lg">
          Now Available
        </div>
        <Hero
          heading="Opalite - Color Studio"
          description="The ultimate color manager for designers, developers, and digital artists. Create colors using various tools, organize with palettes, draw on a canvas, test accessibility, and export to your favorite tools."
          imageSrc={opaliteIcon}
          appStoreHref="https://apps.apple.com/us/app/opalite-color-studio/id6755093664"
          githubHref="https://github.com/NMolargik/Opalite"
          systemRequirements={["iOS 18.4+", "iPadOS 18.4+", "watchOS 10+", "macOS 15+", "visionOS 26.2+", "tvOS 18+"]}
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
        {/* Demo video */}
        <div className="mt-12 px-4">
          <div className="mx-auto max-w-5xl">
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <video
                src={opaliteDemo}
                controls
                playsInline
                className="w-full"
              >
                Your browser does not support the video tag.
              </video>
              <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-lg">
                Example Workflow
              </span>
            </div>
          </div>
        </div>
        {/* Large text area below images */}
        <section
          aria-label="About Opalite"
          className="mt-8 px-4"
        >
          <div className="mx-auto max-w-5xl">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-6 py-10 shadow-[0_18px_45px_rgba(0,0,0,0.7)] sm:px-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#BBEBFC] to-transparent opacity-80"
              />
              <div className="relative space-y-6">
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
                  Opalite — The Ultimate Color Manager
                </h2>
                <p className="text-base sm:text-lg leading-relaxed text-white/80">
                  Whether you're designing interfaces, creating digital art, or building apps, Opalite gives you professional-grade color tools in a beautifully crafted native experience. Built for iPhone, iPad, Mac, Apple Watch, and Vision Pro.
                </p>

                <hr className="my-6 border-white/10" />

                <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-white">
                        What is Opalite?
                      </h3>
                      <p className="mt-2 text-base sm:text-lg leading-relaxed text-white/80">
                        Opalite is the ultimate color manager for designers, developers, and digital artists. Pick colors
                        six different ways, organize with smart palettes, contribute to a growing community of colors and palettes, draw on a full-featured canvas, test accessibility,
                        and export to your favorite tools—all from one beautifully designed app.
                      </p>
                    </div>

                    <hr className="my-6 border-white/10 lg:hidden" />

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

                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-white">
                        Stay Organized
                      </h3>
                      <p className="mt-2 text-base sm:text-lg leading-relaxed text-white/80">
                        Create unlimited colors for free and group them into smart palettes with names, notes, and tags.
                        Drag and drop to rearrange, search across your entire color library instantly, and let iCloud sync
                        keep everything in perfect harmony across all your devices.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-white">
                        Design with Confidence
                      </h3>
                      <p className="mt-2 text-base sm:text-lg leading-relaxed text-white/80">
                        Built-in WCAG contrast checker ensures AA & AAA compliance. Simulate color blindness (Protanopia,
                        Deuteranopia, Tritanopia) to verify your designs work for everyone. Auto-generated color harmonies
                        (complementary, triadic, analogous & more) and AI-powered color name suggestions help you create
                        cohesive, memorable palettes.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-white">
                        Draw & Create
                      </h3>
                      <p className="mt-2 text-base sm:text-lg leading-relaxed text-white/80">
                        <span className="text-black font-medium" style={{ textShadow: '0 0 8px rgba(255,255,255,0.8), 0 0 16px rgba(255,255,255,0.5)' }}>Requires Onyx</span> — Unlock a full PencilKit canvas with
                        Apple Pencil support. Use shape tools for squares, circles, triangles, lines, and arrows. Pan, zoom,
                        and rotate with precision, and save unlimited canvas projects to bring your color palettes to life.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-white">
                        Export Everywhere
                      </h3>
                      <p className="mt-2 text-base sm:text-lg leading-relaxed text-white/80">
                        <span className="text-black font-medium" style={{ textShadow: '0 0 8px rgba(255,255,255,0.8), 0 0 16px rgba(255,255,255,0.5)' }}>Requires Onyx</span> — Take your colors anywhere: Adobe Swatch
                        Exchange (ASE) for Photoshop and Illustrator, Procreate Swatches for iPad artists, GIMP/GPL for open-source
                        tools, CSS custom properties for web developers, SwiftUI code for iOS developers, and PDF portfolios of
                        your entire collection.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-white">
                        Start Creating with Color
                      </h3>
                      <p className="mt-2 text-base sm:text-lg leading-relaxed text-white/80">
                        From the solo developer at Molargik Software LLC—download Opalite and discover a better way to work with color.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 lg:mt-0" role="region" aria-label="Key Features">
                    <h3 className="text-xl sm:text-2xl font-semibold text-white">
                      Key Features
                    </h3>
                    <div className="mt-4 grid gap-4">
                      <FeatureCard
                        icon="🎨"
                        title="Six Color Pickers"
                        description="Grid swatches, spectrum slider, Shuffle, RGB/HSL sliders, direct code entry, and camera/photo sampling—pick colors however feels natural."
                        index={0}
                        accentColor={ACCENT_COLOR}
                      />
                      <FeatureCard
                        icon="🌎"
                        title="Contribute to the Community"
                        description="Browse and contribute to a growing library of user-submitted colors and palettes. Share your creations with designers worldwide."
                        index={0}
                        accentColor={ACCENT_COLOR}
                      />
                      <FeatureCard
                        icon="📁"
                        title="Smart Palette Organization"
                        description="Create unlimited colors for free. Group into palettes with names, notes, and metadata. Drag and drop to reassign. Search your entire library instantly."
                        index={1}
                        accentColor={ACCENT_COLOR}
                      />
                      <FeatureCard
                        icon="♿"
                        title="Accessibility Testing"
                        description="WCAG contrast checker (AA & AAA), color blindness simulation, and auto-generated harmonies ensure your designs work for everyone."
                        index={2}
                        accentColor={ACCENT_COLOR}
                      />
                      <FeatureCard
                        icon="✏️"
                        title="Canvas (Requires Onyx)"
                        description="Full PencilKit canvas with Apple Pencil support. Shape tools, pan/zoom/rotate, and unlimited canvas projects."
                        index={3}
                        accentColor={ACCENT_COLOR}
                      />
                      <FeatureCard
                        icon="📤"
                        title="Export Everywhere (Requires Onyx)"
                        description="Adobe ASE for Photoshop/Illustrator, Procreate Swatches, GIMP/GPL, CSS custom properties, SwiftUI code, and PDF portfolios."
                        index={4}
                        accentColor={ACCENT_COLOR}
                      />
                      <FeatureCard
                        icon="☁️"
                        title="iCloud Sync"
                        description="Your colors and palettes stay in perfect harmony across iPhone, iPad, Mac, Apple Watch, and Vision Pro."
                        index={5}
                        accentColor={ACCENT_COLOR}
                      />
                      <FeatureCard
                        icon="💎"
                        title="Onyx Subscription"
                        description="Free: Unlimited colors, 5 palettes, all picking tools, contrast checker, and more! Onyx ($4.99/year or $19.99 lifetime): Unlimited palettes, Canvas drawing, downloads from the Community, and advanced import/export capabilities."
                        index={6}
                        accentColor={ACCENT_COLOR}
                      />
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-sm italic text-white/70">
                  Some of Opalite's features require iOS 26 and iPadOS 26. Others require access to Apple Intelligence.
                </p>
              </div>
            </div>
          </div>
        </section>
        <DownloadCTA
          appName="Opalite"
          appStoreUrl="https://apps.apple.com/us/app/opalite-color-studio/id6755093664"
          accentColor={ACCENT_COLOR}
          preorder={false}
        />
        </div>
      </section>
      <ScrollToTop accentColor={ACCENT_COLOR} />
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
            "description": "Opalite is the ultimate color manager for designers, developers, and digital artists. Pick colors, organize palettes, test accessibility, and export everywhere."
          })
        }}
      />
    </>
  );
}
