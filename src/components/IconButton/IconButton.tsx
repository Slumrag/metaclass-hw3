import classNames from 'classnames';
import React, { ReactElement } from 'react';
import { Loader } from 'components/';
import style from './IconButton.module.scss';

export type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Иконка кнопки */
  icon: ReactElement;
};

const Button: React.FC<ButtonProps> = ({ loading, className, disabled, icon, ...props }) => {
  return (
    <button
      className={classNames(style.button, { [style.disabled]: disabled }, className)}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? <Loader size="s" className={style.loader} /> : icon}
    </button>
  );
};

export default Button;
