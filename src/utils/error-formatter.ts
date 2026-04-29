import { HttpError, ValidationError } from '@/types/errors';

const SYSTEM_ERRORS = {
  FETCH_MESSAGE: 'Failed to fetch',
  TYPE_ERROR_NAME: 'TypeError',
};

const ERROR_TEXTS = {
  NETWORK: (status: number) => `Network Error (${status})`,
  VALIDATION: 'Data validation failed',
  FETCH_FAILED: 'Network failure or API limit reached. Please try again later.',
  DEFAULT: 'Oops! Something went wrong',
};

export class ErrorFormatter {
  public getMessage(error: unknown): string {
    if (error instanceof HttpError) return ERROR_TEXTS.NETWORK(error.status);
    if (error instanceof ValidationError) return ERROR_TEXTS.VALIDATION;
    if (error instanceof Error) {
      const isSystemNetworkError =
        error.message === SYSTEM_ERRORS.FETCH_MESSAGE ||
        error.name === SYSTEM_ERRORS.TYPE_ERROR_NAME;

      if (isSystemNetworkError) {
        return ERROR_TEXTS.FETCH_FAILED;
      }
      return error.message;
    }
    return ERROR_TEXTS.DEFAULT;
  }
}
