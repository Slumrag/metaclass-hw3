import { observer } from 'mobx-react-lite';
import React from 'react';
import Header from 'components/Header';

const Layout: React.FC<React.ComponentProps<'div'>> = observer(({ className, children, ...props }) => {
  return (
    <div className={className} {...props}>
      <Header />
      <main>{children}</main>
    </div>
  );
});

export default Layout;
