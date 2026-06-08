import type { JSX } from 'react';

import type { FormSchemaType } from '@/form/config/validation';
import type { BaseFormFieldProps } from '@/types/form';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, BaseFormFieldProps {
  id: keyof FormSchemaType;
  label: string;
  ref?: React.RefObject<HTMLInputElement | null>;
}

const Input = ({ id, ref, name, label, type, placeholder, error, register, ...props }: InputProps): JSX.Element => {
  const isAgeField = id === 'age';
  const isNameField = id === 'name';
  const isPasswordFields = id === 'password' || id === 'confirmPassword';
  const isFileType = type === 'file';

  const baseStyles =
    'w-full rounded-full border-2 px-6 py-3 text-sm font-semibold tracking-wider transition-all duration-300';
  const themeStyles = error
    ? 'bg-bg-input/50 text-text-secondary focus:outline-focus-ring border-error/50 focus:border-error shadow-[0_0_10px_rgba(13,48,114,0.2)] placeholder:text-text-secondary/40'
    : 'bg-bg-input/50 text-text-secondary focus:outline-focus-ring border-accent-muted/20 shadow-[0_0_10px_rgba(13,48,114,0.2)] placeholder:text-text-secondary/40';
  const fileStyles = isFileType
    ? 'file:glass-panel file:border-text-primary file:text-accent-muted file:mr-2 file:rounded-2xl file:px-2 file:py-1 hover:file:cursor-pointer'
    : '';
  const ageStyles = isAgeField
    ? '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
    : '';

  const combinedClassName = `${baseStyles} ${themeStyles} ${fileStyles} ${ageStyles}`.trim().replace(/\s+/g, ' ');
  const registerProps = register?.(id);

  return (
    <div className="flex w-full flex-col gap-1">
      <label htmlFor={id} className="text-text-primary ml-7 text-sm font-semibold capitalize">
        {label}
      </label>
      <input
        required
        id={id}
        name={name || id}
        type={type}
        placeholder={placeholder}
        {...(isPasswordFields && { autoComplete: 'new-password' })}
        {...props}
        {...registerProps}
        ref={registerProps?.ref || ref}
        autoFocus={isNameField}
        className={combinedClassName}
      />
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

export default Input;
