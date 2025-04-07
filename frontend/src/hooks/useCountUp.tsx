import { useState, useEffect } from 'react';

interface CountUpOptions {
  start?: number;
  end: number;
  duration?: number;
  delay?: number;
  suffix?: string;
}

export function useCountUp({ 
  start = 0, 
  end, 
  duration = 2000, 
  delay = 0,
  suffix = ''
}: CountUpOptions) {
  const [count, setCount] = useState(start);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;
    
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Use easeOutQuad for smoother animation
      const easeOutQuad = (t: number) => t * (2 - t);
      const easedProgress = easeOutQuad(percentage);
      
      const currentCount = Math.floor(start + (end - start) * easedProgress);
      setCount(currentCount);

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    const timeoutId = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationFrame);
    };
  }, [start, end, duration, delay, isRunning]);

  const startCount = () => setIsRunning(true);
  const resetCount = () => {
    setIsRunning(false);
    setCount(start);
  };

  return { 
    count: `${count}${suffix}`, 
    startCount, 
    resetCount,
    isRunning
  };
}