import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import clsx from 'clsx';
import CodeLoader from '../common/CodeLoader';
import { useCodeReview } from '../../contexts/CodeReviewContext';
import { useTheme } from '@/contexts/ThemeContext';
import { getMarkdownComponents } from './MarkdownComponents';
import '@/styles/themes/prism-theme.css';

interface CodeFeedbackProps {
  feedbackContent?: string;
  isStreaming?: boolean;
}

const containerClasses = clsx(
  'h-[80dvh] flex flex-col overflow-hidden rounded-lg shadow-md',
  'border border-zinc-300 dark:border-zinc-700',
  'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50',
  'transition-all duration-200'
);

const headerClasses = clsx(
  'flex items-center justify-between px-4 py-2 h-10',
  'bg-zinc-200 dark:bg-zinc-900 border-b border-zinc-300 dark:border-zinc-800'
);

export default function CodeFeedback({
  feedbackContent,
  isStreaming: propIsStreaming,
}: CodeFeedbackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { feedback: contextFeedback, isStreaming: contextIsStreaming } = useCodeReview();
  const { theme } = useTheme();

  const feedback = feedbackContent !== undefined ? feedbackContent : contextFeedback;
  const isStreaming = propIsStreaming !== undefined ? propIsStreaming : contextIsStreaming;

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [feedback]);

  return (
    <div ref={containerRef} className={containerClasses}>
      <div className={headerClasses}>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <span className="text-xs font-medium">AI Senior Reviewer</span>
        </div>
      </div>

      <div className="flex-grow p-4 overflow-y-auto">
        {isStreaming && feedback.length === 0 && <CodeLoader />}

        <div className="text-xs prose-sm prose max-w-none dark:prose-invert">
          <ReactMarkdown components={getMarkdownComponents(theme)}>{feedback}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
