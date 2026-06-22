'use client';
import '@/app/globals.css';

import { useRouter } from 'next/navigation';
import { type JSX } from 'react';

const GlobalNotFound = (): JSX.Element => {
  const router = useRouter();
  return (
    <div className="flex min-h-[calc(100vh-(--spacing(42)))] items-center justify-center">
      <div className="flex max-w-120 flex-col items-center gap-3 text-center">
        <h2 className="mb-7 text-8xl font-bold">
          <p>404</p>
          <p className="text-lg">Page Not Found</p>
        </h2>
        <button
          type="button"
          onClick={() => router.push('/')}
          className="bg-accent text-second border-border-main shadow-card cursor-pointer rounded-xl border-3 px-7 py-2 text-sm font-bold tracking-wide uppercase transition-shadow duration-300 ease-in-out hover:shadow-none sm:text-base md:text-lg"
        >
          Return home
        </button>
      </div>
    </div>
  );
};

export default GlobalNotFound;
