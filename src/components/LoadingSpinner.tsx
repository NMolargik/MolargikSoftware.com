interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-10 w-10',
};

export default function LoadingSpinner({ size = 'md' }: LoadingSpinnerProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className={`${sizeClasses[size]} rounded-full border-2 border-black/20 dark:border-white/30 border-t-black/60 dark:border-t-white animate-spin`}
      />
    </div>
  );
}
