import classNames from 'classnames';
import React from 'react';
import CheckIcon from '../icons/CheckIcon';
import style from './CheckBox.module.scss';

export type CheckBoxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({ className, onChange, ...props }) => {
  return (
    <div className={classNames(style.checkBox, className)}>
      <input
        type="checkbox"
        className={style.element}
        onChange={(e) => {
          onChange(e.target.checked);
        }}
        {...props}
      />
      <CheckIcon className={style.icon} width={40} height={40} />
    </div>
  );
};

export default CheckBox;
