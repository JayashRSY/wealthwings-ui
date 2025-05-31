import { RootState } from "../store";
import { setAccessToken, setUser } from "../features/auth/authSlice";
import { useCallback, useEffect, useState } from "react";
import { IUser } from "../interfaces/IApiTypes";
import axiosInstance from "@/lib/api/axiosInstance";
import { useAppSelector } from "./useRedux";
import { login as loginApi, logout as logoutApi } from "../api/authApi";

import { useAppDispatch } from "./useRedux";
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(
    (state: RootState) => state.auth.accessToken
  );
  const user = useAppSelector((state: RootState) => state.auth.user);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<null | string>(null);

  const fetchCurrentUser = useCallback(async () => {
    try {
      const response = await axiosInstance.get<{ user: IUser }>("/auth/me");
      dispatch(setUser(response.data.user));
      setAuthError(null);
    } catch (err) {
      setAuthError("Session expired");
      dispatch(setUser(undefined));
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const login = useCallback(
    async (credentials: { email: string; password: string }) => {
      try {
        const res = await loginApi(credentials.email, credentials.password);

        const { accessToken, user } = res;
        dispatch(setAccessToken(accessToken));
        dispatch(setUser(user));
        setAuthError(null);
      } catch (error: any) {
        setAuthError(error?.response?.data?.message || "Login failed");
      }
    },
    [dispatch]
  );

  const logout = useCallback(async () => {
    try {
      await logoutApi();
    } catch {
      // Ignore failure
    }
    dispatch(setAccessToken(undefined));
    dispatch(setUser(undefined));
    window.location.href = "/login"; // optional: redirect
  }, [dispatch]);

  const isAuthenticated = Boolean(accessToken && user);

  const hasRole = useCallback(
    (role: string | string[]) => {
      if (!user?.role) {
        return false;
      }
      if (Array.isArray(role)) {
        return role.includes(user.role);
      }
      return user.role === role;
    },
    [user]
  );

  useEffect(() => {
    // Try fetch user if token exists
    if (accessToken && !user) {
      fetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, [accessToken, user, fetchCurrentUser]);

  return {
    user,
    accessToken,
    isAuthenticated,
    login,
    logout,
    hasRole,
    loading,
    authError,
  };
};
