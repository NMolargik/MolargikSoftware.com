import { useRef, useState, type ReactNode } from 'react';
import Hero from './Hero';
import ScreensCarousel from './ScreensCarousel';
import FeatureCard from './FeatureCard';
import ScrollToTop from './ScrollToTop';
import DownloadCTA from './DownloadCTA';
import { usePageMeta, useScrollToStart } from '../hooks';

export interface AppFeature {
  icon: string;
  title: string;
  description: string;
}

export interface AppSection {
  title: ReactNode;
  body: ReactNode;
}

export interface AppShowcaseProps {
  /** Short app name used in alt text, CTA copy, and aria labels. */
  name: string;
  /** Hero heading; defaults to `name`. */
  heading?: string;
  /** One-line hook under the hero heading. */
  tagline: string;
  icon: string;
  accentColor: string;
  meta: { title: string; description: string };
  appStoreUrl?: string;
  githubUrl?: string;
  webHref?: string;
  /** Pills under the hero: supported OS versions, hardware, etc. */
  requirements?: string[];
  /** Ordered screenshot URLs (see `screensFromGlob`). */
  screens: string[];
  /** Tailwind classes for the screenshot band background. */
  screensClassName?: string;
  /** Rendered between the screenshots and the About card. */
  afterScreens?: ReactNode;
  about: {
    title: ReactNode;
    intro: ReactNode;
    sections: AppSection[];
    features: AppFeature[];
    featuresTitle?: string;
    footnote?: ReactNode;
  };
  /** Set to `false` to hide the bottom download card. */
  cta?: { preorder?: boolean } | false;
  /** schema.org SoftwareApplication payload. */
  jsonLd?: Record<string, unknown>;
}

/**
 * The shared layout for every app page: hero, screenshot carousel, an
 * optional slot, the About card (narrative on the left, feature cards on the
 * right), download CTA, and structured data. Pages only supply content.
 */
export default function AppShowcase({
  name,
  heading,
  tagline,
  icon,
  accentColor,
  meta,
  appStoreUrl,
  githubUrl,
  webHref,
  requirements = [],
  screens,
  screensClassName = 'bg-surface',
  afterScreens,
  about,
  cta = {},
  jsonLd,
}: AppShowcaseProps) {
  const carouselRefDesktop = useRef<HTMLDivElement | null>(null);
  const carouselRefMobile = useRef<HTMLDivElement | null>(null);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
  const markLoaded = (i: number) => setLoaded((prev) => ({ ...prev, [i]: true }));

  usePageMeta({
    title: meta.title,
    description: meta.description,
    accentColor,
    preloadImage: icon,
  });

  useScrollToStart(carouselRefDesktop, carouselRefMobile);

  return (
    <>
      <section>
        <Hero
          heading={heading ?? name}
          description={tagline}
          imageSrc={icon}
          appStoreHref={appStoreUrl}
          showAppStoreButton={Boolean(appStoreUrl)}
          githubHref={githubUrl}
          webHref={webHref}
          systemRequirements={requirements}
        />
      </section>

      <section className={`${screensClassName} pt-6 pb-16`}>
        {screens.length > 0 && (
          <ScreensCarousel
            slides={screens}
            loaded={loaded}
            offset={0}
            markLoaded={markLoaded}
            desktopRef={carouselRefDesktop}
            mobileRef={carouselRefMobile}
            altPrefix={name}
          />
        )}

        {afterScreens}

        <section aria-label={`About ${name}`} className="mt-16 px-4">
          <div className="mx-auto max-w-5xl">
            <div
              className="relative overflow-hidden bg-white dark:bg-[#0a0a0c] rounded-3xl border border-gray-100 dark:border-gray-800 border-t-2 px-6 py-10 shadow-sm sm:px-10"
              style={{ borderTopColor: accentColor }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-10 top-0 h-px opacity-40"
                style={{ backgroundImage: `linear-gradient(to right, transparent, ${accentColor}, transparent)` }}
              />
              <div className="relative space-y-6">
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {about.title}
                </h2>
                <p className="text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                  {about.intro}
                </p>

                <hr className="my-6 border-gray-200 dark:border-gray-800" />

                <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start">
                  <div className="space-y-6">
                    {about.sections.map((section, idx) => (
                      <div key={idx}>
                        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                          {section.title}
                        </h3>
                        <p className="mt-2 text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                          {section.body}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 lg:mt-0" role="region" aria-label={about.featuresTitle ?? 'Key Features'}>
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                      {about.featuresTitle ?? 'Key Features'}
                    </h3>
                    <div className="mt-4 grid gap-4">
                      {about.features.map((feature, idx) => (
                        <FeatureCard
                          key={feature.title}
                          icon={feature.icon}
                          title={feature.title}
                          description={feature.description}
                          index={idx}
                          accentColor={accentColor}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {about.footnote && (
                  <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 italic">{about.footnote}</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {cta !== false && appStoreUrl && (
          <DownloadCTA
            appName={name}
            appStoreUrl={appStoreUrl}
            accentColor={accentColor}
            preorder={cta.preorder}
          />
        )}
      </section>

      <ScrollToTop />

      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'SoftwareApplication', ...jsonLd }),
          }}
        />
      )}
    </>
  );
}
