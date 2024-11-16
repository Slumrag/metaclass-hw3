import React from 'react';
import Header from 'components/Header';

const Layout: React.FC<React.ComponentProps<'div'>> = ({ className, children, ...props }) => {
  return (
    <div className={className} {...props}>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
