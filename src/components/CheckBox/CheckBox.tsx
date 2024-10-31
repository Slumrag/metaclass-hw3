import classNames from 'classnames';
import React from 'react';
import './CheckBox.css';
import CheckIcon from '../icons/CheckIcon';

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({
  className,
  onChange,
  ...props
}) => {
  return (
    <div className={classNames('CheckBox', className)}>
      <input
        type="checkbox"
        className={'CheckBox__element'}
        onChange={(e) => {
          onChange(e.target.checked);
        }}
        {...props}
      />
      <CheckIcon className="CheckBox__icon" width={40} height={40} />
    </div>
  );
};

export default CheckBox;
