import { type JSX } from 'react';

import { GENDERS_LIST } from '@/form/config/gendersData';
import type { BaseFormFieldProps } from '@/types/form';

interface GenderSelectorProps extends React.SelectHTMLAttributes<HTMLSelectElement>, BaseFormFieldProps {}

const GenderSelector = ({ error, register, ...props }: GenderSelectorProps): JSX.Element => {
  const baseStyles =
    'w-full cursor-pointer appearance-none rounded-full border-2 px-6 py-3 text-sm font-semibold transition-all duration-300';
  const themeStyles = error
    ? 'bg-bg-input/50 text-text-secondary focus:outline-focus-ring border-error/50 focus:border-error focus:shadow-[0_0_15px_rgba(236,178,255,0.4)]'
    : 'bg-bg-input/50 text-text-secondary focus:outline-focus-ring border-accent-muted/20 focus:shadow-[0_0_15px_rgba(236,178,255,0.4)]';

  const combinedClassName = `${baseStyles} ${themeStyles}`.trim().replace(/\s+/g, ' ');
  const [placeholder, ...genders] = GENDERS_LIST;
  return (
    <div className="relative flex flex-1 flex-col gap-1">
      <label htmlFor="gender" className="text-text-primary ml-7 text-sm font-semibold">
        Gender
      </label>

      <select
        id="gender"
        name="gender"
        defaultValue=""
        {...props}
        {...register?.('gender')}
        className={combinedClassName}
      >
        <option value="" disabled className="hidden">
          {placeholder}
        </option>
        {genders.map((gender) => (
          <option
            key={gender}
            value={gender}
            className="bg-bg-input/90 text-text-primary hover:bg-bg-input text-base font-medium"
          >
            {gender}
          </option>
        ))}
      </select>

      <span className="text-text-primary pointer-events-none absolute top-10 right-6 text-xs">▼</span>
      <span
        className={`text-error ml-2 block min-h-6 text-xs font-medium transition-all duration-300 sm:text-sm ${
          error ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        {error || ''}
      </span>
    </div>
  );
};

export default GenderSelector;
