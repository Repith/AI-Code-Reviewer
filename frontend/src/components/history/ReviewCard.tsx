import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { useTheme } from '@/contexts/ThemeContext';
import { Icons } from '@/styles/icons/Icon';
import type { ReviewHistory } from '../../services/review.service';
import ReviewCardPreview from './ReviewCardPreview';
import ExpandedReviewContent from './ExpandedReviewContent';

interface ReviewCardProps {
  review: ReviewHistory;
  index: number;
  isExpanded: boolean;
  toggleItem: (id: string) => void;
}

export const ReviewCard = ({ review, index, isExpanded, toggleItem }: ReviewCardProps) => {
  const { theme } = useTheme();
  const reviewId = review._id || review.reviewId;

  return (
    <>
      <motion.div
        key={reviewId}
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { delay: index * 0.1, duration: 0.3 },
        }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={clsx(
          'relative overflow-hidden rounded-xl h-[12rem]',
          theme === 'light'
            ? 'bg-white shadow-lg shadow-purple-100 border border-purple-50'
            : 'bg-slate-900 shadow-lg shadow-purple-900/10 border border-purple-900/30',
          'hover:scale-[1.02] transition-all duration-300 ease-in-out'
        )}
      >
        <motion.div
          onClick={() => toggleItem(reviewId)}
          whileHover={{
            backgroundColor:
              theme === 'light' ? 'rgba(243, 232, 255, 0.5)' : 'rgba(88, 28, 135, 0.2)',
          }}
          className={clsx(
            'flex items-center justify-between p-4 cursor-pointer',
            'border-b transition-colors',
            theme === 'light' ? 'border-purple-100' : 'border-purple-900/30'
          )}
        >
          <div className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className={clsx(
                'flex items-center justify-center w-10 h-10 mr-3 rounded-full',
                theme === 'light'
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-purple-900/50 text-purple-300'
              )}
            >
              <Icons name="code" className="w-5 h-5" />
            </motion.div>
            <div>
              <h3 className="font-semibold">{review.language}</h3>
              <p className={clsx('text-sm', theme === 'light' ? 'text-gray-500' : 'text-gray-400')}>
                {new Date(review.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={clsx(
              'p-2 rounded-full',
              theme === 'light'
                ? 'hover:bg-purple-100 text-purple-700'
                : 'hover:bg-purple-800/30 text-purple-300'
            )}
          >
            <Icons name="chevronDown" className="w-5 h-5" />
          </motion.div>
        </motion.div>

        <ReviewCardPreview code={review.code} theme={theme} />
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <ExpandedReviewContent review={review} onClose={() => toggleItem(reviewId)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default ReviewCard;
