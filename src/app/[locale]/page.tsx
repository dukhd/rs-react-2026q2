import HomePage from '@/components/home/home-page';
import { CHARACTER_URL } from '@/constants/api-url';
import type { AllCharactersSchema } from '@/types/interfaces';

import { handleSearchAction } from '../actions/search-actions';

interface PageProps {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
}

interface ServerFetchResult {
  data: AllCharactersSchema | null;
  error: { status: number } | { status: 'FETCH_ERROR' } | null;
}

async function fetchCharacters(
  searchTerm = '',
  page = '1'
): Promise<ServerFetchResult> {
  try {
    const res = await fetch(
      `${CHARACTER_URL}/?name=${searchTerm}&page=${page}`,
      {
        next: { revalidate: Number(process.env.NEXT_PUBLIC_CACHE_TTL) || 120 },
      }
    );

    if (res.status === 404) {
      return { data: null, error: { status: 404 } };
    }

    if (!res.ok) {
      return { data: null, error: { status: res.status } };
    }

    const data = await res.json();
    return { data, error: null };
  } catch (error) {
    console.error('Server fetch failed:', error);
    return { data: null, error: { status: 'FETCH_ERROR' } };
  }
}

export default async function Page({ searchParams }: Readonly<PageProps>) {
  const resolvedSearchParams = await searchParams;

  const query = resolvedSearchParams.search || '';
  const page = resolvedSearchParams.page || '1';

  const { data, error } = await fetchCharacters(query, page);

  return (
    <HomePage
      serverData={data}
      serverError={error}
      initialQuery={query}
      initialPage={Number(page)}
      onSearch={handleSearchAction}
    />
  );
}
