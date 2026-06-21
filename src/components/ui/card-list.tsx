import type { JSX } from 'react';

import type { CharacterSchema } from '@/types/interfaces';

import Card from './card';

interface CardListProps {
  cards: CharacterSchema[];
  onCardClick: (id: number, e: React.MouseEvent) => void;
  isSidebarOpen?: boolean;
}

const CardList = ({
  cards,
  onCardClick,
  isSidebarOpen = false,
}: CardListProps): JSX.Element => {
  const gridColsClasses = isSidebarOpen
    ? 'grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'
    : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
  return (
    <ul className={`mx-auto grid w-full max-w-350 gap-6 ${gridColsClasses}`}>
      {cards.map((card, index) => {
        return (
          <li
            key={card.id}
            className="w-full max-w-100 min-w-50 list-none justify-self-center"
          >
            <button
              onClick={(e) => onCardClick(card.id, e)}
              type="button"
              className="block w-full"
            >
              <Card card={card} priority={index < 4} />
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default CardList;
