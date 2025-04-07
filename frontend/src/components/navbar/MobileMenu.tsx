import clsx from 'clsx';
import { useTheme } from '@/contexts/ThemeContext';
import MobileNavLink from './MobileNavLink';

interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  user: any;
  logout: () => void;
}

export default function MobileMenu({ isMenuOpen, setIsMenuOpen, user, logout }: MobileMenuProps) {
  const { theme } = useTheme();

  return (
    <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
      <div
        className={clsx(
          'px-2 pt-2 pb-3 space-y-1 sm:px-3',
          theme === 'light'
            ? 'bg-white/90 border-b border-purple-200'
            : 'bg-slate-900/90 border-b border-purple-800/30',
          'backdrop-blur-sm'
        )}
      >
        <MobileNavLink to="/review" onClick={() => setIsMenuOpen(false)}>
          Review Code
        </MobileNavLink>

        {user ? (
          <>
            <MobileNavLink to="/history" onClick={() => setIsMenuOpen(false)}>
              History
            </MobileNavLink>
            <button
              onClick={() => {
                logout();
                setIsMenuOpen(false);
              }}
              className={clsx(
                'w-full text-left',
                'block px-3 py-2 rounded-md text-base font-medium',
                theme === 'light'
                  ? 'text-purple-800 hover:bg-purple-100'
                  : 'text-purple-200 hover:bg-purple-800/30',
                'transition-colors duration-200'
              )}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <MobileNavLink to="/login" onClick={() => setIsMenuOpen(false)}>
              Login
            </MobileNavLink>
            <MobileNavLink to="/register" onClick={() => setIsMenuOpen(false)}>
              Register
            </MobileNavLink>
          </>
        )}
      </div>
    </div>
  );
}
