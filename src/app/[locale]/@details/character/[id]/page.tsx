import { getTranslations } from 'next-intl/server';
import { type JSX } from 'react';

import {
  CharacterDetailsActions,
  CharacterDetailsCloseButton,
} from '@/components/character-details-actions';
import ImageComponent from '@/components/ui/image';
import { CHARACTER_URL } from '@/constants/api-url';
import { CharacterSchema } from '@/types/interfaces';

interface CharacterDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function fetchCharacterData(id: string): Promise<CharacterSchema | null> {
  try {
    const res = await fetch(`${CHARACTER_URL}/${id}`, {
      next: { revalidate: Number(process.env.NEXT_PUBLIC_CACHE_TTL) || 120 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error('Server fetch for character failed:', error);
    return null;
  }
}

const CharacterDetails = async ({
  params,
}: Readonly<CharacterDetailsPageProps>): Promise<JSX.Element> => {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const tDetails = await getTranslations('CharacterDetails');

  const character = await fetchCharacterData(id);

  if (!character) {
    return (
      <div className="flex flex-col gap-4 p-4 text-center">
        <p className="text-details-error font-bold">{tDetails('notFound')}</p>
        <CharacterDetailsCloseButton />
      </div>
    );
  }

  const detailsData = {
    status: character.status,
    species: character.species,
    gender: character.gender,
    type: character.type || tDetails('unknownType'),
    origin: character.origin.name,
    lastLocation: character.location.name,
  };

  return (
    <div className="relative flex flex-col">
      <div className="flex flex-col gap-6 transition-opacity duration-200">
        <CharacterDetailsActions />
        <div className="shadow-about-card-1 border-second relative aspect-square h-83.25 w-83.25 overflow-hidden rounded-2xl border-4">
          <ImageComponent
            src={character.image}
            alt={character.name}
            priority={true}
          />
        </div>

        <h2 className="text-4xl font-bold uppercase">{character.name}</h2>
        <div className="shadow-about-card-2 border-second flex flex-col items-start gap-3 rounded-2xl border-4 p-5">
          {Object.entries(detailsData).map(([key, value]) => (
            <div
              key={key}
              className="bg-sub-bg-gray flex w-full flex-col items-start gap-1 rounded-2xl p-2"
            >
              <h3 className="text-card-sub-title text-xs font-bold uppercase">
                {tDetails(`labels.${key}`)}
              </h3>
              <p className="text-second text-base font-bold">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
