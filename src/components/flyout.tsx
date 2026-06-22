import { useTranslations } from 'next-intl';
import { useState, useTransition } from 'react';

import { generateCSVAction } from '@/app/actions/csv-actions';
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks';
import { unselectAll } from '@/store/selected-cards-slice';

import Button from './ui/button';

const Flyout = () => {
  const t = useTranslations('Flyout');
  const dispatch = useAppDispatch();
  const selectedCards = useAppSelector((state) => state.selectedCards.cards);
  const count = selectedCards.length;

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleUnselectAll = () => {
    dispatch(unselectAll());
  };

  const handleDownload = () => {
    setError(null);
    startTransition(async () => {
      const result = await generateCSVAction(selectedCards);

      if (result.success && result.data) {
        try {
          const blob = new Blob([result.data], {
            type: 'text/csv;charset=utf-8;',
          });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');

          link.href = url;
          link.download = `${count}_characters.csv`;
          link.style.visibility = 'hidden';

          document.body.appendChild(link);
          link.click();

          link.remove();
          URL.revokeObjectURL(url);
        } catch (error) {
          console.warn('Failed to download CSV:', error);
        }
      } else if (result.error) {
        setError(result.error);
      }
    });
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
          text={isPending ? '...' : t('downloadBtn')}
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
      {error && (
        <span className="absolute right-0 -bottom-5 left-0 text-center text-xs text-red-500">
          {error}
        </span>
      )}
    </aside>
  );
};

export default Flyout;
