import { useRef, type HTMLAttributes, type MouseEvent as ReactMouseEvent, type ReactNode } from 'react';
import { trackLiquidGlassCursor } from '../utils/liquidGlass';

export type LiquidGlassVariant = 'default' | 'pill' | 'card' | 'lens';

interface LiquidGlassProps extends HTMLAttributes<HTMLDivElement> {
  variant?: LiquidGlassVariant;
  interactive?: boolean;
  children?: ReactNode;
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
 */
export default function LiquidGlass({
  variant = 'default',
  interactive = false,
  className = '',
  onMouseMove,
  children,
  ...rest
}: LiquidGlassProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    trackLiquidGlassCursor(event);
    onMouseMove?.(event);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`liquid-glass ${variantClass[variant]} ${interactive ? 'liquid-glass-interactive' : ''} ${className}`.trim()}
      {...rest}
    >
      {children}
    </div>
  );
}
