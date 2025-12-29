import { useEffect } from 'react';

interface PageMetaOptions {
  title: string;
  description: string;
  accentColor: string;
  preloadImage?: string;
}

/**
 * Hook to set page meta tags, accent color CSS variable, and optionally preload an image.
 */
export function usePageMeta({ title, description, accentColor, preloadImage }: PageMetaOptions) {
  useEffect(() => {
    document.title = title;

    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;

    document.documentElement.style.setProperty('--accent', accentColor);

    let link: HTMLLinkElement | null = null;
    if (preloadImage) {
      link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = preloadImage as string;
      document.head.appendChild(link);
    }

    return () => {
      if (link) {
        document.head.removeChild(link);
      }
    };
  }, [title, description, accentColor, preloadImage]);
}
