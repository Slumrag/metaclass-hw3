import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';
import Text from 'components/Text';
import { type Option } from '../MultiDropdown';
import style from './DropdownMenu.module.scss';

export type DropdownMenuProps = {
  className?: string;
  options: Option[];
  value: Option[];
  filterCb?: (opt: Option, index?: number, arr?: Option[]) => boolean;
  onClick: (option: Option) => void;
};

const DropdownMenu: React.FC<DropdownMenuProps> = observer(
  ({ className, options, value, filterCb = () => true, onClick }) => {
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
              <Text view="p-16">{e.value}</Text>
            </li>
          ))
        ) : (
          <Text color="secondary" view="p-16">
            Пусто
          </Text>
        )}
      </menu>
    );
  },
);

export default DropdownMenu;
