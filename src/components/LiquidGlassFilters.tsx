/**
 * Inline SVG filter defs that drive the `.liquid-glass-*` CSS utilities and
 * the <LiquidGlass> wrapper.
 *
 * `backdrop-filter: url(#id)` is honored by Chromium today; Safari and Firefox
 * silently ignore the url() and fall through to the `blur() saturate()`
 * declared in index.css — that fallback still reads as glass, just without
 * the refractive lensing and chromatic dispersion.
 *
 * Dispersion: each filter splits the source into R/G/B channels via
 * feColorMatrix, displaces them at slightly different scales, and screen-
 * blends them back together. This produces the colored fringe at high-bend
 * regions that's a signature of Apple's Liquid Glass material — borrowed
 * from Andrew Prifer's Liquid DOM but implemented with stock SVG primitives
 * so it works without WebGPU.
 *
 * Mount this once near the root so every glass surface shares the same defs.
 */

type DispersionFilterProps = {
  id: string;
  baseFrequency: string;
  seed: number;
  blur: number;
  scaleRed: number;
  scaleGreen: number;
  scaleBlue: number;
};

function DispersionFilter({
  id,
  baseFrequency,
  seed,
  blur,
  scaleRed,
  scaleGreen,
  scaleBlue,
}: DispersionFilterProps) {
  return (
    <filter
      id={id}
      x="0%"
      y="0%"
      width="100%"
      height="100%"
      colorInterpolationFilters="sRGB"
    >
      <feTurbulence
        type="fractalNoise"
        baseFrequency={baseFrequency}
        numOctaves={2}
        seed={seed}
        result="noise"
      />
      <feGaussianBlur in="noise" stdDeviation={blur} result="softNoise" />

      <feColorMatrix
        in="SourceGraphic"
        type="matrix"
        values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
        result="redChannel"
      />
      <feDisplacementMap
        in="redChannel"
        in2="softNoise"
        scale={scaleRed}
        xChannelSelector="R"
        yChannelSelector="G"
        result="redDisp"
      />

      <feColorMatrix
        in="SourceGraphic"
        type="matrix"
        values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
        result="greenChannel"
      />
      <feDisplacementMap
        in="greenChannel"
        in2="softNoise"
        scale={scaleGreen}
        xChannelSelector="R"
        yChannelSelector="G"
        result="greenDisp"
      />

      <feColorMatrix
        in="SourceGraphic"
        type="matrix"
        values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
        result="blueChannel"
      />
      <feDisplacementMap
        in="blueChannel"
        in2="softNoise"
        scale={scaleBlue}
        xChannelSelector="R"
        yChannelSelector="G"
        result="blueDisp"
      />

      <feBlend in="redDisp" in2="greenDisp" mode="screen" result="rg" />
      <feBlend in="rg" in2="blueDisp" mode="screen" />
    </filter>
  );
}

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
        {/* Default surface: subtle low-amplitude turbulence with light
            dispersion — gives the material a faint refraction and the
            characteristic chromatic fringe at warps. */}
        <DispersionFilter
          id="liquid-glass-distortion"
          baseFrequency="0.012 0.018"
          seed={7}
          blur={1.2}
          scaleRed={16}
          scaleGreen={14}
          scaleBlue={12}
        />

        {/* Softer variant — pills / buttons. Less displacement so glyphs
            stay legible, dispersion still hints at the material. */}
        <DispersionFilter
          id="liquid-glass-distortion-soft"
          baseFrequency="0.02 0.03"
          seed={3}
          blur={0.8}
          scaleRed={7}
          scaleGreen={6}
          scaleBlue={5}
        />

        {/* Lens variant — hero / showcase. Heavy bend with pronounced
            dispersion; do not place small text directly on this. */}
        <DispersionFilter
          id="liquid-glass-lens"
          baseFrequency="0.008 0.012"
          seed={11}
          blur={2}
          scaleRed={32}
          scaleGreen={28}
          scaleBlue={24}
        />

        {/* Bezel variant — used on hover to bias displacement toward the
            edges, making the rim feel like a thicker pane. */}
        <DispersionFilter
          id="liquid-glass-bezel"
          baseFrequency="0.014 0.02"
          seed={5}
          blur={1.6}
          scaleRed={22}
          scaleGreen={18}
          scaleBlue={14}
        />
      </defs>
    </svg>
  );
}
