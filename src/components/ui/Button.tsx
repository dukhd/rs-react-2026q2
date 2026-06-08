import type { JSX } from 'react';

interface ButtonProps {
  type: 'button' | 'submit';
  text: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const Button = ({ type, text, onClick, disabled = false }: ButtonProps): JSX.Element => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      className={`${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} squishy-button glass-panel text-accent-muted shadow-accent-muted/30 focus-visible:outline-focus-ring flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-semibold capitalize focus-visible:outline-2 focus-visible:outline-offset-2 sm:text-lg`}
    >
      {text}
    </button>
  );
};

export default Button;
