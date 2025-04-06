import { useState } from 'react';
import clsx from 'clsx';

interface CopyButtonProps {
  textToCopy: string;
  disabled?: boolean;
  className?: string;
}

export default function CopyButton({
  textToCopy,
  disabled = false,
  className = '',
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!textToCopy || disabled) return;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <button
      onClick={handleCopy}
      disabled={!textToCopy || disabled}
      className={clsx(
        'text-xs px-2 py-1 rounded transition-colors duration-200 cursor-pointer',
        copied ? 'bg-green-600' : 'bg-zinc-800 hover:bg-zinc-700',
        'disabled:opacity-50 disabled:pointer-events-none',
        className
      )}
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}
