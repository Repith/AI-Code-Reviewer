import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useTheme } from '@/contexts/ThemeContext';
import { Icons } from '@/styles/icons/Icon';

export const EmptyHistoryState = () => {
  const { theme } = useTheme();
  
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={clsx(
        'p-8 text-center rounded-xl shadow-lg',
        theme === 'light'
          ? 'bg-white/90 shadow-purple-200/50 border border-purple-100'
          : 'bg-slate-900/90 shadow-purple-900/20 border border-purple-800/30'
      )}
    >
      <Icons
        name="empty"
        className={clsx(
          'w-16 h-16 mx-auto mb-4',
          theme === 'light' ? 'text-purple-400' : 'text-purple-500'
        )}
      />
      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-lg"
      >
        You haven't submitted any code for review yet.
      </motion.p>
      <motion.a
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        href="/review"
        className={clsx(
          'inline-block px-6 py-2 mt-6 font-medium rounded-full',
          'transition-all duration-200',
          'bg-gradient-to-r from-purple-700 to-violet-600 text-white',
          'shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40'
        )}
      >
        Submit Your First Review
      </motion.a>
    </motion.div>
  );
};

export default EmptyHistoryState;