import { apiRequest } from "./client";

export interface HealthResponse {
  status: string;
}

export function checkHealth(): Promise<HealthResponse> {
  return apiRequest<HealthResponse>("/health");
}
