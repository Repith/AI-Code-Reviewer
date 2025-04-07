import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useTheme } from '@/contexts/ThemeContext';
import CodeEditor from '../code/CodeEditor';
import CodeFeedback from '../code/CodeFeedback';
import { Icons } from '@/styles/icons/Icon';
import type { ReviewHistory } from '../../services/review.service';

interface ExpandedReviewContentProps {
  review: ReviewHistory;
  onClose: () => void;
}

export const ExpandedReviewContent = ({ review, onClose }: ExpandedReviewContentProps) => {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={clsx(
          'w-full max-w-6xl h-[95vh] rounded-xl overflow-hidden',
          'shadow-2xl',
          theme === 'light'
            ? 'bg-white border border-purple-100'
            : 'bg-slate-900 border border-purple-900/30'
        )}
        onClick={e => e.stopPropagation()}
      >
        <div
          className={clsx(
            'flex items-center justify-between p-4',
            'border-b',
            theme === 'light' ? 'border-purple-100' : 'border-purple-900/30'
          )}
        >
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold">{review.language} review</h3>
            <span className="text-sm font-light">
              {new Date(review.createdAt).toLocaleString()}
            </span>
          </div>
          <button
            onClick={onClose}
            className={clsx(
              'p-2 rounded-full cursor-pointer',
              theme === 'light'
                ? 'hover:bg-purple-100 text-purple-700'
                : 'hover:bg-purple-800/30 text-purple-300'
            )}
          >
            <Icons name="close" className="w-5 h-5" />
          </button>
        </div>

        <div className="grid h-[calc(100%-60px)] grid-cols-1 md:grid-cols-2">
          <div className="h-full p-4 overflow-auto border-r border-purple-100 dark:border-purple-900/30">
            <CodeEditor
              initialCode={review.code}
              initialLanguage={review.language}
              disabled={true}
            />
          </div>
          <div className="h-full p-4 overflow-auto">
            <CodeFeedback feedbackContent={review.feedback} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ExpandedReviewContent;
