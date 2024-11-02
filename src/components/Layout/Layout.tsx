import classNames from 'classnames';
import React from 'react';
import Header from 'components/Header';
import style from './Layout.module.scss';

const Layout: React.FC<React.ComponentProps<'div'>> = ({ className, children, ...props }) => {
  return (
    <div className={classNames(style.layout, className)} {...props}>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
