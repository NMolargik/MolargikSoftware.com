import React from 'react';
import { useEffect } from 'react';

interface ScreensCarouselProps {
  slides: string[];
  loaded: Record<number, boolean>;
  offset: number;
  markLoaded: (i: number) => void;
  desktopRef?: React.RefObject<HTMLDivElement | null>;
  mobileRef?: React.RefObject<HTMLDivElement | null>;
  desktopWrapperClassName?: string;
  mobileWrapperClassName?: string;
  altPrefix?: string;
}

const ScreensCarousel: React.FC<ScreensCarouselProps> = ({
  slides,
  loaded,
  offset,
  markLoaded,
  desktopRef,
  mobileRef,
  desktopWrapperClassName,
  mobileWrapperClassName,
  altPrefix = 'SetDeck',
}) => {
  useEffect(() => {
    if (desktopRef?.current) {
      desktopRef.current.scrollTo({ left: 0, behavior: 'auto' });
    }
    if (mobileRef?.current) {
      mobileRef.current.scrollTo({ left: 0, behavior: 'auto' });
    }
  }, [slides]);
  return (
    <>
      {/* Desktop & large screens: horizontally scrollable images */}
      <div className={`hidden md:block px-4 ${desktopWrapperClassName ?? ''}`}>
        <div
          ref={desktopRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-3 justify-start md:justify-center"
        >
          {slides.map((src, idx) => {
            const globalIndex = offset + idx;
            return (
              <div key={idx} className="relative flex-none h-96 w-auto snap-start">
                {!loaded[globalIndex] && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-8 w-8 rounded-full border-2 border-black/20 dark:border-white/30 border-t-black/60 dark:border-t-white animate-spin" />
                  </div>
                )}
                <img
                  src={src}
                  alt={`${altPrefix} screenshot ${idx + 1}`}
                  width={1170}
                  height={2532}
                  loading="lazy"
                  className={`h-96 w-auto object-contain transition-opacity duration-300 ${
                    loaded[globalIndex] ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => markLoaded(globalIndex)}
                />
              </div>
            );
          })}
        </div>
      </div>
      {/* Small screens: seamless horizontal banner */}
      <div className={`md:hidden mt-2 ${mobileWrapperClassName ?? ''}`}>
        <div
          ref={mobileRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-3 justify-start md:justify-center"
        >
          {slides.map((src, idx) => {
            const globalIndex = offset + idx;
            return (
              <div key={idx} className="relative flex-none h-80 w-auto snap-start">
                {!loaded[globalIndex] && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-8 w-8 rounded-full border-2 border-black/20 dark:border-white/30 border-t-black/60 dark:border-t-white animate-spin" />
                  </div>
                )}
                <img
                  src={src}
                  alt={`${altPrefix} screenshot ${idx + 1}`}
                  width={1170}
                  height={2532}
                  loading="lazy"
                  className={`h-80 w-auto object-contain transition-opacity duration-300 ${
                    loaded[globalIndex] ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => markLoaded(globalIndex)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ScreensCarousel;
