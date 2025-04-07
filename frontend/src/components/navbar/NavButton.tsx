import clsx from 'clsx';

interface NavButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export default function NavButton({ onClick, children }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'px-4 py-2 rounded-full',
        'bg-gradient-to-r from-purple-700 to-violet-600',
        'hover:from-purple-600 hover:to-violet-500',
        'text-white font-medium',
        'shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40',
        'transform hover:-translate-y-0.5',
        'transition-all duration-200',
        'border border-purple-500/20'
      )}
    >
      {children}
    </button>
  );
}