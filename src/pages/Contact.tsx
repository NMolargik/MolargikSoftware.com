import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import emailjs from '@emailjs/browser';
import ScrollToTop from '../components/ScrollToTop';


export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  useEffect(() => {
    document.title = 'Contact – Nick Molargik | Molargik Software LLC';
    const desc = 'Get in touch with Nick Molargik for collaborations, questions, or project inquiries.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = desc;
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const website = String(formData.get('website') || '');
    const ts = Number(formData.get('ts') || 0);
    const tooFast = Date.now() - ts < 3000;

    if (website.trim().length > 0 || tooFast) {
      setState('sent');
      return;
    }

    setState('sending');

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE!,
        import.meta.env.VITE_EMAILJS_TEMPLATE!,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC!
      )
      .then(() => setState('sent'))
      .catch(() => setState('error'));
  }

  return (
    <>
      <section className="relative min-h-screen bg-white dark:bg-[#0a0a0c] pt-28 pb-16">
        <div className="mx-auto max-w-3xl px-6">
          <header className="mb-10 text-center flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brandOrange/10"
            >
              <Mail size={32} className="text-brandOrange" />
            </motion.div>

            <motion.p
              className="mt-4 mb-4 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium tracking-wide text-green-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-green-500" />
              Available for new projects
            </motion.p>

            <motion.h1
              className="mt-2 text-headline text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Let's Connect
            </motion.h1>

            <motion.p
              className="mx-auto mt-3 max-w-2xl text-balance text-base text-gray-500 dark:text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Have a question, an idea, or a project in mind? Send a message and I'll get back to you.
            </motion.p>
          </header>

          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="relative space-y-8 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0c] p-8 shadow-sm sm:p-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <input type="hidden" name="ts" value={String(Date.now())} />

            {/* Accent line */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-brandOrange to-transparent opacity-40"
            />

            {/* Name & Email */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Your name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0a0a0c] px-4 py-3 text-base text-gray-900 dark:text-white placeholder-gray-400 outline-none transition focus:border-brandOrange focus:ring-2 focus:ring-brandOrange/20"
                  placeholder="Jane Doe"
                  required
                  autoComplete="name"
                  disabled={state === 'sending'}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Email address
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0a0a0c] px-4 py-3 text-base text-gray-900 dark:text-white placeholder-gray-400 outline-none transition focus:border-brandOrange focus:ring-2 focus:ring-brandOrange/20"
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  disabled={state === 'sending'}
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={7}
                className="w-full resize-y rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0a0a0c] px-4 py-3 text-base text-gray-900 dark:text-white placeholder-gray-400 outline-none transition focus:border-brandOrange focus:ring-2 focus:ring-brandOrange/20"
                placeholder="How can I help?"
                required
                disabled={state === 'sending'}
              />
              <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                I typically respond within 1–2 business days.
              </p>
            </div>

            <input type="hidden" name="X-Priority" value="1 (Highest)" />

            {/* Actions */}
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs text-gray-400 dark:text-gray-500">
                By sending, you agree to be contacted about your inquiry.
              </p>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-brandOrange px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brandOrange/90 transition active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
                disabled={state === 'sending'}
              >
                {state === 'sending' ? (
                  <>
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                    <span role="status" aria-live="polite">Sending…</span>
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </div>

            {/* Status banners */}
            <div aria-live="polite" className="space-y-3">
              {state === 'sent' && (
                <p className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                    <path fillRule="evenodd" d="M16.704 5.29a1 1 0 00-1.408-1.418L8 11.168 4.704 7.87A1 1 0 103.296 9.29l4 4a1 1 0 001.408 0l8-8z" clipRule="evenodd" />
                  </svg>
                  Message sent! I'll reply soon.
                </p>
              )}
              {state === 'error' && (
                <p className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.721-1.36 3.486 0l6.518 11.585c.74 1.316-.213 2.966-1.743 2.966H3.482c-1.53 0-2.483-1.65-1.743-2.966L8.257 3.1zM11 14a1 1 0 10-2 0 1 1 0 002 0zm-1-2a1 1 0 01-1-1V8a1 1 0 112 0v3a1 1 0 01-1 1z" clipRule="evenodd" />
                  </svg>
                  Oops — something went wrong. Please try again.
                </p>
              )}
            </div>
          </motion.form>
        </div>
      </section>
      <ScrollToTop />
    </>
  );
}
