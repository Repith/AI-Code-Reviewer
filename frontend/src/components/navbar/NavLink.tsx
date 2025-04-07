import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useTheme } from '@/contexts/ThemeContext';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  isButton?: boolean;
}

export default function NavLink({ to, children, isButton = false }: NavLinkProps) {
  const { theme } = useTheme();

  return (
    <Link
      to={to}
      className={clsx(
        isButton
          ? [
              'px-4 py-2 rounded-full',
              'bg-gradient-to-r from-purple-700 to-violet-600',
              'hover:from-purple-600 hover:to-violet-500',
              'text-white font-medium',
              'shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40',
              'transform hover:-translate-y-0.5',
              'transition-all duration-200',
              'border border-purple-500/20',
            ]
          : [
              theme === 'light'
                ? 'text-purple-800 hover:text-purple-600'
                : 'text-purple-200 hover:text-purple-100',
              'font-medium',
              'transition-colors duration-200',
            ]
      )}
    >
      {children}
    </Link>
  );
}