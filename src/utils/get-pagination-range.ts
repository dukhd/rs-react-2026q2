type PaginationItem = number | '...';

export const getPaginationRange = (
  currentPage: number,
  totalPages: number
): PaginationItem[] => {
  const delta = 1;
  const range: number[] = [];
  const rangeWithDots: PaginationItem[] = [];
  let previousPage: number | undefined;

  range.push(1);

  for (let i = currentPage - delta; i <= currentPage + delta; i += 1) {
    if (i > 1 && i < totalPages) {
      range.push(i);
    }
  }

  if (totalPages > 1) {
    range.push(totalPages);
  }

  for (const i of range) {
    if (previousPage) {
      if (i - previousPage > 1) {
        rangeWithDots.push('...');
      } else if (i - previousPage === 2) {
        rangeWithDots.push(previousPage + 1);
      }
    }
    rangeWithDots.push(i);
    previousPage = i;
  }

  return rangeWithDots;
};
