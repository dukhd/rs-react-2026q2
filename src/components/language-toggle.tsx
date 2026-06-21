'use client';

import { useState } from 'react';
import { JSX } from 'react/jsx-runtime';

interface LanguageToggleProps {
  firstLanguage: string;
  secondLanguage: string;
}
const LanguageToggle = ({
  firstLanguage,
  secondLanguage,
}: LanguageToggleProps): JSX.Element => {
  const [isSecondActive, setIsSecondActive] = useState(false);

  const handleToggle = () => {
    const newState = !isSecondActive;
    setIsSecondActive(newState);
  };

  return (
    <button
      onClick={handleToggle}
      aria-label="Toggle language"
      className="border-accent bg-toggle-bg shadow-theme-tgl flex cursor-pointer items-center rounded-4xl border-2 p-1 transition-all duration-300 hover:shadow-none"
    >
      <div className="flex w-full gap-2 text-base font-bold tracking-wider uppercase select-none">
        <span
          className={`flex justify-center rounded-4xl px-2 py-1 transition-colors duration-300 ${
            isSecondActive ? 'text-white' : 'bg-accent text-black'
          }`}
        >
          {firstLanguage}
        </span>
        <span
          className={`flex justify-center rounded-4xl px-2 py-1 transition-colors duration-300 ${
            isSecondActive ? 'bg-accent text-black' : 'text-white'
          }`}
        >
          {secondLanguage}
        </span>
      </div>
    </button>
  );
};

export default LanguageToggle;
