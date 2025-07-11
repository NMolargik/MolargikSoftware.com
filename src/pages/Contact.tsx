// src/pages/Contact.tsx
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;

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
    <section className="mx-auto max-w-2xl px-6 py-16">
      <h2 className="mb-8 text-4xl font-extrabold tracking-tight">Let’s Connect</h2>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="space-y-6 rounded-3xl bg-white/10 p-8 backdrop-blur"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <input
            name="name"
            className="w-full rounded-md bg-white/20 p-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-brandPurple"
            placeholder="Your name"
            required
          />
          <input
            name="email"
            type="email"
            className="w-full rounded-md bg-white/20 p-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-brandPurple"
            placeholder="Email address"
            required
          />
        </div>

        <textarea
          name="message"
          rows={6}
          className="w-full rounded-md bg-white/20 p-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-brandPurple"
          placeholder="How can I help?"
          required
        />

        <input type="hidden" name="X-Priority" value="1 (Highest)" />

        <button
          type="submit"
          className="inline-block rounded-md bg-brandPurple px-8 py-3 text-base font-semibold text-white transition hover:opacity-90"
          disabled={state === 'sending'}
        >
          {state === 'sending' ? 'Sending…' : 'Send Message'}
        </button>
        {state === 'sent' && (
          <p className="text-green-500">Message sent! I’ll reply soon.</p>
        )}
        {state === 'error' && (
          <p className="text-red-500">Oops—something went wrong. Try again later.</p>
        )}
      </form>
    </section>
  );
}