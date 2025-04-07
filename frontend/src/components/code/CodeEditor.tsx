import { useEffect, useRef, useMemo } from 'react';
import Prism from 'prismjs';
import clsx from 'clsx';
import CopyButton from '../common/CopyButton';
import 'prismjs/prism';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import '@/styles/themes/prism-theme.css';
import { useCodeReview } from '../../contexts/CodeReviewContext';
import { useTheme } from '@/contexts/ThemeContext';

interface CodeEditorProps {
  disabled?: boolean;
  initialCode?: string;
  initialLanguage?: string;
}

export default function CodeEditor({
  disabled = false,
  initialCode,
  initialLanguage,
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const preRef = useRef<HTMLPreElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();
  const {
    code: contextCode,
    setCode: setContextCode,
    language: contextLanguage,
    setLanguage: setContextLanguage,
  } = useCodeReview();

  const code = initialCode !== undefined ? initialCode : contextCode;
  const language = initialLanguage !== undefined ? initialLanguage : contextLanguage;
  const isReadOnly = disabled || initialCode !== undefined;

  const sharedStyles = useMemo(
    () => ({
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
      fontSize: '0.8rem',
      lineHeight: '1.5',
      tabSize: 2,
      margin: 0,
      overflow: 'auto',
      whiteSpace: 'pre',
    }),
    []
  );

  const detectLanguage = (text: string): 'javascript' | 'typescript' | null => {
    const tsPattern = /interface\s+\w+|type\s+\w+\s*=|:\s*\w+/;
    const jsPattern = /import\s+React|ReactDOM|className=/;
    return tsPattern.test(text) ? 'typescript' : jsPattern.test(text) ? 'javascript' : null;
  };

  useEffect(() => {
    if (!preRef.current) return;

    try {
      preRef.current.innerHTML = '';
      const codeElement = document.createElement('code');
      codeElement.className = `language-${language} line-numbers`;
      codeElement.textContent = code.endsWith('\n') ? code : code + '\n';
      preRef.current.appendChild(codeElement);
      Prism.highlightElement(codeElement);
    } catch (error) {
      console.error('Highlighting error:', error);
    }
  }, [code, language, theme]);

  useEffect(() => {
    const textarea = textareaRef.current;
    const pre = preRef.current;
    if (!textarea || !pre) return;

    const handleScroll = () => {
      pre.scrollTop = textarea.scrollTop;
      pre.scrollLeft = textarea.scrollLeft;
    };

    textarea.addEventListener('scroll', handleScroll);
    return () => textarea.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePaste = (e: React.ClipboardEvent) => {
    if (isReadOnly) return;

    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const detected = detectLanguage(pastedText);
    if (detected) setContextLanguage(detected);
    setContextCode(pastedText);
  };

  const headerClasses = clsx(
    'flex items-center justify-between px-4 py-2 rounded-t-lg',
    'bg-slate-200 dark:bg-slate-900 border-b border-slate-300 dark:border-slate-800',
    'h-10'
  );

  const wrapperClasses = clsx(
    'relative flex-grow overflow-hidden rounded-b-lg',
    theme === 'dark' ? 'bg-slate-800' : 'bg-[#f8f8f8]'
  );

  const preClasses = clsx(
    'absolute top-0 left-0 w-full h-full pointer-events-none line-numbers',
    `prism-${theme}`,
    'scrollbar-thin scrollbar-thumb-slate-400 dark:scrollbar-thumb-slate-700',
    'scrollbar-track-transparent'
  );

  const textareaClasses = clsx(
    'absolute top-0 left-0 w-full h-full',
    'pl-[2.85rem]',
    'bg-transparent resize-none',
    'caret-black dark:caret-white',
    'focus:outline-none focus:ring-0',
    'scrollbar-thin scrollbar-thumb-slate-400 dark:scrollbar-thumb-slate-700',
    'scrollbar-track-transparent',
    isReadOnly ? 'cursor-default' : 'cursor-text'
  );

  return (
    <div
      className={clsx(
        'rounded-md shadow-md h-[80dvh] flex flex-col',
        'border border-slate-300 dark:border-purple-950/90',
        'bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-50',
        'transition-all duration-200'
      )}
    >
      <div className={headerClasses}>
        <div className="flex items-center gap-2">
          <div
            className={clsx(
              'w-3 h-3 rounded-full',
              language === 'javascript' ? 'bg-yellow-400' : 'bg-blue-400'
            )}
          />
          <span className="text-xs font-medium">
            {language === 'javascript' ? 'JavaScript' : 'TypeScript'}
          </span>
        </div>
        <CopyButton textToCopy={code} disabled={disabled} />
      </div>
      <div ref={wrapperRef} className={wrapperClasses}>
        <pre ref={preRef} className={preClasses} style={sharedStyles}></pre>
        <textarea
          ref={textareaRef}
          value={code}
          onChange={e => !isReadOnly && setContextCode(e.target.value)}
          onPaste={handlePaste}
          readOnly={isReadOnly}
          className={textareaClasses}
          style={{ ...sharedStyles, color: 'transparent' }}
          spellCheck="false"
          placeholder="Paste or type your code here..."
        />
      </div>
    </div>
  );
}
