import nickheadshot from '../assets/nickheadshot.svg';
import whitelogo from '../assets/whitelogo.png';
import Hero from '../components/Hero';
import mygraIcon from '../assets/mygra/mygraicon.png'; // Assuming you have these icons
import waffleIcon from '../assets/waffle/waffleicon.png';
import { Link } from 'react-router-dom'; // Or your routing library

export default function About() {
  return (
    <>
      {/* Personal Hero Section */}
      <Hero
        heading="Nick Molargik"
        description="Mobile App Developer & Indie Maker. Specializing in SwiftUI, Kotlin Multiplatform, Flutter, and full-stack mobile solutions. Passionate about creating intuitive, AI-powered apps that solve real problems for users."
        imageSrc={nickheadshot}
        buttonText="Download Resume"
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
              Founded in 2025 as a solo venture to bring innovative mobile applications to life. Focused on iOS, iPadOS, watchOS, visionOS, and macOS development with a emphasis on user-centric design and the safe use of AI.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-4">Mission</h3>
              <p className="text-gray-300">
                To craft delightful, accessible apps that empower users through smart technology. From health tracking to productivity tools, every project prioritizes privacy, performance, and ease of use.
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-4">Values</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• User-First Design</li>
                <li>• Privacy by Default</li>
                <li>• Innovative Problem-Solving</li>
                <li>• Lifelong Learning</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Journey Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Professional Journey</h2>
          <div className="space-y-8">
            {/* Current Role */}
            <div className="flex flex-col md:flex-row gap-6 items-start p-6 bg-gray-50 rounded-lg">
              <div className="md:w-24 text-center">
                <div className="w-20 h-16 bg-red-500 rounded flex items-center justify-center text-white font-bold text-lg mx-auto">2024 - Present</div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold">Software Engineer</h3>
                <h4 className="text-xl text-gray-600 mb-3">V1 Sports</h4>
                <p className="text-gray-700">
                  Enhancing mobile platforms by crafting advanced video and camera functionalities using Kotlin Multiplatform and Swift, while integrating innovative hardware for real-time user insights. Focused on optimizing performance and refining development workflows. Developing and maintaining native camera integrations for iOS and Android, as well as a Kotlin Multiplatform component for video analysis and composition. In addition to mobile technologies, I develop a C library for connecting to and collecting data from hardware pressure mat devices for golf swing analysis.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-start p-6 bg-gray-50 rounded-lg">
              <div className="md:w-24 text-center">
                <div className="w-20 h-16 bg-purple-500 rounded flex items-center justify-center text-white font-bold text-lg mx-auto">2024 - Present</div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold">Founder and Developer</h3>
                <h4 className="text-xl text-gray-600 mb-3">Molargik Software LLC</h4>
                <p className="text-gray-700">
                  Leading the development of innovative software solutions, with a focus on mobile applications. Utilizing modern technologies and frameworks to deliver high-quality products that meet user needs and drive continuous learning. End goal? Learn, apply, and learn more.
                </p>
              </div>
            </div>
            {/* Previous Experience */}
            <div className="flex flex-col md:flex-row gap-6 items-start p-6 bg-gray-50 rounded-lg">
              <div className="md:w-24 text-center">
                <div className="w-20 h-16 bg-blue-500 rounded flex items-center justify-center text-white font-bold text-lg mx-auto">2022 - 2024</div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold">Software Engineer, Mobile & Desktop</h3>
                <h4 className="text-xl text-gray-600 mb-3">Sweetwater Sound</h4>
                <p className="text-gray-700">
                  Transformed mobile applications into top-tier retail tools by building platform-native solutions, significantly boosting sales and user engagement. This work led to the mobile applications exceeding the website in discovery-to-sales. Provided mentorship to enhance team skills in modern development techniques. Learned the 4D programming language to build complex internal tooling for full-stack, full-breadth company management - from sales to inventory to customer engagement.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-start p-6 bg-gray-50 rounded-lg">
              <div className="md:w-24 text-center">
                <div className="w-20 h-16 bg-orange-500 rounded flex items-center justify-center text-white font-bold text-lg mx-auto">2020 - 2022</div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold">Electrical Engineer</h3>
                <h4 className="text-xl text-gray-600 mb-3">Raytheon Technologies</h4>
                <p className="text-gray-700">
                  Designed automated testing frameworks with MATLAB and Python to streamline hardware analysis, collaborating with RF experts to bridge digital and RF systems, and documented progress to support project continuity. Reworked PCBs and engaged in thorough module testing. Modified electrical schematics to improve designs.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-start p-6 bg-gray-50 rounded-lg">
              <div className="md:w-24 text-center">
                <div className="w-20 h-16 bg-green-500 rounded flex items-center justify-center text-white font-bold text-lg mx-auto">2019 - 2020</div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold">Electrical Engineering Intern</h3>
                <h4 className="text-xl text-gray-600 mb-3">NSWC Crane</h4>
                <p className="text-gray-700">
                  Supported the upgrade of legacy radar systems by developing automated software tools in MATLAB, conducted signal analysis, and actively contributed to strategic planning discussions.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-start p-6 bg-gray-50 rounded-lg">
              <div className="md:w-24 text-center">
                <div className="w-20 h-16 bg-yellow-500 rounded flex items-center justify-center text-white font-bold text-lg mx-auto">2015-2019</div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold">Laborer & CNC Operator</h3>
                <h4 className="text-xl text-gray-600 mb-3">Molargik Woodworking Inc</h4>
                <p className="text-gray-700">
                  Manual labor and craftsmanship in a family-owned cabinetry business, developing a strong work ethic and attention to detail. Operated various machinery, including a CNC Router and Edge Banding machine. Unofficial tech support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Education</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-3">Bachelor of Science in Electrical Engineering</h3>
              <h4 className="text-xl text-gray-300 mb-4">Purdue School of Engineering and Technology, IUPUI, 2020</h4>
              <ul className="space-y-2 text-gray-400">
                <li>• Strengthened technical foundation with a focus on Electric Motors and Power Systems with a Mathematics minor</li>
                <li>• Achieved a commendable 3.72 GPA</li>
              </ul>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-3">Certifications & Self-Study</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Acquired diverse programming skills through Codecademy, covering web technologies and mobile development</li>
                <li>• Explored languages and frameworks including JavaScript, Python, Swift, and SQL</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Technical Expertise</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-center">Specialties</h3>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Swift</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">SwiftUI</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">UIKit</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Kotlin</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Compose</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Flutter</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-center">Tools & Technologies</h3>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">AVFoundation</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Foundation Models</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">MATLAB</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Python</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">SQL</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">HealthKit</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">WeatherKit</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">FFmpegKit</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">And More!</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-center">Additional</h3>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Hardware-Software Integration</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">RF Systems</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Microcontroller Integration</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Hardware Automation</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Team Collaboration</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Jira</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">App Store Connect</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">And More!</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <img src={mygraIcon} alt="Mygra" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">Mygra</h3>
                <p className="text-gray-300 mb-4">
                  A health-focused app delivering AI-enhanced migraine tracking across multiple Apple platforms.
                </p>
                <Link to="/mygra" className="inline-block bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <img src={waffleIcon} alt="Waffle" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">Waffle</h3>
                <p className="text-gray-300 mb-4">
                  An iPad browser innovating multi-webpage management with customizable layouts.
                </p>
                <Link to="/waffle" className="inline-block bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Let's Build Something Great</h2>
          <p className="text-lg text-gray-600 mb-8">
            Ready to collaborate on a mobile or engineering project? Connect with me through email or social platforms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:nick@molargiksoftware.com" className="bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition">
              Email Me
            </a>
            <a href="https://www.linkedin.com/in/nicholas-molargik/" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
              LinkedIn
            </a>
            <a href="https://github.com/nmolargik" className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition">
              GitHub
            </a>
          </div>
        </div>
      </section>
    </>
  );
}