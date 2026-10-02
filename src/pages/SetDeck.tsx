import AppShowcase from '../components/AppShowcase';
import { screensFromGlob } from '../utils/screens';
import icon from '../assets/setdeck/icon.png';

// Official brand color: SetDeck Green Start
const ACCENT_COLOR = '#65DA92';
const APP_STORE_URL = 'https://apps.apple.com/us/app/setdeck/id6484503374';

const screens = screensFromGlob(
  import.meta.glob('../assets/setdeck/screens/*', { eager: true, import: 'default' })
);

export default function SetDeck() {
  return (
    <AppShowcase
      name="SetDeck"
      tagline="Plan the week. Log every set. Watch the numbers climb."
      icon={icon}
      accentColor={ACCENT_COLOR}
      meta={{
        title: 'SetDeck – Strength Training Companion | Nick Molargik',
        description:
          'Plan your training week, log every set, and watch the numbers climb. SetDeck tracks routines, history, stats, achievements, hydration, and calories — with Apple Watch, Siri, and Apple Health. Built with Swift & SwiftUI.',
      }}
      appStoreUrl={APP_STORE_URL}
      githubUrl="https://github.com/NMolargik/SetDeck"
      requirements={['iOS 18+', 'iPadOS 18+', 'watchOS 11+', 'visionOS 2+']}
      screens={screens}
      screensClassName="bg-gradient-to-b from-green-50/50 to-[#FAFAFA]"
      about={{
        title: 'SetDeck — Structure Without Friction',
        intro:
          'SetDeck is a strength training companion for people who want structure without friction. Build a weekly routine, work through it set by set, and let SetDeck keep the history, the stats, and the streaks. Then check in on hydration and calories with a swipe, right alongside your training.',
        sections: [
          {
            title: 'Build Your Week',
            body: 'Plan up to seven training days, each with its own ordered list of exercises. Add notes, equipment, and a reference video to any exercise. Type an exercise name and SetDeck can suggest the muscle groups it works, entirely on device.',
          },
          {
            title: 'Train Set by Set',
            body: 'Every exercise holds the sets you plan to do: reps and weight, as many as possible, timed, or freeform. As you train, log what you actually did, add an RPE if you want, and swipe on to the next card. Start a strength workout and a Live Activity keeps the elapsed time on your Lock Screen and in the Dynamic Island.',
          },
          {
            title: 'See Real Progress',
            body: 'SetDeck records a history entry every time you finish a set. The Stats tab turns that history into volume trends, personal records, a muscle heatmap, balance analysis, and intensity breakdowns so you can see what is working and what needs attention.',
          },
          {
            title: 'Private by Design',
            body: 'Your training data lives in your private iCloud database and in Apple Health. There are no accounts, no ads, and no tracking. Download SetDeck and take control of your training, one set at a time.',
          },
        ],
        features: [
          {
            icon: '📅',
            title: 'Weekly Routine Deck',
            description:
              'Up to seven training days, each an ordered deck of exercises with notes, equipment, and reference videos.',
          },
          {
            icon: '🏋️',
            title: 'Set-by-Set Logging',
            description:
              'Reps and weight, AMRAP, timed, or freeform sets. Log what you actually did, add an RPE, and swipe to the next card.',
          },
          {
            icon: '📈',
            title: 'Stats That Tell a Story',
            description:
              'Volume trends, personal records, a muscle heatmap, balance analysis, and intensity breakdowns built from every set you finish.',
          },
          {
            icon: '🏅',
            title: 'Achievements',
            description:
              'Unlock badges for consistency, volume, variety, strength milestones, and a fully built routine. Hit a plate milestone or a month-long streak and SetDeck celebrates with you.',
          },
          {
            icon: '💧',
            title: 'Hydration & Energy',
            description:
              'Log water and calories with a swipe and see today’s totals against your goals. Everything is written to Apple Health, and Home Screen widgets keep it at a glance.',
          },
          {
            icon: '⌚',
            title: 'Apple Watch',
            description:
              'See today’s routine on your wrist, log sets as you finish them, follow a guided rest timer, and keep the session on your watch face with a complication.',
          },
          {
            icon: '🗣️',
            title: 'Siri, Spotlight & Control Center',
            description:
              'Ask Siri "What’s my workout today?", start or stop a workout from Control Center, find any exercise in Spotlight, and sync privately with iCloud.',
          },
        ],
        footnote:
          'SetDeck is free on the App Store and available in English, Spanish, French (Canada), and Japanese. Some features require iOS 26 and iPadOS 26; on-device muscle group suggestions require Apple Intelligence.',
      }}
      jsonLd={{
        name: 'SetDeck',
        applicationCategory: 'HealthApplication',
        operatingSystem: 'iOS, iPadOS, watchOS, visionOS',
        inLanguage: ['en', 'es', 'fr-CA', 'ja'],
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        url: APP_STORE_URL,
        description:
          'SetDeck is a strength training companion: plan a weekly routine, log every set, track stats and achievements, and keep hydration and calories in view.',
      }}
    />
  );
}
