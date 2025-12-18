'use client';
import { createContext, ReactNode, useContext, useMemo } from 'react';
import axios, { AxiosInstance } from 'axios';
import { useAuth } from '@clerk/nextjs';

const AuthContext = createContext<AxiosInstance | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { getToken } = useAuth();

  const authApi = useMemo(() => {
    const instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
      timeout: 5000,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    instance.interceptors.request.use(
      async (config) => {
        try {
          const token = await getToken();
          console.log(token);
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (err) {
          console.error('Invalid token', err);
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return instance;
  }, [getToken]);

  return (
    <AuthContext.Provider value={authApi}>{children}</AuthContext.Provider>
  );
};

export const useAuthApi = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthApi must be used within an AuthProvider');
  }
  return context;
};
