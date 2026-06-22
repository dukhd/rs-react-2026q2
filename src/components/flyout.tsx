import { useTranslations } from 'next-intl';

import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks';
import { unselectAll } from '@/store/selected-cards-slice';
import { downloadCharactersCSV } from '@/utils/download-csv';

import Button from './ui/button';

const Flyout = () => {
  const t = useTranslations('Flyout');
  const dispatch = useAppDispatch();
  const selectedCards = useAppSelector((state) => state.selectedCards.cards);
  const count = selectedCards.length;

  const handleUnselectAll = () => {
    dispatch(unselectAll());
  };

  const handleDownload = () => {
    downloadCharactersCSV(selectedCards);
  };

  return (
    <aside
      aria-label="Selected items actions"
      className="flex flex-col items-center gap-2 sm:flex-row sm:gap-8"
    >
      <span className="min-w-30 text-xl font-semibold uppercase tabular-nums">
        {t('text')}: {count}
      </span>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button
          type="button"
          text={t('downloadBtn')}
          onClick={handleDownload}
          customClassName="bg-accent text-second px-6 py-1 text-sm sm:text-base"
        />
        <Button
          type="reset"
          text={t('resetBtn')}
          onClick={handleUnselectAll}
          customClassName="bg-btn-red text-btn-red-text px-6 py-1 text-sm sm:text-base"
        />
      </div>
    </aside>
  );
};

export default Flyout;
