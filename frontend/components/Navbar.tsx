'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar() {
  const pathname = usePathname();
  const { user, signOut, loading } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      // Redirect to login page after sign out
      window.location.href = '/login';
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  // Don't show navbar on auth pages
  if (pathname === '/login' || pathname === '/signup') {
    return null;
  }

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-semibold text-indigo-600">
                Todo App
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/dashboard/tasks"
                className={`${
                  pathname === '/dashboard/tasks'
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                My Tasks
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {user ? (
              <>
                <span className="text-sm text-gray-700 mr-4 hidden md:block">Welcome, {user.email}</span>
                <button
                  onClick={handleSignOut}
                  className="ml-4 px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  Sign out
                </button>
              </>
            ) : !loading ? (
              <>
                <Link
                  href="/login"
                  className="ml-4 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="ml-4 px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <span className="text-sm text-gray-700">Loading...</span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}