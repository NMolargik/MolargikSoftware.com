export type GuideBlock = string | { ul: string[] } | { ol: string[] };

export interface Guide {
  slug: string;
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
