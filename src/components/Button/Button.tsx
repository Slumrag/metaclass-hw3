import classNames from 'classnames';
import React from 'react';
import { Loader, Text } from 'components/';
import style from './Button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ loading, className, children, disabled, ...props }) => {
  return (
    <button
      className={classNames(style.button, { [style.disabled]: disabled }, className)}
      disabled={loading || disabled}
      {...props}
    >
      {loading && <Loader size="s" className={style.loader} />}
      <Text view="button" tag="span">
        {children}
      </Text>
    </button>
  );
};

export default Button;
