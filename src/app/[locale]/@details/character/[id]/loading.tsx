import type { JSX } from 'react';

import Loader from '@/components/loader/loader';
export default function Loading(): JSX.Element {
  return (
    <div className="flex min-h-[50vh] w-full items-center justify-center">
      <Loader />
    </div>
  );
}
