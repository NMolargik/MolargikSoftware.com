/**
 * Sign in with Apple button component
 * Uses official Apple styling guidelines
 */

import { Loader2 } from 'lucide-react';

interface AppleSignInButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  variant?: 'black' | 'white';
}

export default function AppleSignInButton({
  onClick,
  isLoading = false,
  variant = 'white',
}: AppleSignInButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(36,36,36)]';

  const variantClasses =
    variant === 'white'
      ? 'bg-white text-black hover:bg-white/90 focus-visible:ring-white'
      : 'bg-black text-white hover:bg-black/90 focus-visible:ring-black border border-white/20';

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`${baseClasses} ${variantClasses}`}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
        </svg>
      )}
      <span>Sign in with Apple</span>
    </button>
  );
}
