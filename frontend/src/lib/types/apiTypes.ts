 // Auth API Types =============================== //

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  user: User;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: string
}

export interface RegisterResponse {
  message: string;
  user: User;
}


// User API Types =============================== //

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER' | 'GUEST';
  createdAt?: string;

}