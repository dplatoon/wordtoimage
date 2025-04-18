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

export interface ErrorAction {
  label: string;
  action: () => void;
}

export interface ErrorDisplay {
  title: string;
  description: string;
  action?: ErrorAction;
  severity: 'error' | 'warning' | 'info';
}
