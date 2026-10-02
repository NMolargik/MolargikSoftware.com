import AppShowcase from '../components/AppShowcase';
import { screensFromGlob } from '../utils/screens';
import icon from '../assets/stork/icon.png';

// Official brand color: Stork Orange
const ACCENT_COLOR = '#E8672B';
const APP_STORE_URL = 'https://apps.apple.com/us/app/stork-delivery-stats/id6740038476';

const screens = screensFromGlob(
  import.meta.glob('../assets/stork/screens/*', { eager: true, import: 'default' })
);

export default function Stork() {
  return (
    <AppShowcase
      name="Stork"
      heading="Stork - L&D Companion"
      tagline="Track the deliveries you perform, visualize trends, and celebrate every birth."
      icon={icon}
      accentColor={ACCENT_COLOR}
      meta={{
        title: 'Stork – L&D Companion for Labor & Delivery Nurses | Nick Molargik',
        description:
          'Track the deliveries you perform, visualize trends, and celebrate every birth with Stork — the privacy-first companion for L&D nurses, midwives, and OB-GYNs. Built with Swift & SwiftUI.',
      }}
      appStoreUrl={APP_STORE_URL}
      githubUrl="https://github.com/NMolargik/Stork"
      requirements={['iOS 26+', 'iPadOS 26+', 'macOS 26+', 'visionOS 26+', 'watchOS 26+']}
      screens={screens}
      screensClassName="bg-gradient-to-b from-orange-50/30 to-[#FAFAFA]"
      about={{
        title: 'Stork — Labor & Delivery Companion',
        intro:
          'Stork helps medical professionals track the deliveries they perform, visualize trends, and celebrate every birth. Designed for Labor & Delivery nurses, midwives, and OB-GYNs, Stork makes it simple to record, review, and analyze your delivery stats — all in one beautiful, privacy-first app across iPhone, iPad, Mac, Apple Watch, and Apple Vision Pro.',
        sections: [
          {
            title: 'What is Stork?',
            body: 'Stork is a focused companion for Labor & Delivery professionals who want a clear picture of their work. Log each delivery in seconds, organize with personal tags, search and filter your entire history, and browse it month by month in the calendar. Track your impact over weeks and years, and bring real numbers into conversations with peers and leadership.',
          },
          {
            title: 'Designed for Busy L&D Teams',
            body: 'Stork is built for fast, repeatable entries that fit naturally into your shift. Log deliveries from your wrist with the Apple Watch app or hands-free with Siri, check your week from Home Screen and Lock Screen widgets, jump straight to entry from the app icon, and dive deeper on your iPhone, iPad, or Mac with an adaptive sidebar and keyboard shortcuts.',
          },
          {
            title: 'Celebrate Every Birth',
            body: 'Each entry adds a marble to your Delivery Jar — a playful visualization of every miracle you have been part of. Stork recognizes career milestones as you reach them and turns them, and your favorite stats, into share cards perfect for celebrating with friends and colleagues.',
          },
          {
            title: 'Private by Design',
            body: 'Stork is HIPAA-conscious from the ground up: no patient information and no facility tracking — only your personal stats, synced seamlessly across your devices through your private iCloud.',
          },
        ],
        features: [
          {
            icon: '🍼',
            title: 'Track Every Delivery',
            description:
              'Log babies and their measurements, delivery method, epidural use, NICU stays, nurse catches, personal tags, and notes — all in seconds.',
          },
          {
            icon: '📊',
            title: 'Trends & Statistics',
            description:
              'A customizable dashboard brings your career to life: delivery counts, sex distribution, delivery methods, time-of-day and day-of-week patterns, year-over-year growth, and personal bests.',
          },
          {
            icon: '🔍',
            title: 'Find Any Delivery Fast',
            description:
              'Search and filter your entire delivery log by notes, tags, method, date range, and more, then relive the details on a rich detail screen or browse month by month in the calendar.',
          },
          {
            icon: '🎉',
            title: 'Milestones & Share Cards',
            description:
              'Stork celebrates career milestones as you reach them and turns your favorite stats into shareable cards.',
          },
          {
            icon: '📤',
            title: 'Export & Share',
            description:
              'Generate polished PDF reports or CSV exports of your delivery records for portfolios, reviews, or your own analysis.',
          },
          {
            icon: '📱',
            title: 'Built for Every Apple Device',
            description:
              'Full support for iPhone, iPad, Mac, and Apple Vision Pro, plus an Apple Watch app, Home Screen and Lock Screen widgets, and Siri and Shortcuts. Available in English, Spanish, French (Canada), and Japanese.',
          },
        ],
        footnote:
          'Stork requires the latest Apple platforms (iOS 26, iPadOS 26, macOS 26, watchOS 26, or visionOS 26). Perfect for Labor & Delivery nurses, midwives, OB-GYNs, and maternity unit staff.',
      }}
      jsonLd={{
        name: 'Stork – L&D Companion',
        applicationCategory: 'MedicalApplication',
        operatingSystem: 'iOS, iPadOS, macOS, watchOS, visionOS',
        inLanguage: ['en', 'es', 'fr-CA', 'ja'],
        offers: { '@type': 'Offer', price: '0.99', priceCurrency: 'USD' },
        url: APP_STORE_URL,
      }}
    />
  );
}
