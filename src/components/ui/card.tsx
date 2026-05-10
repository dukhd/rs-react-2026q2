import type { JSX } from 'react';

import type { CharacterSchema } from '@/types/interfaces';

import Image from './image';

interface CardProps {
  card: CharacterSchema;
  priority?: boolean;
}

const LABELS = {
  NAME: 'Name',
  DESCRIPTION: 'Description',
  STATUS: 'Status',
  SPECIES: 'Species',
  GENDER: 'Gender',
} as const;

const Card = ({ card, priority }: CardProps): JSX.Element => {
  return (
    <article className="border-accent shadow-card text-accent grid min-w-65 grid-cols-1 justify-stretch rounded-2xl border-4 tracking-wide sm:grid-cols-[220px_1fr] sm:gap-3">
      <Image src={card.image} alt={card.name} size="s" priority={priority} />
      <div className="flex flex-col justify-between p-3 sm:pl-0">
        <header className="mb-3">
          <span className="text-sm">{LABELS.NAME}</span>
          <hr />
          <h2 className="line-clamp-1 overflow-hidden text-xl font-bold text-ellipsis">
            {card.name}
          </h2>
        </header>
        <main>
          <span className="text-sm">{LABELS.DESCRIPTION}</span>
          <hr />
          <dl>
            <div className="flex flex-row justify-between text-base">
              <dt className="font-bold">{LABELS.STATUS}:</dt>
              <dd>{card.status}</dd>
            </div>
            <div className="flex flex-row justify-between text-base">
              <dt className="font-bold">{LABELS.SPECIES}:</dt>
              <dd>{card.species}</dd>
            </div>
            <div className="flex flex-row justify-between text-base">
              <dt className="font-bold">{LABELS.GENDER}:</dt>
              <dd>{card.gender}</dd>
            </div>
          </dl>
        </main>
      </div>
    </article>
  );
};

export default Card;
