import { motion } from "framer-motion";
import { useState } from "react";
import appStoreBadge from "../assets/appStore.svg";
import LoadingSpinner from "./LoadingSpinner";

interface ActionButton {
  label: string;
  href: string;
  variant: 'primary' | 'secondary' | 'github' | 'linkedin';
  download?: boolean;
}

interface HeroProps {
  heading: string;
  description: string;
  imageSrc: string;
  // App page specific
  appStoreHref?: string;
  showAppStoreButton?: boolean;
  systemRequirements?: string[];
  cropImage?: boolean;
  githubHref?: string;
  // Home page specific
  variant?: 'app' | 'home';
  platforms?: string[];
  actionButtons?: ActionButton[];
  gradientHeading?: boolean;
}

// 3D tilt animation for images with dynamic drop shadow
const tiltAnimation = {
  animate: {
    rotateX: [0, 6, 0, -6, 0],
    rotateY: [0, -6, 0, 6, 0],
    filter: [
      "drop-shadow(0px 8px 12px rgba(0, 0, 0, 0.4))",
      "drop-shadow(6px 10px 14px rgba(0, 0, 0, 0.5))",
      "drop-shadow(0px 8px 12px rgba(0, 0, 0, 0.4))",
      "drop-shadow(-6px 6px 14px rgba(0, 0, 0, 0.5))",
      "drop-shadow(0px 8px 12px rgba(0, 0, 0, 0.4))",
    ],
  },
  transition: {
    duration: 6,
    ease: [0.42, 0, 0.58, 1] as const,
    repeat: Infinity,
    repeatType: "loop" as const,
  },
};

const buttonStyles: Record<ActionButton['variant'], string> = {
  primary: "bg-orange-500 hover:bg-orange-600 focus-visible:ring-orange-300",
  secondary: "bg-gray-700 hover:bg-gray-600 focus-visible:ring-gray-400",
  github: "bg-gray-700 hover:bg-gray-600 focus-visible:ring-gray-400",
  linkedin: "bg-blue-600 hover:bg-blue-700 focus-visible:ring-blue-400",
};

export default function Hero({
  heading,
  description,
  imageSrc,
  appStoreHref = "#",
  showAppStoreButton = true,
  systemRequirements = [],
  cropImage = false,
  githubHref,
  variant = 'app',
  platforms = [],
  actionButtons = [],
  gradientHeading = false,
}: HeroProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isHome = variant === 'home';
  const pills = isHome ? platforms : systemRequirements;
  const HeadingTag = isHome ? 'h1' : 'h2';

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900" />
        {isHome && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,19,245,0.15)_0%,_transparent_70%)]" />
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-4 sm:px-8 sm:py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">

          {/* Text Content */}
          <div className={`flex-1 ${isHome ? 'max-w-xl space-y-6' : 'w-full md:w-auto md:max-w-lg'}`}>
            {/* Mobile: Image + Title row */}
            <div className="flex flex-row items-end mb-4 md:hidden">
              <div className="relative w-20 h-20 mr-4" style={{ perspective: "500px" }}>
                {!imageLoaded && <LoadingSpinner />}
                <motion.img
                  src={imageSrc}
                  alt={`${heading} Icon`}
                  className={`w-20 h-20 rounded-lg ${cropImage ? "object-cover" : "object-contain"} transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                  onLoad={() => setImageLoaded(true)}
                  animate={tiltAnimation.animate}
                  transition={tiltAnimation.transition}
                  style={{ transformStyle: "preserve-3d" }}
                />
              </div>
              {isHome ? (
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white [text-wrap:balance]">
                  {heading}
                </h1>
              ) : (
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white [text-wrap:balance]">
                  {heading}
                </h2>
              )}
            </div>

            {/* Heading - Desktop only */}
            <HeadingTag
              className={`hidden md:block text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight ${
                gradientHeading
                  ? 'bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent'
                  : 'text-white'
              } [text-wrap:balance]`}
            >
              {heading}
            </HeadingTag>

            {/* Description */}
            <p className={`${isHome ? 'text-gray-300' : 'text-gray-200 mt-4'} text-sm sm:text-base md:text-lg leading-relaxed [text-wrap:balance]`}>
              {description}
            </p>

            {/* Pills (platforms or system requirements) */}
            {pills.length > 0 && (
              <div className={`flex flex-wrap gap-2 md:gap-3 ${!isHome ? 'mt-5' : ''}`}>
                {pills.map((pill, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.5, duration: 1.5 }}
                    className="inline-flex items-center rounded-md bg-white ring-1 ring-black px-2 py-1 text-xs font-medium text-black"
                  >
                    {pill}
                  </motion.span>
                ))}
              </div>
            )}

            {/* Action Buttons (home variant) */}
            {isHome && actionButtons.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-3 pt-2 items-start sm:items-center">
                {actionButtons.map((button, idx) => (
                  <a
                    key={idx}
                    href={button.href}
                    download={button.download}
                    target={button.download ? undefined : "_blank"}
                    rel={button.download ? undefined : "noopener noreferrer"}
                    className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-white font-semibold transition focus-visible:ring-2 hover:text-white ${buttonStyles[button.variant]}`}
                  >
                    {button.label}
                  </a>
                ))}
              </div>
            )}

            {/* App Store & GitHub Buttons (app variant) */}
            {!isHome && (showAppStoreButton || githubHref) && (
              <div className="flex flex-wrap items-center gap-4 mt-6">
                {showAppStoreButton && appStoreHref && (
                  <a
                    href={appStoreHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-12 relative"
                    aria-label={`Download ${heading} on the App Store`}
                  >
                    <img
                      src={appStoreBadge}
                      alt="Download on the App Store"
                      className="h-full object-contain"
                    />
                  </a>
                )}
                {githubHref && (
                  <a
                    href={githubHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 h-12 rounded-lg bg-gray-800 hover:bg-gray-700 px-5 text-sm font-medium text-white transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-purple-900"
                    aria-label={`View ${heading} on GitHub`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    View on GitHub
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Image - Desktop */}
          <div
            className={`hidden md:flex justify-center flex-shrink-0 ${isHome ? 'w-full md:w-auto' : 'flex-1 max-w-[22rem]'}`}
            style={{ perspective: "800px" }}
          >
            {!imageLoaded && !isHome && <LoadingSpinner size="lg" />}
            <motion.img
              src={imageSrc}
              alt={heading}
              className={`w-full ${isHome ? 'max-w-[18rem] md:max-w-[22rem]' : 'h-full max-w-[22rem]'} rounded-xl ${cropImage ? "object-cover" : "object-contain"} transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setImageLoaded(true)}
              animate={tiltAnimation.animate}
              transition={tiltAnimation.transition}
              style={{ transformStyle: "preserve-3d" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
