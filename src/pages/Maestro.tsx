import maestroIcon from '../assets/maestro/maestroicon.png';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import ScrollToTop from '../components/ScrollToTop';
import DownloadCTA from '../components/DownloadCTA';
import ExportCounter from '../components/ExportCounter';
import { usePageMeta } from '../hooks';

// Official brand color: Tesla Autopilot blue, the app's own accent.
const ACCENT_COLOR = '#2D7FF9';

// TODO: replace with the real App Store URL once v1 is live.
const APP_STORE_URL = 'https://apps.apple.com/us/app/maestro-light-show-studio/';

/** Placeholder marketing frames until real captures land - solid panels in
 *  the app's palette, each naming the shot that will replace it. */
const placeholderShots = [
  { label: 'The Stage', caption: 'Five Teslas mid-chorus, lights blazing', color: '#101828' },
  { label: 'Sequence Editor', caption: 'Every channel on a timeline', color: '#0D1526' },
  { label: 'Song Analysis', caption: 'Beats, drops and solos, detected', color: '#111B33' },
  { label: 'USB Export', caption: 'Validated for the car, every time', color: '#0A1120' },
  { label: 'Fleet Circle', caption: 'One car or a whole fleet', color: '#0F1930' },
  { label: 'Vertical Video', caption: 'Social-ready 9:16 exports', color: '#0C1424' },
];

export default function Maestro() {
  usePageMeta({
    title: 'Maestro – Tesla Light Show Studio for Mac | Nick Molargik',
    description:
      'Maestro turns any song into a Tesla light show on your Mac. On-device signal processing, a channel-level sequence editor, and USB-ready exports. No AI, nothing uploaded.',
    accentColor: ACCENT_COLOR,
    preloadImage: maestroIcon,
  });

  return (
    <>
      <section>
        <Hero
          heading="Maestro"
          description="Drop in a song. Get a Tesla light show. Choreographed on your Mac, played on your car."
          imageSrc={maestroIcon}
          appStoreHref={APP_STORE_URL}
          systemRequirements={['macOS 14+', 'Model S · 3 · X · Y · Cybertruck']}
        />
      </section>

      {/* The counter - front and center. */}
      <section
        aria-label="Exported show counter"
        className="bg-[#07090f] py-16 sm:py-20"
      >
        <div className="mx-auto max-w-4xl px-6">
          <ExportCounter accentColor={ACCENT_COLOR} />
        </div>
      </section>

      <section className="bg-surface dark:bg-[#0c0c10] pt-10 pb-16">
        {/* Placeholder marketing imagery: solid panels until real captures. */}
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {placeholderShots.map((shot) => (
              <div
                key={shot.label}
                className="relative flex aspect-[4/3] flex-col items-center justify-center rounded-2xl border border-white/10 p-4 text-center"
                style={{ backgroundColor: shot.color }}
                role="img"
                aria-label={`${shot.label} - ${shot.caption}`}
              >
                <span
                  className="text-sm font-semibold uppercase tracking-widest"
                  style={{ color: ACCENT_COLOR }}
                >
                  {shot.label}
                </span>
                <span className="mt-2 text-xs text-gray-400">{shot.caption}</span>
              </div>
            ))}
          </div>
        </div>

        <section
          aria-label="About Maestro"
          className="mt-16 px-4 bg-[linear-gradient(to_right,_#2D7FF908_1px,_transparent_1px),linear-gradient(to_bottom,_#2D7FF908_1px,_transparent_1px)] bg-[size:40px_40px]"
        >
          <div className="mx-auto max-w-5xl">
            <div
              className="relative overflow-hidden bg-white dark:bg-[#0a0a0c] rounded-3xl border border-gray-100 dark:border-gray-800 border-t-2 px-6 py-10 shadow-sm sm:px-10"
              style={{ borderTopColor: ACCENT_COLOR }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#2D7FF9] to-transparent opacity-40"
              />
              <div className="relative space-y-6">
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  Maestro — Your Tesla&apos;s Light Show Studio
                </h2>
                <p className="text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                  Maestro listens to your song — its beats, key, builds, drops and solos — and choreographs a
                  full Tesla light show around them. Preview it on an animated stage of hardware-accurate
                  vehicles, fine-tune every channel in the sequence editor, then export USB-ready files the
                  car accepts on the first try.
                </p>

                <hr className="my-6 border-gray-200 dark:border-gray-800" />

                <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                        No AI. Just signal processing.
                      </h3>
                      <p className="mt-2 text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                        Maestro doesn&apos;t guess with a generative model. It measures your song and
                        choreographs from the math — deterministic, reproducible, and entirely on your Mac.
                        Nothing is ever uploaded.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                        Every body style, faithfully
                      </h3>
                      <p className="mt-2 text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                        Model S, 3, X, Y and Cybertruck — old and new bodies — each previewed with the lamps,
                        light bars, closures and interior lighting that car actually has. What you see on the
                        stage is what plays in the driveway.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                        Two free shows, then one purchase
                      </h3>
                      <p className="mt-2 text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                        Your first two exported shows are free. One purchase unlocks unlimited shows, unlimited
                        exports and the Sequence Editor — no subscription, yours forever.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 lg:mt-0" role="region" aria-label="Key Features">
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                      Key Features
                    </h3>
                    <div className="mt-4 grid gap-4">
                      <FeatureCard
                        icon="🎼"
                        title="Song-Aware Choreography"
                        description="Sections, drops, solos and full stops each get their own treatment. Re-roll any section with a right-click until the take feels right."
                        index={0}
                        accentColor={ACCENT_COLOR}
                      />
                      <FeatureCard
                        icon="🎛️"
                        title="Sequence Editor"
                        description="Every channel on a timeline: move, add, delete and reshape blocks, with the selected fixture outlined in red on every car."
                        index={1}
                        accentColor={ACCENT_COLOR}
                      />
                      <FeatureCard
                        icon="🚗"
                        title="Animated Fleet Preview"
                        description="Up to 15 of each model on stage, in rows or a circle, with beams, closures and interior RGB simulated exactly as the hardware behaves."
                        index={2}
                        accentColor={ACCENT_COLOR}
                      />
                      <FeatureCard
                        icon="📼"
                        title="USB-Ready Exports"
                        description="Validated .fseq and audio files named the way the car wants them, written straight to your drive's LightShow folder."
                        index={3}
                        accentColor={ACCENT_COLOR}
                      />
                      <FeatureCard
                        icon="📱"
                        title="Vertical Video Export"
                        description="Render a 9:16 social cut of your show in seconds, watermarked with the song and how fast Maestro made it."
                        index={4}
                        accentColor={ACCENT_COLOR}
                      />
                      <FeatureCard
                        icon="🌍"
                        title="Five Languages"
                        description="English, Spanish, German, Dutch and Norwegian, with hardware-accurate previews in every one of them."
                        index={5}
                        accentColor={ACCENT_COLOR}
                      />
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 italic">
                  Maestro requires macOS 14 or later. Light show playback requires a Tesla vehicle with
                  software v11.0 (2021.44.25) or newer. Not affiliated with Tesla.
                </p>
              </div>
            </div>
          </div>
        </section>

        <DownloadCTA
          appName="Maestro"
          appStoreUrl={APP_STORE_URL}
          accentColor={ACCENT_COLOR}
        />
      </section>
      <ScrollToTop />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Maestro: Light Show Studio',
            applicationCategory: 'EntertainmentApplication',
            operatingSystem: 'macOS',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            url: APP_STORE_URL,
          }),
        }}
      />
    </>
  );
}
