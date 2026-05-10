import { type JSX, useState } from 'react';

import { type ImageSize, POSTER_SIZES } from '@/constants/image-variants';

interface ImageProps {
  alt: string;
  src: string;
  size: ImageSize;
  priority?: boolean;
}

const Image = ({
  src,
  alt,
  size,
  priority = false,
}: ImageProps): JSX.Element => {
  const [hasError, setHasError] = useState<boolean>(false);

  const handleError = (): void => {
    setHasError(true);
  };

  const sizeClassName = POSTER_SIZES[size];

  return (
    <div
      className={`${sizeClassName} flex items-center justify-center place-self-center overflow-hidden rounded-t-xl bg-gray-200 sm:rounded-l-xl sm:rounded-tr-none`}
    >
      {hasError ? (
        <span className="text-accent text-4 px-2 text-center font-semibold tracking-wide wrap-break-word">
          No image available
        </span>
      ) : (
        <img
          src={src}
          alt={`${alt} avatar`}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          onError={handleError}
          className={`h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-110`}
        />
      )}
    </div>
  );
};

export default Image;
