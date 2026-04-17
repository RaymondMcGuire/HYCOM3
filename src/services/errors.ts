export class ServiceError extends Error {
  code: string;
  cause?: unknown;
  retryable: boolean;

  constructor(message: string, code = 'SERVICE_ERROR', cause?: unknown, retryable = false) {
    super(message);
    this.name = 'ServiceError';
    this.code = code;
    this.cause = cause;
    this.retryable = retryable;
  }
}

export function normalizeServiceError(
  error: unknown,
  fallbackMessage: string,
  code = 'SERVICE_ERROR',
  retryable = false
): ServiceError {
  if (error instanceof ServiceError) {
    return error;
  }

  if (error instanceof Error && error.message) {
    return new ServiceError(error.message, code, error, retryable);
  }

  return new ServiceError(fallbackMessage, code, error, retryable);
}
