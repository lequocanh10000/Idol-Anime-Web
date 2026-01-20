import { http, unwrap } from './http.ts';
import type { ApiResponse } from './types.ts';

export type User = {
  id: number;
  username: string;
  email: string;
  roleId: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
};

export type UserListQuery = {
  search?: string;
  roleId?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
};

export type PaginationMeta = {
  totalItems: number;
  currentPage: number;
  limit: number;
  totalPages: number;
};

export type UserListResult = {
  items: User[];
  paginationMeta: PaginationMeta;
};

export async function register(payload: RegisterRequest): Promise<User> {
  const res = await http.post<ApiResponse<User>>('/user/register', payload);
  return unwrap(res.data);
}

export async function getAllUsers(params?: UserListQuery): Promise<UserListResult> {
  const res = await http.get<ApiResponse<UserListResult>>('/user/all', { params });
  return unwrap(res.data);
}
