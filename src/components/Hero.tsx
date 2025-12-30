import { motion } from "framer-motion";
import { useState } from "react";
import appStoreBadge from "../assets/appStore.svg";
import LoadingSpinner from "./LoadingSpinner";

interface HeroProps {
  heading: string;
  description: string;
  imageSrc: string;
  buttonHref?: string;
  systemRequirements?: string[];
  cropImage?: boolean;
  showButton?: boolean;
}

export default function Hero({
  heading,
  description,
  imageSrc,
  buttonHref = "#",
  systemRequirements = [],
  cropImage = false,
  showButton = true,
}: HeroProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <section
      className="relative flex flex-col md:flex-row items-center md:items-center justify-center md:justify-center gap-6 md:gap-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 min-h-[20vh] w-full px-4 py-4 sm:py-6 md:py-8 shadow-[0_20px_50px_-5px_rgba(0,0,0,0.5)] overflow-hidden"
    >
      {/* Add radial overlay directly to section */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,19,245,0.2)_20%,_transparent_60%)] opacity-50" />
      {/* Content stack - adjusted for mobile layout */}
      <div
        ref={(el) => {
          if (el && window.matchMedia('(min-width: 768px)').matches) {
            const height = el.getBoundingClientRect().height;
            const imageContainer = document.querySelector('.image-container');
            if (imageContainer && imageContainer instanceof HTMLElement) {
              imageContainer.style.height = `${height}px`;
            }
          }
        }}
        className="flex flex-col w-full md:w-auto md:max-w-lg backdrop-blur-xl bg-white/10 ring-1 ring-white/15 rounded-2xl p-4 md:p-6 shadow-lg"
      >
        {/* Image and title row on mobile, hidden on md+ */}
        <div className="flex flex-row items-end mb-0 md:hidden">
          <div className="relative w-20 h-20 mr-4">
            {!imageLoaded && <LoadingSpinner />}
            <img
              src={imageSrc}
              alt={`${heading} Icon`}
              className={`w-20 h-20 rounded-lg ${cropImage ? "object-cover" : "object-contain"} transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white [text-wrap:balance]">
            {heading}
          </h2>
        </div>
        {/* Rest of the content */}
        <div className="flex flex-col items-start space-y-4">
          <h2 className="hidden md:block text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white [text-wrap:balance]">
            {heading}
          </h2>
          <p className="text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed [text-wrap:balance] max-h-[10rem] overflow-y-auto pb-1">
            {description}
          </p>
          {/* System requirements pills */}
          {systemRequirements.length > 0 && (
            <div className="flex flex-row flex-wrap gap-2 mt-4">
              {systemRequirements.map((req, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.5, duration: 1.5 }}
                  className="inline-flex items-center rounded-md bg-white ring-1 ring-black px-2 py-1 text-xs font-medium text-black"
                >
                  {req}
                </motion.span>
              ))}
            </div>
          )}
          {showButton && buttonHref && (
            <a
              href={buttonHref}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-16 relative"
              aria-label={`Download ${heading} on the App Store`}
            >
              <img
                src={appStoreBadge}
                alt="Download on the App Store"
                className="absolute inset-0 left-[-5px] h-full object-contain object-left"
              />
            </a>
          )}
        </div>
      </div>
      {/* Image section - Visible on md+, aligned to the right, matching text area height */}
      <div className={`hidden md:flex justify-end flex-1 max-w-[22rem] shrink-0 image-container relative ${cropImage ? "overflow-hidden" : ""}`}>
        {!imageLoaded && <LoadingSpinner size="lg" />}
        <img
          src={imageSrc}
          alt={heading}
          className={`w-full h-full rounded-xl shadow-lg ${cropImage ? "object-cover" : "object-contain"} transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
    </section>
  );
}