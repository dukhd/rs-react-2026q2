import { PureComponent } from 'react';

interface SearchInputProps {
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

class SearchInput extends PureComponent<SearchInputProps> {
  render() {
    const { id, name, placeholder, value, onChange } = this.props;

    const baseClassName =
      'w-100 h-10 rounded-xl border-2 border-accent bg-main shadow-general text-accent text-lg tracking-wide font-semibold transition-colors duration-300 easy-in-out focus:outline-none focus:border-focus p-3';
    const placeholderClassName =
      'placeholder:text-accent placeholder:font-normal placeholder:opacity-50';

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
          className={`${baseClassName} ${placeholderClassName}`}
        />
      </>
    );
  }
}

export default SearchInput;
