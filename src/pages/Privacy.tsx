import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import ScrollToTop from '../components/ScrollToTop';

/**
 * Loads the static HTML privacy policy that lives in src/assets/privacy.html.
 * The `?raw` suffix tells Vite to import the file as a plain string at build time.
 */
import privacyHtml from '../assets/privacy.html?raw';

const ACCENT_COLOR = '#6E60FF';

export default function Privacy() {
  // Ensure the page starts at the top when navigated to.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    document.title = 'Privacy Policy – Molargik Software LLC';
    const desc = 'Privacy policy for Molargik Software LLC apps and website.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = desc;
  }, []);

  return (
    <>
      <style>{`
        :root { --accent: ${ACCENT_COLOR}; }
        header nav a:hover, nav a:hover, .nav-link:hover {
          color: var(--accent) !important;
        }
        header nav a:focus-visible, nav a:focus-visible, .nav-link:focus-visible {
          outline: 2px solid color-mix(in oklab, var(--accent), white 25%);
          outline-offset: 2px;
          border-radius: 6px;
        }
      `}</style>
      <main className="min-h-screen">
        {/* Hero Section */}
        <section
          className="relative py-20 text-white overflow-hidden"
          style={{ backgroundColor: 'rgb(36,36,36)' }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#6E60FF] to-transparent opacity-60"
          />
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
            >
              <Shield size={40} className="text-[#6E60FF]" />
            </motion.div>
            <motion.h1
              className="text-4xl sm:text-5xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Privacy Policy
            </motion.h1>
            <motion.p
              className="mt-4 text-lg text-white/70 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              This policy explains how Molargik Software LLC collects, uses, and protects your information.
            </motion.p>
          </div>
        </section>

        {/* Privacy Promise Banner */}
        <section
          className="py-8"
          style={{ backgroundColor: 'rgb(36,36,36)' }}
        >
          <motion.div
            className="mx-auto max-w-4xl px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="rounded-2xl bg-gradient-to-r from-[#6E60FF]/20 to-[#8B7FFF]/20 border border-[#6E60FF]/30 px-6 py-5 text-center">
              <p className="text-white text-lg font-medium">
                Your privacy matters to us. Thus far, we do not collect, sell, or otherwise abuse your information in any of our apps. All data stays with you, on device, or privately in your iCloud account. Statistical data is collected, but unique contents or details are not visible to Molargik Software LLC.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Content Section */}
        <section
          className="pb-16"
          style={{ backgroundColor: 'rgb(36,36,36)' }}
        >
          <motion.div
            className="mx-auto max-w-4xl px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="relative overflow-hidden rounded-3xl bg-white px-6 py-10 sm:px-10 shadow-[0_18px_45px_rgba(0,0,0,0.3)]">
              {/* Inject the raw HTML with styled wrapper */}
              <div
                className="privacy-content prose max-w-none
                  [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-gray-900 [&_h1]:mb-2
                  [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h2]:mt-8 [&_h2]:mb-4
                  [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-gray-900 [&_h3]:mt-6 [&_h3]:mb-3
                  [&_p]:text-gray-700 [&_p]:leading-relaxed [&_p]:mb-4
                  [&_ul]:text-gray-700 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6
                  [&_li]:mb-2
                  [&_a]:text-[#6E60FF] [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[#5248CC]
                  [&_strong]:text-gray-900 [&_strong]:font-semibold
                  [&_em]:italic
                  [&_.termly-styles-root]:hidden
                  [&_img]:hidden
                "
                dangerouslySetInnerHTML={{ __html: privacyHtml }}
              />
            </div>
          </motion.div>
        </section>
      </main>
      <ScrollToTop accentColor={ACCENT_COLOR} />
    </>
  );
}