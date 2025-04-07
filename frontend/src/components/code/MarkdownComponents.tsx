import clsx from 'clsx';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import CopyButton from '../common/CopyButton';
import { detectLanguage, isSubstantialCode, getCodeStyle } from './CodeFeedbackConfig';

export const getMarkdownComponents = (theme: string) => {
  const inlineCodeClasses = clsx(
    'px-1 py-0.5 rounded',
    theme === 'dark' ? 'bg-zinc-800 text-zinc-200' : 'bg-zinc-200 text-zinc-800'
  );

  return {
    // Headings
    h1: ({ node, ...props }: any) => (
      <h1 className="mt-6 mb-4 text-2xl font-bold leading-tight" {...props} />
    ),
    h2: ({ node, ...props }: any) => (
      <h2 className="mt-5 mb-3 text-xl font-semibold leading-tight" {...props} />
    ),
    h3: ({ node, ...props }: any) => (
      <h3 className="mt-4 mb-2 text-lg font-medium leading-snug" {...props} />
    ),
    h4: ({ node, ...props }: any) => (
      <h4 className="mt-3 mb-2 text-base font-medium leading-snug" {...props} />
    ),
    h5: ({ node, ...props }: any) => (
      <h5 className="mt-2 mb-1 text-sm font-medium leading-normal" {...props} />
    ),
    h6: ({ node, ...props }: any) => (
      <h6 className="mt-2 mb-1 text-xs font-medium leading-normal" {...props} />
    ),

    // Lists
    ul: ({ node, ...props }: any) => (
      <ul className="pl-5 mt-2 mb-2 space-y-1 list-disc" {...props} />
    ),
    ol: ({ node, ...props }: any) => (
      <ol className="pl-5 mt-2 mb-2 space-y-1 list-decimal" {...props} />
    ),
    li: ({ node, ...props }: any) => <li className="mb-1 leading-normal" {...props} />,

    // Text elements
    p: ({ node, ...props }: any) => <p className="my-2 leading-relaxed" {...props} />,
    blockquote: ({ node, ...props }: any) => (
      <blockquote
        className="pl-4 my-4 italic border-l-4 border-zinc-300 dark:border-zinc-600"
        {...props}
      />
    ),
    a: ({ node, ...props }: any) => (
      <a className="text-blue-600 dark:text-blue-400 hover:underline" {...props} />
    ),
    strong: ({ node, ...props }: any) => <strong className="font-semibold" {...props} />,
    em: ({ node, ...props }: any) => <em className="italic" {...props} />,
    hr: ({ node, ...props }: any) => (
      <hr className="my-6 border-zinc-300 dark:border-zinc-700" {...props} />
    ),

    // Tables
    table: ({ node, ...props }: any) => (
      <div className="my-4 overflow-x-auto">
        <table className="min-w-full border border-zinc-300 dark:border-zinc-700" {...props} />
      </div>
    ),
    thead: ({ node, ...props }: any) => (
      <thead className="bg-zinc-200 dark:bg-zinc-700" {...props} />
    ),
    tbody: ({ node, ...props }: any) => (
      <tbody className="divide-y divide-zinc-300 dark:divide-zinc-700" {...props} />
    ),
    tr: ({ node, ...props }: any) => (
      <tr className="border-b border-zinc-300 dark:border-zinc-700" {...props} />
    ),
    th: ({ node, ...props }: any) => <th className="px-3 py-2 font-medium text-left" {...props} />,
    td: ({ node, ...props }: any) => <td className="px-3 py-2" {...props} />,

    // Code blocks
    code({ node, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      const codeContent = String(children).replace(/\n$/, '');

      // Handle substantial code blocks
      if ((match || codeContent.trim().length > 0) && isSubstantialCode(codeContent)) {
        const detectedLang = detectLanguage(codeContent, match?.[1]);

        return (
          <div className="relative my-4 group">
            <div className="absolute top-2 right-2">
              <CopyButton textToCopy={codeContent} className="opacity-0 group-hover:opacity-100" />
            </div>
            <div className={`prism-${theme}`}>
              <SyntaxHighlighter
                customStyle={getCodeStyle(theme)}
                language={detectedLang}
                PreTag="div"
                className="rounded-lg"
                showLineNumbers={false}
                wrapLines={true}
                useInlineStyles={false}
              >
                {codeContent}
              </SyntaxHighlighter>
            </div>
          </div>
        );
      }

      // Handle inline code
      return (
        <code className={inlineCodeClasses} {...props}>
          {children}
        </code>
      );
    },
  };
};
