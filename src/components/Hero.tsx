import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { useState, useRef, useCallback, type ReactNode } from 'react';
import { trackLiquidGlassCursor } from '../utils/liquidGlass';
import GlassButton from './GlassButton';

interface TiltProps { rotateX: MotionValue<number>; rotateY: MotionValue<number>; boxShadow: MotionValue<string>; }

function TiltIcon({ children }: { children: (props: TiltProps) => ReactNode }) {
  const iconRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });
  const shadowX = useTransform(springY, [-20, 0, 20], [8, 0, -8]);
  const shadowY = useTransform(springX, [-20, 0, 20], [-8, 4, 16]);
  const shadowBlur = useTransform(
    [springX, springY] as const,
    ([rx, ry]: number[]) => 16 + Math.sqrt((rx as number) * (rx as number) + (ry as number) * (ry as number)) * 0.8
  );
  const boxShadow: MotionValue<string> = useTransform(
    [shadowX, shadowY, shadowBlur] as const,
    ([sx, sy, sb]: number[]) => `${sx}px ${sy}px ${sb}px rgba(0, 0, 0, 0.18)`
  );
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = iconRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    rotateX.set((e.clientY - rect.top) / rect.height * -20 + 10);
    rotateY.set((e.clientX - rect.left) / rect.width * 20 - 10);
  }, [rotateX, rotateY]);
  const onMouseLeave = useCallback(() => { rotateX.set(0); rotateY.set(0); }, [rotateX, rotateY]);

  return (
    <div ref={iconRef} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className="inline-block" style={{ perspective: 600 }}>
      {children({ rotateX: springX, rotateY: springY, boxShadow })}
    </div>
  );
}


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
  imageSrcs?: string[];
  headshotSrc?: string;
  appStoreHref?: string;
  showAppStoreButton?: boolean;
  systemRequirements?: string[];
  cropImage?: boolean;
  githubHref?: string;
  webHref?: string;
  variant?: 'app' | 'home';
  platforms?: string[];
  actionButtons?: ActionButton[];
}

const buttonAccent: Record<ActionButton['variant'], string> = {
  primary: '#6D00FF',
  secondary: '#FF6C00',
  github: '#24292f',
  linkedin: '#0A66C2',
};

export default function Hero({
  heading,
  description,
  imageSrc,
  imageSrcs,
  headshotSrc,
  appStoreHref = '#',
  showAppStoreButton = true,
  systemRequirements = [],
  cropImage = false,
  githubHref,
  webHref,
  variant = 'app',
  platforms = [],
  actionButtons = [],
}: HeroProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isHome = variant === 'home';
  const pills = isHome ? platforms : systemRequirements;

  // 3D tilt for app icon
  const iconRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  // Dynamic shadow that shifts opposite to tilt direction
  const shadowX = useTransform(springY, [-20, 0, 20], [8, 0, -8]);
  const shadowY = useTransform(springX, [-20, 0, 20], [-8, 4, 16]);
  const shadowBlur = useTransform(
    [springX, springY] as const,
    ([rx, ry]: number[]) => {
      const tilt = Math.sqrt(rx * rx + ry * ry);
      return 16 + tilt * 0.8;
    }
  );
  const boxShadow = useTransform(
    [shadowX, shadowY, shadowBlur] as const,
    ([sx, sy, sb]: number[]) => `${sx}px ${sy}px ${sb}px rgba(0, 0, 0, 0.18)`
  );

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = iconRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(y * -20);
    rotateY.set(x * 20);
  }, [rotateX, rotateY]);

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  if (isHome) {
    return (
      <section className="relative w-full min-h-[90vh] flex items-center justify-center bg-gradient-to-b from-white to-gray-50 pt-20 overflow-hidden">
        {/* Ambient color orbs — give the glass surfaces something
            colorful to refract. Position roughly under the navbar
            and at the lower edge so cards + nav both pick up tint. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full opacity-60 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(109, 0, 255, 0.45) 0%, rgba(109, 0, 255, 0) 70%)' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -right-16 w-[500px] h-[500px] rounded-full opacity-60 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(255, 108, 0, 0.4) 0%, rgba(255, 108, 0, 0) 70%)' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/3 right-1/4 w-[280px] h-[280px] rounded-full opacity-40 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(64, 169, 255, 0.45) 0%, rgba(64, 169, 255, 0) 70%)' }}
        />
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          {/* Logo + Headshot — overlapping, behind text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative flex items-center justify-center mb-8"
          >
            <div className="w-[140px] h-[140px] rounded-full shadow-lg border-[3px] border-brandPurple bg-white flex items-center justify-center relative z-10">
              <img
                src={imageSrc}
                alt="Molargik Software"
                className="w-[102px] h-[102px] object-contain"
                onLoad={() => setImageLoaded(true)}
              />
            </div>
            {headshotSrc && (
              <div className="w-[140px] h-[140px] rounded-full shadow-lg border-[3px] border-brandOrange relative -ml-8 z-0 overflow-hidden">
                <img
                  src={headshotSrc}
                  alt="Nick Molargik"
                  className="w-[182px] h-[182px] max-w-none -ml-[21px] -mt-[7px]"
                />
              </div>
            )}
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="text-[2.25rem] sm:text-[3rem] md:text-display font-bold tracking-[-0.02em] leading-[1.05] text-gray-900 [text-wrap:balance]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {heading}
          </motion.h1>

          <motion.h4
            className="mt-2 text-[1.25rem] sm:text-title font-semibold tracking-[-0.01em] text-gray-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Nick Molargik
          </motion.h4>

          {/* Description */}
          <motion.p
            className="mt-6 text-base sm:text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto leading-relaxed [text-wrap:balance]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {description}
          </motion.p>

          {/* Platform pills */}
          {pills.length > 0 && (
            <motion.div
              className="flex flex-wrap justify-center gap-2 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {pills.map((pill, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + idx * 0.05, duration: 0.3 }}
                  onMouseMove={trackLiquidGlassCursor}
                  className="liquid-glass liquid-glass-pill liquid-glass-interactive inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium text-gray-700"
                >
                  {pill}
                </motion.span>
              ))}
            </motion.div>
          )}

          {/* Action buttons */}
          {actionButtons.length > 0 && (
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-3 mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {actionButtons.map((button, idx) => {
                const isAnchor = button.href.startsWith('#');
                return (
                  <GlassButton
                    key={idx}
                    href={button.href}
                    download={button.download}
                    target={!isAnchor && !button.download ? '_blank' : undefined}
                    accentColor={buttonAccent[button.variant]}
                    size="md"
                    onClick={isAnchor ? (e) => {
                      e.preventDefault();
                      document.querySelector(button.href)?.scrollIntoView({ behavior: 'smooth' });
                    } : undefined}
                  >
                    {button.label}
                  </GlassButton>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>
    );
  }

  // App variant
  return (
    <section className="relative w-full bg-white pt-28 pb-16 md:pt-32 md:pb-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* App icon(s) with 3D tilt */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          {imageSrcs && imageSrcs.length > 1 ? (
            <div className="flex items-center justify-center gap-6">
              {imageSrcs.map((src, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                >
                  <TiltIcon>
                    {({ rotateX: rx, rotateY: ry, boxShadow: bs }) => (
                      <motion.img
                        src={src}
                        alt={`${heading} icon ${idx + 1}`}
                        className="w-[120px] h-[120px] rounded-[1.75rem] object-cover"
                        style={{ rotateX: rx, rotateY: ry, boxShadow: bs }}
                      />
                    )}
                  </TiltIcon>
                </motion.div>
              ))}
            </div>
          ) : (
            <div
              ref={iconRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="inline-block"
              style={{ perspective: 600 }}
            >
              <motion.img
                src={imageSrc}
                alt={`${heading} icon`}
                className={`mx-auto w-[134px] h-[134px] rounded-[2rem] ${cropImage ? 'object-cover' : 'object-contain'} transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{ rotateX: springX, rotateY: springY, boxShadow }}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          )}
        </motion.div>

        {/* App name */}
        <motion.h1
          className="text-headline text-gray-900"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {heading}
        </motion.h1>

        {/* Description */}
        <motion.p
          className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed [text-wrap:balance]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {description}
        </motion.p>

        {/* System requirement pills */}
        {pills.length > 0 && (
          <motion.div
            className="flex flex-wrap justify-center gap-2 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {pills.map((pill, idx) => (
              <span
                key={idx}
                onMouseMove={trackLiquidGlassCursor}
                className="liquid-glass liquid-glass-pill liquid-glass-interactive inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-gray-600"
              >
                {pill}
              </span>
            ))}
          </motion.div>
        )}

        {/* App Store, GitHub & Web */}
        {(showAppStoreButton || githubHref || webHref) && (
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            {showAppStoreButton && appStoreHref && (
              <GlassButton
                href={appStoreHref}
                target="_blank"
                shape="rect"
                tone="ghost"
                textColor="#1f2937"
                className="w-[200px] h-12 gap-3"
                ariaLabel={`Download ${heading} on the App Store`}
              >
                <svg className="w-7 h-7 text-gray-800 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <span className="flex flex-col leading-none text-left">
                  <span className="text-[9px] tracking-wide">Download on the</span>
                  <span className="text-[18px] font-semibold -mt-px tracking-tight">App Store</span>
                </span>
              </GlassButton>
            )}
            {githubHref && (
              <GlassButton
                href={githubHref}
                target="_blank"
                shape="rect"
                tone="ghost"
                textColor="#1f2937"
                className="w-[200px] h-12 gap-3"
                ariaLabel={`View ${heading} on GitHub`}
              >
                <span className="flex flex-col leading-none text-right">
                  <span className="text-[9px] tracking-wide">View code on</span>
                  <span className="text-[18px] font-semibold -mt-px tracking-tight">GitHub</span>
                </span>
                <svg className="w-7 h-7 text-gray-800 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </GlassButton>
            )}
            {webHref && (
              <GlassButton
                to={webHref}
                shape="rect"
                accentColor="#3b82f6"
                className="w-[200px] h-12"
                ariaLabel="View your portfolio on Opalite Web"
              >
                <span className="flex flex-col leading-none text-center">
                  <span className="text-[9px] tracking-wide text-white/80">View your portfolio</span>
                  <span className="text-[18px] font-semibold -mt-px tracking-tight">Log In</span>
                </span>
              </GlassButton>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
