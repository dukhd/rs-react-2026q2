import { useEffect, useReducer, useRef } from 'react';

import apiService from '@/services/api';
import { formatErrorMessage } from '@/utils/error-formatter';
import { fetchReducer } from '@/utils/fetch-reducer';

type Validator<T> = (data: unknown) => data is T;

export function useFetch<T>(url: string, validator: Validator<T>) {
  const [state, dispatch] = useReducer(fetchReducer<T>, {
    data: null,
    isLoading: true,
    error: null,
    currentUrl: url,
  });

  if (url !== state.currentUrl) {
    dispatch({ type: 'FETCH_INIT', payload: url });
  }

  const validatorRef = useRef(validator);
  useEffect(() => {
    validatorRef.current = validator;
  }, [validator]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const result = await apiService(
          url,
          validatorRef.current,
          controller.signal
        );

        if (!controller.signal.aborted) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result });
        }
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          const errorMessage = formatErrorMessage(error);
          dispatch({ type: 'FETCH_FAILURE', payload: errorMessage });
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url]);

  return {
    data: state.data,
    isLoading: state.isLoading,
    error: state.error,
  };
}
