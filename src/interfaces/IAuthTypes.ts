export interface User {
  _id: string;
  name?: string;
  email: string;
  profilePicture?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  accessToken: string;
  data: User;
}

export interface RefreshResponse {
  success: boolean;
  message: string;
  accessToken: string;
  data: User;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}