import React from 'react';
import waffleicon from '../assets/waffle/waffleicon.png';
import Hero from '../components/Hero';
import screen1 from '../assets/waffle/screen1.png';
import screen2 from '../assets/waffle/screen2.png';
import screen3 from '../assets/waffle/screen3.png';
import screen4 from '../assets/waffle/screen4.png';
import screen5 from '../assets/waffle/screen5.png';

export default function Waffle() {
  const slides = [screen1, screen2, screen3, screen4, screen5];
  const carouselRef = React.useRef(null);

  return (
    <>
      <Hero
        heading="Waffle"
        description="Webpage multitasking made easy on iPad."
        imageSrc={waffleicon}
        buttonText="View on the App Store"
        buttonColorClass="bg-yellow-500 text-white"
        buttonHref="https://apps.apple.com/us/app/waffle-browser/id6751783473"
        systemRequirements={["iPadOS 26+"]}

      />
      {/* Responsive screenshots section */}
      <section className="mt-12">
        {/* Desktop & large screens: horizontally scrollable images */}
        <div className="hidden md:block px-4">
          <div
            ref={carouselRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4"
          >
            {slides.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Waffle screenshot ${idx + 1}`}
                className="flex-none h-96 w-auto object-contain snap-start"
                loading="lazy"
              />
            ))}
          </div>
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
                alt={`Waffle screenshot ${idx + 1}`}
                className="flex-none h-80 w-auto object-cover snap-start"
                loading="lazy"
              />
            ))}
          </div>
        </div>
        {/* Large text area below images */}
        <div className="mt-10 max-w-3xl mx-auto px-4">
          <div>
            <h2 className="text-4xl font-bold tracking-tight mb-6">🧇 Waffle: A New Way to Browse on iPad</h2>
            <p className="text-lg leading-relaxed">
              Discover <a href="https://apps.apple.com/us/app/waffle-browser/id6751783473" className="text-blue-600 hover:underline">Waffle</a>, a revolutionary browser experience crafted exclusively for iPad. Say goodbye to tab juggling and hello to a customizable grid of webpages, letting you browse multiple sites side by side in any layout you choose, up to a 4x4 grid. Whether you're researching, comparing, or multitasking, Waffle transforms your iPad into a powerful multi-site workspace.
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
    </>
  );
}