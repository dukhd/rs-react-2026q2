import type { JSX } from 'react';

import type { CharacterSchema } from '@/types/interfaces';

import Badge from './badge';
import Image from './image';

interface CardProps {
  card: CharacterSchema;
  priority?: boolean;
}

const LABELS = {
  SPECIES: 'Species',
  GENDER: 'Gender',
} as const;

const Card = ({ card, priority }: CardProps): JSX.Element => {
  return (
    <article className="bg-card-bg border-card-border shadow-card text-card-text hover:shadow-card-hover relative z-20 cursor-pointer rounded-2xl border-3 tracking-wide transition-all duration-300 ease-in-out hover:scale-105 hover:rotate-1">
      <header className="border-card-border relative border-b-4">
        <Badge status={card.status} />
        <Image src={card.image} alt={card.name} priority={priority} />
      </header>
      <main className="p-3">
        <h2 className="text-card-title line-clamp-1 overflow-hidden text-xl font-bold text-ellipsis">
          {card.name}
        </h2>
        <dl className="mt-4 flex flex-col gap-2">
          <div className="bg-card-sub-bg flex flex-row justify-between rounded-sm border-2 border-transparent p-1 text-sm">
            <dt className="text-card-sub-title font-bold uppercase">
              {LABELS.SPECIES}:
            </dt>
            <dd className="text-card-text font-bold">{card.species}</dd>
          </div>
          <div className="bg-card-sub-bg flex flex-row justify-between rounded-sm border-2 border-transparent p-1 text-sm">
            <dt className="text-card-sub-title font-bold uppercase">
              {LABELS.GENDER}:
            </dt>
            <dd className="text-card-text font-bold">{card.gender}</dd>
          </div>
        </dl>
      </main>
    </article>
  );
};

export default Card;
