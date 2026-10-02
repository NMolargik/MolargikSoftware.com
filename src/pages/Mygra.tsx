import AppShowcase from '../components/AppShowcase';
import { screensFromGlob } from '../utils/screens';
import icon from '../assets/mygra/icon.png';

// Official brand color: Mygra Purple
const ACCENT_COLOR = '#6E60FF';
const APP_STORE_URL = 'https://apps.apple.com/us/app/mygra/id6747298583';

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
      meta={{
        title: 'Mygra – Intelligent Migraine Journal | Nick Molargik',
        description:
          'Log migraines in seconds, let on-device Apple Intelligence explain what may have contributed, and watch the trends emerge. Weather correlations, Apple Health, Apple Watch, Siri, and iCloud sync. Private by design.',
      }}
      appStoreUrl={APP_STORE_URL}
      githubUrl="https://github.com/NMolargik/Mygra"
      requirements={['iOS 18+', 'iPadOS 18+', 'macOS 15+', 'watchOS 11+', 'visionOS 2+']}
      screens={screens}
      screensClassName="bg-gradient-to-b from-purple-50/30 to-[#FAFAFA]"
      about={{
        title: 'Mygra — Your Intelligent Migraine Journal',
        intro:
          'Take control of your migraines with Mygra, a private, intelligent companion that helps you spot patterns, understand your triggers, and find relief. Log an attack in seconds, let on-device Apple Intelligence explain what may have contributed, and watch the trends emerge. Everything syncs securely through your own iCloud account and connects with Apple Health for the full picture of your well-being.',
        sections: [
          {
            title: 'Log Migraines in Seconds',
            body: 'Capture start and end times, pain and stress on a 0–10 scale, triggers from a curated list (or your own), foods, and notes. Track an attack as it happens with a Live Activity on your Lock Screen and in the Dynamic Island. Health and weather are attached automatically, so each entry records how you slept, what you drank, and what the sky was doing.',
          },
          {
            title: 'Insights, Privately',
            body: 'The Migraine Assistant is an analyst powered by Apple Intelligence that knows your history and profile, and every word stays on your device. Each logged attack gets a plain-language explanation of likely contributing factors, Quick Bits surface rule-based trends across triggers, foods, hydration, sleep, and more, and weather correlations warn you when conditions turn risky.',
          },
          {
            title: 'See the Big Picture',
            body: 'The Dashboard opens with your migraine-free streak, followed by local weather, today’s Health stats with Quick Add, and the latest Quick Bits. The Calendar colors each month by severity, History is searchable and grouped by month with powerful filters, and a PDF report is one tap away for your doctor.',
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
            icon: '🤖',
            title: 'Migraine Assistant',
            description:
              'Chat with an on-device Apple Intelligence analyst that knows your history, and get a per-migraine insight the moment you log an attack.',
          },
          {
            icon: '🌦️',
            title: 'Weather Correlations',
            description:
              'See how pressure, humidity, temperature, and conditions line up with your attacks, and get a heads-up when conditions turn risky.',
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
            title: 'iPad & Mac',
            description:
              'A sidebar, two-column layouts, keyboard shortcuts, and a menu bar. Available in English, Spanish, French (Canada), and Japanese.',
          },
        ],
        footnote:
          'Mygra may use on-device intelligence to generate wellness insights. These are for informational purposes only and are not medical advice. Some features require iOS 26 or iPadOS 26; the Migraine Assistant and per-migraine insights require Apple Intelligence.',
      }}
      jsonLd={{
        name: 'Mygra',
        applicationCategory: 'HealthApplication',
        operatingSystem: 'iOS, iPadOS, macOS, watchOS, visionOS',
        inLanguage: ['en', 'es', 'fr-CA', 'ja'],
        offers: { '@type': 'Offer', price: '2.99', priceCurrency: 'USD' },
        url: APP_STORE_URL,
      }}
    />
  );
}
