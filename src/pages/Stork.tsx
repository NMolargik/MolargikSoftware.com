import React, { useEffect } from 'react';
import storkicon from '../assets/stork/storkicon.png';
import Hero from '../components/Hero';
import screen1 from '../assets/stork/screen1.png';
import screen2 from '../assets/stork/screen2.png';
import screen3 from '../assets/stork/screen3.png';
import screen4 from '../assets/stork/screen4.png';
import screen5 from '../assets/stork/screen5.png';

export default function Stork() {
  const slides = [screen1, screen2, screen3, screen4, screen5];
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
          description="Journal and statistics for labor & delivery nurses."
          imageSrc={storkicon}
          buttonText="View on the App Store"
          buttonColorClass="bg-orange-500 text-white hover:text-white hover:bg-orange-600"
          buttonHref="https://apps.apple.com/us/app/stork-delivery-stats/id6740038476"
          systemRequirements={["iOS 18+", "iPadOS 18+"]}
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
              <h2 className="text-4xl font-bold tracking-tight mb-6">Stork — Labor &amp; Delivery Companion</h2>
              <p className="text-lg leading-relaxed">
                Stork helps medical professionals track baby deliveries, visualize trends, and celebrate every birth.
              </p>
              <p className="text-lg leading-relaxed">
                Designed for Labor &amp; Delivery nurses, midwives, and OB-GYNs, Stork makes it simple to record, review, and analyze delivery data — all in one intuitive iOS app.
              </p>

              <h3 className="text-2xl font-semibold mt-10 mb-4"></h3>

              <div className="space-y-6 text-lg leading-relaxed">
                <div>
                  <h4 className="text-xl font-semibold mb-1">🍼 Track Every Delivery</h4>
                  <p>
                    Record detailed information for each baby delivery — including gender, birth date, hospital, and delivery notes.
                    Each entry adds to your <em>Marble Jar</em>, a beautiful visualization showing weekly delivery trends at a glance.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold mb-1">🏥 Explore Hospital Data</h4>
                  <p>
                    Search hospitals with active delivery departments, view facility details, and set your default hospital to keep logs consistent and accurate.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold mb-1">📊 View Trends &amp; Statistics</h4>
                  <p>
                    See your work come to life with charts and summaries that highlight delivery counts, baby gender ratios, and other helpful insights over time.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold mb-1">📱 Built for iOS</h4>
                  <p>
                    Powered by Swift and SwiftUI for a smooth, responsive experience on iPhone and iPad. Stork supports iOS and iPadOS 18+, designed to feel at home on every Apple device.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold mb-1">🔔 Home Screen Widget</h4>
                  <p>
                    Quickly check how many deliveries you’ve logged this week — right from your Home Screen.
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-semibold mt-10 mb-2">💡 Perfect For</h3>
              <p className="text-lg leading-relaxed">
                Labor &amp; Delivery nurses • Midwives • OB-GYNs • Maternity unit staff
              </p>
              <p className="text-lg leading-relaxed mt-4">
                Whether you’re tracking your own deliveries or analyzing department trends, Stork streamlines your workflow, helps visualize your impact, and keeps every birth beautifully organized.
              </p>

              <h3 className="text-2xl font-semibold mt-10 mb-2">🚀 Stork Has Taken Flight</h3>
              <p className="text-lg leading-relaxed">
                Download Stork today and see your deliveries — and your impact — in a whole new way.
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