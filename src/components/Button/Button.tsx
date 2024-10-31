import classNames from 'classnames';
import React from 'react';
import Loader from '../Loader';
import './Button.css';
import Text from '../Text';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ loading, className, children, disabled, ...props }) => {
  return (
    <button
      className={classNames('Button', { Button_disabled: disabled }, className)}
      disabled={loading || disabled}
      {...props}
    >
      {loading && <Loader size="s" />}
      <Text view="button" tag="span">
        {children}
      </Text>
    </button>
  );
};

export default Button;
