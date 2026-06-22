interface ButtonProps {
  text: string;
  type: 'button' | 'submit' | 'reset';
  customClassName?: string | null;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({
  text,
  type,
  customClassName = null,
  onClick,
  disabled = false,
}: ButtonProps) => {
  const hoverClassName = disabled ? '' : 'hover:shadow-none';
  const generalButtonStyles =
    'bg-accent text-second px-7 py-2 text-sm sm:text-base md:text-lg';
  const disabledStyles = disabled
    ? 'opacity-60 cursor-not-allowed'
    : 'cursor-pointer';
  const finalClassName = `${customClassName ?? generalButtonStyles} ${disabledStyles}`;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`border-border-main shadow-card rounded-xl border-3 font-bold tracking-wide uppercase transition-shadow duration-300 ease-in-out ${finalClassName} ${hoverClassName}`}
    >
      {text}
    </button>
  );
};

export default Button;
