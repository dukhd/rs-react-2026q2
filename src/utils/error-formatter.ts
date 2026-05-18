import { HttpError, ValidationError } from '@/types/errors';

const SYSTEM_ERRORS = {
  FETCH_MESSAGE: 'Failed to fetch',
  TYPE_ERROR_NAME: 'TypeError',
};

const ERROR_TEXTS = {
  NETWORK: (statusText: string) => `Oops! ${statusText}. Please try again.`,
  NOT_FOUND: 'No characters found. Try a different name.',
  VALIDATION: 'Data validation failed.',
  FETCH_FAILED: 'Network failure or API limit reached. Please try again later.',
  DEFAULT: 'Oops! Something went wrong. Please try again.',
};

export const formatErrorMessage = (error: unknown): string => {
  if (error instanceof HttpError) {
    if (error.status === 404) return ERROR_TEXTS.NOT_FOUND;
    return ERROR_TEXTS.NETWORK(error.statusText);
  }
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
};
