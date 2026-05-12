import { type JSX, useState } from 'react';

import { getPaginationRange } from '@/utils/get-pagination-range';

import PaginationItem from './pagination-item';

interface PaginationProps {
  totalPages?: number;
}

const Pagination = ({ totalPages = 42 }: PaginationProps): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(1);

  const pages = getPaginationRange(currentPage, totalPages);

  const handlePageChange = (page: number | string) => {
    if (typeof page === 'number') {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2">
      <PaginationItem
        page="<"
        isActive={false}
        isDisabled={currentPage === 1}
        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
      />

      {pages.map((page, index) => {
        const itemKey =
          typeof page === 'number' ? `page-${page}` : `dots-${index}`;
        return (
          <PaginationItem
            key={itemKey}
            page={page}
            isDisabled={false}
            isActive={currentPage === page}
            onClick={() => typeof page === 'number' && handlePageChange(page)}
          />
        );
      })}

      <PaginationItem
        page=">"
        isActive={false}
        isDisabled={currentPage === totalPages}
        onClick={() =>
          currentPage < totalPages && handlePageChange(currentPage + 1)
        }
      />
    </div>
  );
};

export default Pagination;
