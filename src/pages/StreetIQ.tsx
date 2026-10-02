import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import LiquidGlass from '../components/LiquidGlass';
import ScrollToTop from '../components/ScrollToTop';
import { usePageMeta } from '../hooks';
import { fadeUp, staggerContainer, staggerChild } from '../utils/animations';
import { trackLiquidGlassCursor } from '../utils/liquidGlass';
import streetIQIcon from '../assets/streetiq/streetiqicon.webp';
import streetIQLogo from '../assets/streetiq/streetiqlogo.webp';
import scoutLogo from '../assets/streetiq/scoutlogo.png';

// StreetIQ brand palette — teal mark + navy wordmark
const ACCENT_HEX = '#3FA8BC';
const NAVY_HEX = '#2C3E4B';
const PELLET_HEX = '#F59E0B';

const ACRONYM = [
  ['S', 'urface'],
  ['C', 'ondition'],
  ['O', 'bserver'],
  ['U', 'sing'],
  ['T', 'echnology'],
];

const STATS = [
  { value: 'iOS 26+', label: 'Swift 6.2 · SwiftUI' },
  { value: '~1,150', label: 'tests across ~150 suites' },
  { value: '6', label: 'feature modules, one pure core' },
  { value: '0', label: 'third-party analytics SDKs' },
];

const PIPELINE = [
  { step: '01', title: 'Drive', body: 'Pick an assessment. Its road network and map tiles are already on the phone, so the drive works with no signal.' },
  { step: '02', title: 'Capture', body: 'Geotagged imagery fires at a chosen distance interval, dead-reckoned between GPS fixes so spacing holds at highway speed.' },
  { step: '03', title: 'Cover', body: 'Point-level coverage is computed on device. The shutter only fires where pavement is still owed.' },
  { step: '04', title: 'Upload', body: 'Measurements report live during the drive; imagery uploads in the background and survives relaunch.' },
  { step: '05', title: 'Rate', body: 'AI condition ratings land on every asset, with PASER scales that follow the road’s surface type.' },
];

const HIGHLIGHTS = [
  {
    icon: '🎯',
    title: 'Dynamic Capture',
    description:
      'Coverage is point-level, not a per-asset flag. Re-driving captured pavement puts the camera on standby instead of filling the drive with duplicates.',
  },
  {
    icon: '🟠',
    title: 'Live Coverage ("PacMan")',
    description:
      'Drive a road and watch it get eaten: orange pellets where capture is still owed, teal dots where measurements exist, completion tracked per road.',
  },
  {
    icon: '📸',
    title: 'Distance-Based Capture',
    description:
      'Low-latency frames ripped from a continuously running camera, wide or ultra-wide lens with remembered zoom, optional dual-camera.',
  },
  {
    icon: '🚘',
    title: 'Built for the Driver’s Seat',
    description:
      'A 3D driving map that looks down the road, the viewfinder in the corner nearest the camera, and every control stacked at the right thumb.',
  },
  {
    icon: '🧭',
    title: 'Turn-by-Turn Navigation',
    description:
      'Route to an asset, an assessment, or a long-pressed pin with spoken instructions. The corner item carries the next maneuver, distance, and ETA.',
  },
  {
    icon: '🎥',
    title: 'Companion Cameras',
    description:
      'Pair a GoPro once and it reconnects on its own, shoots alongside SCOUT, pauses when you pause, and rests on pavement already covered.',
  },
  {
    icon: '🗺️',
    title: 'Offline Maps',
    description:
      'Every assessment on the device gets its own map tiles over Wi-Fi and keeps them current, refreshed in place when roads or tiles change.',
  },
  {
    icon: '🌡️',
    title: 'Thermal Management',
    description:
      'A staged thermal governor, speed-adaptive camera streaming, and two-tier stationary sleep so multi-hour metro drives never hit the critical thermal state.',
  },
  {
    icon: '📶',
    title: 'Resilient Uploads',
    description:
      'Background uploads that survive relaunch, pinned to Wi-Fi, auto-retrying transient drops, and surfaced through a Live Activity and Lock Screen state.',
  },
];

const ARCHITECTURE = [
  { name: 'SCOUT app target', detail: 'Composition root, lifecycle, Live Activities, MetricKit reporting, widgets', tint: NAVY_HEX },
  { name: 'Feature modules', detail: 'Auth · Dashboard · Assessments · Assets · Settings · Capture — SwiftUI views and @Observable view models', tint: ACCENT_HEX },
  { name: 'Design System · Navigation · Data', detail: 'Brand assets, haptics, and the map legend; the turn-by-turn engine; networking, SwiftData, background uploads, GoPro adapter', tint: '#5BBAC9' },
  { name: 'SCOUTCore', detail: 'Pure Swift domain: models, protocols, routing, the coverage engines, the upload center. Depends on nothing.', tint: '#7FCBD6' },
];

const STACK = [
  'Swift 6.2',
  'SwiftUI',
  'Observation',
  'Structured Concurrency',
  'SwiftData',
  'Mapbox Maps',
  'AVFoundation',
  'CoreLocation',
  'CoreMotion',
  'CoreBluetooth',
  'ActivityKit',
  'MetricKit',
  'Swift Testing',
  'Xcode Cloud',
];

/** Stylized illustration of SCOUT's live coverage: pellets ahead, dots behind. */
function CoverageIllustration() {
  const road = 'M 20 150 C 120 40, 220 260, 330 150 S 520 40, 600 150';
  return (
    <svg
      viewBox="0 0 620 220"
      className="w-full h-auto"
      role="img"
      aria-label="A road on a map: teal dots mark pavement already captured behind the vehicle, orange pellets mark pavement still to capture ahead"
    >
      <defs>
        <linearGradient id="scoutRoad" x1="0" x2="1">
          <stop offset="0" stopColor="#E5E7EB" />
          <stop offset="1" stopColor="#D1D5DB" />
        </linearGradient>
      </defs>
      <path d={road} fill="none" stroke="url(#scoutRoad)" strokeWidth="26" strokeLinecap="round" />
      <path d={road} fill="none" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="10 12" opacity="0.9" />

      {/* Captured: teal dots on the first half of the road */}
      {[0.03, 0.09, 0.15, 0.21, 0.27, 0.33, 0.39, 0.45].map((t, i) => (
        <motion.circle
          key={`dot-${i}`}
          r="6"
          fill={ACCENT_HEX}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.15 }}
        >
          <animateMotion dur="0.001s" fill="freeze" keyPoints={`${t};${t}`} keyTimes="0;1" path={road} />
        </motion.circle>
      ))}

      {/* Owed: orange pellets ahead */}
      {[0.58, 0.64, 0.7, 0.76, 0.82, 0.88, 0.94].map((t, i) => (
        <circle key={`pellet-${i}`} r="5" fill={PELLET_HEX} opacity="0.9">
          <animateMotion dur="0.001s" fill="freeze" keyPoints={`${t};${t}`} keyTimes="0;1" path={road} />
        </circle>
      ))}

      {/* The vehicle puck */}
      <g>
        <animateMotion dur="0.001s" fill="freeze" keyPoints="0.51;0.51" keyTimes="0;1" path={road} rotate="auto" />
        <circle r="16" fill={ACCENT_HEX} opacity="0.18">
          <animate attributeName="r" values="14;22;14" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle r="9" fill={NAVY_HEX} stroke="#FFFFFF" strokeWidth="3" />
        <path d="M 2 -4 L 9 0 L 2 4 Z" fill="#FFFFFF" />
      </g>
    </svg>
  );
}

export default function StreetIQ() {
  usePageMeta({
    title: 'StreetIQ & SCOUT – Native iOS Pavement Assessment | Nick Molargik',
    description:
      'Nick Molargik leads the ground-up SwiftUI rebuild of SCOUT, StreetIQ’s native iOS field app: distance-based capture, live on-device coverage, offline maps, GoPro companions, and AI pavement ratings.',
    accentColor: ACCENT_HEX,
    preloadImage: streetIQIcon,
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
          systemRequirements={['iOS 26+', 'Swift 6.2', 'SwiftUI', 'Mapbox']}
        />
      </section>

      {/* SCOUT showcase band */}
      <section
        aria-label="SCOUT"
        className="relative overflow-hidden text-white"
        style={{ background: `linear-gradient(160deg, ${NAVY_HEX} 0%, #1b2a36 55%, #10202a 100%)` }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-24 w-[520px] h-[520px] rounded-full opacity-40 blur-3xl"
          style={{ background: `radial-gradient(circle, ${ACCENT_HEX}80 0%, transparent 70%)` }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <motion.div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center" {...fadeUp}>
            <div>
              <div className="flex items-center gap-5">
                <img src={scoutLogo} alt="SCOUT" className="h-16 w-auto" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: ACCENT_HEX }}>
                    Introducing
                  </p>
                  <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">SCOUT</h2>
                </div>
              </div>

              <p className="mt-5 flex flex-wrap gap-x-3 gap-y-1 text-lg text-white/80">
                {ACRONYM.map(([letter, rest]) => (
                  <span key={letter}>
                    <span className="font-bold" style={{ color: ACCENT_HEX }}>{letter}</span>
                    {rest}
                  </span>
                ))}
              </p>

              <p className="mt-6 text-lg sm:text-xl leading-relaxed text-white/90 [text-wrap:balance]">
                Drive a route. SCOUT captures geotagged road imagery, tracks coverage live, and rates pavement condition
                with AI — the native iOS field app I build for StreetIQ, re-architected from the ground up in Swift and SwiftUI.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {STATS.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                    <div className="text-2xl font-bold tabular-nums" style={{ color: ACCENT_HEX }}>{stat.value}</div>
                    <div className="mt-1 text-xs text-white/70 leading-snug">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/95 p-5 shadow-2xl">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-gray-500">
                <span>Live coverage</span>
                <span className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: ACCENT_HEX }} />Captured</span>
                  <span className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: PELLET_HEX }} />Owed</span>
                </span>
              </div>
              <div className="mt-3">
                <CoverageIllustration />
              </div>
              <p className="mt-2 text-sm text-gray-600">
                The shutter fires only where pavement is still owed. Coverage is computed on the phone, so it works with no signal.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How a drive works */}
      <section className="bg-surface py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div className="text-center mb-10" {...fadeUp}>
            <h2 className="text-headline text-gray-900">How a drive works</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              From the first turn of the key to a rated road network, every step happens on the phone first.
            </p>
          </motion.div>
          <motion.ol
            className="grid gap-4 md:grid-cols-5 list-none p-0 m-0"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {PIPELINE.map((item) => (
              <motion.li key={item.step} variants={staggerChild} className="h-full">
                <LiquidGlass variant="card" accentColor={ACCENT_HEX} className="rounded-2xl p-5 h-full">
                  <div className="text-xs font-mono font-semibold tracking-widest" style={{ color: ACCENT_HEX }}>{item.step}</div>
                  <h3 className="mt-2 text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.body}</p>
                </LiquidGlass>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      {/* Highlights + architecture */}
      <section
        aria-label="About SCOUT"
        className="px-4 py-14 sm:py-16"
        style={{
          background: `linear-gradient(to right, ${ACCENT_HEX}08 1px, transparent 1px), linear-gradient(to bottom, ${ACCENT_HEX}08 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      >
        <div className="mx-auto max-w-6xl">
          <div
            className="relative overflow-hidden bg-white rounded-3xl border border-gray-100 border-t-2 px-6 py-10 shadow-sm sm:px-10"
            style={{ borderTopColor: ACCENT_HEX }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-10 top-0 h-px opacity-40"
              style={{ backgroundImage: `linear-gradient(to right, transparent, ${ACCENT_HEX}, transparent)` }}
            />
            <div className="relative space-y-6">
              <img src={streetIQLogo} alt="StreetIQ" className="h-12 w-auto" loading="lazy" />

              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900">
                StreetIQ — Intelligence for Public Infrastructure
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-gray-600">
                StreetIQ is an Indianapolis-based company applying computer vision and machine learning to street-level
                imagery, giving public works teams an objective way to score roadway conditions, standardize reporting,
                and communicate progress to stakeholders. SCOUT is where that imagery comes from: the app in the field
                operator&apos;s hands, mounted on the dash, driving the roads.
              </p>

              <hr className="my-6 border-gray-200" />

              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:items-start">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">My Role</h3>
                    <p className="mt-2 text-base sm:text-lg leading-relaxed text-gray-600">
                      I joined StreetIQ to replace the original cross-platform field app with a native one, and SCOUT is
                      the result: a ground-up SwiftUI rebuild on a clean, testable, layered Swift Package. I own the
                      architecture, the capture pipeline, the coverage engines, the companion-camera integration, the
                      offline map system, and the Xcode Cloud delivery pipeline behind four environments.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Architecture</h3>
                    <p className="mt-2 text-base sm:text-lg leading-relaxed text-gray-600">
                      A thin app target on top of an umbrella Swift Package of single-responsibility modules.
                      Dependencies point inward: features depend on the design system and core, data implements
                      core&apos;s protocols, and core depends on nothing — so the business logic is fast and
                      deterministic to unit-test without a simulator.
                    </p>
                    <ol className="mt-4 space-y-2 list-none p-0 m-0">
                      {ARCHITECTURE.map((layer, idx) => (
                        <li
                          key={layer.name}
                          className="rounded-xl px-4 py-3 text-white shadow-sm"
                          style={{ backgroundColor: layer.tint, marginLeft: `${idx * 10}px` }}
                        >
                          <div className="text-sm font-semibold">{layer.name}</div>
                          <div className="text-xs opacity-90 leading-snug">{layer.detail}</div>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Built With</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {STACK.map((item) => (
                        <span
                          key={item}
                          onMouseMove={trackLiquidGlassCursor}
                          className="liquid-glass liquid-glass-pill inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-gray-700"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div role="region" aria-label="SCOUT Highlights">
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Highlights</h3>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {HIGHLIGHTS.map((feature, idx) => (
                      <FeatureCard
                        key={feature.title}
                        icon={feature.icon}
                        title={feature.title}
                        description={feature.description}
                        index={idx}
                        accentColor={ACCENT_HEX}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm text-gray-500 italic">
                SCOUT is built by StreetIQ for its field crews and customers. It is StreetIQ&apos;s product, not a
                Molargik Software app, and is described here only to show the work.
              </p>
            </div>
          </div>
        </div>
      </section>
      <ScrollToTop />
    </>
  );
}
