'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { type JSX, useState } from 'react';
interface ImageProps {
  alt: string;
  src: string;
  priority?: boolean;
}

const ImageComponent = ({
  src,
  alt,
  priority = false,
}: ImageProps): JSX.Element => {
  const t = useTranslations('ImageComponent');
  const [hasError, setHasError] = useState<boolean>(false);

  const handleError = (): void => {
    setHasError(true);
  };

  return (
    <div className="bg-img-placeholder relative flex aspect-square h-auto w-full items-center justify-center place-self-center overflow-hidden rounded-t-xl object-cover">
      {hasError ? (
        <span className="text-img-text-placeholder text-4 px-2 text-center font-semibold tracking-wide wrap-break-word">
          {t('empty')}
        </span>
      ) : (
        <Image
          src={src}
          alt={`${alt} ${t('alt')}`}
          fill
          sizes="(max-width: 640px) 100vw, 292.5px"
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          onError={handleError}
          className={`h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-110`}
        />
      )}
    </div>
  );
};

export default ImageComponent;
