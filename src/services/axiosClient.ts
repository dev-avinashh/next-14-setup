'use client';
import axios, { AxiosInstance } from 'axios';

// Fallback URL in case environment variable is not set
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 7000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosInstance;
