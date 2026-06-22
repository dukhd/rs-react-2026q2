'use client';

import { useTranslations } from 'next-intl';

import Button from '@/components/ui/button';
import { useDetailsSidebar } from '@/hooks/use-details-sidebar';

export const CharacterDetailsActions = () => {
  const tDetails = useTranslations('CharacterDetails');
  const { handleCloseDetails, handleRefresh } = useDetailsSidebar();

  return (
    <div className="flex justify-between">
      <Button
        text={tDetails('btnRefresh')}
        type="button"
        onClick={handleRefresh}
        customClassName={
          'bg-accent-yellow text-black px-4 py-2 text-xs sm:text-sm self-end'
        }
      />
      <Button
        text="x"
        type="button"
        onClick={handleCloseDetails}
        customClassName={
          'bg-btn-red text-btn-red-text px-4 py-2 text-xs sm:text-sm self-end'
        }
      />
    </div>
  );
};

export const CharacterDetailsCloseButton = () => {
  const tDetails = useTranslations('CharacterDetails');
  const { handleCloseDetails } = useDetailsSidebar();

  return (
    <Button
      text={tDetails('btnClose')}
      type="button"
      onClick={handleCloseDetails}
      customClassName="bg-btn-red text-btn-red-text px-4 py-2 text-xs sm:text-sm self-center"
    />
  );
};
