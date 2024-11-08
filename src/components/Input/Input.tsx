import classNames from 'classnames';
import React from 'react';
import style from './Input.module.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, afterSlot, className, ...props }, ref) => {
    return (
      <div className={classNames(style.input, className)}>
        <input
          ref={ref}
          type="text"
          className={style.text}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          {...props}
        />
        <div className={style.slot}>{afterSlot}</div>
      </div>
    );
  },
);

export default Input;
