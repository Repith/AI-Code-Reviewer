import { useTheme } from '@/contexts/ThemeContext';
import clsx from 'clsx';

interface CodeDisplayProps {
  code: string;
  language?: string;
  filename?: string;
}

export default function CodeDisplay({ code, language = 'javascript', filename = 'example.js' }: CodeDisplayProps) {
  const { theme } = useTheme();
  
  return (
    <div className={clsx(
      "rounded-xl overflow-hidden shadow-xl",
      theme === 'light' 
        ? "bg-slate-800 shadow-slate-200/50" 
        : "bg-slate-950 shadow-purple-900/20",
      "transform transition-all duration-300 hover:scale-[1.02]"
    )}>
      {/* Code window header */}
      <div className="flex items-center px-4 py-2 bg-opacity-90 border-b bg-slate-900 border-slate-700">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="ml-4 text-sm font-medium text-slate-300">{filename}</div>
      </div>
      
      {/* Code content */}
      <div className={clsx("prism-", theme)}>
        <pre className="p-4 overflow-x-auto text-sm">
          <code className={`language-${language}`}>{code}</code>
        </pre>
      </div>
    </div>
  );
}