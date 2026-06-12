import { useEffect, type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import LiquidGlass from '../components/LiquidGlass';
import GlassButton from '../components/GlassButton';
import { staggerContainer } from '../utils/animations';
import { hexToRgbTriple, trackLiquidGlassCursor } from '../utils/liquidGlass';
import familyshot from '../assets/familyshot.jpg';
import logo from '../assets/logo.svg';
import ScrollToTop from '../components/ScrollToTop';
import opaliteIcon from '../assets/opalite/opaliteicon.png';
import mygraIcon from '../assets/mygra/mygraicon.png';
import waffleIcon from '../assets/waffle/waffleicon.png';
import storkIcon from '../assets/stork/storkicon.png';
import setDeckIcon from '../assets/setdeck/setdeckicon.png';
import { fadeUp } from '../utils/animations';

const SKILL_GROUPS = [
  {
    category: 'Mobile Development',
    accent: '#2563EB',
    items: ['SwiftUI', 'Swift', 'Kotlin Multiplatform', 'Flutter + BLoC', 'Jetpack Compose'],
  },
  {
    category: 'Apple Ecosystem',
    accent: '#16A34A',
    items: ['HealthKit', 'WeatherKit', 'Apple Intelligence', 'SwiftData', 'CloudKit', 'WebView API'],
  },
  {
    category: 'Systems Engineering',
    accent: '#7C3AED',
    items: ['C Libraries', 'MATLAB', 'Python Automation', 'GitLab CI/CD', 'Hardware Integration'],
  },
];

function GlassSkillPill({ skill, accent }: { skill: string; accent: string }) {
  const rgb = hexToRgbTriple(accent);
  const style: CSSProperties = rgb
    ? ({ '--lg-accent': rgb, color: accent } as CSSProperties)
    : { color: accent };
  return (
    <span
      onMouseMove={trackLiquidGlassCursor}
      className="liquid-glass liquid-glass-pill inline-flex items-center rounded-full px-3 py-1 text-sm font-medium"
      style={style}
    >
      {skill}
    </span>
  );
}

export default function About() {
  useEffect(() => {
    document.title = 'About – Nick Molargik | Molargik Software LLC';
    const desc = 'Nick Molargik: Crafting mobile applications that balance elegant design with technical capability — built with Swift, SwiftUI, SwiftData, Kotlin Multiplatform, and Flutter. From world-class storefronts at Sweetwater to advanced sports technology at V1 Sports and infrastructure intelligence at StreetIQ, now also developing useful, Apple-centric tools like SetDeck, Mygra, Waffle, and Stork.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = desc;
  }, []);

  const projects = [
    { title: 'Opalite', tagline: 'The ultimate color manager: create, organize, and share palettes with AI-generated names, contrast checking, and seamless iCloud sync.', image: opaliteIcon, path: '/opalite', accentColor: '#CAC0E8' },
    { title: 'SetDeck', tagline: 'Workout tracker with HealthKit sync and set-by-set progress statistics.', image: setDeckIcon, path: '/setdeck', accentColor: '#65DA92' },
    { title: 'Mygra', tagline: 'AI-powered migraine tracker with WeatherKit alerts, HealthKit correlations, and Apple Intelligence insights. iOS 26+.', image: mygraIcon, path: '/mygra', accentColor: '#6E60FF' },
    { title: 'Stork', tagline: 'L&D delivery tracker with marble jar, lifelong statistics, and a built-in hospital database.', image: storkIcon, path: '/stork', accentColor: '#E8672B' },
    { title: 'Waffle', tagline: 'iPadOS 26 grid browser with 4x4 layouts, pop-out windows, WebView API, and Liquid Glass effects.', image: waffleIcon, path: '/waffle', accentColor: '#DFA656' },
  ];

  return (
    <>
      {/* Personal Hero Section */}
      <section className="pt-28 pb-10 bg-white dark:bg-[#0a0a0c]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
          >
            <img
              src={familyshot}
              alt="Nick Molargik"
              className="w-40 h-40 rounded-full object-cover mx-auto shadow-lg mb-6"
            />
            <h1 className="text-headline text-gray-900 dark:text-white mb-2">Nick Molargik</h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-6">Senior Software Engineer & Indie Developer</p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Versatile engineer, transitioned from electrical engineering to mobile development. Expertise in Swift, SwiftUI, Flutter, Kotlin Multiplatform, and hardware integration. Building privacy-first solutions that solve real user problems. Husband, Father, Dog Dad, living life in Indiana.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Section */}
      <section className="py-10 bg-surface dark:bg-[#0c0c10]">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] as const }}
          >
            <img src={logo} alt="Molargik Software LLC" className="mx-auto h-16 w-auto mb-4 rounded-md" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Molargik Software LLC</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mt-4">
              Founded in 2025 to transform personal pain points into innovative solutions. Specializing in privacy-first development with iOS 26+, Apple Intelligence, HealthKit, WeatherKit, and more for native experiences.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div {...fadeUp}>
              <LiquidGlass
                variant="card"
                accentColor="#6D00FF"
                className="rounded-2xl p-8 h-full"
              >
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Mission</h3>
                <p className="text-gray-700">
                  Create intuitive, impactful apps born from real user needs—whether tracking migraines with AI, revolutionizing iPad browsing, or empowering L&D nurses. Every project prioritizes privacy, performance, and meaningful problem-solving.
                </p>
              </LiquidGlass>
            </motion.div>
            <motion.div {...fadeUp}>
              <LiquidGlass
                variant="card"
                accentColor="#FF6C00"
                className="rounded-2xl p-8 h-full"
              >
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Core Technologies</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>SwiftUI + Apple Intelligence (iOS 26+)</li>
                  <li>SwiftData + CloudKit cross-device sync</li>
                  <li>HealthKit, WeatherKit, WebView API</li>
                </ul>
              </LiquidGlass>
            </motion.div>
          </div>
          <motion.div className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm" {...fadeUp}>
            <p>
              Built with <span className="text-gray-900 dark:text-white font-medium">React</span>, <span className="text-gray-900 dark:text-white font-medium">Vite</span>, and <span className="text-gray-900 dark:text-white font-medium">Tailwind CSS</span>. Web dev supports my mobile passion—but is certainly not my expertise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Professional Journey Section */}
      <section className="py-10 bg-white dark:bg-[#0a0a0c]">
        <div className="max-w-5xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white"
            {...fadeUp}
          >
            Professional Journey
          </motion.h2>
          <div className="relative">
            {/* Timeline connector line */}
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 border-l-2 border-gray-200 dark:border-gray-800 hidden md:block" />

            <div className="space-y-8">
              {/* StreetIQ */}
              <motion.div
                className="md:ml-12 relative"
                {...fadeUp}
              >
                <div className="absolute -left-[3.25rem] top-8 w-4 h-4 rounded-full border-4 border-white hidden md:block z-10" style={{ backgroundColor: '#3FA8BC' }} />
                <LiquidGlass variant="card" accentColor="#3FA8BC" className="flex flex-col md:flex-row gap-6 items-start rounded-2xl p-8">
                <div className="md:w-auto text-center md:order-2">
                  <div className="w-20 md:w-auto h-16 md:h-auto rounded-lg inline-flex items-center justify-center text-white font-bold text-sm mx-auto px-2 md:px-3 md:py-2" style={{ backgroundColor: '#3FA8BC' }}>
                    <div className="md:hidden text-center">
                      <span className="block leading-tight">2026</span>
                      <span className="block leading-tight text-xs opacity-80">to</span>
                      <span className="block leading-tight">Present</span>
                    </div>
                    <div className="hidden md:flex items-center justify-center gap-1 px-2 whitespace-nowrap">
                      <span>2026</span>
                      <span className="text-xs opacity-80">to</span>
                      <span>Present</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 md:order-1">
                  <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">Senior Software Engineer</h3>
                  <h4 className="text-xl text-gray-500 dark:text-gray-400 mb-4">StreetIQ</h4>
                  <div className="space-y-3 text-gray-600 dark:text-gray-300 leading-relaxed">
                    <p>
                      Joined the Indianapolis-based infrastructure intelligence startup to build their <strong className="text-gray-900 dark:text-white font-semibold">native iOS application</strong> from the ground up in <strong className="text-gray-900 dark:text-white font-semibold">Swift</strong> and <strong className="text-gray-900 dark:text-white font-semibold">SwiftUI</strong>, replacing cross-platform tooling to improve performance and reliability in the field.
                    </p>
                    <p>
                      Focused on a seamless <strong className="text-gray-900 dark:text-white font-semibold">data collection and analysis</strong> experience for the public-works teams capturing street-level road conditions that power StreetIQ's AI pavement scoring and reporting platform.
                    </p>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 italic">
                      <strong className="text-gray-900 dark:text-white font-semibold">Note:</strong> Newly started role — contributions are in progress and will be detailed as the work ships.
                    </p>
                  </div>
                </div>
                </LiquidGlass>
              </motion.div>

              {/* V1 Sports */}
              <motion.div
                className="md:ml-12 relative"
                {...fadeUp}
              >
                <div className="absolute -left-[3.25rem] top-8 w-4 h-4 bg-red-500 rounded-full border-4 border-white hidden md:block z-10" />
                <LiquidGlass variant="card" accentColor="#ef4444" className="flex flex-col md:flex-row gap-6 items-start rounded-2xl p-8">
                <div className="md:w-auto text-center md:order-2">
                  <div className="w-20 md:w-auto h-16 md:h-auto bg-red-500 rounded-lg inline-flex items-center justify-center text-white font-bold text-sm mx-auto px-2 md:px-3 md:py-2">
                    <div className="md:hidden text-center">
                      <span className="block leading-tight">2024</span>
                      <span className="block leading-tight text-xs opacity-80">to</span>
                      <span className="block leading-tight">2026</span>
                    </div>
                    <div className="hidden md:flex flex-col items-center justify-center gap-0.5 px-2 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <span>2024</span>
                        <span className="text-xs opacity-80">to</span>
                        <span>2026</span>
                      </div>
                      <span className="text-[0.65rem] opacity-60">Contractor &rarr; Engineer &rarr; Senior</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 md:order-1">
                  <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">Senior Mobile Software Engineer</h3>
                  <h4 className="text-xl text-gray-500 dark:text-gray-400 mb-4">V1 Sports</h4>
                  <div className="space-y-3 text-gray-600 dark:text-gray-300 leading-relaxed">
                    <p>
                      Built a custom <strong className="text-gray-900 dark:text-white font-semibold">golf ball tracer</strong> from scratch—training a YOLO-based detection model on 28,000 images, converting it to <strong className="text-gray-900 dark:text-white font-semibold">CoreML</strong> for on-device inference, and designing a multi-phase tracking algorithm with trajectory-based detection gating and cluster rejection using Apple's <strong className="text-gray-900 dark:text-white font-semibold">Vision framework</strong>.
                    </p>
                    <p>
                      Delivered a production <strong className="text-gray-900 dark:text-white font-semibold">video pipeline</strong> processing frames at 120 FPS with real-time shot trace rendering. Developed cross-platform video composition using <strong className="text-gray-900 dark:text-white font-semibold">Kotlin Multiplatform</strong>, AVFoundation, and FFmpeg, improving playback and stitching on iOS and Android.
                    </p>
                    <p>
                      Built camera capture features in Swift and AVFoundation, packaged as a <strong className="text-gray-900 dark:text-white font-semibold">Flutter Native Plugin</strong> with Codemagic CI/CD. Designed and shipped <strong className="text-gray-900 dark:text-white font-semibold">multi-device camera sync</strong> — letting multiple iOS devices discover one another over the local network, clock-sync, and record in lockstep for synchronized multi-angle capture. Integrated a pressure mat device via custom <strong className="text-gray-900 dark:text-white font-semibold">C library</strong>, generating real-time heat maps and biomechanics feedback.
                    </p>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 italic">
                      <strong className="text-gray-900 dark:text-white font-semibold">Impact:</strong> Authored system architecture documentation enabling rapid onboarding; led cross-functional discussions and architectural refactors that accelerated feature deployment.
                    </p>
                  </div>
                </div>
                </LiquidGlass>
              </motion.div>

              {/* Molargik Software */}
              <motion.div
                className="md:ml-12 relative"
                {...fadeUp}
              >
                <div className="absolute -left-[3.25rem] top-8 w-4 h-4 bg-purple-500 rounded-full border-4 border-white hidden md:block z-10" />
                <LiquidGlass variant="card" accentColor="#a855f7" className="flex flex-col md:flex-row gap-6 items-start rounded-2xl p-8">
                <div className="md:w-auto text-center md:order-2">
                  <div className="w-20 md:w-auto h-16 md:h-auto bg-purple-500 rounded-lg inline-flex items-center justify-center text-white font-bold text-sm mx-auto px-2 md:px-3 md:py-2">
                    <div className="md:hidden text-center">
                      <span className="block leading-tight">2025</span>
                      <span className="block leading-tight text-xs opacity-80">to</span>
                      <span className="block leading-tight">Present</span>
                    </div>
                    <div className="hidden md:flex items-center justify-center gap-1 px-2 whitespace-nowrap">
                      <span>2025</span>
                      <span className="text-xs opacity-80">to</span>
                      <span>Present</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 md:order-1">
                  <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">Founder & Developer</h3>
                  <h4 className="text-xl text-gray-500 dark:text-gray-400 mb-4">Molargik Software LLC</h4>
                  <div className="space-y-3 text-gray-600 dark:text-gray-300 leading-relaxed">
                    <p>
                      Founded to build Apple apps from real user needs identified through friends, family, and professional networks. Solo-developing full lifecycle—from user interviews and SwiftUI prototyping to App Store deployment and iteration.
                    </p>
                    <p>
                      Launched four apps in first year: <strong className="text-gray-900 dark:text-white font-semibold">Mygra</strong> (AI migraine tracker with WeatherKit/HealthKit), <strong className="text-gray-900 dark:text-white font-semibold">Waffle</strong> (iPadOS 26 grid browser), <strong className="text-gray-900 dark:text-white font-semibold">Stork</strong> (L&D delivery tracker), and <strong className="text-gray-900 dark:text-white font-semibold">SetDeck</strong> (Fitness companion, workout tracker), followed by <strong className="text-gray-900 dark:text-white font-semibold">Opalite</strong> (color palette manager with iCloud sync, canvas, and more) in year two.
                    </p>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 italic">
                      <strong className="text-gray-900 dark:text-white font-semibold">Philosophy:</strong> Bootstrap lean, iterate fast, solve niche problems with enterprise-grade polish. Every app tells a story of user frustration transformed into intuitive solutions.
                    </p>
                  </div>
                </div>
                </LiquidGlass>
              </motion.div>

              {/* Sweetwater */}
              <motion.div
                className="md:ml-12 relative"
                {...fadeUp}
              >
                <div className="absolute -left-[3.25rem] top-8 w-4 h-4 bg-blue-500 rounded-full border-4 border-white hidden md:block z-10" />
                <LiquidGlass variant="card" accentColor="#3b82f6" className="flex flex-col md:flex-row gap-6 items-start rounded-2xl p-8">
                <div className="md:w-auto text-center md:order-2">
                  <div className="w-20 md:w-auto h-16 md:h-auto bg-blue-500 rounded-lg inline-flex items-center justify-center text-white font-bold text-sm mx-auto px-2 md:px-3 md:py-2">
                    <div className="md:hidden text-center">
                      <span className="block leading-tight">2022</span>
                      <span className="block leading-tight text-xs opacity-80">to</span>
                      <span className="block leading-tight">2024</span>
                    </div>
                    <div className="hidden md:flex items-center justify-center gap-1 px-2 whitespace-nowrap">
                      <span>2022</span>
                      <span className="text-xs opacity-80">to</span>
                      <span>2024</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 md:order-1">
                  <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">Mobile & Desktop Applications Engineer</h3>
                  <h4 className="text-xl text-gray-500 dark:text-gray-400 mb-4">Sweetwater Sound</h4>
                  <div className="space-y-3 text-gray-600 dark:text-gray-300 leading-relaxed">
                    <p>
                      Spearheaded the complete <strong className="text-gray-900 dark:text-white font-semibold">mobile app revival</strong>, transforming a failed Flutter implementation (user-advised to avoid) into world-class native apps using <strong className="text-gray-900 dark:text-white font-semibold">SwiftUI</strong> for iOS and <strong className="text-gray-900 dark:text-white font-semibold">Jetpack Compose</strong> for Android.
                    </p>
                    <p>
                      Results were transformative: native apps surpassed the website in discovery-to-sales conversion, driving significant revenue growth. Rapidly expanded from 4D database maintenance to leading mobile development after proving capabilities through bug fixes and feature delivery.
                    </p>
                    <p>
                      Architected <strong className="text-gray-900 dark:text-white font-semibold">GitLab CI/CD pipelines</strong> accelerating deployment cycles. Maintained legacy <strong className="text-gray-900 dark:text-white font-semibold">Objective-C/Swift desktop applications</strong> and enterprise 4D systems managing full business operations—sales, inventory, payments, logistics, and customer engagement.
                    </p>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 italic">
                      <strong className="text-gray-900 dark:text-white font-semibold">Key Achievement:</strong> Proved cross-platform expertise by quickly mastering Android development while maintaining iOS excellence, positioning mobile as Sweetwater's premier retail channel.
                    </p>
                  </div>
                </div>
                </LiquidGlass>
              </motion.div>

              {/* Raytheon */}
              <motion.div
                className="md:ml-12 relative"
                {...fadeUp}
              >
                <div className="absolute -left-[3.25rem] top-8 w-4 h-4 bg-orange-500 rounded-full border-4 border-white hidden md:block z-10" />
                <LiquidGlass variant="card" accentColor="#f97316" className="flex flex-col md:flex-row gap-6 items-start rounded-2xl p-8">
                <div className="md:w-auto text-center md:order-2">
                  <div className="w-20 md:w-auto h-16 md:h-auto bg-orange-500 rounded-lg inline-flex items-center justify-center text-white font-bold text-sm mx-auto px-2 md:px-3 md:py-2">
                    <div className="md:hidden text-center">
                      <span className="block leading-tight">2020</span>
                      <span className="block leading-tight text-xs opacity-80">to</span>
                      <span className="block leading-tight">2022</span>
                    </div>
                    <div className="hidden md:flex items-center justify-center gap-1 px-2 whitespace-nowrap">
                      <span>2020</span>
                      <span className="text-xs opacity-80">to</span>
                      <span>2022</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 md:order-1">
                  <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">Electrical Engineer</h3>
                  <h4 className="text-xl text-gray-500 dark:text-gray-400 mb-4">Raytheon Technologies</h4>
                  <div className="space-y-3 text-gray-600 dark:text-gray-300 leading-relaxed">
                    <p>
                      Developed comprehensive <strong className="text-gray-900 dark:text-white font-semibold">automated testing frameworks</strong> using MATLAB and Python for radar system Unit Under Test (UUT) validation, dramatically reducing manual testing time and improving test coverage for critical defense hardware.
                    </p>
                    <p>
                      Performed <strong className="text-gray-900 dark:text-white font-semibold">schematic capture and PCB rework</strong> for radar components, collaborating with RF engineers to integrate digital control systems with analog RF frontends. Held <strong className="text-gray-900 dark:text-white font-semibold">active Secret Clearance</strong> and contributed to classified system documentation.
                    </p>
                    <p>
                      Executed full lifecycle testing including design verification, environmental testing, and performance characterization. Modified electrical schematics to resolve design flaws and enhance system reliability in mission-critical applications.
                    </p>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 italic">
                      <strong className="text-gray-900 dark:text-white font-semibold">Defense Expertise:</strong> Gained deep understanding of radar systems, signal processing, and DoD compliance—skills informing modern hardware-software integration approaches in indie development.
                    </p>
                  </div>
                </div>
                </LiquidGlass>
              </motion.div>

              {/* Early Career Summary */}
              <motion.div
                className="md:ml-12 relative"
                {...fadeUp}
              >
                <div className="absolute -left-[3.25rem] top-8 w-4 h-4 bg-gray-500 rounded-full border-4 border-white hidden md:block z-10" />
                <LiquidGlass variant="card" accentColor="#6b7280" className="flex flex-col md:flex-row gap-6 items-start rounded-2xl p-8">
                <div className="md:w-auto text-center md:order-2">
                  <div className="w-20 md:w-auto h-16 md:h-auto bg-gray-500 rounded-lg inline-flex items-center justify-center text-white font-bold text-sm mx-auto px-2 md:px-3 md:py-2">
                    <div className="md:hidden text-center">
                      <span className="block leading-tight">2014</span>
                      <span className="block leading-tight text-xs opacity-80">to</span>
                      <span className="block leading-tight">2020</span>
                    </div>
                    <div className="hidden md:flex items-center justify-center gap-1 px-2 whitespace-nowrap">
                      <span>2014</span>
                      <span className="text-xs opacity-80">to</span>
                      <span>2020</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 md:order-1">
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Early Foundation</h3>
                  <div className="flex flex-col gap-4 text-gray-600 dark:text-gray-300">
                    <div>
                      <h4 className="font-medium mb-1 text-gray-900 dark:text-white">NAVSEA Crane Intern</h4>
                      <p className="text-sm">Developed Python automation for radar system upgrades (Secret Clearance). Signal analysis with MATLAB.</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 text-gray-900 dark:text-white">Purdue School of Engineering & Technology @ IUPUI - 3D Printing Lab</h4>
                      <p className="text-sm">Managed printer fleet, trained students, end-to-end print workflow for engineering projects.</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 text-gray-900 dark:text-white">Molargik Woodworking Inc. - Laborer, CNC Operator, Delivery, IT</h4>
                      <p className="text-sm">Cabinet component preparation and assembly, delivery to job sites, customer interaction, CNC machinery operation, and one-man IT support.</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 text-gray-900 dark:text-white">BS Electrical Engineering, IUPUI</h4>
                      <p className="text-sm">3.72 GPA, Mathematics minor, focus on electric motors and power systems / transmission / conversion</p>
                    </div>
                  </div>
                </div>
                </LiquidGlass>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-10 bg-surface dark:bg-[#0c0c10]">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white"
            {...fadeUp}
          >
            Technical Expertise
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {SKILL_GROUPS.map((group) => (
              <motion.div key={group.category} {...fadeUp}>
                <LiquidGlass
                  variant="card"
                  accentColor={group.accent}
                  className="rounded-2xl p-6 h-full"
                >
                  <h3
                    className="text-xl font-semibold mb-4 text-center"
                    style={{ color: group.accent }}
                  >
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {group.items.map((skill, i) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <GlassSkillPill skill={skill} accent={group.accent} />
                      </motion.div>
                    ))}
                  </div>
                </LiquidGlass>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-10 bg-white dark:bg-[#0a0a0c]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white"
            {...fadeUp}
          >
            Featured Projects
          </motion.h2>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {projects.map((project, idx) => (
              <ProjectCard key={project.path} {...project} index={idx} />
            ))}
          </motion.div>
          <motion.div className="text-center mt-8" {...fadeUp}>
            <p className="text-gray-600 dark:text-gray-300">
              All apps available on the <strong className="text-gray-900 dark:text-white font-semibold">App Store</strong>. Built solo from conceptualization to launch. Some graphic design has been outsourced to (much more talented) artists.
            </p>
          </motion.div>
        </div>
      </section>

      {/* GitHub Contributions Section */}
      <section className="py-10 bg-surface dark:bg-[#0c0c10]">
        <div className="max-w-5xl mx-auto px-4">
          <motion.h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white" {...fadeUp}>
            GitHub Contributions
          </motion.h2>

          <motion.div {...fadeUp}>
            <LiquidGlass
              variant="card"
              accentColor="#24292f"
              className="rounded-2xl p-4"
            >
              <a
                href="https://github.com/NMolargik"
                aria-label="View Nick Molargik on GitHub"
                className="block"
              >
                <img
                  src="https://ghchart.rshah.org/NMolargik"
                  alt="GitHub contribution graph for NMolargik"
                  loading="lazy"
                  className="w-full max-w-[820px] mx-auto"
                />
              </a>

              <p className="text-center text-sm text-gray-700 mt-3">
                Data updates automatically from GitHub. Click the graph to visit my profile.
              </p>
            </LiquidGlass>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-10 bg-white dark:bg-[#0a0a0c]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2
            className="text-3xl font-bold mb-6 text-gray-900 dark:text-white"
            {...fadeUp}
          >
            Let's Build Together
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-300 mb-8"
            {...fadeUp}
          >
            Open to collaborations on Apple platform development or IoT projects. From data-driven solutions to indie apps — let's solve challenging problems together!
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap"
            {...fadeUp}
          >
            <GlassButton
              href="/resume.pdf"
              target="_blank"
              accentColor="#FF6C00"
              size="lg"
            >
              Download Resume
            </GlassButton>
            <GlassButton
              href="mailto:nick@molargiksoftware.com"
              accentColor="#6D00FF"
              size="lg"
            >
              Email Me
            </GlassButton>
            <GlassButton
              href="https://www.linkedin.com/in/nicholas-molargik/"
              target="_blank"
              accentColor="#0A66C2"
              size="lg"
            >
              LinkedIn
            </GlassButton>
            <GlassButton
              href="https://github.com/nmolargik"
              target="_blank"
              accentColor="#24292f"
              size="lg"
            >
              GitHub
            </GlassButton>
          </motion.div>
        </div>
      </section>

      <ScrollToTop />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Person",
                "name": "Nick Molargik",
                "jobTitle": "Indie Mobile Engineer & Founder",
                "url": "https://molargiksoftware.com/",
                "sameAs": [
                  "https://www.linkedin.com/in/nicholas-molargik/",
                  "https://github.com/nmolargik"
                ],
                "knowsAbout": ["SwiftUI", "Apple Intelligence", "Kotlin Multiplatform", "HealthKit", "Radar Systems"]
              },
              {
                "@type": "Organization",
                "name": "Molargik Software LLC",
                "url": "https://molargiksoftware.com/",
                "founder": {"@id": "#person"}
              }
            ]
          })
        }}
      />
    </>
  );
}
