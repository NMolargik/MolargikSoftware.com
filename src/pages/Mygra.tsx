import React from 'react';
import mygraicon from '../assets/mygra/mygraicon.png';
import Hero from '../components/Hero';


import screen1 from '../assets/mygra/screen1.png';
import screen2 from '../assets/mygra/screen2.png';
import screen3 from '../assets/mygra/screen3.png';
import screen4 from '../assets/mygra/screen4.png';
import screen5 from '../assets/mygra/screen5.png';

export default function Mygra() {
  const slides: string[] = [screen1, screen2, screen3, screen4, screen5];

  const carouselRef = React.useRef<HTMLDivElement>(null);

  return (
    <>
    <Hero
        heading="Mygra"
        description="Your Intelligent Migraine Journal."
        imageSrc={mygraicon}
        buttonText="View on the App Store"
        buttonColorClass="bg-purple-500 text-white"
        buttonHref="https://apps.apple.com/us/app/mygra/id6747298583"
        systemRequirements={["iOS 18+", "iPadOS 18+", "watchOS 10.6+"]}
      />

      {/* Responsive screenshots section */}
      <section className="mt-12">
        {/* Desktop & large screens: 5 images in a single row */}
        <div className="hidden md:flex items-start justify-center gap-0 px-4">
          {slides.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Mygra screenshot ${idx + 1}`}
              className="h-96 w-auto object-contain"
              loading="lazy"
            />
          ))}
        </div>

        {/* Small screens: seamless horizontal banner */}
        <div className="md:hidden mt-2">
          <div
            ref={carouselRef}
            className="flex overflow-x-auto snap-x snap-mandatory"
          >
            {slides.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Mygra screenshot ${idx + 1}`}
                className="flex-none h-80 w-auto object-cover snap-start"
                loading="lazy"
              />
            ))}
          </div>
        </div>

        {/* Large text area below images */}
        <div className="mt-10 max-w-3xl mx-auto px-4">
          <div>
            <h2 className="text-4xl font-bold tracking-tight mb-6">Mygra: Your Intelligent Migraine Journal.</h2>
            <p className="text-lg leading-relaxed">
              Take control of your migraines with Mygra – a supportive, intelligent migraine companion that helps you
              uncover patterns, avoid triggers, and find relief. Log each headache in seconds, harness private on‑device
              AI for personal insights, and discover what truly helps you feel better. Plus, Mygra syncs securely via
              iCloud across your Apple devices and integrates with Apple Health for a 360° view of your well‑being.
            </p>

            <h3 className="text-2xl font-semibold mt-10 mb-4">Log Migraines with Ease</h3>
            <ul className="list-disc pl-6 space-y-3 text-lg leading-relaxed">
              <li>
                <strong>Fast, detailed entries:</strong> Record migraine episodes in seconds – capture date, time, severity,
                duration, plus key details like triggers, foods, medications, and treatments.
              </li>
              <li>
                <strong>Pin important events:</strong> Mark significant migraines with a pin for quick reference later.
              </li>
              <li>
                <strong>Flexible editing:</strong> Swipe to edit or delete entries anytime as your information changes.
              </li>
            </ul>

            <h3 className="text-2xl font-semibold mt-10 mb-4">Smarter Insights with On‑Device AI</h3>
            <ul className="list-disc pl-6 space-y-3 text-lg leading-relaxed">
              <li>
                <strong>Personal Migraine Assistant:</strong> Apple’s on‑device intelligence powers Mygra’s Migraine Assistant
                to pinpoint sources of your migraines, with all analysis done privately on your device.
              </li>
              <li>
                <strong>Trend discovery:</strong> Uncover patterns in your history – see your most common triggers, find which
                foods or habits correlate with headaches, and track changes in frequency or severity over time.
              </li>
              <li>
                <strong>Weather correlations:</strong> Spot connections between your migraines and weather changes (pressure,
                humidity, temperature, and more) to anticipate headaches before they strike.
              </li>
              <li>
                <strong>Health data integration:</strong> Mygra works seamlessly with Apple Health (HealthKit) to analyze how
                sleep quality, exercise, and other health factors relate to your migraine episodes.
              </li>
            </ul>

            <h3 className="text-2xl font-semibold mt-10 mb-4">Powerful Filters &amp; Organization</h3>
            <ul className="list-disc pl-6 space-y-3 text-lg leading-relaxed">
              <li>
                <strong>Focus on what matters:</strong> Quickly filter to view only your pinned migraines for a focused review
                of critical episodes.
              </li>
              <li>
                <strong>Advanced sorting:</strong> Use flexible filters (by severity, trigger type, time period, and more) to
                drill down into specific subsets of your migraine log and gain deeper understanding.
              </li>
            </ul>

            <p className="text-lg leading-relaxed mt-10">
              Whether you experience chronic migraines or occasional headaches, Mygra is here to support you in finding answers
              and relief – so you can focus on living better, not living in pain.
            </p>
            <p className="text-base italic mt-6">
              Some of Mygra's features require iOS 26 and iPadOS 26. Others require access to Apple Intelligence.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}