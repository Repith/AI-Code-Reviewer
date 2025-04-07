import { clsx } from 'clsx';

interface TestimonialAvatarsProps {
  theme: string;
}

export default function TestimonialAvatars({ theme }: TestimonialAvatarsProps) {
  return (
    <div className="flex items-center justify-center">
      <div className="flex -space-x-3">
        {['1', '2', '3', '4', '5'].map(id => (
          <div
            key={id}
            className={clsx(
              'w-10 h-10 rounded-full border-2 overflow-hidden',
              theme === 'light' ? 'border-white' : 'border-slate-800'
            )}
          >
            <img
              src={`https://randomuser.me/api/portraits/men/${id}.jpg`}
              alt={`User ${id}`}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
        <div
          className={clsx(
            'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold',
            theme === 'light'
              ? 'bg-purple-100 text-purple-700 border-2 border-white'
              : 'bg-purple-900/50 text-purple-300 border-2 border-slate-800'
          )}
        >
          +99
        </div>
      </div>
    </div>
  );
}
