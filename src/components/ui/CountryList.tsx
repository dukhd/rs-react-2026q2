import type { JSX } from 'react';

import { useAppSelector } from '@/store/hooks';
import type { BaseFormFieldProps } from '@/types/form';

interface CountryListProps extends React.InputHTMLAttributes<HTMLInputElement>, BaseFormFieldProps {}

const CountryList = ({ error, register, ...props }: CountryListProps): JSX.Element => {
  const countries = useAppSelector((state) => state.countries.countries);
  return (
    <div className="relative flex flex-1 flex-col gap-1">
      <label htmlFor="country" className="text-text-primary ml-7 text-sm font-semibold capitalize">
        Country
      </label>

      <input
        id="country"
        name="country"
        type="text"
        defaultValue=""
        list="countries"
        placeholder="Select country"
        autoComplete="off"
        {...props}
        {...register?.('country')}
        className="bg-bg-input/50 border-accent-muted/20 text-text-secondary focus:outline-focus-ring placeholder:text-text-secondary/40 w-full rounded-full border-2 px-6 py-3 text-sm font-semibold transition-all duration-300 focus:shadow-[0_0_15px_rgba(236,178,255,0.4)]"
      />

      <datalist id="countries">
        {countries.map((country) => (
          <option key={country} value={country} />
        ))}
      </datalist>
      <span
        className={`text-error ml-2 block min-h-6 text-xs font-medium transition-all duration-300 sm:min-h-10 sm:text-sm ${
          error ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        {error || ''}
      </span>
    </div>
  );
};

export default CountryList;
