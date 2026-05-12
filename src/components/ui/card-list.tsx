import type { JSX } from 'react';

import type { CharacterSchema } from '@/types/interfaces';

import Card from './card';

interface CardListProps {
  cards: CharacterSchema[];
}

const CardList = ({ cards }: CardListProps): JSX.Element => {
  return (
    <ul className="mx-auto grid max-w-350 grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {cards.map((card, index) => {
        return (
          <li
            key={card.id}
            className="w-full max-w-100 min-w-50 list-none justify-self-center"
          >
            <Card card={card} priority={index < 2} />
          </li>
        );
      })}
    </ul>
  );
};

export default CardList;
