import { useTheme } from '@/contexts/ThemeContext';
import clsx from 'clsx';
import HeroSection from '@/components/home/HeroSection';
import CodeExampleSection from '@/components/code/CodeExampleSection';
import StatsSection from '@/components/home/StatsSection';
import CtaSection from '@/components/home/CtaSection';
import { motion } from 'framer-motion';

export default function HomePage() {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={clsx(
        'min-h-[calc(100vh-4rem)]',
        theme === 'light'
          ? 'bg-gradient-to-br from-purple-300/30 via-white to-purple-200'
          : 'bg-gradient-to-br from-slate-950 via-purple-950/80 to-slate-950'
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <HeroSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <CodeExampleSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <StatsSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <CtaSection />
      </motion.div>
    </motion.div>
  );
}
