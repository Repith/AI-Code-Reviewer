import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface HeroButtonsProps {
  theme: string;
}

export default function HeroButtons({ theme }: HeroButtonsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="flex flex-col gap-4 sm:flex-row sm:gap-6"
    >
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
    </motion.div>
  );
}
