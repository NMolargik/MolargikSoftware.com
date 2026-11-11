import AppShowcase from '../components/AppShowcase';
import { screensFromGlob } from '../utils/screens';
import { findApp } from '../data/apps';
import icon from '../assets/stork/icon.png';

// Official brand color: Stork Orange
const ACCENT_COLOR = '#E8672B';
const APP_STORE_URL = 'https://apps.apple.com/us/app/stork-l-d-companion/id6740038476';

const app = findApp('stork')!;

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
      app={app}
      githubUrl="https://github.com/NMolargik/Stork"
      requirements={['iOS 26+', 'iPadOS 26+', 'macOS 26+', 'watchOS 26+']}
      screens={screens}
      screensClassName="bg-gradient-to-b from-orange-50/30 to-[#FAFAFA]"
      about={{
        title: 'Stork — Labor & Delivery Companion',
        intro:
          'Stork helps medical professionals track the deliveries they perform, visualize trends, and celebrate every birth. Designed for Labor & Delivery nurses, midwives, and OB-GYNs, Stork makes it simple to record, review, and analyze your delivery stats — all in one beautiful, privacy-first app across iPhone, iPad, Mac, and Apple Watch.',
        sections: [
          {
            title: 'What is Stork?',
            body: 'Stork is a focused companion for Labor & Delivery professionals who want a clear picture of their work. Log each delivery in seconds, including deliveries from any past date, organize with personal tags, search and filter your entire history, and browse it month by month in the calendar. Track your impact over weeks and years, and bring real numbers into conversations with peers and leadership.',
          },
          {
            title: 'Designed for Busy L&D Teams',
            body: 'Stork is built for fast, repeatable entries that fit naturally into your shift. Log deliveries from your wrist with the Apple Watch app or hands-free with Siri, check your week from Home Screen and Lock Screen widgets, jump straight to entry from the app icon, and dive deeper on your iPhone, iPad, or Mac with an adaptive sidebar and keyboard shortcuts.',
          },
          {
            title: 'Celebrate Every Birth',
            body: 'Each entry adds a marble to your Delivery Jar — a playful visualization of every miracle you have been part of. With Stork Pro, Stork recognizes career milestones as you reach them and turns them, and your favorite stats, into share cards perfect for celebrating with friends and colleagues.',
          },
          {
            title: 'Private by Design',
            body: 'Stork is HIPAA-conscious from the ground up: no patient information and no facility tracking — only your personal stats, synced seamlessly across your devices through your private iCloud. Lock the app with Face ID, and get a warning if a note looks like it contains a patient identifier.',
          },
        ],
        features: [
          {
            icon: '🍼',
            title: 'Track Every Delivery',
            description:
              'Log babies and their measurements, delivery method, epidural use, NICU stays, nurse catches, personal tags, and notes — all in seconds. Back-date any delivery to the day it happened, or add past births from before you used Stork.',
          },
          {
            icon: '📊',
            title: 'Trends & Statistics',
            description:
              'A customizable dashboard brings your career to life with delivery counts and the Delivery Jar for free. Stork Pro adds insight cards for time of day, day of week, year over year, personal bests, and baby measurements, plus the calendar heat map.',
          },
          {
            icon: '🎞️',
            title: 'Year in Births Wrap',
            description:
              'A story of your year in births, free for everyone. Share images never include names or patient details.',
          },
          {
            icon: '🗂️',
            title: 'Past Births',
            description:
              'Add births from before you used Stork, either as estimates or from a CSV file.',
          },
          {
            icon: '🔒',
            title: 'Face ID Lock & Note Warning',
            description:
              'Lock Stork with Face ID. If a note looks like it contains a patient identifier, Stork warns you before you save it.',
          },
          {
            icon: '🔍',
            title: 'Find Any Delivery Fast',
            description:
              'Search and filter your entire delivery log by notes, tags, method, date range, and more, then relive the details on a rich detail screen or browse month by month in the calendar.',
          },
          {
            icon: '🎉',
            title: 'Milestones & Share Cards (Pro)',
            description:
              'Stork celebrates career milestones as you reach them and turns your favorite stats into shareable cards. Part of Stork Pro.',
          },
          {
            icon: '📤',
            title: 'Export & Share (Pro)',
            description:
              'Generate polished PDF reports or CSV exports of your delivery records for portfolios, reviews, or your own analysis. Part of Stork Pro.',
          },
          {
            icon: '📱',
            title: 'Built for Every Apple Device',
            description:
              'Full support for iPhone, iPad, and Mac, plus an Apple Watch app, Home Screen widgets, and Siri and Shortcuts, all free. Lock Screen and interactive widgets come with Stork Pro. Available in English, Spanish, French (Canada), and Japanese.',
          },
          {
            icon: '💎',
            title: 'Stork Pro',
            description:
              'One $4.99 purchase, with Family Sharing, unlocks milestone share cards, PDF and CSV export, insight cards and the calendar heat map, alternate app icons, weather at each delivery, and Lock Screen and interactive widgets. Bought Stork before 3.0? Pro is yours free for life.',
          },
        ],
        footnote:
          'Stork requires the latest Apple platforms (iOS 26, iPadOS 26, macOS 26, or watchOS 26). Perfect for Labor & Delivery nurses, midwives, OB-GYNs, and maternity unit staff.',
      }}
      jsonLd={{
        name: 'Stork – L&D Companion',
        applicationCategory: 'MedicalApplication',
        operatingSystem: 'iOS, iPadOS, macOS, watchOS',
        inLanguage: ['en', 'es', 'fr-CA', 'ja'],
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        url: APP_STORE_URL,
      }}
    />
  );
}
