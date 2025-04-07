import { useTheme } from '@/contexts/ThemeContext';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

export default function CtaSection() {
  const { theme } = useTheme();

  return (
    <section className={clsx('py-16', theme === 'light' ? 'bg-purple-100/70' : 'bg-slate-900/70')}>
      <div className="container px-4 mx-auto text-center sm:px-6 lg:px-8">
        <h2
          className={clsx(
            'text-3xl font-bold mb-6',
            theme === 'light' ? 'text-slate-800' : 'text-white'
          )}
        >
          Ready to improve your code quality?
        </h2>

        <p
          className={clsx(
            'max-w-2xl mx-auto text-xl mb-8',
            theme === 'light' ? 'text-slate-700' : 'text-slate-300'
          )}
        >
          Join thousands of developers who trust our AI to review their code.
        </p>

        <Link
          to="/review"
          className={clsx(
            'inline-flex items-center px-8 py-3 text-lg font-medium rounded-full',
            'bg-gradient-to-r from-purple-700 to-violet-600',
            'hover:from-purple-600 hover:to-violet-500',
            'text-white',
            'shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40',
            'transform hover:-translate-y-0.5',
            'transition-all duration-200'
          )}
        >
          <span>Start Reviewing Code</span>
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
