// src/types/apiTypes.ts
export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
  }
  
  export interface RegisterResponse {
    message: string;
  }
  
  export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  }
  