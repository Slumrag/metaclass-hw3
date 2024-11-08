import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { ArrowDownIcon, Input } from 'components/';
import { useClickOutside } from 'utils/hooks';
import DropdownMenu from './components/DropdownMenu';
import style from './MultiDropdown.module.scss';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({ className, options, value, onChange, disabled, getTitle }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedOptions, setSelectedOptions] = useState(value);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const removeOption = (opts: Option[], removedIndex: number) => {
    const newOpts = [...opts];
    newOpts.splice(removedIndex, 1);
    return newOpts;
  };

  const handleOption = (option: Option) => {
    const optionIndex = selectedOptions.findIndex((e) => e.key === option.key);

    if (optionIndex > -1) {
      const newOptions = removeOption(selectedOptions, optionIndex);
      onChange(newOptions);
      return newOptions;
    }

    onChange([...selectedOptions, option]);
    return [...selectedOptions, option];
  };

  const showMenu = () => !disabled && setIsMenuVisible(true);
  const hideMenu = () => setIsMenuVisible(false);
  const toggleMenu = () => !disabled && setIsMenuVisible((s) => !s);

  const constructInputValue = (): string => (selectedOptions.length > 0 ? getTitle(selectedOptions) : '');

  const filterOptions = (opt: Option) => opt.value.includes(inputValue);

  useEffect(() => {
    setInputValue(getTitle(selectedOptions));
  }, []);

  useEffect(() => {
    if (disabled) {
      hideMenu();
    }
  }, [disabled]);

  useEffect(() => {
    setInputValue(constructInputValue());
  }, [selectedOptions]);

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
        value={inputValue}
        onChange={(value: string) => {
          if (!isMenuVisible) {
            showMenu();
          }
          setInputValue(value);
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
          onClick={(option) => {
            setSelectedOptions(handleOption(option));
          }}
          filterCb={filterOptions}
        />
      )}
    </div>
  );
};

export default MultiDropdown;
