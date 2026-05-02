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
      <ul className="grid grid-cols-[repeat(auto-fit,500px)] justify-center gap-x-8 gap-y-6">
        {cards.map((card, index) => {
          return (
            <li key={card.id} className="w-125 list-none">
              <Card card={card} priority={index < 2} />
            </li>
          );
        })}
      </ul>
    );
  }
}

export default CardList;
