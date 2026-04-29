import { PureComponent } from 'react';

import type { CardData } from '@/types/interfaces';

import Image from './image';

interface CardProps {
  card: CardData;
}

class Card extends PureComponent<CardProps> {
  render() {
    const { image, name, status, species } = this.props.card;

    return (
      <div>
        <Image src={image} alt={`${name} avatar`} size="s" />
        <div>
          <h2>{name}</h2>
          <p>Status: {status}</p>
          <p>Species: {species}</p>
        </div>
      </div>
    );
  }
}

export default Card;
