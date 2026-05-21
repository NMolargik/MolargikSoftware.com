/**
 * Inline SVG filter defs that drive the `.liquid-glass-*` CSS utilities and
 * the <LiquidGlass> wrapper.
 *
 * `backdrop-filter: url(#id)` is honored by Chromium today; Safari and Firefox
 * silently ignore the url() and fall through to the `blur() saturate()`
 * declared in index.css — that fallback still reads as glass, just without
 * the refractive lensing.
 *
 * Mount this once near the root so every glass surface shares the same defs.
 */
export default function LiquidGlassFilters() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}
    >
      <defs>
        {/* Default surface: subtle low-amplitude turbulence — gives the
            material a faint refraction without warping text underneath. */}
        <filter
          id="liquid-glass-distortion"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.018"
            numOctaves="2"
            seed="7"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="1.2" result="softNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softNoise"
            scale="14"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Softer variant — for small pill / button surfaces where heavy
            displacement would warp glyphs. */}
        <filter
          id="liquid-glass-distortion-soft"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02 0.03"
            numOctaves="2"
            seed="3"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="0.8" result="softNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softNoise"
            scale="6"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Lens variant — stronger displacement for hero / large surfaces.
            Apple's real Liquid Glass uses an SDF-based displacement; this
            turbulence approximation reads similarly at scale. */}
        <filter
          id="liquid-glass-lens"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.012"
            numOctaves="2"
            seed="11"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="2" result="softNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softNoise"
            scale="28"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
