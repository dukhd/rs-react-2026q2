interface ButtonProps {
  text: string;
  type: 'button' | 'submit' | 'reset';
  customClassName?: string | null;
  onClick?: () => void;
}

const Button = ({
  text,
  type,
  customClassName = null,
  onClick,
}: ButtonProps) => {
  const hoverClassName = 'hover:shadow-none';
  const generalButtonStyles =
    'bg-accent text-second px-7 py-2 text-sm sm:text-base md:text-lg';
  const finalClassName = customClassName ?? generalButtonStyles;
  return (
    <button
      type={type}
      onClick={onClick}
      className={`border-border-main shadow-card cursor-pointer rounded-xl border-3 font-bold tracking-wide uppercase transition-shadow duration-300 ease-in-out ${finalClassName} ${hoverClassName}`}
    >
      {text}
    </button>
  );
};

export default Button;
