import { PureComponent } from 'react';

import type { CharacterSchema } from '@/types/interfaces';

import Card from './card';

interface CardListProps {
  cards: CharacterSchema[];
}

class CardList extends PureComponent<CardListProps> {
  render() {
    const { cards } = this.props;

    return (
      <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-x-8 gap-y-6 lg:grid-cols-2">
        {cards.map((card, index) => {
          return (
            <li
              key={card.id}
              className="w-full max-w-125 list-none justify-self-center"
            >
              <Card card={card} priority={index < 2} />
            </li>
          );
        })}
      </ul>
    );
  }
}

export default CardList;
