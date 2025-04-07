import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useTheme } from '@/contexts/ThemeContext';

interface MobileNavLinkProps {
  to: string;
  onClick: () => void;
  children: React.ReactNode;
}

export default function MobileNavLink({ to, onClick, children }: MobileNavLinkProps) {
  const { theme } = useTheme();

  return (
    <Link
      to={to}
      className={clsx(
        'block px-3 py-2 rounded-md text-base font-medium',
        theme === 'light'
          ? 'text-purple-800 hover:bg-purple-100'
          : 'text-purple-200 hover:bg-purple-800/30',
        'transition-colors duration-200'
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}