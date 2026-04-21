import { PureComponent } from 'react';

interface SearchInputProps {
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

class SearchInput extends PureComponent<SearchInputProps> {
  render() {
    const {
      id,
      name,
      placeholder,
      value,
      onChange,
      className = '',
    } = this.props;

    const baseClassName = 'border-2 border-black';

    return (
      <>
        <label htmlFor={id} className="sr-only">
          {name}
        </label>
        <input
          type="search"
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${baseClassName} ${className}`}
        />
      </>
    );
  }
}

export default SearchInput;
