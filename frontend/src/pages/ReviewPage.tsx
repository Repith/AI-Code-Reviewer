import { toast } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import CodeFeedback from '../components/code/CodeFeedback';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { CodeReviewProvider, useCodeReview } from '../contexts/CodeReviewContext';
import CodeEditor from '../components/code/CodeEditor';
import GetReviewButton from '@/components/common/GetReviewButton';

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
      <div
        className={clsx(
          'p-4 mb-4 text-center rounded-md',
          'dark:bg-amber-900/30 dark:text-amber-200',
          'bg-yellow-100 text-yellow-800'
        )}
      >
        <p>You need to be logged in to use the code review feature.</p>
        <GetReviewButton onClick={() => navigate('/login')}>Log In</GetReviewButton>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="w-full md:grow md:max-w-[38dvw]">
          <CodeEditor disabled={isLoading} />
        </div>

        <div className="flex items-center justify-between">
          <GetReviewButton onClick={handleSubmit} isLoading={isLoading} loadingText="Analyzing...">
            Get Review
          </GetReviewButton>
        </div>

        <div className="w-full md:grow md:max-w-[38dvw]">
          <CodeFeedback />
        </div>
      </div>
    </div>
  );
}

export default function ReviewPage() {
  return (
    <CodeReviewProvider>
      <div className="container p-4 mx-auto max-w-7xl">
        <ReviewContent />
      </div>
    </CodeReviewProvider>
  );
}
