import type { JSX } from 'react';

import type { BaseFormFieldProps } from '@/types/form';

export interface TermsCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement>, BaseFormFieldProps {}

const TermsCheckbox = ({ error, register, ...props }: TermsCheckboxProps): JSX.Element => {
  return (
    <div className="my-2 flex w-full flex-col items-center gap-1 px-2">
      <div className="flex items-center gap-4">
        <div className="relative flex items-center">
          <input
            required
            type="checkbox"
            id="terms"
            name="terms"
            {...props}
            {...register?.('terms')}
            className={`bg-bg-input/50 checked:bg-accent checked:border-text-primary focus:outline-focus-ring h-6 w-6 cursor-pointer appearance-none rounded-lg border-2 transition-all duration-300 checked:shadow-[0_0_10px_var(--color-accent-muted)] ${
              error ? 'border-error/50 focus:border-error' : 'border-border-strong'
            }`}
          />
        </div>
        <label htmlFor="terms" className="text-text-primary cursor-pointer text-base font-medium">
          I agree to the Terms and Conditions
        </label>
      </div>
      <span
        className={`text-error ml-2 block min-h-5 text-xs font-medium transition-all duration-300 sm:text-sm ${
          error ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        {error || ''}
      </span>
    </div>
  );
};

export default TermsCheckbox;
