import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Download, Newspaper } from 'lucide-react';
import LiquidGlass from '../components/LiquidGlass';
import GlassButton from '../components/GlassButton';
import ScrollToTop from '../components/ScrollToTop';
import { useRouteMeta } from '../hooks';
import { apps } from '../data/apps';
import { CONTACT_EMAIL, SITE_URL } from '../config/site';
import { appStoreLink, siteChannel } from '../utils/appStore';
import { fadeUp } from '../utils/animations';

const SCREENSHOTS = [1, 2, 3];

const companyBlurb =
  'Molargik Software LLC is an independent app studio in Indiana, founded in 2025 by Nick Molargik. It builds native Swift and SwiftUI apps for iPhone, iPad, Mac, Apple Watch, Apple TV, and Vision Pro, each one started to solve a problem the founder ran into himself. The apps are private by design: most collect no data at all, sync through the user\'s own iCloud, and ship without analytics SDKs or ad networks. Six apps are on the App Store today: Maestro, Opalite, SetDeck, Mygra, Stork, and Waffle.';

const founderLine =
  'Nick Molargik is a senior software engineer and the founder of Molargik Software LLC. An electrical engineer by training, he has shipped mobile apps at Sweetwater, V1 Sports, and StreetIQ, and builds the studio\'s apps solo from concept to App Store.';

export default function Press() {
  useRouteMeta();

  return (
    <>
      <section className="pt-28 pb-10 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex"
          >
            <LiquidGlass variant="card" accentColor="#FF6C00" className="inline-flex items-center justify-center w-16 h-16 rounded-2xl">
              <Newspaper size={32} className="text-brandOrange" aria-hidden="true" />
            </LiquidGlass>
          </motion.div>
          <h1 className="text-headline text-gray-900">Press kit</h1>
          <p className="mt-4 text-lg text-gray-500">
            Everything you need to write about Molargik Software and its apps. Icons and screenshots may be used
            freely in coverage. Questions, review codes, and interview requests:{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-brandPurple underline underline-offset-4">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </div>
      </section>

      <section className="pb-10 bg-white">
        <div className="max-w-4xl mx-auto px-6 grid gap-6 md:grid-cols-2">
          <motion.div {...fadeUp}>
            <LiquidGlass variant="card" accentColor="#6D00FF" className="rounded-3xl p-7 h-full">
              <h2 className="text-xl font-semibold text-gray-900">About Molargik Software</h2>
              <p className="mt-3 text-gray-600 leading-relaxed">{companyBlurb}</p>
            </LiquidGlass>
          </motion.div>
          <motion.div {...fadeUp}>
            <LiquidGlass variant="card" accentColor="#FF6C00" className="rounded-3xl p-7 h-full">
              <h2 className="text-xl font-semibold text-gray-900">Founder</h2>
              <p className="mt-3 text-gray-600 leading-relaxed">{founderLine}</p>
              <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
                <dt className="text-gray-500">Website</dt>
                <dd>
                  <a href={SITE_URL} className="text-brandPurple underline underline-offset-4">
                    molargiksoftware.com
                  </a>
                </dd>
                <dt className="text-gray-500">Email</dt>
                <dd>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-brandPurple underline underline-offset-4">
                    {CONTACT_EMAIL}
                  </a>
                </dd>
                <dt className="text-gray-500">Location</dt>
                <dd className="text-gray-700">Indiana, USA</dd>
                <dt className="text-gray-500">Founded</dt>
                <dd className="text-gray-700">2025</dd>
                <dt className="text-gray-500">Logo</dt>
                <dd>
                  <a href="/og/default.png" download className="text-brandPurple underline underline-offset-4">
                    Social card (PNG)
                  </a>{' '}
                  ·{' '}
                  <a href="/logo.svg" download className="text-brandPurple underline underline-offset-4">
                    Mark (SVG)
                  </a>
                </dd>
              </dl>
            </LiquidGlass>
          </motion.div>
        </div>
      </section>

      <section className="pb-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          {apps.map((app) => (
            <motion.article key={app.slug} id={app.slug} className="scroll-mt-24" {...fadeUp} aria-labelledby={`press-${app.slug}`}>
              <LiquidGlass variant="card" accentColor={app.accent} className="rounded-3xl p-7">
                <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                  <img
                    src={`/press/${app.slug}/icon.png`}
                    alt={`${app.name} app icon`}
                    width={96}
                    height={96}
                    loading="lazy"
                    className="w-24 h-24 rounded-[1.4rem] shadow-md flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h2 id={`press-${app.slug}`} className="text-2xl font-bold text-gray-900">
                      {app.storeName}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {app.price} · {app.platforms.join(', ')} · {app.languages.join(', ')}
                    </p>
                    <p className="mt-3 text-gray-600 leading-relaxed">{app.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <a
                        href={`/press/${app.slug}/icon.png`}
                        download={`${app.name}-icon.png`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                      >
                        <Download size={14} aria-hidden="true" /> Icon (1024px PNG)
                      </a>
                      <Link
                        to={app.path}
                        className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                      >
                        Product page
                      </Link>
                      <a
                        href={appStoreLink(app.appStoreUrl, siteChannel('press'))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                      >
                        App Store
                      </a>
                    </div>
                  </div>
                </div>
                <ul className="mt-6 grid grid-cols-3 gap-3 list-none p-0" aria-label={`${app.name} screenshots`}>
                  {SCREENSHOTS.map((n) => (
                    <li key={n}>
                      <a href={`/press/${app.slug}/screenshot-${n}.webp`} download={`${app.name}-screenshot-${n}.webp`} className="block group">
                        <img
                          src={`/press/${app.slug}/screenshot-${n}.webp`}
                          alt={`${app.name} screenshot ${n}`}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-48 sm:h-64 object-contain rounded-xl bg-gray-50 group-hover:bg-gray-100 transition-colors"
                        />
                        <span className="mt-1 block text-center text-xs text-gray-500">Download</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </LiquidGlass>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="pb-20 bg-white">
        <motion.div className="max-w-3xl mx-auto px-6 text-center" {...fadeUp}>
          <h2 className="text-2xl font-bold text-gray-900">Need something else?</h2>
          <p className="mt-3 text-gray-600">Promo codes, higher-resolution assets, and a founder interview are a short email away.</p>
          <div className="mt-6">
            <GlassButton href={`mailto:${CONTACT_EMAIL}?subject=Press%20inquiry`} accentColor="#6D00FF" size="md">
              Email {CONTACT_EMAIL}
            </GlassButton>
          </div>
        </motion.div>
      </section>
      <ScrollToTop />
    </>
  );
}
