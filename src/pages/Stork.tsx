import React, { useEffect } from 'react';
import storkicon from '../assets/stork/storkicon.svg';
import Hero from '../components/Hero';
import screen1 from '../assets/stork/screen1.png';
import screen2 from '../assets/stork/screen2.png';
import screen3 from '../assets/stork/screen3.png';
import screen4 from '../assets/stork/screen4.png';

export default function Stork() {
  const slides = [screen1, screen2, screen3, screen4];
  const carouselRefDesktop = React.useRef<HTMLDivElement | null>(null);
  const carouselRefMobile = React.useRef<HTMLDivElement | null>(null);

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
          description="Visual statistics for labor & delivery nurses. Receiving a major visual update soon!"
          imageSrc={storkicon}
          buttonText="View on the App Store"
          buttonColorClass="bg-orange-500 text-white hover:text-white hover:bg-orange-600"
          buttonHref="https://apps.apple.com/us/app/stork-delivery-stats/id6740038476"
          systemRequirements={["iOS 16+"]}
        />
      </section>
      {/* Responsive screenshots section */}
      <section className="mt-12">
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
                alt={`Stork screenshot ${idx + 1}`}
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
                alt={`Stork screenshot ${idx + 1}`}
                width={1170}
                height={2532}
                loading="lazy"
                className="flex-none h-80 w-auto object-contain snap-start"
              />
            ))}
          </div>
        </div>
        {/* Large text area below images */}
        <section>
          <div className="mt-10 max-w-3xl mx-auto px-4">
            <div>
              <h2 className="text-4xl font-bold tracking-tight mb-6">🍼 Stork: Track Baby Deliveries with Ease</h2>
              <p className="text-lg leading-relaxed">
                Discover <a href="https://apps.apple.com/us/app/stork-delivery-stats/id6740038476" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Stork</a>, an app designed for medical professionals to track baby deliveries and analyze trends over time—individually or with peers. Stork streamlines the process, making it easy for labor and delivery nurses, midwives, and OB-GYNs to log and manage delivery data on iOS.
              </p>
              <h3 className="text-2xl font-semibold mt-10 mb-4">🧩 Key Features</h3>
              <ul className="list-disc pl-6 space-y-3 text-lg leading-relaxed">
                <li>
                  <strong>Track Deliveries:</strong> Log details for each baby delivery, including individual baby information, birthplace, and other delivery properties. Deliveries fill a visual “weekly marble jar” to track baby gender stats at a glance.
                </li>
                <li>
                  <strong>Hospital Database:</strong> Search for hospitals with delivery departments, reference their details, and set a default hospital for deliveries. Missing a hospital? Suggest it, and we’ll add it.
                </li>
                <li>
                  <strong>Muster:</strong> Create a group, invite peers, and track deliveries together to view group-wide trends.
                </li>
                <li>
                  <strong>Built for iOS:</strong> Powered by Swift and SwiftUI for a smooth, native iOS experience with top-notch performance and modern compatibility.
                </li>
              </ul>
              <p className="text-lg leading-relaxed mt-10">
                Designed for medical professionals, Stork is perfect for anyone managing baby deliveries and analyzing trends. From logging individual deliveries to collaborating with peers, Stork makes it effortless to stay organized and informed.
              </p>
              <p className="text-base italic mt-6">
                Stork is available now for devices running iOS. Some features may require access to Apple’s latest APIs.
              </p>
            </div>
          </div>
        </section>
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