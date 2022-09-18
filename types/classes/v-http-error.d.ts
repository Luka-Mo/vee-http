export interface VHttpError extends Error {
  status: number;
  message: string;
}