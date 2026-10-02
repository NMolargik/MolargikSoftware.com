import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AppShowcase from '../components/AppShowcase';
import { screensFromGlob } from '../utils/screens';
import icon from '../assets/opalite/icon.png';
import opaliteDemo from '../assets/opalite/opaliteWorkflowDemo.mp4';

// Official brand color: Opalite Lavender
const ACCENT_COLOR = '#CAC0E8';
const APP_STORE_URL = 'https://apps.apple.com/us/app/opalite-color-studio/id6755093664';

const screens = screensFromGlob(
  import.meta.glob('../assets/opalite/screens/*', { eager: true, import: 'default' })
);

/** Collapsible "Example Workflow" video shown under the screenshots. */
function WorkflowDemo() {
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggle = () => {
    setOpen((prev) => {
      if (prev) videoRef.current?.pause();
      return !prev;
    });
  };

  return (
    <div className="mt-12 px-4">
      <div className="mx-auto max-w-5xl">
        <button
          onClick={toggle}
          aria-expanded={open}
          className="w-full flex items-center justify-between gap-3 rounded-2xl bg-white dark:bg-[#0a0a0c] border border-gray-200 dark:border-gray-800 px-6 py-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="text-base font-medium text-gray-900 dark:text-white">Example Workflow</span>
          </div>
          <motion.svg
            className="w-5 h-5 text-gray-400 dark:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-4">
                <div className="relative rounded-2xl overflow-hidden shadow-lg">
                  <video ref={videoRef} src={opaliteDemo} controls playsInline className="w-full">
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Opalite() {
  return (
    <AppShowcase
      name="Opalite"
      heading="Opalite - Color Studio"
      tagline="Take control of your colors. The color toolkit designers, developers, and digital artists actually need."
      icon={icon}
      accentColor={ACCENT_COLOR}
      meta={{
        title: 'Opalite – Color Studio for Designers & Developers | Nick Molargik',
        description:
          'Pick colors from photos, check WCAG contrast, simulate color blindness, draw on a canvas, and export palettes to Procreate, SwiftUI, CSS, and Adobe — on iPhone, iPad, Mac, Apple Watch, Apple TV, and Vision Pro.',
      }}
      appStoreUrl={APP_STORE_URL}
      githubUrl="https://github.com/NMolargik/Opalite"
      webHref="/opalite-web"
      requirements={['iOS 18.4+', 'iPadOS 18.4+', 'macOS 15+', 'watchOS 10+', 'tvOS 18+', 'visionOS 26.2+']}
      screens={screens}
      screensClassName="bg-gradient-to-br from-blue-50 via-pink-50 to-purple-50"
      afterScreens={<WorkflowDemo />}
      about={{
        title: 'Opalite — The Ultimate Color Manager',
        intro:
          'Pick colors from photos, check WCAG contrast, simulate color blindness, and export palettes to Procreate, SwiftUI, CSS, and Adobe — all in one app. Opalite is the color toolkit designers, developers, and digital artists actually need, built for iPhone, iPad, Mac, Apple Watch, Apple TV, and Vision Pro.',
        sections: [
          {
            title: 'Pick Colors Six Ways',
            body: 'A grid picker with preset swatches, a spectrum slider for precise hues, RGB, HSL, and hex code input, Shuffle for instant inspiration, channel sliders for fine-tuning, and sampling from any image or your camera.',
          },
          {
            title: 'Organize Your Palette Library',
            body: 'Unlimited colors, free forever. Smart palettes with names, notes, and tags, drag-and-drop reordering, instant search across your entire library, and iCloud sync across iPhone, iPad, Mac, Apple Watch, Apple TV, and Vision Pro.',
          },
          {
            title: 'Design for Everyone',
            body: 'A WCAG contrast checker (AA & AAA), color blindness simulation for Protanopia, Deuteranopia, Tritanopia, and Achromatopsia, auto-generated harmonies — complementary, triadic, analogous, and more — and effortless, AI-powered color naming.',
          },
          {
            title: 'Join the Community',
            body: 'Share palettes with creators worldwide, get inspiration from the contributions of other users, and browse and save public contributions with Onyx.',
          },
          {
            title: 'Draw & Export',
            body: (
              <>
                <span className="text-brandPurple font-medium">Onyx</span> unlocks a full PencilKit canvas with Apple Pencil
                support and shape tools, unlimited saved canvases, and export everywhere: Procreate .swatches, Adobe ASE for
                Photoshop & Illustrator, SwiftUI and CSS for developers, GIMP/GPL palettes, and PDF portfolios.
              </>
            ),
          },
        ],
        features: [
          {
            icon: '🎨',
            title: 'Six Color Pickers',
            description:
              'Grid swatches, spectrum slider, Shuffle, channel sliders, direct code entry, and camera or photo sampling — pick colors however feels natural.',
          },
          {
            icon: '📁',
            title: 'Smart Palette Library',
            description:
              'Unlimited colors for free. Palettes with names, notes, and tags, drag-and-drop reordering, and instant search across everything.',
          },
          {
            icon: '♿',
            title: 'Accessibility Tools',
            description:
              'WCAG AA & AAA contrast checking, four kinds of color blindness simulation, and auto-generated harmonies so your designs work for everyone.',
          },
          {
            icon: '🌎',
            title: 'Community',
            description:
              'Share palettes with creators worldwide and browse public contributions for inspiration.',
          },
          {
            icon: '✏️',
            title: 'Canvas (Onyx)',
            description:
              'Apple Pencil and PencilKit support with squares, circles, lines, arrows, and custom shapes, plus unlimited saved canvases.',
          },
          {
            icon: '📤',
            title: 'Export Anywhere (Onyx)',
            description:
              'Procreate .swatches, Adobe ASE, SwiftUI and CSS code, GIMP/GPL palettes, and PDF portfolios.',
          },
          {
            icon: '💎',
            title: 'Simple Pricing',
            description:
              'Free: unlimited colors, 5 palettes, all pickers, and the contrast checker. Onyx ($4.99/year or $19.99 lifetime): unlimited palettes, canvas, community downloads, and export.',
          },
        ],
        footnote:
          'Opalite is indie-made by Molargik Software LLC for iPhone, iPad, Mac, Apple Watch, Apple TV, and Vision Pro. AI-powered color naming requires Apple Intelligence.',
      }}
      jsonLd={{
        name: 'Opalite - Color Studio',
        applicationCategory: 'DesignApplication',
        operatingSystem: 'iOS, iPadOS, macOS, watchOS, tvOS, visionOS',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        url: APP_STORE_URL,
        description:
          'Opalite is the ultimate color manager for designers, developers, and digital artists. Pick colors, organize palettes, test accessibility, and export everywhere.',
      }}
    />
  );
}
