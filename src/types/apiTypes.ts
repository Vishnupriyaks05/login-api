// src/types/apiTypes.ts
export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
  }
  
  export interface RegisterResponse {
    message: string;
    user: User;
  }
  
  
export interface User {
  id: number;
  first_name?: string;
  last_name?: string;
  email: string;
  phone?: string;
  password?: string;
  token?: string;
  
}

  
  export interface UserFormProps {
    user?: User;
  }

  export interface UserUpdate {
    id: number; // Required
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    token?: string;
  }

  export interface UserState {
    currentUser: User | null;
    userList: User[];
}