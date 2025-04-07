import { motion } from 'framer-motion';
import clsx from 'clsx';

interface ReviewCardPreviewProps {
  code: string;
  theme: string;
}

export const ReviewCardPreview = ({ code, theme }: ReviewCardPreviewProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className={clsx(
      'p-4 h-[140px] overflow-hidden relative',
      theme === 'light' ? 'text-slate-700' : 'text-slate-300'
    )}
  >
    <p className="mb-2 font-medium">Code snippet:</p>
    <pre
      className={clsx(
        'text-xs overflow-hidden',
        theme === 'light' ? 'text-slate-600' : 'text-slate-400'
      )}
    >
      {code.slice(0, 150)}...
    </pre>
    <div
      className={clsx(
        'absolute bottom-0 left-0 right-0 h-12',
        'bg-gradient-to-t',
        theme === 'light'
          ? 'from-white to-transparent'
          : 'from-slate-900 to-transparent'
      )}
    />
  </motion.div>
);

export default ReviewCardPreview;