import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { login } from '../services/auth.service';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import clsx from 'clsx';

type FormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const result = await login(data.email, data.password);
      setUser(result.user, result.accessToken);
      toast.success('Login successful');
      navigate('/');
    } catch (error) {
      toast.error('Login failed');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-md p-6 mx-auto mt-12">
      <div
        className={clsx(
          'rounded-xl p-6 shadow-xl',
          theme === 'light'
            ? 'bg-white/90 shadow-purple-200/50 border border-purple-100'
            : 'bg-slate-900/90 shadow-purple-900/20 border border-purple-800/30'
        )}
      >
        <h1
          className={clsx(
            'mb-5 text-2xl font-bold text-center',
            theme === 'light' ? 'text-purple-800' : 'text-purple-300'
          )}
        >
          Login
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              className={clsx(
                'block mb-1.5 text-sm font-medium',
                theme === 'light' ? 'text-slate-700' : 'text-slate-200'
              )}
            >
              Email
            </label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              className={clsx(
                'w-full p-2.5 rounded-lg text-sm',
                theme === 'light'
                  ? 'bg-white border border-purple-200 text-slate-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
                  : 'bg-slate-800/80 border border-purple-700/30 text-slate-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-800/50',
                'outline-none transition-all duration-200',
                '[&:-webkit-autofill]:shadow-[0_0_0_1000px_theme(colors.white)_inset] dark:[&:-webkit-autofill]:shadow-[0_0_0_1000px_theme(colors.slate.800)_inset]',
                '[&:-webkit-autofill]:[-webkit-text-fill-color:theme(colors.slate.800)] dark:[&:-webkit-autofill]:[-webkit-text-fill-color:theme(colors.slate.100)]'
              )}
              placeholder="your@email.com"
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <label
              className={clsx(
                'block mb-1.5 text-sm font-medium',
                theme === 'light' ? 'text-slate-700' : 'text-slate-200'
              )}
            >
              Password
            </label>
            <input
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
              className={clsx(
                'w-full p-2.5 rounded-lg text-sm',
                theme === 'light'
                  ? 'bg-white border border-purple-200 text-slate-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
                  : 'bg-slate-800/80 border border-purple-700/30 text-slate-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-800/50',
                'outline-none transition-all duration-200',
                '[&:-webkit-autofill]:shadow-[0_0_0_1000px_theme(colors.white)_inset] dark:[&:-webkit-autofill]:shadow-[0_0_0_1000px_theme(colors.slate.800)_inset]',
                '[&:-webkit-autofill]:[-webkit-text-fill-color:theme(colors.slate.800)] dark:[&:-webkit-autofill]:[-webkit-text-fill-color:theme(colors.slate.100)]'
              )}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={clsx(
              'w-full px-4 py-2.5 mt-2 text-sm font-medium rounded-lg',
              'bg-gradient-to-r from-purple-600 to-violet-500',
              'hover:from-purple-500 hover:to-violet-400',
              'text-white',
              'shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/30',
              'transform hover:-translate-y-0.5',
              'transition-all duration-200',
              'border border-purple-500/20',
              'disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none'
            )}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p
          className={clsx(
            'mt-5 text-sm text-center',
            theme === 'light' ? 'text-slate-600' : 'text-slate-400'
          )}
        >
          Don't have an account?{' '}
          <Link
            to="/register"
            className={clsx(
              'font-medium',
              theme === 'light'
                ? 'text-purple-600 hover:text-purple-500'
                : 'text-purple-400 hover:text-purple-300',
              'transition-colors duration-200'
            )}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
