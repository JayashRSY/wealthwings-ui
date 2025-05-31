import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import { store } from "../../store";
import { setAccessToken, setUser } from "../../features/auth/authSlice";
import { RefreshResponse } from "../../interfaces/IAuthTypes";
import { jwtDecode } from "jwt-decode";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important for sending cookies with requests
});

// Failed request queue during refresh
let isRefreshing = false;
let failedRequestsQueue: {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedRequestsQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else if (token) {
      resolve(token);
    }
  });
  failedRequestsQueue = [];
};

// Decode token and return expiry
const getTokenExpiry = (token: string): number | null => {
  try {
    const { exp } = jwtDecode<{ exp: number }>(token);
    return exp ? exp * 1000 : null;
  } catch {
    return null;
  }
};

// Set proactive token refresh
let refreshTimeout: NodeJS.Timeout | null = null;
const setupTokenRefresh = (token: string) => {
  const expiry = getTokenExpiry(token);
  console.log("🚀 ~ file: axiosInstance.ts:46 ~ expiry:", expiry);
  if (!expiry) {
    return;
  }

  const now = Date.now();
  const refreshIn = expiry - now - 60_000; // Refresh 1 min before expiry
  console.log("🚀 ~ file: axiosInstance.ts:50 ~ refreshIn:", refreshIn);

  if (refreshTimeout) {
    clearTimeout(refreshTimeout);
  }

  if (refreshIn > 0) {
    refreshTimeout = setTimeout(() => {
      refreshAccessToken();
    }, refreshIn);
  }
};

// Manual refresh call
const refreshAccessToken = async () => {
  try {
    const response = await axiosInstance.post<RefreshResponse>(
      "/api/auth/refresh",
      {},
      {
        withCredentials: true,
      }
    );

    const { accessToken, data: user } = response.data;

    store.dispatch(setAccessToken(accessToken));
    store.dispatch(setUser(user));

    setupTokenRefresh(accessToken); // reset proactive timer

    return accessToken;
  } catch (err) {
    store.dispatch(setAccessToken(undefined));
    store.dispatch(setUser(undefined));
    window.location.href = "/login";
    throw err;
  }
};

// Attach access token
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = store.getState().auth.accessToken;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercept 401 for refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // Avoid refresh loop
    if (
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/register")
    ) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            resolve: (token: string) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              resolve(axiosInstance(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        const newToken = await refreshAccessToken();
        processQueue(null, newToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }

        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err as Error);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// Initialize proactive token refresh on app load
const token = store.getState().auth.accessToken;
if (token) {
  setupTokenRefresh(token);
}

export default axiosInstance;
