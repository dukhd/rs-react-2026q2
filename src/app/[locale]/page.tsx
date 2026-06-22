import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import CharactersContainer from '@/components/home/characters-container';
import Loader from '@/components/loader/loader';

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ search?: string; page?: string }>;
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

  return (
    <Suspense key={`${query}-${page}`} fallback={<Loader />}>
      <CharactersContainer query={query} page={page} />
    </Suspense>
  );
}
