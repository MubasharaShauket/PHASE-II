'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { HomeIcon, UserCircleIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';

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
    <nav className="bg-card-gradient shadow-lg border-b border-gray-200/50 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-18 items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800">
                <span className="flex items-center">
                  <span className="mr-2">✓</span> Todo App
                </span>
              </Link>
            </div>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link
                href="/dashboard/tasks"
                className={`${
                  pathname === '/dashboard/tasks'
                    ? 'text-primary-600 border-b-2 border-primary-500'
                    : 'text-gray-600 hover:text-primary-600'
                } inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200`}
              >
                <HomeIcon className="h-5 w-5 mr-1" />
                My Tasks
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-gray-700 hidden md:block">
                  <span className="font-medium">Welcome,</span> {user.email.split('@')[0]}
                </span>
                <button
                  onClick={handleSignOut}
                  className="btn-danger flex items-center"
                >
                  <ArrowRightStartOnRectangleIcon className="h-5 w-5 mr-1" />
                  Sign out
                </button>
              </>
            ) : !loading ? (
              <>
                <Link
                  href="/login"
                  className="btn-secondary flex items-center"
                >
                  <UserCircleIcon className="h-5 w-5 mr-1" />
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="btn-primary flex items-center"
                >
                  <span>Create Account</span>
                </Link>
              </>
            ) : (
              <div className="flex items-center text-sm text-gray-700">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-500 mr-2"></div>
                Loading...
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}