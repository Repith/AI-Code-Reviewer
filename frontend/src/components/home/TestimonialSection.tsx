import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import TestimonialAvatars from './TestimonialAvatars';

interface TestimonialSectionProps {
  theme: string;
}

export default function TestimonialSection({ theme }: TestimonialSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.8 }}
      className="mt-12"
    >
      <p
        className={clsx(
          'text-lg font-medium mb-4',
          theme === 'light' ? 'text-slate-700' : 'text-slate-300'
        )}
      >
        Trusted by thousands of developers worldwide
      </p>

      <TestimonialAvatars theme={theme} />

      <p className={clsx('mt-4 text-sm', theme === 'light' ? 'text-slate-600' : 'text-slate-400')}>
        "This AI code reviewer has completely transformed our development workflow!" — John, Junior
        Engineer
      </p>
    </motion.div>
  );
}
