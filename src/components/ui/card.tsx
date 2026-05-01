import { PureComponent } from 'react';

import type { CharacterSchema } from '@/types/interfaces';

import Image from './image';

interface CardProps {
  card: CharacterSchema;
}

const LABELS = {
  NAME: 'Name',
  DESCRIPTION: 'Description',
  STATUS: 'Status',
  SPECIES: 'Species',
  GENDER: 'Gender',
} as const;

class Card extends PureComponent<CardProps> {
  render() {
    const { image, name, status, species, gender } = this.props.card;

    return (
      <article className="grid grid-cols-[220px_1fr] gap-3 rounded-2xl border-2 border-[#497961] shadow-[6px_8px_0_0_#3D3D3D]">
        <Image src={image} alt={`${name} avatar`} size="s" />
        <div className="flex flex-col justify-between p-3 pl-0">
          <header className="mb-3">
            <span className="text-xs">{LABELS.NAME}</span>
            <hr />
            <h2 className="line-clamp-1 overflow-hidden text-xl font-bold text-ellipsis">
              {name}
            </h2>
          </header>

          <dl>
            <span className="text-xs">{LABELS.DESCRIPTION}</span>
            <hr />
            <div className="flex flex-row justify-between">
              <dt className="text-sm font-bold">{LABELS.STATUS}:</dt>
              <dd>{status}</dd>
            </div>
            <div className="flex flex-row justify-between">
              <dt className="text-sm font-bold">{LABELS.SPECIES}:</dt>
              <dd>{species}</dd>
            </div>
            <div className="flex flex-row justify-between">
              <dt className="text-sm font-bold">{LABELS.GENDER}:</dt>
              <dd>{gender}</dd>
            </div>
          </dl>
        </div>
      </article>
    );
  }
}

export default Card;
