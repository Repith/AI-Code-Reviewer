import { useTheme } from '@/contexts/ThemeContext';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

export default function HeroSection() {
  const { theme } = useTheme();

  return (
    <section className="container px-4 pt-16 pb-24 mx-auto sm:px-6 lg:px-8 lg:pt-24 lg:pb-32">
      <div className="flex flex-col items-center text-center">
        <h1
          className={clsx(
            'text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6',
            theme === 'light'
              ? 'bg-gradient-to-r from-purple-700 via-violet-600 to-indigo-700 bg-clip-text text-transparent'
              : 'bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-400 bg-clip-text text-transparent'
          )}
        >
          AI-Powered Code Reviews
        </h1>

        <p
          className={clsx(
            'max-w-2xl mx-auto text-xl sm:text-2xl mb-8',
            theme === 'light' ? 'text-slate-700' : 'text-slate-300'
          )}
        >
          Get instant, intelligent feedback on your code from our advanced AI assistant.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
          <Link
            to="/review"
            className={clsx(
              'px-8 py-3 text-lg font-medium rounded-full',
              'bg-gradient-to-r from-purple-700 to-violet-600',
              'hover:from-purple-600 hover:to-violet-500',
              'text-white',
              'shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40',
              'transform hover:-translate-y-0.5',
              'transition-all duration-200',
              'border border-purple-500/20'
            )}
          >
            Try Code Review
          </Link>

          <Link
            to="/register"
            className={clsx(
              'px-8 py-3 text-lg font-medium rounded-full',
              'border',
              theme === 'light'
                ? 'border-purple-300 text-purple-700 hover:bg-purple-50'
                : 'border-purple-700 text-purple-300 hover:bg-purple-900/30',
              'transform hover:-translate-y-0.5',
              'transition-all duration-200'
            )}
          >
            Sign Up Free
          </Link>
        </div>
      </div>
    </section>
  );
}
