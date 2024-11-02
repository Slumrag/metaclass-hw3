import classNames from 'classnames';
import React from 'react';
import style from './Container.module.scss';

export type ContainerProps = React.ComponentProps<'div'> & {
  //есть ли боковые отступы. По умолчанию true
  pad?: boolean;
  // направление главной оси флекс контейнера
  direction?: 'row' | 'column';
};

const Container: React.FC<ContainerProps> = ({ className, children, direction = 'column', pad = true, ...props }) => {
  return (
    <div className={classNames(style.container, style[direction], { [style.padding]: pad }, className)} {...props}>
      {children}
    </div>
  );
};

export default Container;
