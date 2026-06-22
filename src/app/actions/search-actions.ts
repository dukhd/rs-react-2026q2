'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function handleSearchAction(formData: FormData): Promise<never> {
  const search = (formData.get('search') as string) || '';
  const page = (formData.get('page') as string) || '1';

  const headersList = await headers();
  const referer = headersList.get('referer') || '/';

  const url = new URL(referer);

  const params = url.searchParams;

  if (search.trim()) {
    params.set('search', search.trim());
  } else {
    params.delete('search');
  }

  params.set('page', page);

  const queryString = params.toString();
  const redirectPath = queryString
    ? `${url.pathname}?${queryString}`
    : url.pathname;

  redirect(redirectPath);
}
