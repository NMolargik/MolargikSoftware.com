import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import ScrollToTop from '../components/ScrollToTop';

import privacyHtml from '../assets/privacy.html?raw';

export default function Privacy() {
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

  // Strip the <style> tag from the Termly HTML — it applies globally and
  // conflicts with Tailwind styles / the rest of the page.
  const cleanHtml = useMemo(
    () => privacyHtml.replace(/<style[\s\S]*?<\/style>/gi, ''),
    [],
  );

  return (
    <>
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="pt-28 pb-12">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brandPurple/10 mb-6"
            >
              <Shield size={32} className="text-brandPurple" />
            </motion.div>
            <motion.h1
              className="text-headline text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Privacy Policy
            </motion.h1>
            <motion.p
              className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              This policy explains how Molargik Software LLC collects, uses, and protects your information.
            </motion.p>
          </div>
        </section>

        {/* Privacy Promise */}
        <section className="pb-8">
          <motion.div
            className="mx-auto max-w-4xl px-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="rounded-2xl bg-brandPurple/5 border border-brandPurple/10 px-6 py-5 text-center">
              <p className="text-gray-700 text-base leading-relaxed">
                Your privacy matters to us. Thus far, we do not collect, sell, or otherwise abuse your information in any of our apps. All data stays with you, on device, or privately in your iCloud account. Statistical data is collected, but unique contents or details are not visible to Molargik Software LLC.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Content */}
        <section className="pb-16">
          <motion.div
            className="mx-auto max-w-4xl px-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="rounded-3xl bg-white border border-gray-200 px-6 py-10 sm:px-10 shadow-sm">
              <div
                className="privacy-content prose max-w-none
                  [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-gray-900 [&_h1]:mb-2
                  [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h2]:mt-8 [&_h2]:mb-4
                  [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-gray-900 [&_h3]:mt-6 [&_h3]:mb-3
                  [&_p]:text-gray-700 [&_p]:leading-relaxed [&_p]:mb-4
                  [&_ul]:text-gray-700 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6
                  [&_li]:mb-2
                  [&_a]:text-brandPurple [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-brandPurple/80
                  [&_strong]:text-gray-900 [&_strong]:font-semibold
                  [&_em]:italic
                  [&_img]:hidden
                "
                dangerouslySetInnerHTML={{ __html: cleanHtml }}
              />
            </div>
          </motion.div>
        </section>
      </main>
      <ScrollToTop />
    </>
  );
}
