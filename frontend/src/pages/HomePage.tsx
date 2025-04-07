import { useTheme } from '@/contexts/ThemeContext';
import clsx from 'clsx';
import HeroSection from '@/components/home/HeroSection';
import CodeExampleSection from '@/components/code/CodeExampleSection';
import StatsSection from '@/components/home/StatsSection';
import CtaSection from '@/components/home/CtaSection';

export default function HomePage() {
  const { theme } = useTheme();

  return (
    <div
      className={clsx(
        'min-h-[calc(100vh-4rem)]',
        theme === 'light'
          ? 'bg-gradient-to-br from-purple-300/30 via-white to-purple-200'
          : 'bg-gradient-to-br from-slate-950 via-purple-950/80 to-slate-950'
      )}
    >
      <HeroSection />
      <CodeExampleSection />
      <StatsSection />
      <CtaSection />
    </div>
  );
}
