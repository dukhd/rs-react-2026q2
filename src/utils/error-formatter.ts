import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useTranslations } from 'next-intl';

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

type TranslationFunction = ReturnType<typeof useTranslations>;

export const formatErrorMessage = (
  error: unknown,
  t: TranslationFunction
): string => {
  if (!error) return t('default');
  if (isValidationError(error)) return t('validation');
  if (!isFetchBaseQueryError(error)) return t('default');

  if (error.status === 'FETCH_ERROR') {
    return t('fetchFailed');
  }

  if (typeof error.status === 'number') {
    if (error.status === 404) return t('notFound');
    return t('network', { statusText: getApiErrorMessage(error) });
  }

  return t('default');
};
