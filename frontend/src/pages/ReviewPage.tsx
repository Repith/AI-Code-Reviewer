import { toast } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import CodeFeedback from '../components/code/CodeFeedback';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { CodeReviewProvider, useCodeReview } from '../contexts/CodeReviewContext';
import CodeEditor from '../components/code/CodeEditor';
import GetReviewButton from '@/components/common/GetReviewButton';
import { motion } from 'framer-motion';
import { Icons } from '@/styles/icons/Icon';

function ReviewContent() {
  const { user } = useAuth();
  const { isLoading, submitReview } = useCodeReview();

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!user) {
      toast.error('You must be logged in to get code reviews');
      return;
    }
    await submitReview();
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={clsx(
            'p-6 mx-auto max-w-md text-center rounded-lg shadow-md',
            'dark:bg-slate-800/90 dark:text-purple-200',
            'bg-white text-slate-800 border border-purple-600/30',
            'transition-all duration-300'
          )}
        >
          <Icons
            name="doorArrowLeft"
            className={clsx('w-16 h-16 mx-auto mb-4', 'fill-purple-800 dark:fill-purple-400')}
          />
          <p className="mb-4 font-light text-md">
            Please log in or register to use the code review feature
          </p>
          <div className="flex justify-center gap-4">
            <GetReviewButton onClick={() => navigate('/login')}>Log In</GetReviewButton>
            <GetReviewButton onClick={() => navigate('/register')}>Register</GetReviewButton>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col w-full gap-2 bg-amber"
    >
      <div className="flex flex-col gap-4 md:flex-row">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full md:grow md:max-w-[38dvw]"
        >
          <CodeEditor disabled={isLoading} />
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex items-center justify-center"
        >
          <GetReviewButton onClick={handleSubmit} isLoading={isLoading} loadingText="Analyzing...">
            Get Review
          </GetReviewButton>
        </motion.div>

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full md:grow md:max-w-[38dvw]"
        >
          <CodeFeedback />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ReviewPage() {
  return (
    <CodeReviewProvider>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="container p-4 mx-auto max-w-7xl"
      >
        <ReviewContent />
      </motion.div>
    </CodeReviewProvider>
  );
}
