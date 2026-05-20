import type { JSX } from 'react';

interface CheckboxProps {
  id: number;
  name: string;
}

const Checkbox = ({ id, name }: CheckboxProps): JSX.Element => {
  const stringId = id.toString();

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  return (
    <label
      htmlFor={stringId}
      className="absolute top-2 left-2 z-150 flex h-10 w-10 cursor-pointer items-center justify-center select-none"
    >
      <input
        type="checkbox"
        id={stringId}
        name={name}
        checked={false}
        onChange={handleToggle}
        onClick={(e) => e.stopPropagation()}
        className="peer absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
        aria-label={`Add "${name}" to favorites`}
      />

      <div className="group bg-card-bg border-card-border shadow-card peer-hover:shadow-card-hover flex h-10 w-10 items-center justify-center rounded-2xl border-3 transition-all duration-300 ease-in-out">
        <div className="bg-accent-blue h-0 w-0 rounded-lg opacity-0 transition-all duration-200 ease-in-out group-peer-checked:h-5 group-peer-checked:w-5 group-peer-checked:opacity-100"></div>
      </div>
    </label>
  );
};

export default Checkbox;
