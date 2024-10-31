import React from 'react';
import './Input.css';
import classNames from 'classnames';

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
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
      <div className={classNames('Input', className)}>
        <input
          ref={ref}
          type="text"
          className="Input__text Text-p-16"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          {...props}
        />
        <div className="Input__slot">{afterSlot}</div>
      </div>
    );
  }
);

export default Input;
