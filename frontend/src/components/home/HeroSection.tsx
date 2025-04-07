import { useTheme } from '@/contexts/ThemeContext';
import HeroHighlight from './HeroHighlight';
import HeroTitle from './HeroTitle';
import HeroDescription from './HeroDescription';
import HeroButtons from './HeroButtons';
import TestimonialSection from './TestimonialSection';

export default function HeroSection() {
  const { theme } = useTheme();

  return (
    <HeroHighlight containerClassName="min-h-[500px] py-16">
      <section className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <HeroTitle theme={theme} />
          <HeroDescription theme={theme} />
          <HeroButtons theme={theme} />
          <TestimonialSection theme={theme} />
        </div>
      </section>
    </HeroHighlight>
  );
}
