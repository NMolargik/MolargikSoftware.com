// src/pages/Contact.tsx
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import emailjs from '@emailjs/browser';
import ScrollToTop from '../components/ScrollToTop';

const ACCENT_COLOR = '#FF6C00';

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
      // Pretend to succeed to avoid giving feedback to bots.
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
      <section
        className="relative isolate overflow-hidden text-white min-h-screen"
        style={{ backgroundColor: 'rgb(36,36,36)' }}
      >
        {/* Decorative background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-brandOrange/15 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(40rem_20rem_at_50%_-5%,theme(colors.brandOrange/20)_0%,transparent_60%)]" />
        </div>

        <div className="mx-auto max-w-3xl px-6 py-20 sm:py-24 lg:py-28">
          <header className="mb-10 text-center text-white flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20"
            >
              <Mail size={40} className="text-[#FF6C00]" />
            </motion.div>
            <motion.p
              className="mt-4 mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-white/90 backdrop-blur"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-green-500" />
              Available for new projects
            </motion.p>
            <motion.h1
              className="mt-4 text-pretty text-4xl font-extrabold tracking-tight sm:text-5xl text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Let's Connect
            </motion.h1>
            <motion.p
              className="mx-auto mt-3 max-w-2xl text-balance text-base text-white/80"
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
          className="relative space-y-8 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_18px_45px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:p-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
          <input type="hidden" name="ts" value={String(Date.now())} />
          {/* Accent line at top */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#FF6C00] to-transparent opacity-80"
          />

          {/* Name & Email */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="group">
              <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-white/90">
                Your name
              </label>
              <input
                id="contact-name"
                name="name"
                className="w-full rounded-xl border border-white/10 bg-white/15 px-4 py-3 text-base text-white placeholder-white/60 shadow-inner outline-none transition focus:border-brandOrange/60 focus:bg-white/20 focus:ring-4 focus:ring-brandOrange/20"
                placeholder="Jane Doe"
                required
                autoComplete="name"
                disabled={state === 'sending'}
              />
            </div>

            <div className="group">
              <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-white/90">
                Email address
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                className="w-full rounded-xl border border-white/10 bg-white/15 px-4 py-3 text-base text-white placeholder-white/60 shadow-inner outline-none transition focus:border-brandOrange/60 focus:bg-white/20 focus:ring-4 focus:ring-brandOrange/20"
                placeholder="you@example.com"
                required
                autoComplete="email"
                disabled={state === 'sending'}
              />
            </div>
          </div>

          {/* Message */}
          <div className="group">
            <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-white/90">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={7}
              className="w-full resize-y rounded-xl border border-white/10 bg-white/15 px-4 py-3 text-base text-white placeholder-white/60 shadow-inner outline-none transition focus:border-brandOrange/60 focus:bg-white/20 focus:ring-4 focus:ring-brandOrange/20"
              placeholder="How can I help?"
              required
              disabled={state === 'sending'}
            />
            <p className="mt-2 text-xs text-white/60">
              I typically respond within 1–2 business days.
            </p>
          </div>

          <input type="hidden" name="X-Priority" value="1 (Highest)" />

          {/* Actions */}
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs text-white/60">
              By sending, you agree to be contacted about your inquiry.
            </p>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-tr from-brandOrange to-brandOrange/80 dark:from-brandOrange/90 dark:to-brandOrange px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brandOrange/25 transition active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
              disabled={state === 'sending'}
            >
              {state === 'sending' ? (
                <>
                  <svg
                    className="h-5 w-5 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                  <span role="status" aria-live="polite">Sending…</span>
                </>
              ) : (
                <>
                  Send Message
                </>
              )}
            </button>
          </div>

          {/* Status banners */}
          <div aria-live="polite" className="space-y-3">
            {state === 'sent' && (
              <p className="flex items-center gap-2 rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path fillRule="evenodd" d="M16.704 5.29a1 1 0 00-1.408-1.418L8 11.168 4.704 7.87A1 1 0 103.296 9.29l4 4a1 1 0 001.408 0l8-8z" clipRule="evenodd" />
                </svg>
                Message sent! I’ll reply soon.
              </p>
            )}
            {state === 'error' && (
              <p className="flex items-center gap-2 rounded-lg border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.721-1.36 3.486 0l6.518 11.585c.74 1.316-.213 2.966-1.743 2.966H3.482c-1.53 0-2.483-1.65-1.743-2.966L8.257 3.1zM11 14a1 1 0 10-2 0 1 1 0 002 0zm-1-2a1 1 0 01-1-1V8a1 1 0 112 0v3a1 1 0 01-1 1z" clipRule="evenodd" />
                </svg>
                Oops—something went wrong. Please try again.
              </p>
            )}
          </div>
        </motion.form>
      </div>
    </section>
    <ScrollToTop accentColor={ACCENT_COLOR} />
    </>
  );
}