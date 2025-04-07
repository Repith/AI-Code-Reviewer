import clsx from 'clsx';
import { useTheme } from '@/contexts/ThemeContext';

interface CodeLoaderProps {
  message?: string;
  className?: string;
}

export default function CodeLoader({ message = 'Analyzing code...', className }: CodeLoaderProps) {
  const { theme } = useTheme();

  return (
    <div className={clsx('flex items-center space-x-2', className)}>
      <div className="flex space-x-1">
        <div
          className="w-2 h-2 rounded-full animate-pulse"
          style={{
            backgroundColor: theme === 'dark' ? '#60a5fa' : '#3b82f6',
            animationDuration: '1s',
          }}
        ></div>
        <div
          className="w-2 h-2 rounded-full animate-pulse"
          style={{
            backgroundColor: theme === 'dark' ? '#60a5fa' : '#3b82f6',
            animationDuration: '1s',
            animationDelay: '150ms',
          }}
        ></div>
        <div
          className="w-2 h-2 rounded-full animate-pulse"
          style={{
            backgroundColor: theme === 'dark' ? '#60a5fa' : '#3b82f6',
            animationDuration: '1s',
            animationDelay: '300ms',
          }}
        ></div>
      </div>
      <span
        className={clsx(
          'text-sm font-medium',
          theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'
        )}
      >
        {message}
      </span>
    </div>
  );
}
