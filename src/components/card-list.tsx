import { PureComponent } from 'react';

import type { CardData } from '@/types/interfaces';

import Card from './ui/card';

interface CardListProps {
  cards: CardData[];
}

class CardList extends PureComponent<CardListProps> {
  render() {
    const { cards } = this.props;

    return (
      <ul>
        {cards.map((card) => {
          return (
            <li key={card.id} className="list-none">
              <Card card={card} />
            </li>
          );
        })}
      </ul>
    );
  }
}

export default CardList;
