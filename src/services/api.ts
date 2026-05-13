import { HttpError, ValidationError } from '@/types/errors';

type Validator<T> = (data: unknown) => data is T;

const apiService = async <T>(
  url: string,
  validator: Validator<T>,
  signal?: AbortSignal
): Promise<T> => {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new HttpError(response.status, response.statusText);
  }

  const data: unknown = await response.json();

  if (!validator(data)) {
    throw new ValidationError();
  }

  return data;
};

export default apiService;
