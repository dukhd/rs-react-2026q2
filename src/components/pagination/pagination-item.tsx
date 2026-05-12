interface Props {
  page: number | string;
  isActive: boolean;
  isDisabled: boolean;
  onClick: (page: number | string) => void;
}

const PaginationItem = ({ page, isActive, isDisabled, onClick }: Props) => {
  const isDots = page === '...';
  const activeClassName = isActive
    ? 'bg-accent border-border-main shadow-card hover:shadow-none'
    : 'bg-white hover:not-disabled:bg-accent border-transparent';

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
      className={`text-second cursor-pointer rounded-xl border-2 px-2 py-1 text-sm font-bold tracking-wide uppercase transition-all duration-300 ease-in-out disabled:cursor-not-allowed disabled:opacity-40 sm:px-7 sm:py-2 sm:text-base md:text-lg ${activeClassName}`}
    >
      {page}
    </button>
  );
};

export default PaginationItem;
