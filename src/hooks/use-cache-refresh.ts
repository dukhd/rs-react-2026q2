import { useDispatch } from 'react-redux';

import { charactersApi } from '@/services/characters-api';

export const useCacheRefresh = () => {
  const dispatch = useDispatch();

  const refreshPage = (page: number, searchTerm: string) => {
    dispatch(
      charactersApi.util.invalidateTags([
        { type: 'Characters', id: `RESULT-${page}-${searchTerm}` },
      ])
    );
  };

  const refreshDetails = (id: number) => {
    dispatch(
      charactersApi.util.invalidateTags([
        { type: 'Characters', id: `DETAILS-${id}` },
      ])
    );
  };

  return { refreshPage, refreshDetails };
};
