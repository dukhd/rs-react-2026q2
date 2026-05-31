import { useSearchParams } from 'react-router';

export const useDetailsSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedDetailsId = searchParams.get('details');
  const isSidebarOpen = !!selectedDetailsId;

  const handleCloseDetails = () => {
    setSearchParams((prev) => {
      prev.delete('details');
      return prev;
    });
  };

  const handleCardClick = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSearchParams((prev) => {
      prev.set('details', String(id));
      return prev;
    });
  };

  return { isSidebarOpen, handleCloseDetails, handleCardClick };
};
