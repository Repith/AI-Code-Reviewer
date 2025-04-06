import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { getReviewHistory } from '../services/review.service';
import type { ReviewHistory } from '../services/review.service';
import clsx from 'clsx';
import { CodeReviewProvider } from '../contexts/CodeReviewContext';
import CodeFeedback from '../components/code/CodeFeedback';
import CodeEditor from '../components/code/CodeEditor';

export default function HistoryPage() {
  const [history, setHistory] = useState<ReviewHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

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
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (isLoading) {
    return <div className="container p-4 mx-auto">Loading history...</div>;
  }

  return (
    <CodeReviewProvider>
      <div className="container p-4 mx-auto">
        <h1 className="mb-4 text-2xl font-bold">Your Review History</h1>

        {history.length === 0 ? (
          <p>You haven't submitted any code for review yet.</p>
        ) : (
          <div className="space-y-4">
            {history.map(review => {
              const reviewId = review._id || review.reviewId;
              const isExpanded = expandedItems[reviewId];

              return (
                <div key={reviewId} className="border rounded shadow-sm">
                  <button
                    onClick={() => toggleItem(reviewId)}
                    className={clsx(
                      'w-full p-4 text-left flex justify-between items-center',
                      'hover:bg-gray-50 transition-colors duration-200'
                    )}
                  >
                    <div>
                      <span className="font-semibold">{review.language}</span>
                      <span className="ml-2 text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <svg
                      className={clsx(
                        'w-5 h-5 transition-transform duration-200',
                        isExpanded ? 'transform rotate-180' : ''
                      )}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {isExpanded && (
                    <div className="p-4 border-t">
                      <div className="flex flex-col gap-4 md:flex-row">
                        <div className="w-full md:w-1/2">
                          <h3 className="mb-2 font-semibold">Code:</h3>
                          <CodeEditor
                            disabled={true}
                            initialCode={review.code}
                            initialLanguage={review.language}
                          />
                        </div>

                        <div className="w-full md:w-1/2">
                          <h3 className="mb-2 font-semibold">Feedback:</h3>
                          <CodeFeedback feedbackContent={review.feedback} isStreaming={false} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </CodeReviewProvider>
  );
}
