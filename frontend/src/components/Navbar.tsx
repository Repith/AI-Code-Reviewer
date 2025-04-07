import { useAuth } from '../contexts/AuthContext';
import clsx from 'clsx';
import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import NavBrand from './navbar/NavBrand';
import DesktopMenu from './navbar/DesktopMenu';
import MobileMenuToggle from './navbar/MobileMenuToggle';
import MobileMenu from './navbar/MobileMenu';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav
      className={clsx(
        'sticky top-0 z-50 backdrop-blur-md',
        theme === 'light'
          ? 'bg-white/80 border-b border-purple-200 shadow-md shadow-purple-100/50'
          : 'bg-slate-900/80 border-b border-purple-800/30 shadow-md shadow-purple-900/20',
        'transition-colors duration-200'
      )}
    >
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavBrand />
          <DesktopMenu user={user} logout={logout} />
          <MobileMenuToggle isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </div>
      </div>

      <MobileMenu
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        user={user}
        logout={logout}
      />
    </nav>
  );
}
