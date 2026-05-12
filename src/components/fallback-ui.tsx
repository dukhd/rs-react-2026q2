import type { JSX } from 'react';

import fallbackImage from '@/assets/images/rick-and-morty-30973.webp';

import Button from './ui/button';

const FALLBACK_CONTENT = {
  TITLE: 'Oooooops! Something went wrong!',
  IMG_ALT: 'The main characters of Rick and Morty',
};

interface Props {
  onReturn: () => void;
}

const FallbackUI = ({ onReturn }: Props): JSX.Element => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-5 py-10">
      <h1 className="text-second text-center text-3xl font-medium tracking-wide">
        {FALLBACK_CONTENT.TITLE}
      </h1>
      <img
        src={fallbackImage}
        alt={FALLBACK_CONTENT.IMG_ALT}
        width={350}
        className="w-full max-w-87.5 object-cover"
      />
      <Button text="Try again" type="button" onClick={onReturn} />
    </div>
  );
};

export default FallbackUI;
