import AppShowcase from '../components/AppShowcase';
import { screensFromGlob } from '../utils/screens';
import icon from '../assets/waffle/icon.png';

// Official brand color: Waffle Secondary
const ACCENT_COLOR = '#DFA656';
const APP_STORE_URL = 'https://apps.apple.com/us/app/waffle-browser/id6751783473';

const screens = screensFromGlob(
  import.meta.glob('../assets/waffle/screens/*', { eager: true, import: 'default' })
);

export default function Waffle() {
  return (
    <AppShowcase
      name="Waffle"
      tagline="Browse the web in a grid, not in tabs."
      icon={icon}
      accentColor={ACCENT_COLOR}
      meta={{
        title: 'Waffle – Grid Browser for iPad | Nick Molargik',
        description:
          'Waffle turns your iPad into a grid of live webpages. Browse sites side by side in a split-screen grid, save preset layouts, pop cells into their own windows, and sync with iCloud.',
      }}
      appStoreUrl={APP_STORE_URL}
      githubUrl="https://github.com/NMolargik/Waffle"
      requirements={['iPadOS 27+']}
      screens={screens}
      screensClassName="bg-surface dark:bg-[#0c0c10]"
      about={{
        title: 'Waffle — Your iPad, a Grid of Live Webpages',
        intro:
          'Tabs make you choose. Waffle doesn’t. Arrange multiple websites into a clean, customizable grid — up to 4×4 — and keep your mail, news, dashboards, and video on screen at the same time. No clutter. No app switching. Just a smarter workspace.',
        sections: [
          {
            title: 'How It Works',
            body: 'Every cell in the grid is a full browser. Tap a cell to select it — the address bar, back, forward, and reload all control that cell. Tap the address bar and it takes over the toolbar with the full address selected and ready to replace, so you can type a URL or search right away. Resize your grid with a tap: add or remove rows and columns anytime.',
          },
          {
            title: 'Built for iPad',
            body: 'A clean, native iPadOS interface with full hardware keyboard support, drag-and-drop bookmarks from the sidebar onto any cell, Handoff to your other devices, and Siri, Shortcuts, and Spotlight integration so presets and bookmarks open from anywhere. Bookmarks and presets sync across your devices with iCloud.',
          },
          {
            title: 'Perfect For',
            body: 'Students juggling research, notes, and lectures. Traders and analysts watching live data. Streamers tracking chat, feeds, and tools. Sports fans following every game at once. Anyone who wants a tidy, efficient iPad workspace.',
          },
          {
            title: 'Go Deluxe with Syrup',
            body: 'Waffle is free to use in a 2×2 grid. A one-time Syrup purchase — no subscription — unlocks everything else: grids up to 4×4, rearranging, pop-out windows, fullscreen focus, and saved Presets. Family Sharing included, so one purchase covers your whole family.',
          },
        ],
        features: [
          {
            icon: '🔳',
            title: 'Adjustable Grid',
            description:
              'Add or remove rows and columns with a tap to build the perfect grid for your workflow — up to 4×4 live webpages on screen at once.',
          },
          {
            icon: '🔀',
            title: 'Rearrange on the Fly',
            description:
              'Drag cells into a new order or tap two cells to swap them, without reloading a thing.',
          },
          {
            icon: '🪟',
            title: 'Pop-Out Windows',
            description:
              'Detach any grid cell into its own window using iPadOS multi-window, then pop it right back into the grid when you’re done.',
          },
          {
            icon: '⤢',
            title: 'Fullscreen Focus',
            description:
              'Bring any site front and center with a tap, then drop it back into the grid when you’re ready to multitask again.',
          },
          {
            icon: '⭐️',
            title: 'Presets',
            description:
              'Save an entire grid — size and every page in it — as a Preset and bring it back in one tap. A morning news grid, a work grid, a game-day grid.',
          },
          {
            icon: '☁️',
            title: 'iCloud Sync',
            description:
              'Bookmarks and Presets sync securely across your iPads with CloudKit, so your favorite setups are always right where you left them.',
          },
        ],
        footnote:
          'Waffle is free to download for iPads running iPadOS 27 or later, and is available in English, Spanish, French (Canada), and Japanese. Syrup is a one-time purchase with Family Sharing — no subscription.',
      }}
      jsonLd={{
        name: 'Waffle Browser',
        applicationCategory: 'BrowserApplication',
        operatingSystem: 'iPadOS',
        inLanguage: ['en', 'es', 'fr-CA', 'ja'],
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        url: APP_STORE_URL,
      }}
    />
  );
}
