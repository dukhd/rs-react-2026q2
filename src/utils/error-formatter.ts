import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

const ERROR_TEXTS = {
  NETWORK: (statusText: string) => `Oops! ${statusText}. Please try again.`,
  NOT_FOUND: 'No characters found. Try a different name.',
  VALIDATION: 'Data validation failed.',
  FETCH_FAILED: 'Network failure or API limit reached. Please try again later.',
  DEFAULT: 'Oops! Something went wrong. Please try again.',
};

const isFetchBaseQueryError = (
  error: unknown
): error is FetchBaseQueryError => {
  return typeof error === 'object' && error !== null && 'status' in error;
};

const isValidationError = (error: unknown): boolean => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'name' in error &&
    error.name === 'ValidationError'
  );
};

const getApiErrorMessage = (error: FetchBaseQueryError): string => {
  const errorData = error.data;

  if (errorData && typeof errorData === 'object' && 'error' in errorData) {
    return String(errorData.error);
  }

  return `Status ${error.status}`;
};

export const formatErrorMessage = (error: unknown): string => {
  if (!error) return ERROR_TEXTS.DEFAULT;
  if (isValidationError(error)) return ERROR_TEXTS.VALIDATION;
  if (!isFetchBaseQueryError(error)) return ERROR_TEXTS.DEFAULT;

  if (error.status === 'FETCH_ERROR') {
    return ERROR_TEXTS.FETCH_FAILED;
  }

  if (typeof error.status === 'number') {
    if (error.status === 404) return ERROR_TEXTS.NOT_FOUND;

    return ERROR_TEXTS.NETWORK(getApiErrorMessage(error));
  }

  return ERROR_TEXTS.DEFAULT;
};
