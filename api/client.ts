import { getClerkInstance } from '@clerk/clerk-expo';
import axios from 'axios';

export const backendApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BACKEND_ADDRESS,
});

backendApi.interceptors.request.use(async (config) => {
  const clerk = getClerkInstance();
  const token = await clerk.session?.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
