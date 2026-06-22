'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function handleSearchAction(formData: FormData): Promise<never> {
  const search = (formData.get('search') as string) || '';
  const page = (formData.get('page') as string) || '1';

  const params = new URLSearchParams();
  if (search.trim()) {
    params.set('search', search.trim());
  }
  if (page !== '1') {
    params.set('page', page);
  }

  const headersList = await headers();
  const referer = headersList.get('referer') || '/';

  const url = new URL(referer);
  const pathname = url.pathname;

  const queryString = params.toString();
  const redirectPath = queryString ? `${pathname}?${queryString}` : pathname;

  redirect(redirectPath);
}
