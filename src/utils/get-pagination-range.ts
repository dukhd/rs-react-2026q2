export const getPaginationRange = (currentPage: number, totalPages: number) => {
  const delta = 1;
  const range = [];
  const rangeWithDots = [];
  let l;

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
    if (l) {
      if (i - l > 1) {
        rangeWithDots.push('...');
      } else if (i - l === 2) {
        rangeWithDots.push(l + 1);
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
};
