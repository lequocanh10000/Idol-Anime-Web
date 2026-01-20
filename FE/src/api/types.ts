export type ApiResponse<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
  error?: unknown;
  date?: string;
  path?: string;
  takenTime?: string;
};

export class ApiError extends Error {
  readonly statusCode?: number;
  readonly details?: unknown;

  constructor(message: string, opts?: { statusCode?: number; details?: unknown }) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = opts?.statusCode;
    this.details = opts?.details;
  }
}
