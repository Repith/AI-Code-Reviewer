import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { getReviewHistory } from '../services/review.service';
import type { ReviewHistory } from '../services/review.service';
import clsx from 'clsx';
import { CodeReviewProvider } from '../contexts/CodeReviewContext';
import { useTheme } from '@/contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingState from '@/components/history/LoadingState';
import EmptyHistoryState from '@/components/history/EmptyHistoryState';
import ReviewCard from '@/components/history/ReviewCard';

export default function HistoryPage() {
  const { theme } = useTheme();
  const [history, setHistory] = useState<ReviewHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getReviewHistory();
        setHistory(data);
      } catch (error) {
        toast.error('Failed to load review history');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const toggleItem = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <CodeReviewProvider>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={clsx(
          'container px-4 py-8 mx-auto',
          theme === 'light' ? 'text-slate-800' : 'text-slate-200'
        )}
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={clsx(
            'mb-8 text-3xl font-bold text-center',
            theme === 'light'
              ? 'bg-gradient-to-r from-purple-700 via-violet-600 to-indigo-700 bg-clip-text text-transparent'
              : 'bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-400 bg-clip-text text-transparent'
          )}
        >
          Your Review History
        </motion.h1>

        {history.length === 0 ? (
          <EmptyHistoryState />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence>
              {history.map((review, index) => {
                const reviewId = review._id || review.reviewId;
                return (
                  <ReviewCard
                    key={reviewId}
                    review={review}
                    index={index}
                    isExpanded={expandedItem === reviewId}
                    toggleItem={toggleItem}
                  />
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </motion.div>
    </CodeReviewProvider>
  );
}
