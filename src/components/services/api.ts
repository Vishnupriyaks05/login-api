// src/services/api.ts
import axios from 'axios';
import { LoginResponse, RegisterResponse } from '../../types/apiTypes';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust the base URL based on your server's configuration
});

export const fetchUser = async (id: string, token: string) => {
  return await api.get(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const fetchProtectedData = async () => {
  const token = localStorage.getItem('token');
  return await axios.get('/api/protected', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const registerUser = async (userData: any): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>('/auth/register', userData);
  return response.data; 
};

export const loginUser = async (credentials: any): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', credentials);
  return response.data; 
};

export const fetchUsers = async (token: string) => {
  return await api.get('/users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = async (userData: any, token: string) => {
  return await api.post('/users', userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Define a type for the expected response
type SetPasswordResponse = {
  message: string;
};

// Update the setUserPassword function
export const setUserPassword = async (
  data: { email: string; token: string; newPassword: string }
): Promise<SetPasswordResponse> => {
  const response = await api.post<SetPasswordResponse>('/set-password', data);
  return response.data; 
};



export const updateUser = async (id: number, userData: any, token: string) => {
  return await api.put(`/users/${id}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteUser = async (id: number, token: string) => {
  return await api.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
