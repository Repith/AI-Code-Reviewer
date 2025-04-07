import { useTheme } from '@/contexts/ThemeContext';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useCountUp } from '@/hooks/useCountUp';
import { Icons } from '@/styles/icons/Icon';

interface StatItem {
  stat: string;
  title: string;
  description: string;
  icon: 'time' | 'bug' | 'availability';
}

export default function StatsSection() {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const stats: StatItem[] = [
    {
      stat: '90%',
      title: 'Time Saved',
      description: 'Developers report saving up to 90% of time spent on code reviews',
      icon: 'time',
    },
    {
      stat: '85%',
      title: 'Bug Reduction',
      description: 'Catch bugs before they make it to production',
      icon: 'bug',
    },
    {
      stat: '24/7',
      title: 'Availability',
      description: 'Get instant feedback whenever you need it',
      icon: 'availability',
    },
  ];

  const timeCounter = useCountUp({ end: 90, suffix: '%', delay: 300 });
  const bugCounter = useCountUp({ end: 85, suffix: '%', delay: 500 });
  const availCounter = useCountUp({ end: 24, suffix: '/7', delay: 700 });

  const counters = [timeCounter, bugCounter, availCounter];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          counters.forEach(counter => counter.startCount());
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <h2
          className={clsx(
            'text-3xl font-bold text-center mb-12',
            theme === 'light' ? 'text-slate-800' : 'text-white',
            isVisible ? 'animate-fadeIn' : 'opacity-0'
          )}
        >
          Why Developers Love Our AI Code Reviewer
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {stats.map((item, index) => (
            <div
              key={index}
              className={clsx(
                'p-6 rounded-xl text-center',
                theme === 'light'
                  ? 'bg-white shadow-lg shadow-purple-100'
                  : 'bg-slate-900 shadow-lg shadow-purple-900/10',
                'transform transition-all duration-300 hover:scale-105',
                isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'
              )}
              style={{
                animationDelay: isVisible ? `${index * 200}ms` : '0ms',
              }}
            >
              <div className="flex flex-col items-center">
                <Icons
                  name={item.icon}
                  className={clsx(
                    'w-16 h-16 mb-2',
                    theme === 'light' ? 'text-purple-600' : 'text-purple-300',
                    isVisible ? 'animate-fadeIn' : 'opacity-0'
                  )}
                />
                <div
                  className={clsx(
                    'text-4xl font-bold mb-2',
                    theme === 'light'
                      ? 'bg-gradient-to-r from-purple-700 to-violet-600 bg-clip-text text-transparent'
                      : 'bg-gradient-to-r from-purple-400 to-violet-300 bg-clip-text text-transparent'
                  )}
                >
                  {counters[index].count}
                </div>
                <h3
                  className={clsx(
                    'text-xl font-semibold mb-2',
                    theme === 'light' ? 'text-slate-800' : 'text-white'
                  )}
                >
                  {item.title}
                </h3>
                <p className={clsx(theme === 'light' ? 'text-slate-600' : 'text-slate-400')}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
