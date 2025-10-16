import { useEffect } from 'react';
import nickheadshot from '../assets/nickheadshot.svg';
import whitelogo from '../assets/whitelogo.png';
import Hero from '../components/Hero';
import mygraIcon from '../assets/mygra/mygraicon.png';
import waffleIcon from '../assets/waffle/waffleicon.png';
import storkIcon from '../assets/stork/storkicon.svg';
import readySetIcon from '../assets/readyset/readyseticon.svg';
import { Link } from 'react-router-dom';

export default function About() {
  useEffect(() => {
    document.title = 'About – Nick Molargik | Molargik Software LLC';
    const desc = 'Nick Molargik: From Raytheon radar systems to V1 Sports video analysis, now indie iOS engineer building Mygra, Waffle, Stork & Ready, Set with SwiftUI, Apple Intelligence, and Skip.tools.';
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
        description="Versatile engineer transitioning from defense and sports tech to indie mobile development. Expertise in SwiftUI, Kotlin Multiplatform, hardware integration, and AI-powered Apple apps. Building privacy-first solutions that solve real user problems."
        imageSrc={nickheadshot}
        buttonText="Download Résumé"
        buttonColorClass="bg-orange-500 text-white"
        buttonHref="/resume.pdf"
        buttonDownload
      />

      {/* Company Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <img src={whitelogo} alt="Molargik Software LLC" className="mx-auto h-16 w-auto mb-4 rounded-md" />
            <h2 className="text-3xl font-bold">Molargik Software LLC</h2>
            <p className="text-xl text-gray-300 mt-4">
              Founded in 2025 to transform personal pain points into innovative Apple ecosystem apps. Specializing in privacy-first development with iOS 26+, Apple Intelligence, HealthKit, WeatherKit, and Skip.tools for native multiplatform experiences.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl p-6 bg-white/10 backdrop-blur-xl ring-1 ring-white/15">
              <h3 className="text-2xl font-semibold mb-4">Mission</h3>
              <p className="text-gray-300">
                Create intuitive, impactful apps born from real user needs—whether tracking migraines with AI, revolutionizing iPad browsing, or empowering L&D nurses. Every project prioritizes privacy, performance, and meaningful problem-solving.
              </p>
            </div>
            <div className="rounded-2xl p-6 bg-white/10 backdrop-blur-xl ring-1 ring-white/15">
              <h3 className="text-2xl font-semibold mb-4">Core Technologies</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• SwiftUI + Apple Intelligence (iOS 26+)</li>
                <li>• Skip.tools (Swift → Kotlin transpilation)</li>
                <li>• SwiftData + CloudKit cross-device sync</li>
                <li>• HealthKit, WeatherKit, WebView API</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 text-center text-gray-400 text-sm">
            <p>
              Built with <span className="text-white font-medium">React</span>, <span className="text-white font-medium">Vite</span>, and <span className="text-white font-medium">Tailwind CSS</span>. Web dev supports my mobile passion—indie style from home.
            </p>
          </div>
        </div>
      </section>

      {/* Professional Journey Section - EXPANDED */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Professional Journey</h2>
          <div className="space-y-8">
            {/* V1 Sports */}
            <div className="flex flex-col md:flex-row gap-6 items-start p-8 bg-gray-50 rounded-xl border border-gray-200">
              <div className="md:w-24 text-center md:order-2">
                <div className="w-20 h-16 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold text-sm mx-auto">
                  <div>
                    <span className="block leading-tight">2024</span>
                    <span className="block leading-tight text-xs opacity-80">to</span>
                    <span className="block leading-tight">Present</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 md:order-1">
                <h3 className="text-2xl font-semibold mb-2">Software Engineer</h3>
                <h4 className="text-xl text-gray-600 mb-4">V1 Sports</h4>
                <div className="space-y-3 text-gray-700 leading-relaxed">
                  <p>
                    Transitioned from contractor to full-time, leading mobile development for V1's flagship apps (Coach, Golf, Baseball). Mastered <strong>Kotlin Multiplatform</strong> to unify video analysis and camera systems across iOS/Android, reducing code duplication while maintaining native performance.
                  </p>
                  <p>
                    Engineered a custom <strong>C library</strong> interfacing with SensorEdge pressure mats, processing biomechanical data into real-time Swift heat map visualizations for golf swing analysis—enabling coaches to provide precise stance feedback to athletes.
                  </p>
                  <p>
                    Developed <strong>Flutter Native Plugins</strong> bridging camera capture between Flutter and native iOS/Android implementations. Led the creation of <strong>Developer Code QA Sessions</strong>, establishing peer review processes that improved code quality without formal QA resources.
                  </p>
                  <p className="text-sm font-medium text-gray-500 italic">
                    <strong>Impact:</strong> Enhanced video analysis tools used by thousands of coaches/athletes; delivered hardware integration enabling new revenue streams through advanced analytics.
                  </p>
                </div>
              </div>
            </div>

            {/* Molargik Software */}
            <div className="flex flex-col md:flex-row gap-6 items-start p-8 bg-gray-50 rounded-xl border border-gray-200">
              <div className="md:w-24 text-center md:order-2">
                <div className="w-20 h-16 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm mx-auto">
                  <div>
                    <span className="block leading-tight">2025</span>
                    <span className="block leading-tight text-xs opacity-80">to</span>
                    <span className="block leading-tight">Present</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 md:order-1">
                <h3 className="text-2xl font-semibold mb-2">Founder & Sole Developer</h3>
                <h4 className="text-xl text-gray-600 mb-4">Molargik Software LLC</h4>
                <div className="space-y-3 text-gray-700 leading-relaxed">
                  <p>
                    Founded to build Apple apps from real user needs identified through friends, family, and professional networks. Solo-developing full lifecycle—from user interviews and SwiftUI prototyping to App Store deployment and iteration.
                  </p>
                  <p>
                    Launched four apps in first year: <strong>Mygra</strong> (AI migraine tracker with WeatherKit/HealthKit), <strong>Waffle</strong> (iPadOS 26 grid browser), <strong>Stork</strong> (L&D delivery tracker via Skip.tools), and <strong>Ready, Set</strong> (10-day MVP workout logger).
                  </p>
                  <p>
                    Pioneering <strong>Skip.tools</strong> for Swift-to-Kotlin transpilation, enabling native multiplatform apps with 90% shared SwiftUI code. Deep expertise in Apple Intelligence, SwiftData+CloudKit sync, and privacy-focused health integrations.
                  </p>
                  <p className="text-sm font-medium text-gray-500 italic">
                    <strong>Philosophy:</strong> Bootstrap lean, iterate fast, solve niche problems with enterprise-grade polish. Every app tells a story of user pain transformed into intuitive solutions.
                  </p>
                </div>
              </div>
            </div>

            {/* Sweetwater */}
            <div className="flex flex-col md:flex-row gap-6 items-start p-8 bg-gray-50 rounded-xl border border-gray-200">
              <div className="md:w-24 text-center md:order-2">
                <div className="w-20 h-16 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm mx-auto">
                  <div>
                    <span className="block leading-tight">2022</span>
                    <span className="block leading-tight text-xs opacity-80">to</span>
                    <span className="block leading-tight">2024</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 md:order-1">
                <h3 className="text-2xl font-semibold mb-2">Mobile & Desktop Applications Engineer</h3>
                <h4 className="text-xl text-gray-600 mb-4">Sweetwater Sound</h4>
                <div className="space-y-3 text-gray-700 leading-relaxed">
                  <p>
                    Spearheaded the complete <strong>mobile app revival</strong>, transforming a failed Flutter implementation (user-advised to avoid) into world-class native apps using <strong>SwiftUI</strong> for iOS and <strong>Jetpack Compose</strong> for Android.
                  </p>
                  <p>
                    Results were transformative: native apps surpassed the website in discovery-to-sales conversion, driving significant revenue growth. Rapidly expanded from 4D database maintenance to leading mobile development after proving capabilities through bug fixes and feature delivery.
                  </p>
                  <p>
                    Architected <strong>GitLab CI/CD pipelines</strong> accelerating deployment cycles. Maintained legacy <strong>Objective-C/Swift desktop applications</strong> and enterprise 4D systems managing full business operations—sales, inventory, payments, logistics, and customer engagement.
                  </p>
                  <p className="text-sm font-medium text-gray-500 italic">
                    <strong>Key Achievement:</strong> Proved cross-platform expertise by quickly mastering Android development while maintaining iOS excellence, positioning mobile as Sweetwater's premier retail channel.
                  </p>
                </div>
              </div>
            </div>

            {/* Raytheon */}
            <div className="flex flex-col md:flex-row gap-6 items-start p-8 bg-gray-50 rounded-xl border border-gray-200">
              <div className="md:w-24 text-center md:order-2">
                <div className="w-20 h-16 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-sm mx-auto">
                  <div>
                    <span className="block leading-tight">2020</span>
                    <span className="block leading-tight text-xs opacity-80">to</span>
                    <span className="block leading-tight">2022</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 md:order-1">
                <h3 className="text-2xl font-semibold mb-2">Electrical Engineer</h3>
                <h4 className="text-xl text-gray-600 mb-4">Raytheon Technologies</h4>
                <div className="space-y-3 text-gray-700 leading-relaxed">
                  <p>
                    Developed comprehensive <strong>automated testing frameworks</strong> using MATLAB and Python for radar system Unit Under Test (UUT) validation, dramatically reducing manual testing time and improving test coverage for critical defense hardware.
                  </p>
                  <p>
                    Performed <strong>schematic capture and PCB rework</strong> for radar components, collaborating with RF engineers to integrate digital control systems with analog RF frontends. Held <strong>active Secret Clearance</strong> and contributed to classified system documentation.
                  </p>
                  <p>
                    Executed full lifecycle testing including design verification, environmental testing, and performance characterization. Modified electrical schematics to resolve design flaws and enhance system reliability in mission-critical applications.
                  </p>
                  <p className="text-sm font-medium text-gray-500 italic">
                    <strong>Defense Expertise:</strong> Gained deep understanding of radar systems, signal processing, and DoD compliance—skills informing modern hardware-software integration approaches in indie development.
                  </p>
                </div>
              </div>
            </div>

            {/* Early Career Summary */}
            <div className="p-8 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="text-2xl font-semibold mb-4">Early Foundation</h3>
              <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                <div>
                  <h4 className="font-medium mb-2">NAVSEA Crane Intern (2019-2020)</h4>
                  <p className="text-sm">Developed Python automation for radar system upgrades (Secret Clearance). Signal analysis with MATLAB.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">IUPUI 3D Printing Lab (College)</h4>
                  <p className="text-sm">Managed printer fleet, trained students, end-to-end print workflow for engineering projects.</p>
                </div>
                <div className="md:col-span-2">
                  <h4 className="font-medium mb-2">BS Electrical Engineering, IUPUI (2020)</h4>
                  <p className="text-sm">3.72 GPA, Mathematics minor, electric motors and power systems focus.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Technical Expertise</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-center">Mobile Development</h3>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">SwiftUI</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Swift 6</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Kotlin Multiplatform</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Skip.tools</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Flutter + BLoC</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Jetpack Compose</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-center">Apple Ecosystem</h3>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">HealthKit</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">WeatherKit</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Apple Intelligence</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">SwiftData</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">CloudKit</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">WebView API</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-center">Systems Engineering</h3>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">C Libraries</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">MATLAB</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Python Automation</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">GitLab CI/CD</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Hardware Integration</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">RF Systems</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section - Now at bottom with taller cards */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Mygra */}
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg overflow-hidden shadow-xl min-h-[30rem]">
              <img src={mygraIcon} alt="Mygra" className="w-full h-[24rem] object-cover" />
              <div className="p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">Mygra</h3>
                <p className="text-blue-100 mb-4 text-sm">
                  AI-powered migraine tracker with WeatherKit alerts, HealthKit correlations, and Apple Intelligence insights. iOS 26+.
                </p>
                <Link to="/mygra" className="inline-block bg-white/20 text-white px-4 py-2 rounded-md hover:bg-white/30 transition">
                  View Project →
                </Link>
              </div>
            </div>

            {/* Waffle */}
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg overflow-hidden shadow-xl min-h-[30rem]">
              <img src={waffleIcon} alt="Waffle" className="w-full h-[24rem] object-cover" />
              <div className="p-6 text-gray-900">
                <h3 className="text-xl font-semibold mb-2">Waffle</h3>
                <p className="text-gray-700 mb-4 text-sm">
                  iPadOS 26 grid browser with 4x4 layouts, pop-out windows, WebView API, and Liquid Glass effects.
                </p>
                <Link to="/waffle" className="inline-block bg-white/80 text-gray-900 px-4 py-2 rounded-md hover:bg-white transition">
                  View Project →
                </Link>
              </div>
            </div>

            {/* Stork */}
            <div className="bg-gradient-to-br from-pink-500 to-red-500 rounded-lg overflow-hidden shadow-xl min-h-[30rem]">
              <img src={storkIcon} alt="Stork" className="w-full h-[24rem] object-cover" />
              <div className="p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">Stork</h3>
                <p className="text-pink-100 mb-4 text-sm">
                  L&D delivery tracker with Skip.tools multiplatform, marble jar stats, hospital database, and Muster groups.
                </p>
                <Link to="/stork" className="inline-block bg-white/20 text-white px-4 py-2 rounded-md hover:bg-white/30 transition">
                  View Project →
                </Link>
              </div>
            </div>

            {/* Ready, Set */}
            <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-lg overflow-hidden shadow-xl min-h-[30rem]">
              <img src={readySetIcon} alt="Ready, Set" className="w-full h-[24rem] object-cover" />
              <div className="p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">Ready, Set</h3>
                <p className="text-emerald-100 mb-4 text-sm">
                  10-day MVP workout tracker with swipe navigation, HealthKit sync, and set-by-set logging.
                </p>
                <Link to="/ready-set" className="inline-block bg-white/20 text-white px-4 py-2 rounded-md hover:bg-white/30 transition">
                  View Project →
                </Link>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <p className="text-gray-600">
              All apps available on the <strong>App Store</strong>. Built solo from ideation to launch.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Let's Build Together</h2>
          <p className="text-lg text-gray-300 mb-8">
            Open to collaborations on Apple development, health tech, sports analytics, or custom mobile solutions. From enterprise automation to indie apps—let's solve challenging problems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:nick@molargiksoftware.com" className="bg-[#ED752F] text-white px-6 py-3 rounded-md hover:bg-[#cf6427] transition">
              Email Me
            </a>
            <a href="https://www.linkedin.com/in/nicholas-molargik/" className="bg-[#0A66C2] text-white px-6 py-3 rounded-md hover:bg-[#085aab] transition">
              LinkedIn
            </a>
            <a href="https://github.com/nmolargik" className="bg-[#171515] text-white px-6 py-3 rounded-md hover:bg-[#24292F] transition">
              GitHub
            </a>
          </div>
        </div>
      </section>

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