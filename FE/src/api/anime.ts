import { http, unwrap } from './http.ts';
import type { ApiResponse } from './types.ts';

export type IdolType = 'School' | 'Professional' | 'Virtual' | 'Band' | 'Khác';
export type AnimationFormat = 'TV' | 'Movie' | 'OVA' | 'ONA';
export type SongType = 'OP' | 'ED' | 'Insert' | 'Khác';

export type Character = {
  id: number;
  name: string;
  seiyuu?: string;
  role?: string;
  imageUrl?: string;
};

export type IdolGroup = {
  id: number;
  name: string;
  description?: string;
  characters?: Character[];
};

export type Song = {
  id: number;
  title: string;
  artist?: string;
  songType: SongType;
  youtubeUrl?: string;
};

export type Anime = {
  id: number;
  title: string;
  description?: string;
  idolType: IdolType;
  animationFormat: AnimationFormat;
  franchise?: string;
  studio: string;
  releaseYear?: number;
  posterUrl?: string;
  idolGroups?: IdolGroup[];
  songs?: Song[];
  createdAt?: string;
  updatedAt?: string;
};

export type AnimeListQuery = {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
  idolType?: IdolType;
  animationFormat?: AnimationFormat;
};

export type PaginationMeta = {
  totalItems: number;
  currentPage: number;
  limit: number;
  totalPages: number;
};

export type AnimeListResult = {
  items: Anime[];
  paginationMeta: PaginationMeta;
};

export type CreateAnimeRequest = {
  title: string;
  description?: string;
  idolType: IdolType;
  animationFormat: AnimationFormat;
  franchise?: string;
  studio: string;
  releaseYear?: number;
  posterUrl?: string;
};

export type UpdateIdolGroupDto = {
  id?: number;
  name?: string;
  description?: string;
};

export type UpdateSongDto = {
  id?: number;
  title?: string;
  artist?: string;
  songType?: SongType;
  youtubeUrl?: string;
};

export type UpdateAnimeRequest = {
  title?: string;
  description?: string;
  idolType?: IdolType;
  animationFormat?: AnimationFormat;
  franchise?: string;
  studio?: string;
  releaseYear?: number;
  posterUrl?: string;
  idolGroups?: UpdateIdolGroupDto[];
  songs?: UpdateSongDto[];
};

export async function getAllAnime(params?: AnimeListQuery): Promise<AnimeListResult> {
  const res = await http.get<ApiResponse<AnimeListResult>>('/anime/all', { params });
  return unwrap(res.data);
}

export async function getAnimeById(id: number): Promise<Anime> {
  const res = await http.get<ApiResponse<Anime>>(`/anime/${id}`);
  return unwrap(res.data);
}

export async function createAnime(payload: CreateAnimeRequest): Promise<Anime> {
  const res = await http.post<ApiResponse<Anime>>('/anime/create', payload);
  return unwrap(res.data);
}

export async function deleteAnime(id: number): Promise<void> {
  const res = await http.delete<ApiResponse<void>>(`/anime/${id}`);
  unwrap(res.data);
}

export async function updateAnime(id: number, payload: UpdateAnimeRequest): Promise<void> {
  const res = await http.patch<ApiResponse<void>>(`/anime/${id}`, payload);
  unwrap(res.data);
}
