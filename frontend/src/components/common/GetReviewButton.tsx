import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

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
        'bg-gradient-to-r from-blue-600 to-indigo-600',
        'hover:from-blue-700 hover:to-indigo-700',
        'text-white text-xs shadow-md hover:shadow-lg',
        'transform hover:scale-105',
        'disabled:opacity-60 disabled:pointer-events-none',
        'transition-all duration-200',
        className
      )}
      {...props}
    >
      {isLoading ? loadingText : children}
    </button>
  );
}
