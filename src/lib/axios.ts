import axios from 'axios';
import { getAccessToken } from './actions';
import { PROTECTED_PATH } from '@/routes';

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

const createApiInstance = (baseURL: string | undefined) => {
  const instance = axios.create({
    baseURL,
    timeout: 5000,
    withCredentials: true,
  });

  instance.interceptors.request.use(
    async (config) => {
      if (PROTECTED_PATH.some((path) => config.url?.includes(path))) {
        try {
          const accessTokenObj = await getAccessToken();
          const accessToken = accessTokenObj?.value;
          if (accessToken && config.headers) {
            config.headers['authorization'] = `Bearer ${accessToken}`;
          }
        } catch (err) {
          console.error('Invalid token', err);
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

export const api = createApiInstance(BASE_API_URL);
