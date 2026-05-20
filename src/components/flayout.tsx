import Button from './ui/button';

const Flayout = () => {
  const count = 1;
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
      <span className="min-w-30 text-xl font-semibold uppercase tabular-nums">
        Selected: {count}
      </span>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button
          type="button"
          text="Download"
          customClassName="bg-accent text-second px-6 py-1 text-sm sm:text-base"
        />
        <Button
          type="reset"
          text="Unselect all"
          customClassName="bg-btn-red text-main px-6 py-1 text-sm sm:text-base"
        />
      </div>
    </div>
  );
};

export default Flayout;
