import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, Smartphone, Languages } from 'lucide-react';
import AppCard from '../components/AppCard';
import GlassButton from '../components/GlassButton';
import LiquidGlass from '../components/LiquidGlass';
import { useRouteMeta } from '../hooks';
import { apps } from '../data/apps';
import { fadeUp, staggerContainer, staggerChild } from '../utils/animations';
import logo from '../assets/logo.svg';

const reasons = [
  {
    icon: ShieldCheck,
    accent: '#6D00FF',
    title: 'Private by design',
    body:
      'Most of our apps collect no data at all. What you enter stays on your device and in your own iCloud account. No analytics SDKs, no ad networks, nothing sold.',
  },
  {
    icon: Smartphone,
    accent: '#FF6C00',
    title: 'Every Apple platform',
    body:
      'Native Swift and SwiftUI on iPhone, iPad, Mac, Apple Watch, Apple TV, and Vision Pro, with one library that syncs between all of them.',
  },
  {
    icon: Languages,
    accent: '#2D7FF9',
    title: 'Speaks your language',
    body:
      'Each app is localized in four to five languages, including English, Spanish, French, Japanese, German, Dutch, and Norwegian.',
  },
];

export default function Home() {
  useRouteMeta();

  return (
    <>
      {/* Hero */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-white to-gray-50 pt-28 pb-16 overflow-hidden">
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
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-8 flex justify-center"
          >
            <div className="w-[120px] h-[120px] rounded-[2rem] shadow-lg bg-white flex items-center justify-center">
              <img src={logo} alt="" width={88} height={88} className="w-[88px] h-[88px] object-contain" />
            </div>
          </motion.div>
          <motion.h1
            className="text-[2.5rem] sm:text-[3.25rem] md:text-display font-bold tracking-[-0.02em] leading-[1.05] text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Molargik Software
          </motion.h1>
          <motion.p
            className="mt-5 text-lg sm:text-2xl text-gray-500 max-w-2xl mx-auto leading-relaxed [text-wrap:balance]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Independent apps for every Apple device. Private by design.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-3 mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <GlassButton
              href="#apps"
              accentColor="#6D00FF"
              size="md"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#apps')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore the apps
            </GlassButton>
            <GlassButton to="/about" accentColor="#FF6C00" size="md">
              About the studio
            </GlassButton>
          </motion.div>
        </div>
      </section>

      {/* Apps */}
      <section id="apps" className="relative bg-white py-16 scroll-mt-20 overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-10 left-1/4 w-[420px] h-[420px] rounded-full opacity-40 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(109, 0, 255, 0.4) 0%, rgba(109, 0, 255, 0) 70%)' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-10 right-1/5 w-[460px] h-[460px] rounded-full opacity-40 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(255, 108, 0, 0.4) 0%, rgba(255, 108, 0, 0) 70%)' }}
        />
        <div className="relative max-w-6xl mx-auto px-6">
          <motion.div className="text-center mb-10" {...fadeUp}>
            <h2 className="text-headline text-gray-900">Six apps. One studio.</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Each one started as a problem worth solving for ourselves. All of them are on the App Store today.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps.map((app, idx) => (
              <AppCard key={app.slug} app={app} index={idx} channel="home" />
            ))}
          </div>
        </div>
      </section>

      {/* Why Molargik */}
      <section className="bg-surface py-16">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div className="text-center mb-10" {...fadeUp}>
            <h2 className="text-headline text-gray-900">Why Molargik</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              A one-person studio in Indiana, building the apps we wanted to use ourselves.
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {reasons.map(({ icon: Icon, accent, title, body }) => (
              <motion.div key={title} variants={staggerChild}>
                <LiquidGlass variant="card" accentColor={accent} className="rounded-2xl p-7 h-full">
                  <div
                    className="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-4"
                    style={{ background: `${accent}1A`, color: accent }}
                  >
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                  <p className="mt-2 text-gray-600 leading-relaxed">{body}</p>
                </LiquidGlass>
              </motion.div>
            ))}
          </motion.div>
          <motion.p className="mt-8 text-center text-sm text-gray-500" {...fadeUp}>
            Read the{' '}
            <Link to="/privacy" className="text-brandPurple underline underline-offset-4">
              privacy policy
            </Link>{' '}
            for the specifics on each app, or visit{' '}
            <Link to="/support" className="text-brandPurple underline underline-offset-4">
              support
            </Link>{' '}
            if you need a hand.
          </motion.p>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Molargik Software LLC',
            url: 'https://molargiksoftware.com/',
            logo: 'https://molargiksoftware.com/og/default.png',
            founder: { '@type': 'Person', name: 'Nick Molargik' },
            sameAs: ['https://github.com/NMolargik', 'https://www.linkedin.com/in/nicholas-molargik/'],
          }),
        }}
      />
    </>
  );
}
