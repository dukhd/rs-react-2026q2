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
      <ul className="grid grid-cols-[repeat(auto-fit,500px)] justify-center gap-x-8 gap-y-6 p-4">
        {cards.map((card) => {
          return (
            <li key={card.id} className="w-125 list-none">
              <Card card={card} />
            </li>
          );
        })}
      </ul>
    );
  }
}

export default CardList;
