import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import ScrollToTop from '../components/ScrollToTop';
import { usePageMeta } from '../hooks';
import streetIQIcon from '../assets/streetiq/streetiqicon.webp';
import streetIQLogo from '../assets/streetiq/streetiqlogo.webp';

// StreetIQ brand palette — teal mark + navy wordmark
const ACCENT_COLOR = 'rgb(63, 168, 188)';
const ACCENT_HEX = '#3FA8BC';
const NAVY_HEX = '#2C3E4B';

export default function StreetIQ() {
  usePageMeta({
    title: 'StreetIQ | Nick Molargik',
    description:
      'Nick Molargik is joining StreetIQ as a Senior Software Engineer, building the native iOS data collection and analysis app in Swift and SwiftUI.',
    accentColor: ACCENT_COLOR,
  });

  return (
    <>
      {/* Affiliation disclaimer */}
      <div className="w-full bg-red-600 text-white text-sm text-center px-4 py-2 pt-16">
        <strong>Disclaimer:</strong> Molargik Software LLC is not affiliated with StreetIQ. Nicholas Molargik is employed as a Senior Software Engineer at StreetIQ.
      </div>

      <section>
        <Hero
          heading="StreetIQ"
          description="AI-powered pavement intelligence helping cities and counties assess roads, prioritize repairs, and plan budgets with confidence."
          imageSrc={streetIQIcon}
          cropImage
          showAppStoreButton={false}
          systemRequirements={['iOS', 'Swift', 'SwiftUI']}
        />
      </section>

      <section className="bg-surface dark:bg-[#0c0c10] pt-6 pb-16">
        {/* About section */}
        <section
          aria-label="About StreetIQ"
          className="mt-8 px-4"
          style={{ background: `linear-gradient(to right, ${ACCENT_HEX}08 1px, transparent 1px), linear-gradient(to bottom, ${ACCENT_HEX}08 1px, transparent 1px)`, backgroundSize: '40px 40px' }}
        >
          <div className="mx-auto max-w-5xl">
            <div
              className="relative overflow-hidden bg-white dark:bg-[#0a0a0c] rounded-3xl border border-gray-100 dark:border-gray-800 border-t-2 px-6 py-10 shadow-sm sm:px-10"
              style={{ borderTopColor: ACCENT_HEX }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent to-transparent opacity-40"
                style={{ backgroundImage: `linear-gradient(to right, transparent, ${ACCENT_HEX}, transparent)` }}
              />
              <div className="relative space-y-6">
                {/* Logo lockup */}
                <img
                  src={streetIQLogo}
                  alt="StreetIQ"
                  className="h-12 w-auto"
                  loading="lazy"
                />

                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  StreetIQ — Intelligence for Public Infrastructure
                </h2>
                <p className="text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                  Replacing manual, subjective road surveys with a defensible, automated system of intelligence for planning, compliance, and budgeting.
                </p>

                <hr className="my-6 border-gray-200 dark:border-gray-800" />

                <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                        What is StreetIQ?
                      </h3>
                      <p className="mt-2 text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                        StreetIQ is an Indianapolis-based startup applying computer vision and machine learning to street-level imagery, giving public works teams an objective way to score roadway conditions, standardize reporting, and communicate progress to stakeholders.
                      </p>
                      <p className="mt-3 text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                        The platform supports the full lifecycle of infrastructure decision-making — from data collection and analysis through treatment recommendations, budget optimization, and council-ready reporting. StreetIQ is backed by The Heritage Group and is already in service with local government customers.
                      </p>
                    </div>

                    <hr className="my-6 border-gray-200 dark:border-gray-800 lg:hidden" />

                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                        Going Native on iOS
                      </h3>
                      <p className="mt-2 text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                        I am joining StreetIQ to build their mobile application natively for iOS using Swift and SwiftUI. The goal is a fast, reliable field experience — improving performance and delivering a seamless data collection and analysis workflow for the teams capturing road conditions on the ground.
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400 italic">
                        This is a newly started role — more detail on specific contributions will follow as the work ships.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 lg:mt-0" role="region" aria-label="My Role">
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                      My Role
                    </h3>
                    <div className="mt-4 grid gap-4">
                      <FeatureCard
                        icon="📱"
                        title="Native iOS Application"
                        description="Building StreetIQ's enterprise iOS app from the ground up in Swift and SwiftUI — a native foundation for fast, reliable field data collection."
                        index={0}
                        accentColor={ACCENT_HEX}
                      />
                      <FeatureCard
                        icon="⚡"
                        title="Performance First"
                        description="Leveraging native Apple technologies to improve responsiveness and capture quality over cross-platform approaches, keeping the field experience smooth."
                        index={1}
                        accentColor={ACCENT_HEX}
                      />
                      <FeatureCard
                        icon="📊"
                        title="Data Collection & Analysis"
                        description="Designing a seamless workflow for collecting street-level data in the field and surfacing it for StreetIQ's analysis and reporting platform."
                        index={2}
                        accentColor={NAVY_HEX}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
      <ScrollToTop />
    </>
  );
}
