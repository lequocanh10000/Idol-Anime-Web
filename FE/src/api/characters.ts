import { http, unwrap } from './http.ts';
import type { ApiResponse } from './types.ts';

export type Character = {
  id: number;
  idolGroupId: number;
  name: string;
  seiyuu?: string;
  role?: string;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateCharacterRequest = {
  idolGroupId: number;
  name: string;
  seiyuu?: string;
  role?: string;
  imageUrl?: string;
};

export type UpdateCharacterRequest = Partial<CreateCharacterRequest>;

export async function createCharacter(payload: CreateCharacterRequest): Promise<{ character: Character, message: string }> {
  const res = await http.post<ApiResponse<Character>>('/characters/create', payload);
  return { character: unwrap(res.data), message: res.data.message };
}

export async function updateCharacter(id: number, payload: UpdateCharacterRequest): Promise<Character> {
  const res = await http.patch<ApiResponse<Character>>(`/characters/${id}`, payload);
  return unwrap(res.data);
}

export async function deleteCharacter(id: number): Promise<void> {
  const res = await http.delete<ApiResponse<void>>(`/characters/${id}`);
  unwrap(res.data);
}
