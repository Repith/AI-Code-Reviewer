import { useState } from 'react';
import clsx from 'clsx';

interface CopyButtonProps {
  textToCopy: string;
  className?: string;
  disabled?: boolean;
}

export default function CopyButton({ textToCopy, className, disabled = false }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (disabled) return;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      disabled={disabled}
      className={clsx(
        'p-1 rounded text-xs',
        copied ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200',
        'hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}