import React, { createContext, useContext, useState, useEffect } from 'react';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';
import { signIn, signUp, logOut } from '../services/auth.service';
import type { AuthState, User, LoginFormData, SignupFormData } from '../types/auth';

// Authentication context to manage user state across the application
// Handles login, signup, and logout operations using Firebase
interface AuthContextType extends AuthState {
  login: (data: LoginFormData) => Promise<void>;
  signup: (data: SignupFormData) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user: firebaseUser, loading } = useFirebaseAuth();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    if (firebaseUser) {
      setAuthState({
        user: {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          firstName: firebaseUser.displayName?.split(' ')[0] || '',
          lastName: firebaseUser.displayName?.split(' ')[1] || '',
        },
        isAuthenticated: true,
      });
    } else {
      setAuthState({ user: null, isAuthenticated: false });
    }
  }, [firebaseUser]);

  const login = async (data: LoginFormData) => {
    if (!data.email || !data.password) {
      throw new Error('Email and password are required');
    }
    
    try {
      await signIn(data);
    } catch (error) {
      console.error('Login error:', { 
        message: error instanceof Error ? error.message : 'An unknown error occurred'
      });
      throw error;
    }
  };

  const signup = async (data: SignupFormData) => {
    if (!data.email || !data.password || !data.firstName || !data.lastName) {
      throw new Error('All fields are required');
    }

    try {
      await signUp(data);
    } catch (error) {
      console.error('Signup error:', {
        message: error instanceof Error ? error.message : 'An unknown error occurred'
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logOut();
      setAuthState({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error('Logout error:', {
        message: error instanceof Error ? error.message : 'An unknown error occurred'
      });
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, signup, logout, loading }}>
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