import { useTranslations } from 'next-intl';
import type { JSX } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks';
import { toggleItem } from '@/store/selected-cards-slice';
import type { CharacterSchema } from '@/types/interfaces';

interface CheckboxProps {
  card: CharacterSchema;
}

const Checkbox = ({ card }: CheckboxProps): JSX.Element => {
  const t = useTranslations('Checkbox');
  const dispatch = useAppDispatch();
  const selectedCards = useAppSelector((state) => state.selectedCards.cards);

  const stringId = card.id.toString();
  const isChecked = selectedCards.some((item) => item.id === card.id);

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    dispatch(toggleItem(card));
  };

  return (
    <label
      htmlFor={stringId}
      className="absolute top-2 left-2 z-150 flex h-10 w-10 cursor-pointer items-center justify-center select-none"
    >
      <input
        type="checkbox"
        id={stringId}
        name={card.name}
        checked={isChecked}
        onChange={handleToggle}
        onClick={(e) => e.stopPropagation()}
        className="peer absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
        aria-label={t('ariaLabel')}
      />

      <div className="group bg-checkbox-bg border-checkbox-border shadow-checkbox peer-hover:shadow-card-hover flex h-10 w-10 items-center justify-center rounded-2xl border-3 transition-all duration-300 ease-in-out">
        <div className="bg-checkbox-checked h-0 w-0 rounded-lg opacity-0 transition-all duration-200 ease-in-out group-peer-checked:h-5 group-peer-checked:w-5 group-peer-checked:opacity-100"></div>
      </div>
    </label>
  );
};

export default Checkbox;
