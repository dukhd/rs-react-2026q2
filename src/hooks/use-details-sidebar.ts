import { useNavigate, useSearchParams } from 'react-router';

export const useDetailsSidebar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedDetailsId = searchParams.get('details');
  const isSidebarOpen = !!selectedDetailsId;

  const handleCloseDetails = () => {
    const currentParams = new URLSearchParams(searchParams);
    currentParams.delete('details');
    navigate(`/?${currentParams.toString()}`);
  };

  const handleCardClick = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const currentParams = new URLSearchParams(searchParams);
    currentParams.set('details', String(id));
    navigate(`/?${currentParams.toString()}`);
  };

  return { isSidebarOpen, handleCloseDetails, handleCardClick };
};
