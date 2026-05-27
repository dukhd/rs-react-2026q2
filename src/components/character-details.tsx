import type { JSX } from 'react';
import { useOutletContext, useSearchParams } from 'react-router';

import Loader from '@/components/loader/loader';
import { useCacheRefresh } from '@/hooks/use-cache-refresh';
import { useGetCharacterDetailsQuery } from '@/services/characters-api';

import Button from './ui/button';
import Image from './ui/image';

interface OutletContextType {
  onClose: () => void;
}

const CharacterDetails = (): JSX.Element => {
  const { refreshDetails } = useCacheRefresh();
  const [searchParams] = useSearchParams();
  const { onClose } = useOutletContext<OutletContextType>();

  const detailsId = searchParams.get('details');
  const id = detailsId ? Number(detailsId) : 0;

  const {
    data: character,
    isLoading,
    isFetching,
    error,
  } = useGetCharacterDetailsQuery(id, { skip: !detailsId });

  if (isLoading || isFetching) {
    return (
      <div className="flex h-full w-full items-center justify-center py-20">
        <Loader />
      </div>
    );
  }

  if (error || !character) {
    return (
      <div className="flex flex-col gap-4 p-4 text-center">
        <p className="text-details-error font-bold">Failed to load details</p>
        <Button
          text="Close"
          type="button"
          onClick={onClose}
          customClassName="bg-btn-red text-btn-red-text px-4 py-2 text-xs sm:text-sm self-center"
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
      <div className="flex justify-between">
        <Button
          text="Refresh"
          type="button"
          onClick={() => refreshDetails(id)}
          customClassName={
            'bg-accent-yellow text-black px-4 py-2 text-xs sm:text-sm self-end'
          }
        />
        <Button
          text="x"
          type="button"
          onClick={onClose}
          customClassName={
            'bg-btn-red text-btn-red-text px-4 py-2 text-xs sm:text-sm self-end'
          }
        />
      </div>

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
            <h3 className="text-card-sub-title text-xs font-bold uppercase">
              {key}
            </h3>
            <p className="text-second text-base font-bold">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterDetails;
