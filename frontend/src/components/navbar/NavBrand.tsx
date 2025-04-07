import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useTheme } from '@/contexts/ThemeContext';
import { Icons } from '@/styles/icons/Icon';

export default function NavBrand() {
  const { theme } = useTheme();

  return (
    <>
      <Link
        to="/"
        className={clsx(
          'flex items-center flex-shrink-0 gap-2',
          'text-xl font-bold font-mono tracking-tight',
          'transition-colors duration-300',
          theme === 'light'
            ? 'bg-gradient-to-r from-purple-700 to-violet-600 bg-clip-text text-transparent'
            : 'bg-gradient-to-r from-purple-400 to-violet-300 bg-clip-text text-transparent',
          'hover:from-purple-600 hover:to-violet-500 transition-all duration-300'
        )}
      >
        <Icons
          name="brainCircuit"
          className={clsx('w-6 h-6', theme === 'light' ? 'text-purple-700' : 'text-purple-400')}
        />
        &lt;AI Code Reviewer/&gt;
      </Link>
    </>
  );
}
