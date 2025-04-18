
export interface ServiceError {
  code: string;
  message: string;
  details?: string;
}

export interface RunwareErrorResponse {
  error: boolean;
  errors?: Array<{
    code: string;
    message: string;
  }>;
  errorMessage?: string;
}
