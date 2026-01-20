import { http, unwrap } from './http.ts';
import type { ApiResponse } from './types';

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResult = {
  accessToken: string;
};

export async function login(payload: LoginRequest): Promise<LoginResult> {
  const res = await http.post<ApiResponse<LoginResult>>('/auth/login', payload);
  return unwrap(res.data);
}
