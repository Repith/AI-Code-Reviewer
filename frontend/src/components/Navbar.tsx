import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ThemeToggle from './ThemeToggle';
import clsx from 'clsx';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav
      className={clsx(
        'sticky top-0 z-50 backdrop-blur-md',
        'bg-white/80 dark:bg-slate-900/80',
        'border-b border-gray-200 dark:border-slate-800',
        'shadow-sm transition-colors duration-200'
      )}
    >
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className={clsx(
                'text-xl font-bold',
                'bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent',
                'hover:from-blue-500 hover:to-indigo-500 transition-all duration-300'
              )}
            >
              AI Code Reviewer
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link
              to="/review"
              className={clsx(
                'text-gray-700 dark:text-gray-200',
                'hover:text-blue-600 dark:hover:text-blue-400',
                'transition-colors duration-200'
              )}
            >
              Review Code
            </Link>

            {user ? (
              <>
                <Link
                  to="/history"
                  className={clsx(
                    'text-gray-700 dark:text-gray-200',
                    'hover:text-blue-600 dark:hover:text-blue-400',
                    'transition-colors duration-200'
                  )}
                >
                  History
                </Link>
                <button
                  onClick={logout}
                  className={clsx(
                    'px-4 py-2 rounded-full',
                    'bg-gradient-to-r from-blue-600 to-indigo-600',
                    'hover:from-blue-700 hover:to-indigo-700',
                    'text-white font-medium',
                    'shadow-md hover:shadow-lg',
                    'transform hover:-translate-y-0.5',
                    'transition-all duration-200'
                  )}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={clsx(
                    'text-gray-700 dark:text-gray-200',
                    'hover:text-blue-600 dark:hover:text-blue-400',
                    'transition-colors duration-200'
                  )}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={clsx(
                    'px-4 py-2 rounded-full',
                    'bg-gradient-to-r from-blue-600 to-indigo-600',
                    'hover:from-blue-700 hover:to-indigo-700',
                    'text-white font-medium',
                    'shadow-md hover:shadow-lg',
                    'transform hover:-translate-y-0.5',
                    'transition-all duration-200'
                  )}
                >
                  Register
                </Link>
              </>
            )}
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={clsx(
                'ml-2 p-2 rounded-md',
                'text-gray-700 dark:text-gray-200',
                'hover:bg-gray-100 dark:hover:bg-slate-800',
                'transition-colors duration-200'
              )}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div
          className={clsx(
            'px-2 pt-2 pb-3 space-y-1 sm:px-3',
            'bg-white dark:bg-slate-900',
            'border-b border-gray-200 dark:border-slate-800'
          )}
        >
          <Link
            to="/review"
            className={clsx(
              'block px-3 py-2 rounded-md text-base font-medium',
              'text-gray-700 dark:text-gray-200',
              'hover:bg-gray-100 dark:hover:bg-slate-800',
              'transition-colors duration-200'
            )}
            onClick={() => setIsMenuOpen(false)}
          >
            Review Code
          </Link>

          {user ? (
            <>
              <Link
                to="/history"
                className={clsx(
                  'block px-3 py-2 rounded-md text-base font-medium',
                  'text-gray-700 dark:text-gray-200',
                  'hover:bg-gray-100 dark:hover:bg-slate-800',
                  'transition-colors duration-200'
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                History
              </Link>
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className={clsx(
                  'w-full text-left',
                  'block px-3 py-2 rounded-md text-base font-medium',
                  'text-gray-700 dark:text-gray-200',
                  'hover:bg-gray-100 dark:hover:bg-slate-800',
                  'transition-colors duration-200'
                )}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={clsx(
                  'block px-3 py-2 rounded-md text-base font-medium',
                  'text-gray-700 dark:text-gray-200',
                  'hover:bg-gray-100 dark:hover:bg-slate-800',
                  'transition-colors duration-200'
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={clsx(
                  'block px-3 py-2 rounded-md text-base font-medium',
                  'text-gray-700 dark:text-gray-200',
                  'hover:bg-gray-100 dark:hover:bg-slate-800',
                  'transition-colors duration-200'
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
