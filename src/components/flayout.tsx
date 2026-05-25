import { useDispatch, useSelector } from 'react-redux';

import { unselectAll } from '@/store/selected-cards-slice';
import type { AppDispatch, RootState } from '@/store/store';
import { downloadCharactersCSV } from '@/utils/download-csv';

import Button from './ui/button';

const Flayout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedCards = useSelector(
    (state: RootState) => state.selectedCards.cards
  );
  const count = selectedCards.length;

  const handleUnselectAll = () => {
    dispatch(unselectAll());
  };

  const handleDownload = () => {
    downloadCharactersCSV(selectedCards);
  };

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
      <span className="min-w-30 text-xl font-semibold uppercase tabular-nums">
        Selected: {count}
      </span>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button
          type="button"
          text="Download"
          onClick={handleDownload}
          customClassName="bg-accent text-second px-6 py-1 text-sm sm:text-base"
        />
        <Button
          type="reset"
          text="Unselect all"
          onClick={handleUnselectAll}
          customClassName="bg-btn-red text-btn-red-text px-6 py-1 text-sm sm:text-base"
        />
      </div>
    </div>
  );
};

export default Flayout;
