import classNames from 'classnames';
import React, { ReactElement } from 'react';
import { Loader } from 'components/';
import style from './IconButton.module.scss';

export type IconButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** вариант кнопки  */
  variant?: 'solid' | 'transparent';
  /** Иконка кнопки */
  icon: ReactElement;
};

const IconButton: React.FC<IconButtonProps> = ({ loading, className, disabled, icon, variant = 'solid', ...props }) => {
  return (
    <button
      className={classNames(style.button, style[variant], { [style.disabled]: disabled }, className)}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? <Loader size="s" className={style.loader} /> : icon}
    </button>
  );
};

export default IconButton;
