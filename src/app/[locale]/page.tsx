import { redirect } from 'next/navigation';

import HomePage from '@/components/home/home-page';
import { CHARACTER_URL } from '@/constants/api-url';
import type { AllCharactersSchema } from '@/types/interfaces';

import { handleSearchAction } from '../actions/search-actions';

interface PageProps {
  params: Promise<{ locale: string }>;
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

export default async function Page({
  params,
  searchParams,
}: Readonly<PageProps>) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const locale = resolvedParams.locale;
  const paramKeys = Object.keys(resolvedSearchParams);
  const ALLOWED_PARAMS = new Set(['search', 'page']);
  const hasInvalidParam = paramKeys.some((key) => !ALLOWED_PARAMS.has(key));
  const pageParam = resolvedSearchParams.page;
  const isPageInvalid = pageParam !== undefined && !/^\d+$/.test(pageParam);

  if (hasInvalidParam || isPageInvalid) {
    redirect(`/${locale}/404`);
  }
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
