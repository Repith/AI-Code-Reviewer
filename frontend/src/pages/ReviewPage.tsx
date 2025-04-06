import { toast } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import CodeFeedback from '../components/code/CodeFeedback';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { CodeReviewProvider, useCodeReview } from '../contexts/CodeReviewContext';
import CodeEditor from '../components/code/CodeEditor';

function ReviewContent() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { language, setLanguage, isLoading, submitReview } = useCodeReview();

  const handleSubmit = async () => {
    if (!user) {
      toast.error('You must be logged in to get code reviews');
      return;
    }
    await submitReview();
  };

  if (!user) {
    return (
      <div className="p-4 mb-4 text-center bg-yellow-100 rounded-md">
        <p className="text-yellow-800">You need to be logged in to use the code review feature.</p>
        <button
          className="px-4 py-2 mt-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={() => navigate('/login')}
        >
          Log In
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      {/* Left Column - Code Input */}
      <div className="w-full md:w-1/2">
        <div className="flex items-center justify-between mb-2">
          <label className="font-medium">
            Programming Language:
            <select
              value={language}
              onChange={e => setLanguage(e.target.value as 'javascript' | 'typescript')}
              className="p-2 ml-2 border rounded"
              disabled={isLoading}
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
            </select>
          </label>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className={clsx(
              'px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600',
              'disabled:bg-blue-300 transition-colors duration-200'
            )}
          >
            {isLoading ? 'Analyzing...' : 'Get Review'}
          </button>
        </div>

        <div>
          <label className="block mb-2 font-medium">Your Code:</label>
          <CodeEditor disabled={isLoading} />
        </div>
      </div>

      {/* Right Column - Feedback */}
      <div className="w-full md:w-1/2">
        <div className="sticky top-4">
          <h2 className="mb-4 text-xl font-semibold">Feedback</h2>
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
        <h1 className="mb-6 text-2xl font-bold">AI Code Review</h1>
        <ReviewContent />
      </div>
    </CodeReviewProvider>
  );
}
