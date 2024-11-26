import classNames from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowDownIcon, Input } from 'components/';
import DropdownMenu from 'components/DropdownMenu';
import { type Option } from 'components/types';
import { useClickOutside } from 'utils/hooks';
import style from './MultiDropdown.module.scss';
/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps<T extends Option = Option> = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: T[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: T[];
  /** Значение в поле Input */
  inputValue?: string;
  /** Выбирается ли несколько вариантов или один*/
  multiple?: boolean;
  /** Callback, вызываемый при  вводе символов в строку*/
  onInput?: (input: string) => void;
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: T[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: T[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  inputValue = '',
  onInput,
  onChange,
  disabled,
  multiple = false,
  getTitle,
}) => {
  const [input, setInputValue] = useState<string>(inputValue);

  const [selectedOptions, setSelectedOptions] = useState(value);
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);

  const removeOption = (opts: Option[], removedIndex: number) => {
    const newOpts = [...opts];
    newOpts.splice(removedIndex, 1);
    return newOpts;
  };

  const handleOptionMultiple = useCallback(
    (option: Option) => {
      const optionIndex = selectedOptions.findIndex((e) => e.key === option.key);
      if (optionIndex > -1) {
        const newOptions = removeOption(selectedOptions, optionIndex);
        setSelectedOptions(newOptions);
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    },
    [selectedOptions],
  );

  const handleOptionSingle = useCallback((option: Option) => {
    setSelectedOptions([option]);
  }, []);

  const showMenu = useCallback(() => !disabled && setIsMenuVisible(true), [disabled]);
  const hideMenu = useCallback(() => setIsMenuVisible(false), []);
  const toggleMenu = useCallback(() => !disabled && setIsMenuVisible((s) => !s), [disabled]);

  const filterOptions = useCallback((opt: Option) => opt.value.includes(inputValue), [inputValue]);

  useEffect(() => {
    onChange(selectedOptions);
  }, [onChange, selectedOptions]);

  useEffect(() => {
    if (disabled) {
      hideMenu();
    }
  }, [disabled]);

  useEffect(() => {
    setInputValue(selectedOptions.length > 0 ? getTitle(selectedOptions) : '');
  }, [getTitle, selectedOptions]);

  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, hideMenu);

  return (
    <div
      ref={ref}
      className={classNames(style.multiDropdown, className)}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          hideMenu();
        }
      }}
    >
      <Input
        value={input}
        onChange={(value: string) => {
          if (!isMenuVisible) {
            showMenu();
          }
          setInputValue(value);
        }}
        onInput={(e) => {
          if (onInput) {
            onInput((e.target as HTMLInputElement).value);
          }
        }}
        onFocus={showMenu}
        placeholder={getTitle(selectedOptions)}
        afterSlot={<ArrowDownIcon color="secondary" onClick={toggleMenu} />}
        disabled={disabled}
      />

      {isMenuVisible && (
        <DropdownMenu
          className={style.menu}
          options={options}
          value={selectedOptions}
          onClick={multiple ? handleOptionMultiple : handleOptionSingle}
          filterCb={filterOptions}
        />
      )}
    </div>
  );
};

export default MultiDropdown;
