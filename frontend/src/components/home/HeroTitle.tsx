import { clsx } from 'clsx';
import TextHighlight from './TextHighlight';

interface HeroTitleProps {
  theme: string;
}

export default function HeroTitle({ theme }: HeroTitleProps) {
  return (
    <h1
      className={clsx(
        'text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6',
        theme === 'light'
          ? 'bg-gradient-to-r from-purple-700 via-violet-600 to-indigo-700 bg-clip-text text-transparent'
          : 'bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-400 bg-clip-text text-transparent'
      )}
    >
      <TextHighlight className="inline-block mb-2">AI-Powered</TextHighlight> Code Reviews
    </h1>
  );
}
