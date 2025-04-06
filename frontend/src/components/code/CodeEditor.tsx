import { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import clsx from 'clsx';
import CopyButton from '../common/CopyButton';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import '../../styles/prism-vscode-dark.css';
import { useCodeReview } from '../../contexts/CodeReviewContext';

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
  const {
    code: contextCode,
    setCode: setContextCode,
    language: contextLanguage,
    setLanguage: setContextLanguage,
  } = useCodeReview();

  // Use props if provided, otherwise use context values
  const code = initialCode !== undefined ? initialCode : contextCode;
  const language = initialLanguage !== undefined ? initialLanguage : contextLanguage;

  // Only update context if we're not using prop values
  const setCode = initialCode !== undefined ? () => {} : setContextCode;

  const detectLanguage = (text: string): 'javascript' | 'typescript' | null => {
    const tsPattern = /interface\s+\w+|type\s+\w+\s*=|:\s*\w+/;
    const jsPattern = /import\s+React|ReactDOM|className=/;
    if (tsPattern.test(text)) return 'typescript';
    if (jsPattern.test(text)) return 'javascript';
    return null;
  };

  useEffect(() => {
    if (preRef.current) {
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
    }
  }, [code, language]);

  const syncScroll = () => {
    if (textareaRef.current && preRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop;
      preRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    if (initialCode !== undefined) return; // Don't handle paste if using prop values

    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const detected = detectLanguage(pastedText);
    if (detected) {
      setContextLanguage(detected);
    }
    setContextCode(pastedText);
  };

  const sharedStyles: React.CSSProperties = {
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    fontSize: '12px',
    lineHeight: '1.5',
    tabSize: 2,
  };

  const isReadOnly = disabled || initialCode !== undefined;

  return (
    <div
      className={clsx(
        'rounded-md border shadow-sm overflow-hidden h-[70dvh] flex flex-col',
        'bg-zinc-950 dark:bg-zinc-950 text-zinc-50',
        'transition-all duration-200'
      )}
    >
      <div
        className={clsx(
          'flex items-center justify-between px-4 py-2',
          'bg-zinc-900 dark:bg-zinc-900 border-b border-zinc-800'
        )}
      >
        <div className="flex items-center gap-2">
          <div
            className={clsx(
              'w-3 h-3 rounded-full',
              language === 'javascript' ? 'bg-yellow-400' : 'bg-blue-400'
            )}
          />
          <span className="text-sm font-medium">
            {language === 'javascript' ? 'JavaScript' : 'TypeScript'}
          </span>
        </div>
        <CopyButton textToCopy={code} disabled={disabled} />
      </div>
      <div className="relative flex-grow bg-[#1e1e1e]">
        <pre
          ref={preRef}
          className="absolute top-0 left-0 w-full h-full overflow-auto pointer-events-none line-numbers"
          style={{ ...sharedStyles }}
        ></pre>
        <textarea
          ref={textareaRef}
          value={code}
          onChange={e => initialCode === undefined && setContextCode(e.target.value)}
          onScroll={syncScroll}
          onPaste={handlePaste}
          readOnly={isReadOnly}
          className={clsx(
            'absolute top-0 left-0 w-full h-full',
            'overflow-auto bg-transparent resize-none',
            'caret-white pl-[2.85rem] pr-2',
            'focus:outline-none focus:ring-0',
            isReadOnly ? 'cursor-default' : 'cursor-text'
          )}
          style={{ ...sharedStyles, whiteSpace: 'pre', color: 'transparent' }}
          spellCheck="false"
          placeholder="Paste or type your code here..."
        />
      </div>
    </div>
  );
}
