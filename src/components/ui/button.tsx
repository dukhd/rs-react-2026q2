interface ButtonProps {
  text: string;
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

const Button = ({ text, type, onClick }: ButtonProps) => {
  const hoverClassName = 'hover:shadow-none';

  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-accent text-second border-border-main shadow-card focus:outline-focus cursor-pointer rounded-xl border-3 px-7 py-2 text-sm font-bold tracking-wide uppercase transition-shadow duration-300 ease-in-out focus:outline-2 sm:text-base md:text-lg ${hoverClassName}`}
    >
      {text}
    </button>
  );
};

export default Button;
