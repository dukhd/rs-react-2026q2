import { PureComponent } from 'react';

import Image from './image';

interface CardProps {
  src: string;
  title: string;
  description: string;
}

class Card extends PureComponent<CardProps> {
  render() {
    const { src, title, description } = this.props;

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
