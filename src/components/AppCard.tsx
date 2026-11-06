import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { SiteApp } from '../data/apps';
import { isPromoActive } from '../data/apps';
import { appStoreLink, siteChannel } from '../utils/appStore';
import { hexToRgbTriple, trackLiquidGlassCursor } from '../utils/liquidGlass';
import AppStoreBadge from './AppStoreBadge';

interface AppCardProps {
  app: SiteApp;
  index?: number;
  /** Page the card is rendered on, for the App Store `ct` channel. */
  channel?: string;
}

/** Home-page product card: icon, one-sentence job, price, platforms, store badge. */
export default function AppCard({ app, index = 0, channel = 'home' }: AppCardProps) {
  const accentRgb = hexToRgbTriple(app.accent);
  const style: CSSProperties = { borderTop: `2px solid ${app.accent}` };
  if (accentRgb) (style as Record<string, string>)['--lg-accent'] = accentRgb;
  const promoLive = isPromoActive(app.promo);

  return (
    <motion.article
      onMouseMove={trackLiquidGlassCursor}
      className="group flex flex-col h-full rounded-3xl liquid-glass liquid-glass-card p-6"
      style={style}
      initial={{ y: 16, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
      aria-labelledby={`app-${app.slug}`}
    >
      <div className="flex items-start gap-4">
        <Link to={app.path} className="flex-shrink-0" aria-label={`${app.name} details`}>
          <img
            src={app.icon}
            alt=""
            width={72}
            height={72}
            loading="lazy"
            decoding="async"
            className="w-[72px] h-[72px] rounded-[1.1rem] shadow-md"
          />
        </Link>
        <div className="min-w-0">
          <h3 id={`app-${app.slug}`} className="text-xl font-bold text-gray-900 tracking-tight">
            <Link to={app.path} className="hover:underline underline-offset-4">
              {app.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm font-medium" style={{ color: app.accent }}>
            {promoLive && app.promo ? app.promo.label : app.price}
          </p>
        </div>
      </div>

      <p className="mt-4 text-gray-600 leading-relaxed">{app.job}</p>

      <ul className="mt-4 flex flex-wrap gap-1.5 list-none p-0" aria-label={`${app.name} platforms`}>
        {app.platforms.map((platform) => (
          <li key={platform} className="rounded-full bg-gray-100/80 px-2.5 py-0.5 text-xs font-medium text-gray-600">
            {platform}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6 flex flex-wrap items-center justify-between gap-3">
        <AppStoreBadge href={appStoreLink(app.appStoreUrl, siteChannel(channel))} appName={app.name} className="w-[180px]" />
        <Link
          to={app.path}
          className="inline-flex items-center gap-1 text-sm font-medium transition-colors"
          style={{ color: app.accent }}
        >
          Learn more
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
        </Link>
      </div>
    </motion.article>
  );
}
