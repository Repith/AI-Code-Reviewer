import { useTheme } from '@/contexts/ThemeContext';
import { Icons, IconName } from '@/styles/icons/Icon';
import clsx from 'clsx';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const getIconName = (): IconName => (theme === 'light' ? 'sun' : 'moon');

  return (
    <button
      onClick={toggleTheme}
      className={clsx(
        'p-1.5 rounded-full transition-colors',
        'bg-white/90 dark:bg-slate-800/90',
        'text-amber-500 dark:text-indigo-400',
        'hover:bg-white hover:shadow-sm dark:hover:bg-slate-700',
        'ring-1 ring-slate-200 dark:ring-slate-700'
      )}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <Icons name={getIconName()} className="w-4 h-4" />
    </button>
  );
}
