// src/services/api.ts
import axios from 'axios';
import { LoginResponse, RegisterResponse, User } from '../types/apiTypes';
import axiosInstance from './axiosInstance';



export const fetchProtectedData = async () => {
  const token = localStorage.getItem('token');
  return axiosInstance.get('/protected', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const registerUser = async (userData: any): Promise<RegisterResponse> => {
  const response = await  axiosInstance.post<RegisterResponse>('/auth/register', userData);
  return response.data; 
};

export const loginUser = async (credentials: any): Promise<LoginResponse> => {
  const response = await  axiosInstance.post<LoginResponse>('/auth/login', credentials);
  return response.data; 
};

export const fetchUser = async (id: string, token: string): Promise<User> => {
  const response = await axiosInstance.get<User>(`/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchUsers = async (token: string): Promise<{ data: User[] }> => {
  const response = await axiosInstance.get<User[]>('/users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return { data: response.data }; 
};


export const createUser = async (userData: User, token: string): Promise<User> => {
  const response = await axiosInstance.post<User>('/users', userData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Define a type for the expected response
type SetPasswordResponse = {
  message: string;
};

// Update the setUserPassword function
export const setUserPassword = async (
  data: { email: string; token: string; newPassword: string }
): Promise<SetPasswordResponse> => {
  const response = await axiosInstance.post<SetPasswordResponse>('/set-password', data);
  return response.data; 
};



export const updateUser = async (id: number, userData: User, token: string): Promise<User> => {
  const response = await axiosInstance.put<User>(`/users/${id}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; // This should be of type User
};

export const deleteUser = async (id: number, token: string) => {
  return await axiosInstance.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
