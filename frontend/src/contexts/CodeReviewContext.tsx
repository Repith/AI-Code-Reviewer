import { createContext, useContext, useState, ReactNode } from 'react';
import { createStreamingReview } from '../services/review.service';
import { toast } from 'react-hot-toast';

type Language = 'javascript' | 'typescript';

interface CodeReviewContextType {
  code: string;
  setCode: (code: string) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  feedback: string;
  isLoading: boolean;
  isStreaming: boolean;
  submitReview: () => Promise<void>;
}

const CodeReviewContext = createContext<CodeReviewContextType | undefined>(undefined);

export function useCodeReview() {
  const context = useContext(CodeReviewContext);
  if (context === undefined) {
    throw new Error('useCodeReview must be used within a CodeReviewProvider');
  }
  return context;
}

interface CodeReviewProviderProps {
  children: ReactNode;
}

export function CodeReviewProvider({ children }: CodeReviewProviderProps) {
  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState<Language>('javascript');
  const [feedback, setFeedback] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);

  const submitReview = async () => {
    try {
      setIsLoading(true);
      setIsStreaming(true);
      setFeedback('');

      await createStreamingReview(code, language, chunk => {
        setFeedback(prev => prev + chunk);
      });
    } catch (error) {
      toast.error('Failed to get code review');
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  const value = {
    code,
    setCode,
    language,
    setLanguage,
    feedback,
    isLoading,
    isStreaming,
    submitReview,
  };

  return <CodeReviewContext.Provider value={value}>{children}</CodeReviewContext.Provider>;
}
