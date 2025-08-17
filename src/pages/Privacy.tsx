import { useEffect } from 'react';

/**
 * Loads the static HTML privacy policy that lives in src/assets/privacy.html.
 * The `?raw` suffix tells Vite to import the file as a plain string at build time.
 */
import privacyHtml from '../assets/privacy.html?raw';

export default function Privacy() {
  // Ensure the page starts at the top when navigated to.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Inject the raw HTML */}
      <div
        className="mx-auto max-w-4xl px-4 py-10"
        dangerouslySetInnerHTML={{ __html: privacyHtml }}
      />
    </main>
  );
}