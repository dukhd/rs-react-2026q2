import { PureComponent } from 'react';

interface SearchInputProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
}

class SearchInput extends PureComponent<SearchInputProps> {
  render() {
    const { name, placeholder, value, onChange, onKeyDown, className } =
      this.props;

    const baseClassName = 'border-2 border-black';

    return (
      <input
        type="search"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className={`${baseClassName} ${className}`}
      />
    );
  }
}

export default SearchInput;
