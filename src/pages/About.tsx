import { useEffect } from 'react';
import { motion } from 'framer-motion';
import nickheadshot from '../assets/nickheadshot.jpeg';
import whitelogo from '../assets/whitelogo.png';
import Hero from '../components/Hero';
import ScrollToTop from '../components/ScrollToTop';
import opaliteIcon from '../assets/opalite/opaliteicon.png';
import mygraIcon from '../assets/mygra/mygraicon.png';
import waffleIcon from '../assets/waffle/waffleicon.png';
import storkIcon from '../assets/stork/storkicon.png';
import setDeckIcon from '../assets/setdeck/setdeckicon.png';
import { Link } from 'react-router-dom';

export default function About() {
  useEffect(() => {
    document.title = 'About – Nick Molargik | Molargik Software LLC';
    const desc = 'Nick Molargik: Crafting mobile applications that balance elegant design with technical capability — built with Swift, SwiftUI, and SwiftData. From world-class storefronts at Sweetwater to advanced sports technology at V1 Sports, now also developing useful, Apple-centric tools like SetDeck, Mygra, Waffle, and Stork.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = desc;
  }, []);

  return (
    <>
      {/* Personal Hero Section */}
      <Hero
        heading="Nick Molargik"
        description="Versatile engineer, transitioned from electrical engineering to mobile development. Expertise in Swift, SwiftUI, Kotlin Multiplatform, Flutter, and hardware integration. Building privacy-first solutions that solve real user problems. Husband, Father, Dog Dad, living life in Indiana."
        imageSrc={nickheadshot}
        appStoreHref="/resume.pdf"
        cropImage={true}
        showAppStoreButton={false}
      />

      {/* Company Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <img src={whitelogo} alt="Molargik Software LLC" className="mx-auto h-16 w-auto mb-4 rounded-md" />
            <h2 className="text-3xl font-bold">Molargik Software LLC</h2>
            <p className="text-xl text-gray-300 mt-4">
              Founded in 2025 to transform personal pain points into innovative Apple ecosystem apps. Specializing in privacy-first development with iOS 26+, Apple Intelligence, HealthKit, WeatherKit, and more for native experiences.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              className="rounded-2xl p-6 bg-white/10 backdrop-blur-xl ring-1 ring-white/15"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <h3 className="text-2xl font-semibold mb-4">Mission</h3>
              <p className="text-gray-300">
                Create intuitive, impactful apps born from real user needs—whether tracking migraines with AI, revolutionizing iPad browsing, or empowering L&D nurses. Every project prioritizes privacy, performance, and meaningful problem-solving.
              </p>
            </motion.div>
            <motion.div
              className="rounded-2xl p-6 bg-white/10 backdrop-blur-xl ring-1 ring-white/15"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <h3 className="text-2xl font-semibold mb-4">Core Technologies</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• SwiftUI + Apple Intelligence (iOS 26+)</li>
                <li>• SwiftData + CloudKit cross-device sync</li>
                <li>• HealthKit, WeatherKit, WebView API</li>
              </ul>
            </motion.div>
          </div>
          <motion.div
            className="mt-12 text-center text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p>
              Built with <span className="text-white font-medium">React</span>, <span className="text-white font-medium">Vite</span>, and <span className="text-white font-medium">Tailwind CSS</span>. Web dev supports my mobile passion—but is certainly not my expertise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Professional Journey Section - EXPANDED */}
      <section
        className="py-16 text-white"
        style={{ backgroundColor: 'rgb(36,36,36)' }}
      >
        <div className="max-w-5xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-12 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Professional Journey
          </motion.h2>
          <div className="relative">
            {/* Timeline connector line */}
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-500 via-purple-500 via-blue-500 via-orange-500 to-gray-500 hidden md:block" />

            <div className="space-y-8">
              {/* V1 Sports */}
              <motion.div
                className="flex flex-col md:flex-row gap-6 items-start p-8 bg-white/5 rounded-xl border border-white/10 md:ml-12 relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {/* Timeline dot */}
                <div className="absolute -left-[3.25rem] top-8 w-4 h-4 bg-red-500 rounded-full border-4 border-[rgb(36,36,36)] hidden md:block" />
                <div className="md:w-auto text-center md:order-2">
                  <div className="w-20 md:w-auto h-16 md:h-auto bg-red-500 rounded-lg inline-flex items-center justify-center text-white font-bold text-sm mx-auto px-2 md:px-3 md:py-2">
                    {/* Stacked (mobile) */}
                    <div className="md:hidden text-center">
                      <span className="block leading-tight">2024</span>
                      <span className="block leading-tight text-xs opacity-80">to</span>
                      <span className="block leading-tight">Present</span>
                    </div>
                    {/* Single-line (md+) */}
                    <div className="hidden md:flex flex-col items-center justify-center gap-0.5 px-2 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <span>2024</span>
                        <span className="text-xs opacity-80">to</span>
                        <span>Present</span>
                      </div>
                      <span className="text-[0.65rem] opacity-60">Contractor → Engineer → Senior</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 md:order-1">
                  <h3 className="text-2xl font-semibold mb-2 text-white">Senior Mobile Software Engineer</h3>
                  <h4 className="text-xl text-white/60 mb-4">V1 Sports</h4>
                  <div className="space-y-3 text-white/80 leading-relaxed">
                    <p>
                      Built a custom <strong className="text-white">golf ball tracer</strong> from scratch—training a YOLO-based detection model on 28,000 images, converting it to <strong className="text-white">CoreML</strong> for on-device inference, and designing a multi-phase tracking algorithm with trajectory-based detection gating and cluster rejection using Apple's <strong className="text-white">Vision framework</strong>.
                    </p>
                    <p>
                      Delivered a production <strong className="text-white">video pipeline</strong> processing frames at 120 FPS with real-time shot trace rendering. Developed cross-platform video composition using <strong className="text-white">Kotlin Multiplatform</strong>, AVFoundation, and FFmpeg, improving playback and stitching on iOS and Android.
                    </p>
                    <p>
                      Built camera capture features in Swift and AVFoundation, packaged as a <strong className="text-white">Flutter Native Plugin</strong> with Codemagic CI/CD. Integrated a pressure mat device via custom <strong className="text-white">C library</strong>, generating real-time heat maps and biomechanics feedback.
                    </p>
                    <p className="text-sm font-medium text-white/50 italic">
                      <strong className="text-white/70">Impact:</strong> Authored system architecture documentation enabling rapid onboarding; led cross-functional discussions and architectural refactors that accelerated feature deployment.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Molargik Software */}
              <motion.div
                className="flex flex-col md:flex-row gap-6 items-start p-8 bg-white/5 rounded-xl border border-white/10 md:ml-12 relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {/* Timeline dot */}
                <div className="absolute -left-[3.25rem] top-8 w-4 h-4 bg-purple-500 rounded-full border-4 border-[rgb(36,36,36)] hidden md:block" />
                <div className="md:w-auto text-center md:order-2">
                  <div className="w-20 md:w-auto h-16 md:h-auto bg-purple-500 rounded-lg inline-flex items-center justify-center text-white font-bold text-sm mx-auto px-2 md:px-3 md:py-2">
                    {/* Stacked (mobile) */}
                    <div className="md:hidden text-center">
                      <span className="block leading-tight">2025</span>
                      <span className="block leading-tight text-xs opacity-80">to</span>
                      <span className="block leading-tight">Present</span>
                    </div>
                    {/* Single-line (md+) */}
                    <div className="hidden md:flex items-center justify-center gap-1 px-2 whitespace-nowrap">
                      <span>2025</span>
                      <span className="text-xs opacity-80">to</span>
                      <span>Present</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 md:order-1">
                  <h3 className="text-2xl font-semibold mb-2 text-white">Founder & Developer</h3>
                  <h4 className="text-xl text-white/60 mb-4">Molargik Software LLC</h4>
                  <div className="space-y-3 text-white/80 leading-relaxed">
                    <p>
                      Founded to build Apple apps from real user needs identified through friends, family, and professional networks. Solo-developing full lifecycle—from user interviews and SwiftUI prototyping to App Store deployment and iteration.
                    </p>
                    <p>
                      Launched four apps in first year: <strong className="text-white">Mygra</strong> (AI migraine tracker with WeatherKit/HealthKit), <strong className="text-white">Waffle</strong> (iPadOS 26 grid browser), <strong className="text-white">Stork</strong> (L&D delivery tracker), and <strong className="text-white">SetDeck</strong> (Fitness companion, workout tracker), followed by <strong className="text-white">Opalite</strong> (color palette manager with iCloud sync, canvas, and more) in year two.
                    </p>
                    <p className="text-sm font-medium text-white/50 italic">
                      <strong className="text-white/70">Philosophy:</strong> Bootstrap lean, iterate fast, solve niche problems with enterprise-grade polish. Every app tells a story of user frustration transformed into intuitive solutions.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Sweetwater */}
              <motion.div
                className="flex flex-col md:flex-row gap-6 items-start p-8 bg-white/5 rounded-xl border border-white/10 md:ml-12 relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {/* Timeline dot */}
                <div className="absolute -left-[3.25rem] top-8 w-4 h-4 bg-blue-500 rounded-full border-4 border-[rgb(36,36,36)] hidden md:block" />
                <div className="md:w-auto text-center md:order-2">
                  <div className="w-20 md:w-auto h-16 md:h-auto bg-blue-500 rounded-lg inline-flex items-center justify-center text-white font-bold text-sm mx-auto px-2 md:px-3 md:py-2">
                    {/* Stacked (mobile) */}
                    <div className="md:hidden text-center">
                      <span className="block leading-tight">2022</span>
                      <span className="block leading-tight text-xs opacity-80">to</span>
                      <span className="block leading-tight">2024</span>
                    </div>
                    {/* Single-line (md+) */}
                    <div className="hidden md:flex items-center justify-center gap-1 px-2 whitespace-nowrap">
                      <span>2022</span>
                      <span className="text-xs opacity-80">to</span>
                      <span>2024</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 md:order-1">
                  <h3 className="text-2xl font-semibold mb-2 text-white">Mobile & Desktop Applications Engineer</h3>
                  <h4 className="text-xl text-white/60 mb-4">Sweetwater Sound</h4>
                  <div className="space-y-3 text-white/80 leading-relaxed">
                    <p>
                      Spearheaded the complete <strong className="text-white">mobile app revival</strong>, transforming a failed Flutter implementation (user-advised to avoid) into world-class native apps using <strong className="text-white">SwiftUI</strong> for iOS and <strong className="text-white">Jetpack Compose</strong> for Android.
                    </p>
                    <p>
                      Results were transformative: native apps surpassed the website in discovery-to-sales conversion, driving significant revenue growth. Rapidly expanded from 4D database maintenance to leading mobile development after proving capabilities through bug fixes and feature delivery.
                    </p>
                    <p>
                      Architected <strong className="text-white">GitLab CI/CD pipelines</strong> accelerating deployment cycles. Maintained legacy <strong className="text-white">Objective-C/Swift desktop applications</strong> and enterprise 4D systems managing full business operations—sales, inventory, payments, logistics, and customer engagement.
                    </p>
                    <p className="text-sm font-medium text-white/50 italic">
                      <strong className="text-white/70">Key Achievement:</strong> Proved cross-platform expertise by quickly mastering Android development while maintaining iOS excellence, positioning mobile as Sweetwater's premier retail channel.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Raytheon */}
              <motion.div
                className="flex flex-col md:flex-row gap-6 items-start p-8 bg-white/5 rounded-xl border border-white/10 md:ml-12 relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {/* Timeline dot */}
                <div className="absolute -left-[3.25rem] top-8 w-4 h-4 bg-orange-500 rounded-full border-4 border-[rgb(36,36,36)] hidden md:block" />
                <div className="md:w-auto text-center md:order-2">
                  <div className="w-20 md:w-auto h-16 md:h-auto bg-orange-500 rounded-lg inline-flex items-center justify-center text-white font-bold text-sm mx-auto px-2 md:px-3 md:py-2">
                    {/* Stacked (mobile) */}
                    <div className="md:hidden text-center">
                      <span className="block leading-tight">2020</span>
                      <span className="block leading-tight text-xs opacity-80">to</span>
                      <span className="block leading-tight">2022</span>
                    </div>
                    {/* Single-line (md+) */}
                    <div className="hidden md:flex items-center justify-center gap-1 px-2 whitespace-nowrap">
                      <span>2020</span>
                      <span className="text-xs opacity-80">to</span>
                      <span>2022</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 md:order-1">
                  <h3 className="text-2xl font-semibold mb-2 text-white">Electrical Engineer</h3>
                  <h4 className="text-xl text-white/60 mb-4">Raytheon Technologies</h4>
                  <div className="space-y-3 text-white/80 leading-relaxed">
                    <p>
                      Developed comprehensive <strong className="text-white">automated testing frameworks</strong> using MATLAB and Python for radar system Unit Under Test (UUT) validation, dramatically reducing manual testing time and improving test coverage for critical defense hardware.
                    </p>
                    <p>
                      Performed <strong className="text-white">schematic capture and PCB rework</strong> for radar components, collaborating with RF engineers to integrate digital control systems with analog RF frontends. Held <strong className="text-white">active Secret Clearance</strong> and contributed to classified system documentation.
                    </p>
                    <p>
                      Executed full lifecycle testing including design verification, environmental testing, and performance characterization. Modified electrical schematics to resolve design flaws and enhance system reliability in mission-critical applications.
                    </p>
                    <p className="text-sm font-medium text-white/50 italic">
                      <strong className="text-white/70">Defense Expertise:</strong> Gained deep understanding of radar systems, signal processing, and DoD compliance—skills informing modern hardware-software integration approaches in indie development.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Early Career Summary */}
              <motion.div
                className="flex flex-col md:flex-row gap-6 items-start p-8 bg-white/5 rounded-xl border border-white/10 md:ml-12 relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {/* Timeline dot */}
                <div className="absolute -left-[3.25rem] top-8 w-4 h-4 bg-gray-500 rounded-full border-4 border-[rgb(36,36,36)] hidden md:block" />
                <div className="md:w-auto text-center md:order-2">
                  <div className="w-20 md:w-auto h-16 md:h-auto bg-gray-500 rounded-lg inline-flex items-center justify-center text-white font-bold text-sm mx-auto px-2 md:px-3 md:py-2">
                    {/* Stacked (mobile) */}
                    <div className="md:hidden text-center">
                      <span className="block leading-tight">2014</span>
                      <span className="block leading-tight text-xs opacity-80">to</span>
                      <span className="block leading-tight">2020</span>
                    </div>
                    {/* Single-line (md+) */}
                    <div className="hidden md:flex items-center justify-center gap-1 px-2 whitespace-nowrap">
                      <span>2014</span>
                      <span className="text-xs opacity-80">to</span>
                      <span>2020</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 md:order-1">
                  <h3 className="text-2xl font-semibold mb-4 text-white">Early Foundation</h3>
                  <div className="flex flex-col gap-4 text-white/80">
                    <div>
                      <h4 className="font-medium mb-1 text-white">NAVSEA Crane Intern</h4>
                      <p className="text-sm">Developed Python automation for radar system upgrades (Secret Clearance). Signal analysis with MATLAB.</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 text-white">Purdue School of Engineering & Technology @ IUPUI - 3D Printing Lab</h4>
                      <p className="text-sm">Managed printer fleet, trained students, end-to-end print workflow for engineering projects.</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 text-white">Molargik Woodworking Inc. - Laborer, CNC Operator, Delivery, IT</h4>
                      <p className="text-sm">Cabinet component preparation and assembly, delivery to job sites, customer interaction, CNC machinery operation, and one-man IT support.</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 text-white">BS Electrical Engineering, IUPUI</h4>
                      <p className="text-sm">3.72 GPA, Mathematics minor, focus on electric motors and power systems / transmission / conversion</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Technical Expertise
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold mb-4 text-center">Mobile Development</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {['SwiftUI', 'Swift', 'Kotlin Multiplatform', 'Flutter + BLoC', 'Jetpack Compose'].map((skill, i) => (
                  <motion.span
                    key={skill}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-xl font-semibold mb-4 text-center">Apple Ecosystem</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {['HealthKit', 'WeatherKit', 'Apple Intelligence', 'SwiftData', 'CloudKit', 'WebView API'].map((skill, i) => (
                  <motion.span
                    key={skill}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-4 text-center">Systems Engineering</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {['C Libraries', 'MATLAB', 'Python Automation', 'GitLab CI/CD', 'Hardware Integration', 'RF Systems'].map((skill, i) => (
                  <motion.span
                    key={skill}
                    className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section - Now at bottom with taller cards */}
      <section
        className="py-16 text-white"
        style={{ backgroundColor: 'rgb(36,36,36)' }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-12 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Featured Projects
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Opalite */}
            <motion.div
              className="flex flex-col bg-gradient-to-br from-blue-100 to-pink-100 rounded-lg overflow-hidden shadow-xl min-h-[30rem]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
            >
              <div className="p-4">
                <img src={opaliteIcon} alt="Opalite" className="w-full h-[24rem] object-contain rounded-[2rem]" />
              </div>
              <div className="flex flex-col flex-1 p-6 text-black">
                <h3 className="text-xl font-semibold mb-2">Opalite</h3>
                <p className="text-black-100 mb-4 text-sm">
                  The ultimate color manager: create, organize, and share palettes with AI-generated names, contrast checking, and seamless iCloud sync.
                </p>
                <Link to="/opalite" className="flex items-center justify-between mt-auto bg-black/20 text-black px-4 py-2 rounded-md hover:bg-black/30 transition">
                  <span>View Project</span>
                  <span>→</span>
                </Link>
              </div>
            </motion.div>

            {/* SetDeck */}
            <motion.div
              className="flex flex-col bg-gradient-to-br from-green-500 to-teal-600 rounded-lg overflow-hidden shadow-xl min-h-[30rem]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.02, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
            >
              <div className="p-4">
                <img src={setDeckIcon} alt="SetDeck" className="w-full h-[24rem] object-contain rounded-[2rem]" />
              </div>
              <div className="flex flex-col flex-1 p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">SetDeck</h3>
                <p className="text-emerald-100 mb-4 text-sm">
                  Workout tracker with HealthKit sync and set-by-set progress statistics.
                </p>
                <Link to="/setdeck" className="flex items-center justify-between mt-auto bg-white/20 text-white px-4 py-2 rounded-md hover:bg-white/30 transition">
                  <span>View Project</span>
                  <span>→</span>
                </Link>
              </div>
            </motion.div>

            {/* Mygra */}
            <motion.div
              className="flex flex-col bg-gradient-to-br from-orange-500 to-purple-500 rounded-lg overflow-hidden shadow-xl min-h-[30rem]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.02, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
            >
              <div className="p-4">
                <img src={mygraIcon} alt="Mygra" className="w-full h-[24rem] object-contain rounded-[2rem]" />
              </div>
              <div className="flex flex-col flex-1 p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">Mygra</h3>
                <p className="text-blue-100 mb-4 text-sm">
                  AI-powered migraine tracker with WeatherKit alerts, HealthKit correlations, and Apple Intelligence insights. iOS 26+.
                </p>
                <Link to="/mygra" className="flex items-center justify-between mt-auto bg-white/20 text-white px-4 py-2 rounded-md hover:bg-white/30 transition">
                  <span>View Project</span>
                  <span>→</span>
                </Link>
              </div>
            </motion.div>

            {/* Stork */}
            <motion.div
              className="flex flex-col bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg overflow-hidden shadow-xl min-h-[30rem]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.02, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
            >
              <div className="p-4">
                <img src={storkIcon} alt="Stork" className="w-full h-[24rem] object-contain rounded-[2rem]" />
              </div>
              <div className="flex flex-col flex-1 p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">Stork</h3>
                <p className="text-pink-100 mb-4 text-sm">
                  L&D delivery tracker with marble jar, lifelong statistics, and a built-in hospital database.
                </p>
                <Link to="/stork" className="flex items-center justify-between mt-auto bg-white/20 text-white px-4 py-2 rounded-md hover:bg-white/30 transition">
                  <span>View Project</span>
                  <span>→</span>
                </Link>
              </div>
            </motion.div>

            {/* Waffle */}
            <motion.div
              className="flex flex-col bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg overflow-hidden shadow-xl min-h-[30rem]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.02, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
            >
              <div className="p-4">
                <img src={waffleIcon} alt="Waffle" className="w-full h-[24rem] object-contain rounded-[2rem]" />
              </div>
              <div className="flex flex-col flex-1 p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">Waffle</h3>
                <p className="text-white-100 mb-4 text-sm">
                  iPadOS 26 grid browser with 4x4 layouts, pop-out windows, WebView API, and Liquid Glass effects.
                </p>
                <Link to="/waffle" className="flex items-center justify-between mt-auto bg-white/80 text-gray-900 px-4 py-2 rounded-md hover:bg-white transition">
                  <span>View Project</span>
                  <span>→</span>
                </Link>
              </div>
            </motion.div>
          </div>
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <p className="text-white">
              All apps available on the <strong>App Store</strong>. Built solo from conceptualization to launch. Some graphic design has been outsourced to (much more talented) artists.
            </p>
          </motion.div>
        </div>
      </section>

      {/* GitHub Contributions Section */}
      <section
        className="py-16 text-white"
        style={{ backgroundColor: 'rgb(36,36,36)' }}
      >
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">GitHub Contributions</h2>

          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4">
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

            <p className="text-center text-sm text-gray-500 mt-3">
              Data updates automatically from GitHub. Click the graph to visit my profile.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Let's Build Together
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Open to collaborations on Apple platform development or IoT projects. From data-driven solutions to indie apps — let's solve challenging problems together!
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-500 transition">
              Download Resume
            </a>
            <a href="mailto:nick@molargiksoftware.com" className="bg-[#ED752F] text-white px-6 py-3 rounded-md hover:bg-[#cf6427] transition">
              Email Me
            </a>
            <a href="https://www.linkedin.com/in/nicholas-molargik/" className="bg-[#0A66C2] text-white px-6 py-3 rounded-md hover:bg-[#085aab] transition">
              LinkedIn
            </a>
            <a href="https://github.com/nmolargik" className="bg-[#171515] text-white px-6 py-3 rounded-md hover:bg-[#24292F] transition">
              GitHub
            </a>
          </motion.div>
        </div>
      </section>

      <ScrollToTop accentColor="#ED752F" />

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