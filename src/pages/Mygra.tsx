import AppShowcase from '../components/AppShowcase';
import { screensFromGlob } from '../utils/screens';
import { findApp } from '../data/apps';
import icon from '../assets/mygra/icon.png';

// Official brand color: Mygra Purple
const ACCENT_COLOR = '#6E60FF';
const APP_STORE_URL = 'https://apps.apple.com/us/app/mygra/id6747298583';

const app = findApp('mygra')!;

const screens = screensFromGlob(
  import.meta.glob('../assets/mygra/screens/*', { eager: true, import: 'default' })
);

export default function Mygra() {
  return (
    <AppShowcase
      name="Mygra"
      tagline="Your intelligent migraine journal. Private, on-device insights that help you find relief."
      icon={icon}
      accentColor={ACCENT_COLOR}
      app={app}
      githubUrl="https://github.com/NMolargik/Mygra"
      requirements={['iOS 18+', 'iPadOS 18+', 'watchOS 11+', 'visionOS 2+']}
      screens={screens}
      screensClassName="bg-gradient-to-b from-purple-50/30 to-[#FAFAFA]"
      about={{
        title: 'Mygra — Your Intelligent Migraine Journal',
        intro:
          'Take control of your migraines with Mygra, a private, intelligent companion that helps you spot patterns, understand your triggers, and find relief. Log an attack in seconds, watch the trends emerge, and, with Mygra Plus, let on-device Apple Intelligence explain what may have contributed. Everything syncs securely through your own iCloud account and connects with Apple Health for the full picture of your well-being.',
        sections: [
          {
            title: 'Log Migraines in Seconds',
            body: 'Capture start and end times, pain and stress on a 0–10 scale, triggers from a curated list (or your own), foods, and notes. Track an attack as it happens with a Live Activity on your Lock Screen and in the Dynamic Island. Health and weather are attached automatically, so each entry records how you slept, what you drank, and what the sky was doing.',
          },
          {
            title: 'Attack Mode',
            body: 'One tap starts a migraine and switches to a dim, quiet screen, and you log the details later. Start it from a widget, Control Center, Siri, or Apple Watch.',
          },
          {
            title: 'Insights, Privately (Plus)',
            body: 'Mygra Plus adds the Migraine Assistant, an analyst powered by Apple Intelligence that knows your history and profile, and every word stays on your device. Each logged attack gets a plain-language explanation of likely contributing factors, Quick Bits explain the trends across triggers, foods, hydration, sleep, and more, weather-risk forecasts and alerts warn you when conditions turn risky, Cycle Insights show whether your migraines cluster around your period, and a pressure graph marks the drop threshold you set.',
          },
          {
            title: 'See the Big Picture',
            body: 'The Dashboard is simpler, with one Log a Migraine button. The Calendar colors each month by severity, History is searchable and grouped by month with powerful filters, and with Plus a doctor-ready PDF report is one tap away, now with MIDAS and HIT-6 scores.',
          },
          {
            title: 'Private by Design',
            body: 'Your data lives on your device and in your personal iCloud. Mygra has no accounts, no servers, and no tracking. AI analysis never leaves your device.',
          },
        ],
        features: [
          {
            icon: '📝',
            title: 'Fast, Detailed Logging',
            description:
              'Start and end times, pain and stress, triggers, foods, notes, and a Live Activity that follows an attack in progress.',
          },
          {
            icon: '🌙',
            title: 'Attack Mode',
            description:
              'One tap starts a migraine and switches to a dim, quiet screen. Log the details later. Start it from a widget, Control Center, Siri, or Apple Watch.',
          },
          {
            icon: '💊',
            title: 'Medication Tracking',
            description:
              'Track the medication you take, with overuse alerts.',
          },
          {
            icon: '🤖',
            title: 'Migraine Assistant (Plus)',
            description:
              'Chat with an on-device Apple Intelligence analyst that knows your history, and get a per-migraine insight the moment you log an attack. Part of Mygra Plus.',
          },
          {
            icon: '🌦️',
            title: 'Weather Correlations (Plus)',
            description:
              'See how pressure, humidity, temperature, and conditions line up with your attacks, and get a heads-up when conditions turn risky. Weather-risk forecasts and alerts are part of Mygra Plus, along with a pressure graph that uses your own drop threshold.',
          },
          {
            icon: '🔄',
            title: 'Cycle Insights (Plus)',
            description:
              'See whether your migraines cluster around your period. Part of Mygra Plus.',
          },
          {
            icon: '📄',
            title: 'Doctor-Ready Reports (Plus)',
            description:
              'Turn your history into a clean PDF report for your next appointment, or export everything as CSV for your own analysis. The report includes MIDAS and HIT-6 scores. Part of Mygra Plus.',
          },
          {
            icon: '❤️',
            title: 'Apple Health',
            description:
              'Sleep, water, caffeine, food, steps, heart rate, blood oxygen, glucose, and menstrual phase feed your insights. Completed migraines are written back to Health as headaches.',
          },
          {
            icon: '⌚',
            title: 'Watch, Widgets & Siri',
            description:
              'Start or end a migraine from your wrist, check your streak from a widget or complication, and let Siri start, end, check, or update a migraine hands-free.',
          },
          {
            icon: '🖥️',
            title: 'Built for iPad',
            description:
              'A sidebar, two-column layouts, and keyboard shortcuts make the most of the bigger screen, and the iPad app runs on Apple Vision Pro too. Available in English, Spanish, French (Canada), and Japanese.',
          },
          {
            icon: '💎',
            title: 'Simple Pricing',
            description:
              'Free forever: logging, Live Activity, calendar, history, tags, charts, Apple Health, Apple Watch, widgets, Siri, and Spotlight. Mygra Plus adds the Migraine Assistant, trigger insights, Cycle Insights, weather-risk forecasts and alerts, doctor-ready reports, and CSV export for $2.99 a month, $14.99 a year with a 7-day free trial, or $29.99 once, with Family Sharing. Bought Mygra before 2.0? Plus is yours free for life.',
          },
        ],
        footnote:
          'Mygra is free to download; Mygra Plus is an optional upgrade. Mygra may use on-device intelligence to generate wellness insights. These are for informational purposes only and are not medical advice. Some features require iOS 26 or iPadOS 26; the Migraine Assistant and per-migraine insights require Apple Intelligence.',
      }}
      jsonLd={{
        name: 'Mygra',
        applicationCategory: 'HealthApplication',
        operatingSystem: 'iOS, iPadOS, watchOS, visionOS',
        inLanguage: ['en', 'es', 'fr-CA', 'ja'],
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        url: APP_STORE_URL,
      }}
    />
  );
}
