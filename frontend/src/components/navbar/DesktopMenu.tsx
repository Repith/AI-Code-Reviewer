import ThemeToggle from '../ThemeToggle';
import NavButton from './NavButton';
import NavLink from './NavLink';

interface DesktopMenuProps {
  user: any;
  logout: () => void;
}

export default function DesktopMenu({ user, logout }: DesktopMenuProps) {
  return (
    <div className="hidden md:flex md:items-center md:space-x-6">
      <NavLink to="/review">Review Code</NavLink>

      {user ? (
        <>
          <NavLink to="/history">History</NavLink>
          <NavButton onClick={logout}>Logout</NavButton>
        </>
      ) : (
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register" isButton>
            Register
          </NavLink>
        </>
      )}
      <ThemeToggle />
    </div>
  );
}
