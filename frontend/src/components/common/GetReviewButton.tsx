import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface GetReviewButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  className?: string;
}

export default function GetReviewButton({
  children,
  isLoading,
  loadingText = 'Loading...',
  className,
  ...props
}: GetReviewButtonProps) {
  return (
    <button
      type="button"
      disabled={isLoading || props.disabled}
      className={clsx(
        'px-4 py-2 rounded font-medium cursor-pointer',
        'bg-gradient-to-r from-purple-700 to-violet-600',
        'hover:from-purple-600 hover:to-violet-500',
        'text-white text-xs',
        'shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40',
        'transform hover:scale-105',
        'disabled:opacity-60 disabled:pointer-events-none',
        'transition-all duration-200',
        'border border-purple-500/20',
        className
      )}
      {...props}
    >
      {isLoading ? loadingText : children}
    </button>
  );
}
