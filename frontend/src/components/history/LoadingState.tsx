import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useTheme } from '@/contexts/ThemeContext';
import { Icons } from '@/styles/icons/Icon';

export const LoadingState = () => {
  const { theme } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={clsx(
        'flex items-center justify-center min-h-[60vh]',
        theme === 'light' ? 'text-purple-800' : 'text-purple-200'
      )}
    >
      <div className="flex flex-col items-center">
        <Icons name="loading" className="w-10 h-10 animate-spin" />
        <motion.span
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-lg font-medium"
        >
          Loading your review history...
        </motion.span>
      </div>
    </motion.div>
  );
};

export default LoadingState;