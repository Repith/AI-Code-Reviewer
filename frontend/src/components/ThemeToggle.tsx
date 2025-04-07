import { useTheme } from '@/contexts/ThemeContext';
import { Icons } from '@/styles/icons/Icon';
import clsx from 'clsx';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={clsx(
        'p-2 rounded-full',
        theme === 'light'
          ? 'text-purple-800 hover:bg-purple-100'
          : 'text-purple-200 hover:bg-purple-800/30',
        'transition-colors duration-200',
        'focus:outline-none focus:ring-2',
        theme === 'light' ? 'focus:ring-purple-500/50' : 'focus:ring-purple-400/50'
      )}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <Icons name={theme === 'dark' ? 'sun' : 'moon'} className="w-5 h-5" />
    </button>
  );
}
