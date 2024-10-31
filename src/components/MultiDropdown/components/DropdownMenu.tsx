import React, { useEffect } from 'react';
import {type Option} from '../MultiDropdown';
import Text from '../../Text';
import './DropdownMenu.css';
import classNames from 'classnames';

type DropdownMenuProps = {
  className?: string;
  options: Option[];
  value: Option[];
  filterCb?:(opt:Option,index?:number,arr?:Option[])=>boolean;
  onClick:(option:Option)=>void;
};

const DropdownMenu: React.FC<DropdownMenuProps> = ({ className,options,value,filterCb=()=>true,onClick }) => {

  const newOptions=value.length > 0 ? options:options.filter(filterCb);

  return <menu className={classNames("DropdownMenu",className)} >
        {
          newOptions.length>0
          ?
          newOptions.map((e) => (
            <li key={e.key} id={e.key} className={classNames('DropdownMenu__item',{DropdownMenu__item_selected:value.includes(e)})} onClick={()=>onClick(e)}>
              <Text view='p-16'>{e.value}</Text>
              </li>
          ))
          :
          <Text color='secondary' view='p-16'>Пусто</Text>
        }
      </menu>;
};

export default DropdownMenu;
