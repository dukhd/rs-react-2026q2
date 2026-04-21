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

    const baseClassName = 'cursor-pointer';
    const hoverClassName = 'hover:font-bold';

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
