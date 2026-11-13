export type GuideBlock = string | { ul: string[] } | { ol: string[] } | { code: string };

export interface Guide {
  slug: string;
  group: 'tesla' | 'color';
  app: 'maestro' | 'opalite';
  og: string;
  short: string;
  title: string;
  h1: string;
  description: string;
  summary: string;
  intro: string[];
  sections: { h2: string; body: GuideBlock[] }[];
  steps?: { name: string; text: string }[];
  howTo?: { name: string };
  faq: { q: string; a: string }[];
  related: string[];
}

export const SITE_URL: string;
export const GUIDES_CHECKED: string;
export const GUIDES_CHECKED_ISO: string;
export const guideNotice: string;
export const guides: Guide[];
export function findGuide(slug: string): Guide | undefined;
export function guidePath(slug: string): string;
export function guideChannel(slug: string): string;
export function guideJsonLd(guide: Guide): Record<string, unknown>[];
export interface GuideApp {
  slug: string;
  heading: string;
  blurb: string;
  button: string;
  notice: string;
  checked: string;
}
export const guideApps: Record<'maestro' | 'opalite', GuideApp>;
export const guideGroups: { id: 'tesla' | 'color'; title: string; blurb: string }[];
export function guidesIn(group: 'tesla' | 'color'): Guide[];
