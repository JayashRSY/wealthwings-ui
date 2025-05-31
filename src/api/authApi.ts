import axiosInstance from "@/lib/api/axiosInstance";
import {
  IGoogleResponse,
  IRefreshToken,
  ILoginResponse,
  ILogoutResponse,
  IRegisterResponse,
} from "../interfaces/IApiTypes";

export const login = async (email: string, password: string) => {
  const response = await axiosInstance.post<ILoginResponse>(
    '/auth/login',
    { email, password }
  );
  return response.data;
};

export const register = async (email: string, password: string) => {
  const response = await axiosInstance.post<IRegisterResponse>(
    '/auth/register',
    { email, password }
  );
  return response.data;
};

export const google = async (idToken: string) => {
  const response = await axiosInstance.post<IGoogleResponse>(
    '/auth/google',
    { idToken }
  );
  return response.data;
};

export const refresh = async () => {
  const response = await axiosInstance.get<IRefreshToken>('/auth/refresh');
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post<ILogoutResponse>(
    '/auth/logout'
  );
  return response.data;
};

export const forgotPassword = async (email: string) => {
  const response = await axiosInstance.post('/auth/forgot-password', {
    email,
  });
  return response.data;
};
export const resetPassword = async (token: string, password: string) => {
  const response = await axiosInstance.post('/auth/reset-password', {
    token,
    password,
  })
  return response.data;
}