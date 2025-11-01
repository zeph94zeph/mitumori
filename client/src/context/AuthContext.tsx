import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { authApi, userApi } from '../api';
import type { AuthResponse, User } from '../types/api';

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setLoading(false);
      return;
    }

    userApi
      .me()
      .then((profile) => setUser(profile))
      .catch(() => localStorage.removeItem('authToken'))
      .finally(() => setLoading(false));
  }, []);

  const handleAuthSuccess = (response: AuthResponse) => {
    localStorage.setItem('authToken', response.token);
    setUser(response.user);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      login: async (email, password) => {
        const response = await authApi.login(email, password);
        handleAuthSuccess(response);
        await queryClient.invalidateQueries();
      },
      register: async (payload) => {
        const response = await authApi.register(payload);
        handleAuthSuccess(response);
        await queryClient.invalidateQueries();
      },
      logout: () => {
        localStorage.removeItem('authToken');
        setUser(null);
        queryClient.clear();
      }
    }),
    [loading, queryClient, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
