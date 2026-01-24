import React, { useEffect, useState, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

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
  altPrefix = 'Screenshot',
}) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxLoaded, setLightboxLoaded] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Open lightbox
  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxLoaded(false);
  }, []);

  // Close lightbox
  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    setLightboxLoaded(false);
  }, []);

  // Navigate to previous image
  const goToPrevious = useCallback(() => {
    if (lightboxIndex === null) return;
    const newIndex = lightboxIndex === 0 ? slides.length - 1 : lightboxIndex - 1;
    setLightboxIndex(newIndex);
    setLightboxLoaded(false);
  }, [lightboxIndex, slides.length]);

  // Navigate to next image
  const goToNext = useCallback(() => {
    if (lightboxIndex === null) return;
    const newIndex = lightboxIndex === slides.length - 1 ? 0 : lightboxIndex + 1;
    setLightboxIndex(newIndex);
    setLightboxLoaded(false);
  }, [lightboxIndex, slides.length]);

  // Handle keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    };

    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex, closeLightbox, goToPrevious, goToNext]);

  // Touch handlers for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;

    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50; // Minimum swipe distance

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swiped left -> next
        goToNext();
      } else {
        // Swiped right -> previous
        goToPrevious();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Handle backdrop click (close if clicking outside image)
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeLightbox();
    }
  };

  return (
    <>
      {/* Desktop & large screens: horizontally scrollable images */}
      <div className={`hidden md:block px-4 ${desktopWrapperClassName ?? ''}`}>
        <div
          ref={desktopRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-3 justify-center"
        >
          {slides.map((src, idx) => {
            const globalIndex = offset + idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => openLightbox(idx)}
                className="relative flex-none h-96 w-auto snap-start cursor-zoom-in focus:outline-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 rounded-lg p-0 m-0 bg-transparent border-none shadow-none"
                aria-label={`View ${altPrefix} screenshot ${idx + 1} fullscreen`}
              >
                {!loaded[globalIndex] && (
                  <div className="absolute inset-0 h-96 w-44 rounded-lg bg-neutral-800 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 animate-pulse" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <LoadingSpinner />
                    </div>
                  </div>
                )}
                <img
                  src={src}
                  alt={`${altPrefix} screenshot ${idx + 1}`}
                  width={1170}
                  height={2532}
                  loading="lazy"
                  className={`h-96 w-auto object-contain transition-opacity duration-300 rounded-lg ${
                    loaded[globalIndex] ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => markLoaded(globalIndex)}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Small screens: seamless horizontal banner */}
      <div className={`md:hidden mt-2 ${mobileWrapperClassName ?? ''}`}>
        <div
          ref={mobileRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-3 justify-center"
        >
          {slides.map((src, idx) => {
            const globalIndex = offset + idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => openLightbox(idx)}
                className="relative flex-none h-80 w-auto snap-start cursor-zoom-in focus:outline-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 rounded-lg p-0 m-0 bg-transparent border-none shadow-none"
                aria-label={`View ${altPrefix} screenshot ${idx + 1} fullscreen`}
              >
                {!loaded[globalIndex] && (
                  <div className="absolute inset-0 h-80 w-36 rounded-lg bg-neutral-800 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 animate-pulse" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <LoadingSpinner />
                    </div>
                  </div>
                )}
                <img
                  src={src}
                  alt={`${altPrefix} screenshot ${idx + 1}`}
                  width={1170}
                  height={2532}
                  loading="lazy"
                  className={`h-80 w-auto object-contain transition-opacity duration-300 rounded-lg ${
                    loaded[globalIndex] ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => markLoaded(globalIndex)}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${altPrefix} screenshot ${lightboxIndex + 1} of ${slides.length}`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={handleBackdropClick}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Close fullscreen view"
          >
            <X size={24} />
          </button>

          {/* Image counter */}
          <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium">
            {lightboxIndex + 1} / {slides.length}
          </div>

          {/* Previous button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-2 sm:left-4 z-10 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Previous screenshot"
          >
            <ChevronLeft size={24} className="sm:w-8 sm:h-8" />
          </button>

          {/* Next button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-2 sm:right-4 z-10 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Next screenshot"
          >
            <ChevronRight size={24} className="sm:w-8 sm:h-8" />
          </button>

          {/* Main image */}
          <div className="relative max-h-[85vh] max-w-[90vw] flex items-center justify-center">
            {!lightboxLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <LoadingSpinner size="lg" />
              </div>
            )}
            <img
              src={slides[lightboxIndex]}
              alt={`${altPrefix} screenshot ${lightboxIndex + 1}`}
              className={`max-h-[85vh] max-w-[90vw] w-auto h-auto object-contain transition-opacity duration-300 ${
                lightboxLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setLightboxLoaded(true)}
              draggable={false}
            />
          </div>

          {/* Keyboard hint (hidden on mobile) */}
          <div className="hidden sm:block absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 text-white/70 text-sm">
            Use <kbd className="px-1.5 py-0.5 mx-1 rounded bg-white/20 font-mono text-xs">←</kbd>
            <kbd className="px-1.5 py-0.5 mx-1 rounded bg-white/20 font-mono text-xs">→</kbd> to navigate,
            <kbd className="px-1.5 py-0.5 mx-1 rounded bg-white/20 font-mono text-xs">Esc</kbd> to close
          </div>
        </div>
      )}
    </>
  );
};

export default ScreensCarousel;
