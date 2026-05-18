import type { JSX } from 'react';
import { useOutletContext, useSearchParams } from 'react-router';

import Loader from '@/components/loader/loader';
import { CHARACTER_URL } from '@/constants/api-url';
import { useFetch } from '@/hooks/use-fetch';
import { isCharacter } from '@/types/guards/is-character.guard';

import Button from './ui/button';
import Image from './ui/image';

interface OutletContextType {
  onClose: () => void;
}

const CharacterDetails = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  const { onClose } = useOutletContext<OutletContextType>();

  const detailsId = searchParams.get('details');

  const {
    data: character,
    isLoading,
    error,
  } = useFetch(`${CHARACTER_URL}/${detailsId}`, isCharacter);

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center py-20">
        <Loader />
      </div>
    );
  }

  if (error || !character) {
    return (
      <div className="flex flex-col gap-4 p-4 text-center">
        <p className="font-bold text-red-500">Failed to load details</p>
        <Button
          text="Close"
          type="button"
          onClick={onClose}
          customClassName="bg-[#FF4444] text-white px-4 py-2 text-xs sm:text-sm self-center"
        />
      </div>
    );
  }

  const detailsData = {
    status: character.status,
    species: character.species,
    gender: character.gender,
    type: character.type || 'Unknown',
    origin: character.origin.name,
    'last location': character.location.name,
  };

  return (
    <div className="flex flex-col gap-6">
      <Button
        text="x"
        type="button"
        onClick={onClose}
        customClassName={
          'bg-[#FF4444] text-white px-4 py-2 text-xs sm:text-sm self-end'
        }
      />
      <div className="shadow-about-card-1 border-second overflow-hidden rounded-2xl border-4">
        <Image src={character.image} alt={character.name} priority={true} />
      </div>

      <h2 className="text-4xl font-bold uppercase">{character.name}</h2>
      <div className="shadow-about-card-2 border-second flex flex-col items-start gap-3 rounded-2xl border-4 p-5">
        {Object.entries(detailsData).map(([key, value]) => (
          <div
            key={key}
            className="bg-sub-bg-gray flex w-full flex-col items-start gap-1 rounded-2xl p-2"
          >
            <h3 className="text-gray text-xs font-bold uppercase">{key}</h3>
            <p className="text-second text-base font-bold">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterDetails;
