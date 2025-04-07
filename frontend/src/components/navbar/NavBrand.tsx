import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useTheme } from '@/contexts/ThemeContext';

export default function NavBrand() {
  const { theme } = useTheme();

  return (
    <div className="flex-shrink-0">
      <Link
        to="/"
        className={clsx(
          'text-xl font-bold',
          theme === 'light'
            ? 'bg-gradient-to-r from-purple-700 to-violet-600 bg-clip-text text-transparent'
            : 'bg-gradient-to-r from-purple-400 to-violet-300 bg-clip-text text-transparent',
          'hover:from-purple-600 hover:to-violet-500 transition-all duration-300'
        )}
      >
        AI Code Reviewer
      </Link>
    </div>
  );
}