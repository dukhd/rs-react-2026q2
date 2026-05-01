import { PureComponent } from 'react';

interface ButtonProps {
  text: string;
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
}

class Button extends PureComponent<ButtonProps> {
  render() {
    const { text, type, onClick, className = '' } = this.props;

    const baseClassName =
      'bg-accent text-main shadow-general cursor-pointer rounded-xl px-8 py-2 font-bold transition-shadow duration-300 ease-in-out';
    const hoverClassName = 'hover:shadow-none';

    return (
      <button
        type={type}
        onClick={onClick}
        className={`${baseClassName} ${hoverClassName} ${className}`}
      >
        {text}
      </button>
    );
  }
}

export default Button;
