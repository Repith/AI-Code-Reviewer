import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import clsx from 'clsx';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="text-white bg-blue-600 shadow-md">
      <div className="container flex items-center justify-between p-4 mx-auto">
        <Link to="/" className="text-xl font-bold">
          AI Code Reviewer
        </Link>

        <div className="flex items-center space-x-4">
          <Link to="/review" className="hover:underline">
            Review Code
          </Link>

          {user ? (
            <>
              <Link to="/history" className="hover:underline">
                History
              </Link>
              <button
                onClick={logout}
                className={clsx(
                  'px-3 py-1 bg-white text-blue-600 rounded',
                  'hover:bg-blue-100 transition-colors'
                )}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link
                to="/register"
                className={clsx(
                  'px-3 py-1 bg-white text-blue-600 rounded',
                  'hover:bg-blue-100 transition-colors'
                )}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
