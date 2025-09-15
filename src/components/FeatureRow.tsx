// src/components/FeatureRow.tsx
import clsx from 'clsx';

export interface FeatureRowProps {
  /** Feature heading. */
  title: string;
  /** One- or two-sentence description. */
  description: string;
  /** Corner icon (SVG / PNG path). */
  iconSrc: string | null;
  /** Screenshot / mock-up beside the text box. */
  screenshotSrc: string;
  /** If true, puts text on the right and screenshot on the left (mirrors layout). */
  reverse?: boolean;
}

/**
 * Marketing-style feature row:
 * – Rounded white text box with drop-shadow and an overlapping icon.
 * – Screenshot image alongside.
 * – `reverse` prop swaps the order on ≥md screens.
 */
export default function FeatureRow({
  title,
  description,
  iconSrc = null,
  screenshotSrc,
  reverse = false,
}: FeatureRowProps) {
  return (
    <section
      className={clsx(
        'mx-auto my-12 max-w-6xl px-4 flex flex-col md:flex-row items-center gap-10',
        reverse && 'md:flex-row-reverse'
      )}
    >
      {/* Text box */}
      <div className="relative flex-1 min-w-[220px] max-w-lg rounded-3xl bg-white px-8 py-10 shadow-lg">
        {iconSrc !== null && (
          <img
            src={iconSrc}
            alt=""
            className="absolute top-0 left-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 object-contain"
          />
        )}

        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <p className="mt-3 leading-relaxed text-gray-700">{description}</p>
      </div>

      {/* Screenshot */}
      <img
        src={screenshotSrc}
        alt={title}
        className="w-48 md:w-72 flex-shrink-0 drop-shadow-xl rotate-3 md:rotate-2"
      />
    </section>
  );
}