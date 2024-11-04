// src/services/axiosInstance.ts
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://7986-103-182-167-248.ngrok-free.app/api', 
  timeout: 10000, 
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    if (token) {
      // Ensure config.headers is defined before adding the Authorization header
      if (!config.headers) {
        config.headers = {};
      }
      config.headers['Authorization'] = `Bearer ${token}`; // Add token to headers
    }
    return config; // Return the modified config
  },
  (error) => {
    return Promise.reject(error); // Handle error appropriately
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response; // Return the entire response object
  },
  (error) => {
    // Handle errors appropriately
    return Promise.reject(error); // Forward the error
  }
);

export default axiosInstance;
