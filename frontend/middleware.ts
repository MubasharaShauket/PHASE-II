import { NextRequest, NextResponse } from 'next/server';

// This function handles the middleware logic
export function middleware(request: NextRequest) {
  // Define protected routes that require authentication
  const protectedPaths = ['/dashboard'];

  const isAuthenticated = checkAuth(request);

  // If user is trying to access a protected route but is not authenticated
  if (protectedPaths.some(path => request.nextUrl.pathname.startsWith(path)) && !isAuthenticated) {
    // Redirect to login page
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If user is logged in and tries to access login/signup pages, redirect to dashboard
  if ((request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup') && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard/tasks', request.url));
  }

  return NextResponse.next();
}

// Function to check if user is authenticated
// This checks for the presence of auth cookies set by Better Auth
function checkAuth(request: NextRequest): boolean {
  // Check for the presence of Better Auth session cookies
  const authCookie = request.cookies.get('better-auth-session-token');
  return authCookie !== undefined && authCookie.value !== '';
}

// Configuration to define which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};