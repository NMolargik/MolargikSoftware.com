import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LifeBuoy, Mail, ShieldCheck } from 'lucide-react';
import LiquidGlass from '../components/LiquidGlass';
import GlassButton from '../components/GlassButton';
import ScrollToTop from '../components/ScrollToTop';
import { useRouteMeta } from '../hooks';
import { apps } from '../data/apps';
import { CONTACT_EMAIL } from '../config/site';
import { fadeUp } from '../utils/animations';

interface Faq {
  q: string;
  a: string;
}

const common: Faq[] = [
  {
    q: 'I bought an unlock on one device. How do I get it on my other devices?',
    a: 'Purchases are tied to your Apple Account. On the other device, open the app, go to the upgrade screen, and tap Restore Purchases. Make sure both devices are signed in with the same Apple Account.',
  },
  {
    q: 'My data is not syncing between devices.',
    a: 'Sync runs through your private iCloud database. Check that iCloud Drive is on for the app in Settings > [your name] > iCloud, that both devices use the same Apple Account, and give it a few minutes on Wi-Fi. Sync is never instant, but it should settle within a few minutes.',
  },
  {
    q: 'Can I get a refund?',
    a: 'Refunds for App Store purchases are handled by Apple at reportaproblem.apple.com. If something is broken, email first and I will do my best to fix it.',
  },
];

const perApp: Record<string, Faq[]> = {
  maestro: [
    {
      q: 'The car will not play my show.',
      a: 'Export both files (the .fseq and the audio) into a folder named LightShow at the root of a USB drive formatted as exFAT or FAT32, plug it into a front USB port, then open Toybox > Light Show on the car.',
    },
    {
      q: 'Where is the Sequence Editor?',
      a: 'The channel-level Sequence Editor is a Mac feature. Shows sync through iCloud, so you can choreograph on iPhone or iPad and fine-tune on the Mac.',
    },
    {
      q: 'Do you track what I export?',
      a: 'Each export sends an anonymous count to api.molargiksoftware.com so the site can show a running total. No song, show, or device details are included.',
    },
  ],
  opalite: [
    {
      q: 'What does Onyx include?',
      a: 'Unlimited palettes, the drawing canvas, community downloads, and every export format (Procreate, Adobe ASE, SwiftUI, CSS, GIMP/GPL, PDF). It is a single $9.99 purchase, not a subscription.',
    },
    {
      q: 'Who can see my palettes?',
      a: 'Nobody unless you publish them. The Community tab is opt-in; only palettes you choose to publish, with the display name you set, appear there. Everything else lives in your private iCloud.',
    },
    {
      q: 'Can I see my colors on the web?',
      a: 'Yes. Opalite Web at molargiksoftware.com/opalite-web signs you in with your Apple Account and shows the palettes synced from the app.',
    },
  ],
  setdeck: [
    {
      q: 'Is anything paid?',
      a: 'No. SetDeck is completely free with no accounts, ads, or in-app purchases.',
    },
    {
      q: 'Workouts are not showing up in Apple Health.',
      a: 'Open Settings > Health > Data Access & Devices > SetDeck and allow writing workouts, water, and dietary energy. SetDeck only reads and writes the categories you approve.',
    },
    {
      q: 'The Apple Watch app is not showing my routine.',
      a: 'Routines sync over iCloud. Make sure the watch is paired with the iPhone that holds your routine and that iCloud is enabled for SetDeck; then open the watch app and pull to refresh.',
    },
  ],
  mygra: [
    {
      q: 'What is in Mygra Plus?',
      a: 'The on-device Migraine Assistant, per-migraine insights, weather correlations and risk alerts, and the full stats suite. $2.99 a month or $14.99 a year with a 7-day free trial, or $29.99 once.',
    },
    {
      q: 'Weather correlations show nothing.',
      a: 'Mygra asks for your location only at the moment you log a migraine so it can fetch that day\'s conditions from WeatherKit. Allow location "While Using" and log a few migraines; correlations appear once there is enough history.',
    },
    {
      q: 'Is my health data shared?',
      a: 'No. Mygra reads from and writes to Apple Health on your device, and insights are generated on-device with Apple Intelligence. Nothing is sent to us.',
    },
  ],
  stork: [
    {
      q: 'Is Stork HIPAA compliant?',
      a: 'Stork is designed so you never need to enter protected health information: deliveries are logged as counts, methods, and your own notes. Data stays on your device and in your private iCloud; it is never sent to us.',
    },
    {
      q: 'What does Stork Pro unlock?',
      a: 'The full stats dashboard, milestones and share cards, and PDF/CSV export, for a single $4.99 purchase.',
    },
    {
      q: 'Can I export my deliveries?',
      a: 'Yes. Stork Pro exports a PDF report or a CSV of your full delivery log from the Export screen.',
    },
  ],
  waffle: [
    {
      q: 'Why is Waffle iPad only?',
      a: 'The grid of live webpages needs the screen space. Waffle requires iPadOS 27 or later.',
    },
    {
      q: 'What does Syrup unlock?',
      a: 'Larger grids up to 4x4, saved presets, and pop-out windows, for a single $2.99 purchase.',
    },
    {
      q: 'A site will not load in a cell.',
      a: 'Some sites block being embedded. Try popping the cell out into its own window; if it still fails, email the URL and I will take a look.',
    },
  ],
};

function FaqList({ items }: { items: Faq[] }) {
  return (
    <dl className="divide-y divide-gray-100">
      {items.map((f) => (
        <div key={f.q} className="py-4">
          <dt className="font-semibold text-gray-900">{f.q}</dt>
          <dd className="mt-1 text-gray-600 leading-relaxed">{f.a}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function Support() {
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
            <LiquidGlass variant="card" accentColor="#6D00FF" className="inline-flex items-center justify-center w-16 h-16 rounded-2xl">
              <LifeBuoy size={32} className="text-brandPurple" aria-hidden="true" />
            </LiquidGlass>
          </motion.div>
          <h1 className="text-headline text-gray-900">Support</h1>
          <p className="mt-4 text-lg text-gray-500">
            Every app is built and supported by one person, so you will hear back from the developer. Start with the
            answers below, then email{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-brandPurple underline underline-offset-4">
              {CONTACT_EMAIL}
            </a>{' '}
            with the app name, your device, and what happened.
          </p>
          <nav aria-label="Apps" className="mt-8 flex flex-wrap justify-center gap-2">
            {apps.map((app) => (
              <a
                key={app.slug}
                href={`#${app.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
              >
                <img src={app.icon} alt="" width={20} height={20} className="w-5 h-5 rounded-md" />
                {app.name}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="pb-8 bg-white">
        <motion.div className="max-w-3xl mx-auto px-6" {...fadeUp}>
          <LiquidGlass variant="card" accentColor="#FF6C00" className="rounded-3xl px-6 py-6 sm:px-8">
            <h2 className="text-xl font-semibold text-gray-900">Every app</h2>
            <FaqList items={common} />
          </LiquidGlass>
        </motion.div>
      </section>

      <section className="pb-16 bg-white">
        <div className="max-w-3xl mx-auto px-6 space-y-6">
          {apps.map((app) => (
            <motion.div key={app.slug} id={app.slug} className="scroll-mt-24" {...fadeUp}>
              <LiquidGlass variant="card" accentColor={app.accent} className="rounded-3xl px-6 py-6 sm:px-8">
                <div className="flex items-center gap-4">
                  <img src={app.icon} alt="" width={48} height={48} loading="lazy" className="w-12 h-12 rounded-xl shadow" />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{app.name}</h2>
                    <p className="text-sm text-gray-500">
                      {app.price} ·{' '}
                      <Link to={app.path} className="text-brandPurple underline underline-offset-4">
                        About {app.name}
                      </Link>
                    </p>
                  </div>
                </div>
                <FaqList items={perApp[app.slug] ?? []} />
              </LiquidGlass>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="pb-20 bg-white">
        <motion.div className="max-w-3xl mx-auto px-6 text-center" {...fadeUp}>
          <h2 className="text-2xl font-bold text-gray-900">Still stuck?</h2>
          <p className="mt-3 text-gray-600">
            Email is fastest. Include screenshots if you can; nothing you send is shared.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
            <GlassButton href={`mailto:${CONTACT_EMAIL}`} accentColor="#6D00FF" size="md">
              <Mail size={18} aria-hidden="true" /> Email support
            </GlassButton>
            <GlassButton to="/privacy" accentColor="#16A34A" size="md">
              <ShieldCheck size={18} aria-hidden="true" /> Privacy policy
            </GlassButton>
          </div>
        </motion.div>
      </section>
      <ScrollToTop />
    </>
  );
}
