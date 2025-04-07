/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '@custom-variant(dark)'],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 0.8s ease-in-out forwards',
        fadeInUp: 'fadeInUp 0.8s ease-out forwards',
        countUp: 'countUp 2s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        countUp: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    function ({ addUtilities, theme }) {
      const animationDelays = {};
      for (let i = 1; i <= 10; i++) {
        animationDelays[`.animation-delay-${i * 100}`] = {
          'animation-delay': `${i * 100}ms`,
        };
        animationDelays[`.animation-delay-${i * 200}`] = {
          'animation-delay': `${i * 200}ms`,
        };
      }
      addUtilities(animationDelays);
    },
  ],
};
