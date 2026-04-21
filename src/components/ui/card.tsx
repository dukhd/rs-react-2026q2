import { PureComponent } from 'react';

import type { CardData } from '@/types/interfaces';

import Image from './image';

interface CardProps {
  card: CardData;
}

class Card extends PureComponent<CardProps> {
  render() {
    const { src, title, description } = this.props.card;

    return (
      <div>
        <Image src={src} alt={`${title} poster`} size="s" />
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default Card;
