'use client';

import type { JSX } from 'react';

interface SearchInputProps {
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const SearchInput = ({
  id,
  name,
  placeholder,
  value,
  onChange,
  disabled = false,
}: SearchInputProps): JSX.Element => {
  const baseClassName =
    'w-full h-10 sm:h-11 md:h-12 rounded-xl border-2 border-border-main bg-main shadow-general text-second text-sm sm:text-base md:text-lg tracking-wide font-semibold transition-colors duration-300 ease-in-out focus:outline-none focus:border-focus p-3 disabled:opacity-60 disabled:cursor-not-allowed';
  const placeholderClassName =
    'placeholder:text-second placeholder:font-normal placeholder:opacity-80';

  return (
    <>
      <label htmlFor={id} className="sr-only">
        {name}
      </label>
      <input
        type="search"
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`${baseClassName} ${placeholderClassName}`}
      />
    </>
  );
};

export default SearchInput;
