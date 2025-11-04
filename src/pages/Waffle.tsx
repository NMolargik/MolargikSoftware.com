import React, { useEffect } from 'react';
import waffleicon from '../assets/waffle/waffleicon.png';
import Hero from '../components/Hero';
import screen1 from '../assets/waffle/screen1.png';
import screen2 from '../assets/waffle/screen2.png';
import screen3 from '../assets/waffle/screen3.png';
import screen4 from '../assets/waffle/screen4.png';
import screen5 from '../assets/waffle/screen5.png';

export default function Waffle() {
  const slides = [screen1, screen2, screen3, screen4, screen5];
  const carouselRefDesktop = React.useRef<HTMLDivElement | null>(null);
  const carouselRefMobile = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.title = 'Waffle – Grid Browser for iPad | Nick Molargik';
    const desc = 'Waffle lets you browse multiple sites side-by-side in a customizable grid on iPad. Presets, multi-window, CloudKit sync.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = desc;
    // Set accent color for navbar hover on Waffle
    document.documentElement.style.setProperty('--accent', '#eab308'); // yellow-500
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = waffleicon as unknown as string;
    document.head.appendChild(link);

    const scrollToStart = () => {
      if (carouselRefDesktop.current) {
        carouselRefDesktop.current.scrollTo({ left: 0, behavior: 'auto' });
      }
      if (carouselRefMobile.current) {
        carouselRefMobile.current.scrollTo({ left: 0, behavior: 'auto' });
      }
    };

    // Try immediately, then on next frame, then on load to cover image decode timing
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
        :root { --accent: #eab308; }
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
          buttonText="View on the App Store"
          buttonColorClass="bg-yellow-500 text-white hover:text-white hover:bg-yellow-600"
          buttonHref="https://apps.apple.com/us/app/waffle-browser/id6751783473"
          systemRequirements={["iPadOS 26+"]}
        />
      </section>
      {/* Responsive screenshots section */}
      <section className="mt-12 pb-24">
        {/* Desktop & large screens: horizontally scrollable images */}
        <div className="hidden md:block px-4">
          <div
            ref={carouselRefDesktop}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 justify-start md:justify-center"
          >
            {slides.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Waffle screenshot ${idx + 1}`}
                width={1170}
                height={2532}
                loading="lazy"
                className="flex-none h-96 w-auto object-contain snap-start"
              />
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
              <img
                key={idx}
                src={src}
                alt={`Waffle screenshot ${idx + 1}`}
                width={1170}
                height={2532}
                loading="lazy"
                className="flex-none h-80 w-auto object-contain snap-start"
              />
            ))}
          </div>
        </div>
        {/* Large text area below images */}
        <div className="mt-10 max-w-3xl mx-auto px-4">
          <div>
            <h2 className="text-4xl font-bold tracking-tight mb-6">🧇 Waffle: A New Way to Browse on iPad</h2>
            <p className="text-lg leading-relaxed">
              Discover <a href="https://apps.apple.com/us/app/waffle-browser/id6751783473" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Waffle</a>, a revolutionary browser experience crafted exclusively for iPad. Say goodbye to tab juggling and hello to a customizable grid of webpages, letting you browse multiple sites side by side in any layout you choose, up to a 4x4 grid. Whether you're researching, comparing, or multitasking, Waffle transforms your iPad into a powerful multi-site workspace.
            </p>
            <h3 className="text-2xl font-semibold mt-10 mb-4">🧩 Key Features</h3>
            <ul className="list-disc pl-6 space-y-3 text-lg leading-relaxed">
              <li>
                <strong>Adjustable Grid Layout:</strong> Dynamically add or remove rows and columns to create the perfect browsing workspace tailored to your needs.
              </li>
              <li>
                <strong>Pop-Out Windows:</strong> Detach any grid cell into a standalone window, leveraging iPadOS multi-window support for ultimate flexibility.
              </li>
              <li>
                <strong>Maximize:</strong> Focus on a single webpage by bringing it front and center with a single tap.
              </li>
              <li>
                <strong>Presets:</strong> Save your favorite grid configurations as Presets and reload them instantly whenever you need them.
              </li>
              <li>
                <strong>Cloud Sync with SwiftData + CloudKit:</strong> Seamlessly sync your grid presets and browsing setup across all your iPads.
              </li>
              <li>
                <strong>Built for iOS 26:</strong> Powered by Apple’s new WebView API for blazing speed, top-notch security, and modern web compatibility, enhanced with Liquid Glass.
              </li>
            </ul>
            <p className="text-lg leading-relaxed mt-10">
              Designed for power users, researchers, and multitaskers, Waffle is perfect for anyone who wants to unlock the full potential of their iPad. From browsing rocketry pages to managing complex workflows, Waffle makes it effortless to work across multiple sites at once.
            </p>
            <p className="text-base italic mt-6">
              Waffle is available now for devices running iPadOS 26. Some features require access to Apple’s latest APIs.
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