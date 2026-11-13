import { Fragment, useEffect, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { BookOpen, ChevronRight } from 'lucide-react';
import LiquidGlass from '../components/LiquidGlass';
import GlassButton from '../components/GlassButton';
import ScrollToTop from '../components/ScrollToTop';
import NotFound from './NotFound';
import { usePageMeta } from '../hooks';
import { findRoute } from '../seo/routes.mjs';
import {
  findGuide,
  guidePath,
  guideChannel,
  guideJsonLd,
  guideNotice,
  GUIDES_CHECKED,
  type GuideBlock,
} from '../data/guides.mjs';
import { fadeUp } from '../utils/animations';

const ACCENT = '#2D7FF9';

/** Renders [label](/internal/path) markup from the guide data as router links. */
function Inline({ text }: { text: string }): ReactNode {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!m) return <Fragment key={i}>{part}</Fragment>;
    return (
      <Link key={i} to={m[2]} className="text-brandPurple underline underline-offset-4">
        {m[1]}
      </Link>
    );
  });
}

function BlockView({ block }: { block: GuideBlock }) {
  if (typeof block === 'string') {
    return (
      <p className="mt-3 text-base sm:text-lg leading-relaxed text-gray-600">
        <Inline text={block} />
      </p>
    );
  }
  if ('ul' in block) {
    return (
      <ul className="mt-3 list-disc space-y-2 pl-6 text-base sm:text-lg leading-relaxed text-gray-600 marker:text-gray-400">
        {block.ul.map((item) => (
          <li key={item}>
            <Inline text={item} />
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ol className="mt-3 list-decimal space-y-2 pl-6 text-base sm:text-lg leading-relaxed text-gray-600 marker:font-semibold marker:text-gray-500">
      {block.ol.map((item) => (
        <li key={item}>
          <Inline text={item} />
        </li>
      ))}
    </ol>
  );
}

/** Keeps the guide's JSON-LD in <head> (the build bakes the same objects into each route's HTML). */
function useJsonLd(objects: Record<string, unknown>[]) {
  const serialized = JSON.stringify(objects);
  useEffect(() => {
    document.head.querySelectorAll('script[data-route-jsonld]').forEach((el) => el.remove());
    const added = (JSON.parse(serialized) as Record<string, unknown>[]).map((obj) => {
      const el = document.createElement('script');
      el.type = 'application/ld+json';
      el.setAttribute('data-route-jsonld', '');
      el.textContent = JSON.stringify(obj);
      document.head.appendChild(el);
      return el;
    });
    return () => added.forEach((el) => el.remove());
  }, [serialized]);
}

export default function Guide() {
  const { slug = '' } = useParams();
  const guide = findGuide(slug);
  const route = findRoute(guidePath(slug));

  usePageMeta({
    title: route?.title ?? guide?.title ?? 'Guide',
    description: route?.description ?? guide?.description ?? '',
    image: route?.ogImage ?? '/og/maestro.png',
    path: guidePath(slug),
    accentColor: ACCENT,
    noindex: !guide,
  });
  useJsonLd(guide ? guideJsonLd(guide) : []);

  if (!guide) return <NotFound />;

  const related = guide.related.map((s) => findGuide(s)).filter((g) => g !== undefined);

  return (
    <>
      <article>
        <header className="pt-28 pb-6 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-gray-500">
              <Link to="/guides" className="hover:text-brandPurple underline-offset-4 hover:underline">
                Guides
              </Link>
              <ChevronRight size={14} aria-hidden="true" />
              <span className="text-gray-400">Tesla light shows</span>
            </nav>
            <h1 className="mt-4 text-headline text-gray-900">{guide.h1}</h1>
            {guide.intro.map((p) => (
              <p key={p} className="mt-4 text-lg leading-relaxed text-gray-600">
                <Inline text={p} />
              </p>
            ))}
            <p className="mt-4 text-sm text-gray-400">
              Checked against Tesla’s published light show guide on {GUIDES_CHECKED}.
            </p>
          </div>
        </header>

        <section className="pb-10 bg-white">
          <motion.div className="max-w-3xl mx-auto px-6" {...fadeUp}>
            <LiquidGlass variant="card" accentColor={ACCENT} className="rounded-3xl px-6 py-8 sm:px-10">
              {guide.sections.map((section, i) => (
                <section key={section.h2} className={i === 0 ? '' : 'mt-10'}>
                  <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">{section.h2}</h2>
                  {section.body.map((block, j) => (
                    <BlockView key={j} block={block} />
                  ))}
                </section>
              ))}

              {guide.steps && (
                <section className="mt-10">
                  <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">The short version</h2>
                  <ol className="mt-3 list-decimal space-y-2 pl-6 text-base sm:text-lg leading-relaxed text-gray-600 marker:font-semibold marker:text-gray-500">
                    {guide.steps.map((s) => (
                      <li key={s.name}>
                        <span className="font-semibold text-gray-900">{s.name}.</span> {s.text}
                      </li>
                    ))}
                  </ol>
                </section>
              )}
            </LiquidGlass>
          </motion.div>
        </section>

        <section className="pb-10 bg-white" aria-label="Frequently asked questions">
          <motion.div className="max-w-3xl mx-auto px-6" {...fadeUp}>
            <LiquidGlass variant="card" accentColor="#FF6C00" className="rounded-3xl px-6 py-6 sm:px-8">
              <h2 className="text-xl font-semibold text-gray-900">Quick answers</h2>
              <dl className="divide-y divide-gray-100">
                {guide.faq.map((f) => (
                  <div key={f.q} className="py-4">
                    <dt className="font-semibold text-gray-900">{f.q}</dt>
                    <dd className="mt-1 text-gray-600 leading-relaxed">
                      <Inline text={f.a} />
                    </dd>
                  </div>
                ))}
              </dl>
            </LiquidGlass>
          </motion.div>
        </section>

        <section className="pb-10 bg-white" aria-label="Try Maestro">
          <motion.div className="max-w-3xl mx-auto px-6" {...fadeUp}>
            <LiquidGlass variant="card" accentColor={ACCENT} className="relative overflow-hidden rounded-3xl px-6 py-10 sm:px-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-10 top-0 h-px opacity-70"
                style={{ background: `linear-gradient(to right, transparent, ${ACCENT}, transparent)` }}
              />
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div className="text-center sm:text-left">
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900">Want a show made from a song?</h2>
                  <p className="mt-2 text-gray-600">
                    Maestro turns any song into a Tesla light show on iPhone, iPad, or Mac. Free to try, no account.
                  </p>
                </div>
                <div className="flex justify-center flex-shrink-0">
                  <GlassButton to={`/go/maestro?ct=${guideChannel(guide.slug)}`} accentColor={ACCENT} size="md">
                    Get Maestro on the App Store
                  </GlassButton>
                </div>
              </div>
              <p className="mt-6 text-sm text-gray-500 italic">{guideNotice}</p>
            </LiquidGlass>
          </motion.div>
        </section>
      </article>

      <aside className="pb-20 bg-white" aria-label="More guides">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-xl font-semibold text-gray-900">
            <BookOpen size={20} className="inline -mt-1 mr-2 text-brandPurple" aria-hidden="true" />
            More guides
          </h2>
          <ul className="mt-3 list-none p-0 space-y-2">
            {related.map((r) => (
              <li key={r.slug}>
                <Link to={guidePath(r.slug)} className="text-brandPurple underline underline-offset-4">
                  {r.short}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/guides" className="text-gray-500 underline underline-offset-4 hover:text-brandPurple">
                All Tesla light show guides
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <ScrollToTop />
    </>
  );
}
