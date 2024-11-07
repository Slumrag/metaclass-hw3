import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';
import CheckIcon from '../icons/CheckIcon';
import style from './CheckBox.module.scss';

export type CheckBoxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = observer(({ className, onChange, ...props }) => {
  return (
    <label className={classNames(style.checkBox, className)}>
      <input
        type="checkbox"
        className={style.element}
        onChange={(e) => {
          onChange(e.target.checked);
        }}
        {...props}
      />
      <CheckIcon className={style.icon} width={40} height={40} />
    </label>
  );
});

export default CheckBox;
