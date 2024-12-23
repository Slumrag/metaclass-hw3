import classNames from 'classnames';
import React from 'react';
import Button from 'components/Button';
import Text from 'components/Text';
import { type Option } from 'components/types';
import style from './DropdownMenu.module.scss';

export type DropdownMenuProps = {
  className?: string;
  options: Option[];
  value: Option[];
  filterCb?: (opt: Option, index?: number, arr?: Option[]) => boolean;
  onClick: (option: Option) => void;
};

const DropdownMenu: React.FC<DropdownMenuProps> = ({ className, options, value, filterCb = () => true, onClick }) => {
  const newOptions = value.length > 0 ? options : options.filter(filterCb);

  return (
    <menu className={classNames(style.dropdownMenu, className)}>
      {newOptions.length > 0 ? (
        newOptions.map((e) => (
          <li
            key={e.key}
            id={e.key}
            className={classNames(style.item, { [style.item_selected]: value.includes(e) })}
            onClick={() => onClick(e)}
          >
            <Button variant="transparent" style={{ padding: 0 }}>
              <Text tag="span" className={style.text}>
                {e.value}
              </Text>
            </Button>
          </li>
        ))
      ) : (
        <li className={style.item}>
          <Text color="secondary" view="p-16">
            Пусто
          </Text>
        </li>
      )}
    </menu>
  );
};

export default DropdownMenu;
