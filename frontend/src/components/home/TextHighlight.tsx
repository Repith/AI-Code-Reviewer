import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface TextHighlightProps {
  children: React.ReactNode;
  className?: string;
}

export const TextHighlight = ({ children, className }: TextHighlightProps) => {
  return (
    <motion.span
      initial={{
        backgroundSize: '0% 100%',
      }}
      animate={{
        backgroundSize: '100% 100%',
      }}
      transition={{
        duration: 0.7,
        ease: 'linear',
        delay: 0.3,
      }}
      style={{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left center',
        display: 'inline',
      }}
      className={clsx(
        `relative inline-block rounded-lg bg-gradient-to-r from-indigo-300 to-purple-300 px-1 pb-1 dark:from-indigo-500 dark:to-purple-500`,
        'text-indigo-900 dark:text-white',
        className
      )}
    >
      {children}
    </motion.span>
  );
};

export default TextHighlight;
