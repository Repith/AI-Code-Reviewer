import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import clsx from 'clsx';
import { useTheme } from '@/contexts/ThemeContext';

export default function Layout() {
  const { theme } = useTheme();

  return (
    <div
      className={clsx(
        'flex flex-col min-h-screen',
        theme === 'light'
          ? 'bg-gradient-to-br from-white via-purple-50 to-white'
          : 'bg-gradient-to-br from-slate-950 via-purple-950/90 to-slate-950'
      )}
    >
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer
        className={clsx(
          'p-2 text-center transition-colors backdrop-blur-md',
          theme === 'light'
            ? 'bg-white/80 text-purple-800 border-t border-purple-200 shadow-inner shadow-purple-100/50'
            : 'bg-slate-900/80 text-purple-200 border-t border-purple-800/30 shadow-inner shadow-purple-900/20'
        )}
      >
        <span className="text-sm">
          © {new Date().getFullYear()} AI Code Reviewer -{' '}
          <a
            href="https://treelineinteractive.com"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              'font-medium hover:underline',
              theme === 'light'
                ? 'text-purple-700 hover:text-purple-600'
                : 'text-purple-300 hover:text-purple-200'
            )}
          >
            Treeline
          </a>{' '}
          recruitment task
        </span>
      </footer>
    </div>
  );
}
