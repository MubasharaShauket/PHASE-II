'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { client } from '@/lib/auth-client';

interface AuthContextType {
  user: any | null; // Better Auth session user type
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, confirmPassword: string) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const checkSession = async () => {
      try {
        const session = await client.getSession();
        if (session.data?.user) {
          setUser(session.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking session:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await client.signIn.email({
        email,
        password,
        redirectTo: '/dashboard/tasks' // Use redirectTo instead of callbackURL
      });

      if (response.data?.user) {
        setUser(response.data.user);
        // Store the token if needed for API calls
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }
      } else if (response.error) {
        throw new Error(response.error.message || 'Sign in failed');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await client.signOut({
        callbackURL: '/login' // Redirect to login after sign out
      });
      setUser(null);
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, confirmPassword: string) => {
    try {
      const response = await client.register({
        email,
        password,
        confirmPassword
      });

      if (response.data?.user) {
        setUser(response.data.user);
        // Store the token if needed for API calls
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }
      } else if (response.error) {
        throw new Error(response.error.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  const value = {
    user,
    signIn,
    signOut,
    signUp,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}