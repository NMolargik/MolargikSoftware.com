import React, { useEffect } from 'react';
import readyseticon from '../assets/readyset/readyseticon.png';
import Hero from '../components/Hero';
import screen1 from '../assets/readyset/screen1.png';
import screen2 from '../assets/readyset/screen2.png';
import screen3 from '../assets/readyset/screen3.png';
import screen4 from '../assets/readyset/screen4.png';

export default function ReadySet() {
  const slides = [screen1, screen2, screen3, screen4];
  const carouselRefDesktop = React.useRef<HTMLDivElement | null>(null);
  const carouselRefMobile = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.title = 'Ready, Set – Track Your Gym Progress | Nick Molargik';
    const desc = 'Effortless workout logging with set-by-set tracking, water & calories, trends, and HealthKit. Built with Swift & SwiftUI.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = desc;
    // Set accent color for navbar hover on Ready, Set
    document.documentElement.style.setProperty('--accent', '#22c55e'); // green-500
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = readyseticon as unknown as string;
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
        :root { --accent: #22c55e; }
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
          heading="Ready, Set"
          description="Effortlessly log workouts, sets, water, and caloric intake. Built for gym-goers, by a gym-goer!"
          imageSrc={readyseticon}
          buttonText="View on the App Store"
          buttonColorClass="bg-green-500 text-white hover:text-white hover:bg-green-600"
          buttonHref="https://apps.apple.com/us/app/ready-set/id6484503374"
          systemRequirements={["iOS 17+", "watchOS 10+"]}
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
                alt={`Ready, Set screenshot ${idx + 1}`}
                width={1170}
                height={2532}
                className="flex-none h-96 w-auto object-contain snap-start"
                loading="lazy"
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
                alt={`Ready, Set screenshot ${idx + 1}`}
                width={1170}
                height={2532}
                className="flex-none h-80 w-auto object-contain snap-start"
                loading="lazy"
              />
            ))}
          </div>
        </div>
        {/* Large text area below images */}
        <section>
          <div className="mt-10 max-w-3xl mx-auto px-4">
            <div>
              <h2 className="text-4xl font-bold tracking-tight mb-6">🏋️ Ready, Set: Your Ultimate Gym Companion</h2>
              <p className="text-lg leading-relaxed">
                I'm thrilled to announce the launch of my first solo-developed app, <a href="https://apps.apple.com/us/app/ready-set/id6484503374" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Ready, Set</a>, now available on the App Store! While I've been part of several team projects, this is the first app I've published independently.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                Ready, Set is designed to help gym-goers track their progress with minimal effort. As someone who often forgot the weights lifted during previous sessions, I built this app to solve that problem by allowing users to log exercises set-by-set, including weights lifted, reps completed, and time spent.
              </p>
              <h3 className="text-2xl font-semibold mt-10 mb-4">🔑 Key Features</h3>
              <ul className="list-disc pl-6 space-y-3 text-lg leading-relaxed">
                <li>
                  <strong>Effortless Workout Tracking:</strong> Log exercises set-by-set, including weights, reps, and time spent, to monitor your gym progress with ease.
                </li>
                <li>
                  <strong>Water & Caloric Intake:</strong> Track daily water and caloric intake with simple swipe gestures, keeping all your fitness metrics in one place.
                </li>
                <li>
                  <strong>Trend Analysis:</strong> View day-over-day trends in your workouts, water, and caloric intake to stay informed about your progress.
                </li>
                <li>
                  <strong>HealthKit Integration:</strong> Seamlessly integrates with HealthKit to enhance data in Apple's Health app, with alerts for concerning trends.
                </li>
                <li>
                  <strong>Swipe-Based Navigation:</strong> Built with Swift, SwiftUI, and SwiftData, featuring intuitive swipe-based navigation for a modern iOS experience.
                </li>
              </ul>
              <p className="text-lg leading-relaxed mt-10">
                From concept to launch in just ten days, Ready, Set is crafted for gym-goers who want a streamlined way to track their fitness journey. Currently available for iPhone, with Apple Watch compatibility and quick-action home screen widgets coming soon!
              </p>
              <p className="text-base italic mt-6">
                Ready, Set is available now for devices running iOS. Some features may require access to Apple’s latest APIs. Every. Set. Counts.
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
            "name": "Ready, Set",
            "applicationCategory": "FitnessApplication",
            "operatingSystem": "iOS, watchOS",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "url": "https://apps.apple.com/us/app/ready-set/id6484503374"
          })
        }}
      />
    </>
  );
}