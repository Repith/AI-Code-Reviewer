import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface HeroDescriptionProps {
  theme: string;
}

export default function HeroDescription({ theme }: HeroDescriptionProps) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className={clsx(
        'max-w-2xl mx-auto text-xl sm:text-2xl mb-8',
        theme === 'light' ? 'text-slate-700' : 'text-slate-300'
      )}
    >
      Get instant, intelligent feedback on your code from our advanced AI assistant.
    </motion.p>
  );
}
