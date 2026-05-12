interface Props {
  page: number | string;
  isActive: boolean;
  isDisabled: boolean;
  onClick: (page: number | string) => void;
}

const PaginationItem = ({ page, isActive, isDisabled, onClick }: Props) => {
  const isDots = page === '...';
  const activeClassName = isActive ? 'bg-pagination-active' : 'bg-white';

  if (isDots) {
    return (
      <span className="text-second px-1 text-xl font-bold sm:px-3">...</span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onClick(page)}
      disabled={isDisabled}
      className={`text-second border-border-main shadow-card cursor-pointer rounded-xl border-2 px-2 py-1 text-sm font-bold tracking-wide uppercase transition-all duration-300 ease-in-out hover:not-disabled:shadow-none disabled:cursor-not-allowed disabled:opacity-40 sm:px-5 sm:text-base md:text-lg ${activeClassName}`}
    >
      {page}
    </button>
  );
};

export default PaginationItem;
