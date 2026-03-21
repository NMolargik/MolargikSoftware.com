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
        className={`${sizeClasses[size]} rounded-full border-2 border-gray-200 border-t-brandPurple animate-spin`}
      />
    </div>
  );
}
