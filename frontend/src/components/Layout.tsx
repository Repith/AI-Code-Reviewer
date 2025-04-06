import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="p-4 text-center bg-gray-100">
        <p>© {new Date().getFullYear()} AI Code Reviewer</p>
      </footer>
    </div>
  );
}
