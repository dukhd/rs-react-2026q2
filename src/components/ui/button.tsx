import { PureComponent } from 'react';

interface ButtonProps {
  text: string;
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

class Button extends PureComponent<ButtonProps> {
  render() {
    const { text, type, onClick } = this.props;

    const baseClassName =
      'bg-accent text-main shadow-general cursor-pointer rounded-xl px-8 py-2 text-lg font-semibold tracking-wide transition-shadow duration-300 ease-in-out focus:outline-focus focus:outline-2';
    const hoverClassName = 'hover:shadow-none';

    return (
      <button
        type={type}
        onClick={onClick}
        className={`${baseClassName} ${hoverClassName}`}
      >
        {text}
      </button>
    );
  }
}

export default Button;
