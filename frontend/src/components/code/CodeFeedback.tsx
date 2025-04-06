import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import clsx from 'clsx';
import CopyButton from '../common/CopyButton';
import { useCodeReview } from '../../contexts/CodeReviewContext';

const codeStyle = {
  backgroundColor: '#f6f8fa',
  color: '#24292e',
  fontFamily: 'Menlo, monospace',
  fontSize: '14px',
  padding: '16px',
  borderRadius: '8px',
  overflowX: 'auto',
};

interface CodeFeedbackProps {
  feedbackContent?: string;
  isStreaming?: boolean;
}

export default function CodeFeedback({
  feedbackContent,
  isStreaming: propIsStreaming,
}: CodeFeedbackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { feedback: contextFeedback, isStreaming: contextIsStreaming } = useCodeReview();

  // Use props if provided, otherwise use context values
  const feedback = feedbackContent !== undefined ? feedbackContent : contextFeedback;
  const isStreaming = propIsStreaming !== undefined ? propIsStreaming : contextIsStreaming;

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [feedback]);

  return (
    <div
      ref={containerRef}
      className={clsx(
        'h-[70dvh] flex flex-col overflow-hidden rounded-md border shadow-sm',
        'bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-50',
        'transition-all duration-200'
      )}
    >
      <div
        className={clsx(
          'flex items-center justify-between px-4 py-2',
          'bg-gray-100 dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800'
        )}
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <span className="text-sm font-medium">AI Review</span>
        </div>
      </div>

      <div className="flex-grow p-4 overflow-y-auto">
        {isStreaming && feedback.length === 0 && (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 delay-150 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 delay-300 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-gray-500 dark:text-gray-400">Analyzing code...</span>
          </div>
        )}

        <ReactMarkdown
          className="prose max-w-none dark:prose-invert"
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <div className="relative my-4 group">
                  <div className="absolute top-2 right-2">
                    <CopyButton
                      textToCopy={String(children)}
                      className="opacity-0 group-hover:opacity-100"
                    />
                  </div>
                  <SyntaxHighlighter
                    style={codeStyle}
                    language={match[1]}
                    PreTag="div"
                    className="rounded-lg"
                    showLineNumbers={false}
                    wrapLines={true}
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                </div>
              ) : (
                <code
                  className={clsx('px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-800', className)}
                  {...props}
                >
                  {children}
                </code>
              );
            },
            h1: ({ node, ...props }) => <h1 className="mt-6 mb-4" {...props} />,
            h2: ({ node, ...props }) => <h2 className="mt-5 mb-3" {...props} />,
            h3: ({ node, ...props }) => <h3 className="mt-4 mb-2" {...props} />,
            h4: ({ node, ...props }) => <h4 className="mt-3 mb-2" {...props} />,
            h5: ({ node, ...props }) => <h5 className="mt-2 mb-1" {...props} />,
            h6: ({ node, ...props }) => <h6 className="mt-2 mb-1" {...props} />,
          }}
        >
          {feedback}
        </ReactMarkdown>
      </div>
    </div>
  );
}
