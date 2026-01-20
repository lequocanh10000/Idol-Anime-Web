import axios, {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { API_BASE_URL } from '../utils/env';
import { clearAccessToken, getAccessToken } from '../utils/storage';
import { ApiError, type ApiResponse } from './types';

export const http = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  (res: AxiosResponse) => res,
  (err: AxiosError<ApiResponse<unknown>>) => {
    const status = err.response?.status;
    const data = err.response?.data;

    if (data && typeof data === 'object' && 'message' in data) {
      const message = (data as ApiResponse<unknown>).message ?? 'Có lỗi xảy ra';
      if (status === 401) clearAccessToken();
      return Promise.reject(new ApiError(message, { statusCode: status, details: data }));
    }

    if (status === 401) clearAccessToken();

    return Promise.reject(
      new ApiError(err.message || 'Có lỗi xảy ra', { statusCode: status, details: data })
    );
  }
);

export function unwrap<T>(envelope: ApiResponse<T>): T {
  if (!envelope.success) {
    throw new ApiError(envelope.message || 'Có lỗi xảy ra', {
      statusCode: envelope.statusCode,
      details: envelope,
    });
  }
  return envelope.data as T;
}
