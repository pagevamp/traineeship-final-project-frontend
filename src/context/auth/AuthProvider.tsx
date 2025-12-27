// 'use client';

// import { createContext, ReactNode, useContext, useMemo, useEffect } from 'react';
// import axios, { AxiosInstance } from 'axios';
// import { useAuth } from '@clerk/nextjs';
// import { PROTECTED_PATH } from '@/routes';

// const AuthApiContext = createContext<AxiosInstance | null>(null);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const { getToken } = useAuth();

//   const authApi = useMemo(() => {
//     return axios.create({
//       baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
//       timeout: 5000,
//       withCredentials: true,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//   }, []);

//   useEffect(() => {
//     const interceptorId = authApi.interceptors.request.use(
//       async (config) => {
//         if (PROTECTED_PATH.some((path) => config.url?.includes(path))) {
//           try {
//             const token = await getToken({ template: 'backend' });
//             if (token) {
//               config.headers.Authorization = `Bearer ${token}`;
//             }
//           } catch (err) {
//             console.error('Invalid token', err);
//           }
//         }
//         return config;
//       },
//       (error) => Promise.reject(error),
//     );

//     return () => {
//       authApi.interceptors.request.eject(interceptorId);
//     };
//   }, [authApi, getToken]);

//   return <AuthApiContext.Provider value={authApi}>{children}</AuthApiContext.Provider>;
// };

// export const useAuthApi = () => {
//   const api = useContext(AuthApiContext);
//   if (!api) {
//     throw new Error('useAuthApi must be used within AuthProvider');
//   }
//   return api;
// };
