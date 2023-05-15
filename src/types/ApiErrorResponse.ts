import type { ErrorDetails } from "$lib/api";

export interface ApiErrorResponse {
  status: number;
  apiCode: string;
  apiFields?: { [key: string]: Array<string>; } | null;
  details?: ErrorDetails | null;
}
