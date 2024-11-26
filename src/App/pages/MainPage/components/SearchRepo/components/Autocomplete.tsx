import classNames from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DropdownMenu, Input } from 'components/';
import { type Option } from 'components/types';
import { useClickOutside } from 'utils/';
import style from './Autocomplete.module.scss';

export type AutocompleteProps = {
  className?: string;
  inputValue?: string;
  onInputChange?: (input: string) => void;
  options: Option[];
  value: Option;
  placeholder?: string;
  onChange: (option: Option) => void;
};

const Autocomplete: React.FC<AutocompleteProps> = ({
  className,
  inputValue = '',
  value: optionValue,
  placeholder,
  options,
  onChange,
  onInputChange,
}) => {
  const [value, setValue] = useState(optionValue);
  const [input, setInput] = useState(inputValue);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const hideMenu = () => setIsDropdownVisible(false);
  const showMenu = () => setIsDropdownVisible(true);

  useClickOutside(ref, hideMenu);

  const handleInput = useCallback((input: string): void => {
    setInput(input);
    if (!isDropdownVisible) {
      showMenu();
    }
  }, []);
  const handleInputFocus = useCallback((): void => {
    showMenu();
  }, []);
  const handleDropdownChange = useCallback((option: Option): void => {
    setValue(option);
    setInput(option.value);
    hideMenu();
  }, []);

  useEffect(() => {
    onChange(value);
  }, [value]);

  useEffect(() => {
    if (onInputChange) {
      onInputChange(input);
    }
  }, [input]);

  return (
    <div
      className={classNames(style.autocomplete, className)}
      ref={ref}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          hideMenu();
        }
      }}
    >
      <Input
        className={style.input}
        value={input}
        placeholder={placeholder}
        onChange={handleInput}
        onFocus={handleInputFocus}
      />
      {isDropdownVisible && (
        <DropdownMenu className={style.dropdown} options={options} value={[value]} onClick={handleDropdownChange} />
      )}
    </div>
  );
};

export default Autocomplete;
