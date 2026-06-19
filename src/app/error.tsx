'use client';

import Image from 'next/image';
import { type JSX, useEffect } from 'react';

import fallbackImage from '@/assets/images/rick-and-morty-30973.webp';
import Button from '@/components/ui/button';

const FALLBACK_CONTENT = {
  TITLE: 'Oooooops! Something went wrong!',
  IMG_ALT: 'The main characters of Rick and Morty',
};

interface FallbackUIProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const FallbackUI = ({
  error,
  reset,
}: Readonly<FallbackUIProps>): JSX.Element => {
  useEffect(() => {
    console.error('Logged via Next.js error.tsx:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-5">
      <h1 className="text-second text-center text-3xl font-medium tracking-wide">
        {FALLBACK_CONTENT.TITLE}
      </h1>

      <Image
        src={fallbackImage}
        alt={FALLBACK_CONTENT.IMG_ALT}
        width={350}
        className="h-auto w-full max-w-87.5 object-cover"
        priority
      />

      <Button text="Try again" type="button" onClick={() => reset()} />
    </div>
  );
};

export default FallbackUI;
