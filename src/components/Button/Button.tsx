import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Loader, Text } from 'components/';
import style from './Button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** вариант кнопки  */
  variant?: 'solid' | 'transparent';
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = observer(
  ({ loading, className, children, disabled, variant = 'solid', ...props }) => {
    return (
      <button
        className={classNames(style.button, style[variant], { [style.disabled]: disabled }, className)}
        disabled={loading || disabled}
        {...props}
      >
        {loading && <Loader size="s" className={style.loader} />}
        <Text view="button" tag="span">
          {children}
        </Text>
      </button>
    );
  },
);

export default Button;
