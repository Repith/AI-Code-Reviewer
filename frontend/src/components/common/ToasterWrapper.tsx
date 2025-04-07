import { Toaster } from 'react-hot-toast';
import { useTheme } from '@/contexts/ThemeContext';

export default function ToasterWrapper() {
  const { theme } = useTheme();

  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: theme === 'dark' ? '#27272a' : '#ffffff',
          color: theme === 'dark' ? '#e4e4e7' : '#374151',
          border: theme === 'dark' ? '1px solid #3f3f46' : '1px solid #e4e4e7',
        },
      }}
    />
  );
}
