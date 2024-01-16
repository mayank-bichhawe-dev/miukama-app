// axiosInstance.js
import { loginLocalStorageHelper } from '@/utils/loginLocalStorageHelper';
import axios from 'axios';

const instance = axios.create({
  // Add your default configuration here (e.g., baseURL, headers, etc.)
});

instance.interceptors.request.use(
  (config) => {
    // Modify the request config
    try {
      const token = loginLocalStorageHelper.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error while associating token');
    }

    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  },
);

export default instance;
