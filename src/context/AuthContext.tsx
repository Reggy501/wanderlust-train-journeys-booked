
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    // Check for stored user on initial load
    const storedUser = localStorage.getItem('trainEasyUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Mock users database for demo
  const mockUsers: User[] = [
    { id: '1', name: 'Demo User', email: 'demo@example.com' }, // Password: password123
  ];

  const login = (email: string, password: string): boolean => {
    // For demo purposes, we'll just check if email exists and password is not empty
    const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (foundUser && password.length > 0) {
      setUser(foundUser);
      localStorage.setItem('trainEasyUser', JSON.stringify(foundUser));
      toast.success(`Welcome back, ${foundUser.name}!`);
      return true;
    } else {
      toast.error('Invalid email or password');
      return false;
    }
  };

  const register = (name: string, email: string, password: string): boolean => {
    // Check if user already exists
    if (mockUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      toast.error('Email already in use');
      return false;
    }

    // Create new user
    const newUser: User = {
      id: (mockUsers.length + 1).toString(),
      name,
      email,
    };

    // In a real app, we would send this to an API
    mockUsers.push(newUser);
    setUser(newUser);
    localStorage.setItem('trainEasyUser', JSON.stringify(newUser));
    toast.success(`Account created successfully. Welcome, ${name}!`);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('trainEasyUser');
    toast.info('You have been logged out');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
