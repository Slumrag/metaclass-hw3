import classNames from 'classnames';
import React from 'react';
import style from './Token.module.scss';

export type TokenProps = React.ComponentProps<'span'> & {};

const Token: React.FC<TokenProps> = ({ className, children, ...props }) => {
  return (
    <span className={classNames(style.token, className)} {...props}>
      {children}
    </span>
  );
};

export default Token;
