import { useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import clsx from 'clsx';
import Prism from 'prismjs';
import '@/styles/themes/prism-theme.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

interface FeatureItem {
  text: string;
}

export default function CodeExampleSection() {
  const { theme } = useTheme();
  const codeRef = useRef<HTMLElement>(null);

  const features: FeatureItem[] = [
    { text: 'Instant feedback on code quality and best practices' },
    { text: 'Identify potential bugs and security vulnerabilities' },
    { text: 'Suggestions for performance improvements' },
    { text: 'Language-specific recommendations' },
  ];

  const exampleCode = `function calculateTotal(items) {
  // Calculate the sum of all item prices
  return items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
}

// AI Feedback:
// ✓ Good use of reduce for summing values
// ✓ Clear function naming
// ! Consider adding input validation
// ! Add type annotations for better clarity`;

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [theme]);

  const containerClasses = clsx(
    'rounded-lg shadow-md overflow-hidden',
    'border border-slate-300 dark:border-slate-700',
    'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-50',
    'transition-all duration-200'
  );

  const headerClasses = clsx(
    'flex items-center justify-between px-4 py-2 h-10',
    'bg-slate-200 dark:bg-slate-900 border-b border-slate-300 dark:border-slate-800'
  );

  return (
    <section
      className={clsx(
        'py-16',
        theme === 'light' ? 'bg-white/70' : 'bg-slate-900/70',
        'backdrop-blur-sm'
      )}
    >
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className={containerClasses}>
            <div className={headerClasses}>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                <span className="text-xs font-medium">example.js</span>
              </div>
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <div className={`prism-${theme} p-4 max-h-[400px] overflow-auto`}>
              <pre className="line-numbers">
                <code ref={codeRef} className="language-javascript">
                  {exampleCode}
                </code>
              </pre>
            </div>
          </div>

          <div>
            <h2
              className={clsx(
                'text-3xl font-bold mb-6',
                theme === 'light' ? 'text-slate-800' : 'text-white'
              )}
            >
              Smart Code Analysis
            </h2>

            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div
                    className={clsx(
                      'flex-shrink-0 p-1 mt-1 mr-3 rounded-full',
                      theme === 'light' ? 'bg-purple-100' : 'bg-purple-900/50'
                    )}
                  >
                    <svg
                      className={clsx(
                        'w-4 h-4',
                        theme === 'light' ? 'text-purple-600' : 'text-purple-300'
                      )}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span
                    className={clsx(
                      'text-lg',
                      theme === 'light' ? 'text-slate-700' : 'text-slate-300'
                    )}
                  >
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
