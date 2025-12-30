import { useEffect, type RefObject } from 'react';

/**
 * Hook to scroll carousel refs to the start position on mount.
 * Attempts immediately, on next frame, and after window load to cover image decode timing.
 */
export function useScrollToStart(
  desktopRef: RefObject<HTMLDivElement | null>,
  mobileRef: RefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    const scrollToStart = () => {
      if (desktopRef.current) {
        desktopRef.current.scrollTo({ left: 0, behavior: 'auto' });
      }
      if (mobileRef.current) {
        mobileRef.current.scrollTo({ left: 0, behavior: 'auto' });
      }
    };

    scrollToStart();
    requestAnimationFrame(scrollToStart);
    window.addEventListener('load', scrollToStart);

    return () => {
      window.removeEventListener('load', scrollToStart);
    };
  }, [desktopRef, mobileRef]);
}
