'use client';

import { useSearchParams } from 'next/navigation';
import type { JSX } from 'react';

import { Link } from '@/i18n/routing';
import type { CharacterSchema } from '@/types/interfaces';

import Card from './card';

interface CardListProps {
  cards: CharacterSchema[];
  isSidebarOpen?: boolean;
}

const CardList = ({
  cards,
  isSidebarOpen = false,
}: CardListProps): JSX.Element => {
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  const gridColsClasses = isSidebarOpen
    ? 'grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'
    : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';

  return (
    <ul className={`mx-auto grid w-full max-w-350 gap-6 ${gridColsClasses}`}>
      {cards.map((card, index) => {
        const href = queryString
          ? `/character/${card.id}?${queryString}`
          : `/character/${card.id}`;

        return (
          <li
            key={card.id}
            className="w-full max-w-100 min-w-50 list-none justify-self-center"
          >
            <Link href={href} className="block w-full text-left">
              <Card card={card} priority={index < 4} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default CardList;
