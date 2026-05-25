import { useRef, type CSSProperties, type HTMLAttributes, type MouseEvent as ReactMouseEvent, type ReactNode } from 'react';
import { hexToRgbTriple, trackLiquidGlassCursor } from '../utils/liquidGlass';

export type LiquidGlassVariant = 'default' | 'pill' | 'card' | 'lens';

interface LiquidGlassProps extends HTMLAttributes<HTMLDivElement> {
  variant?: LiquidGlassVariant;
  interactive?: boolean;
  children?: ReactNode;
  /** Hex or rgb accent that tints the glass body. Maps to --lg-accent. */
  accentColor?: string;
  /** Angle in degrees of the implied light source (drives the secondary
   *  specular and the directional rim highlight). Defaults to 215deg. */
  lightAngle?: number;
}

const variantClass: Record<LiquidGlassVariant, string> = {
  default: '',
  pill: 'liquid-glass-pill',
  card: 'liquid-glass-card',
  lens: 'liquid-glass-lens',
};

/**
 * Wraps content in a Liquid Glass surface. Reads cursor position
 * and exposes it via --lg-mx / --lg-my so the specular sheen
 * defined in index.css can follow the pointer.
 *
 * `accentColor` tints the body via --lg-accent; `lightAngle`
 * rotates the directional rim and secondary reflection.
 */
export default function LiquidGlass({
  variant = 'default',
  interactive = false,
  className = '',
  onMouseMove,
  accentColor,
  lightAngle,
  style,
  children,
  ...rest
}: LiquidGlassProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    trackLiquidGlassCursor(event);
    onMouseMove?.(event);
  };

  const mergedStyle: CSSProperties = { ...style };
  if (accentColor) {
    const rgb = hexToRgbTriple(accentColor);
    if (rgb) (mergedStyle as Record<string, string>)['--lg-accent'] = rgb;
  }
  if (lightAngle !== undefined) {
    (mergedStyle as Record<string, string>)['--lg-light-angle'] = `${lightAngle}deg`;
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      style={mergedStyle}
      className={`liquid-glass ${variantClass[variant]} ${interactive ? 'liquid-glass-interactive' : ''} ${className}`.trim()}
      {...rest}
    >
      {children}
    </div>
  );
}
