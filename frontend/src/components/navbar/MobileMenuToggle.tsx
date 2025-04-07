import clsx from 'clsx';
import { useTheme } from '@/contexts/ThemeContext';
import { Icons } from '@/styles/icons/Icon';
import ThemeToggle from '../ThemeToggle';

interface MobileMenuToggleProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

export default function MobileMenuToggle({ isMenuOpen, setIsMenuOpen }: MobileMenuToggleProps) {
  const { theme } = useTheme();

  return (
    <div className="flex md:hidden">
      <ThemeToggle />
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={clsx(
          'ml-2 p-2 rounded-md',
          theme === 'light'
            ? 'text-purple-800 hover:bg-purple-100'
            : 'text-purple-200 hover:bg-purple-800/30',
          'transition-colors duration-200'
        )}
        aria-expanded={isMenuOpen}
      >
        <span className="sr-only">Open main menu</span>
        <Icons name={isMenuOpen ? 'close' : 'menu'} className="w-6 h-6" />
      </button>
    </div>
  );
}